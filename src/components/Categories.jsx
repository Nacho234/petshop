import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { categories } from '../data'
import Reveal from './Reveal'
import perro from '../assets/categorias/perro.jpg'
import gato from '../assets/categorias/gato.jpg'
import juguete from '../assets/categorias/juguete.jpg'

const MotionLink = motion.create(Link)

// Fotos reales por categoría (el resto usa su imagen por defecto).
const fotos = { alimento: perro, accesorios: gato, juguetes: juguete }

export default function Categories() {
  const reduce = useReducedMotion()

  return (
    <section id="categorias" className="bg-white">
     <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
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
            Comprá por categoría
          </h2>
          <p className="mt-3 max-w-[48ch] text-ink-soft">
            Tres categorías, todo lo que tu mascota necesita. Elegí una y mirá la selección.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.06}>
            <MotionLink
              to={`/catalogo?cat=${c.id}`}
              aria-label={`Ver productos de ${c.label}`}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="group mx-auto flex max-w-[16.5rem] cursor-pointer flex-col items-center text-center"
            >
              <div className="aspect-square w-full overflow-hidden rounded-full bg-cream-deep shadow-sm ring-4 ring-leaf-soft ring-offset-4 ring-offset-white transition-all duration-300 group-hover:shadow-md group-hover:ring-leaf">
                <img
                  src={fotos[c.id] || c.img}
                  alt={`Foto de ${c.label}`}
                  width={440}
                  height={440}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 ${
                    fotos[c.id] ? 'object-top' : ''
                  }`}
                />
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-ink transition-colors duration-200 group-hover:text-leaf">
                {c.label}
              </h3>
              <p className="mt-1 text-sm text-ink-soft">{c.count} productos</p>
            </MotionLink>
          </Reveal>
        ))}
      </div>
     </div>
    </section>
  )
}
