export interface NavigationProps {
  section?: string
  title?: string
  path?: string
  icon?: string
  children?: NavigationProps[]
  action?: string
  subject?: string
  element?: string
}

export const navigationItems: NavigationProps[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: 'tabler:home'
  },
  {
    section: 'Modules'
  },
  {
    title: 'Core HR',
    icon: 'tabler:hierarchy',
    children: [
      {
        title: 'Dashboard HR',
        path: '/hr'
      },
      {
        title: 'Employee',
        path: '/hr/employees',
        element: '/modules/hr/employee'
      },
      {
        title: 'Contract',
        path: '/hr/contracts'
      },
      {
        title: 'Department',
        path: '/hr/departments'
      },
      {
        title: 'Job Level',
        path: '/hr/job-levels'
      },
      {
        title: 'Job Position',
        path: '/hr/job-positions'
      },
      {
        title: 'Org Chart',
        path: '/hr/org-chart'
      }
    ]
  },
  {
    title: 'Timesheet',
    icon: 'tabler:clock-cog',
    children: [
      {
        title: 'Attendances',
        path: '/timesheet/attendances'
      },
      {
        title: 'Time Off',
        path: '/timesheet/time-off'
      },
      {
        title: 'Overtime',
        path: '/timesheet/overtime'
      }
    ]
  },
  {
    title: 'Project Management',
    icon: 'tabler:layout-kanban',
    children: [
      {
        title: 'Portfolio',
        path: '/pm/portfolio'
      },
      {
        title: 'Project',
        path: '/pm/projects'
      },
      {
        title: 'Activity',
        path: '/pm/activities'
      },
      {
        title: 'Task',
        path: '/pm/tasks'
      }
    ]
  }
]

export const createAclMap = (items: NavigationProps[]) => {
  return items.reduce(
    (map, item) => {
      if (item.path && item.action && item.subject) {
        map[item.path] = {
          action: item.action,
          subject: item.subject
        }
      }
      return map
    },
    {} as { [key: string]: { action: string; subject: string } }
  )
}

export const aclMap = createAclMap(navigationItems)
