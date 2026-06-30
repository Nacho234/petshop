import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Heart, PawPrint } from '../icons'
import { products, categories, fmtPrice } from '../data'

const filters = [{ id: 'todos', label: 'Todos' }, ...categories.map((c) => ({ id: c.id, label: c.label }))]

// Devuelve la categoría activa, ya sea que `active` sea su id o el de una de sus subcategorías.
function findActiveCategory(active) {
  return categories.find((c) => c.id === active || c.subs?.some((s) => s.id === active))
}

function ProductCard({ p, reduce }) {
  const [fav, setFav] = useState(false)
  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-sm"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-deep">
        <img
          src={p.img}
          alt={p.name}
          width={300}
          height={300}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {p.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-leaf px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            {p.tag}
          </span>
        )}
        <button
          type="button"
          onClick={() => setFav((v) => !v)}
          aria-label={fav ? `Quitar ${p.name} de favoritos` : `Agregar ${p.name} a favoritos`}
          aria-pressed={fav}
          className="absolute right-3 top-3 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-surface/90 text-ink-soft shadow-sm backdrop-blur-sm transition-all duration-200 hover:text-leaf active:scale-90"
        >
          <Heart size={18} weight={fav ? 'fill' : 'regular'} className={fav ? 'text-leaf' : ''} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-leaf">{p.brand}</span>
        <h3 className="mt-1 text-[0.95rem] font-semibold leading-snug text-ink">{p.name}</h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="font-display text-lg font-bold tabular-nums text-ink">
            {fmtPrice(p.price)}
          </span>
          <a
            href="#contacto"
            className="cursor-pointer rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors duration-200 hover:border-leaf hover:bg-leaf hover:text-white"
          >
            Consultar
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Catalog({ active, setActive }) {
  const reduce = useReducedMotion()
  const shown = useMemo(
    () =>
      active === 'todos'
        ? products
        : products.filter((p) => p.cat === active || p.sub === active),
    [active],
  )

  // Subcategorías a mostrar: las de la categoría activa (si tiene).
  const activeCat = findActiveCategory(active)
  const subFilters = activeCat?.subs?.length
    ? [{ id: activeCat.id, label: 'Todas' }, ...activeCat.subs]
    : []

  return (
    <section id="catalogo" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Catálogo
            </h2>
            <p className="mt-3 max-w-[50ch] text-ink-soft">
              Una selección de lo que tenemos en góndola. Precios actualizados al día.
            </p>
          </div>

          {/* filter pills */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por categoría">
            {filters.map((flt) => {
              const on = active === flt.id
              return (
                <button
                  key={flt.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(flt.id)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:translate-y-px ${
                    on
                      ? 'bg-leaf text-white shadow-sm'
                      : 'border border-line bg-surface text-ink-soft hover:border-leaf hover:text-leaf'
                  }`}
                >
                  {flt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* segunda fila: subcategorías de la categoría activa */}
        {subFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por subcategoría">
            {subFilters.map((sub) => {
              const on = active === sub.id
              return (
                <button
                  key={sub.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(sub.id)}
                  className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 active:translate-y-px ${
                    on
                      ? 'bg-leaf-soft text-leaf-deep ring-1 ring-leaf'
                      : 'border border-line bg-surface text-ink-soft hover:border-leaf hover:text-leaf'
                  }`}
                >
                  {sub.label}
                </button>
              )
            })}
          </div>
        )}

        <motion.div
          layout={!reduce}
          className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <ProductCard key={p.id} p={p} reduce={reduce} />
            ))}
          </AnimatePresence>
        </motion.div>

        {shown.length === 0 && (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-card border border-dashed border-line bg-surface py-16 text-center">
            <PawPrint size={32} className="text-leaf" weight="duotone" />
            <p className="font-semibold text-ink">Todavía no hay productos en esta categoría.</p>
            <p className="text-sm text-ink-soft">Probá con otra o escribinos y lo conseguimos.</p>
          </div>
        )}
      </div>
    </section>
  )
}
