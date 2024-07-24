/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbilityBuilder, Ability } from '@casl/ability'
import { getUserPermissions } from 'core/utils/getUserPermission'

const defineAbilitiesFor = () => {
  const { can, rules } = new AbilityBuilder(Ability)
  const userPermissions: [] = JSON.parse(getUserPermissions())

  userPermissions?.map((acl: any) => {
    can(acl.action, acl.subject)
  })

  return new Ability(rules)
}

export default defineAbilitiesFor
