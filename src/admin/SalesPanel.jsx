import { useMemo, useState } from 'react'
import { fmtPrice } from '../data'
import { CaretDown, MagnifyingGlass, User, MapPin, CreditCard } from '../icons'
import { sales } from './mockSales'
import { quickMetrics, monthlyReport } from './metrics'

const STATUS = ['Todas', 'Completada', 'Pendiente', 'Cancelada']
const badge = {
  Completada: 'bg-leaf-soft text-leaf-deep',
  Pendiente: 'bg-honey/25 text-amber-700',
  Cancelada: 'bg-red-50 text-red-600',
}

const fmtDateTime = (iso) =>
  new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))

const ymKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`

// Descarga un CSV con todas las ventas del mes indicado.
function downloadCsv(monthKey) {
  const rows = sales.filter((s) => ymKey(new Date(s.date)) === monthKey)
  const head = [
    'Código', 'Fecha', 'Cliente', 'Email', 'Teléfono', 'DNI',
    'Dirección', 'Ciudad', 'Provincia', 'CP', 'Pago', 'Estado', 'Total', 'Detalle',
  ]
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const lines = rows.map((s) =>
    [
      s.code,
      new Date(s.date).toLocaleString('es-AR'),
      s.customer.name,
      s.customer.email,
      s.customer.phone,
      s.customer.dni,
      s.customer.address,
      s.customer.city,
      s.customer.province,
      s.customer.zip,
      s.paymentMethod,
      s.status,
      s.total,
      s.items.map((it) => `${it.qty}x ${it.name}`).join(' | '),
    ]
      .map(esc)
      .join(','),
  )
  const csv = [head.map(esc).join(','), ...lines].join('\n')
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ventas-zafari-${monthKey}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

// ── Panel ─────────────────────────────────────────────────────────────
export default function SalesPanel() {
  const [status, setStatus] = useState('Todas')
  const [query, setQuery] = useState('')
  const [detail, setDetail] = useState(null)

  const now = useMemo(() => new Date(), [])
  const m = useMemo(() => quickMetrics(sales, now), [now])
  const report = useMemo(() => monthlyReport(sales), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sales.filter((s) => {
      if (status !== 'Todas' && s.status !== status) return false
      if (!q) return true
      return (
        s.customer.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.customer.email.toLowerCase().includes(q)
      )
    })
  }, [status, query])

  return (
    <div>
      {/* Métricas */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Facturado hoy" value={fmtPrice(m.revenueToday)} />
        <MetricCard label="Facturado este mes" value={fmtPrice(m.revenueMonth)} />
        <MetricCard label="Ventas del mes" value={m.ordersMonth} />
        <MetricCard label="Pendientes" value={m.pendientes} accent={m.pendientes > 0} />
      </div>

      {/* Informe mensual */}
      <ReportSection report={report} />

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {STATUS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              status === s ? 'bg-leaf text-white shadow-sm' : 'border border-line bg-white text-ink-soft hover:bg-leaf-soft'
            }`}
          >
            {s}
          </button>
        ))}
        <div className="ml-auto flex w-64 max-w-full items-center gap-2 rounded-lg border border-line bg-white px-3 focus-within:border-leaf focus-within:ring-2 focus-within:ring-leaf-soft">
          <MagnifyingGlass size={16} className="text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar cliente, código o email…"
            className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-ink-soft/60"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-card border border-line bg-white shadow-sm">
        <table className="w-full min-w-[620px] text-sm">
          <thead className="border-b border-line bg-surface text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-3 py-3">Fecha</th>
              <th className="px-3 py-3">Cliente</th>
              <th className="px-3 py-3 text-right">Total</th>
              <th className="px-3 py-3">Pago</th>
              <th className="px-3 py-3">Estado</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-black/[0.02]">
                <td className="px-3 py-2 text-ink-soft">{fmtDateTime(s.date)}</td>
                <td className="px-3 py-2">
                  <div className="font-medium text-ink">{s.customer.name}</div>
                  <div className="text-xs text-ink-soft">
                    {s.customer.city}, {s.customer.province} · {s.code}
                  </div>
                </td>
                <td className="px-3 py-2 text-right font-semibold tabular-nums text-ink">{fmtPrice(s.total)}</td>
                <td className="px-3 py-2 text-ink-soft">{s.paymentMethod}</td>
                <td className="px-3 py-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge[s.status]}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => setDetail(s)}
                    className="cursor-pointer rounded-md px-2 py-1 font-medium text-ink-soft transition-colors hover:bg-leaf-soft hover:text-leaf-deep"
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-12 text-center text-ink-soft">
                  No hay ventas que coincidan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-ink-soft">
        Datos de ejemplo. Se reemplazan por ventas reales cuando conectemos el checkout y la base de datos.
      </p>

      {detail && <OrderDrawer sale={detail} onClose={() => setDetail(null)} />}
    </div>
  )
}

function MetricCard({ label, value, accent }) {
  return (
    <div className={`rounded-card border bg-white p-4 shadow-sm ${accent ? 'border-honey' : 'border-line'}`}>
      <p className="text-xs font-medium text-ink-soft">{label}</p>
      <p className={`mt-1 text-xl font-bold tabular-nums ${accent ? 'text-amber-600' : 'text-ink'}`}>{value}</p>
    </div>
  )
}

function ReportSection({ report }) {
  return (
    <details className="mb-5 overflow-hidden rounded-card border border-line bg-white shadow-sm" open>
      <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-semibold text-ink">
        <CaretDown size={16} className="text-ink-soft" />
        Informe mensual de ventas
      </summary>
      <div className="overflow-x-auto border-t border-line">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-2 font-medium">Mes</th>
              <th className="px-4 py-2 font-medium">Ventas</th>
              <th className="px-4 py-2 font-medium">Unidades</th>
              <th className="px-4 py-2 text-right font-medium">Facturado</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {report.map((r) => (
              <tr key={r.key} className="text-ink">
                <td className="px-4 py-2.5 font-medium capitalize">{r.label}</td>
                <td className="px-4 py-2.5 tabular-nums text-ink-soft">{r.orders}</td>
                <td className="px-4 py-2.5 tabular-nums text-ink-soft">{r.units}</td>
                <td className="px-4 py-2.5 text-right font-semibold tabular-nums">{fmtPrice(r.revenue)}</td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    type="button"
                    onClick={() => downloadCsv(r.key)}
                    className="cursor-pointer rounded-lg border border-line px-3 py-1 text-xs font-medium hover:bg-leaf-soft"
                  >
                    Descargar CSV
                  </button>
                </td>
              </tr>
            ))}
            {report.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-ink-soft">
                  Todavía no hay ventas para informar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </details>
  )
}

// ── Detalle de la orden (drawer) ──────────────────────────────────────
function OrderDrawer({ sale, onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">Pedido {sale.code}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-soft hover:bg-surface"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge[sale.status]}`}>
            {sale.status}
          </span>
          <span className="text-xs text-ink-soft">{fmtDateTime(sale.date)}</span>
        </div>

        {/* Ítems */}
        <div className="mt-5 overflow-hidden rounded-xl border border-line">
          <ul className="divide-y divide-line/70">
            {sale.items.map((it) => (
              <li key={it.productId} className="flex items-center justify-between gap-3 px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-ink">
                    <span className="tabular-nums text-ink-soft">{it.qty}× </span>
                    {it.name}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {it.brand} · {fmtPrice(it.price)} c/u
                  </p>
                </div>
                <span className="shrink-0 tabular-nums font-semibold text-ink">
                  {fmtPrice(it.price * it.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-line bg-surface px-3 py-2.5">
            <span className="font-semibold text-ink">Total</span>
            <span className="font-display font-bold tabular-nums text-ink">{fmtPrice(sale.total)}</span>
          </div>
        </div>

        <Section icon={User} title="Cliente">
          <Row label="Nombre" value={sale.customer.name} />
          <Row label="DNI" value={sale.customer.dni} />
          <Row label="Email" value={sale.customer.email} />
          <Row label="Teléfono" value={sale.customer.phone} />
        </Section>

        <Section icon={MapPin} title="Envío">
          <Row label="Dirección" value={sale.customer.address} />
          <Row label="Ciudad" value={sale.customer.city} />
          <Row label="Provincia" value={sale.customer.province} />
          <Row label="CP" value={sale.customer.zip} />
        </Section>

        <Section icon={CreditCard} title="Pago">
          <Row label="Método" value={sale.paymentMethod} />
        </Section>
      </div>
    </div>
  )
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="mt-5">
      <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
        <Icon size={14} />
        {title}
      </h3>
      <div className="space-y-1 rounded-xl border border-line px-3 py-2 text-sm">{children}</div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-ink-soft">{label}</span>
      <span className="text-right text-ink">{value}</span>
    </div>
  )
}
