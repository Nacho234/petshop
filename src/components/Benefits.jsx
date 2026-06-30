import { Truck, ChatTeardropText, ShieldCheck, PawPrint } from '../icons'
import Reveal from './Reveal'

const items = [
  { icon: Truck, title: 'Envíos a todo el país', text: 'Despachamos en 24-48 h. Gratis en compras desde $35.000.' },
  { icon: ChatTeardropText, title: 'Atención por WhatsApp', text: 'Te asesoramos sobre alimento y accesorios antes de comprar.' },
  { icon: PawPrint, title: 'Marcas que confían', text: 'Royal Canin, Old Prince, Vitalcan, Tetra y más, siempre frescas.' },
  { icon: ShieldCheck, title: 'Compra segura', text: 'Pagás contra entrega o por transferencia. Sin sorpresas.' },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <Reveal>
        <h2 className="max-w-[20ch] font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Comprar para tu mascota, simple y confiable
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:divide-x lg:divide-line">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.06}>
            <div className="lg:px-6 lg:first:pl-0">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-soft text-leaf-deep">
                <it.icon size={24} weight="duotone" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{it.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
