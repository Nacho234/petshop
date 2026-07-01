import { ChatTeardropText, CreditCard, PawPrint, MapPin } from '../icons'
import Reveal from './Reveal'

export default function Benefits() {
  return (
    <section id="beneficios" className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:pb-28 lg:pt-6">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-leaf">
          Por qué Zafari
        </p>
        <h2 className="mt-2 max-w-[20ch] font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Comprar para tu mascota, simple y confiable
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {/* Destacado: envíos en Rosario, con foto */}
        <Reveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
          <article className="group relative flex h-full min-h-[300px] items-center overflow-hidden rounded-[1.5rem] border border-line bg-white lg:min-h-[380px]">
            <div className="relative z-10 max-w-[56%] p-6 lg:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-soft px-3 py-1 text-xs font-semibold text-leaf-deep">
                <MapPin size={13} weight="fill" />
                Rosario
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                Envíos en todo Rosario en 24-48 h
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Despachamos rápido y coordinamos la entrega con vos por WhatsApp. Sin vueltas.
              </p>
            </div>
            <img
              src="/gato-recortado.png"
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 h-full w-auto max-w-[56%] translate-y-[12%] object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
            />
          </article>
        </Reveal>

        {/* WhatsApp: card ancha */}
        <Reveal delay={0.06} className="sm:col-span-2 lg:col-span-2">
          <article className="flex h-full min-h-[160px] flex-col justify-between rounded-[1.5rem] border border-line bg-surface p-6">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-leaf-soft text-leaf-deep">
              <ChatTeardropText size={22} weight="duotone" />
            </span>
            <div className="mt-4">
              <h3 className="font-display text-lg font-bold text-ink">
                Te asesoramos por WhatsApp
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Antes de comprar te ayudamos a elegir el alimento y los accesorios justos para tu mascota.
              </p>
            </div>
          </article>
        </Reveal>

        {/* Marcas */}
        <Reveal delay={0.12}>
          <article className="flex h-full min-h-[160px] flex-col justify-between rounded-[1.5rem] border border-line bg-white p-6">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-leaf-soft text-leaf-deep">
              <PawPrint size={22} weight="duotone" />
            </span>
            <div className="mt-4">
              <h3 className="font-display text-lg font-bold text-ink">Marcas que confían</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Royal Canin, Pro Plan, Old Prince, Vitalcan y más. Siempre frescas.
              </p>
            </div>
          </article>
        </Reveal>

        {/* Medios de pago: card con acento */}
        <Reveal delay={0.18}>
          <article className="flex h-full min-h-[160px] flex-col justify-between rounded-[1.5rem] bg-leaf p-6 text-white">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/20 text-white">
              <CreditCard size={22} weight="duotone" />
            </span>
            <div className="mt-4">
              <p className="font-display text-3xl font-bold leading-none">10% OFF</p>
              <p className="mt-1 text-sm leading-relaxed text-white/85">
                Pagando en efectivo o transferencia. Con tarjeta, 1 cuota sin interés.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
