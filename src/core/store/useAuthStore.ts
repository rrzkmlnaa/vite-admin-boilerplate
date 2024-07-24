import { create } from 'zustand'
import Cookies from 'js-cookie'

interface AuthState {
  token: string | null
  user: { email: string } | null
  isAuthenticated: boolean
  login: (token: string, user: { email: string }) => void
  logout: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  token: Cookies.get('token') || null,
  user: JSON.parse(Cookies.get('user') || 'null'),
  isAuthenticated: !!Cookies.get('token'),
  login: (token, user) => {
    Cookies.set('token', token, { expires: 7 })
    Cookies.set('user', JSON.stringify(user), { expires: 7 })
    set({ token, user, isAuthenticated: true })
  },
  logout: () => {
    Cookies.remove('token')
    Cookies.remove('user')
    set({ token: null, user: null, isAuthenticated: false })
  }
}))

export default useAuthStore
