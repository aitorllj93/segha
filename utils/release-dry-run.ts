import { execSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractPackageShapes, extractShapesFromGit } from './extract-schema-shape.js';
import { compareShapes, ComparisonResult } from './compare-schemas.js';
import { bumpVersion } from './generate-changelog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workspaceRoot = join(__dirname, '..');

interface PackageReleaseInfo {
  packagePath: string;
  packageName: string;
  currentVersion: string;
  newVersion: string;
  bump: 'major' | 'minor' | 'patch' | 'none';
  changes: ComparisonResult['changes'];
}

/**
 * Detects which packages have changes compared to the previous commit
 */
function getChangedPackages(): string[] {
  try {
    // Get list of changed files
    const changedFiles = execSync('git diff --name-only HEAD~1 HEAD', {
      encoding: 'utf-8',
      cwd: workspaceRoot,
    }).trim().split('\n').filter(Boolean);

    const changedPackages = new Set<string>();

    for (const file of changedFiles) {
      // Check if file is in a package directory
      if (file.startsWith('schemas/')) {
        const parts = file.split('/');
        if (parts.length >= 2) {
          const packageName = parts[1];
          const packagePath = join(workspaceRoot, 'schemas', packageName);
          if (existsSync(join(packagePath, 'package.json'))) {
            changedPackages.add(packagePath);
          }
        }
      }
    }

    return Array.from(changedPackages);
  } catch (error) {
    console.error('Error detecting changed packages:', error);
    return [];
  }
}

/**
 * Gets the last git tag for a package
 */
function getLastTag(packageName: string): string | null {
  try {
    const tags = execSync(`git tag --list "${packageName}@*" --sort=-version:refname`, {
      encoding: 'utf-8',
      cwd: workspaceRoot,
    }).trim().split('\n').filter(Boolean);

    return tags[0] || null;
  } catch (error) {
    return null;
  }
}

/**
 * Gets the git ref for the last release of a package
 */
function getLastReleaseRef(packageName: string): string {
  const lastTag = getLastTag(packageName);
  if (lastTag) {
    return lastTag;
  }

  // If no tag exists, use HEAD~1 (previous commit)
  return 'HEAD~1';
}

/**
 * Processes a package for release (dry-run version)
 */
async function processPackage(packagePath: string): Promise<PackageReleaseInfo | null> {
  const packageJsonPath = join(packagePath, 'package.json');
  if (!existsSync(packageJsonPath)) {
    return null;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const packageName = packageJson.name;
  const currentVersion = packageJson.version || '0.0.1';

  console.log(`\n📦 Processing ${packageName}...`);

  try {
    // Extract current shapes
    const currentShapes = await extractPackageShapes(packagePath);

    if (Object.keys(currentShapes).length === 0) {
      console.log(`  ⚠️  No schemas found in ${packageName}, skipping`);
      return null;
    }

    // Get previous version ref
    const lastRef = getLastReleaseRef(packageName);
    console.log(`  📍 Comparing with ${lastRef}`);

    // Extract previous shapes
    const previousShapes = await extractShapesFromGit(packagePath, lastRef);

    // Compare shapes
    const comparison = compareShapes(previousShapes, currentShapes);

    if (comparison.bump === 'none') {
      console.log(`  ✅ No changes detected, skipping release`);
      return null;
    }

    // Bump version
    const newVersion = bumpVersion(currentVersion, comparison.bump);

    console.log(`  🔢 Version: ${currentVersion} → ${newVersion} (${comparison.bump})`);
    console.log(`  📝 Changes: ${comparison.changes.length}`);

    if (comparison.changes.length > 0) {
      console.log(`\n  Changes detected:`);
      comparison.changes.forEach(change => {
        console.log(`    - ${change.type}: ${change.description || `${change.schema}${change.property ? `.${change.property}` : ''}`}`);
      });
    }

    return {
      packagePath,
      packageName,
      currentVersion,
      newVersion,
      bump: comparison.bump,
      changes: comparison.changes,
    };
  } catch (error) {
    console.error(`  ❌ Error processing ${packageName}:`, error);
    return null;
  }
}

/**
 * Main dry-run function
 */
async function main() {
  console.log('🧪 DRY RUN MODE - No changes will be made\n');
  console.log('🚀 Starting automated release process (dry-run)...\n');

  // Check if we're in a git repository
  try {
    execSync('git rev-parse --git-dir', { cwd: workspaceRoot, stdio: 'ignore' });
  } catch {
    console.error('❌ Not in a git repository');
    process.exit(1);
  }

  // Get changed packages
  const changedPackages = getChangedPackages();

  if (changedPackages.length === 0) {
    console.log('✅ No packages with changes detected');
    console.log('\n💡 Tip: Make a commit with changes to a schema file to test');
    return;
  }

  console.log(`📋 Found ${changedPackages.length} package(s) with changes:\n`);
  changedPackages.forEach(pkg => {
    const pkgJson = JSON.parse(readFileSync(join(pkg, 'package.json'), 'utf-8'));
    console.log(`  - ${pkgJson.name}`);
  });

  // Process each package
  const releases: PackageReleaseInfo[] = [];

  for (const packagePath of changedPackages) {
    const releaseInfo = await processPackage(packagePath);
    if (releaseInfo) {
      releases.push(releaseInfo);
    }
  }

  if (releases.length === 0) {
    console.log('\n✅ No packages need to be released');
    return;
  }

  console.log(`\n📦 Summary: ${releases.length} package(s) would be released:\n`);

  for (const release of releases) {
    console.log(`  📦 ${release.packageName}`);
    console.log(`     Version: ${release.currentVersion} → ${release.newVersion} (${release.bump})`);
    console.log(`     Changes: ${release.changes.length}`);
  }

  console.log(`\n✅ Dry-run completed! No changes were made.`);
  console.log(`\n💡 To actually release, run: pnpm tsx utils/release.ts`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { main };
