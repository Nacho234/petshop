# Webnico · Petshop

Vidriera / catálogo online para un petshop (perros, gatos, aves y peces).
Solo frontend, sin backend ni carrito todavía.

## Stack

- **Vite + React** (JavaScript)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Motion** (`motion/react`) para animaciones
- **Phosphor Icons** (`@phosphor-icons/react`)
- Fuentes self-hosted vía Fontsource (Outfit + Plus Jakarta Sans)

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## Estructura

```
src/
  components/    Nav, Hero, Categories, Catalog, Benefits, CTA, Footer
  data.js        Catálogo de muestra (productos y categorías)
  index.css      Tokens de diseño (tema crema + acento verde)
  App.jsx        Composición de la página
```

## Diseño

- Paleta crema cálida con un único acento verde bosque (`#2e7d5b`).
- Tipografía friendly: Outfit (títulos) + Plus Jakarta Sans (cuerpo).
- Tema light fijo, respeta `prefers-reduced-motion`.
- Imágenes de muestra vía LoremFlickr (reemplazar por fotos reales de producto).

## Pendiente

- Fotos reales de productos.
- Carrito + checkout (fase futura).
