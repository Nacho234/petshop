import { Link } from 'react-router-dom'
import { PawPrint, WhatsappLogo, ArrowRight } from '../icons'
import Reveal from './Reveal'
import FeaturedGrid from './FeaturedGrid'
import ImageMosaic from './ImageMosaic'

export default function About() {
  return (
    <div className="bg-white">
      {/* 1 · Intro — texto a la izquierda, foto a la derecha */}
      <section className="mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 lg:pt-24 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-leaf">
              <PawPrint size={14} weight="bold" />
              Nosotros
            </span>
            <h1 className="mt-5 max-w-[18ch] font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Somos Zafari, tu <span className="text-grad-zafari">petshop de confianza</span> en Rosario
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
              Nacimos con una idea simple: que cuidar a tu mascota sea fácil, cercano y de confianza.
              Alimento, accesorios, juguetes y peluquería, con la atención de quienes tienen mascotas
              y saben lo que buscás.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/catalogo"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
              >
                Ver catálogo
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="https://wa.me/5493417544204"
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-base font-semibold text-ink transition-colors duration-200 hover:border-leaf hover:text-leaf"
              >
                <WhatsappLogo size={18} weight="fill" />
                Escribinos
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-[0_30px_60px_-40px_rgba(36,95,71,0.5)]">
              <img
                src="/wallbrand.png"
                alt="Mascotas y productos en Zafari"
                className="h-auto w-full object-contain"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 · Grilla de destacados (notas & consejos) */}
      <FeaturedGrid />

      {/* 3 · Mosaico de imagen */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-leaf">
              <PawPrint size={14} weight="bold" />
              Así se vive Zafari
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Un pedacito de <span className="text-grad-zafari">nuestro mundo</span>
            </h2>
          </div>
        </Reveal>
        <ImageMosaic src="/husky.png" alt="Un husky, en el mundo Zafari" />
      </section>
    </div>
  )
}
