import React from 'react'
import { createRoot } from 'react-dom/client'
import 'styles/global.css'
import { RouterProvider } from 'react-router-dom'
import { router } from 'routes'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
