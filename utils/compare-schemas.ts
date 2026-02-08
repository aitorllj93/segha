import { SchemaShape } from './extract-schema-shape.js';

export type BumpType = 'major' | 'minor' | 'patch' | 'none';

export interface SchemaChange {
  type: 'added' | 'removed' | 'modified' | 'type-changed';
  schema: string;
  property?: string;
  description?: string;
}

export interface ComparisonResult {
  bump: BumpType;
  changes: SchemaChange[];
}

/**
 * Result of comparing schemas for a specific language
 */
export interface LanguageComparisonResult {
  language: string;
  bump: BumpType;
  changes: SchemaChange[];
}

/**
 * Result of comparing multi-language schemas
 */
export interface MultiLanguageComparisonResult {
  bump: BumpType; // The highest bump type among all languages
  languages: LanguageComparisonResult[];
}

/**
 * Deep comparison of two JSON Schema objects
 */
function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;
  if (obj1 == null || obj2 == null) return false;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

/**
 * Compares two JSON Schema shapes and determines the semantic version bump needed
 */
export function compareShapes(
  oldShapes: Record<string, SchemaShape>,
  newShapes: Record<string, SchemaShape>
): ComparisonResult {
  const changes: SchemaChange[] = [];
  let hasMajor = false;
  let hasMinor = false;
  let hasPatch = false;

  // Check for removed schemas
  for (const schemaName of Object.keys(oldShapes)) {
    if (!newShapes[schemaName]) {
      changes.push({
        type: 'removed',
        schema: schemaName,
        description: `Schema \`${schemaName}\` was removed`,
      });
      hasMajor = true;
    }
  }

  // Check for added schemas
  for (const schemaName of Object.keys(newShapes)) {
    if (!oldShapes[schemaName]) {
      changes.push({
        type: 'added',
        schema: schemaName,
        description: `Schema \`${schemaName}\` was added`,
      });
      hasMinor = true;
    }
  }

  // Compare existing schemas
  for (const schemaName of Object.keys(newShapes)) {
    const oldShape = oldShapes[schemaName];
    const newShape = newShapes[schemaName];

    if (!oldShape) continue; // Already handled as added

    const schemaChanges = compareJSONSchema(oldShape, newShape, schemaName);
    changes.push(...schemaChanges);

    // Determine bump type from changes
    for (const change of schemaChanges) {
      if (change.type === 'removed' || change.type === 'type-changed') {
        hasMajor = true;
      } else if (change.type === 'added') {
        hasMinor = true;
      } else if (change.type === 'modified') {
        // Check if it's a breaking modification
        if (change.property) {
          // Property modifications need deeper inspection
          const oldProp = oldShape.properties?.[change.property];
          const newProp = newShape.properties?.[change.property];

          if (oldProp && newProp) {
            // If property went from optional to required, it's major
            const oldRequired = oldShape.required?.includes(change.property) ?? false;
            const newRequired = newShape.required?.includes(change.property) ?? false;

            if (!oldRequired && newRequired) {
              hasMajor = true;
            } else if (oldRequired && !newRequired) {
              hasMinor = true;
            } else {
              hasPatch = true;
            }
          }
        } else {
          hasPatch = true;
        }
      }
    }
  }

  // Determine final bump type
  let bump: BumpType = 'none';
  if (hasMajor) {
    bump = 'major';
  } else if (hasMinor) {
    bump = 'minor';
  } else if (hasPatch) {
    bump = 'patch';
  }

  return { bump, changes };
}

/**
 * Compares two JSON Schema objects
 */
function compareJSONSchema(
  oldSchema: SchemaShape,
  newSchema: SchemaShape,
  schemaName: string,
  propertyPath: string = ''
): SchemaChange[] {
  const changes: SchemaChange[] = [];

  // Type change is always major
  if (oldSchema.type !== newSchema.type) {
    changes.push({
      type: 'type-changed',
      schema: schemaName,
      property: propertyPath || undefined,
      description: `\`${schemaName}\` type changed from \`${oldSchema.type}\` to \`${newSchema.type}\``,
    });
    return changes; // Early return, type change is breaking
  }

  // Compare descriptions (patch-level change)
  if (oldSchema.description !== newSchema.description) {
    changes.push({
      type: 'modified',
      schema: schemaName,
      property: propertyPath || undefined,
      description: `Description changed in \`${schemaName}\``,
    });
  }

  // For objects, compare properties
  if (oldSchema.type === 'object' && newSchema.type === 'object') {
    const oldProps = oldSchema.properties || {};
    const newProps = newSchema.properties || {};
    const oldRequired = oldSchema.required || [];
    const newRequired = newSchema.required || [];

    // Check for removed properties
    for (const propName of Object.keys(oldProps)) {
      if (!newProps[propName]) {
        changes.push({
          type: 'removed',
          schema: schemaName,
          property: propertyPath ? `${propertyPath}.${propName}` : propName,
          description: `Property \`${propName}\` was removed from \`${schemaName}\``,
        });
      }
    }

    // Check for added properties
    for (const propName of Object.keys(newProps)) {
      if (!oldProps[propName]) {
        const isRequired = newRequired.includes(propName);
        changes.push({
          type: 'added',
          schema: schemaName,
          property: propertyPath ? `${propertyPath}.${propName}` : propName,
          description: `${isRequired ? 'Required' : 'Optional'} property \`${propName}\` was added to \`${schemaName}\``,
        });
      }
    }

    // Compare existing properties
    for (const propName of Object.keys(newProps)) {
      const oldProp = oldProps[propName];
      const newProp = newProps[propName];

      if (!oldProp) continue; // Already handled as added

      const propPath = propertyPath ? `${propertyPath}.${propName}` : propName;

      // Check required status changes
      const wasRequired = oldRequired.includes(propName);
      const isRequired = newRequired.includes(propName);

      if (wasRequired !== isRequired) {
        if (!wasRequired && isRequired) {
          changes.push({
            type: 'removed',
            schema: schemaName,
            property: propPath,
            description: `Property \`${propName}\` in \`${schemaName}\` changed from optional to required`,
          });
        } else {
          changes.push({
            type: 'added',
            schema: schemaName,
            property: propPath,
            description: `Property \`${propName}\` in \`${schemaName}\` changed from required to optional`,
          });
        }
      }

      // Recursively compare nested properties
      if (oldProp.type === 'object' && newProp.type === 'object') {
        changes.push(...compareJSONSchema(oldProp, newProp, schemaName, propPath));
      } else if (oldProp.type !== newProp.type) {
        changes.push({
          type: 'type-changed',
          schema: schemaName,
          property: propPath,
          description: `Property \`${propName}\` in \`${schemaName}\` type changed from \`${oldProp.type}\` to \`${newProp.type}\``,
        });
      } else if (!deepEqual(oldProp, newProp)) {
        // Other changes (enum values, etc.)
        if (oldProp.enum && newProp.enum) {
          const removedValues = oldProp.enum.filter((v: any) => !newProp.enum.includes(v));
          const addedValues = newProp.enum.filter((v: any) => !oldProp.enum.includes(v));

          if (removedValues.length > 0) {
            changes.push({
              type: 'removed',
              schema: schemaName,
              property: propPath,
              description: `Enum values removed from \`${schemaName}\`.\`${propName}\`: ${removedValues.map(v => `\`${v}\``).join(', ')}`,
            });
          }
          if (addedValues.length > 0) {
            changes.push({
              type: 'added',
              schema: schemaName,
              property: propPath,
              description: `Enum values added to \`${schemaName}\`.\`${propName}\`: ${addedValues.map(v => `\`${v}\``).join(', ')}`,
            });
          }
        } else {
          changes.push({
            type: 'modified',
            schema: schemaName,
            property: propPath,
            description: `Property \`${propName}\` in \`${schemaName}\` was modified`,
          });
        }
      }
    }
  }

  // For enums, compare values
  if (oldSchema.enum && newSchema.enum) {
    const removedValues = oldSchema.enum.filter((v: any) => !newSchema.enum.includes(v));
    const addedValues = newSchema.enum.filter((v: any) => !oldSchema.enum.includes(v));

    if (removedValues.length > 0) {
      changes.push({
        type: 'removed',
        schema: schemaName,
        property: propertyPath || undefined,
        description: `Enum values removed from \`${schemaName}\`: ${removedValues.map(v => `\`${v}\``).join(', ')}`,
      });
    }
    if (addedValues.length > 0) {
      changes.push({
        type: 'added',
        schema: schemaName,
        property: propertyPath || undefined,
        description: `Enum values added to \`${schemaName}\`: ${addedValues.map(v => `\`${v}\``).join(', ')}`,
      });
    }
  }

  return changes;
}

/**
 * Compares schemas for multiple languages and combines the results
 * The final bump type is the highest among all languages
 */
export function compareMultiLanguage(
  languageResults: LanguageComparisonResult[]
): MultiLanguageComparisonResult {
  if (languageResults.length === 0) {
    return {
      bump: 'none',
      languages: [],
    };
  }

  // Determine the highest bump type
  const bumpPriority: Record<BumpType, number> = {
    none: 0,
    patch: 1,
    minor: 2,
    major: 3,
  };

  let highestBump: BumpType = 'none';
  for (const result of languageResults) {
    if (bumpPriority[result.bump] > bumpPriority[highestBump]) {
      highestBump = result.bump;
    }
  }

  return {
    bump: highestBump,
    languages: languageResults,
  };
}
