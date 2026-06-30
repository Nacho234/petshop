// ── Configuración de medios de pago ───────────────────────────────────
// 👉 Completá estos valores cuando los tengas. No hace falta tocar nada más.

export const PAYMENT = {
  // Link de pago de Mercado Pago (lo generás en tu cuenta de MP → "Link de pago").
  // Mientras esté vacío, el checkout ofrece coordinar el cobro por WhatsApp.
  mercadoPagoLink: '',

  // Datos para transferencia bancaria.
  transfer: {
    alias: '', // ej: 'ZAFARI.PETSHOP'
    cbu: '', // opcional
    titular: 'Zafari Petshop',
  },
}

// Métodos que ve el cliente al finalizar la compra.
export const METHODS = [
  { id: 'credito', label: 'Tarjeta de crédito', gateway: 'mercadopago' },
  { id: 'debito', label: 'Tarjeta de débito', gateway: 'mercadopago' },
  { id: 'transferencia', label: 'Transferencia', gateway: 'transfer' },
]
