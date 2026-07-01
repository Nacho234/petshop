// Auth "de arranque" para el panel: una sola contraseña, sesión en localStorage.
// TODO (cuando conectemos DB): reemplazar por login real (Supabase Auth) + RLS.
//
// La contraseña viene de la env VITE_ADMIN_PASSWORD (definila en Vercel y en
// .env.local para desarrollo). OJO: al ser una app 100% front, esta variable
// queda incrustada en el bundle; es una tranca liviana, no un secreto real.
const SESSION_KEY = 'zafari-admin-session'

// En desarrollo, si no definiste la env, cae a una clave por defecto para no
// trabarte. En producción (build), NO hay default: si falta la env, no se entra.
const ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD || (import.meta.env.DEV ? 'zafari2026' : '')

export const isAuthed = () => {
  try {
    return localStorage.getItem(SESSION_KEY) === 'ok'
  } catch {
    return false
  }
}

export const login = (password) => {
  // Sin contraseña configurada no se permite el acceso (evita entrar con "").
  if (ADMIN_PASSWORD && password === ADMIN_PASSWORD) {
    localStorage.setItem(SESSION_KEY, 'ok')
    return true
  }
  return false
}

export const logout = () => localStorage.removeItem(SESSION_KEY)
