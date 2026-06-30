import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ChatCircleDots, Storefront } from '../icons'
import heroPerro from '../assets/hero-perro.jpg'

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft warm wash, decorative only */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-leaf-soft blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 md:gap-8 lg:grid-cols-12 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="lg:col-span-6">
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
            className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-soft"
          >
            Alimento, juguetes y accesorios para perros, gatos, aves y peces.
            Envíos a todo el país.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#catalogo"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
            >
              Ver catálogo
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#beneficios"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-base font-semibold text-ink transition-colors duration-200 hover:border-leaf hover:text-leaf"
            >
              <ChatCircleDots size={18} weight="bold" />
              Cómo comprar
            </a>
          </motion.div>
        </div>

        {/* Asset */}
        <motion.div
          {...rise(0.18)}
          className="relative lg:col-span-6"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-cream-deep shadow-[0_30px_60px_-30px_rgba(36,95,71,0.45)]">
            <img
              src={heroPerro}
              alt="Perro feliz sentado en el pasto rodeado de juguetes"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          {/* single floating info card on the asset */}
          <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-8">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-soft text-leaf-deep">
              <Storefront weight="fill" size={20} />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-bold text-ink">Avellaneda 1796 · Rosario</span>
              <span className="text-ink-soft">Lun a Sáb · 9 a 19:30 hs</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
