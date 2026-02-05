import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractPackageShapes, extractShapesFromGit } from './extract-schema-shape.js';
import { compareShapes, ComparisonResult } from './compare-schemas.js';
import { updateChangelog, bumpVersion } from './generate-changelog.js';
import { generateJSONSchemas } from './generate-json-schema.js';

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
 * Gets all packages in the schemas directory
 */
function getAllPackages(): string[] {
  const schemasDir = join(workspaceRoot, 'schemas');
  if (!existsSync(schemasDir)) {
    return [];
  }

  const packages: string[] = [];
  const entries = execSync('ls -d */', {
    encoding: 'utf-8',
    cwd: schemasDir,
  }).trim().split('\n').filter(Boolean);

  for (const entry of entries) {
    const packagePath = join(schemasDir, entry.replace('/', ''));
    if (existsSync(join(packagePath, 'package.json'))) {
      packages.push(packagePath);
    }
  }

  return packages;
}

/**
 * Detects which packages have changes compared to their last release tag
 */
function getChangedPackages(): string[] {
  const allPackages = getAllPackages();
  const changedPackages: string[] = [];

  for (const packagePath of allPackages) {
    const packageJsonPath = join(packagePath, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const packageName = packageJson.name;

    // Get the last tag for this package
    const lastTag = getLastTag(packageName);

    if (!lastTag) {
      // No tag exists, this is a new package - check if it has any commits
      changedPackages.push(packagePath);
      continue;
    }

    // Check if there are any changes since the last tag
    try {
      const relativePath = packagePath.replace(workspaceRoot + '/', '');
      const changes = execSync(`git diff --name-only ${lastTag} HEAD -- ${relativePath}`, {
        encoding: 'utf-8',
        cwd: workspaceRoot,
      }).trim();

      if (changes) {
        changedPackages.push(packagePath);
      }
    } catch (error) {
      // If comparison fails, include the package to be safe
      changedPackages.push(packagePath);
    }
  }

  return changedPackages;
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
 * Processes a package for release
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
    // Generate JSON schemas first
    try {
      console.log(`  🔧 Generating JSON schemas...`);
      await generateJSONSchemas({
        entry: './',
        cwd: packagePath,
        silent: true,
      });
    } catch (error: any) {
      console.warn(`  ⚠️  Warning: Could not generate JSON schemas`);
      console.warn(`  Error: ${error.message}`);
    }

    // Extract current shapes from JSON schemas
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
 * Updates package.json version
 */
function updatePackageVersion(packagePath: string, newVersion: string): void {
  const packageJsonPath = join(packagePath, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  packageJson.version = newVersion;
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf-8');
}

/**
 * Generates documentation for a package
 */
function generateDocs(packagePath: string): void {
  const packageJsonPath = join(packagePath, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  if (packageJson.scripts?.docs) {
    try {
      console.log(`  📚 Generating documentation...`);
      execSync(packageJson.scripts.docs, {
        cwd: packagePath,
        stdio: 'inherit',
      });
    } catch (error) {
      console.error(`  ⚠️  Error generating docs:`, error);
    }
  }
}

/**
 * Main release function
 */
async function main() {
  console.log('🚀 Starting automated release process...\n');

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

  console.log(`\n📦 Preparing ${releases.length} package(s) for release...\n`);

  // Update versions, changelogs, and docs
  for (const release of releases) {
    console.log(`\n📝 Updating ${release.packageName}...`);

    // Update version
    updatePackageVersion(release.packagePath, release.newVersion);
    console.log(`  ✅ Version updated to ${release.newVersion}`);

    // Update changelog
    updateChangelog(release.packagePath, release.newVersion, release.bump, release.changes);
    console.log(`  ✅ CHANGELOG.md updated`);

    // Generate JSON schemas (ensure they're up to date)
    try {
      await generateJSONSchemas({
        entry: './',
        cwd: release.packagePath,
        silent: true,
      });
      console.log(`  ✅ JSON schemas updated`);
    } catch (error: any) {
      console.warn(`  ⚠️  Warning: Could not generate JSON schemas: ${error.message}`);
    }

    // Generate docs
    generateDocs(release.packagePath);
  }

  // Commit changes
  console.log(`\n💾 Committing changes...`);
  try {
    execSync('git add .', { cwd: workspaceRoot, stdio: 'inherit' });

    const commitMessage = releases
      .map(r => `chore(release): ${r.packageName}@${r.newVersion}`)
      .join('\n');

    execSync(`git commit -m "${commitMessage}"`, {
      cwd: workspaceRoot,
      stdio: 'inherit'
    });
    console.log(`  ✅ Changes committed`);
  } catch (error) {
    console.error(`  ❌ Error committing:`, error);
  }

  // Create tags
  console.log(`\n🏷️  Creating tags...`);
  for (const release of releases) {
    try {
      const tagName = `${release.packageName}@${release.newVersion}`;
      execSync(`git tag ${tagName}`, {
        cwd: workspaceRoot,
        stdio: 'inherit'
      });
      console.log(`  ✅ Tagged ${tagName}`);
    } catch (error) {
      console.error(`  ❌ Error tagging ${release.packageName}:`, error);
    }
  }

  // Push commits and tags
  console.log(`\n📤 Pushing to remote...`);
  try {
    execSync('git push', { cwd: workspaceRoot, stdio: 'inherit' });
    execSync('git push --tags', { cwd: workspaceRoot, stdio: 'inherit' });
    console.log(`  ✅ Pushed commits and tags`);
  } catch (error) {
    console.error(`  ❌ Error pushing:`, error);
  }

  // Publish to NPM
  console.log(`\n📦 Publishing to NPM...`);
  for (const release of releases) {
    try {
      console.log(`  📤 Publishing ${release.packageName}@${release.newVersion}...`);
      // pnpm publish will use the .npmrc configured by GitHub Actions OIDC
      execSync('pnpm publish --no-git-checks', {
        cwd: release.packagePath,
        stdio: 'inherit',
        env: process.env
      });
      console.log(`  ✅ Published ${release.packageName}@${release.newVersion}`);
    } catch (error) {
      console.error(`  ❌ Error publishing ${release.packageName}:`, error);
    }
  }

  console.log(`\n✅ Release process completed!`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { main };
