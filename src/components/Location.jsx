import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { MapPin, Clock, Phone } from '../icons'
import Reveal from './Reveal'

const ADDRESS = 'Avellaneda 1796, Rosario, Santa Fe'
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=16&output=embed`

export default function Location() {
  const heroRef = useRef(null)
  const reduce = useReducedMotion()
  // Parallax solo en desktop: la foto mobile es vertical y se muestra completa.
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Progreso de scroll mientras el hero atraviesa el viewport.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  // La imagen baja a medida que scrolleás (parallax). Se anula con reduced-motion.
  const y = useTransform(scrollYProgress, [0, 1], ['-14%', '14%'])
  const parallax = !reduce && isDesktop

  return (
    <>
      {/* Hero: en mobile la foto se ve completa a todo el ancho (alto natural);
          en desktop ocupa toda la pantalla (cover). La imagen es un poco más alta
          que su marco para que el parallax no deje huecos. */}
      <section ref={heroRef} className="relative overflow-hidden bg-black md:min-h-[100dvh]">
        <picture>
          {/* Desktop: foto horizontal. Mobile: foto vertical. */}
          <source media="(min-width: 768px)" srcSet="/zafari-local.png" />
          <motion.img
            src="/zafari-localmobil.png"
            alt="Frente del local de Zafari en Avellaneda 1796, Rosario"
            style={parallax ? { y } : undefined}
            className="w-full object-cover md:absolute md:inset-x-0 md:top-[-20%] md:h-[140%]"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        {/* Degradado suave arriba (opacidad baja) */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 to-transparent"
        />

        {/* Onda inferior: funde la foto con la sección blanca de abajo */}
        <svg
          aria-hidden
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-20 w-full text-white sm:h-32"
        >
          <path
            fill="currentColor"
            d="M0,96 C240,168 480,-8 720,72 C960,152 1200,4 1440,88 L1440,160 L0,160 Z"
          />
        </svg>
      </section>

      {/* Mapa funcional + datos */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-card border border-line shadow-sm">
              <iframe
                title="Mapa de Zafari en Avellaneda 1796, Rosario"
                src={MAP_EMBED}
                className="h-[320px] w-full sm:h-[440px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-center rounded-card border border-line bg-surface p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                Dónde estamos
              </h2>
              <ul className="mt-6 space-y-5 text-sm text-ink-soft">
                <li className="flex items-start gap-3">
                  <MapPin size={20} weight="fill" className="mt-0.5 shrink-0 text-leaf" />
                  <span>
                    <span className="block font-display text-base font-bold text-ink">
                      Avellaneda 1796
                    </span>
                    Rosario, Santa Fe
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={20} weight="fill" className="mt-0.5 shrink-0 text-leaf" />
                  <span>
                    <span className="block font-display text-base font-bold text-ink">
                      Lunes a Sábados
                    </span>
                    9 a 19:30 hs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={20} weight="fill" className="mt-0.5 shrink-0 text-leaf" />
                  <span>
                    <a
                      href="tel:+543417544204"
                      className="block font-display text-base font-bold text-ink transition-colors duration-200 hover:text-leaf"
                    >
                      (341) 7544204
                    </a>
                    Minorista
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
