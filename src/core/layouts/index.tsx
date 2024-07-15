import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import TopNavigation from './partials/TopNavigation'
import Sidebar from './partials/Sidebar'
import { useLS } from 'utils'

const AppLayout = () => {
  const setStoredData = useLS('put', 'settings')
  const storedData = useLS('get', 'settings')
  const [isSidebarOpen, setSidebarOpen] = useState(
    storedData?.sidebarOpen ?? false
  )

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
    setStoredData({ sidebarOpen: !isSidebarOpen })
  }

  return (
    <div className="relative min-h-screen">
      <TopNavigation
        showSidebar={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar showSidebar={isSidebarOpen} />
      <main
        className={`p-6 transition-all duration-300 ${
          !isSidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
