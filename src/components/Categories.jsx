import { motion, useReducedMotion } from 'motion/react'
import { categories } from '../data'
import Reveal from './Reveal'
import perro from '../assets/categorias/perro.jpg'
import gato from '../assets/categorias/gato.jpg'
import ave from '../assets/categorias/ave.jpg'
import pez from '../assets/categorias/pez.jpg'

// Foto por categoría (id de data.js -> imagen local optimizada).
const fotos = { perros: perro, gatos: gato, aves: ave, peces: pez }

export default function Categories({ onPick }) {
  const reduce = useReducedMotion()

  return (
    <section id="categorias" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <Reveal>
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-leaf/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">
              Categorías
            </span>
            <span className="h-px w-8 bg-leaf/40" />
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Comprá por mascota
          </h2>
          <p className="mt-3 max-w-[48ch] text-ink-soft">
            Cuatro mundos, todo lo que necesitan. Elegí una categoría y mirá la selección.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-x-10 gap-y-14 lg:grid-cols-4 lg:gap-x-16">
        {categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <motion.a
              href="#catalogo"
              onClick={() => onPick?.(c.id)}
              aria-label={`Ver productos de ${c.label}`}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="group mx-auto flex max-w-[16.5rem] cursor-pointer flex-col items-center text-center"
            >
              <div className="aspect-square w-full overflow-hidden rounded-full bg-cream-deep shadow-sm ring-4 ring-leaf-soft ring-offset-4 ring-offset-cream transition-all duration-300 group-hover:shadow-md group-hover:ring-leaf">
                <img
                  src={fotos[c.id]}
                  alt={`Foto de ${c.label}`}
                  width={440}
                  height={440}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-500 ease-out ${
                    c.id === 'peces' ? 'object-center' : 'object-top'
                  } ${c.id === 'aves' ? 'scale-110 group-hover:scale-125' : 'group-hover:scale-110'}`}
                />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-ink transition-colors duration-200 group-hover:text-leaf">
                {c.label}
              </h3>
              <p className="mt-1 text-sm text-ink-soft">{c.count} productos</p>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
