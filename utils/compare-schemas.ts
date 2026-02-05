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
 * Compares two schema shapes and determines the semantic version bump needed
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
        description: `Schema ${schemaName} was removed`,
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
        description: `Schema ${schemaName} was added`,
      });
      hasMinor = true;
    }
  }

  // Compare existing schemas
  for (const schemaName of Object.keys(newShapes)) {
    const oldShape = oldShapes[schemaName];
    const newShape = newShapes[schemaName];

    if (!oldShape) continue; // Already handled as added

    const schemaChanges = compareSchemaShape(oldShape, newShape, schemaName);
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
            if (oldProp.optional && !newProp.optional) {
              hasMajor = true;
            } else if (!oldProp.optional && newProp.optional) {
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
 * Compares two individual schema shapes
 */
function compareSchemaShape(
  oldShape: SchemaShape,
  newShape: SchemaShape,
  schemaName: string,
  propertyPath: string = ''
): SchemaChange[] {
  const changes: SchemaChange[] = [];

  // Type change is always major
  if (oldShape.type !== newShape.type) {
    changes.push({
      type: 'type-changed',
      schema: schemaName,
      property: propertyPath || undefined,
      description: `Type changed from ${oldShape.type} to ${newShape.type}`,
    });
    return changes; // Early return, type change is breaking
  }

  // Compare descriptions (patch-level change)
  if (oldShape.description !== newShape.description) {
    changes.push({
      type: 'modified',
      schema: schemaName,
      property: propertyPath || undefined,
      description: 'Description changed',
    });
  }

  // For objects, compare properties
  if (oldShape.type === 'object' && newShape.type === 'object') {
    const oldProps = oldShape.properties || {};
    const newProps = newShape.properties || {};

    // Check for removed properties
    for (const propName of Object.keys(oldProps)) {
      if (!newProps[propName]) {
        changes.push({
          type: 'removed',
          schema: schemaName,
          property: propertyPath ? `${propertyPath}.${propName}` : propName,
          description: `Property ${propName} was removed`,
        });
      }
    }

    // Check for added properties
    for (const propName of Object.keys(newProps)) {
      if (!oldProps[propName]) {
        const propShape = newProps[propName];
        if (propShape.optional) {
          changes.push({
            type: 'added',
            schema: schemaName,
            property: propertyPath ? `${propertyPath}.${propName}` : propName,
            description: `Optional property ${propName} was added`,
          });
        } else {
          changes.push({
            type: 'added',
            schema: schemaName,
            property: propertyPath ? `${propertyPath}.${propName}` : propName,
            description: `Required property ${propName} was added`,
          });
        }
      }
    }

    // Compare existing properties
    for (const propName of Object.keys(newProps)) {
      const oldProp = oldProps[propName];
      const newProp = newProps[propName];

      if (!oldProp) continue; // Already handled as added

      const propPath = propertyPath ? `${propertyPath}.${propName}` : propName;

      // Check optionality changes
      if (oldProp.optional !== newProp.optional) {
        if (!oldProp.optional && newProp.optional) {
          // Required -> Optional: minor
          changes.push({
            type: 'modified',
            schema: schemaName,
            property: propPath,
            description: `Property ${propName} changed from required to optional`,
          });
        } else {
          // Optional -> Required: major
          changes.push({
            type: 'removed',
            schema: schemaName,
            property: propPath,
            description: `Property ${propName} changed from optional to required`,
          });
        }
      }

      // Recursively compare nested properties
      if (oldProp.type === 'object' && newProp.type === 'object') {
        changes.push(...compareSchemaShape(oldProp, newProp, schemaName, propPath));
      } else if (oldProp.type !== newProp.type) {
        changes.push({
          type: 'type-changed',
          schema: schemaName,
          property: propPath,
          description: `Property ${propName} type changed from ${oldProp.type} to ${newProp.type}`,
        });
      }
    }
  }

  // For enums, compare values
  if (oldShape.type === 'enum' && newShape.type === 'enum') {
    const oldValues = oldShape.values || [];
    const newValues = newShape.values || [];

    // Check for removed enum values
    for (const oldValue of oldValues) {
      if (!newValues.includes(oldValue)) {
        changes.push({
          type: 'removed',
          schema: schemaName,
          property: propertyPath || undefined,
          description: `Enum value ${oldValue} was removed`,
        });
      }
    }

    // Check for added enum values
    for (const newValue of newValues) {
      if (!oldValues.includes(newValue)) {
        changes.push({
          type: 'added',
          schema: schemaName,
          property: propertyPath || undefined,
          description: `Enum value ${newValue} was added`,
        });
      }
    }
  }

  // For unions, compare types
  if (oldShape.type === 'union' && newShape.type === 'union') {
    const oldTypes = oldShape.types || [];
    const newTypes = newShape.types || [];

    // Check for removed union types
    for (const oldType of oldTypes) {
      const found = newTypes.some(newType =>
        JSON.stringify(oldType) === JSON.stringify(newType)
      );
      if (!found) {
        changes.push({
          type: 'removed',
          schema: schemaName,
          property: propertyPath || undefined,
          description: 'Union type member was removed',
        });
      }
    }

    // Check for added union types
    for (const newType of newTypes) {
      const found = oldTypes.some(oldType =>
        JSON.stringify(oldType) === JSON.stringify(newType)
      );
      if (!found) {
        changes.push({
          type: 'added',
          schema: schemaName,
          property: propertyPath || undefined,
          description: 'Union type member was added',
        });
      }
    }
  }

  return changes;
}
