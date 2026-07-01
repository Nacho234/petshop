import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CatalogPage from './pages/CatalogPage'
import GroomingPage from './pages/GroomingPage'
import AboutPage from './pages/AboutPage'
import LocationPage from './pages/LocationPage'
import AdminApp from './admin/AdminApp'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<CatalogPage />} />
        <Route path="peluqueria" element={<GroomingPage />} />
        <Route path="nosotros" element={<AboutPage />} />
        <Route path="ubicacion" element={<LocationPage />} />
      </Route>

      {/* Panel de administración (una sola página con tabs) */}
      <Route path="/admin" element={<AdminApp />} />
    </Routes>
  )
}
