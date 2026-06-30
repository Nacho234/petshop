import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import Cart from './Cart'

// Al cambiar de ruta sube al inicio; si hay hash (#seccion), scrollea ahí.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout() {
  return (
    <div className="min-h-[100dvh] bg-cream">
      <ScrollManager />
      <Nav />
      <Cart />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
