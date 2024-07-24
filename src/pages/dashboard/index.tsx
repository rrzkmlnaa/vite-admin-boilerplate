import { AbilityContext } from 'core/contexts/AbilityContext'
import React, { useContext } from 'react'

const DashboardPage = () => {
  const ability = useContext(AbilityContext)

  return (
    <div>
      {ability?.can('read', 'dashboard') && <h1>Bisa</h1>}
      Page
    </div>
  )
}

export default DashboardPage
