/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, LazyExoticComponent, MouseEvent } from 'react'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function useLS(type: 'get' | 'put', key: string, value?: any) {
  if (type === 'put') {
    // Function to set a value in localStorage
    const setValue = (newValue: any) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.error(`Error setting localStorage item ${key}:`, error)
      }
    }

    return setValue
  } else if (type === 'get') {
    // Function to get a value from localStorage
    const getValue = () => {
      try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : value
      } catch (error) {
        console.error(`Error retrieving localStorage item ${key}:`, error)
        return value
      }
    }

    return getValue()
  } else {
    throw new Error(`Invalid type parameter "${type}"`)
  }
}

export const createRipple = (event: MouseEvent<HTMLDivElement>) => {
  const button = event.currentTarget
  const ripple = document.createElement('span')
  ripple.className = 'ripple-effect'

  const rect = button.getBoundingClientRect()
  const size = Math.max(button.clientWidth, button.clientHeight)
  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`

  button.appendChild(ripple)

  ripple.addEventListener('animationend', () => {
    ripple.remove()
  })
}

export const dynamicImport = (
  componentPath: string
): LazyExoticComponent<any> => {
  return lazy(() =>
    import(`../pages${componentPath}`).catch(
      () => import('../core/components/ErrorPage')
    )
  )
}
