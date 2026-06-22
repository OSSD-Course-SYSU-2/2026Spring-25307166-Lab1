export enum MaterialColorType {
  RED = '红色系',
  ORANGE = '橙色系',
  YELLOW = '黄色系',
  GREEN = '绿色系',
  CYAN = '青色系',
  BLUE = '蓝色系',
  PURPLE = '紫色系'
}

export enum FormationType {
  A = '赤焰法阵',
  B = '翠风法阵',
  C = '幽蓝法阵',
  D = '紫月法阵'
}

export enum GamePage {
  INTRO = 'intro',
  DRAWING = 'drawing',
  NAME_INPUT = 'name_input',
  IDENTITY_CONFIRM = 'identity_confirm',
  GAME_STORY = 'game_story',
  MAIN = 'main',
  COMMISSION = 'commission',
  ALCHEMY = 'alchemy',
  ALCHEMY_MIX = 'alchemy_mix',
  FORMATION_WHEEL = 'formation_wheel',
  COLLECTION = 'collection',
  USER = 'user',
  ADVENTURE = 'adventure',
  NPC = 'npc'
}

export interface ColorRGB {
  r: number
  g: number
  b: number
}

export const MaterialColors: Record<MaterialColorType, ColorRGB> = {
  [MaterialColorType.RED]: { r: 255, g: 50, b: 50 },
  [MaterialColorType.ORANGE]: { r: 255, g: 165, b: 0 },
  [MaterialColorType.YELLOW]: { r: 255, g: 255, b: 50 },
  [MaterialColorType.GREEN]: { r: 50, g: 200, b: 50 },
  [MaterialColorType.CYAN]: { r: 50, g: 200, b: 200 },
  [MaterialColorType.BLUE]: { r: 50, b: 100, g: 200 },
  [MaterialColorType.PURPLE]: { r: 150, g: 50, b: 200 }
}

export const MaterialEffectDescription: Record<MaterialColorType, string> = {
  [MaterialColorType.RED]: '温暖火焰效果',
  [MaterialColorType.ORANGE]: '金色流光效果',
  [MaterialColorType.YELLOW]: '明亮光芒效果',
  [MaterialColorType.GREEN]: '自然生命效果',
  [MaterialColorType.CYAN]: '神秘幻境效果',
  [MaterialColorType.BLUE]: '深邃海洋效果',
  [MaterialColorType.PURPLE]: '魔法漩涡效果'
}

export interface UserAttributes {
  combatPower: number
  social: number
  luck: number
  mysticism: number
  perception: number
  craftsmanship: number
}
