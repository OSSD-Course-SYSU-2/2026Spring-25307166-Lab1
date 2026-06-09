export interface NPCStory {
    level: number;
    title: string;
    content: string;
    letter?: string;
    specialRecipe?: string;
}
export interface FixedNPC {
    id: string;
    name: string;
    description: string;
    personality: string;
    taskType: string;
    symbol: string;
    avatar: string;
    stories: NPCStory[];
    baseReward: number;
}
export const FixedNPCs: FixedNPC[] = [
    {
        id: 'opaque',
        name: '奥帕克',
        description: '神秘的旅行商人，总是戴着面具',
        personality: '谨慎、神秘',
        taskType: '要求稀有物品，奖励丰厚',
        symbol: '紫色的斗篷',
        avatar: '🎭',
        stories: [
            {
                level: 1,
                title: '初次相遇',
                content: '奥帕克用空洞的眼神注视着你，似乎在打量你的价值。他的面具下隐藏着什么？'
            },
            {
                level: 2,
                title: '商人的秘密',
                content: '"你很特别，"奥帕克低声说道，"我在寻找一个人...或许就是你。"他似乎想起了什么往事。',
                letter: '致年轻的炼金师：\n我看到了你的潜力。这是我的一个小礼物——影之契约的配方。当你足够强大时，它会派上用场。\n——奥帕克',
                specialRecipe: 'shadow_contract'
            },
            {
                level: 3,
                title: '面具之下',
                content: '在月光下，奥帕克第一次摘下面具。那是一张布满伤痕的脸，每一道伤疤都是一个故事。'
            },
            {
                level: 4,
                title: '真相',
                content: '"曾经，我也是一名炼金术师，"奥帕克叹息道，"直到那次失败的实验..."他的眼神充满了悔恨。',
                letter: '我的朋友：\n你值得知道真相。这是我毕生研究的成果——面具之心的配方。它能保护重要之人，也能隐藏真相。\n愿你不要重蹈我的覆辙。\n——奥帕克',
                specialRecipe: 'mask_heart'
            },
            {
                level: 5,
                title: '永恒的羁绊',
                content: '奥帕克将一个古老的护身符交给你："这是我毕生的收藏。现在，它属于你了。"你们成为了真正的朋友。',
                letter: '我挚爱的朋友：\n这是我们羁绊的证明——永夜之誓的配方。这是我最后的秘密，也是最珍贵的。\n愿我们的友谊永恒。\n——奥帕克',
                specialRecipe: 'eternal_night_oath'
            }
        ],
        baseReward: 500
    },
    {
        id: 'talia',
        name: '塔莉亚',
        description: '年轻的女炼金师，充满好奇心',
        personality: '热情、好学',
        taskType: '要求实验性物品，奖励中等',
        symbol: '红色的炼金术师徽章',
        avatar: '👩‍🔬',
        stories: [
            {
                level: 1,
                title: '好奇的目光',
                content: '塔莉亚用闪亮的眼睛看着你："你也是炼金术师吗？我们可以交流心得吗？"'
            },
            {
                level: 2,
                title: '共同的梦想',
                content: '"我的梦想是创造能拯救生命的药剂，"塔莉亚眼中燃烧着热情，"你能帮助我吗？"',
                letter: '亲爱的朋友：\n我太高兴了！这是希望之露的配方——我的第一个发明。虽然还不完美，但它代表了希望。\n一起加油吧！\n——塔莉亚',
                specialRecipe: 'hope_dew'
            },
            {
                level: 3,
                title: '实验失败',
                content: '一次失败的实验后，塔莉亚沮丧地坐在角落。你的鼓励让她重新振作。'
            },
            {
                level: 4,
                title: '突破',
                content: '"成功了！"塔莉亚激动地拥抱你，"这是我第一次成功！谢谢你一直以来的支持！"',
                letter: '最好的朋友：\n我终于做到了！这是奇迹种子的配方——能创造生命的奇迹。这一切都要感谢你。\n你是我最重要的朋友！\n——塔莉亚',
                specialRecipe: 'miracle_seed'
            },
            {
                level: 5,
                title: '传承',
                content: '塔莉亚将她的实验笔记交给你："这是我全部的心血。希望你能继续我的研究。"',
                letter: '我亲爱的导师：\n这是我毕生的心血——生命之泉的配方。虽然我即将离开，但我的梦想会通过你延续。\n谢谢你教会我一切。\n——塔莉亚',
                specialRecipe: 'fountain_of_life'
            }
        ],
        baseReward: 300
    },
    {
        id: 'paparacha',
        name: '帕帕拉查',
        description: '年长的炼金大师，严厉但公正',
        personality: '严厉、公正',
        taskType: '要求高品质物品，奖励极高',
        symbol: '金色的炼金杖',
        avatar: '🧙‍♂️',
        stories: [
            {
                level: 1,
                title: '严厉的目光',
                content: '帕帕拉查审视着你的作品，眉头紧锁："这就是你的水平？还需努力。"'
            },
            {
                level: 2,
                title: '认可',
                content: '"还不错，"帕帕拉查第一次露出一丝笑意，"你比我当年的徒弟强。"',
                letter: '年轻的学徒：\n你的进步让我满意。这是大师之印的配方——我年轻时的杰作。继续努力。\n——帕帕拉查',
                specialRecipe: 'master_seal'
            },
            {
                level: 3,
                title: '教诲',
                content: '帕帕拉查开始传授你一些炼金秘技："记住，炼金不仅是技术，更是艺术。"'
            },
            {
                level: 4,
                title: '信任',
                content: '"这是我的私人实验室钥匙，"帕帕拉查郑重地交给你，"你可以随时使用。"',
                letter: '我的继承人：\n你已准备好。这是智慧之冠的配方——凝聚了我一生的智慧。用它来造福世人。\n——帕帕拉查',
                specialRecipe: 'crown_of_wisdom'
            },
            {
                level: 5,
                title: '传承',
                content: '"我已经老了，"帕帕拉查叹息道，"炼金术的未来，就交给你们了。"',
                letter: '我亲爱的孩子：\n这是我最后的礼物——永恒真理的配方。这是炼金术的终极秘密。\n传承下去，让世界更美好。\n——帕帕拉查',
                specialRecipe: 'eternal_truth'
            }
        ],
        baseReward: 800
    }
];
export interface NPCSpecialRecipe {
    id: string;
    name: string;
    icon: string;
    description: string;
    legend: string;
    rarity: 'legendary';
    value: [
        number,
        number
    ];
    npcId: string;
}
export const NPCSpecialRecipes: NPCSpecialRecipe[] = [
    {
        id: 'shadow_contract',
        name: '影之契约',
        icon: '📜',
        description: '与影之精灵缔结契约，获得隐匿之力',
        legend: '奥帕克的秘密配方，能让人融入阴影，如鬼魅般行动',
        rarity: 'legendary',
        value: [3000, 5000],
        npcId: 'opaque'
    },
    {
        id: 'mask_heart',
        name: '面具之心',
        icon: '❤️',
        description: '保护挚爱之人的护心符，隐藏真实情感',
        legend: '奥帕克为保护重要之人所创，能抵御心灵攻击',
        rarity: 'legendary',
        value: [4000, 6000],
        npcId: 'opaque'
    },
    {
        id: 'eternal_night_oath',
        name: '永夜之誓',
        icon: '🌙',
        description: '友谊的永恒誓言，跨越时空的羁绊',
        legend: '奥帕克最后的秘密，象征永恒的友谊与信任',
        rarity: 'legendary',
        value: [8000, 12000],
        npcId: 'opaque'
    },
    {
        id: 'hope_dew',
        name: '希望之露',
        icon: '💧',
        description: '塔莉亚的第一个发明，点燃希望的火种',
        legend: '塔莉亚年轻时的梦想结晶，能在绝望中带来希望',
        rarity: 'legendary',
        value: [2000, 3500],
        npcId: 'talia'
    },
    {
        id: 'miracle_seed',
        name: '奇迹种子',
        icon: '🌱',
        description: '能创造生命奇迹的神奇种子',
        legend: '塔莉亚的突破性发明，蕴含生命起源的秘密',
        rarity: 'legendary',
        value: [5000, 8000],
        npcId: 'talia'
    },
    {
        id: 'fountain_of_life',
        name: '生命之泉',
        icon: '⛲',
        description: '塔莉亚毕生研究的成果，生命的终极奥义',
        legend: '塔莉亚最后的梦想，能创造真正的生命奇迹',
        rarity: 'legendary',
        value: [10000, 15000],
        npcId: 'talia'
    },
    {
        id: 'master_seal',
        name: '大师之印',
        icon: '🔷',
        description: '帕帕拉查年轻时的杰作，象征炼金大师',
        legend: '帕帕拉查的成名之作，蕴含大师级炼金术',
        rarity: 'legendary',
        value: [3500, 5500],
        npcId: 'paparacha'
    },
    {
        id: 'crown_of_wisdom',
        name: '智慧之冠',
        icon: '👑',
        description: '凝聚一生智慧的神秘冠冕',
        legend: '帕帕拉查毕生智慧的结晶，能洞察万物真理',
        rarity: 'legendary',
        value: [7000, 10000],
        npcId: 'paparacha'
    },
    {
        id: 'eternal_truth',
        name: '永恒真理',
        icon: '✨',
        description: '炼金术的终极秘密，真理的化身',
        legend: '帕帕拉查最后的传承，蕴含炼金术的最高境界',
        rarity: 'legendary',
        value: [15000, 25000],
        npcId: 'paparacha'
    }
];
export interface NPCRelationship {
    npcId: string;
    trust: number;
    completedTasks: number;
    currentTask: NPCQuest | null;
}
export interface NPCQuest {
    id: string;
    npcId: string;
    requiredItem: string;
    requiredRarity: string;
    timeLimit: number;
    reward: number;
    description: string;
}
export function getNPCById(id: string): FixedNPC | undefined {
    return FixedNPCs.find(npc => npc.id === id);
}
export function getStoryByTrust(npc: FixedNPC, trust: number): NPCStory | null {
    const level = Math.floor(trust / 20) + 1;
    return npc.stories.find(s => s.level === level) || null;
}
export function calculateReward(npc: FixedNPC, baseReward: number, trust: number): number {
    const trustBonus = 1 + (trust / 100) * 0.5;
    return Math.floor(baseReward * trustBonus);
}
