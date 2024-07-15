// core/auth.js
export const isAuthenticated = () => {
  // Logika untuk memeriksa status autentikasi
  // Contoh sederhana dengan menggunakan token yang disimpan di localStorage
  const token = localStorage.getItem('authToken')
  return !!token
}
