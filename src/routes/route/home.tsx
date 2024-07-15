import { Suspense } from 'react'
import HomePage from 'pages/home'

const Loading = () => <div>Loading...</div>

export const HomeRoutes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <HomePage />
      </Suspense>
    )
  }
]
