export const getUserPermissions = () => {
  const userData = localStorage.getItem('user')
  const userPermissions = userData ? JSON.parse(userData).permissions : null

  return userPermissions
}
