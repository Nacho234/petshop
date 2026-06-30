import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChatCircleDots, Storefront } from '../icons'

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="top" className="bg-cream">
      <div className="relative mx-auto max-w-7xl">
        {/* imagen completa, a todo el ancho (sin recortar) */}
        <img
          src="/hero-bg.jpg"
          alt="Perro con sus juguetes en el pasto"
          className="block h-auto w-full"
          loading="eager"
          fetchPriority="high"
        />

        {/* contenido: debajo de la imagen en mobile, superpuesto en desktop */}
        <div className="px-4 pb-12 pt-8 sm:px-6 lg:absolute lg:inset-0 lg:flex lg:items-center lg:px-10 lg:py-0">
          <div className="max-w-xl lg:max-w-[48%]">
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

          {/* local info */}
          <motion.div
            {...rise(0.32)}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-sm backdrop-blur-sm"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-soft text-leaf-deep">
              <Storefront weight="fill" size={20} />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-bold text-ink">Avellaneda 1796 · Rosario</span>
              <span className="text-ink-soft">Lun a Sáb · 9 a 19:30 hs</span>
            </span>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
