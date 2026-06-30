// Catálogo de muestra para la vidriera. Datos representativos (precios ARS).
// Imágenes vía LoremFlickr con keywords reales por producto (estables con lock).

export const categories = [
  { id: 'perros', label: 'Perros', blurb: 'Alimento, snacks y juguetes', img: 'dog,puppy', count: 128 },
  { id: 'gatos', label: 'Gatos', blurb: 'Comida, piedras y rascadores', img: 'cat,kitten', count: 94 },
  { id: 'aves', label: 'Aves', blurb: 'Semillas, jaulas y accesorios', img: 'parrot,bird', count: 41 },
  { id: 'peces', label: 'Peces', blurb: 'Acuarios, filtros y alimento', img: 'aquarium,fish', count: 37 },
]

const f = (kw, lock) => `https://loremflickr.com/600/600/${kw}?lock=${lock}`

export const products = [
  { id: 1, name: 'Balanceado Adultos Razas Medianas 15kg', brand: 'Old Prince', cat: 'perros', price: 38900, tag: 'Más vendido', img: f('dogfood,kibble', 11) },
  { id: 2, name: 'Snacks Dentales Mix x30', brand: 'Vitalcan', cat: 'perros', price: 6450, img: f('dog,treats', 12) },
  { id: 3, name: 'Pelota de Caucho Resistente', brand: 'Kong', cat: 'perros', price: 8990, tag: 'Nuevo', img: f('dog,toy,ball', 13) },
  { id: 4, name: 'Cama Acolchada Talle L', brand: 'PetComfort', cat: 'perros', price: 27400, img: f('dog,bed', 14) },

  { id: 5, name: 'Alimento Gatos Esterilizados 7.5kg', brand: 'Royal Canin', cat: 'gatos', price: 41200, tag: 'Más vendido', img: f('catfood', 21) },
  { id: 6, name: 'Piedras Sanitarias Aglutinantes 10kg', brand: 'Catit', cat: 'gatos', price: 9870, img: f('cat,litter', 22) },
  { id: 7, name: 'Rascador Torre con Cuevas', brand: 'FelizGato', cat: 'gatos', price: 33500, tag: 'Nuevo', img: f('cat,scratcher', 23) },
  { id: 8, name: 'Ratón de Juguete con Catnip x3', brand: 'PlayCat', cat: 'gatos', price: 4290, img: f('cat,toy', 24) },

  { id: 9, name: 'Mezcla de Semillas Premium 1kg', brand: 'Vitakraft', cat: 'aves', price: 5650, img: f('bird,seeds', 31) },
  { id: 10, name: 'Jaula Vuelo con Comederos', brand: 'AviHome', cat: 'aves', price: 48700, tag: 'Más vendido', img: f('birdcage', 32) },
  { id: 11, name: 'Bloque de Calcio y Minerales', brand: 'Vitakraft', cat: 'aves', price: 2380, img: f('parrot,cage', 33) },
  { id: 12, name: 'Bebedero Antigoteo 250ml', brand: 'AviHome', cat: 'aves', price: 3120, img: f('bird,feeder', 34) },

  { id: 13, name: 'Acuario Kit Completo 54L', brand: 'AquaLux', cat: 'peces', price: 86400, tag: 'Más vendido', img: f('aquarium,tank', 41) },
  { id: 14, name: 'Filtro Externo 800 L/h', brand: 'Sera', cat: 'peces', price: 52300, img: f('aquarium,filter', 42) },
  { id: 15, name: 'Alimento Escamas Tropicales 250g', brand: 'Tetra', cat: 'peces', price: 7480, tag: 'Nuevo', img: f('fish,food', 43) },
  { id: 16, name: 'Termocalentador Sumergible 100W', brand: 'AquaLux', cat: 'peces', price: 18900, img: f('aquarium,fish', 44) },
]

// ── Peluquería canina ──────────────────────────────────────────────
// Tamaños de perro. El precio de cada nivel varía según el tamaño.
export const groomingSizes = [
  { id: 'chico', label: 'Perro chico', hint: 'hasta 10 kg' },
  { id: 'mediano', label: 'Perro mediano', hint: '10 a 25 kg' },
  { id: 'grande', label: 'Perro grande', hint: '25 a 45 kg' },
  { id: 'gigante', label: 'Perro gigante', hint: 'más de 45 kg' },
]

// 3 niveles de servicio. `prices` tiene un valor por tamaño (en ARS).
// 👉 Para actualizar: cambiá los números de `prices` y el texto de `features`.
export const groomingTiers = [
  {
    id: 'bronce',
    name: 'Bronce',
    blurb: 'El baño esencial, prolijo y a tiempo.',
    features: ['Baño con shampoo neutro', 'Secado y cepillado', 'Corte de uñas', 'Perfume y moño'],
    prices: { chico: 40000, mediano: 45000, grande: 59000, gigante: 67000 },
  },
  {
    id: 'plata',
    name: 'Plata',
    blurb: 'Baño completo más corte y cuidado de oídos.',
    features: ['Todo lo del nivel Bronce', 'Corte de pelo a medida', 'Limpieza de oídos', 'Glándulas anales'],
    prices: { chico: 55000, mediano: 63000, grande: 80000, gigante: 92000 },
    featured: true, // se muestra destacado ("Más elegido")
  },
  {
    id: 'oro',
    name: 'Oro',
    blurb: 'La experiencia premium de cuidado integral.',
    features: ['Todo lo del nivel Plata', 'Tratamiento hidratante', 'Cepillado dental', 'Deslanado premium'],
    prices: { chico: 69000, mediano: 79000, grande: 100000, gigante: 115000 },
  },
]

export const fmtPrice = (n) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
