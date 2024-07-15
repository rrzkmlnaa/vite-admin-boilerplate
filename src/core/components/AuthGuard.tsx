/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuthStore from 'store/useAuthStore'

// Asumsikan Anda memiliki fungsi untuk memeriksa status autentikasi

const AuthGuard = ({ children }: any) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    // Redirect ke halaman login jika pengguna tidak diautentikasi
    return <Navigate to="/login" />
  }

  // Jika pengguna diautentikasi, tampilkan komponen anak
  return children
}

export default AuthGuard
