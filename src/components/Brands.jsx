import { useReducedMotion } from 'motion/react'

// Marcas de alimento que trabajamos (texto estilizado, sin logos por ahora).
const brands = [
  'Royal Canin',
  'Pro Plan',
  'Old Prince',
  'Eukanuba',
  'Vitalcan',
  'Excellent',
  'Dog Chow',
  'Pedigree',
  'Optimum',
  'Nutrique',
  'Sieger',
  'Tetra',
]

function BrandName({ children, ariaHidden }) {
  return (
    <span
      aria-hidden={ariaHidden}
      className="whitespace-nowrap font-display text-lg font-semibold text-ink-soft transition-colors duration-200 hover:text-leaf sm:text-xl"
    >
      {children}
    </span>
  )
}

export default function Brands() {
  const reduce = useReducedMotion()

  return (
    <section aria-label="Marcas de alimento que trabajamos" className="border-y border-line bg-white py-8">
      {reduce ? (
        // Reduced-motion: lista estática centrada, sin desplazamiento.
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4">
          {brands.map((b) => (
            <BrandName key={b}>{b}</BrandName>
          ))}
        </div>
      ) : (
        // Marquee infinito: dos copias de la lista, se pausa al pasar el mouse.
        <div
          className="group relative overflow-hidden"
          style={{
            maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
            {[...brands, ...brands].map((b, i) => (
              <BrandName key={i} ariaHidden={i >= brands.length}>
                {b}
              </BrandName>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
