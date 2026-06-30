import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChatCircleDots } from '../icons'

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-start overflow-hidden bg-white md:items-center"
    >
      {/* imagen de fondo a pantalla completa: vertical en mobile, ancha en desktop */}
      <picture>
        <source media="(min-width: 768px)" srcSet="/hero-bg.jpg" />
        <img
          src="/hero-mobile.jpg"
          alt="Perro con sus juguetes en el pasto"
          className="absolute inset-0 h-full w-full object-cover object-bottom md:object-right"
          loading="eager"
          fetchPriority="high"
        />
      </picture>
      {/* velo desktop: a la izquierda, para que el texto se lea sin opacar al perro */}
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-gradient-to-r from-white from-15% via-white/70 via-35% to-transparent to-55% md:block lg:to-50%"
      />
      {/* velo mobile: arriba, donde va el texto */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-white from-25% via-white/70 to-transparent to-55% md:hidden"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-20 sm:px-6 md:py-20 lg:px-10">
        <div className="max-w-xl">
          <motion.span
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-leaf"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
            Petshop online
          </motion.span>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl"
          >
            Todo para tu mascota,
            <br />
            en un solo lugar.
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-5 max-w-[44ch] text-lg leading-relaxed text-ink-soft"
          >
            Alimento balanceado, accesorios y juguetes para tu mascota.
            Envíos en todo Rosario.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/catalogo"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
            >
              Ver catálogo
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href="#beneficios"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-base font-semibold text-ink transition-colors duration-200 hover:border-leaf hover:text-leaf"
            >
              <ChatCircleDots size={18} weight="bold" />
              Cómo comprar
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
