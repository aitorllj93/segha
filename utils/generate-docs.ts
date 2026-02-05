import { zod2md } from 'zod2md';

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

interface PackageConfig {
  name: string;
  description?: string;
  version?: string;
  repository?: {
    url?: string;
  };
  homepage?: string;
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
 * Generates standard npm README header
 */
function generateHeader(pkg: PackageConfig, title: string): string {
  return `# ${title}

${pkg.description || 'Zod schema definitions.'}

## Installation

\`\`\`bash
npm install ${pkg.name}
\`\`\`

or

\`\`\`bash
pnpm add ${pkg.name}
\`\`\`

## Usage

\`\`\`typescript
import { /* schemas */ } from '${pkg.name}';

// Example: Validate data with a schema
// const result = YourSchema.parse(data);
\`\`\`

## API Reference

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

  // Generate header
  const header = generateHeader(pkg, title);

  // Remove the first title line from zod2md output (it's "# API Reference")
  // and any immediately following empty lines
  const zodContent = zodMarkdown
    .split('\n')
    .slice(1) // Skip first line (title)
    .join('\n')
    .replace(/^\n+/, ''); // Remove leading empty lines

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
