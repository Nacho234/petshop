// Cálculo de métricas del panel a partir de las ventas.
// Funciones puras: reciben la lista de ventas y devuelven agregados.

const isSameMonth = (d, ref) =>
  d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth()

// Una venta "cuenta" para métricas si no está cancelada.
const esValida = (s) => s.status !== 'Cancelada'

export function metricsForMonth(sales, ref = new Date()) {
  const delMes = sales.filter((s) => isSameMonth(new Date(s.date), ref))
  const validas = delMes.filter(esValida)

  const revenue = validas.reduce((n, s) => n + s.total, 0)
  const orders = validas.length
  const units = validas.reduce((n, s) => n + s.items.reduce((u, it) => u + it.qty, 0), 0)
  const avgTicket = orders ? Math.round(revenue / orders) : 0
  const pendientes = delMes.filter((s) => s.status === 'Pendiente').length

  // Ingresos por día del mes (para el gráfico de barras).
  const daysInMonth = new Date(ref.getFullYear(), ref.getMonth() + 1, 0).getDate()
  const byDay = Array.from({ length: daysInMonth }, (_, i) => ({ day: i + 1, revenue: 0 }))
  for (const s of validas) {
    const day = new Date(s.date).getDate()
    byDay[day - 1].revenue += s.total
  }

  // Top productos por unidades vendidas.
  const prodMap = new Map()
  for (const s of validas) {
    for (const it of s.items) {
      const cur = prodMap.get(it.productId) || { name: it.name, brand: it.brand, qty: 0, revenue: 0 }
      cur.qty += it.qty
      cur.revenue += it.price * it.qty
      prodMap.set(it.productId, cur)
    }
  }
  const topProducts = [...prodMap.values()].sort((a, b) => b.qty - a.qty).slice(0, 5)

  // Reparto por método de pago.
  const byPayment = {}
  for (const s of validas) {
    byPayment[s.paymentMethod] = (byPayment[s.paymentMethod] || 0) + s.total
  }

  return { revenue, orders, units, avgTicket, pendientes, byDay, topProducts, byPayment }
}

// Variación porcentual del mes actual vs el anterior (ingresos).
export function revenueDelta(sales, ref = new Date()) {
  const cur = metricsForMonth(sales, ref).revenue
  const prevRef = new Date(ref.getFullYear(), ref.getMonth() - 1, 1)
  const prev = metricsForMonth(sales, prevRef).revenue
  if (!prev) return null
  return Math.round(((cur - prev) / prev) * 100)
}

const isSameDay = (d, ref) =>
  d.getFullYear() === ref.getFullYear() &&
  d.getMonth() === ref.getMonth() &&
  d.getDate() === ref.getDate()

// Métricas rápidas para las tarjetas de arriba de Ventas.
export function quickMetrics(sales, ref = new Date()) {
  const validasHoy = sales.filter((s) => s.status !== 'Cancelada' && isSameDay(new Date(s.date), ref))
  const mes = metricsForMonth(sales, ref)
  return {
    revenueToday: validasHoy.reduce((n, s) => n + s.total, 0),
    ordersToday: validasHoy.length,
    revenueMonth: mes.revenue,
    ordersMonth: mes.orders,
    avgTicket: mes.avgTicket,
    pendientes: mes.pendientes,
  }
}

const ymKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`

// Informe: una fila por mes con ventas, facturado y unidades (más nuevo primero).
export function monthlyReport(sales) {
  const map = new Map()
  for (const s of sales) {
    if (s.status === 'Cancelada') continue
    const d = new Date(s.date)
    const key = ymKey(d)
    const cur = map.get(key) || {
      key,
      label: new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' }).format(d),
      orders: 0,
      revenue: 0,
      units: 0,
    }
    cur.orders += 1
    cur.revenue += s.total
    cur.units += s.items.reduce((u, it) => u + it.qty, 0)
    map.set(key, cur)
  }
  return [...map.values()].sort((a, b) => b.key.localeCompare(a.key))
}
