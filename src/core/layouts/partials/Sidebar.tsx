import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigationItems, NavigationProps } from 'routes/navigation'
import { classNames } from 'utils'
import { Icon } from '@iconify/react'
import { useTheme } from 'ThemeProvider'
import { AbilityContext } from 'core/contexts/AbilityContext'

interface SidebarProps {
  showSidebar: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, toggleSidebar }) => {
  const { theme } = useTheme()
  const location = useLocation()
  const ability = useContext(AbilityContext)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex((prevOpenIndex) => (prevOpenIndex === index ? null : index))
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
        'fixed left-0 top-0 h-full w-64 transition-transform duration-300 overflow-auto',
        theme === 'light'
          ? 'bg-white shadow-lg'
          : 'bg-base-200 text-base-content',
        !showSidebar ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">SmartWorks</h2>
          <button
            tabIndex={0}
            aria-label="Menu"
            className="btn btn-circle btn-ghost"
            onClick={toggleSidebar}
          >
            <Icon icon="tabler:menu-4" className="size-6" />
          </button>
        </div>
        <ul className="mt-4 flex flex-col gap-1">
          {navigationItems.map((nav, idx) => {
            if (!canRender(nav)) return null // Skip items the user cannot access

            const isOpen = openIndex === idx
            const isActive = location.pathname === nav.path

            return (
              <li key={idx}>
                {nav.children ? (
                  <>
                    <Link
                      to="#"
                      className={classNames(
                        'flex font-medium w-full justify-between items-center rounded-md px-4 py-2 text-start text-[15px] focus:outline-none ripple',
                        theme === 'light'
                          ? 'btn-ghost hover:bg-gray-100'
                          : 'hover:bg-base-100',
                        isActive ? 'bg-gray-600 text-white shadow-lg' : ''
                      )}
                      onClick={(e) => {
                        e.preventDefault()
                        toggleAccordion(idx)
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon={nav.icon ?? ''} className="size-5" />
                        {nav.title}
                      </div>
                      <Icon
                        icon="tabler:chevron-right"
                        className={classNames(
                          'duration-150 transition-transform transform',
                          isOpen ? 'rotate-90' : '',
                          theme === 'light' ? 'text-base-content' : 'text-white'
                        )}
                      />
                    </Link>
                    <ul
                      className={classNames(
                        'overflow-hidden transition-[max-height] duration-300 ease-in-out',
                        isOpen ? 'max-h-screen' : 'max-h-0'
                      )}
                    >
                      {nav.children.map((child, childIdx) => {
                        if (!canAccess(child.action, child.subject)) return null // Skip items the user cannot access

                        return (
                          <li key={childIdx}>
                            <Link
                              to={child.path ?? ''}
                              className={classNames(
                                'flex font-medium px-4 py-2 w-full items-center gap-4 rounded-md text-start text-[15px] focus:outline-none ripple',
                                theme === 'light'
                                  ? 'btn-ghost hover:bg-gray-100'
                                  : 'hover:bg-base-100',
                                location.pathname === child.path
                                  ? 'bg-gradient-to-r from-[#2c74b5] to-[#6b9ecb] text-white font-semibold'
                                  : ''
                              )}
                            >
                              <Icon
                                icon="tabler:corner-down-right"
                                className="size-3"
                              />
                              {child.title}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </>
                ) : (
                  <>
                    {!nav.section ? (
                      <Link
                        to={nav.path ?? ''}
                        className={classNames(
                          'flex font-medium px-4 py-2 w-full items-center gap-2 rounded-md text-start text-[15px] focus:outline-none ripple',
                          theme === 'light'
                            ? 'btn-ghost hover:bg-gray-100'
                            : 'hover:bg-base-100',
                          isActive
                            ? 'bg-gradient-to-r from-[#2c74b5] to-[#6b9ecb] text-white font-semibold shadow-xl'
                            : ''
                        )}
                      >
                        <Icon icon={nav.icon ?? ''} className="size-5" />
                        {nav.title}
                      </Link>
                    ) : (
                      <span className="px-4 text-[11px] uppercase">
                        {nav.section}
                      </span>
                    )}
                  </>
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
