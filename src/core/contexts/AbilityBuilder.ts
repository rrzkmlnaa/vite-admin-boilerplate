/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbilityBuilder, Ability } from '@casl/ability'

const defineAbilitiesFor = (user: any) => {
  const { can, cannot, rules } = new AbilityBuilder(Ability)

  if (user.role === 'admin') {
    can('manage', 'all')
  } else {
    can('read', 'dashboard')
    cannot('delete', 'all')
  }

  return new Ability(rules)
}

export default defineAbilitiesFor
