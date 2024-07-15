import React from 'react'
import useAuthStore from 'store/useAuthStore'
import { classNames } from 'utils'

interface NavigationProps {
  showSidebar: boolean
  toggleSidebar: () => void
}

const TopNavigation: React.FC<NavigationProps> = ({
  showSidebar,
  toggleSidebar
}) => {
  const { logout } = useAuthStore()

  return (
    <header>
      <nav
        className={classNames(
          'navbar bg-base-300 transition-transform duration-300 p-4',
          !showSidebar ? 'ml-auto w-[calc(100%-16rem)]' : ''
        )}
        aria-label="Main Navigation"
      >
        <div className="navbar-start">
          <button
            tabIndex={0}
            aria-label="Menu"
            className="btn btn-circle btn-ghost"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>
        {/* <div className="navbar-center">
            <a className="btn btn-ghost text-xl" href="#home">
              daisyUI
            </a>
          </div> */}
        <div className="navbar-end">
          <div className="dropdown dropdown-end dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-btn"
            >
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card dropdown-content card-compact z-[1] w-52 bg-primary p-2 text-primary-content shadow"
            >
              <ul tabIndex={0} className="menu text-white">
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
