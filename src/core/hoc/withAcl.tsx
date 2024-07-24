import React, { useContext } from 'react'
import { AbilityContext } from 'core/contexts/AbilityContext'
import { Navigate } from 'react-router-dom'

type ComponentWithACL = React.ComponentType & {
  acl?: {
    action: string
    subject: string
  }
}

const withACL = (Component: ComponentWithACL): React.FC => {
  const WrappedComponent: React.FC = (props) => {
    const ability = useContext(AbilityContext)

    if (
      Component.acl &&
      !ability?.can(Component.acl.action, Component.acl.subject)
    ) {
      // Redirect or render a "not authorized" message
      return <Navigate to="/not-authorized" />
    }

    return <Component {...props} />
  }

  return WrappedComponent
}

export default withACL
