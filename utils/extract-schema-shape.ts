import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Represents a JSON Schema structure for comparison
 */
export interface SchemaShape {
  [key: string]: any; // JSON Schema is flexible, so we use any
}

/**
 * Detects language folders in a package's json-schemas directory
 * A package is considered multi-language if it has folders like es/, en/, etc.
 * that contain index.json files
 */
export function detectLanguageFolders(packagePath: string): string[] {
  const jsonSchemasPath = join(packagePath, 'json-schemas');
  
  if (!existsSync(jsonSchemasPath)) {
    return [];
  }

  const languageFolders: string[] = [];
  
  try {
    const entries = readdirSync(jsonSchemasPath);
    
    for (const entry of entries) {
      const entryPath = join(jsonSchemasPath, entry);
      const stat = statSync(entryPath);
      
      // Check if it's a directory and contains index.json
      if (stat.isDirectory()) {
        const indexPath = join(entryPath, 'index.json');
        if (existsSync(indexPath)) {
          languageFolders.push(entry);
        }
      }
    }
  } catch (error) {
    // If we can't read the directory, return empty array
    return [];
  }

  return languageFolders.sort();
}

/**
 * Loads JSON schemas from the json-schemas directory of a package
 * Note: JSON schemas should be generated before calling this function
 * @param packagePath Path to the package directory
 * @param subFolder Optional subfolder (e.g., 'es', 'en') to read from instead of root index.json
 */
export async function extractPackageShapes(
  packagePath: string,
  subFolder?: string
): Promise<Record<string, SchemaShape>> {
  const jsonSchemasPath = subFolder
    ? join(packagePath, 'json-schemas', subFolder, 'index.json')
    : join(packagePath, 'json-schemas', 'index.json');

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
 * @param packagePath Path to the package directory
 * @param gitRef Git reference (tag, commit, etc.)
 * @param subFolder Optional subfolder (e.g., 'es', 'en') to read from instead of root index.json
 */
export async function extractShapesFromGit(
  packagePath: string,
  gitRef: string,
  subFolder?: string
): Promise<Record<string, SchemaShape>> {
  const workspaceRoot = join(__dirname, '..');
  const gitPath = packagePath.replace(workspaceRoot + '/', '');
  const jsonSchemasPath = subFolder
    ? join(gitPath, 'json-schemas', subFolder, 'index.json')
    : join(gitPath, 'json-schemas', 'index.json');

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
