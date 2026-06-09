import { MaterialColorType } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
export interface RecipeRequirement {
    colorType: MaterialColorType;
    minPercent: number;
    maxPercent: number;
}
export type ItemRarity = 'common' | 'rare' | 'legendary';
export type ItemGrade = 'normal' | 'excellent' | 'superior' | 'epic' | 'mythic';
export interface AlchemyRecipe {
    id: string;
    name: string;
    icon: string;
    requirements: RecipeRequirement[];
    effect: string;
    taste: string;
    legend: string;
    rarity: ItemRarity;
    rewardRange: [
        number,
        number
    ];
    tips: string;
    unlockLevel: number;
    matchingFormations: string[];
    toleranceBonus: number;
}
export const AllRecipes: AlchemyRecipe[] = [
    {
        id: 'life_potion',
        name: '生命药剂',
        icon: '🧪',
        requirements: [
            { colorType: MaterialColorType.RED, minPercent: 65, maxPercent: 75 },
            { colorType: MaterialColorType.ORANGE, minPercent: 25, maxPercent: 35 }
        ],
        effect: '恢复生命力，治愈伤势',
        taste: '辛辣中带着甘甜',
        legend: '传说由炼金术师为战场伤者所创，一滴可救命',
        rarity: 'common',
        rewardRange: [100, 200],
        tips: '红色系材料占比要高，推荐使用赤焰法阵增强生命效果',
        unlockLevel: 1,
        matchingFormations: ['赤焰法阵'],
        toleranceBonus: 2
    },
    {
        id: 'magic_stone',
        name: '魔力石',
        icon: '💎',
        requirements: [
            { colorType: MaterialColorType.YELLOW, minPercent: 65, maxPercent: 75 },
            { colorType: MaterialColorType.GREEN, minPercent: 25, maxPercent: 35 }
        ],
        effect: '储存魔力，释放法术',
        taste: '清凉如泉水',
        legend: '法师们的必备之物，蕴含无尽魔力',
        rarity: 'common',
        rewardRange: [100, 200],
        tips: '黄色系材料提供能量核心，绿色系材料赋予再生能力',
        unlockLevel: 1,
        matchingFormations: ['翠风法阵'],
        toleranceBonus: 2
    },
    {
        id: 'antidote',
        name: '解毒瓶',
        icon: '🧫',
        requirements: [
            { colorType: MaterialColorType.CYAN, minPercent: 35, maxPercent: 45 },
            { colorType: MaterialColorType.BLUE, minPercent: 35, maxPercent: 45 },
            { colorType: MaterialColorType.PURPLE, minPercent: 15, maxPercent: 25 }
        ],
        effect: '解除毒素，净化身体',
        taste: '苦涩后转为清凉',
        legend: '冒险者的护身符，关键时刻可保命',
        rarity: 'common',
        rewardRange: [100, 200],
        tips: '青色系和蓝色系平衡是关键，紫色系材料增强净化效果',
        unlockLevel: 1,
        matchingFormations: ['幽蓝法阵'],
        toleranceBonus: 1.5
    },
    {
        id: 'healing_salve',
        name: '治疗软膏',
        icon: '💊',
        requirements: [
            { colorType: MaterialColorType.ORANGE, minPercent: 60, maxPercent: 70 },
            { colorType: MaterialColorType.GREEN, minPercent: 30, maxPercent: 40 }
        ],
        effect: '快速愈合伤口，减轻疼痛',
        taste: '苦中带甜，清凉宜人',
        legend: '战场医官的秘密武器，能迅速止血疗伤',
        rarity: 'common',
        rewardRange: [120, 220],
        tips: '橙色系提供生命力，绿色系促进细胞再生',
        unlockLevel: 2,
        matchingFormations: ['翠风法阵'],
        toleranceBonus: 2
    },
    {
        id: 'energy_crystal',
        name: '能量水晶',
        icon: '💠',
        requirements: [
            { colorType: MaterialColorType.YELLOW, minPercent: 50, maxPercent: 60 },
            { colorType: MaterialColorType.RED, minPercent: 20, maxPercent: 30 },
            { colorType: MaterialColorType.ORANGE, minPercent: 20, maxPercent: 30 }
        ],
        effect: '储存大量能量，可充能魔法道具',
        taste: '微苦后转为甘甜',
        legend: '古代文明的遗产，蕴含着纯净的能量',
        rarity: 'common',
        rewardRange: [150, 250],
        tips: '黄色系为主，红橙色系提供活跃能量',
        unlockLevel: 3,
        matchingFormations: ['赤焰法阵'],
        toleranceBonus: 1.5
    },
    {
        id: 'dream_pearl',
        name: '梦珍珠',
        icon: '🔮',
        requirements: [
            { colorType: MaterialColorType.RED, minPercent: 5, maxPercent: 15 },
            { colorType: MaterialColorType.CYAN, minPercent: 45, maxPercent: 55 },
            { colorType: MaterialColorType.PURPLE, minPercent: 35, maxPercent: 45 }
        ],
        effect: '入梦观景，预知未来',
        taste: '梦幻般的甘美',
        legend: '传说中的占卜之物，可窥视命运一角',
        rarity: 'legendary',
        rewardRange: [1000, 2000],
        tips: '青色系占比最高，紫色系辅助，红色系只需微量激发',
        unlockLevel: 5,
        matchingFormations: ['紫月法阵'],
        toleranceBonus: 1
    },
    {
        id: 'love_ring',
        name: '恋戒',
        icon: '💍',
        requirements: [
            { colorType: MaterialColorType.RED, minPercent: 25, maxPercent: 35 },
            { colorType: MaterialColorType.ORANGE, minPercent: 35, maxPercent: 45 },
            { colorType: MaterialColorType.PURPLE, minPercent: 25, maxPercent: 35 }
        ],
        effect: '增进情感，缔结羁绊',
        taste: '甜蜜如初恋',
        legend: '恋人间的信物，传说可让两心永结',
        rarity: 'legendary',
        rewardRange: [1000, 2000],
        tips: '橙色系是核心，红色系和紫色系平衡情感与魔法',
        unlockLevel: 6,
        matchingFormations: ['紫月法阵'],
        toleranceBonus: 1
    },
    {
        id: 'memory_potion',
        name: '回忆药水',
        icon: '🍯',
        requirements: [
            { colorType: MaterialColorType.GREEN, minPercent: 35, maxPercent: 45 },
            { colorType: MaterialColorType.CYAN, minPercent: 25, maxPercent: 35 },
            { colorType: MaterialColorType.BLUE, minPercent: 25, maxPercent: 35 }
        ],
        effect: '唤起往事，重温记忆',
        taste: '苦中带甜，余韵悠长',
        legend: '失忆者的福音，可找回遗失的记忆碎片',
        rarity: 'legendary',
        rewardRange: [1000, 2000],
        tips: '绿色系材料主导，青蓝色系辅助提取记忆',
        unlockLevel: 7,
        matchingFormations: ['翠风法阵'],
        toleranceBonus: 1
    },
    {
        id: 'seeking_gem',
        name: '寻物宝石',
        icon: '🔮',
        requirements: [
            { colorType: MaterialColorType.BLUE, minPercent: 55, maxPercent: 65 }
        ],
        effect: '指引方向，寻找失物',
        taste: '冰凉透心',
        legend: '探险家的宝藏，再远的宝物也能感应',
        rarity: 'rare',
        rewardRange: [200, 600],
        tips: '蓝色系提供感知力，紫色或青色系增强感应范围',
        unlockLevel: 3,
        matchingFormations: ['幽蓝法阵'],
        toleranceBonus: 2.5
    },
    {
        id: 'curse_dust',
        name: '诅咒粉尘',
        icon: '☠️',
        requirements: [
            { colorType: MaterialColorType.YELLOW, minPercent: 25, maxPercent: 35 },
            { colorType: MaterialColorType.GREEN, minPercent: 35, maxPercent: 45 }
        ],
        effect: '削弱敌人，施加诅咒',
        taste: '刺鼻难闻',
        legend: '黑暗时代的遗物，慎用之物',
        rarity: 'rare',
        rewardRange: [200, 600],
        tips: '绿色系占比最高，黄色系提供能量，紫蓝色系赋予诅咒属性',
        unlockLevel: 4,
        matchingFormations: ['紫月法阵'],
        toleranceBonus: 2
    },
    {
        id: 'harvest_bottle',
        name: '丰收瓶',
        icon: '🌾',
        requirements: [
            { colorType: MaterialColorType.GREEN, minPercent: 35, maxPercent: 45 }
        ],
        effect: '催熟作物，增加产量',
        taste: '清新自然',
        legend: '农夫的福音，一瓶可保一年丰收',
        rarity: 'rare',
        rewardRange: [200, 600],
        tips: '红橙色系提供生命力，绿色系促进生长',
        unlockLevel: 3,
        matchingFormations: ['翠风法阵'],
        toleranceBonus: 2.5
    },
    {
        id: 'inspiration_bottle',
        name: '短时灵感瓶',
        icon: '💡',
        requirements: [
            { colorType: MaterialColorType.GREEN, minPercent: 45, maxPercent: 55 }
        ],
        effect: '激发灵感，启迪思维',
        taste: '清爽宜人',
        legend: '学者和艺术家的秘密武器',
        rarity: 'rare',
        rewardRange: [200, 600],
        tips: '绿色系和青蓝色系各占一半，平衡创造力与洞察力',
        unlockLevel: 4,
        matchingFormations: ['翠风法阵'],
        toleranceBonus: 2.5
    },
    {
        id: 'invisibility_potion',
        name: '隐身药水',
        icon: '👁️',
        requirements: [
            { colorType: MaterialColorType.CYAN, minPercent: 60, maxPercent: 70 },
            { colorType: MaterialColorType.BLUE, minPercent: 30, maxPercent: 40 }
        ],
        effect: '短暂隐身，躲避危险',
        taste: '清凉如风，难以捉摸',
        legend: '刺客们的至宝，一滴可让人消失于世',
        rarity: 'rare',
        rewardRange: [400, 800],
        tips: '青色系主导幻象，蓝色系增强隐匿效果',
        unlockLevel: 5,
        matchingFormations: ['幽蓝法阵'],
        toleranceBonus: 2
    },
    {
        id: 'flight_potion',
        name: '飞行药剂',
        icon: '🦅',
        requirements: [
            { colorType: MaterialColorType.YELLOW, minPercent: 40, maxPercent: 50 },
            { colorType: MaterialColorType.CYAN, minPercent: 30, maxPercent: 40 },
            { colorType: MaterialColorType.BLUE, minPercent: 20, maxPercent: 30 }
        ],
        effect: '赋予飞行能力，翱翔天际',
        taste: '轻盈如羽，令人沉醉',
        legend: '天空旅者的秘方，让人如鸟儿般自由',
        rarity: 'rare',
        rewardRange: [500, 900],
        tips: '黄色系提供上升之力，青蓝色系赋予轻盈',
        unlockLevel: 6,
        matchingFormations: ['幽蓝法阵'],
        toleranceBonus: 1.5
    },
    {
        id: 'wisdom_scroll',
        name: '智慧卷轴',
        icon: '📜',
        requirements: [
            { colorType: MaterialColorType.GREEN, minPercent: 50, maxPercent: 60 },
            { colorType: MaterialColorType.PURPLE, minPercent: 40, maxPercent: 50 }
        ],
        effect: '暂时提升智慧，洞察真相',
        taste: '苦涩后豁然开朗',
        legend: '智者所创，蕴含无穷知识',
        rarity: 'rare',
        rewardRange: [450, 850],
        tips: '绿色系启迪思维，紫色系赋予洞见',
        unlockLevel: 7,
        matchingFormations: ['紫月法阵'],
        toleranceBonus: 2
    },
    {
        id: 'guardian_talisman',
        name: '守护护符',
        icon: '🛡️',
        requirements: [
            { colorType: MaterialColorType.RED, minPercent: 30, maxPercent: 40 },
            { colorType: MaterialColorType.YELLOW, minPercent: 30, maxPercent: 40 },
            { colorType: MaterialColorType.BLUE, minPercent: 30, maxPercent: 40 }
        ],
        effect: '抵挡致命伤害，护佑生命',
        taste: '厚重温暖，令人安心',
        legend: '守护神的祝福，可挡一次致命攻击',
        rarity: 'rare',
        rewardRange: [600, 1000],
        tips: '三色平衡，红色守护生命，黄色提供能量，蓝色赋予坚韧',
        unlockLevel: 8,
        matchingFormations: ['赤焰法阵'],
        toleranceBonus: 1.5
    },
    {
        id: 'time_hourglass',
        name: '时间沙漏',
        icon: '⏳',
        requirements: [
            { colorType: MaterialColorType.ORANGE, minPercent: 25, maxPercent: 35 },
            { colorType: MaterialColorType.CYAN, minPercent: 35, maxPercent: 45 },
            { colorType: MaterialColorType.PURPLE, minPercent: 30, maxPercent: 40 }
        ],
        effect: '短暂操控时间，倒流或加速',
        taste: '虚幻飘渺，如梦似幻',
        legend: '时间之神的礼物，掌控一瞬永恒',
        rarity: 'legendary',
        rewardRange: [2000, 3000],
        tips: '橙色系代表流逝，青色系连接虚实，紫色系赋予神秘',
        unlockLevel: 9,
        matchingFormations: ['紫月法阵'],
        toleranceBonus: 1
    },
    {
        id: 'soul_contract',
        name: '灵魂契约',
        icon: '✍️',
        requirements: [
            { colorType: MaterialColorType.RED, minPercent: 40, maxPercent: 50 },
            { colorType: MaterialColorType.PURPLE, minPercent: 50, maxPercent: 60 }
        ],
        effect: '与灵体缔结契约，获得力量',
        taste: '冰冷刺骨，灵魂震颤',
        legend: '禁忌的产物，以灵魂为代价换取力量',
        rarity: 'legendary',
        rewardRange: [2500, 3500],
        tips: '红色系代表生命与血脉，紫色系连接灵魂与魔法',
        unlockLevel: 10,
        matchingFormations: ['紫月法阵'],
        toleranceBonus: 1
    },
    {
        id: 'immortal_key',
        name: '永生之钥',
        icon: '🗝️',
        requirements: [
            { colorType: MaterialColorType.RED, minPercent: 20, maxPercent: 30 },
            { colorType: MaterialColorType.YELLOW, minPercent: 20, maxPercent: 30 },
            { colorType: MaterialColorType.CYAN, minPercent: 20, maxPercent: 30 },
            { colorType: MaterialColorType.PURPLE, minPercent: 30, maxPercent: 40 }
        ],
        effect: '开启永生之门，超越生死',
        taste: '无味无感，超越凡俗',
        legend: '传说中的终极炼金术，可让人永生不灭',
        rarity: 'legendary',
        rewardRange: [5000, 8000],
        tips: '四色合一，象征生命、能量、虚幻与魔法的完美融合',
        unlockLevel: 15,
        matchingFormations: ['紫月法阵', '赤焰法阵'],
        toleranceBonus: 0.8
    },
    {
        id: 'magicless_water',
        name: '无魔水',
        icon: '💧',
        requirements: [],
        effect: '无任何魔法效果',
        taste: '平淡无味，如普通清水',
        legend: '炼金失败的产物，或许可以用来浇花',
        rarity: 'common',
        rewardRange: [10, 50],
        tips: '当配方不匹配任何已知物品时产生，可用于练习炼金技巧',
        unlockLevel: 1,
        matchingFormations: [],
        toleranceBonus: 0
    }
];
export function checkRecipe(materials: Map<MaterialColorType, number>): AlchemyRecipe | null {
    const total = Array.from(materials.values()).reduce((sum, v) => sum + v, 0);
    if (total !== 100)
        return null;
    const percents = new Map<MaterialColorType, number>();
    materials.forEach((amount, colorType) => {
        percents.set(colorType, (amount / total) * 100);
    });
    for (const recipe of AllRecipes) {
        if (recipe.id === 'magicless_water')
            continue;
        let matched = true;
        for (const req of recipe.requirements) {
            const percent = percents.get(req.colorType) || 0;
            if (percent < req.minPercent || percent > req.maxPercent) {
                matched = false;
                break;
            }
        }
        if (matched) {
            const requiredColors = new Set(recipe.requirements.map(r => r.colorType));
            let hasExtra = false;
            percents.forEach((percent, colorType) => {
                if (percent > 0 && !requiredColors.has(colorType)) {
                    hasExtra = true;
                }
            });
            if (!hasExtra) {
                return recipe;
            }
        }
    }
    return AllRecipes.find(r => r.id === 'magicless_water') || null;
}
export function calculatePrecision(recipe: AlchemyRecipe, materials: Map<MaterialColorType, number>): number {
    if (recipe.requirements.length === 0)
        return 0;
    const total = Array.from(materials.values()).reduce((sum, v) => sum + v, 0);
    let totalDeviation = 0;
    for (const req of recipe.requirements) {
        const actualPercent = ((materials.get(req.colorType) || 0) / total) * 100;
        const targetPercent = (req.minPercent + req.maxPercent) / 2;
        const deviation = Math.abs(actualPercent - targetPercent);
        totalDeviation += deviation;
    }
    const precision = Math.max(0, 100 - totalDeviation * recipe.toleranceBonus);
    return precision;
}
export function calculateGrade(recipe: AlchemyRecipe, precision: number, formationName: string): ItemGrade {
    let baseGrade = 0;
    if (recipe.rarity === 'common') {
        if (precision >= 95)
            baseGrade = 2;
        else if (precision >= 80)
            baseGrade = 1;
        else
            baseGrade = 0;
    }
    else if (recipe.rarity === 'rare') {
        if (precision >= 98)
            baseGrade = 3;
        else if (precision >= 90)
            baseGrade = 2;
        else if (precision >= 75)
            baseGrade = 1;
        else
            baseGrade = 0;
    }
    else {
        if (precision >= 99)
            baseGrade = 4;
        else if (precision >= 95)
            baseGrade = 3;
        else if (precision >= 85)
            baseGrade = 2;
        else if (precision >= 70)
            baseGrade = 1;
        else
            baseGrade = 0;
    }
    const formationMatch = recipe.matchingFormations.includes(formationName);
    if (formationMatch) {
        baseGrade = Math.min(4, baseGrade + 1);
    }
    const grades: ItemGrade[] = ['normal', 'excellent', 'superior', 'epic', 'mythic'];
    return grades[Math.min(baseGrade, 4)];
}
export function getGradeMultiplier(grade: ItemGrade): number {
    switch (grade) {
        case 'normal': return 1.0;
        case 'excellent': return 1.5;
        case 'superior': return 2.0;
        case 'epic': return 3.0;
        case 'mythic': return 5.0;
        default: return 1.0;
    }
}
export function getGradeName(grade: ItemGrade): string {
    switch (grade) {
        case 'normal': return '普通';
        case 'excellent': return '优秀';
        case 'superior': return '卓越';
        case 'epic': return '史诗';
        case 'mythic': return '神话';
        default: return '普通';
    }
}
