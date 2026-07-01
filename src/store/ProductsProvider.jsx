import { useEffect, useMemo, useState } from 'react'
import { products as seedProducts } from '../data'
import { ProductsContext } from './productsStore'

const STORAGE_KEY = 'zafari-products'

function readStored() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(raw) && raw.length) return raw
  } catch {
    // ignore, caemos al seed
  }
  return seedProducts
}

const nextId = (list) => list.reduce((max, p) => Math.max(max, p.id), 0) + 1

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(readStored)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const addProduct = (data) => {
    setProducts((prev) => [{ ...data, id: nextId(prev) }, ...prev])
  }

  const updateProduct = (id, patch) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch, id } : p)))
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  // Restaura el catálogo original de data.js (útil mientras es visual/demo).
  const resetProducts = () => setProducts(seedProducts)

  const value = useMemo(
    () => ({ products, addProduct, updateProduct, deleteProduct, resetProducts }),
    [products],
  )

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
