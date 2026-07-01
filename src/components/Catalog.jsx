import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Heart, PawPrint, Plus } from '../icons'
import { categories, fmtPrice } from '../data'
import { useCart } from '../cart/cartStore'
import { useProducts } from '../store/productsStore'

const filters = [{ id: 'todos', label: 'Todos' }, ...categories.map((c) => ({ id: c.id, label: c.label }))]

// Devuelve la categoría activa, ya sea que `active` sea su id o el de una de sus subcategorías.
function findActiveCategory(active) {
  return categories.find((c) => c.id === active || c.subs?.some((s) => s.id === active))
}

function ProductCard({ p, reduce }) {
  const [fav, setFav] = useState(false)
  const { addItem } = useCart()
  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-sm"
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
          <button
            type="button"
            onClick={() => addItem(p)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-line px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors duration-200 hover:border-leaf hover:bg-leaf hover:text-white"
          >
            <Plus size={14} weight="bold" />
            Agregar
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Catalog({ active, setActive }) {
  const reduce = useReducedMotion()
  const { products } = useProducts()
  const shown = useMemo(
    () =>
      active === 'todos'
        ? products
        : products.filter((p) => p.cat === active || p.sub === active),
    [active, products],
  )

  // Subcategorías a mostrar: las de la categoría activa (si tiene).
  const activeCat = findActiveCategory(active)
  const subFilters = activeCat?.subs?.length
    ? [{ id: activeCat.id, label: 'Todas' }, ...activeCat.subs]
    : []

  return (
    <section id="catalogo" className="scroll-mt-20 bg-white pb-20 pt-12 lg:pb-28 lg:pt-14">
      <div className="mx-auto max-w-[100rem] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* sidebar de filtros */}
          <aside className="lg:w-64 lg:shrink-0">
            <div className="rounded-card border border-line bg-white p-5 shadow-sm lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">
                Categorías
              </p>
              <div
                className="mt-3 flex flex-col gap-1.5"
                role="tablist"
                aria-label="Filtrar por categoría"
              >
                {filters.map((flt) => {
                  const on = active === flt.id
                  return (
                    <button
                      key={flt.id}
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(flt.id)}
                      className={`cursor-pointer rounded-full px-4 py-2 text-left text-sm font-semibold transition-all duration-200 ${
                        on
                          ? 'bg-leaf text-white shadow-sm'
                          : 'text-ink-soft hover:bg-leaf-soft hover:text-leaf-deep'
                      }`}
                    >
                      {flt.label}
                    </button>
                  )
                })}
              </div>

              {/* subcategorías de la categoría activa */}
              {subFilters.length > 0 && (
                <div className="mt-4 border-t border-line pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">
                    Subcategorías
                  </p>
                  <div
                    className="mt-3 flex flex-col gap-1"
                    role="tablist"
                    aria-label="Filtrar por subcategoría"
                  >
                    {subFilters.map((sub) => {
                      const on = active === sub.id
                      return (
                        <button
                          key={sub.id}
                          role="tab"
                          aria-selected={on}
                          onClick={() => setActive(sub.id)}
                          className={`cursor-pointer rounded-full px-3.5 py-1.5 text-left text-xs font-semibold transition-all duration-200 ${
                            on
                              ? 'bg-leaf-soft text-leaf-deep ring-1 ring-leaf'
                              : 'text-ink-soft hover:bg-leaf-soft hover:text-leaf'
                          }`}
                        >
                          {sub.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* grilla de productos */}
          <div className="flex-1">
            <motion.div
              layout={!reduce}
              className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {shown.map((p) => (
                  <ProductCard key={p.id} p={p} reduce={reduce} />
                ))}
              </AnimatePresence>
            </motion.div>

            {shown.length === 0 && (
              <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-line bg-surface py-16 text-center">
                <PawPrint size={32} className="text-leaf" weight="duotone" />
                <p className="font-semibold text-ink">Todavía no hay productos en esta categoría.</p>
                <p className="text-sm text-ink-soft">Probá con otra o escribinos y lo conseguimos.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
