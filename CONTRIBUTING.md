# Cómo trabajamos (2 personas)

Regla de oro: **nadie edita `main` directo.** `main` es la versión que siempre
funciona. Cada uno trabaja en su propia rama y junta los cambios con un Pull Request.

## Flujo de cada día

1. Traé lo último de main:
   ```bash
   git checkout main
   git pull origin main
   ```

2. Creá una rama nueva para lo que vas a hacer (nombre: `tunombre/tarea`):
   ```bash
   git checkout -b nacho/hero
   ```

3. Trabajá y guardá seguido:
   ```bash
   git add -A
   git commit -m "ajusto el hero"
   git push origin nacho/hero
   ```

4. Cuando terminás, abrí el Pull Request:
   ```bash
   gh pr create --fill
   ```
   Revisás que esté bien y lo mergeás. `main` queda actualizado para los dos.

5. El otro, para tener tus cambios, vuelve al paso 1 (`git pull origin main`).

## Las 3 reglas que evitan choques

1. **Repártanse por archivos distintos.** Si vos tocás `Hero.jsx` y el otro
   `Catalog.jsx`, nunca chocan. Lo que rompe es editar el mismo archivo a la vez.
2. **`git pull` antes de empezar, siempre.**
3. **Ramas chicas y seguido.** Mejor varios PRs chicos que uno gigante.

## Cosas a tener en cuenta

- El dev server (`npm run dev`) es local de cada uno, no se comparte ni choca.
- `node_modules/` y `dist/` no se suben (están en `.gitignore`). Tras un
  `git pull`, si cambió `package.json`, corré `npm install`.
- Si aparece un "conflict" (los dos editaron lo mismo), Git marca el archivo con
  `<<<<<<<` / `>>>>>>>`. Se elige qué queda, se borran las marcas, y
  `git add` + `git commit`.

## Correr el proyecto

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción
```
