import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, PawPrint, SignOut, Storefront, ArrowLeft } from '../icons'
import { useProducts } from '../store/productsStore'
import { isAuthed, login, logout } from './auth'
import ProductsPanel from './ProductsPanel'
import SalesPanel from './SalesPanel'

const TABS = [
  { id: 'products', label: 'Productos' },
  { id: 'sales', label: 'Ventas' },
]

// ── Pantalla de login ─────────────────────────────────────────────────
function Login({ onOk }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (login(password)) onOk()
    else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <main className="grid min-h-[100dvh] place-items-center bg-[#f6f6f2] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-leaf text-white shadow-sm">
            <PawPrint size={28} weight="fill" />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-ink">Zafari · Admin</h1>
            <p className="text-sm text-ink-soft">Ingresá tu contraseña para administrar la tienda.</p>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-card border border-line bg-white p-6 shadow-sm">
          <label className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Contraseña
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-line px-3 focus-within:border-leaf focus-within:ring-2 focus-within:ring-leaf-soft">
            <Lock size={18} className="text-ink-soft" />
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="••••••••"
              className="w-full bg-transparent py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/50"
            />
          </div>
          {error && <p className="mt-2 text-sm font-medium text-red-600">Contraseña incorrecta.</p>}
          <button
            type="submit"
            className="mt-5 w-full cursor-pointer rounded-full bg-leaf py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-leaf-deep"
          >
            Entrar
          </button>
        </form>

        <Link
          to="/"
          className="mt-4 flex items-center justify-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-leaf"
        >
          <ArrowLeft size={16} />
          Volver a la tienda
        </Link>
      </div>
    </main>
  )
}

// ── App del admin ─────────────────────────────────────────────────────
export default function AdminApp() {
  const [authed, setAuthed] = useState(isAuthed)
  const [tab, setTab] = useState('products')
  const [toast, setToast] = useState(null)
  const { products } = useProducts()

  const flash = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  if (!authed) return <Login onOk={() => setAuthed(true)} />

  return (
    <main className="min-h-[100dvh] bg-[#f6f6f2] text-ink">
      <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-leaf text-white">
              <PawPrint size={18} weight="fill" />
            </span>
            <h1 className="font-display text-base font-bold">Zafari · Admin</h1>
            <span className="rounded-full bg-leaf-soft px-2.5 py-0.5 text-xs font-semibold text-leaf-deep">
              {products.length} productos
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-line p-0.5">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`cursor-pointer rounded-md px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    tab === t.id ? 'bg-leaf text-white shadow-sm' : 'text-ink-soft hover:bg-leaf-soft'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <a
              href="/"
              className="hidden items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-leaf sm:flex"
            >
              <Storefront size={16} />
              Tienda
            </a>
            <button
              type="button"
              onClick={() => {
                logout()
                setAuthed(false)
              }}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <SignOut size={16} />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {tab === 'products' && <ProductsPanel flash={flash} />}
        {tab === 'sales' && <SalesPanel flash={flash} />}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </main>
  )
}
