export interface Item {
  id: string
  name: string
  icon: string
  description: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  usableInAdventure: boolean
  effects: ItemEffect[]
  formationMatch?: string  // 匹配的法阵类型
}

export interface ItemEffect {
  type: 'stamina' | 'combatPower' | 'social' | 'luck' | 'gold' | 'materialDrop'
  value: number
  duration?: number
  description: string
}

export interface ItemRecipe {
  id: string
  itemId: string
  name: string
  materials: Map<string, number>
  description: string
  tolerance: number  // 容差百分比
}

export const AllItems: Item[] = [
  // 普通物品 (8种)
  {
    id: 'stamina_potion_small',
    name: '小型体力药水',
    icon: '🧪',
    description: '淡蓝色的液体，恢复少量体力',
    rarity: 'common',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 5, description: '恢复5点体力' }
    ]
  },
  {
    id: 'stamina_potion_medium',
    name: '中型体力药水',
    icon: '💊',
    description: '稳定的蓝色药水，恢复中等体力',
    rarity: 'common',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 10, description: '恢复10点体力' }
    ]
  },
  {
    id: 'social_perfume',
    name: '社交香水',
    icon: '🌸',
    description: '优雅的花香，提升交际能力',
    rarity: 'common',
    usableInAdventure: true,
    effects: [
      { type: 'social', value: 15, duration: 3600, description: '交际+15，持续1小时' }
    ]
  },
  {
    id: 'stamina_cake',
    name: '体力蛋糕',
    icon: '🎂',
    description: '美味的蛋糕，吃完精神百倍',
    rarity: 'common',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 10, description: '恢复10点体力' },
      { type: 'social', value: 5, duration: 1800, description: '交际+5，持续30分钟' }
    ]
  },
  {
    id: 'luck_cookie',
    name: '幸运饼干',
    icon: '🍪',
    description: '神秘的饼干，带来好运',
    rarity: 'common',
    usableInAdventure: true,
    effects: [
      { type: 'luck', value: 10, duration: 1800, description: '幸运+10，持续30分钟' }
    ]
  },
  {
    id: 'combat_ration',
    name: '战斗口粮',
    icon: '🍖',
    description: '高能量食物，增强战斗力',
    rarity: 'common',
    usableInAdventure: true,
    effects: [
      { type: 'combatPower', value: 10, duration: 1800, description: '战斗力+10，持续30分钟' }
    ]
  },
  {
    id: 'energy_drink',
    name: '能量饮料',
    icon: '🥤',
    description: '快速恢复体力的饮料',
    rarity: 'common',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 8, description: '恢复8点体力' },
      { type: 'combatPower', value: 5, duration: 1200, description: '战斗力+5，持续20分钟' }
    ]
  },
  {
    id: 'healing_herb',
    name: '治愈草药',
    icon: '🌿',
    description: '自然草药，温和恢复',
    rarity: 'common',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 6, description: '恢复6点体力' }
    ]
  },
  
  // 稀有物品 (9种)
  {
    id: 'stamina_potion_large',
    name: '大型体力药水',
    icon: '⚗️',
    description: '浓郁的蓝色药水，蕴含强大的恢复魔力',
    rarity: 'rare',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 15, description: '恢复15点体力' }
    ]
  },
  {
    id: 'combat_elixir',
    name: '战斗灵药',
    icon: '⚔️',
    description: '血红色的药剂，战斗力大幅提升',
    rarity: 'rare',
    usableInAdventure: true,
    effects: [
      { type: 'combatPower', value: 20, duration: 3600, description: '战斗力+20，持续1小时' }
    ],
    formationMatch: '赤焰法阵'
  },
  {
    id: 'luck_amulet',
    name: '幸运护身符',
    icon: '🍀',
    description: '神秘的护身符，带来好运',
    rarity: 'rare',
    usableInAdventure: true,
    effects: [
      { type: 'luck', value: 25, duration: 3600, description: '幸运+25，持续1小时' }
    ]
  },
  {
    id: 'material_magnet',
    name: '材料磁石',
    icon: '🧲',
    description: '能吸引原材料的魔法磁石',
    rarity: 'rare',
    usableInAdventure: true,
    effects: [
      { type: 'materialDrop', value: 30, duration: 3600, description: '材料掉落率+30%，持续1小时' }
    ]
  },
  {
    id: 'warrior_potion',
    name: '勇士药剂',
    icon: '💪',
    description: '增强战斗属性的神奇药剂',
    rarity: 'rare',
    usableInAdventure: true,
    effects: [
      { type: 'combatPower', value: 15, duration: 3600, description: '战斗力+15，持续1小时' },
      { type: 'luck', value: 10, duration: 3600, description: '幸运+10，持续1小时' }
    ],
    formationMatch: '赤焰法阵'
  },
  {
    id: 'nature_blessing',
    name: '自然祝福',
    icon: '🍃',
    description: '自然的祝福，全面提升',
    rarity: 'rare',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 12, description: '恢复12点体力' },
      { type: 'social', value: 10, duration: 2400, description: '交际+10，持续40分钟' }
    ],
    formationMatch: '翠风法阵'
  },
  {
    id: 'ocean_essence',
    name: '海洋精华',
    icon: '🌊',
    description: '深海的神秘精华',
    rarity: 'rare',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 18, description: '恢复18点体力' },
      { type: 'luck', value: 15, duration: 2400, description: '幸运+15，持续40分钟' }
    ],
    formationMatch: '幽蓝法阵'
  },
  {
    id: 'moonlight_dew',
    name: '月光露珠',
    icon: '🌙',
    description: '月光凝结的露珠',
    rarity: 'rare',
    usableInAdventure: true,
    effects: [
      { type: 'social', value: 20, duration: 3600, description: '交际+20，持续1小时' },
      { type: 'luck', value: 15, duration: 3600, description: '幸运+15，持续1小时' }
    ],
    formationMatch: '紫月法阵'
  },
  {
    id: 'arcane_crystal',
    name: '奥术水晶',
    icon: '💎',
    description: '蕴含魔力的水晶',
    rarity: 'rare',
    usableInAdventure: true,
    effects: [
      { type: 'combatPower', value: 12, duration: 3600, description: '战斗力+12，持续1小时' },
      { type: 'materialDrop', value: 20, duration: 3600, description: '掉落率+20%，持续1小时' }
    ]
  },
  
  // 史诗物品 (5种)
  {
    id: 'super_stamina_potion',
    name: '超级体力药水',
    icon: '🧬',
    description: '传说中的超级药水',
    rarity: 'epic',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 30, description: '恢复30点体力' }
    ]
  },
  {
    id: 'berserker_elixir',
    name: '狂暴灵药',
    icon: '🔥',
    description: '极大增强战斗能力',
    rarity: 'epic',
    usableInAdventure: true,
    effects: [
      { type: 'combatPower', value: 35, duration: 3600, description: '战斗力+35，持续1小时' },
      { type: 'luck', value: 15, duration: 3600, description: '幸运+15，持续1小时' }
    ],
    formationMatch: '赤焰法阵'
  },
  {
    id: 'wind_walk_potion',
    name: '风行药剂',
    icon: '💨',
    description: '如风般迅捷',
    rarity: 'epic',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 20, description: '恢复20点体力' },
      { type: 'social', value: 25, duration: 3600, description: '交际+25，持续1小时' },
      { type: 'luck', value: 20, duration: 3600, description: '幸运+20，持续1小时' }
    ],
    formationMatch: '翠风法阵'
  },
  {
    id: 'abyss_tear',
    name: '深渊之泪',
    icon: '💧',
    description: '深渊的神秘泪滴',
    rarity: 'epic',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 25, description: '恢复25点体力' },
      { type: 'materialDrop', value: 40, duration: 3600, description: '掉落率+40%，持续1小时' }
    ],
    formationMatch: '幽蓝法阵'
  },
  {
    id: 'celestial_blessing',
    name: '天界祝福',
    icon: '⭐',
    description: '来自天界的祝福',
    rarity: 'epic',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 20, description: '恢复20点体力' },
      { type: 'social', value: 30, duration: 3600, description: '交际+30，持续1小时' },
      { type: 'luck', value: 25, duration: 3600, description: '幸运+25，持续1小时' }
    ],
    formationMatch: '紫月法阵'
  },
  
  // 传说物品 (3种)
  {
    id: 'ancient_blessing',
    name: '远古祝福',
    icon: '✨',
    description: '上古神明的祝福，全面提升能力',
    rarity: 'legendary',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 20, description: '恢复20点体力' },
      { type: 'combatPower', value: 30, duration: 7200, description: '战斗力+30，持续2小时' },
      { type: 'luck', value: 30, duration: 7200, description: '幸运+30，持续2小时' }
    ]
  },
  {
    id: 'godly_essence',
    name: '神之精华',
    icon: '🌟',
    description: '神明的精华，极其强大',
    rarity: 'legendary',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 40, description: '恢复40点体力' },
      { type: 'combatPower', value: 40, duration: 7200, description: '战斗力+40，持续2小时' },
      { type: 'social', value: 40, duration: 7200, description: '交际+40，持续2小时' },
      { type: 'luck', value: 40, duration: 7200, description: '幸运+40，持续2小时' }
    ]
  },
  {
    id: 'world_tree_sap',
    name: '世界树汁液',
    icon: '🌳',
    description: '世界树的神秘汁液',
    rarity: 'legendary',
    usableInAdventure: true,
    effects: [
      { type: 'stamina', value: 50, description: '恢复50点体力' },
      { type: 'combatPower', value: 25, duration: 10800, description: '战斗力+25，持续3小时' },
      { type: 'materialDrop', value: 50, duration: 7200, description: '掉落率+50%，持续2小时' }
    ]
  }
]

export const ItemRecipes: ItemRecipe[] = [
  {
    id: 'recipe_stamina_potion_small',
    itemId: 'stamina_potion_small',
    name: '小型体力药水配方',
    materials: new Map([
      ['slime_heart', 2],
      ['sea_ridge_sand', 1]
    ]),
    description: '使用史莱姆心脏和海脊砂制作基础体力药水',
    tolerance: 5
  },
  {
    id: 'recipe_stamina_potion_medium',
    itemId: 'stamina_potion_medium',
    name: '中型体力药水配方',
    materials: new Map([
      ['slime_heart', 3],
      ['sea_ridge_sand', 2],
      ['mountain_firefly', 1]
    ]),
    description: '加入山萤火提升药效',
    tolerance: 5
  },
  {
    id: 'recipe_stamina_potion_large',
    itemId: 'stamina_potion_large',
    name: '大型体力药水配方',
    materials: new Map([
      ['slime_heart', 5],
      ['sea_ridge_sand', 3],
      ['siren_tear', 1]
    ]),
    description: '加入塞壬泪强化药效，恢复更多体力',
    tolerance: 5
  },
  {
    id: 'recipe_combat_elixir',
    itemId: 'combat_elixir',
    name: '战斗灵药配方',
    materials: new Map([
      ['red_spider', 3],
      ['dan_zhu', 2],
      ['vampire_fang', 1]
    ]),
    description: '利用红色系危险材料炼制强力战斗药剂',
    tolerance: 5
  },
  {
    id: 'recipe_social_perfume',
    itemId: 'social_perfume',
    name: '社交香水配方',
    materials: new Map([
      ['fairy_dust', 2],
      ['mountain_firefly', 3]
    ]),
    description: '妖精粉尘与山萤火调和成优雅香水',
    tolerance: 5
  },
  {
    id: 'recipe_luck_amulet',
    itemId: 'luck_amulet',
    name: '幸运护身符配方',
    materials: new Map([
      ['wheat_wave_bug', 3],
      ['cat_eye', 1],
      ['fairy_dust', 2]
    ]),
    description: '汇聚好运材料制作护身符',
    tolerance: 5
  },
  {
    id: 'recipe_material_magnet',
    itemId: 'material_magnet',
    name: '材料磁石配方',
    materials: new Map([
      ['ridge_mother_rock', 2],
      ['turquoise_dragon_scale', 1]
    ]),
    description: '利用大地和龙族材料制作磁石',
    tolerance: 5
  },
  {
    id: 'recipe_stamina_cake',
    itemId: 'stamina_cake',
    name: '体力蛋糕配方',
    materials: new Map([
      ['autumn_king_fruit', 2],
      ['wheat_wave_bug', 2],
      ['slime_heart', 1]
    ]),
    description: '丰收材料与生命精华制作美味蛋糕',
    tolerance: 5
  },
  {
    id: 'recipe_ancient_blessing',
    itemId: 'ancient_blessing',
    name: '远古祝福配方',
    materials: new Map([
      ['sea_god_pearl', 1],
      ['alice_seed', 1],
      ['undead_dream', 2],
      ['fairy_dust', 5]
    ]),
    description: '集齐稀有材料，召唤远古神明的祝福',
    tolerance: 5
  }
]

export function getItemById(id: string): Item | undefined {
  return AllItems.find(item => item.id === id)
}

export function getRecipeByItemId(itemId: string): ItemRecipe | undefined {
  return ItemRecipes.find(recipe => recipe.itemId === itemId)
}
