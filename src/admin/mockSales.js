// Ventas de ejemplo para el panel MIENTRAS no hay checkout ni base de datos.
// Se generan de forma DETERMINISTA (mismo resultado en cada carga) y ancladas
// al mes actual, para que el Dashboard "del mes" siempre tenga datos.
//
// El día de mañana, cuando exista el checkout + DB, esto se reemplaza por una
// consulta real; el resto del panel (Dashboard y Ventas) consume la misma forma
// de datos, así que no habrá que tocar la UI.
import { products as seed } from '../data'

// PRNG determinista (mulberry32) para que la data no cambie entre recargas.
function mulberry32(seedNum) {
  let a = seedNum
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const NOMBRES = [
  'María González', 'Lucas Fernández', 'Sofía Martínez', 'Mateo Rodríguez',
  'Valentina López', 'Benjamín Pérez', 'Camila Sánchez', 'Thiago Díaz',
  'Julieta Romero', 'Joaquín Torres', 'Martina Ruiz', 'Bautista Álvarez',
  'Emma Giménez', 'Santiago Molina', 'Isabella Castro', 'Nicolás Ortega',
  'Delfina Rojas', 'Tomás Herrera', 'Renata Silva', 'Agustín Núñez',
  'Catalina Ríos', 'Franco Medina', 'Victoria Suárez', 'Ignacio Vega',
]

const CIUDADES = [
  ['Rosario', 'Santa Fe', '2000'],
  ['Córdoba', 'Córdoba', '5000'],
  ['La Plata', 'Buenos Aires', '1900'],
  ['Mendoza', 'Mendoza', '5500'],
  ['San Miguel de Tucumán', 'Tucumán', '4000'],
  ['Mar del Plata', 'Buenos Aires', '7600'],
  ['Salta', 'Salta', '4400'],
  ['Santa Fe', 'Santa Fe', '3000'],
]

const CALLES = [
  'Av. Pellegrini', 'San Martín', 'Belgrano', 'Corrientes', 'Mitre',
  'Rivadavia', 'Sarmiento', 'Av. Córdoba', 'Urquiza', 'Moreno',
]

const METODOS = ['Mercado Pago', 'Transferencia', 'Efectivo']
// Peso: la mayoría MP, algo de transferencia, poco efectivo.
const METODOS_POND = ['Mercado Pago', 'Mercado Pago', 'Mercado Pago', 'Transferencia', 'Transferencia', 'Efectivo']

// Estados: la gran mayoría completadas, algunas pendientes, pocas canceladas.
const ESTADOS_POND = [
  'Completada', 'Completada', 'Completada', 'Completada', 'Completada',
  'Completada', 'Completada', 'Pendiente', 'Pendiente', 'Cancelada',
]

const slug = (name) => name.toLowerCase().replace(/[^a-z]/g, '.').replace(/\.+/g, '.')

function buildSales() {
  const rand = mulberry32(20260701)
  const pick = (arr) => arr[Math.floor(rand() * arr.length)]

  const now = new Date()
  const startPrev = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const spanMs = now - startPrev

  const TOTAL = 46
  const sales = []

  for (let i = 0; i < TOTAL; i++) {
    // Sesgamos las fechas hacia el mes actual (más ventas recientes).
    const biased = Math.pow(rand(), 0.62)
    const date = new Date(startPrev.getTime() + biased * spanMs)
    date.setHours(9 + Math.floor(rand() * 12), Math.floor(rand() * 60), 0, 0)

    const nombre = pick(NOMBRES)
    const [ciudad, provincia, cp] = pick(CIUDADES)

    // 1 a 4 productos distintos por pedido.
    const nItems = 1 + Math.floor(rand() * 4)
    const usados = new Set()
    const items = []
    for (let j = 0; j < nItems; j++) {
      const p = seed[Math.floor(rand() * seed.length)]
      if (usados.has(p.id)) continue
      usados.add(p.id)
      items.push({
        productId: p.id,
        name: p.name,
        brand: p.brand,
        price: p.price,
        qty: 1 + Math.floor(rand() * 3),
      })
    }

    const total = items.reduce((n, it) => n + it.price * it.qty, 0)

    sales.push({
      id: i + 1,
      code: `ZF-${1000 + i}`,
      date: date.toISOString(),
      status: pick(ESTADOS_POND),
      paymentMethod: pick(METODOS_POND),
      customer: {
        name: nombre,
        email: `${slug(nombre)}@gmail.com`,
        phone: `+54 9 ${340 + Math.floor(rand() * 40)} ${100 + Math.floor(rand() * 900)}-${1000 + Math.floor(rand() * 9000)}`,
        dni: `${20 + Math.floor(rand() * 25)}.${100 + Math.floor(rand() * 900)}.${100 + Math.floor(rand() * 900)}`,
        address: `${pick(CALLES)} ${100 + Math.floor(rand() * 3900)}`,
        city: ciudad,
        province: provincia,
        zip: cp,
      },
      items,
      total,
    })
  }

  // Más nuevas primero.
  return sales.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const sales = buildSales()

export { METODOS }
