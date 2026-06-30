import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CatalogPage from './pages/CatalogPage'
import GroomingPage from './pages/GroomingPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<CatalogPage />} />
        <Route path="peluqueria" element={<GroomingPage />} />
      </Route>
    </Routes>
  )
}
