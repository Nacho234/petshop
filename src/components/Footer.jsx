import { WhatsappLogo, InstagramLogo, MapPin, Clock } from '../icons'

const cols = [
  {
    title: 'Tienda',
    links: [
      { label: 'Perros', href: '#catalogo' },
      { label: 'Gatos', href: '#catalogo' },
      { label: 'Aves', href: '#catalogo' },
      { label: 'Peces', href: '#catalogo' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: 'Cómo comprar', href: '#beneficios' },
      { label: 'Envíos', href: '#beneficios' },
      { label: 'Medios de pago', href: '#beneficios' },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div className="lg:col-span-2">
            <a href="#top" className="flex items-center gap-2.5" aria-label="Zafari · inicio">
              <img src="/logo-zafari.png" alt="Zafari" width={160} height={160} className="h-14 w-auto mix-blend-multiply" />
            </a>
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink-soft">
              Aventura para tus mascotas. Todo para perros, gatos, aves y peces, con asesoramiento
              real y envíos a domicilio.
            </p>

            {/* horarios + dirección */}
            <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
              <li className="flex items-start gap-2">
                <Clock size={18} weight="fill" className="mt-0.5 shrink-0 text-leaf" />
                <span>
                  <span className="font-semibold text-ink">Lunes a Sábados</span> · 9 a 19:30 hs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} weight="fill" className="mt-0.5 shrink-0 text-leaf" />
                <span>Avellaneda 1796 · Rosario, Santa Fe</span>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://wa.me/5493417544204"
                target="_blank"
                rel="noreferrer"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-leaf-deep"
              >
                <WhatsappLogo size={18} weight="fill" />
                Escribinos
              </a>
              <a
                href="https://instagram.com/zafari.petshop"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Zafari"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line text-ink-soft transition-colors duration-200 hover:border-leaf hover:text-leaf"
              >
                <InstagramLogo size={20} />
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-ink-soft transition-colors duration-200 hover:text-leaf"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={16} weight="fill" className="text-leaf" />
            Rosario, Santa Fe
          </span>
          <span>© {new Date().getFullYear()} Zafari. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  )
}
