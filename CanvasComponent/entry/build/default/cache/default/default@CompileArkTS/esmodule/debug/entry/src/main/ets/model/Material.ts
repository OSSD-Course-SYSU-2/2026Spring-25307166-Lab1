import { MaterialColorType } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
export interface MaterialData {
    id: string;
    name: string;
    colorType: MaterialColorType;
    origin: string;
    property: string;
    effect: string;
    legend: string;
    difficulty: string;
    icon?: string;
}
export const AllMaterials: MaterialData[] = [
    {
        id: 'red_spider',
        name: '红蜘蛛',
        colorType: MaterialColorType.RED,
        origin: '黑棘蛛巢',
        property: '剧毒且鲜艳',
        effect: '似乎能淬炼出致命毒刃',
        legend: '蛛后繁衍的守护者，其毒液能腐蚀钢铁',
        difficulty: '较高'
    },
    {
        id: 'dan_zhu',
        name: '丹珠',
        colorType: MaterialColorType.RED,
        origin: '焰凤圣域',
        property: '蕴含永恒之火',
        effect: '似乎能点燃一切物质',
        legend: '传说由上古火凤的眼泪凝结而成',
        difficulty: '中等'
    },
    {
        id: 'vampire_fang',
        name: '吸血鬼乳牙',
        colorType: MaterialColorType.RED,
        origin: '永夜血堡',
        property: '蕴含血脉之力',
        effect: '似乎能唤醒沉睡的血脉',
        legend: '血族新生儿的第一颗牙，承载着家族诅咒',
        difficulty: '高'
    },
    {
        id: 'phoenix_ash',
        name: '凤凰灰烬',
        colorType: MaterialColorType.RED,
        origin: '涅槃祭坛',
        property: '永恒重生之力',
        effect: '似乎能让生命获得新生',
        legend: '凤凰涅槃后留下的灰烬，每一次重生都更加强大',
        difficulty: '极高'
    },
    {
        id: 'demon_heart',
        name: '恶魔心脏',
        colorType: MaterialColorType.RED,
        origin: '深渊第九层',
        property: '混沌与毁灭',
        effect: '似乎能召唤毁灭之力',
        legend: '深渊领主的心脏，封印着禁忌的毁灭魔法',
        difficulty: '极高'
    },
    {
        id: 'autumn_king_fruit',
        name: '秋王果实',
        colorType: MaterialColorType.ORANGE,
        origin: '丰收神殿',
        property: '凝聚季节精华',
        effect: '似乎能催熟万物生长',
        legend: '丰收之神亲手栽种的圣树，百年一结果',
        difficulty: '中等'
    },
    {
        id: 'amber_antler',
        name: '琥珀鹿角',
        colorType: MaterialColorType.ORANGE,
        origin: '时光琥珀林',
        property: '封印时光之力',
        effect: '似乎能凝固时间瞬间',
        legend: '上古灵鹿的角被封入琥珀，等待重生之日',
        difficulty: '较高'
    },
    {
        id: 'coral_branch',
        name: '珊瑚妖枝',
        colorType: MaterialColorType.ORANGE,
        origin: '深渊珊瑚国',
        property: '深海魔力结晶',
        effect: '似乎能呼唤海潮',
        legend: '珊瑚女王的枝条，每隔十年才生长一次',
        difficulty: '较高'
    },
    {
        id: 'mountain_firefly',
        name: '山萤火',
        colorType: MaterialColorType.ORANGE,
        origin: '萤火圣谷',
        property: '永不熄灭的光',
        effect: '似乎能照亮迷途',
        legend: '山神为夜行者留下的永恒指引',
        difficulty: '低'
    },
    {
        id: 'wheat_wave_bug',
        name: '麦浪虫',
        colorType: MaterialColorType.ORANGE,
        origin: '黄金麦海',
        property: '丰收的使者',
        effect: '似乎能带来好运',
        legend: '只在丰收节出现，象征风调雨顺',
        difficulty: '中等'
    },
    {
        id: 'sun_fragments',
        name: '太阳碎片',
        colorType: MaterialColorType.ORANGE,
        origin: '日落神殿',
        property: '太阳神的恩赐',
        effect: '似乎能驱散一切黑暗',
        legend: '太阳神陨落后散落的碎片，永不冷却',
        difficulty: '极高'
    },
    {
        id: 'sea_ridge_sand',
        name: '海脊砂',
        colorType: MaterialColorType.YELLOW,
        origin: '海神之脊',
        property: '蕴含海洋之力',
        effect: '似乎能治愈一切创伤',
        legend: '海神沉睡处的细砂，承载着深海的祝福',
        difficulty: '中等'
    },
    {
        id: 'griffin_feather',
        name: '狮鹫心羽',
        colorType: MaterialColorType.YELLOW,
        origin: '天空要塞',
        property: '蕴含天空之力',
        effect: '似乎能赋予飞行能力',
        legend: '狮鹫王心脏部位的羽毛，只有勇者才能获得',
        difficulty: '高'
    },
    {
        id: 'ridge_mother_rock',
        name: '岭根母岩',
        colorType: MaterialColorType.YELLOW,
        origin: '地母圣脉',
        property: '大地之本源',
        effect: '似乎能稳固一切根基',
        legend: '大地之母的眼泪凝结，蕴含山川之力',
        difficulty: '较高'
    },
    {
        id: 'star_dust',
        name: '星尘',
        colorType: MaterialColorType.YELLOW,
        origin: '陨星峡谷',
        property: '天外之力',
        effect: '似乎能实现星辰魔法',
        legend: '流星划过夜空留下的尘埃，承载着愿望',
        difficulty: '高'
    },
    {
        id: 'golden_apple_seeds',
        name: '金苹果籽',
        colorType: MaterialColorType.YELLOW,
        origin: '赫斯珀里得斯花园',
        property: '永恒青春',
        effect: '似乎能延缓衰老',
        legend: '赫拉花园中金苹果的种子，诸神的恩赐',
        difficulty: '极高'
    },
    {
        id: 'turquoise_dragon_scale',
        name: '松石龙麟',
        colorType: MaterialColorType.GREEN,
        origin: '古龙遗迹',
        property: '蕴含龙族之力',
        effect: '似乎能抵御一切火焰',
        legend: '松石绿龙的遗鳞，见证千年时光',
        difficulty: '高'
    },
    {
        id: 'cat_eye',
        name: '猫睛',
        colorType: MaterialColorType.GREEN,
        origin: '夜猫神庙',
        property: '洞察黑暗',
        effect: '似乎能看穿一切虚妄',
        legend: '夜猫之王的眼睛化成的宝石，永不闭合',
        difficulty: '较高'
    },
    {
        id: 'world_tree_leaf',
        name: '世界树嫩叶',
        colorType: MaterialColorType.GREEN,
        origin: '世界之树',
        property: '生命本源',
        effect: '似乎能治愈万物',
        legend: '世界树新生的嫩叶，蕴含生命的奥秘',
        difficulty: '极高'
    },
    {
        id: 'basilisk_scale',
        name: '蛇怪鳞片',
        colorType: MaterialColorType.GREEN,
        origin: '遗忘沼泽',
        property: '石化之力',
        effect: '似乎能让敌人石化',
        legend: '传说中蛇怪脱落的鳞片，与石化之眼同源',
        difficulty: '高'
    },
    {
        id: 'slime_heart',
        name: '史莱姆心脏',
        colorType: MaterialColorType.CYAN,
        origin: '凝胶深渊',
        property: '凝聚生命精华',
        effect: '似乎能融合一切物质',
        legend: '史莱姆一族的起源，所有凝胶生物的本源',
        difficulty: '中等'
    },
    {
        id: 'swamp_core',
        name: '沼泽人核心',
        colorType: MaterialColorType.CYAN,
        origin: '腐烂沼国',
        property: '蕴含腐朽之力',
        effect: '似乎能转化生与死',
        legend: '沼泽之主的核心，守护着死亡与重生的边界',
        difficulty: '较高'
    },
    {
        id: 'dream_wave',
        name: '梦中碧波',
        colorType: MaterialColorType.CYAN,
        origin: '梦境之海',
        property: '存在于虚实之间',
        effect: '似乎能进入他人梦境',
        legend: '梦境守护者的波纹，只有入梦者才能触及',
        difficulty: '高'
    },
    {
        id: 'repentance_tear',
        name: '忏悔眼泪',
        colorType: MaterialColorType.CYAN,
        origin: '忏悔圣堂',
        property: '净化心灵',
        effect: '似乎能洗涤一切罪孽',
        legend: '忏悔女神收集的泪水，每一滴都是一次救赎',
        difficulty: '较高'
    },
    {
        id: 'ice_queen_crystal',
        name: '冰后水晶',
        colorType: MaterialColorType.CYAN,
        origin: '永恒冻土',
        property: '永恒冰封',
        effect: '似乎能冻结时空',
        legend: '冰后眼泪凝结的水晶，封印着极寒之力',
        difficulty: '极高'
    },
    {
        id: 'siren_tear',
        name: '塞壬泪',
        colorType: MaterialColorType.BLUE,
        origin: '海妖暗礁',
        property: '蕴含魅惑之力',
        effect: '似乎能迷住所有生灵',
        legend: '海妖塞壬的眼泪，能让最坚定的水手迷失',
        difficulty: '较高'
    },
    {
        id: 'sea_god_pearl',
        name: '海神珠',
        colorType: MaterialColorType.BLUE,
        origin: '波塞冬神殿',
        property: '海神的祝福',
        effect: '似乎能支配海洋',
        legend: '海神遗失的宝珠，能呼唤风暴与平静',
        difficulty: '高'
    },
    {
        id: 'triton_conch',
        name: '特里同海螺',
        colorType: MaterialColorType.BLUE,
        origin: '海神宫殿',
        property: '海洋号角',
        effect: '似乎能召唤海洋生物',
        legend: '海神之子的号角，能控制所有海洋生物',
        difficulty: '极高'
    },
    {
        id: 'void_crystal',
        name: '虚空水晶',
        colorType: MaterialColorType.BLUE,
        origin: '虚空裂隙',
        property: '空间之力',
        effect: '似乎能扭曲空间',
        legend: '虚空裂缝中凝结的水晶，蕴含空间魔法',
        difficulty: '极高'
    },
    {
        id: 'undead_dream',
        name: '亡灵梦',
        colorType: MaterialColorType.PURPLE,
        origin: '亡者回廊',
        property: '连接生死',
        effect: '似乎能与逝者对话',
        legend: '亡灵最后的执念，在黄昏时最活跃',
        difficulty: '较高'
    },
    {
        id: 'fairy_dust',
        name: '妖精粉尘',
        colorType: MaterialColorType.PURPLE,
        origin: '妖精国度',
        property: '蕴含魔法之力',
        effect: '似乎能实现小愿望',
        legend: '妖精翅膀上的粉末，每一粒都是一个祝福',
        difficulty: '中等'
    },
    {
        id: 'alice_seed',
        name: '爱丽丝花种',
        colorType: MaterialColorType.PURPLE,
        origin: '仙境花园',
        property: '蕴含仙境之力',
        effect: '似乎能开启异世界之门',
        legend: '爱丽丝遗落的花种，能长出通往仙境的藤蔓',
        difficulty: '高'
    },
    {
        id: 'shadow essence',
        name: '暗影精华',
        colorType: MaterialColorType.PURPLE,
        origin: '暗影位面',
        property: '操控阴影',
        effect: '似乎能隐匿于阴影中',
        legend: '暗影位面凝结的精华，能操控一切阴影',
        difficulty: '极高'
    },
    {
        id: 'oracle_crystal',
        name: '预言水晶',
        colorType: MaterialColorType.PURPLE,
        origin: '神谕圣殿',
        property: '预见未来',
        effect: '似乎能窥视命运',
        legend: '预言女神遗留的水晶，能窥视命运的丝线',
        difficulty: '极高'
    }
];
export function getMaterialsByColor(colorType: MaterialColorType): MaterialData[] {
    return AllMaterials.filter(m => m.colorType === colorType);
}
export function getMaterialById(id: string): MaterialData | undefined {
    return AllMaterials.find(m => m.id === id);
}
