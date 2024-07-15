/* eslint-disable @typescript-eslint/no-explicit-any */
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
