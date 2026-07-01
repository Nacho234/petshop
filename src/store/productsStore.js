import { createContext, useContext } from 'react'

// Contexto del catálogo de productos.
// Hoy se siembra desde data.js y se persiste en localStorage; el día de mañana
// este provider se reemplaza por Supabase sin tocar la UI que lo consume.
export const ProductsContext = createContext(null)

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts debe usarse dentro de <ProductsProvider>')
  return ctx
}
