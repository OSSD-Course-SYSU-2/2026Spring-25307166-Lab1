export interface RandomNPCDialog {
  name: string
  avatar: string
  reason: string
  need: string
  thanks: string
  personality: string
}

const NPCNames = [
  '艾莉丝', '卡尔文', '索菲亚', '马库斯', '莉娜',
  '托马斯', '安娜', '弗雷德', '莫妮卡', '丹尼尔',
  '伊莎贝拉', '尼古拉斯', '维多利亚', '亚历山大', '艾米丽'
]

const NPCAvatars = ['👨', '👩', '🧔', '👱', '👴', '👵', '🧑', '👨‍🌾', '👩‍🎤', '🧙‍♀️']

const Reasons = [
  '我的村庄遭受了瘟疫，急需治疗药剂',
  '为了即将到来的战斗，我需要强力的魔药',
  '我的爱人生病了，请帮帮我',
  '这是为了保卫家园的重要任务',
  '我在研究古老的炼金术，需要特殊的材料',
  '我的商队被劫匪袭击，急需补给',
  '为了通过法师公会的考核，我需要这个',
  '我的孩子生病了，这是我最后的希望',
  '这是为了拯救被诅咒的族人的任务',
  '我需要这个来完成师傅留下的遗愿'
]

const Needs = [
  '请为我炼制一瓶高品质的药剂',
  '我需要一份能够拯救生命的魔药',
  '请帮我制作一份特殊的炼金物品',
  '这是为了重要任务的必要之物',
  '我需要一份蕴含强大魔力的物品',
  '请为我准备一份能够改变命运的炼金品'
]

const Thanks = [
  '谢谢你，你救了我的村庄！',
  '你的帮助让我永远感激',
  '这份恩情，我铭记在心',
  '你的技艺令人敬佩，谢谢',
  '愿神明保佑你，善良的炼金师',
  '你的帮助改变了一切，感恩',
  '这是我的谢礼，请收下'
]

const Personalities = [
  '善良温和', '焦急不安', '坚定果敢', '悲伤忧郁', '充满希望',
  '神秘莫测', '热情开朗', '严肃认真', '慈祥温柔', '勇敢无畏'
]

export function generateRandomNPC(): RandomNPCDialog {
  return {
    name: NPCNames[Math.floor(Math.random() * NPCNames.length)],
    avatar: NPCAvatars[Math.floor(Math.random() * NPCAvatars.length)],
    reason: Reasons[Math.floor(Math.random() * Reasons.length)],
    need: Needs[Math.floor(Math.random() * Needs.length)],
    thanks: Thanks[Math.floor(Math.random() * Thanks.length)],
    personality: Personalities[Math.floor(Math.random() * Personalities.length)]
  }
}

export function getDifficultyTrustGain(rarity: string): number {
  switch (rarity) {
    case 'legendary': return 15
    case 'rare': return 10
    case 'common': return 5
    default: return 3
  }
}

export function shouldRefreshQuest(trust: number): boolean {
  const baseChance = 0.3
  const trustBonus = trust / 100 * 0.2
  return Math.random() < (baseChance + trustBonus)
}

export function shouldSpawnSpecialQuest(trust: number): boolean {
  if (trust < 60) return false
  const chance = (trust - 60) / 100
  return Math.random() < chance
}
