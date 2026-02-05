# Guía de Pruebas del Sistema de Releases

## Opción 1: Dry-Run Local (Recomendado para empezar)

Ejecuta el script en modo dry-run que muestra qué haría sin hacer cambios reales:

```bash
pnpm run release:dry-run
```

Este script:
- ✅ Detecta paquetes con cambios
- ✅ Compara schemas con versión anterior
- ✅ Muestra qué versión se asignaría
- ✅ Lista los cambios detectados
- ❌ **NO** modifica archivos
- ❌ **NO** hace commit
- ❌ **NO** publica a NPM

### Ejemplo de salida:

```
🧪 DRY RUN MODE - No changes will be made

🚀 Starting automated release process (dry-run)...

📋 Found 1 package(s) with changes:

  - @segha/catalog

📦 Processing @segha/catalog...
  📍 Comparing with HEAD~1
  🔢 Version: 0.0.1 → 0.1.0 (minor)
  📝 Changes: 2

  Changes detected:
    - added: Schema NewSchema was added
    - added: Optional property description was added

📦 Summary: 1 package(s) would be released:

  📦 @segha/catalog
     Version: 0.0.1 → 0.1.0 (minor)
     Changes: 2

✅ Dry-run completed! No changes were made.
```

## Opción 2: Probar con un Cambio Real

### Paso 1: Hacer un cambio en un schema

Por ejemplo, añade una propiedad opcional a un schema:

```typescript
// schemas/catalog/es/Clothing/index.ts
export const CatalogClothingSchema = z.object({
  garment: Garment,
  slot: Slot,
  // ... otras propiedades
  brand: z.string().optional().describe('The brand of the clothing'),
  // Añade esto:
  notes: z.string().optional().describe('Additional notes'), // NUEVO
}).describe('Prenda de ropa: Datos obtenibles de catalogación');
```

### Paso 2: Hacer commit del cambio

```bash
git add schemas/catalog/es/Clothing/index.ts
git commit -m "feat: add notes field to CatalogClothingSchema"
```

### Paso 3: Ejecutar dry-run

```bash
pnpm run release:dry-run
```

Deberías ver que detecta el cambio y propone un bump **minor** (porque es una propiedad opcional nueva).

### Paso 4: Si todo se ve bien, hacer push a main

```bash
git push origin main
```

El workflow de GitHub Actions se ejecutará automáticamente y:
1. Detectará el cambio
2. Comparará schemas
3. Bump version
4. Actualizará CHANGELOG
5. Regenerará docs
6. Hará commit
7. Creará tag
8. Publicará a NPM

## Opción 3: Probar en una Rama Separada

Si quieres probar el workflow completo sin afectar `main`:

### Paso 1: Crear rama de prueba

```bash
git checkout -b test-release
```

### Paso 2: Hacer un cambio en un schema

```typescript
// Añade una propiedad opcional
export const DocumentSchema = z.object({
  tags: arrayExclude(z.string()).nullish(),
  // ... otras propiedades
  notes: z.string().optional().describe('Test notes'), // NUEVO
});
```

### Paso 3: Commit y push

```bash
git add .
git commit -m "test: add notes field for testing release"
git push origin test-release
```

### Paso 4: Crear PR a main

Crea un PR desde `test-release` a `main`. Cuando hagas merge, el workflow se ejecutará.

### Paso 5: Verificar el workflow

Ve a la pestaña "Actions" en GitHub y observa el workflow ejecutándose.

## Opción 4: Probar Componentes Individuales

### Probar extracción de shapes

```bash
# Crear un script temporal
cat > test-extract.ts << 'EOF'
import { extractPackageShapes } from './utils/extract-schema-shape.js';

extractPackageShapes('./schemas/catalog')
  .then(shapes => {
    console.log('Schemas encontrados:', Object.keys(shapes));
    console.log(JSON.stringify(shapes, null, 2));
  })
  .catch(console.error);
EOF

pnpm tsx test-extract.ts
rm test-extract.ts
```

### Probar comparación

```bash
# Similar, crea un script que compare dos shapes
```

## Verificación Post-Release

Después de que el workflow se ejecute, verifica:

1. **Versión actualizada**: `schemas/*/package.json` tiene la nueva versión
2. **CHANGELOG actualizado**: `schemas/*/CHANGELOG.md` tiene la nueva entrada
3. **Docs regenerados**: `schemas/*/README.md` está actualizado
4. **Tag creado**: `git tag --list "@segha/*"` muestra el nuevo tag
5. **Publicado en NPM**: Verifica en npmjs.com que el paquete tiene la nueva versión

## Troubleshooting

### "No packages with changes detected"

- Asegúrate de haber hecho commit de los cambios
- El script compara `HEAD~1` con `HEAD`, así que necesitas al menos 2 commits

### "Error importing module"

- Verifica que todas las dependencias estén instaladas: `pnpm install`
- Verifica que el entry point del paquete sea correcto en `package.json`

### "No schemas found"

- Verifica que los schemas se exporten con nombres que terminen en `Schema`
- Verifica que sean realmente schemas Zod (tienen `_def`)

### El workflow falla en GitHub Actions

- Revisa los logs en la pestaña "Actions"
- Verifica que `id-token: write` esté en los permissions
- Verifica que trusted publisher esté configurado en NPM

## Tips

- **Empieza siempre con dry-run** antes de hacer push a main
- **Haz cambios pequeños** para probar cada tipo de bump (patch/minor/major)
- **Revisa los logs** del workflow en GitHub Actions si algo falla
- **Verifica los tags** con `git tag --list` después del release
