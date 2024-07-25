import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from 'ThemeProvider'
import { classNames } from 'utils'

interface CommonProps {
  children?: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

interface ButtonProps extends CommonProps {
  hasLink?: false
  href?: never
}

interface LinkProps extends CommonProps {
  hasLink: true
  href: string
}

type Props = ButtonProps | LinkProps

const Button: React.FC<Props> = ({
  children,
  className,
  size,
  href,
  hasLink
}) => {
  const { theme } = useTheme()

  if (hasLink) {
    return (
      <Link
        to={href}
        className={classNames(
          'btn',
          className ? className : '',
          size ? `btn-${size}` : '',
          theme === 'dark' ? 'btn-outline' : ''
        )}
        title={children as string}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classNames(
        'btn',
        className ? className : '',
        size ? `btn-${size}` : '',
        theme === 'dark' ? 'btn-outline' : ''
      )}
      title={children as string}
    >
      {children}
    </button>
  )
}

export default Button
