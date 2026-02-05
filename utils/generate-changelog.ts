import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { SchemaChange, BumpType } from './compare-schemas.js';

/**
 * Gets the current date in ISO 8601 format (YYYY-MM-DD)
 */
function getISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generates a changelog entry based on detected changes
 * Following Keep a Changelog format: https://keepachangelog.com/en/1.1.0/
 */
export function generateChangelogEntry(
  version: string,
  bump: BumpType,
  changes: SchemaChange[]
): string {
  const date = getISODate();

  if (changes.length === 0) {
    return `## [${version}] - ${date}\n\n### Changed\n\n- Internal changes and improvements\n`;
  }

  const lines: string[] = [`## [${version}] - ${date}\n`];

  // Group changes by Keep a Changelog categories
  const added = changes.filter(c => c.type === 'added');
  const removed = changes.filter(c => c.type === 'removed');
  const modified = changes.filter(c => c.type === 'modified');
  const typeChanged = changes.filter(c => c.type === 'type-changed');

  // Added - for new features
  if (added.length > 0) {
    lines.push('### Added\n');

    for (const change of added) {
      const isRequired = change.description?.includes('Required') || change.description?.includes('required');
      const prefix = isRequired ? '**BREAKING** ' : '';
      lines.push(`- ${prefix}${change.description || `${change.schema}${change.property ? `.${change.property}` : ''}`}`);
    }

    lines.push('');
  }

  // Changed - for changes in existing functionality (including type changes)
  if (modified.length > 0 || typeChanged.length > 0) {
    lines.push('### Changed\n');

    for (const change of typeChanged) {
      lines.push(`- **BREAKING** ${change.description || `Type changed in ${change.schema}${change.property ? `.${change.property}` : ''}`}`);
    }

    for (const change of modified) {
      lines.push(`- ${change.description || `Modified ${change.schema}${change.property ? `.${change.property}` : ''}`}`);
    }

    lines.push('');
  }

  // Removed - for now removed features
  if (removed.length > 0) {
    lines.push('### Removed\n');

    for (const change of removed) {
      lines.push(`- **BREAKING** ${change.description || `${change.schema}${change.property ? `.${change.property}` : ''}`}`);
    }

    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Generates the Keep a Changelog header
 */
function generateChangelogHeader(packageName: string): string {
  return `# Changelog

All notable changes to ${packageName} will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
`;
}

/**
 * Updates the CHANGELOG.md file for a package
 * Following Keep a Changelog format: https://keepachangelog.com/en/1.1.0/
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

  // Check if the file has a Keep a Changelog header
  const keepAChangelogHeaderMatch = existingContent.match(/^# Changelog\n\nAll notable changes.*?\n\n(?:The format is based on.*?\n\n)?/s);

  // Also check for old-style header (package name only)
  const oldHeaderMatch = existingContent.match(/^#\s+@[\w/-]+\s*\n/);

  if (keepAChangelogHeaderMatch) {
    // Insert after the Keep a Changelog header
    const headerEnd = keepAChangelogHeaderMatch.index! + keepAChangelogHeaderMatch[0].length;
    const newContent =
      existingContent.slice(0, headerEnd) +
      entry + '\n' +
      existingContent.slice(headerEnd).replace(/^\n+/, '');
    writeFileSync(changelogPath, newContent, 'utf-8');
  } else if (oldHeaderMatch) {
    // Replace old header with Keep a Changelog format
    const packageJsonPath = join(packagePath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const packageName = packageJson.name || 'this project';

    const contentAfterHeader = existingContent.slice(oldHeaderMatch.index! + oldHeaderMatch[0].length).replace(/^\n+/, '');
    const newContent = generateChangelogHeader(packageName) + '\n' + entry + '\n' + contentAfterHeader;
    writeFileSync(changelogPath, newContent, 'utf-8');
  } else if (existingContent.trim()) {
    // Has content but no recognized header - prepend new header
    const packageJsonPath = join(packagePath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const packageName = packageJson.name || 'this project';

    const newContent = generateChangelogHeader(packageName) + '\n' + entry + '\n' + existingContent;
    writeFileSync(changelogPath, newContent, 'utf-8');
  } else {
    // No existing content, create new file
    const packageJsonPath = join(packagePath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const packageName = packageJson.name || 'this project';

    const newContent = generateChangelogHeader(packageName) + '\n' + entry;
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
