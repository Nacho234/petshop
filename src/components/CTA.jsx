import { ArrowRight } from '@phosphor-icons/react'
import Reveal from './Reveal'

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-leaf px-6 py-14 text-center sm:px-12 lg:py-20">
          {/* decorative paw dots, pointer-events none */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)',
              backgroundSize: '26px 26px',
            }}
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Tu mascota se merece lo mejor
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-base text-white/85 sm:text-lg">
              Mirá el catálogo completo y encontrá todo lo que necesita, sin moverte de casa.
            </p>
            <a
              href="#catalogo"
              className="group mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-leaf-deep shadow-sm transition-all duration-200 hover:bg-cream active:translate-y-px"
            >
              Ver catálogo
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
