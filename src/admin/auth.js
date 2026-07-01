// Auth "de arranque" para el panel: una sola contraseña, sesión en localStorage.
// TODO (cuando conectemos DB): reemplazar por login real (Supabase Auth) + RLS.
const SESSION_KEY = 'zafari-admin-session'

// Cambiala por la que quieras. Mientras sea visual, alcanza con esto.
export const ADMIN_PASSWORD = 'zafari2026'

export const isAuthed = () => {
  try {
    return localStorage.getItem(SESSION_KEY) === 'ok'
  } catch {
    return false
  }
}

export const login = (password) => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(SESSION_KEY, 'ok')
    return true
  }
  return false
}

export const logout = () => localStorage.removeItem(SESSION_KEY)
