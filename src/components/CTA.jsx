import { useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '../icons'
import Reveal from './Reveal'
import ctaVideo from '../assets/cta-video.mp4'
import ctaPoster from '../assets/cta-poster.jpg'

export default function CTA() {
  const reduce = useReducedMotion()

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28">
      <Reveal>
        <div className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-[2rem] bg-leaf px-6 py-16 text-center sm:px-12 lg:min-h-[520px] lg:py-24">
          {/* Background: looping video, or a static poster under reduced-motion. */}
          {reduce ? (
            <img
              src={ctaPoster}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <video
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              src={ctaVideo}
              poster={ctaPoster}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden
            />
          )}

          {/* Green scrim so the headline and button stay readable over any frame. */}
          <div aria-hidden className="absolute inset-0 bg-leaf-deep/75" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-leaf-deep/80 via-transparent to-leaf-deep/30"
          />

          {/* Content */}
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl">
              Tu mascota se merece lo mejor
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-base text-white/90 sm:text-lg">
              Mirá el catálogo completo y encontrá todo lo que necesita, sin moverte de casa.
            </p>
            <Link
              to="/catalogo"
              className="group mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-leaf-deep shadow-lg transition-all duration-200 hover:bg-cream active:translate-y-px"
            >
              Ver catálogo
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
