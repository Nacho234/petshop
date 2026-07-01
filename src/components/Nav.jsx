import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaretDown, List, ShoppingCartSimple, X } from '../icons'
import { categories } from '../data'
import { useCart } from '../cart/cartStore'

const links = [
  { to: '/peluqueria', label: 'Peluquería' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/#mayorista', label: 'Por mayor' },
  { to: '/ubicacion', label: 'Ubicación' },
]

export default function Nav() {
  const { totalItems, setOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-zinc-200/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" className="flex items-center" aria-label="Zafari · inicio">
          <img
            src="/logo-zafari.png"
            alt="Zafari"
            width={160}
            height={160}
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {/* Categorías: menú desplegable */}
          <div className="group relative">
            <Link
              to="/catalogo"
              className="flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-leaf group-hover:text-leaf"
            >
              Categorías
              <CaretDown
                size={13}
                weight="bold"
                className="transition-transform duration-200 group-hover:rotate-180"
              />
            </Link>

            <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-line bg-white p-2 shadow-lg">
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

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Abrir carrito${totalItems ? ` (${totalItems})` : ''}`}
            className="relative grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-leaf hover:text-leaf"
          >
            <ShoppingCartSimple size={20} weight="bold" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-leaf px-1 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>

          {/* Botón hamburguesa (solo mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink transition-colors duration-200 hover:border-leaf hover:text-leaf md:hidden"
          >
            {menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Menú mobile desplegable */}
      {menuOpen && (
        <nav className="border-t border-line bg-white md:hidden">
          <div className="mx-auto max-h-[70vh] max-w-7xl overflow-y-auto px-4 py-4 sm:px-6">
            <Link
              to="/catalogo"
              onClick={closeMenu}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-ink transition-colors duration-150 hover:bg-leaf-soft hover:text-leaf-deep"
            >
              Ver catálogo
            </Link>

            <div className="mt-1 border-t border-line pt-2">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Categorías
              </p>
              {categories.map((c) => (
                <Link
                  key={c.id}
                  to={`/catalogo?cat=${c.id}`}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:bg-leaf-soft hover:text-leaf-deep"
                >
                  {c.label}
                </Link>
              ))}
            </div>

            <div className="mt-1 border-t border-line pt-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-ink transition-colors duration-150 hover:bg-leaf-soft hover:text-leaf-deep"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
