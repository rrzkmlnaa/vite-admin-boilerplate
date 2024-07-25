import React, { Suspense } from 'react'
import { createBrowserRouter, RouteObject } from 'react-router-dom'
import AppLayout from 'core/layouts'
import AuthGuard from 'core/components/AuthGuard'
import LoginPage from 'pages/auth/login'
import LoadingPage from 'core/components/LoadingPage'
import DashboardPage from 'pages/dashboard'
import withACL from 'core/hoc/withAcl'
import ErrorPage from 'core/components/ErrorPage'
import { dynamicImport } from 'utils'
import { navigationItems, NavigationProps } from './navigation'

const AppLayoutWithACL = withACL(AppLayout)

const createDynamicRoutes = (items: NavigationProps[]): RouteObject[] => {
  const routes: RouteObject[] = []

  items.forEach((item) => {
    if (item.children) {
      routes.push(...createDynamicRoutes(item.children))
    } else if (item.path && item.element) {
      routes.push({
        path: item.path,
        element: (
          <Suspense fallback={<LoadingPage />}>
            {React.createElement(dynamicImport(item.element))}
          </Suspense>
        )
      })
    }
  })

  return routes
}

const dynamicRoutes = createDynamicRoutes(navigationItems)

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
      },
      ...dynamicRoutes
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
