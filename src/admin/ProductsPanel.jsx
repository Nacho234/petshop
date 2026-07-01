import { Fragment, useMemo, useRef, useState } from 'react'
import { categories, fmtPrice } from '../data'
import { useProducts } from '../store/productsStore'
import { Plus, X, UploadSimple, Image as ImageIcon, ArrowClockwise, MagnifyingGlass } from '../icons'

const catLabel = (id) => categories.find((c) => c.id === id)?.label || '—'
const subLabel = (catId, subId) =>
  categories.find((c) => c.id === catId)?.subs?.find((s) => s.id === subId)?.label || null
const subsFor = (catId) => categories.find((c) => c.id === catId)?.subs || []

const emptyDraft = () => ({ name: '', brand: '', cat: 'alimento', sub: '', price: '', tag: '', img: '' })
const toDraft = (p) => ({
  id: p.id,
  name: p.name,
  brand: p.brand || '',
  cat: p.cat,
  sub: p.sub || '',
  price: p.price ?? '',
  tag: p.tag || '',
  img: p.img || '',
})

// ── Panel ─────────────────────────────────────────────────────────────
export default function ProductsPanel({ flash }) {
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(new Set())
  const [draft, setDraft] = useState(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const base = q
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.brand || '').toLowerCase().includes(q) ||
            catLabel(p.cat).toLowerCase().includes(q),
        )
      : products
    // Agrupadas por categoría, y dentro por nombre.
    return [...base].sort(
      (a, b) => catLabel(a.cat).localeCompare(catLabel(b.cat), 'es') || a.name.localeCompare(b.name, 'es'),
    )
  }, [products, search])

  const toggleSel = (id) =>
    setSelected((prev) => {
      const n = new Set(prev)
      if (n.has(id)) n.delete(id)
      else n.add(id)
      return n
    })

  const saveDraft = (d) => {
    const payload = {
      name: d.name.trim(),
      brand: d.brand.trim(),
      cat: d.cat,
      sub: d.sub || null,
      price: Number(d.price),
      tag: d.tag.trim() || undefined,
      img: d.img.trim(),
    }
    if (d.id) {
      updateProduct(d.id, payload)
      flash('Producto actualizado')
    } else {
      addProduct(payload)
      flash('Producto creado')
    }
    setDraft(null)
  }

  const remove = (p) => {
    if (!confirm(`¿Eliminar "${p.name}" definitivamente?`)) return
    deleteProduct(p.id)
    setSelected((prev) => {
      const n = new Set(prev)
      n.delete(p.id)
      return n
    })
    flash('Producto eliminado')
  }

  const bulkPrice = (price) => {
    selected.forEach((id) => updateProduct(id, { price }))
    flash(`${selected.size} precio(s) actualizados`)
    setSelected(new Set())
  }

  const bulkDelete = () => {
    if (!confirm(`¿Eliminar ${selected.size} producto(s)?`)) return
    selected.forEach((id) => deleteProduct(id))
    flash(`${selected.size} producto(s) eliminados`)
    setSelected(new Set())
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex w-72 max-w-full items-center gap-2 rounded-lg border border-line bg-white px-3 focus-within:border-leaf focus-within:ring-2 focus-within:ring-leaf-soft">
          <MagnifyingGlass size={18} className="text-ink-soft" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, marca o categoría…"
            className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-ink-soft/60"
          />
        </div>
        <span className="text-sm text-ink-soft">
          {filtered.length} de {products.length}
        </span>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => {
              resetProducts()
              flash('Catálogo restaurado')
            }}
            title="Restaurar catálogo original"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-leaf"
          >
            <ArrowClockwise size={16} />
            <span className="hidden sm:inline">Restaurar</span>
          </button>
          <button
            type="button"
            onClick={() => setDraft(emptyDraft())}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-leaf px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-leaf-deep"
          >
            <Plus size={16} weight="bold" />
            Nuevo
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-card border border-line bg-white shadow-sm">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="border-b border-line bg-surface text-left text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="w-10 px-3 py-3">
                <input
                  type="checkbox"
                  className="accent-leaf"
                  checked={filtered.length > 0 && filtered.every((p) => selected.has(p.id))}
                  onChange={(e) =>
                    setSelected(e.target.checked ? new Set(filtered.map((p) => p.id)) : new Set())
                  }
                />
              </th>
              <th className="px-3 py-3">Producto</th>
              <th className="px-3 py-3">Categoría</th>
              <th className="px-3 py-3 text-right">Precio</th>
              <th className="px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {filtered.map((p, idx) => {
              const showHeader = idx === 0 || filtered[idx - 1].cat !== p.cat
              const count = showHeader ? filtered.filter((x) => x.cat === p.cat).length : 0
              return (
                <Fragment key={p.id}>
                  {showHeader && (
                    <tr className="bg-leaf-soft/40">
                      <td colSpan={5} className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-leaf-deep">
                        {catLabel(p.cat)} <span className="font-normal text-ink-soft">· {count}</span>
                      </td>
                    </tr>
                  )}
                  <tr className="hover:bg-black/[0.02]">
                    <td className="px-3 py-2">
                      <input
                        type="checkbox"
                        className="accent-leaf"
                        checked={selected.has(p.id)}
                        onChange={() => toggleSel(p.id)}
                      />
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.img}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-lg border border-line object-cover"
                        />
                        <div className="min-w-0">
                          <div className="truncate font-medium text-ink">{p.name}</div>
                          <div className="text-xs text-ink-soft">
                            {p.brand}
                            {p.tag && <span className="ml-1.5 text-leaf">· {p.tag}</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 text-ink-soft">
                      {catLabel(p.cat)}
                      {subLabel(p.cat, p.sub) && (
                        <span className="text-ink-soft/50"> / {subLabel(p.cat, p.sub)}</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right font-semibold tabular-nums text-ink">
                      {fmtPrice(p.price)}
                    </td>
                    <td className="px-3 py-2 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => setDraft(toDraft(p))}
                        className="cursor-pointer rounded-md px-2 py-1 font-medium text-ink-soft transition-colors hover:bg-leaf-soft hover:text-leaf-deep"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(p)}
                        className="cursor-pointer rounded-md px-2 py-1 font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                </Fragment>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-12 text-center text-ink-soft">
                  Sin resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Barra de acciones masivas (flotante) */}
      {selected.size > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-4 pb-4">
          <div className="flex max-w-[95vw] flex-wrap items-center gap-2 rounded-2xl border border-line bg-white p-3 text-sm shadow-[0_8px_30px_rgba(35,35,31,0.18)]">
            <strong className="text-ink">{selected.size} seleccionados</strong>
            <BulkPrice onApply={bulkPrice} />
            <button
              type="button"
              onClick={bulkDelete}
              className="cursor-pointer rounded-lg border border-red-200 px-2.5 py-1.5 font-medium text-red-600 hover:bg-red-50"
            >
              Eliminar
            </button>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="ml-auto cursor-pointer text-ink-soft hover:text-ink"
            >
              Limpiar
            </button>
          </div>
        </div>
      )}

      {draft && <ProductEditor initial={draft} onSave={saveDraft} onClose={() => setDraft(null)} flash={flash} />}
    </div>
  )
}

// ── Precio masivo ─────────────────────────────────────────────────────
function BulkPrice({ onApply }) {
  const [val, setVal] = useState('')
  return (
    <div className="flex items-center gap-1">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Precio $"
        inputMode="numeric"
        className="w-24 rounded-lg border border-line px-2 py-1.5 outline-none focus:border-leaf"
      />
      <button
        type="button"
        onClick={() => {
          const n = Number(val)
          if (Number.isFinite(n) && n >= 0 && val !== '') onApply(n)
        }}
        className="cursor-pointer rounded-lg border border-line px-2.5 py-1.5 font-medium hover:bg-leaf-soft"
      >
        Aplicar
      </button>
    </div>
  )
}

// ── Editor (drawer lateral) ───────────────────────────────────────────
function ProductEditor({ initial, onSave, onClose, flash }) {
  const [d, setD] = useState(initial)
  const fileRef = useRef(null)
  const set = (k, v) => setD((prev) => ({ ...prev, [k]: v }))
  const subs = subsFor(d.cat)

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      set('img', reader.result)
      flash('Imagen cargada')
    }
    reader.readAsDataURL(file)
  }

  const submit = (e) => {
    e.preventDefault()
    if (d.name.trim().length < 2) return flash('El nombre es obligatorio')
    if (d.price === '' || Number(d.price) < 0) return flash('Poné un precio válido')
    onSave(d)
  }

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-ink/40 backdrop-blur-sm" onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">
            {d.id ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-soft hover:bg-surface"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Imagen */}
          <Field label="Foto">
            <div className="flex items-center gap-3">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-surface">
                {d.img ? (
                  <img src={d.img} alt="" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon size={22} className="text-ink-soft/50" />
                )}
              </div>
              <input
                value={d.img.startsWith('data:') ? '' : d.img}
                onChange={(e) => set('img', e.target.value)}
                placeholder="URL de imagen…"
                className="input"
              />
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-sm font-medium hover:border-leaf hover:text-leaf"
            >
              <UploadSimple size={14} />
              Subir imagen
            </button>
          </Field>

          <Field label="Nombre">
            <input value={d.name} onChange={(e) => set('name', e.target.value)} className="input" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Marca">
              <input value={d.brand} onChange={(e) => set('brand', e.target.value)} className="input" />
            </Field>
            <Field label="Precio (ARS)">
              <input
                type="number"
                min="0"
                value={d.price}
                onChange={(e) => set('price', e.target.value)}
                className="input tabular-nums"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Categoría">
              <select
                value={d.cat}
                onChange={(e) => setD((prev) => ({ ...prev, cat: e.target.value, sub: '' }))}
                className="input"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Subcategoría">
              <select
                value={d.sub}
                onChange={(e) => set('sub', e.target.value)}
                disabled={!subs.length}
                className="input disabled:opacity-50"
              >
                <option value="">{subs.length ? 'Sin subcategoría' : 'No aplica'}</option>
                {subs.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Etiqueta (opcional)">
            <input
              value={d.tag}
              onChange={(e) => set('tag', e.target.value)}
              placeholder="Ej: Más vendido, Nuevo, Oferta…"
              className="input"
            />
          </Field>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            className="flex-1 cursor-pointer rounded-full bg-leaf px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-leaf-deep"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink-soft hover:bg-surface"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</span>
      {children}
    </label>
  )
}
