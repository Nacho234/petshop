import { useState } from 'react'

// Marcas de alimento que trabajamos.
// `logo`: ruta al archivo en public/brands/. Si el archivo no existe todavía,
// el componente cae automáticamente al nombre en texto (no se rompe la tira).
const brands = [
  { name: 'Royal Canin', logo: '/brands/royal-canin.svg' },
  { name: 'Pro Plan', logo: '/brands/pro-plan.svg' },
  { name: 'Old Prince', logo: '/brands/old-prince.svg' },
  { name: 'Eukanuba', logo: '/brands/eukanuba.svg' },
  { name: 'Vitalcan', logo: '/brands/vitalcan.svg' },
  { name: 'Excellent', logo: '/brands/excellent.svg' },
  { name: 'Dog Chow', logo: '/brands/dog-chow.svg' },
  { name: 'Pedigree', logo: '/brands/pedigree.svg' },
  { name: 'Optimum', logo: '/brands/optimum.svg' },
  { name: 'Nutrique', logo: '/brands/nutrique.svg' },
  { name: 'Sieger', logo: '/brands/sieger.svg' },
  { name: 'Tetra', logo: '/brands/tetra.svg' },
]

// Logo en escala de grises que se pinta a color al pasar el mouse.
// Fallback a texto si la imagen no carga.
function BrandLogo({ name, logo, ariaHidden }) {
  const [failed, setFailed] = useState(!logo)

  return (
    <div
      aria-hidden={ariaHidden}
      className="flex h-16 w-40 shrink-0 items-center justify-center px-2"
    >
      {failed ? (
        <span className="whitespace-nowrap font-display text-lg font-semibold text-ink-soft transition-colors duration-200 hover:text-leaf sm:text-xl">
          {name}
        </span>
      ) : (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-11 max-w-full object-contain opacity-65 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        />
      )}
    </div>
  )
}

export default function Brands() {
  return (
    <section aria-label="Marcas de alimento que trabajamos" className="border-y border-line bg-white py-10">
      {/* Marquee infinito: dos copias de la lista, se pausa al pasar el mouse.
          Si el sistema pide reducir movimiento, el CSS lo hace mucho más lento
          (no lo detiene), así se ve en todas las máquinas. */}
      <div
        className="group relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]">
          {[...brands, ...brands].map((b, i) => (
            <BrandLogo
              key={i}
              name={b.name}
              logo={b.logo}
              ariaHidden={i >= brands.length}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
