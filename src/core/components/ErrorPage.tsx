/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

interface ErrorProps {
  error?: any
}

const ErrorPage: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <Icon icon="tabler:alert-triangle" className="size-16 text-warning" />
      <h1 className="text-2xl font-bold">{error}</h1>
    </div>
  )
}

export default ErrorPage
