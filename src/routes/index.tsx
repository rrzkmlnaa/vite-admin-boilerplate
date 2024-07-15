import AppLayout from 'core/layouts'
import { createBrowserRouter } from 'react-router-dom'
import { HomeRoutes } from './route/home'
import AuthGuard from 'core/components/AuthGuard'
import LoginPage from 'pages/auth/login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [...HomeRoutes]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])
