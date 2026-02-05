import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { SchemaChange, BumpType } from './compare-schemas.js';

/**
 * Generates a changelog entry based on detected changes
 */
export function generateChangelogEntry(
  version: string,
  bump: BumpType,
  changes: SchemaChange[]
): string {
  if (changes.length === 0) {
    return `## ${version}\n\n### Patch Changes\n\n- Internal changes and improvements\n`;
  }

  const lines: string[] = [`## ${version}\n`];

  // Group changes by type
  const added = changes.filter(c => c.type === 'added');
  const removed = changes.filter(c => c.type === 'removed');
  const modified = changes.filter(c => c.type === 'modified');
  const typeChanged = changes.filter(c => c.type === 'type-changed');

  // Major changes
  if (removed.length > 0 || typeChanged.length > 0) {
    lines.push('### Major Changes\n');

    for (const change of removed) {
      lines.push(`- **BREAKING**: ${change.description || `${change.schema}${change.property ? `.${change.property}` : ''} was removed`}`);
    }

    for (const change of typeChanged) {
      lines.push(`- **BREAKING**: ${change.description || `Type changed in ${change.schema}${change.property ? `.${change.property}` : ''}`}`);
    }

    lines.push('');
  }

  // Minor changes (new features)
  if (added.length > 0 && bump !== 'major') {
    lines.push('### Minor Changes\n');

    for (const change of added) {
      lines.push(`- ${change.description || `${change.schema}${change.property ? `.${change.property}` : ''} was added`}`);
    }

    lines.push('');
  }

  // Patch changes
  if (modified.length > 0 && bump === 'patch') {
    lines.push('### Patch Changes\n');

    for (const change of modified) {
      lines.push(`- ${change.description || `Modified ${change.schema}${change.property ? `.${change.property}` : ''}`}`);
    }

    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Updates the CHANGELOG.md file for a package
 */
export function updateChangelog(
  packagePath: string,
  version: string,
  bump: BumpType,
  changes: SchemaChange[]
): void {
  const changelogPath = join(packagePath, 'CHANGELOG.md');

  let existingContent = '';
  if (existsSync(changelogPath)) {
    existingContent = readFileSync(changelogPath, 'utf-8');
  }

  const entry = generateChangelogEntry(version, bump, changes);

  // Insert the new entry after the header (if it exists)
  const headerMatch = existingContent.match(/^#\s+@[\w/-]+\s*\n/);
  if (headerMatch) {
    const headerEnd = headerMatch.index! + headerMatch[0].length;
    const newContent =
      existingContent.slice(0, headerEnd) +
      '\n' + entry + '\n' +
      existingContent.slice(headerEnd).replace(/^\n+/, '');
    writeFileSync(changelogPath, newContent, 'utf-8');
  } else {
    // No header, create one
    const packageJsonPath = join(packagePath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const packageName = packageJson.name || 'Unknown Package';

    const newContent = `# ${packageName}\n\n${entry}${existingContent ? '\n' + existingContent : ''}`;
    writeFileSync(changelogPath, newContent, 'utf-8');
  }
}

/**
 * Bumps the version in package.json according to semver rules
 */
export function bumpVersion(currentVersion: string, bump: BumpType): string {
  if (bump === 'none') {
    return currentVersion;
  }

  const parts = currentVersion.split('.').map(Number);
  let [major, minor, patch] = parts;

  if (parts.length < 3) {
    // Handle versions like "0.0" or "1"
    while (parts.length < 3) {
      parts.push(0);
    }
    [major, minor, patch] = parts;
  }

  switch (bump) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return currentVersion;
  }
}
