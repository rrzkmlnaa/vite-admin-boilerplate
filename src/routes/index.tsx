import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from 'core/layouts'
import AuthGuard from 'core/components/AuthGuard'
import LoginPage from 'pages/auth/login'
import { Suspense } from 'react'
import LoadingPage from 'core/components/LoadingPage'
import DashboardPage from 'pages/dashboard'
import withACL from 'core/hoc/withAcl'
import ErrorPage from 'core/components/ErrorPage'

const AppLayoutWithACL = withACL(AppLayout)

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <AppLayoutWithACL />
      </AuthGuard>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingPage />}>
            <DashboardPage />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/not-authorized',
    element: <ErrorPage error="Not Authorized" />
  },
  {
    path: '*',
    element: <ErrorPage error="Page not Found" />
  }
])
