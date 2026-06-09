import { FormationType } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
export interface Formation {
    type: FormationType;
    name: string;
    complexity: number;
    pattern: string;
    description: string;
    colorMatch: string;
    bonusChance: number;
    levelBonus?: number;
    failChance?: number;
    specialEffect?: string;
}
export const AllFormations: Formation[] = [
    {
        type: FormationType.A,
        name: '赤焰',
        complexity: 3,
        pattern: 'hexagram_with_circle',
        description: '火焰般的六芒星，蕴含炽热之力',
        colorMatch: '红橙黄系材料加成',
        bonusChance: 50,
        levelBonus: 1
    },
    {
        type: FormationType.B,
        name: '翠风',
        complexity: 4,
        pattern: 'concentric_circles',
        description: '层层涟漪，自然的呼吸',
        colorMatch: '绿青系材料加成',
        bonusChance: 50,
        levelBonus: 1
    },
    {
        type: FormationType.C,
        name: '幽蓝',
        complexity: 5,
        pattern: 'spiral_triangles',
        description: '深邃的漩涡，连接深渊',
        colorMatch: '蓝青系材料加成',
        bonusChance: 50,
        levelBonus: 2
    },
    {
        type: FormationType.D,
        name: '紫月',
        complexity: 6,
        pattern: 'nested_squares',
        description: '神秘的封印，月光凝结',
        colorMatch: '紫蓝系材料加成',
        bonusChance: 50,
        levelBonus: 2
    },
    {
        type: FormationType.A,
        name: '虚空混沌阵',
        complexity: 8,
        pattern: 'chaos_vortex',
        description: '禁忌法阵，连接虚空与混沌',
        colorMatch: '所有系材料，但风险极高',
        bonusChance: 80,
        levelBonus: 3,
        failChance: 30,
        specialEffect: '可能召唤虚空生物'
    },
    {
        type: FormationType.B,
        name: '生命神树阵',
        complexity: 7,
        pattern: 'world_tree_rune',
        description: '世界树的投影，蕴含生命本源',
        colorMatch: '绿青系材料大幅加成',
        bonusChance: 70,
        levelBonus: 2,
        specialEffect: '可能治愈炼金副作用'
    },
    {
        type: FormationType.C,
        name: '深渊召唤阵',
        complexity: 9,
        pattern: 'abyss_gate',
        description: '通往深渊的门户，极度危险',
        colorMatch: '所有系材料，但可能失控',
        bonusChance: 100,
        levelBonus: 4,
        failChance: 40,
        specialEffect: '可能获得禁忌物品或召唤怪物'
    },
    {
        type: FormationType.D,
        name: '星辰命运阵',
        complexity: 6,
        pattern: 'constellation',
        description: '星辰排列，窥视命运',
        colorMatch: '紫黄系材料加成',
        bonusChance: 60,
        levelBonus: 2,
        specialEffect: '可能预见炼金结果'
    }
];
export function getFormationByType(type: FormationType): Formation | undefined {
    return AllFormations.find(f => f.type === type);
}
