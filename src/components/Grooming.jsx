import { useState } from 'react'
import { Scissors, Check, WhatsappLogo, Clock } from '../icons'
import { groomingSizes, groomingTiers, fmtPrice } from '../data'
import Reveal from './Reveal'

const WHATSAPP = '5493417544204'

// Franjas horarias (Lun a Sáb, 9 a 19:30 → último turno 19:00).
const TIME_SLOTS = (() => {
  const slots = []
  for (let h = 9; h <= 19; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    if (h < 19) slots.push(`${String(h).padStart(2, '0')}:30`)
  }
  return slots
})()

const todayStr = () => new Date().toISOString().split('T')[0]
const isSunday = (d) => d && new Date(`${d}T00:00:00`).getDay() === 0
const formatDate = (d) =>
  new Date(`${d}T00:00:00`).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })

export default function Grooming() {
  const [sizeId, setSizeId] = useState('mediano')
  const [tierId, setTierId] = useState('plata')
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const size = groomingSizes.find((s) => s.id === sizeId)
  const tier = groomingTiers.find((t) => t.id === tierId)
  const price = tier.prices[sizeId]

  const sundayPicked = isSunday(date)
  const valid = name.trim() && date && time && !sundayPicked

  const bookingHref = (() => {
    const msg = [
      '¡Hola Zafari! 🐶 Quiero reservar un turno de peluquería.',
      `Nombre: ${name.trim()}`,
      `Nivel: ${tier.name}`,
      `Tamaño: ${size.label} (${size.hint})`,
      `Día: ${date ? formatDate(date) : '-'}`,
      `Hora: ${time || '-'} hs`,
      `Precio: ${fmtPrice(price)}`,
    ].join('\n')
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
  })()

  const inputCls =
    'mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink transition-colors duration-200 focus:border-leaf focus:outline-none'

  return (
    <section id="peluqueria" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-leaf">
          <Scissors size={14} weight="bold" />
          Peluquería canina
        </span>
        <h2 className="mt-5 max-w-[22ch] font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Reservá el turno de peluquería de tu perro
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
          Elegí el tamaño de tu perro y el nivel de servicio. Después completá tus datos y reservás el
          turno por WhatsApp en un toque.
        </p>
      </Reveal>

      {/* 1 · Selector de tamaño */}
      <Reveal delay={0.06}>
        <div className="mt-8">
          <p className="text-sm font-semibold text-ink">1 · Tamaño de tu perro</p>
          <div className="mt-2 inline-flex flex-wrap gap-2 rounded-full border border-line bg-surface p-1.5" role="tablist" aria-label="Tamaño del perro">
            {groomingSizes.map((s) => {
              const on = s.id === sizeId
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setSizeId(s.id)}
                  className={
                    'cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ' +
                    (on ? 'bg-leaf text-white shadow-sm' : 'text-ink-soft hover:text-leaf')
                  }
                >
                  {s.label}
                  <span className={'ml-1.5 text-xs font-normal ' + (on ? 'text-white/75' : 'text-ink-soft/70')}>
                    {s.hint}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* 2 · Niveles de servicio (seleccionables) */}
      <Reveal delay={0.1}>
        <p className="mt-10 text-sm font-semibold text-ink">2 · Nivel de servicio</p>
      </Reveal>
      <div className="mt-3 grid gap-6 md:grid-cols-3">
        {groomingTiers.map((t, i) => {
          const tPrice = t.prices[sizeId]
          const selected = t.id === tierId
          return (
            <Reveal key={t.id} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setTierId(t.id)}
                aria-pressed={selected}
                className={
                  'relative flex h-full w-full cursor-pointer flex-col rounded-card border p-6 text-left transition-all duration-200 sm:p-7 ' +
                  (selected
                    ? 'border-leaf bg-leaf-soft shadow-[0_24px_50px_-30px_rgba(36,95,71,0.55)] ring-1 ring-leaf'
                    : 'border-line bg-surface hover:border-leaf')
                }
              >
                {t.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-leaf px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    Más elegido
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink">Nivel {t.name}</h3>
                  <span
                    className={
                      'grid h-6 w-6 place-items-center rounded-full border transition-colors duration-200 ' +
                      (selected ? 'border-leaf bg-leaf text-white' : 'border-line text-transparent')
                    }
                    aria-hidden
                  >
                    <Check size={13} weight="bold" />
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{t.blurb}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold text-ink">{fmtPrice(tPrice)}</span>
                  <span className="text-sm text-ink-soft">/ {size.label.toLowerCase()}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {t.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-ink">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-soft text-leaf-deep">
                        <Check size={13} weight="bold" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </button>
            </Reveal>
          )
        })}
      </div>

      {/* 3 · Formulario de reserva */}
      <Reveal delay={0.12}>
        <div className="mt-10 rounded-card border border-line bg-surface p-6 sm:p-8">
          <p className="text-sm font-semibold text-ink">3 · Tus datos y el turno</p>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <label className="block sm:col-span-3">
              <span className="text-sm font-semibold text-ink">Nombre y apellido</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className={inputCls}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-ink">Día</span>
              <input
                type="date"
                value={date}
                min={todayStr()}
                onChange={(e) => setDate(e.target.value)}
                className={inputCls}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-ink">Hora</span>
              <select value={time} onChange={(e) => setTime(e.target.value)} className={inputCls}>
                <option value="">Elegí una hora</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>
                    {t} hs
                  </option>
                ))}
              </select>
            </label>

            <div className="rounded-xl bg-leaf-soft px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-leaf-deep">Resumen</span>
              <p className="mt-1 text-sm font-semibold text-ink">
                {tier.name} · {size.label}
              </p>
              <p className="font-display text-2xl font-bold text-ink">{fmtPrice(price)}</p>
            </div>
          </div>

          {sundayPicked && (
            <p className="mt-4 text-sm font-semibold text-red-600">
              Los domingos estamos cerrados. Elegí un día de lunes a sábado.
            </p>
          )}

          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            {valid ? (
              <a
                href={bookingHref}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
              >
                <WhatsappLogo size={18} weight="fill" />
                Reservar turno por WhatsApp
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-line px-6 py-3.5 text-sm font-semibold text-ink-soft"
              >
                <WhatsappLogo size={18} weight="fill" />
                Reservar turno por WhatsApp
              </button>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
              <Clock size={14} weight="fill" className="text-leaf" />
              Atendemos de lunes a sábados, 9 a 19:30 hs.
            </span>
          </div>
        </div>
      </Reveal>

      <p className="mt-6 text-xs text-ink-soft">
        * Precios de referencia. El valor final puede variar según el estado del pelaje y el comportamiento del perro.
        Confirmamos disponibilidad del turno por WhatsApp.
      </p>
    </section>
  )
}
