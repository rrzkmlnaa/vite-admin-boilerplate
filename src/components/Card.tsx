/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react'
import { classNames } from 'utils'

interface CardProps {
  title?: string
  subTitle?: string
  children: ReactNode | string
  className?: string
  actions?: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Card = ({ title, subTitle, children, className, actions }: CardProps) => {
  return (
    <div
      className={classNames(
        'card w-full shadow-xl',
        className ? className : 'bg-gray-50'
      )}
    >
      <div className="flex justify-between px-4 pt-4">
        <div>
          <h1 className="card-title text-black">{title}</h1>
          <span className="text-gray-600">{subTitle}</span>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="card-body">{children}</div>
    </div>
  )
}

export default Card
