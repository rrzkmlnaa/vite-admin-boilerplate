import React, { useEffect, useState } from 'react'
import useAuthStore from 'core/store/useAuthStore'
import { classNames } from 'utils'
import { useTheme } from 'ThemeProvider'
import { Icon } from '@iconify/react'

interface NavigationProps {
  showSidebar: boolean
  toggleSidebar: () => void
}

const TopNavigation: React.FC<NavigationProps> = ({
  showSidebar,
  toggleSidebar
}) => {
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuthStore()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={classNames(
        'px-6 pt-4',
        theme === 'light' ? 'bg-[#f8f7fa]' : ''
      )}
    >
      <nav
        className={classNames(
          'navbar transition-transform duration-300 px-4 py-2 rounded-lg',
          !showSidebar ? 'ml-auto w-[calc(100%-16rem)]' : '',
          isScrolled
            ? 'fixed z-50 right-0 top-0 backdrop-blur bg-opacity-80'
            : '',
          theme === 'light' ? 'bg-white shadow-md' : 'bg-base-200' // Apply background color based on theme
        )}
        aria-label="Main Navigation"
      >
        <div className="navbar-start">
          {showSidebar && (
            <button
              tabIndex={0}
              aria-label="Menu"
              className="btn btn-circle btn-ghost"
              onClick={toggleSidebar}
            >
              <Icon icon="tabler:menu-4" className="size-6" />
            </button>
          )}
        </div>

        <div className="navbar-end gap-3">
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost swap swap-rotate"
            aria-label="Toggle theme"
          >
            <Icon
              icon="tabler:sun"
              className={`size-6 fill-current ${
                theme === 'light' ? 'block' : 'hidden'
              }`}
            />
            <Icon
              icon="tabler:moon"
              className={`size-6 fill-current ${
                theme === 'dark' ? 'block' : 'hidden'
              }`}
            />
          </button>

          <div className="dropdown dropdown-end dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-btn"
            >
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="Profile"
                  />
                </div>
              </div>
            </div>
            <div
              tabIndex={0}
              className={classNames(
                'card dropdown-content card-compact z-[1] w-52 p-2 text-primary-content shadow',
                theme === 'dark' ? 'bg-base-content' : 'bg-white'
              )}
            >
              <ul
                className={classNames(
                  'menu',
                  theme === 'light' ? 'text-base-content' : 'text-white'
                )}
              >
                <li>
                  <a className="font-bold">Profile</a>
                </li>
                <li>
                  <button onClick={() => logout()} className="font-bold">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default TopNavigation
