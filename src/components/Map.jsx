import { MapPin, Clock, ArrowUpRight } from '../icons'
import Reveal from './Reveal'

const ADDRESS = 'Avellaneda 1796, Rosario, Santa Fe'
const EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=16&output=embed`
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`

export default function Map() {
  return (
    <section id="ubicacion" className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-leaf">
            <MapPin size={14} weight="fill" />
            Ubicación
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Dónde estamos
          </h2>
          <p className="mt-3 max-w-[48ch] text-ink-soft">
            Te esperamos en nuestro local de Rosario. Tocá el mapa para abrir cómo llegar.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* mapa */}
          <Reveal className="lg:col-span-2">
            <div className="overflow-hidden rounded-card border border-line shadow-sm">
              <iframe
                title="Mapa de Zafari en Avellaneda 1796, Rosario"
                src={EMBED}
                className="h-[320px] w-full lg:h-[440px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          {/* datos del local */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col rounded-card border border-line bg-cream p-6 sm:p-7">
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-leaf-soft text-leaf-deep">
                    <MapPin size={20} weight="fill" />
                  </span>
                  <span>
                    <span className="block font-bold text-ink">Avellaneda 1796</span>
                    <span className="text-ink-soft">Rosario, Santa Fe</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-leaf-soft text-leaf-deep">
                    <Clock size={20} weight="fill" />
                  </span>
                  <span>
                    <span className="block font-bold text-ink">Lunes a Sábados</span>
                    <span className="text-ink-soft">9 a 19:30 hs</span>
                  </span>
                </li>
              </ul>

              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="group mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
              >
                Cómo llegar
                <ArrowUpRight size={18} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
