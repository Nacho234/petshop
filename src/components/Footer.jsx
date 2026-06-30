import { PawPrint, WhatsappLogo, InstagramLogo, MapPin } from '../icons'

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
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf text-white">
                <PawPrint weight="fill" size={20} />
              </span>
              <span className="font-display text-xl font-bold tracking-tight text-ink">Webnico</span>
            </a>
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink-soft">
              Petshop online con todo para perros, gatos, aves y peces. Asesoramiento real y envíos
              a todo el país.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://wa.me/5493410000000"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-leaf-deep"
              >
                <WhatsappLogo size={18} weight="fill" />
                Escribinos
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram de Webnico"
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
          <span>© {new Date().getFullYear()} Webnico. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  )
}
