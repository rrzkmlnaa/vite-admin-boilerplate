// components/Sidebar.tsx
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigationItems, NavigationProps } from 'routes/navigation'
import { classNames } from 'utils'
import { Icon } from '@iconify/react'
import { useTheme } from 'ThemeProvider'
import { useContext } from 'react'
import { AbilityContext } from 'core/contexts/AbilityContext'

interface SidebarProps {
  showSidebar: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
  const { theme } = useTheme()
  const location = useLocation()
  const ability = useContext(AbilityContext)
  const [openIndexes, setOpenIndexes] = useState<number[]>([])

  const toggleAccordion = (index: number) => {
    setOpenIndexes((prevOpenIndexes) =>
      prevOpenIndexes.includes(index)
        ? prevOpenIndexes.filter((i) => i !== index)
        : [...prevOpenIndexes, index]
    )
  }

  const canAccess = (action?: string, subject?: string) => {
    return action && subject ? ability?.can(action, subject) : true
  }

  const canRender = (item: NavigationProps) => {
    if (item.children) {
      // Check if at least one child can be accessed
      return item.children.some((child) =>
        canAccess(child.action, child.subject)
      )
    }
    return canAccess(item.action, item.subject)
  }

  return (
    <aside
      className={classNames(
        'fixed left-0 top-0 h-full w-64 transition-transform duration-300',
        theme === 'light'
          ? 'bg-white shadow-lg'
          : 'bg-base-200 text-base-content',
        !showSidebar ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold">HR Academy</h2>
        <ul className="mt-4 flex flex-col gap-1">
          {navigationItems.map((nav, idx) => {
            if (!canRender(nav)) return null // Skip items the user cannot access

            const isOpen = openIndexes.includes(idx)
            const isActive = location.pathname === nav.path

            return (
              <li key={idx}>
                {nav.children ? (
                  <>
                    <Link
                      to="#"
                      className={classNames(
                        'flex w-full justify-between items-center rounded-md px-4 py-2 text-start text-[15px] focus:outline-none',
                        theme === 'light'
                          ? 'btn-ghost hover:bg-gray-100'
                          : 'hover:bg-base-100',
                        isActive ? 'bg-gray-600 text-white' : ''
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        toggleAccordion(idx)
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="tabler:home" className="size-5" />
                        {nav.title}
                      </div>
                      <Icon
                        icon={
                          isOpen ? 'tabler:chevron-up' : 'tabler:chevron-down'
                        }
                        className={
                          theme === 'light' ? 'text-base-content' : 'text-white'
                        }
                      />
                    </Link>
                    {isOpen && (
                      <ul>
                        {nav.children.map((child, childIdx) => {
                          if (!canAccess(child.action, child.subject))
                            return null // Skip items the user cannot access

                          return (
                            <li key={childIdx}>
                              <Link
                                to={child.path ?? ''}
                                className={classNames(
                                  'flex px-4 py-2 w-full items-center gap-2 rounded-md text-start text-[15px] focus:outline-none',
                                  theme === 'light'
                                    ? 'btn-ghost hover:bg-gray-100'
                                    : 'hover:bg-base-100',
                                  location.pathname === child.path
                                    ? 'bg-gradient-to-r from-[#2c74b5] to-[#6b9ecb] text-white font-semibold'
                                    : 'font-medium'
                                )}
                              >
                                <Icon
                                  icon="tabler:corner-down-right"
                                  className="size-5"
                                />
                                {child.title}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={nav.path ?? ''}
                    className={classNames(
                      'flex px-4 py-2 w-full items-center gap-2 rounded-md text-start text-[15px] focus:outline-none',
                      theme === 'light'
                        ? 'btn-ghost hover:bg-gray-100'
                        : 'hover:bg-base-100',
                      isActive
                        ? 'bg-gradient-to-r from-[#2c74b5] to-[#6b9ecb] text-white font-semibold'
                        : 'font-medium'
                    )}
                  >
                    <Icon icon="tabler:home" className="size-5" />
                    {nav.title}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
