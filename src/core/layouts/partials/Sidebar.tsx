import React from 'react'
import { classNames } from 'utils'

interface SidebarProps {
  showSidebar: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
  return (
    <aside
      className={classNames(
        'fixed left-0 top-0 h-full w-64 bg-gray-800 text-white transition-transform duration-300',
        !showSidebar ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="p-4">
        <h2 className="text-xl">Sidebar</h2>
        <ul className="mt-4">
          <li>
            <a href="#homepage" className="block py-2">
              Homepage
            </a>
          </li>
          <li>
            <a href="#portfolio" className="block py-2">
              Portfolio
            </a>
          </li>
          <li>
            <a href="#about" className="block py-2">
              About
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
