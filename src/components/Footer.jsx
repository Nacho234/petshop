import { Link } from 'react-router-dom'
import { WhatsappLogo, InstagramLogo, MapPin, Clock, ArrowUpRight } from '../icons'

const ADDRESS = 'Avellaneda 1796, Rosario, Santa Fe'
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&z=16&output=embed`
const MAP_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`

const cols = [
  {
    title: 'Categorías',
    links: [
      { label: 'Alimento balanceado', to: '/catalogo?cat=alimento' },
      { label: 'Accesorios de mascotas', to: '/catalogo?cat=accesorios' },
      { label: 'Juguetes de entretenimiento', to: '/catalogo?cat=juguetes' },
    ],
  },
  {
    title: 'Teléfonos',
    links: [
      { label: 'Mayorista: (3413) 787052', href: 'tel:+543413787052' },
      { label: 'Minorista: (341) 7544204', href: 'tel:+543417544204' },
    ],
  },
]

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-2 lg:col-span-5">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Zafari · inicio">
              <img src="/logo-zafari.png" alt="Zafari" width={160} height={160} className="h-14 w-auto mix-blend-multiply" />
            </Link>
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink-soft">
              Aventura para tus mascotas. Alimento balanceado, accesorios y juguetes, con
              asesoramiento real y envíos en todo Rosario.
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
            <div key={col.title} className="lg:col-span-2">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link
                        to={l.to}
                        className="text-sm text-ink-soft transition-colors duration-200 hover:text-leaf"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-sm text-ink-soft transition-colors duration-200 hover:text-leaf"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* mapa · ubicación */}
          <div id="ubicacion" className="scroll-mt-20 md:col-span-2 lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
              Dónde estamos
            </h3>
            <div className="mt-4 overflow-hidden rounded-card border border-line shadow-sm">
              <iframe
                title="Mapa de Zafari en Avellaneda 1796, Rosario"
                src={MAP_EMBED}
                className="h-44 w-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noreferrer"
              className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf transition-colors duration-200 hover:text-leaf-deep"
            >
              Cómo llegar
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
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
