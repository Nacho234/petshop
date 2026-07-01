import { Storefront, WhatsappLogo, ArrowRight } from '../icons'
import Reveal from './Reveal'

const WHATSAPP = '5493417544204'
const message =
  '¡Hola Zafari! 📦 Quiero hacer una compra al por mayor. ¿Me pasan precios y condiciones?'
const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`

export default function Wholesale() {
  return (
    <section id="mayorista" className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
      <Reveal>
        <div className="flex flex-col items-start gap-6 rounded-card border border-line bg-white p-8 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-leaf-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-leaf-deep">
              <Storefront size={14} weight="fill" />
              Compras al por mayor
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              ¿Comprás por cantidad? Tenemos precios mayoristas
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              Para criaderos, peluquerías, refugios y reventa. Coordinamos precios especiales y envío
              directamente por WhatsApp.
            </p>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
          >
            <WhatsappLogo size={20} weight="fill" />
            Consultar por mayor
            <ArrowRight
              size={18}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
