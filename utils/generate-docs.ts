import { zod2md } from 'zod2md';

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

interface PackageConfig {
  name: string;
  description?: string;
  version?: string;
  exports?: Record<string, string>;
  repository?: {
    type?: string;
    url?: string;
    directory?: string;
  };
  homepage?: string;
  license?: string;
  author?: string;
  peerDependencies?: Record<string, string>;
}

interface SchemaInfo {
  name: string;
  exportName: string;
}

/**
 * Reads package.json from the current directory
 */
function readPackageJson(cwd: string): PackageConfig {
  const packagePath = join(cwd, 'package.json');
  if (!existsSync(packagePath)) {
    throw new Error(`package.json not found in ${cwd}`);
  }
  return JSON.parse(readFileSync(packagePath, 'utf-8'));
}

/**
 * Extracts export names from a TypeScript file
 */
function extractExportsFromFile(filePath: string): string[] {
  if (!existsSync(filePath)) return [];

  const content = readFileSync(filePath, 'utf-8');
  const exports: string[] = [];

  // Match: export const FooSchema, export { Foo }, export * from
  const constExportRegex = /export\s+const\s+(\w+Schema)/g;
  const namedExportRegex = /export\s+\{\s*([^}]+)\s*\}/g;

  let match;
  while ((match = constExportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  while ((match = namedExportRegex.exec(content)) !== null) {
    const names = match[1].split(',').map(n => n.trim().split(' ')[0]);
    exports.push(...names.filter(n => n.endsWith('Schema')));
  }

  return exports.slice(0, 3); // Limit to 3 exports for readability
}

/**
 * Extracts schema names from the zod2md output
 */
function extractSchemaNames(markdown: string): SchemaInfo[] {
  const schemaRegex = /^## (\w+)/gm;
  const schemas: SchemaInfo[] = [];
  let match;

  while ((match = schemaRegex.exec(markdown)) !== null) {
    const name = match[1];
    // Convert to likely export name (e.g., "Clothing" -> "ClothingSchema")
    const exportName = name.endsWith('Schema') ? name : `${name}Schema`;
    schemas.push({ name, exportName });
  }

  return schemas;
}

/**
 * Generates table of contents for schemas
 */
function generateTOC(schemas: SchemaInfo[]): string {
  if (schemas.length <= 2) return '';

  const links = schemas.map(s => `- [${s.name}](#${s.name.toLowerCase()})`).join('\n');
  return `### Schemas

${links}

`;
}

/**
 * Generates usage examples based on actual schemas
 */
function generateUsageSection(pkg: PackageConfig, schemas: SchemaInfo[], cwd: string): string {
  if (schemas.length === 0) {
    return `\`\`\`typescript
import { /* schemas */ } from '${pkg.name}';
\`\`\`
`;
  }

  // Pick the main schema (prefer complex objects over primitives/meta schemas)
  const mainSchema = schemas.find(s =>
    !s.name.includes('Meta') &&
    !s.name.includes('Base') &&
    !s.name.includes('Catalog') &&
    !s.name.includes('Detailed') &&
    !['Text', 'URL', 'String', 'Number', 'Boolean'].includes(s.name)
  ) || schemas[0];

  const importList = schemas.slice(0, 3).map(s => s.exportName).join(', ');
  const hasMore = schemas.length > 3;

  let usage = `\`\`\`typescript
import { ${importList}${hasMore ? ', ...' : ''} } from '${pkg.name}';

// Validate data
const result = ${mainSchema.exportName}.parse(data);

// Infer TypeScript types
type ${mainSchema.name} = z.infer<typeof ${mainSchema.exportName}>;
\`\`\`
`;

  // Add alternative imports if package has multiple meaningful exports
  if (pkg.exports && Object.keys(pkg.exports).length > 1) {
    const alternativeExports = Object.entries(pkg.exports)
      .filter(([key]) => key !== '.' && !key.includes('types'))
      .slice(0, 2);

    if (alternativeExports.length > 0) {
      const submoduleImports = alternativeExports
        .map(([key, filePath]) => {
          const fullPath = join(cwd, filePath);
          const exports = extractExportsFromFile(fullPath);
          if (exports.length === 0) return null; // Skip if no direct exports found
          return `import { ${exports.join(', ')} } from '${pkg.name}${key.slice(1)}';`;
        })
        .filter(Boolean)
        .join('\n');

      if (submoduleImports) {
        usage += `
You can also import specific submodules:

\`\`\`typescript
${submoduleImports}
\`\`\`
`;
      }
    }
  }

  return usage;
}

/**
 * Generates badges for the README
 */
function generateBadges(pkg: PackageConfig): string {
  const badges: string[] = [];
  const encodedName = encodeURIComponent(pkg.name);

  // npm version badge
  badges.push(`[![npm version](https://img.shields.io/npm/v/${encodedName}.svg)](https://www.npmjs.com/package/${pkg.name})`);

  // npm downloads badge
  badges.push(`[![npm downloads](https://img.shields.io/npm/dm/${encodedName}.svg)](https://www.npmjs.com/package/${pkg.name})`);

  // License badge
  if (pkg.license) {
    badges.push(`[![license](https://img.shields.io/npm/l/${encodedName}.svg)](${pkg.homepage || '#'})`);
  }

  // TypeScript badge (always for zod schemas)
  badges.push(`[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)`);

  // Zod badge if it's a peer dependency
  if (pkg.peerDependencies?.zod) {
    badges.push(`[![zod](https://img.shields.io/badge/zod-schema-3068b7.svg)](https://zod.dev/)`);
  }

  return badges.join(' ');
}

/**
 * Generates requirements section
 */
function generateRequirements(pkg: PackageConfig): string {
  if (!pkg.peerDependencies || Object.keys(pkg.peerDependencies).length === 0) {
    return '';
  }

  const deps = Object.keys(pkg.peerDependencies)
    .filter(dep => dep !== 'catalog:')
    .map(dep => `- \`${dep}\``)
    .join('\n');

  if (!deps) return '';

  return `
## Requirements

${deps}

`;
}

/**
 * Generates standard npm README header
 */
function generateHeader(pkg: PackageConfig, title: string, schemas: SchemaInfo[], cwd: string): string {
  return `# ${title}

${generateBadges(pkg)}

${pkg.description || 'Zod schema definitions.'}
${generateRequirements(pkg)}
## Installation

\`\`\`bash
pnpm add ${pkg.name}
\`\`\`

## Usage

${generateUsageSection(pkg, schemas, cwd)}
${generateTOC(schemas)}## API Reference

`;
}

/**
 * Main function to generate documentation
 */
async function generateDocs(options: {
  entry: string;
  output?: string;
  title?: string;
  cwd?: string;
}) {
  const cwd = options.cwd || process.cwd();
  const pkg = readPackageJson(cwd);

  const entry = options.entry;
  const output = options.output || './README.md';
  const title = options.title || pkg.name;

  // Generate base documentation with zod2md
  const zodMarkdown = await zod2md({
    entry: join(cwd, entry),
    title: 'API Reference',
  });

  // Extract schema names from the generated markdown
  const schemas = extractSchemaNames(zodMarkdown);

  // Remove the first title line from zod2md output (it's "# API Reference")
  // and any immediately following empty lines
  const zodContent = zodMarkdown
    .split('\n')
    .slice(1) // Skip first line (title)
    .join('\n')
    .replace(/^\n+/, ''); // Remove leading empty lines

  // Generate header with schema info
  const header = generateHeader(pkg, title, schemas, cwd);

  // Combine header + zod2md output (without duplicate title)
  const finalMarkdown = header + zodContent;

  // Write final file
  writeFileSync(join(cwd, output), finalMarkdown, 'utf-8');

  console.log(`✅ Documentation generated: ${output}`);
}

// Execute if called directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` ||
                     process.argv[1]?.endsWith('generate-docs.ts') ||
                     import.meta.url.endsWith(process.argv[1] || '');

if (isMainModule) {
  const args = process.argv.slice(2);
  const options: {
    entry?: string;
    output?: string;
    title?: string;
    cwd?: string;
  } = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--entry' && args[i + 1]) {
      options.entry = args[i + 1];
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      options.output = args[i + 1];
      i++;
    } else if (args[i] === '--title' && args[i + 1]) {
      options.title = args[i + 1];
      i++;
    } else if (args[i] === '--cwd' && args[i + 1]) {
      options.cwd = args[i + 1];
      i++;
    }
  }

  if (!options.entry) {
    console.error('Error: --entry is required');
    process.exit(1);
  }

  generateDocs({
    entry: options.entry,
    output: options.output,
    title: options.title,
    cwd: options.cwd,
  }).catch(console.error);
}

export { generateDocs };
