export interface LevelSystem {
  level: number
  experience: number
  experienceToNext: number
}

export const LevelExperienceRequirements: number[] = [
  0,
  100,
  250,
  500,
  850,
  1300,
  1900,
  2650,
  3550,
  4650,
  6000,
  7650,
  9650,
  12050,
  14900,
  18300,
  22350,
  27150,
  32850,
  39600
]

export function getLevelFromExperience(exp: number): number {
  for (let i = LevelExperienceRequirements.length - 1; i >= 0; i--) {
    if (exp >= LevelExperienceRequirements[i]) {
      return i + 1
    }
  }
  return 1
}

export function getExperienceToNextLevel(level: number): number {
  if (level >= LevelExperienceRequirements.length) {
    return LevelExperienceRequirements[LevelExperienceRequirements.length - 1] * 2
  }
  return LevelExperienceRequirements[level] - LevelExperienceRequirements[level - 1]
}

export function calculateExpReward(type: 'commission' | 'alchemy' | 'adventure', rarity: string, level: number): number {
  let baseExp = 0
  
  switch (type) {
    case 'commission':
      baseExp = rarity === 'legendary' ? 100 : rarity === 'rare' ? 50 : 20
      break
    case 'alchemy':
      baseExp = rarity === 'legendary' ? 80 : rarity === 'rare' ? 40 : 15
      break
    case 'adventure':
      baseExp = 30
      break
  }
  
  const levelBonus = 1 + (level - 1) * 0.1
  return Math.floor(baseExp * levelBonus)
}

export function getUnlockedRecipes(level: number): string[] {
  const unlocked: string[] = []
  
  if (level >= 1) {
    unlocked.push('life_potion', 'magic_stone', 'antidote', 'magicless_water')
  }
  if (level >= 2) {
    unlocked.push('healing_salve')
  }
  if (level >= 3) {
    unlocked.push('energy_crystal', 'seeking_gem', 'harvest_bottle')
  }
  if (level >= 4) {
    unlocked.push('curse_dust', 'inspiration_bottle')
  }
  if (level >= 5) {
    unlocked.push('dream_pearl', 'invisibility_potion')
  }
  if (level >= 6) {
    unlocked.push('love_ring', 'flight_potion')
  }
  if (level >= 7) {
    unlocked.push('memory_potion', 'wisdom_scroll')
  }
  if (level >= 8) {
    unlocked.push('guardian_talisman')
  }
  if (level >= 9) {
    unlocked.push('time_hourglass')
  }
  if (level >= 10) {
    unlocked.push('soul_contract')
  }
  if (level >= 15) {
    unlocked.push('immortal_key')
  }
  
  return unlocked
}
