import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cartStore'

const STORAGE_KEY = 'zafari-cart'

function readStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  // items: [{ id, name, brand, price, img, qty }]
  const [items, setItems] = useState(readStored)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      const { id, name, brand, price, img } = product
      return [...prev, { id, name, brand, price, img, qty }]
    })
    setOpen(true)
  }

  const setQty = (id, qty) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    )

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clear = () => setItems([])

  const totalItems = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])
  const totalPrice = useMemo(() => items.reduce((n, i) => n + i.price * i.qty, 0), [items])

  const value = {
    items,
    open,
    setOpen,
    addItem,
    setQty,
    removeItem,
    clear,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
