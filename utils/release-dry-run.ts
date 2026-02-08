import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractPackageShapes, extractShapesFromGit, detectLanguageFolders } from './extract-schema-shape.js';
import { compareShapes, ComparisonResult, LanguageComparisonResult, compareMultiLanguage } from './compare-schemas.js';
import { bumpVersion } from './generate-changelog.js';
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
  languageResults?: LanguageComparisonResult[];
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

    // Check if this is a multi-language package
    const languageFolders = detectLanguageFolders(packagePath);
    const isMultiLanguage = languageFolders.length > 0;

    if (isMultiLanguage) {
      console.log(`  🌐 Multi-language package detected: ${languageFolders.join(', ')}`);

      // Get previous version ref
      const lastRef = getLastReleaseRef(packageName);
      console.log(`  📍 Comparing with ${lastRef}`);

      // Process each language
      const languageResults: LanguageComparisonResult[] = [];

      for (const lang of languageFolders) {
        // Extract current shapes for this language
        const currentShapes = await extractPackageShapes(packagePath, lang);

        if (Object.keys(currentShapes).length === 0) {
          console.log(`  ⚠️  No schemas found for ${lang}, skipping`);
          continue;
        }

        // Extract previous shapes for this language
        const previousShapes = await extractShapesFromGit(packagePath, lastRef, lang);

        // Compare shapes for this language
        const comparison = compareShapes(previousShapes, currentShapes);

        languageResults.push({
          language: lang,
          bump: comparison.bump,
          changes: comparison.changes,
        });

        if (comparison.changes.length > 0) {
          console.log(`\n  📝 ${lang} changes:`);
          comparison.changes.forEach(change => {
            console.log(`    - ${change.type}: ${change.description || `${change.schema}${change.property ? `.${change.property}` : ''}`}`);
          });
        } else {
          console.log(`  📝 ${lang}: No changes`);
        }
      }

      // Combine results from all languages
      const multiLanguageComparison = compareMultiLanguage(languageResults);

      if (multiLanguageComparison.bump === 'none') {
        console.log(`  ✅ No changes detected in any language, skipping release`);
        return null;
      }

      // Bump version based on highest bump type
      const newVersion = bumpVersion(currentVersion, multiLanguageComparison.bump);

      console.log(`\n  🔢 Version: ${currentVersion} → ${newVersion} (${multiLanguageComparison.bump})`);

      // Collect all changes for backward compatibility
      const allChanges = languageResults.flatMap(r => r.changes);

      return {
        packagePath,
        packageName,
        currentVersion,
        newVersion,
        bump: multiLanguageComparison.bump,
        changes: allChanges,
        languageResults: languageResults,
      };
    } else {
      // Single-language mode (backward compatible)
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
    }
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
