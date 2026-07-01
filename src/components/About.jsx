import { Link } from 'react-router-dom'
import {
  PawPrint,
  Storefront,
  ChatTeardropText,
  Truck,
  ShieldCheck,
  Heart,
  MapPin,
  Clock,
  WhatsappLogo,
  ArrowRight,
} from '../icons'
import Reveal from './Reveal'

const values = [
  {
    icon: Storefront,
    title: 'Un local de verdad',
    text: 'No somos solo una web: estamos en Avellaneda 1796, Rosario. Podés pasar, ver los productos y llevártelos en el momento.',
  },
  {
    icon: ChatTeardropText,
    title: 'Asesoramiento real',
    text: 'Te ayudamos a elegir el alimento y los accesorios justos para tu mascota. Sin vueltas y sin venderte de más.',
  },
  {
    icon: Truck,
    title: 'Envíos en todo Rosario',
    text: 'Despachamos rápido y coordinamos la entrega con vos por WhatsApp, en 24 a 48 horas.',
  },
  {
    icon: ShieldCheck,
    title: 'Marcas que confían',
    text: 'Royal Canin, Pro Plan, Old Prince, Vitalcan y más. Siempre frescas y con vencimientos al día.',
  },
]

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
              Un petshop de barrio, con alma de Rosario
            </h1>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
              Zafari nació con una idea simple: que cuidar a tu mascota sea fácil, cercano y de
              confianza. Alimento, accesorios, juguetes y peluquería, con la atención de quienes
              tienen mascotas y saben lo que buscás.
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

      {/* 2 · Historia — banda cream, foto a la izquierda */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <Reveal>
          <div className="relative flex min-h-[440px] items-center justify-end overflow-hidden rounded-[2rem] border border-line sm:min-h-[500px]">
            <img
              src="/vete.png"
              alt="Veterinaria atendiendo a un perro en Zafari"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            {/* Velo para que el texto se lea sobre la foto (oscurece la derecha) */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/50 to-black/10"
            />
            <div className="relative max-w-2xl p-8 sm:p-10 lg:p-14">
              <h2 className="max-w-[24ch] font-display text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl">
                Empezamos como vos: cuidando a los nuestros
              </h2>
              <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-white/90 drop-shadow-sm">
                Conocemos de cerca lo que significa tener un compañero de cuatro patas. Por eso
                elegimos cada producto pensando en cómo lo elegiríamos para los nuestros: calidad
                real, precio justo y una atención que no te apura.
              </p>
              <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-white/90 drop-shadow-sm">
                Hoy sumamos la vidriera online y los envíos en todo Rosario, para que tengas lo que
                tu mascota necesita sin moverte de casa, con la misma cercanía de siempre.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3 · Valores — grilla de tarjetas */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <h2 className="max-w-[20ch] font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Lo que nos mueve
          </h2>
          <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
            Cuatro cosas que no negociamos, estés comprando en el local o desde el celular.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <Reveal key={v.title} delay={i * 0.07}>
                <article className="flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-colors duration-200 hover:border-leaf">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-soft text-leaf-deep">
                    <Icon size={24} weight="duotone" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* 4 · Cercanía — panel acento con datos reales */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:pb-28">
        <Reveal>
          <div className="rounded-[2rem] bg-leaf px-6 py-12 text-white sm:px-12 lg:py-16">
            <div className="flex items-start gap-3">
              <Heart size={26} weight="fill" className="mt-0.5 shrink-0 text-honey" />
              <h2 className="max-w-[26ch] font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
                Detrás de cada compra hay gente que quiere a los animales tanto como vos
              </h2>
            </div>

            <div className="mt-10 grid gap-6 border-t border-white/20 pt-8 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <MapPin size={22} weight="fill" className="mt-0.5 shrink-0 text-white/85" />
                <div>
                  <p className="font-display text-base font-bold text-white">Avellaneda 1796</p>
                  <p className="mt-0.5 text-sm text-white/80">Rosario, Santa Fe</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={22} weight="fill" className="mt-0.5 shrink-0 text-white/85" />
                <div>
                  <p className="font-display text-base font-bold text-white">Lunes a Sábados</p>
                  <p className="mt-0.5 text-sm text-white/80">9 a 19:30 hs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck size={22} weight="fill" className="mt-0.5 shrink-0 text-white/85" />
                <div>
                  <p className="font-display text-base font-bold text-white">Envíos 24-48 h</p>
                  <p className="mt-0.5 text-sm text-white/80">En todo Rosario</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/5493417544204"
              target="_blank"
              rel="noreferrer"
              className="group mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-leaf-deep shadow-lg transition-all duration-200 hover:bg-cream active:translate-y-px"
            >
              <WhatsappLogo size={18} weight="fill" />
              Escribinos por WhatsApp
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
