import React from 'react'
import { createRoot } from 'react-dom/client'
import 'styles/global.css'
import { RouterProvider } from 'react-router-dom'
import { router } from 'routes'
import ThemeProvider from 'ThemeProvider'
import { AbilityContext } from 'core/contexts/AbilityContext'
import defineAbilitiesFor from 'core/contexts/AbilityBuilder'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

const user = {}
const ability = defineAbilitiesFor(user)

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AbilityContext.Provider value={ability}>
        <RouterProvider router={router} />
      </AbilityContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
)
