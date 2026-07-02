import { motion, useReducedMotion } from 'motion/react'
import { PawPrint } from '../icons'

// Mosaico "bento": varias cards de distintos tamaños que, juntas, reconstruyen
// UNA sola imagen. Cada card es una ventana (overflow-hidden) sobre la misma
// foto; adentro, la imagen se agranda y se corre para mostrar solo su pedazo.
//
// Algunas cards llevan texto encima (overlay) con un velo para que se lea.
const CARDS = [
  {
    top: 2, left: 2, w: 30, h: 49, // izq · arriba (alta)
    overlay: { pos: 'top-left', text: 'Rosario, Santa Fe' },
  },
  {
    top: 53, left: 2, w: 30, h: 45, // izq · abajo
    overlay: { pos: 'center', title: 'Cerca tuyo, siempre' },
  },
  {
    top: 2, left: 34, w: 31, h: 7, // centro · arriba (finita)
    overlay: { pos: 'top', eyebrow: '+500 clientes' },
  },
  { top: 11, left: 34, w: 31, h: 61 }, // centro · medio (alta)
  { top: 74, left: 34, w: 31, h: 24 }, // centro · abajo (ancha)
  {
    top: 2, left: 67, w: 31, h: 96, // derecha · completa
    overlay: {
      pos: 'bottom',
      title: 'Cuidamos a los que más querés',
      text: 'Pasá por el local o pedí online.',
    },
  },
]

function CardOverlay({ pos, eyebrow, title, text }) {
  if (pos === 'top-left') {
    return (
      <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
        <PawPrint size={13} weight="fill" />
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em]">{text}</span>
      </div>
    )
  }
  if (pos === 'top') {
    return (
      <>
        <div aria-hidden className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 z-10 grid place-items-center px-2">
          <span className="text-center text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] lg:text-xs">
            {eyebrow}
          </span>
        </div>
      </>
    )
  }
  if (pos === 'center') {
    return (
      <>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-leaf-deep/80 via-leaf-deep/35 to-leaf-deep/10"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 p-3 text-center lg:gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-sm lg:h-10 lg:w-10">
            <PawPrint size={18} weight="fill" />
          </span>
          <p className="font-display text-sm font-bold leading-tight text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.45)] lg:text-xl">
            {title}
          </p>
          <span aria-hidden className="hidden h-px w-8 bg-white/50 lg:block" />
          <p className="hidden text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/80 lg:block">
            Zafari · Rosario
          </p>
        </div>
      </>
    )
  }
  if (pos === 'bottom') {
    return (
      <>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 lg:p-5">
          <p className="font-display text-base font-bold leading-tight text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.5)] lg:text-2xl">
            {title}
          </p>
          {text && <p className="mt-1.5 text-xs text-white/85 lg:text-sm">{text}</p>}
        </div>
      </>
    )
  }
  return null
}

export default function ImageMosaic({ src, alt = '' }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative mx-auto aspect-square w-full max-w-5xl lg:aspect-[16/10] lg:max-w-6xl">
      {CARDS.map((c, i) => (
        <motion.div
          key={i}
          className="group absolute overflow-hidden rounded-card border border-line shadow-sm transition-shadow duration-300 hover:z-10 hover:shadow-xl"
          style={{
            top: `${c.top}%`,
            left: `${c.left}%`,
            width: `${c.w}%`,
            height: `${c.h}%`,
          }}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* La imagen se dimensiona al tamaño del mosaico completo y se corre
              con offsets negativos para que cada card muestre su porción. */}
          <img
            src={src}
            alt={i === 0 ? alt : ''}
            aria-hidden={i !== 0}
            loading="lazy"
            className="absolute max-w-none object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            style={{
              width: `${(100 / c.w) * 100}%`,
              height: `${(100 / c.h) * 100}%`,
              left: `${-(c.left / c.w) * 100}%`,
              top: `${-(c.top / c.h) * 100}%`,
            }}
          />
          {c.overlay && <CardOverlay {...c.overlay} />}
        </motion.div>
      ))}
    </div>
  )
}
