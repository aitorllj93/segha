import { z } from 'zod';
import { readFileSync, existsSync, writeFileSync, unlinkSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Represents the shape of a Zod schema for comparison purposes
 */
export interface SchemaShape {
  type: 'object' | 'enum' | 'string' | 'number' | 'boolean' | 'array' | 'union' | 'literal' | 'unknown';
  optional?: boolean;
  nullable?: boolean;
  nullish?: boolean;
  properties?: Record<string, SchemaShape>;
  values?: string[] | number[] | boolean[];
  items?: SchemaShape;
  types?: SchemaShape[];
  value?: string | number | boolean;
  description?: string;
}

/**
 * Extracts the shape of a Zod schema by inspecting its internal definition
 */
export function extractShape(schema: z.ZodTypeAny): SchemaShape {
  const def = (schema as any)._def;

  if (!def) {
    return { type: 'unknown' };
  }

  switch (def.typeName) {
    case 'ZodObject': {
      const shape: SchemaShape = {
        type: 'object',
        properties: {},
      };

      if (def.shape) {
        const objShape = def.shape();
        for (const [key, value] of Object.entries(objShape)) {
          if (value && typeof value === 'object') {
            shape.properties![key] = extractShape(value as z.ZodTypeAny);
          }
        }
      }

      // Extract description if available
      if (def.description) {
        shape.description = def.description;
      }

      return shape;
    }

    case 'ZodEnum': {
      return {
        type: 'enum',
        values: def.values || [],
      };
    }

    case 'ZodString': {
      const shape: SchemaShape = { type: 'string' };
      if (def.description) shape.description = def.description;
      return shape;
    }

    case 'ZodNumber': {
      const shape: SchemaShape = { type: 'number' };
      if (def.description) shape.description = def.description;
      return shape;
    }

    case 'ZodBoolean': {
      const shape: SchemaShape = { type: 'boolean' };
      if (def.description) shape.description = def.description;
      return shape;
    }

    case 'ZodArray': {
      const shape: SchemaShape = {
        type: 'array',
        items: def.type ? extractShape(def.type) : { type: 'unknown' },
      };
      return shape;
    }

    case 'ZodOptional': {
      const inner = extractShape(def.innerType);
      return {
        ...inner,
        optional: true,
      };
    }

    case 'ZodNullable': {
      const inner = extractShape(def.innerType);
      return {
        ...inner,
        nullable: true,
      };
    }

    case 'ZodNullish': {
      const inner = extractShape(def.innerType);
      return {
        ...inner,
        nullish: true,
      };
    }

    case 'ZodUnion': {
      return {
        type: 'union',
        types: def.options ? def.options.map((opt: z.ZodTypeAny) => extractShape(opt)) : [],
      };
    }

    case 'ZodLiteral': {
      return {
        type: 'literal',
        value: def.value,
      };
    }

    case 'ZodDefault': {
      // For defaults, we extract the inner type but note it's optional from consumer perspective
      return {
        ...extractShape(def.innerType),
        optional: true,
      };
    }

    case 'ZodEffects': {
      // For preprocess/refine/etc, extract the inner schema
      return extractShape(def.schema);
    }

    default:
      return { type: 'unknown' };
  }
}

/**
 * Loads and extracts shapes from all exported schemas in a package
 * Uses dynamic import with proper path resolution
 */
export async function extractPackageShapes(packagePath: string): Promise<Record<string, SchemaShape>> {
  const packageJsonPath = join(packagePath, 'package.json');
  if (!existsSync(packageJsonPath)) {
    throw new Error(`package.json not found at ${packagePath}`);
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const entryPoint = packageJson.exports?.['.'] || packageJson.main || 'index.ts';
  const entryPath = resolve(packagePath, entryPoint);

  if (!existsSync(entryPath)) {
    throw new Error(`Entry point not found: ${entryPath}`);
  }

  // Use file:// URL for dynamic import
  const moduleUrl = `file://${entryPath}`;

  try {
    const module = await import(moduleUrl);
    const shapes: Record<string, SchemaShape> = {};

    // Extract all exports that end with 'Schema' or are Zod schemas
    for (const [exportName, exportValue] of Object.entries(module)) {
      if (exportName.endsWith('Schema') || exportName.endsWith('schema')) {
        try {
          // Check if it's a Zod schema by checking for _def
          if (exportValue && typeof exportValue === 'object' && '_def' in exportValue) {
            shapes[exportName] = extractShape(exportValue as z.ZodTypeAny);
          }
        } catch (error) {
          // Skip if not a Zod schema
          console.warn(`Skipping ${exportName}: not a Zod schema`);
        }
      }
    }

    return shapes;
  } catch (error) {
    console.error(`Error importing ${moduleUrl}:`, error);
    throw error;
  }
}

/**
 * Extracts shapes from a git revision by checking out the file temporarily
 */
export async function extractShapesFromGit(packagePath: string, gitRef: string): Promise<Record<string, SchemaShape>> {
  const packageJsonPath = join(packagePath, 'package.json');
  if (!existsSync(packageJsonPath)) {
    return {};
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const entryPoint = packageJson.exports?.['.'] || packageJson.main || 'index.ts';

  const workspaceRoot = join(__dirname, '..');
  const gitPath = join(packagePath, entryPoint).replace(workspaceRoot + '/', '');

  try {
    // Try to get the file from git
    const gitContent = execSync(`git show ${gitRef}:${gitPath}`, {
      encoding: 'utf-8',
      cwd: workspaceRoot,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    // Write to a temporary file
    const tmpFile = join(workspaceRoot, '.tmp-schema-extract.ts');
    writeFileSync(tmpFile, gitContent, 'utf-8');

    try {
      // Import the temporary file
      const module = await import(`file://${tmpFile}`);
      const shapes: Record<string, SchemaShape> = {};

      for (const [exportName, exportValue] of Object.entries(module)) {
        if (exportName.endsWith('Schema') || exportName.endsWith('schema')) {
          try {
            if (exportValue && typeof exportValue === 'object' && '_def' in exportValue) {
              shapes[exportName] = extractShape(exportValue as z.ZodTypeAny);
            }
          } catch (error) {
            // Skip if not a Zod schema
          }
        }
      }

      return shapes;
    } finally {
      // Clean up temp file
      if (existsSync(tmpFile)) {
        unlinkSync(tmpFile);
      }
    }
  } catch (error) {
    // If git show fails (e.g., file didn't exist in that ref), return empty
    return {};
  }
}
