import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ShoppingCartSimple, Plus, Minus, Trash, X, WhatsappLogo } from '../icons'
import { fmtPrice } from '../data'
import { useCart } from '../cart/cartStore'

const WHATSAPP = '5493417544204'

function checkoutHref(items, total) {
  const lines = items.map((i) => `• ${i.qty}x ${i.name} — ${fmtPrice(i.price * i.qty)}`)
  const msg = ['¡Hola Zafari! 🛒 Quiero hacer este pedido:', ...lines, '', `Total: ${fmtPrice(total)}`].join('\n')
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
}

export default function Cart() {
  const { items, open, setOpen, setQty, removeItem, clear, totalItems, totalPrice } = useCart()

  // Bloquea el scroll del fondo mientras el carrito está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Carrito de compras"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <ShoppingCartSimple size={22} weight="bold" />
                Tu carrito
                {totalItems > 0 && (
                  <span className="rounded-full bg-leaf px-2 py-0.5 text-xs font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar carrito"
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-soft transition-colors duration-200 hover:bg-cream-deep hover:text-ink"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* items */}
            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-cream-deep text-ink-soft">
                    <ShoppingCartSimple size={28} weight="duotone" />
                  </span>
                  <p className="font-semibold text-ink">Tu carrito está vacío</p>
                  <p className="max-w-[26ch] text-sm text-ink-soft">
                    Agregá productos del catálogo y los ves acá.
                  </p>
                </div>
              ) : (
                <ul>
                  {items.map((i) => (
                    <li key={i.id} className="flex gap-3 border-b border-line/70 py-4">
                      <img
                        src={i.img}
                        alt={i.name}
                        className="h-16 w-16 shrink-0 rounded-xl bg-cream-deep object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <p className="text-sm font-semibold leading-snug text-ink">{i.name}</p>
                        <p className="text-xs text-ink-soft">{i.brand}</p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="inline-flex items-center rounded-full border border-line bg-surface">
                            <button
                              type="button"
                              onClick={() => setQty(i.id, i.qty - 1)}
                              aria-label={`Quitar una unidad de ${i.name}`}
                              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-ink-soft transition-colors hover:text-leaf"
                            >
                              <Minus size={14} weight="bold" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold tabular-nums text-ink">
                              {i.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(i.id, i.qty + 1)}
                              aria-label={`Agregar una unidad de ${i.name}`}
                              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-ink-soft transition-colors hover:text-leaf"
                            >
                              <Plus size={14} weight="bold" />
                            </button>
                          </div>
                          <span className="font-display text-sm font-bold tabular-nums text-ink">
                            {fmtPrice(i.price * i.qty)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(i.id)}
                        aria-label={`Eliminar ${i.name} del carrito`}
                        className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center self-start rounded-full text-ink-soft transition-colors hover:text-red-600"
                      >
                        <Trash size={16} weight="bold" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* footer / total */}
            {items.length > 0 && (
              <div className="border-t border-line bg-surface px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-soft">Total</span>
                  <span className="font-display text-2xl font-bold text-ink">{fmtPrice(totalPrice)}</span>
                </div>
                <a
                  href={checkoutHref(items, totalPrice)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  Finalizar compra por WhatsApp
                </a>
                <button
                  type="button"
                  onClick={clear}
                  className="mt-2 w-full cursor-pointer rounded-full px-6 py-2 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-red-600"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
