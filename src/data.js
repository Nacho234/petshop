// Catálogo de muestra para la vidriera. Datos representativos (precios ARS).
// Imágenes vía LoremFlickr con keywords reales por producto (estables con lock).

const f = (kw, lock) => `https://loremflickr.com/600/600/${kw}?lock=${lock}`

// 3 categorías de producto. Cada una puede tener subcategorías (para el catálogo).
export const categories = [
  {
    id: 'alimento',
    label: 'Alimento balanceado',
    blurb: 'Para perros y gatos, todas las marcas',
    img: f('dogfood,petfood', 101),
    count: 86,
    subs: [
      { id: 'alimento-minorista', label: 'Minorista' },
      { id: 'alimento-mayorista', label: 'Mayorista' },
    ],
  },
  {
    id: 'accesorios',
    label: 'Accesorios de mascotas',
    blurb: 'Collares, correas y cosmética',
    img: f('dog,collar,leash', 102),
    count: 64,
    subs: [
      { id: 'accesorios-collares', label: 'Collares' },
      { id: 'accesorios-correas', label: 'Correas' },
      { id: 'accesorios-cosmetica', label: 'Cosmética mascota' },
    ],
  },
  {
    id: 'juguetes',
    label: 'Juguetes de entretenimiento',
    blurb: 'Para que no paren de jugar',
    img: f('dog,toy,ball', 103),
    count: 39,
    subs: [],
  },
]

export const products = [
  // Alimento balanceado — Minorista
  { id: 1, name: 'Balanceado Perro Adulto 15kg', brand: 'Old Prince', cat: 'alimento', sub: 'alimento-minorista', price: 38900, tag: 'Más vendido', img: f('dogfood,kibble', 11) },
  { id: 2, name: 'Balanceado Gato Adulto 7.5kg', brand: 'Royal Canin', cat: 'alimento', sub: 'alimento-minorista', price: 41200, img: f('catfood', 12) },
  { id: 3, name: 'Balanceado Cachorro 3kg', brand: 'Pro Plan', cat: 'alimento', sub: 'alimento-minorista', price: 18900, img: f('puppy,food', 13) },
  // Alimento balanceado — Mayorista
  { id: 4, name: 'Pallet Balanceado Adulto x12 (15kg)', brand: 'Dog Chow', cat: 'alimento', sub: 'alimento-mayorista', price: 410000, tag: 'Por mayor', img: f('dogfood,sacks', 14) },
  { id: 5, name: 'Caja Alimento Gato x10 (7.5kg)', brand: 'Excellent', cat: 'alimento', sub: 'alimento-mayorista', price: 360000, tag: 'Por mayor', img: f('catfood,boxes', 15) },

  // Accesorios — Collares
  { id: 6, name: 'Collar Regulable de Nylon', brand: 'PetComfort', cat: 'accesorios', sub: 'accesorios-collares', price: 6800, img: f('dog,collar', 21) },
  { id: 7, name: 'Collar Antipulgas', brand: 'Kong', cat: 'accesorios', sub: 'accesorios-collares', price: 9200, tag: 'Nuevo', img: f('pet,collar', 22) },
  // Accesorios — Correas
  { id: 8, name: 'Correa Retráctil 5m', brand: 'PetComfort', cat: 'accesorios', sub: 'accesorios-correas', price: 12400, img: f('dog,leash', 23) },
  { id: 9, name: 'Correa de Cuero Reforzada', brand: 'Kong', cat: 'accesorios', sub: 'accesorios-correas', price: 15900, img: f('leash,dog', 24) },
  // Accesorios — Cosmética mascota
  { id: 10, name: 'Shampoo Hipoalergénico 500ml', brand: 'Vitalcan', cat: 'accesorios', sub: 'accesorios-cosmetica', price: 7300, img: f('pet,shampoo', 25) },
  { id: 11, name: 'Perfume para Mascotas 120ml', brand: 'Excellent', cat: 'accesorios', sub: 'accesorios-cosmetica', price: 5400, img: f('dog,grooming', 26) },

  // Juguetes de entretenimiento
  { id: 12, name: 'Pelota de Caucho Resistente', brand: 'Kong', cat: 'juguetes', sub: null, price: 8990, tag: 'Más vendido', img: f('dog,toy,ball', 31) },
  { id: 13, name: 'Soga Mordedor Trenzada', brand: 'PlayPet', cat: 'juguetes', sub: null, price: 4990, img: f('dog,rope,toy', 32) },
  { id: 14, name: 'Ratón con Catnip x3', brand: 'PlayCat', cat: 'juguetes', sub: null, price: 4290, img: f('cat,toy', 33) },
  { id: 15, name: 'Hueso de Juguete Sonoro', brand: 'PlayPet', cat: 'juguetes', sub: null, price: 3990, tag: 'Nuevo', img: f('dog,toy', 34) },
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
