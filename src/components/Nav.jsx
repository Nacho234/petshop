import { Link } from 'react-router-dom'
import { CaretDown } from '../icons'
import { categories } from '../data'

const links = [
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/peluqueria', label: 'Peluquería' },
  { to: '/#mayorista', label: 'Por mayor' },
  { to: '/#ubicacion', label: 'Ubicación' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center" aria-label="Zafari · inicio">
          <img
            src="/logo-zafari.png"
            alt="Zafari"
            width={160}
            height={160}
            className="h-14 w-auto mix-blend-multiply"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {/* Categorías: menú desplegable */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-leaf group-hover:text-leaf"
            >
              Categorías
              <CaretDown
                size={13}
                weight="bold"
                className="transition-transform duration-200 group-hover:rotate-180"
              />
            </button>

            <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-line bg-surface p-2 shadow-lg">
                {categories.map((c) => (
                  <div key={c.id} className="px-1 py-1.5">
                    <Link
                      to={`/catalogo?cat=${c.id}`}
                      className="block rounded-lg px-3 py-1.5 text-sm font-semibold text-ink transition-colors duration-150 hover:bg-leaf-soft hover:text-leaf-deep"
                    >
                      {c.label}
                    </Link>
                    {c.subs.length > 0 && (
                      <div className="mt-0.5 flex flex-col">
                        {c.subs.map((s) => (
                          <Link
                            key={s.id}
                            to={`/catalogo?cat=${s.id}`}
                            className="rounded-lg px-3 py-1 pl-6 text-sm text-ink-soft transition-colors duration-150 hover:bg-cream hover:text-leaf"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-leaf"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/catalogo"
          className="cursor-pointer rounded-full bg-leaf px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
        >
          Ver catálogo
        </Link>
      </div>
    </header>
  )
}
