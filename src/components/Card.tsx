/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react'
import { useTheme } from 'ThemeProvider'
import { classNames } from 'utils'

interface CardProps {
  title?: string
  subTitle?: string
  children: ReactNode | string
  className?: string
  actions?: ReactNode
  useBody?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Card = ({
  title,
  subTitle,
  children,
  className,
  actions,
  useBody
}: CardProps) => {
  const { theme } = useTheme()

  return (
    <div
      className={classNames(
        'card w-full shadow-md rounded-lg',
        className ? className : '',
        theme === 'light' ? 'bg-white' : 'bg-[#191e24]'
      )}
    >
      {(title || subTitle || actions) && (
        <div className="flex justify-between px-8 pt-8">
          <div>
            {title && (
              <h1
                className={classNames(
                  'card-title text-2xl',
                  theme === 'light' ? 'text-white' : ''
                )}
              >
                {title}
              </h1>
            )}
            {subTitle && (
              <span
                className={classNames(theme === 'light' ? 'text-white' : '')}
              >
                {subTitle}
              </span>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {useBody ? (
        <div className="card-body">{children}</div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  )
}

export default Card
