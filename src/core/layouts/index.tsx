import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import TopNavigation from './partials/TopNavigation'
import Sidebar from './partials/Sidebar'
import { classNames, useLS } from 'utils'
import { AbilityContext } from 'core/contexts/AbilityContext'
import { aclMap } from 'routes/navigation'
import { useFetch } from 'core/hooks/useFetch'
import ErrorPage from 'core/components/ErrorPage'

const AppLayout: React.FC = () => {
  const location = useLocation()
  const ability = useContext(AbilityContext)
  const setSettingsData = useLS('put', 'settings')
  const settingsData = useLS('get', 'settings')
  const setPermissionsData = useLS('put', 'user')
  const permissionsData = useLS('get', 'user')
  const [isSidebarOpen, setSidebarOpen] = useState(
    settingsData?.sidebarOpen ?? false
  )

  const {
    isLoading: permissionLoading,
    data: permissionData,
    error: permissionError
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useFetch<any>('/authorization/permissions/user', 'GET')

  const getCurrentPageACL = (pathname: string) => aclMap[pathname]

  const toggleSidebar = () => {
    const newSidebarState = !isSidebarOpen
    setSidebarOpen(newSidebarState)
    setSettingsData({ ...settingsData, sidebarOpen: newSidebarState })
  }

  const currentPageACL = getCurrentPageACL(location.pathname)

  useEffect(() => {
    if (!permissionLoading && !permissionError) {
      setPermissionsData({
        ...permissionsData,
        permissions: JSON.stringify(permissionData.result.A)
      })
    } else {
      setPermissionsData({
        ...permissionsData,
        permissions: null
      })
    }
  }, [
    permissionLoading,
    permissionData,
    permissionError,
    setPermissionsData,
    permissionsData
  ])

  if (
    currentPageACL &&
    !ability?.can(currentPageACL.action, currentPageACL.subject) &&
    !permissionLoading &&
    !permissionData
  ) {
    return <Navigate to="/not-authorized" />
  }

  if (permissionError) return <ErrorPage error="Error getting permission!" />

  return (
    <div className="relative min-h-screen">
      <TopNavigation
        showSidebar={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar showSidebar={isSidebarOpen} toggleSidebar={toggleSidebar} />
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
