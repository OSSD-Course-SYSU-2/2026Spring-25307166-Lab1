import { MaterialData } from './Material'
import { NPCRelationship } from './NPC'

export interface AlchemyItem {
  id: string
  name: string
  description: string
  materials: string[]
  formation: string
  rarity: number
  icon?: string
}

export interface Commission {
  id: string
  npcName: string
  npcAvatar?: string
  requiredItem: string
  requiredAmount: number
  reward: number
  description: string
  deadline: number
  isAccepted: boolean
  isCompleted: boolean
}

export interface UserState {
  name: string
  avatar?: string
  materials: Map<string, number>
  items: Map<string, number>
  gold: number
  unlockedMaterials: Set<string>
  unlockedItems: Set<string>
  acceptedCommissions: Commission[]
  npcRelationships: Map<string, NPCRelationship>
  combatPower: number
  social: number
  luck: number
  mysticism: number
  perception: number
  craftsmanship: number
  stamina: number
  maxStamina: number
  lastStaminaUpdate: number
}
