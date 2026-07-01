import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ShoppingCartSimple,
  Plus,
  Minus,
  Trash,
  X,
  WhatsappLogo,
  ArrowLeft,
  ArrowUpRight,
  Copy,
  Bank,
  CreditCard,
  Check,
} from '../icons'
import { fmtPrice } from '../data'
import { useCart } from '../cart/cartStore'
import { PAYMENT, METHODS } from '../cart/payments'

const WHATSAPP = '5493417544204'

// Mensaje de WhatsApp con el pedido y el medio de pago elegido.
function whatsappHref(items, total, methodLabel) {
  const lines = items.map((i) => `• ${i.qty}x ${i.name} — ${fmtPrice(i.price * i.qty)}`)
  const msg = [
    '¡Hola Zafari! 🛒 Quiero hacer este pedido:',
    ...lines,
    '',
    `Total: ${fmtPrice(total)}`,
    methodLabel ? `Pago: ${methodLabel}` : '',
  ]
    .filter(Boolean)
    .join('\n')
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
}

export default function Cart() {
  const { items, open, setOpen, setQty, removeItem, clear, totalItems, totalPrice } = useCart()
  const [view, setView] = useState('cart') // 'cart' | 'pay'
  const [methodId, setMethodId] = useState(null)
  const [copied, setCopied] = useState(false)

  // Bloquea el scroll del fondo mientras el carrito está abierto.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Al cerrar el carrito, volvemos a la vista inicial.
  useEffect(() => {
    if (!open) {
      setView('cart')
      setMethodId(null)
    }
  }, [open])

  // Si el carrito queda vacío, no tiene sentido la vista de pago.
  useEffect(() => {
    if (items.length === 0) setView('cart')
  }, [items.length])

  const method = METHODS.find((m) => m.id === methodId)
  const methodLabel = method
    ? method.gateway === 'mercadopago'
      ? `${method.label} (Mercado Pago)`
      : method.label
    : ''

  const copyAlias = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT.transfer.alias)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* sin clipboard: el usuario copia a mano */
    }
  }

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
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-gradient-to-b from-zinc-100 to-zinc-300 shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              {view === 'pay' ? (
                <button
                  type="button"
                  onClick={() => setView('cart')}
                  className="flex cursor-pointer items-center gap-2 font-display text-lg font-bold text-ink"
                >
                  <ArrowLeft size={20} weight="bold" />
                  Forma de pago
                </button>
              ) : (
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <ShoppingCartSimple size={22} weight="bold" />
                  Tu carrito
                  {totalItems > 0 && (
                    <span className="rounded-full bg-leaf px-2 py-0.5 text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </h2>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar carrito"
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-ink-soft transition-colors duration-200 hover:bg-cream-deep hover:text-ink"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* body */}
            <div className="flex-1 overflow-y-auto px-5">
              {view === 'cart' &&
                (items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-ink-soft">
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
                ))}

              {view === 'pay' && (
                <div className="py-5">
                  <div className="flex items-center justify-between rounded-xl bg-leaf-soft px-4 py-3">
                    <span className="text-sm font-semibold text-ink">Total a pagar</span>
                    <span className="font-display text-xl font-bold text-ink">{fmtPrice(totalPrice)}</span>
                  </div>

                  <p className="mt-5 text-sm font-semibold text-ink">Elegí cómo pagar</p>
                  <div className="mt-3 grid gap-2">
                    {METHODS.map((m) => {
                      const on = m.id === methodId
                      const Icon = m.gateway === 'transfer' ? Bank : CreditCard
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMethodId(m.id)}
                          aria-pressed={on}
                          className={
                            'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ' +
                            (on ? 'border-leaf bg-leaf-soft ring-1 ring-leaf' : 'border-line bg-surface hover:border-leaf')
                          }
                        >
                          <Icon size={20} weight="duotone" className="text-leaf-deep" />
                          <span className="flex-1 text-sm font-semibold text-ink">{m.label}</span>
                          <span
                            className={
                              'grid h-5 w-5 place-items-center rounded-full border transition-colors ' +
                              (on ? 'border-leaf bg-leaf text-white' : 'border-line text-transparent')
                            }
                            aria-hidden
                          >
                            <Check size={12} weight="bold" />
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* panel según el método elegido */}
                  {method?.gateway === 'mercadopago' && (
                    <div className="mt-5">
                      {PAYMENT.mercadoPagoLink ? (
                        <a
                          href={PAYMENT.mercadoPagoLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:brightness-95 active:translate-y-px"
                          style={{ backgroundColor: '#009ee3' }}
                        >
                          Pagar con Mercado Pago
                          <ArrowUpRight size={18} weight="bold" />
                        </a>
                      ) : (
                        <p className="rounded-xl border border-dashed border-line bg-surface px-4 py-3 text-sm text-ink-soft">
                          El pago online con Mercado Pago se habilita pronto. Mientras tanto, enviá tu
                          pedido por WhatsApp y coordinamos el cobro con tarjeta.
                        </p>
                      )}
                      <a
                        href={whatsappHref(items, totalPrice, methodLabel)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:border-leaf hover:text-leaf"
                      >
                        <WhatsappLogo size={18} weight="fill" />
                        Enviar mi pedido por WhatsApp
                      </a>
                    </div>
                  )}

                  {method?.gateway === 'transfer' && (
                    <div className="mt-5">
                      {PAYMENT.transfer.alias ? (
                        <div className="rounded-xl border border-line bg-surface p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                            Transferí a este alias
                          </p>
                          <div className="mt-1.5 flex items-center justify-between gap-3">
                            <span className="font-display text-lg font-bold text-ink">
                              {PAYMENT.transfer.alias}
                            </span>
                            <button
                              type="button"
                              onClick={copyAlias}
                              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-leaf hover:text-leaf"
                            >
                              {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="bold" />}
                              {copied ? 'Copiado' : 'Copiar'}
                            </button>
                          </div>
                          {PAYMENT.transfer.titular && (
                            <p className="mt-1 text-xs text-ink-soft">Titular: {PAYMENT.transfer.titular}</p>
                          )}
                        </div>
                      ) : (
                        <p className="rounded-xl border border-dashed border-line bg-surface px-4 py-3 text-sm text-ink-soft">
                          En breve cargamos el alias para transferencias. Por ahora coordinamos por
                          WhatsApp.
                        </p>
                      )}
                      <a
                        href={whatsappHref(items, totalPrice, methodLabel)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
                      >
                        <WhatsappLogo size={18} weight="fill" />
                        Enviar comprobante por WhatsApp
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* footer (solo en la vista carrito) */}
            {view === 'cart' && items.length > 0 && (
              <div className="border-t border-line bg-surface px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink-soft">Total</span>
                  <span className="font-display text-2xl font-bold text-ink">{fmtPrice(totalPrice)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setView('pay')}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-leaf-deep active:translate-y-px"
                >
                  Finalizar compra
                </button>
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
