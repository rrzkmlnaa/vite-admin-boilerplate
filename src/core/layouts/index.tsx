import React, { useContext, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import TopNavigation from './partials/TopNavigation'
import Sidebar from './partials/Sidebar'
import { classNames, useLS } from 'utils'
import { AbilityContext } from 'core/contexts/AbilityContext'
import { aclMap } from 'routes/navigation'

const AppLayout = () => {
  const location = useLocation()
  const ability = useContext(AbilityContext)
  const setStoredData = useLS('put', 'settings')
  const storedData = useLS('get', 'settings')
  const [isSidebarOpen, setSidebarOpen] = useState(
    storedData?.sidebarOpen ?? false
  )

  const getCurrentPageACL = (pathname: string) => {
    return aclMap[pathname]
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
    setStoredData({ sidebarOpen: !isSidebarOpen })
  }

  const currentPageACL = getCurrentPageACL(location.pathname)

  if (
    currentPageACL &&
    !ability?.can(currentPageACL.action, currentPageACL.subject)
  ) {
    return <Navigate to="/not-authorized" />
  }

  return (
    <div className="relative min-h-screen">
      <TopNavigation
        showSidebar={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar showSidebar={isSidebarOpen} />
      <main
        className={classNames(
          'p-6 transition-all duration-300',
          isSidebarOpen ? 'ml-0' : 'ml-64'
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
