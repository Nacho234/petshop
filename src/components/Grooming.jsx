import { useState } from 'react'
import { Scissors, Check, WhatsappLogo } from '../icons'
import { groomingSizes, groomingTiers, fmtPrice } from '../data'
import Reveal from './Reveal'

const WHATSAPP = '5493417544204'

// Arma el link de WhatsApp con un mensaje prellenado según el nivel y tamaño elegidos.
function bookingHref(tier, size, price) {
  const msg = [
    '¡Hola Zafari! 🐶 Quiero reservar un turno de peluquería.',
    `Nivel: ${tier.name}`,
    `Tamaño: ${size.label} (${size.hint})`,
    `Precio: ${fmtPrice(price)}`,
  ].join('\n')
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
}

export default function Grooming() {
  const [sizeId, setSizeId] = useState('mediano')
  const size = groomingSizes.find((s) => s.id === sizeId)

  return (
    <section id="peluqueria" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-leaf">
          <Scissors size={14} weight="bold" />
          Peluquería canina
        </span>
        <h2 className="mt-5 max-w-[22ch] font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Reservá el turno de peluquería de tu perro
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
          Elegí el tamaño de tu perro y el nivel de servicio. El precio se ajusta solo y reservás por
          WhatsApp en un toque.
        </p>
      </Reveal>

      {/* Selector de tamaño */}
      <Reveal delay={0.06}>
        <div className="mt-8" role="tablist" aria-label="Tamaño del perro">
          <div className="inline-flex flex-wrap gap-2 rounded-full border border-line bg-surface p-1.5">
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
                    (on
                      ? 'bg-leaf text-white shadow-sm'
                      : 'text-ink-soft hover:text-leaf')
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

      {/* Niveles de servicio */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {groomingTiers.map((tier, i) => {
          const price = tier.prices[sizeId]
          const featured = tier.featured
          return (
            <Reveal key={tier.id} delay={i * 0.08}>
              <div
                className={
                  'relative flex h-full flex-col rounded-card border p-6 sm:p-7 ' +
                  (featured
                    ? 'border-leaf bg-leaf-soft shadow-[0_24px_50px_-30px_rgba(36,95,71,0.55)]'
                    : 'border-line bg-surface')
                }
              >
                {featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-leaf px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    Más elegido
                  </span>
                )}

                <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                  Nivel {tier.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{tier.blurb}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold text-ink">{fmtPrice(price)}</span>
                  <span className="text-sm text-ink-soft">/ {size.label.toLowerCase()}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-ink">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-leaf-soft text-leaf-deep">
                        <Check size={13} weight="bold" />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <a
                  href={bookingHref(tier, size, price)}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    'group mt-7 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 active:translate-y-px ' +
                    (featured
                      ? 'bg-leaf text-white hover:bg-leaf-deep'
                      : 'border border-line bg-surface text-ink hover:border-leaf hover:text-leaf')
                  }
                >
                  <WhatsappLogo size={18} weight="fill" />
                  Reservar turno
                </a>
              </div>
            </Reveal>
          )
        })}
      </div>

      <p className="mt-6 text-xs text-ink-soft">
        * Precios de referencia. El valor final puede variar según el estado del pelaje y el comportamiento del perro.
      </p>
    </section>
  )
}
