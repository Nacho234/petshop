import { PawPrint } from '@phosphor-icons/react'

const links = [
  { href: '#categorias', label: 'Categorías' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#beneficios', label: 'Beneficios' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-leaf text-white">
            <PawPrint weight="fill" size={20} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            Webnico
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-leaf"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#catalogo"
          className="cursor-pointer rounded-full bg-leaf px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
        >
          Ver catálogo
        </a>
      </div>
    </header>
  )
}
