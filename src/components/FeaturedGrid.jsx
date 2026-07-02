import { Plus } from '../icons'
import Reveal from './Reveal'
import imgPerro from '../assets/categorias/perro.jpg'
import imgGato from '../assets/categorias/gato.jpg'
import imgJuguete from '../assets/categorias/juguete.jpg'
import imgAve from '../assets/categorias/ave.jpg'

const featured = {
  img: imgPerro,
  badge: 'Destacado',
  title: 'Cómo elegir el alimento ideal para tu mascota',
  desc: 'Una mirada honesta a lo que de verdad importa para que tu compañero coma rico, sano y con la energía justa.',
  author: 'Por el equipo Zafari',
  cat: 'Alimento',
  tint: 'bg-leaf text-white',
}

const posts = [
  { img: imgGato, title: 'Todo para consentir a tu gato', cat: 'Gatos', tint: 'bg-leaf-soft text-leaf-deep' },
  { img: imgJuguete, title: 'Juguetes para que no paren de jugar', cat: 'Juguetes', tint: 'bg-honey/25 text-amber-700' },
  { img: imgAve, title: 'Bienestar y color para tus aves', cat: 'Aves', tint: 'bg-leaf-soft text-leaf-deep' },
]

// Esquinas decorativas tipo "visor" sobre las fotos.
function Corners() {
  const base = 'pointer-events-none absolute h-4 w-4 border-white/70'
  return (
    <>
      <span className={`${base} left-3 top-3 border-l-2 border-t-2`} />
      <span className={`${base} right-3 top-3 border-r-2 border-t-2`} />
      <span className={`${base} bottom-3 left-3 border-b-2 border-l-2`} />
      <span className={`${base} bottom-3 right-3 border-b-2 border-r-2`} />
    </>
  )
}

function Pill({ children, tint }) {
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${tint}`}>{children}</span>
  )
}

export default function FeaturedGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-leaf">
            Notas & consejos
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Aprendé a cuidar a los tuyos
          </h2>
        </div>
      </Reveal>

      {/* Card destacada */}
      <Reveal>
        <article className="group grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-sm lg:grid-cols-2">
          <div className="relative min-h-[260px] overflow-hidden lg:min-h-[420px]">
            <img
              src={featured.img}
              alt={featured.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <Corners />
            <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <Plus size={20} weight="bold" />
            </span>
          </div>

          <div className="flex flex-col justify-center gap-5 p-8 lg:p-10">
            <span className="w-fit rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
              {featured.badge}
            </span>
            <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
              {featured.title}
            </h3>
            <p className="max-w-[46ch] text-base leading-relaxed text-ink-soft">{featured.desc}</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-ink-soft">{featured.author}</span>
              <Pill tint={featured.tint}>{featured.cat}</Pill>
            </div>
          </div>
        </article>
      </Reveal>

      {/* 3 cards chicas */}
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <article className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line shadow-sm">
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <Corners />
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <h4 className="font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-leaf">
                  {p.title}
                </h4>
                <Pill tint={p.tint}>{p.cat}</Pill>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
