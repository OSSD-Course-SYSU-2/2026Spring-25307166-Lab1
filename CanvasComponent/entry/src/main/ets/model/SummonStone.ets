export interface SummonedCreature {
  id: string
  name: string
  icon: string
  type: 'creature' | 'archmage'
  greeting: string[]
  style: string
  bonus: SummonedBonus
  duration: number
}

export interface SummonedBonus {
  type: 'attack' | 'defense' | 'luck' | 'material' | 'gold' | 'experience' | 'stamina'
  value: number
  description: string
}

export const SummonableCreatures: SummonedCreature[] = [
  {
    id: 'phoenix',
    name: '炎凤凰',
    icon: '🔥',
    type: 'creature',
    greeting: [
      '人类，你召唤了我。火焰将为你燃烧！',
      '我乃炎凤凰，涅槃重生之灵。让我看看你的勇气！',
      '呼唤火焰之人，必定胸怀壮志。我欣赏你！'
    ],
    style: '威严霸气',
    bonus: {
      type: 'attack',
      value: 50,
      description: '攻击力+50%'
    },
    duration: 7200
  },
  {
    id: 'ice_dragon',
    name: '冰霜巨龙',
    icon: '❄️',
    type: 'creature',
    greeting: [
      '寒冰之息，冻结万物。凡人，你足够强大吗？',
      '吾乃北境之主，冰霜巨龙。你的意志令我满意。',
      '召唤吾之人，当有凛冬之心。你准备好了吗？'
    ],
    style: '高贵冷漠',
    bonus: {
      type: 'defense',
      value: 40,
      description: '防御力+40%'
    },
    duration: 7200
  },
  {
    id: 'thunder_eagle',
    name: '雷霆天鹰',
    icon: '⚡',
    type: 'creature',
    greeting: [
      '雷电的化身降临！人类，跟上我的速度！',
      '我如闪电般迅捷，你能否驾驭风暴？',
      '雷霆万钧，势不可挡！让我们征服天空！'
    ],
    style: '狂放不羁',
    bonus: {
      type: 'luck',
      value: 30,
      description: '幸运值+30%'
    },
    duration: 7200
  },
  {
    id: 'forest_spirit',
    name: '森林之灵',
    icon: '🌿',
    type: 'creature',
    greeting: [
      '自然的呼唤响起，孩子，我来了。',
      '万物生长，皆由我护佑。让我帮助你。',
      '森林的低语，你听到了吗？生命与你同在。'
    ],
    style: '温柔慈祥',
    bonus: {
      type: 'material',
      value: 25,
      description: '材料掉落率+25%'
    },
    duration: 7200
  },
  {
    id: 'shadow_wisp',
    name: '暗影精灵',
    icon: '👤',
    type: 'creature',
    greeting: [
      '阴影中走出的灵体...你寻求什么？',
      '我乃虚无与存在的边界。小心，别迷失了。',
      '暗影不会伤害召唤者...但其他人就不一定了。'
    ],
    style: '神秘莫测',
    bonus: {
      type: 'gold',
      value: 35,
      description: '金币获取+35%'
    },
    duration: 7200
  },
  {
    id: 'light_fairy',
    name: '光之妖精',
    icon: '✨',
    type: 'creature',
    greeting: [
      '闪亮登场！人类，让我们一起冒险吧！',
      '光明照耀之处，必定充满希望！加油！',
      '小妖精来啦！我会一直守护你的！'
    ],
    style: '活泼可爱',
    bonus: {
      type: 'experience',
      value: 40,
      description: '经验获取+40%'
    },
    duration: 7200
  },
  {
    id: 'life_spirit',
    name: '生命之灵',
    icon: '💚',
    type: 'creature',
    greeting: [
      '生命的化身前来相助！疲惫的旅者，让我恢复你的活力！',
      '我感受到你的疲惫...来吧，让生命之灵为你充能！',
      '永不停歇的生命力流淌不息！让我与你同行！'
    ],
    style: '慈爱温和',
    bonus: {
      type: 'stamina',
      value: 20,
      description: '体力恢复速度+20%，最大体力+20'
    },
    duration: 7200
  },
  {
    id: 'rejuvenation_dragon',
    name: '复生幼龙',
    icon: '🐉',
    type: 'creature',
    greeting: [
      '重生的力量在血液中奔涌！人类，接受龙的祝福！',
      '我能感受你体内生命之火的微弱...让我点燃它！',
      '每一次重生都更加强大！让我陪你走过这段旅程！'
    ],
    style: '生机勃勃',
    bonus: {
      type: 'stamina',
      value: 35,
      description: '体力恢复速度+35%，冒险消耗-50%'
    },
    duration: 7200
  }
]

export const SummonableArchmages: SummonedCreature[] = [
  {
    id: 'merlin',
    name: '大魔法师·梅林',
    icon: '🧙',
    type: 'archmage',
    greeting: [
      '千年贤者梅林回应召唤。年轻人，让我看看你的潜力。',
      '历史的见证者降临。你的命运，将会如何书写？',
      '梅林前来相助。记住，真正的魔法源于心灵。'
    ],
    style: '睿智深邃',
    bonus: {
      type: 'experience',
      value: 100,
      description: '所有属性+50%，经验+100%'
    },
    duration: 7200
  },
  {
    id: 'morgan',
    name: '大魔法师·摩根',
    icon: '🧙‍♀️',
    type: 'archmage',
    greeting: [
      '黑暗魔女摩根降临。你，敢于驾驭黑暗吗？',
      '力量的代价，你准备好了吗？我将赐予你无上魔力。',
      '被召唤的凡人，记住：黑暗并非邪恶，只是另一种光明。'
    ],
    style: '神秘强大',
    bonus: {
      type: 'attack',
      value: 80,
      description: '攻击+80%，材料掉落率+50%'
    },
    duration: 7200
  },
  {
    id: 'paracelsus',
    name: '大炼金术师·帕拉塞尔苏斯',
    icon: '⚗️',
    type: 'archmage',
    greeting: [
      '炼金术的先驱降临！让我看看你的技艺！',
      '永生的追寻者到来。年轻人，炼金的奥秘无穷无尽。',
      '帕拉塞尔苏斯前来指导。记住：炼金即是转化，不仅是物质，更是灵魂。'
    ],
    style: '严谨博学',
    bonus: {
      type: 'material',
      value: 70,
      description: '材料掉落+70%，金币+70%，经验+70%'
    },
    duration: 7200
  },
  {
    id: 'hippocrates',
    name: '大医者·希波克拉底',
    icon: '🏥',
    type: 'archmage',
    greeting: [
      '医者之父降临！年轻人，生命是最珍贵的宝藏。',
      '我以医道守护这片大地。让我的智慧助你一臂之力！',
      '希波克拉底前来相助。健康是一切的基础，让我赐予你无尽的活力！'
    ],
    style: '仁慈博爱',
    bonus: {
      type: 'stamina',
      value: 50,
      description: '体力恢复速度+50%，最大体力+50，冒险消耗-50%'
    },
    duration: 7200
  }
]

export function summonCreature(): SummonedCreature {
  const archmageChance = 0.05
  
  if (Math.random() < archmageChance) {
    return SummonableArchmages[Math.floor(Math.random() * SummonableArchmages.length)]
  }
  
  return SummonableCreatures[Math.floor(Math.random() * SummonableCreatures.length)]
}

export function getGreeting(creature: SummonedCreature): string {
  const greetings = creature.greeting
  return greetings[Math.floor(Math.random() * greetings.length)]
}

export interface SummonStone {
  id: string
  name: string
  icon: string
  description: string
  rarity: 'rare' | 'legendary'
}

export const SummonStones: SummonStone[] = [
  {
    id: 'summon_stone_common',
    name: '召唤石',
    icon: '🔮',
    description: '蕴含魔法能量的召唤石，可召唤魔法生物',
    rarity: 'rare'
  },
  {
    id: 'summon_stone_ancient',
    name: '远古召唤石',
    icon: '💠',
    description: '上古时期流传的召唤石，召唤概率更强',
    rarity: 'legendary'
  }
]
