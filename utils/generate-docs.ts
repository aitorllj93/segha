import { zod2md } from 'zod2md';

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

interface PackageConfig {
  name: string;
  description?: string;
  version?: string;
  exports?: Record<string, string>;
  repository?: {
    url?: string;
  };
  homepage?: string;
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
function generateUsageSection(pkg: PackageConfig, schemas: SchemaInfo[]): string {
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
      usage += `
You can also import specific submodules:

\`\`\`typescript
${alternativeExports.map(([key]) => `import { ... } from '${pkg.name}${key.slice(1)}';`).join('\n')}
\`\`\`
`;
    }
  }

  return usage;
}

/**
 * Generates standard npm README header
 */
function generateHeader(pkg: PackageConfig, title: string, schemas: SchemaInfo[]): string {
  return `# ${title}

${pkg.description || 'Zod schema definitions.'}

## Installation

\`\`\`bash
pnpm add ${pkg.name}
\`\`\`

## Usage

${generateUsageSection(pkg, schemas)}
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
  const header = generateHeader(pkg, title, schemas);

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
