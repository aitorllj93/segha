import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const workspaceRoot = join(__dirname, '..');

/**
 * Represents a JSON Schema structure for comparison
 */
export interface SchemaShape {
  [key: string]: any; // JSON Schema is flexible, so we use any
}

/**
 * Loads JSON schemas from the json-schemas directory of a package
 */
export async function extractPackageShapes(packagePath: string): Promise<Record<string, SchemaShape>> {
  const jsonSchemasPath = join(packagePath, 'json-schemas', 'index.json');

  if (!existsSync(jsonSchemasPath)) {
    // Try to generate JSON schemas first
    try {
      const packageJsonPath = join(packagePath, 'package.json');
      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        if (packageJson.scripts?.['json-schema']) {
          execSync(`pnpm run json-schema`, {
            cwd: packagePath,
            stdio: 'pipe'
          });
        }
      }
    } catch (error) {
      // If generation fails, return empty
      return {};
    }
  }

  if (!existsSync(jsonSchemasPath)) {
    return {};
  }

  try {
    const content = readFileSync(jsonSchemasPath, 'utf-8');
    const jsonSchema = JSON.parse(content);

    // Extract schemas from $defs
    const shapes: Record<string, SchemaShape> = {};

    if (jsonSchema.$defs) {
      for (const [schemaName, schemaDef] of Object.entries(jsonSchema.$defs)) {
        shapes[schemaName] = schemaDef as SchemaShape;
      }
    }

    return shapes;
  } catch (error) {
    console.error(`Error reading JSON schemas from ${jsonSchemasPath}:`, error);
    return {};
  }
}

/**
 * Extracts JSON schemas from a git revision
 */
export async function extractShapesFromGit(packagePath: string, gitRef: string): Promise<Record<string, SchemaShape>> {
  const workspaceRoot = join(__dirname, '..');
  const gitPath = packagePath.replace(workspaceRoot + '/', '');
  const jsonSchemasPath = join(gitPath, 'json-schemas', 'index.json');

  try {
    // Try to get the JSON schema file from git
    const gitContent = execSync(`git show ${gitRef}:${jsonSchemasPath}`, {
      encoding: 'utf-8',
      cwd: workspaceRoot,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    const jsonSchema = JSON.parse(gitContent);
    const shapes: Record<string, SchemaShape> = {};

    if (jsonSchema.$defs) {
      for (const [schemaName, schemaDef] of Object.entries(jsonSchema.$defs)) {
        shapes[schemaName] = schemaDef as SchemaShape;
      }
    }

    return shapes;
  } catch (error) {
    // If file doesn't exist in that ref, return empty (first release)
    return {};
  }
}
