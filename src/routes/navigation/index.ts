export interface NavigationProps {
  title?: string
  path?: string
  children?: NavigationProps[]
  action?: string
  subject?: string
}

export const navigationItems: NavigationProps[] = [
  {
    title: 'Dashboard',
    path: '/'
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
