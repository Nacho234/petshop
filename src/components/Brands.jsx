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
  return (
    <section aria-label="Marcas de alimento que trabajamos" className="border-y border-line bg-white py-8">
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
        <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
          {[...brands, ...brands].map((b, i) => (
            <BrandName key={i} ariaHidden={i >= brands.length}>
              {b}
            </BrandName>
          ))}
        </div>
      </div>
    </section>
  )
}
