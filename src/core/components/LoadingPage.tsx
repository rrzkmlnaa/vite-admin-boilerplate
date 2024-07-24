import React from 'react'

const LoadingPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3">
      <span className="loading loading-ring loading-lg"></span>
      <span className="">Loading...</span>
    </div>
  )
}

export default LoadingPage
