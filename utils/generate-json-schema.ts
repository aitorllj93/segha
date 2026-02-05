import z from 'zod';
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname, basename, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

interface PackageConfig {
  name: string;
  description?: string;
  version?: string;
  exports?: Record<string, string>;
}

interface SchemaExport {
  name: string;
  schema: z.ZodType;
}

interface GeneratedSchema {
  name: string;
  relativePath: string;
  jsonSchema: object;
}

/**
 * Reads package.json from the specified directory
 */
function readPackageJson(cwd: string): PackageConfig {
  const packagePath = join(cwd, 'package.json');
  if (!existsSync(packagePath)) {
    throw new Error(`package.json not found in ${cwd}`);
  }
  return JSON.parse(readFileSync(packagePath, 'utf-8'));
}

/**
 * Recursively finds all TypeScript files in a directory
 */
function findTypeScriptFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) return files;

  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip node_modules and hidden directories
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      files.push(...findTypeScriptFiles(fullPath, baseDir));
    } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Dynamically imports and extracts all Zod schemas from a module
 */
async function extractSchemas(filePath: string): Promise<SchemaExport[]> {
  try {
    const absolutePath = resolve(filePath);
    const fileUrl = pathToFileURL(absolutePath).href;
    const module = await import(fileUrl);
    const schemas: SchemaExport[] = [];

    for (const [name, value] of Object.entries(module)) {
      // Check if it's a Zod schema (has _zod property in Zod 4)
      if (value && typeof value === 'object' && '_zod' in value) {
        schemas.push({ name, schema: value as z.ZodType });
      }
    }

    return schemas;
  } catch (error) {
    // Silently skip files that can't be imported
    return [];
  }
}

/**
 * Converts a Zod schema to JSON Schema using z.toJSONSchema()
 */
function toJSONSchema(schema: z.ZodType, name: string): object {
  try {
    return z.toJSONSchema(schema, {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      target: 'draft-2020-12',
      io: 'output',
    });
  } catch (error) {
    console.warn(`   ⚠️ Warning: Could not convert ${name} to JSON Schema`);
    return {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: name,
      description: `Failed to generate JSON Schema for ${name}`,
    };
  }
}

/**
 * Generates JSON Schema files for all schemas in a package,
 * preserving the source directory structure
 */
async function generateJSONSchemas(options: {
  entry: string;
  output?: string;
  cwd?: string;
  combined?: boolean;
}) {
  const cwd = options.cwd || process.cwd();
  const pkg = readPackageJson(cwd);
  const entryPath = join(cwd, options.entry);
  const baseOutputDir = options.output || './json-schemas';

  console.log(`📦 Generating JSON Schemas for ${pkg.name}...`);

  // Determine if entry is a file or directory
  const entryStat = statSync(entryPath);
  const entryDir = entryStat.isDirectory() ? entryPath : dirname(entryPath);

  // Find all TypeScript files
  const tsFiles = entryStat.isDirectory()
    ? findTypeScriptFiles(entryPath)
    : [entryPath];

  if (tsFiles.length === 0) {
    console.log('⚠️ No TypeScript files found.');
    return;
  }

  console.log(`   Scanning ${tsFiles.length} file(s)...`);

  // Extract schemas from all files, tracking their relative paths
  const allGeneratedSchemas: GeneratedSchema[] = [];
  const schemasByDir: Map<string, GeneratedSchema[]> = new Map();

  for (const filePath of tsFiles) {
    const schemas = await extractSchemas(filePath);

    if (schemas.length === 0) continue;

    // Calculate relative path from entry directory
    const relativeDir = relative(entryDir, dirname(filePath));

    for (const { name, schema } of schemas) {
      const jsonSchema = toJSONSchema(schema, name);
      const generated: GeneratedSchema = {
        name,
        relativePath: relativeDir,
        jsonSchema,
      };

      allGeneratedSchemas.push(generated);

      // Group by directory for combined schemas
      const dirKey = relativeDir || '.';
      if (!schemasByDir.has(dirKey)) {
        schemasByDir.set(dirKey, []);
      }
      schemasByDir.get(dirKey)!.push(generated);
    }
  }

  if (allGeneratedSchemas.length === 0) {
    console.log('⚠️ No Zod schemas found.');
    return;
  }

  console.log(`   Found ${allGeneratedSchemas.length} schema(s)`);

  // Calculate the entry subdirectory to include in output path
  // e.g., if entry is ./es/index.ts or ./es, we want to preserve "es" in output
  const entrySubdir = entryStat.isDirectory()
    ? relative(cwd, entryPath)
    : relative(cwd, dirname(entryPath));

  // Write individual schema files, preserving directory structure
  for (const { name, relativePath, jsonSchema } of allGeneratedSchemas) {
    // Combine: baseOutput + entrySubdir + relativePath
    const outputSubdir = entrySubdir
      ? (relativePath ? join(entrySubdir, relativePath) : entrySubdir)
      : relativePath;
    const outputDir = join(cwd, baseOutputDir, outputSubdir);

    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const fileName = `${name}.json`;
    const filePath = join(outputDir, fileName);
    writeFileSync(filePath, JSON.stringify(jsonSchema, null, 2), 'utf-8');

    const displayPath = outputSubdir ? `${outputSubdir}/${fileName}` : fileName;
    console.log(`   ✅ ${displayPath}`);
  }

  // Generate combined index.json files per directory
  if (options.combined !== false) {
    for (const [dirKey, schemas] of schemasByDir) {
      const outputSubdir = entrySubdir
        ? (dirKey !== '.' ? join(entrySubdir, dirKey) : entrySubdir)
        : (dirKey !== '.' ? dirKey : '');
      const outputDir = join(cwd, baseOutputDir, outputSubdir);

      const combinedSchema = {
        $schema: 'https://json-schema.org/draft/2020-12/schema',
        title: outputSubdir ? `${pkg.name}/${outputSubdir}` : pkg.name,
        description: pkg.description || `JSON Schemas for ${pkg.name}`,
        $defs: Object.fromEntries(schemas.map(s => [s.name, s.jsonSchema])),
      };

      const combinedPath = join(outputDir, 'index.json');
      writeFileSync(combinedPath, JSON.stringify(combinedSchema, null, 2), 'utf-8');

      const displayPath = outputSubdir ? `${outputSubdir}/index.json` : 'index.json';
      console.log(`   ✅ ${displayPath} (combined)`);
    }
  }

  console.log(`\n✅ JSON Schema generation complete: ${baseOutputDir}`);
}

// CLI execution
const isMainModule = import.meta.url === `file://${process.argv[1]}` ||
                     process.argv[1]?.endsWith('generate-json-schema.ts') ||
                     import.meta.url.endsWith(process.argv[1] || '');

if (isMainModule) {
  const args = process.argv.slice(2);
  const options: {
    entry?: string;
    output?: string;
    cwd?: string;
    combined?: boolean;
  } = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--entry' && args[i + 1]) {
      options.entry = args[i + 1];
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      options.output = args[i + 1];
      i++;
    } else if (args[i] === '--cwd' && args[i + 1]) {
      options.cwd = args[i + 1];
      i++;
    } else if (args[i] === '--no-combined') {
      options.combined = false;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
Usage: tsx generate-json-schema.ts --entry <path> [options]

Options:
  --entry <path>     Entry file or directory containing Zod schemas (required)
  --output <path>    Base output directory for JSON Schema files (default: ./json-schemas)
  --cwd <path>       Working directory (default: current directory)
  --no-combined      Skip generating the combined index.json files
  --help, -h         Show this help message

The script preserves the source directory structure in the output.
For example, schemas in ./es/Clothing/ will be output to ./json-schemas/es/Clothing/

Examples:
  tsx generate-json-schema.ts --entry ./es
  tsx generate-json-schema.ts --entry ./index.ts
  tsx generate-json-schema.ts --entry ./src --output ./schemas
`);
      process.exit(0);
    }
  }

  if (!options.entry) {
    console.error('Error: --entry is required');
    console.error('Run with --help for usage information');
    process.exit(1);
  }

  generateJSONSchemas({
    entry: options.entry,
    output: options.output,
    cwd: options.cwd,
    combined: options.combined,
  }).catch((error) => {
    console.error('Error generating JSON schemas:', error);
    process.exit(1);
  });
}

export { generateJSONSchemas };
