import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { categories } from '../data'
import Reveal from './Reveal'

export default function Categories({ onPick }) {
  const reduce = useReducedMotion()

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Comprá por mascota
        </h2>
        <p className="mt-3 max-w-[55ch] text-ink-soft">
          Cuatro mundos, todo lo que necesitan. Elegí una categoría y mirá la selección.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <motion.a
              href="#catalogo"
              onClick={() => onPick?.(c.id)}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="group block h-full cursor-pointer overflow-hidden rounded-card border border-line bg-surface shadow-sm"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img
                  src={`https://loremflickr.com/520/420/${c.img}?lock=${100 + i}`}
                  alt={`Categoría ${c.label}`}
                  width={520}
                  height={420}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-xs font-semibold text-ink-soft backdrop-blur-sm">
                  {c.count} productos
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="font-display text-xl font-bold text-ink">{c.label}</h3>
                  <p className="mt-0.5 text-sm text-ink-soft">{c.blurb}</p>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-leaf-soft text-leaf-deep transition-colors duration-200 group-hover:bg-leaf group-hover:text-white">
                  <ArrowUpRight size={18} weight="bold" />
                </span>
              </div>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
