import { createContext } from 'react'
import { createContextualCan } from '@casl/react'
import { Ability } from '@casl/ability'

// Define a default ability
const defaultAbility = new Ability([])

// Create context with a default ability to avoid null
export const AbilityContext = createContext<Ability>(defaultAbility)
export const Can = createContextualCan(AbilityContext.Consumer)
