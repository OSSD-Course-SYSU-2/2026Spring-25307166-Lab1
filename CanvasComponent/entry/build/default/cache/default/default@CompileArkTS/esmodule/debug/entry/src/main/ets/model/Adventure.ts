import { MaterialColorType } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { AllMaterials } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import type { MaterialData } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
export interface AdventureLocation {
    id: string;
    name: string;
    description: string;
    mainReward: MaterialColorType[];
    cost: number;
    danger: string;
    features: string;
    events: AdventureEvent[];
    style: string;
}
export type EventType = 'merchant' | 'alchemist' | 'danger' | 'treasure' | 'monster' | 'npc' | 'special' | 'rare_material' | 'mystical_event';
export interface AdventureEvent {
    type: EventType;
    name: string;
    description: string;
    chance: number;
    checkType: 'combatPower' | 'social' | 'luck' | 'combined' | 'mysticism' | 'perception' | 'craftsmanship';
    difficulty: number;
    rewards?: EventReward;
    failures?: EventFailure;
    dialogues: EventDialogue;
}
export interface NpcFavor {
    npcId: string;
    value: number;
}
export interface MaterialLoss {
    materialId: string;
    amount: number;
}
export interface EventReward {
    materialId?: string;
    materialAmount?: number;
    gold?: number;
    itemId?: string;
    itemAmount?: number;
    recipeId?: string;
    npcFavor?: NpcFavor;
}
export interface EventFailure {
    staminaLoss: number;
    materialLoss?: MaterialLoss;
    goldLoss?: number;
}
export interface EventDialogue {
    success: string[];
    failure: string[];
    criticalSuccess: string[];
    criticalFailure: string[];
}
export interface AdventureResult {
    success: boolean;
    criticalSuccess: boolean;
    criticalFailure: boolean;
    diceRoll: number;
    userValue: number;
    message: string;
    rewards: EventReward;
    failures: EventFailure;
}
export const AdventureLocations: AdventureLocation[] = [
    {
        id: 'sky_street',
        name: '天街',
        description: '漂浮于云端的神秘街道，传说曾是神明的居所',
        mainReward: [MaterialColorType.RED],
        cost: 50,
        danger: '中等',
        features: '高空飞行，云雾缭绕',
        style: '神秘飘逸',
        events: [
            {
                type: 'alchemist',
                name: '流浪炼金师',
                description: '一位衣衫褴褛的炼金师正在云雾中寻找材料',
                chance: 15,
                checkType: 'social',
                difficulty: 40,
                rewards: {
                    materialId: 'dan_zhu',
                    materialAmount: 3,
                    recipeId: 'recipe_stamina_potion_small'
                },
                dialogues: {
                    success: [
                        '流浪炼金师感激地看着你："谢谢你帮我找到材料！这是我的一点心意。"',
                        '"年轻的炼金师，你的善良打动了我。这配方或许对你有用。"'
                    ],
                    failure: [
                        '流浪炼金师摇摇头："抱歉，我帮不了你，我自己的困难都还没解决。"',
                        '"也许下次我们再合作吧，现在我需要专心寻找材料。"'
                    ],
                    criticalSuccess: [
                        '流浪炼金师激动地握住你的手："太感谢了！你简直是我的救星！这份配方和材料都给你！"',
                        '"我从未见过如此善良的炼金师！这个配方是我毕生心血，请你收下！"'
                    ],
                    criticalFailure: [
                        '流浪炼金师愤怒地转身："你竟然想欺骗我！滚开！"',
                        '"我本想分享我的发现，但现在我改变了主意。"'
                    ]
                }
            },
            {
                type: 'npc',
                name: '云端守护者',
                description: '天街的守护者缓缓降落，审视着你',
                chance: 12,
                checkType: 'combined',
                difficulty: 55,
                rewards: {
                    npcFavor: { npcId: 'sky_guardian', value: 15 },
                    gold: 80
                },
                dialogues: {
                    success: [
                        '守护者点头："你是被认可的旅者。记住，天街的大门永远为你敞开。"',
                        '"你的品格令人敬佩。收下这份礼物，作为我们友谊的见证。"'
                    ],
                    failure: [
                        '守护者冷冷地说："你还不够资格获得我的信任。继续磨练吧。"',
                        '"天街不是任何人都能踏足的地方。下次再来证明自己。"'
                    ],
                    criticalSuccess: [
                        '守护者露出微笑："真是难得的人才！从今日起，你便是天街的贵客！这些是我的一点心意。"',
                        '"我已经很久没有遇到如此出色的旅者了。请收下这份厚礼！"'
                    ],
                    criticalFailure: [
                        '守护者皱眉："你的行为令人失望。天街不欢迎你这样的人。"',
                        '"我本想给你机会，但你让我后悔了这个决定。"'
                    ]
                }
            },
            {
                type: 'monster',
                name: '翼龙袭击',
                description: '一只凶猛的翼龙从云层中俯冲而下！',
                chance: 30,
                checkType: 'combatPower',
                difficulty: 50,
                rewards: {
                    materialId: 'griffin_feather',
                    materialAmount: 2
                },
                failures: {
                    staminaLoss: 15,
                    goldLoss: 30
                },
                dialogues: {
                    success: [
                        '你迅速闪避并反击，翼龙哀鸣着飞走，掉落了几根羽毛。',
                        '经过激烈的战斗，翼龙被你击退，留下珍贵的战利品。'
                    ],
                    failure: [
                        '翼龙的爪子划伤了你，你仓皇逃离，损失惨重。',
                        '你被翼龙逼退，不得不放弃一些财物保命。'
                    ],
                    criticalSuccess: [
                        '你完美地躲避了翼龙的攻击，并击中它的要害！翼龙掉落了大量珍贵材料！',
                        '这是一场完美的战斗！翼龙落荒而逃，留下了一地宝藏！'
                    ],
                    criticalFailure: [
                        '翼龙的一击击中要害！你受了重伤，不仅损失体力，还丢失了重要材料！',
                        '完全无法招架翼龙的攻势，你狼狈逃窜，丢盔弃甲。'
                    ]
                }
            },
            {
                type: 'treasure',
                name: '云端宝箱',
                description: '在云雾深处发现了一个古老的宝箱',
                chance: 25,
                checkType: 'luck',
                difficulty: 45,
                rewards: {
                    materialId: 'dan_zhu',
                    materialAmount: 8,
                    gold: 50
                },
                failures: {
                    staminaLoss: 5
                },
                dialogues: {
                    success: [
                        '宝箱缓缓打开，里面装满了丹珠和金币！',
                        '幸运！这个宝箱保存完好，收获颇丰。'
                    ],
                    failure: [
                        '宝箱是空的，或者已经被人捷足先登了。',
                        '打开宝箱时触发了陷阱，浪费了一些体力。'
                    ],
                    criticalSuccess: [
                        '宝箱金光闪闪！里面装满了稀有材料和大笔金币！这是一次意外的横财！',
                        '天哪！这个宝箱竟然保存了上古时代的宝藏！收获远超预期！'
                    ],
                    criticalFailure: [
                        '宝箱突然崩塌，你勉强逃脱但损失了体力。',
                        '这是陷阱！宝箱是假的，真正的危险藏在后面！'
                    ]
                }
            },
            {
                type: 'merchant',
                name: '云游商人',
                description: '一位背着大包小包的商人向你招手',
                chance: 18,
                checkType: 'social',
                difficulty: 35,
                rewards: {
                    materialId: 'dan_zhu',
                    materialAmount: 10,
                    gold: 80,
                    itemId: 'stamina_potion_small',
                    itemAmount: 2
                },
                dialogues: {
                    success: [
                        '商人热情地说："来来来，看看我的货！都是好东西，便宜卖给你！"',
                        '"这位客人，我看你面善，给你打个八折！这些材料都是上等货。"'
                    ],
                    failure: [
                        '商人摆摆手："不买就算了，别耽误我生意。"',
                        '"看你也不像有钱的样子，还是去别处看看吧。"'
                    ],
                    criticalSuccess: [
                        '商人激动地说："哎呀！你是炼金大师！这些稀有材料我给你最优惠的价格！"',
                        '"难得遇到识货的！这些珍品都是我珍藏多年的，今天都便宜给你！"'
                    ],
                    criticalFailure: [
                        '商人冷哼一声："你这人真没眼光，好货都不识。"',
                        '"浪费我时间，快走开！"'
                    ]
                }
            }
        ]
    },
    {
        id: 'dungeon',
        name: '地牢',
        description: '深埋地下的古代监狱，关押着被遗忘的生物',
        mainReward: [MaterialColorType.BLUE],
        cost: 100,
        danger: '较高',
        features: '阴暗潮湿，充满陷阱',
        style: '阴暗压抑',
        events: [
            {
                type: 'alchemist',
                name: '囚犯炼金师',
                description: '牢房深处传来微弱的声音，一位被囚禁的炼金师在呼唤',
                chance: 10,
                checkType: 'social',
                difficulty: 50,
                rewards: {
                    materialId: 'siren_tear',
                    materialAmount: 2,
                    recipeId: 'recipe_combat_elixir'
                },
                dialogues: {
                    success: [
                        '囚犯炼金师感激地说："谢谢你救了我！这是我被关押前藏起来的材料。"',
                        '"你给了我自由，这份炼金配方是我唯一能回报你的东西。"'
                    ],
                    failure: [
                        '囚犯叹气："我知道你尽力了，但这里的守卫太严密。"',
                        '"也许命运注定我要永远困在这里。"'
                    ],
                    criticalSuccess: [
                        '囚犯热泪盈眶："你是我的救命恩人！这些是我毕生收集的珍贵材料和配方，全部给你！"',
                        '"自由！我终于重获自由！这份礼物请一定收下，它比我的生命还重要！"'
                    ],
                    criticalFailure: [
                        '守卫发现了你们的交谈，囚犯被带走，你也被驱赶。',
                        '"你这个骗子！别再靠近我！"'
                    ]
                }
            },
            {
                type: 'monster',
                name: '沼泽怪物',
                description: '黑暗中，一只沼泽怪物突然扑来！',
                chance: 35,
                checkType: 'combatPower',
                difficulty: 60,
                rewards: {
                    materialId: 'swamp_core',
                    materialAmount: 1
                },
                failures: {
                    staminaLoss: 20,
                    materialLoss: { materialId: 'slime_heart', amount: 2 }
                },
                dialogues: {
                    success: [
                        '沼泽怪物被你击退，它的核心掉落在地上。',
                        '你成功躲避了沼泽怪物的攻击，并获得战利品。'
                    ],
                    failure: [
                        '沼泽怪物的攻击让你措手不及，你被迫丢下一些材料逃跑。',
                        '激烈战斗后你体力不支，只能撤退。'
                    ],
                    criticalSuccess: [
                        '一击必杀！沼泽怪物的核心完好无损地落入你手中，这可是极品！',
                        '完美的战斗！沼泽怪物甚至来不及反应就被击倒，收获丰厚！'
                    ],
                    criticalFailure: [
                        '沼泽怪物的腐蚀攻击击中了你，不仅损失大量体力，连材料都被腐蚀了！',
                        '惨败！你被沼泽怪物重伤，丢盔弃甲狼狈逃窜。'
                    ]
                }
            },
            {
                type: 'treasure',
                name: '牢房密室',
                description: '在破旧的牢房后发现了一个隐藏的密室',
                chance: 20,
                checkType: 'luck',
                difficulty: 55,
                rewards: {
                    materialId: 'sea_god_pearl',
                    materialAmount: 1,
                    gold: 100
                },
                failures: {
                    staminaLoss: 10
                },
                dialogues: {
                    success: [
                        '密室中存放着古代囚犯留下的宝藏！',
                        '你发现了海神珠，这是无价之宝！'
                    ],
                    failure: [
                        '密室已经被搜刮一空了。',
                        '只有一些无用的杂物，浪费了时间。'
                    ],
                    criticalSuccess: [
                        '这个密室竟然保存着上古时代的宝藏！海神珠和大量金币！',
                        '难以置信的发现！这个密室的主人是位大人物！'
                    ],
                    criticalFailure: [
                        '密室的机关触发，你勉强逃脱但受了伤。',
                        '这是个陷阱密室，差点被困在里面！'
                    ]
                }
            },
            {
                type: 'merchant',
                name: '地下黑市商人',
                description: '阴暗角落里，一个神秘商人向你示意',
                chance: 15,
                checkType: 'social',
                difficulty: 50,
                rewards: {
                    materialId: 'siren_tear',
                    materialAmount: 5,
                    gold: 120,
                    itemId: 'combat_elixir',
                    itemAmount: 1
                },
                dialogues: {
                    success: [
                        '商人压低声音："嘘...这里的东西不便宜，但都是真货。"',
                        '"地下世界的宝贝，外面可买不到。怎么样，要看看吗？"'
                    ],
                    failure: [
                        '商人警惕地看着你："你看起来不像道上的人。"',
                        '"抱歉，我不做陌生人生意。"'
                    ],
                    criticalSuccess: [
                        '商人眼睛一亮："哦？你是懂行的！这些稀有货都是极品，给你友情价！"',
                        '"难得遇到识货的，这些宝贝都便宜卖给你！"'
                    ],
                    criticalFailure: [
                        '商人突然大喊："守卫！有入侵者！"',
                        '"你这种人，不配看我的货！滚！"'
                    ]
                }
            }
        ]
    },
    {
        id: 'cliff',
        name: '悬崖',
        description: '云雾缭绕的绝壁，只有勇者敢攀登',
        mainReward: [MaterialColorType.GREEN],
        cost: 150,
        danger: '高',
        features: '陡峭险峻，风声呼啸',
        style: '险峻壮美',
        events: [
            {
                type: 'npc',
                name: '山中隐者',
                description: '悬崖上的小屋住着一位隐居的智者',
                chance: 15,
                checkType: 'social',
                difficulty: 45,
                rewards: {
                    npcFavor: { npcId: 'mountain_hermit', value: 20 },
                    recipeId: 'recipe_luck_amulet'
                },
                dialogues: {
                    success: [
                        '隐者微笑："难得有年轻人能爬上这里。这份智慧与你分享。"',
                        '"山风告诉我你会来。这是你应得的礼物。"'
                    ],
                    failure: [
                        '隐者摇头："你还需要更多历练。下山吧，再来时你会明白。"',
                        '"缘分未到，下次再见吧。"'
                    ],
                    criticalSuccess: [
                        '隐者激动地说："你就是我在等待的人！这份配方代代相传，现在属于你了！"',
                        '"山中岁月漫长，难得遇到知己。这些珍藏的配方都给你！"'
                    ],
                    criticalFailure: [
                        '隐者冷淡地说："打扰我修行的人，没有好下场。"',
                        '"你的无礼让我失望，请离开。"'
                    ]
                }
            },
            {
                type: 'monster',
                name: '岩崩危机',
                description: '悬崖突然发生岩崩，巨石滚落！',
                chance: 35,
                checkType: 'luck',
                difficulty: 65,
                rewards: {
                    materialId: 'turquoise_dragon_scale',
                    materialAmount: 1
                },
                failures: {
                    staminaLoss: 25,
                    goldLoss: 50
                },
                dialogues: {
                    success: [
                        '你敏捷地躲过了岩崩，还发现了一片龙麟！',
                        '危机中见生机，岩崩暴露了隐藏的宝藏。'
                    ],
                    failure: [
                        '被滚石擦伤，你不得不丢弃一些财物保命。',
                        '岩崩中你受了伤，狼狈撤退。'
                    ],
                    criticalSuccess: [
                        '你不仅完美躲过岩崩，还发现了一个龙族遗迹！收获远超预期！',
                        '这次岩崩竟然为你暴露了隐藏多年的宝藏！运气真好！'
                    ],
                    criticalFailure: [
                        '岩崩将你困在死角，好不容易才脱困，损失惨重！',
                        '巨石砸中了你，不仅损失体力，连背包都被砸坏了！'
                    ]
                }
            },
            {
                type: 'treasure',
                name: '岩洞秘宝',
                description: '悬崖峭壁上有一个隐蔽的岩洞',
                chance: 25,
                checkType: 'luck',
                difficulty: 60,
                rewards: {
                    materialId: 'cat_eye',
                    materialAmount: 3,
                    gold: 80
                },
                failures: {
                    staminaLoss: 15
                },
                dialogues: {
                    success: [
                        '岩洞中藏着猫睛石，闪烁着神秘的光芒。',
                        '幸运！这个岩洞是古代修炼者的藏宝地。'
                    ],
                    failure: [
                        '岩洞空空如也，只有蝙蝠飞舞。',
                        '爬上来才发现什么都没有，白费力气。'
                    ],
                    criticalSuccess: [
                        '岩洞深处竟然是古代妖精的宝库！大量猫睛和金币！',
                        '这是悬崖守护者的收藏！今天运气太好了！'
                    ],
                    criticalFailure: [
                        '岩洞的入口突然坍塌，你险些被困住！',
                        '这是个废弃的陷阱岩洞，浪费了大量体力。'
                    ]
                }
            },
            {
                type: 'merchant',
                name: '悬崖行者',
                description: '一位能在悬崖间自如穿梭的神秘商人',
                chance: 12,
                checkType: 'social',
                difficulty: 45,
                rewards: {
                    materialId: 'turquoise_dragon_scale',
                    materialAmount: 2,
                    gold: 100,
                    itemId: 'luck_amulet',
                    itemAmount: 1
                },
                dialogues: {
                    success: [
                        '行者微笑道："能在悬崖上遇到同行者，真是缘分。需要补给吗？"',
                        '"悬崖上的风景独好，但危险也多。我这里有些保命的好东西。"'
                    ],
                    failure: [
                        '行者摇头："你还不适合在悬崖上行走，太危险了。"',
                        '"下次准备好了再来吧。"'
                    ],
                    criticalSuccess: [
                        '行者惊喜地说："你也是悬崖的征服者！这些珍品给你，算是我的一点敬意！"',
                        '"难得遇到同好！这些稀有材料都是我在悬崖上收集多年的！"'
                    ],
                    criticalFailure: [
                        '行者冷淡地说："你的态度让我不悦。"',
                        '"我不和不懂尊重的人做生意。"'
                    ]
                }
            },
            {
                type: 'danger',
                name: '山崩危机',
                description: '悬崖突然开始震动，山崩即将来临！',
                chance: 20,
                checkType: 'luck',
                difficulty: 70,
                rewards: {
                    materialId: 'ridge_mother_rock',
                    materialAmount: 3
                },
                failures: {
                    staminaLoss: 25,
                    goldLoss: 60
                },
                dialogues: {
                    success: [
                        '你敏捷地躲避了滚石，还发现了一块岭根母岩！',
                        '山崩暴露了隐藏的宝藏，真是因祸得福！'
                    ],
                    failure: [
                        '被滚石击中，你损失了不少财物。',
                        '山崩中你狼狈逃窜，损失惨重。'
                    ],
                    criticalSuccess: [
                        '你完美地预判了山崩的轨迹，不仅毫发无伤，还收获了大量稀有材料！',
                        '这次山崩为你暴露了悬崖深处的宝藏！'
                    ],
                    criticalFailure: [
                        '山崩将你困在死角，好不容易才脱困，损失极重！',
                        '巨石砸中了你，不仅损失体力，连背包都被砸坏了！'
                    ]
                }
            }
        ]
    },
    {
        id: 'dragon_lair',
        name: '龙穴',
        description: '远古巨龙的巢穴，珍宝遍地但也危机四伏',
        mainReward: [MaterialColorType.PURPLE],
        cost: 300,
        danger: '极高',
        features: '龙焰残留，宝光闪烁',
        style: '威严恐怖',
        events: [
            {
                type: 'special',
                name: '龙语者',
                description: '一位能够与龙沟通的神秘人物出现在龙穴深处',
                chance: 10,
                checkType: 'combined',
                difficulty: 75,
                rewards: {
                    recipeId: 'recipe_ancient_blessing',
                    materialId: 'alice_seed',
                    materialAmount: 1,
                    npcFavor: { npcId: 'dragon_speaker', value: 25 }
                },
                dialogues: {
                    success: [
                        '龙语者点头："你通过了龙之试炼。这份远古配方属于你了。"',
                        '"能够活着来到这里，你有资格获得这份传承。"'
                    ],
                    failure: [
                        '龙语者摇头："龙穴的威压你承受不住。回去吧。"',
                        '"你还不够强大，下次再来挑战吧。"'
                    ],
                    criticalSuccess: [
                        '龙语者震惊："你竟然...完美地通过了所有试炼！这份配方和材料都给你，你是龙选之人！"',
                        '"百年未有之奇才！这些宝物都是你的了！"'
                    ],
                    criticalFailure: [
                        '龙语者冷漠地说："愚蠢的凡人，龙穴不是你能踏足的地方。"',
                        '"你的鲁莽唤醒了沉睡的龙魂，快逃吧！"'
                    ]
                }
            },
            {
                type: 'monster',
                name: '幼龙守护者',
                description: '一只幼龙发现了你，发出愤怒的咆哮',
                chance: 40,
                checkType: 'combatPower',
                difficulty: 80,
                rewards: {
                    materialId: 'undead_dream',
                    materialAmount: 2,
                    gold: 200
                },
                failures: {
                    staminaLoss: 30,
                    materialLoss: { materialId: 'fairy_dust', amount: 3 }
                },
                dialogues: {
                    success: [
                        '经过惊心动魄的战斗，你击退了幼龙，获得了龙穴中的宝藏。',
                        '幼龙不敌你，退回深处，留下了一地战利品。'
                    ],
                    failure: [
                        '幼龙的龙焰几乎将你吞噬，你丢下一切仓皇逃窜。',
                        '完全不是幼龙的对手，你损失惨重地撤退。'
                    ],
                    criticalSuccess: [
                        '你完美地击败了幼龙！它掉落了大量珍宝，包括稀有材料！',
                        '这一战将被传颂！幼龙落败，龙穴宝藏任你取用！'
                    ],
                    criticalFailure: [
                        '幼龙的愤怒超乎想象，你被龙焰重伤，不仅损失体力，连材料都被烧毁！',
                        '惨烈的失败！你险些丧命龙焰之下，狼狈逃离。'
                    ]
                }
            },
            {
                type: 'treasure',
                name: '龙宝库',
                description: '在龙穴深处发现了堆积如山的宝藏',
                chance: 30,
                checkType: 'luck',
                difficulty: 70,
                rewards: {
                    materialId: 'fairy_dust',
                    materialAmount: 5,
                    gold: 300
                },
                failures: {
                    staminaLoss: 20,
                    goldLoss: 100
                },
                dialogues: {
                    success: [
                        '龙宝库金光闪闪，你装满了能带走的宝藏！',
                        '幸运！巨龙似乎不在，你尽情收集宝物。'
                    ],
                    failure: [
                        '宝库有机关保护，你被击退并损失了一些财物。',
                        '刚拿了几件宝物，巨龙就回来了，你仓皇逃跑。'
                    ],
                    criticalSuccess: [
                        '这个宝库是巨龙最珍贵的收藏！你找到了极品材料和大量金币！',
                        '天降横财！这些宝藏足够你用很久了！'
                    ],
                    criticalFailure: [
                        '你触发了宝库的最强防护，险些丧命！',
                        '巨龙的诅咒！不仅没拿到宝物，还损失惨重！'
                    ]
                }
            },
            {
                type: 'merchant',
                name: '龙穴商人',
                description: '一个胆大包天的商人在龙穴边缘摆摊',
                chance: 10,
                checkType: 'social',
                difficulty: 60,
                rewards: {
                    materialId: 'undead_dream',
                    materialAmount: 3,
                    gold: 200,
                    itemId: 'berserker_elixir',
                    itemAmount: 1
                },
                dialogues: {
                    success: [
                        '商人咧嘴一笑："敢来龙穴的都是勇士！我这有好东西，敢买吗？"',
                        '"龙穴的宝贝，外面可买不到。来，看看？"'
                    ],
                    failure: [
                        '商人摇头："你看起来不够胆大，还是算了吧。"',
                        '"龙穴不是胆小鬼该来的地方。"'
                    ],
                    criticalSuccess: [
                        '商人竖起大拇指："好胆色！这些极品都给你，算我交个朋友！"',
                        '"难得遇到这么有胆量的！这些宝贝都是我冒死收集的！"'
                    ],
                    criticalFailure: [
                        '商人冷笑："你这种人，不配在龙穴做生意。"',
                        '"快滚，别耽误我发财！"'
                    ]
                }
            },
            {
                type: 'danger',
                name: '龙息陷阱',
                description: '你踩到了龙息残留的陷阱，火焰喷涌而出！',
                chance: 25,
                checkType: 'luck',
                difficulty: 75,
                rewards: {
                    materialId: 'phoenix_ash',
                    materialAmount: 2
                },
                failures: {
                    staminaLoss: 30,
                    materialLoss: { materialId: 'fairy_dust', amount: 3 }
                },
                dialogues: {
                    success: [
                        '你迅速躲开龙息，还发现了一些凤凰灰烬！',
                        '龙息陷阱反而暴露了隐藏的宝藏！'
                    ],
                    failure: [
                        '龙息烧伤了你，你损失了一些材料。',
                        '火焰吞噬了你的一部分财物！'
                    ],
                    criticalSuccess: [
                        '你完美地利用龙息陷阱，不仅毫发无伤，还获得了大量凤凰灰烬！',
                        '龙息的残留魔力为你所用，收获丰厚！'
                    ],
                    criticalFailure: [
                        '龙息陷阱的威力超乎想象，你被严重烧伤！',
                        '火焰不仅烧伤了你的身体，还烧毁了你的材料！'
                    ]
                }
            }
        ]
    }
];
export function getAdventuresByColor(colorType: MaterialColorType): AdventureLocation[] {
    return AdventureLocations.filter(loc => loc.mainReward.includes(colorType));
}
export function getRandomEvent(location: AdventureLocation): AdventureEvent | null {
    const roll = Math.random() * 100;
    let cumulative = 0;
    for (const event of location.events) {
        cumulative += event.chance;
        if (roll < cumulative) {
            return event;
        }
    }
    return null;
}
export function rollDice(): number {
    return Math.floor(Math.random() * 100) + 1;
}
export function getRandomDialogue(dialogues: string[]): string {
    return dialogues[Math.floor(Math.random() * dialogues.length)];
}
export function getRandomMaterialByColor(colorType: MaterialColorType): MaterialData {
    const materials = AllMaterials.filter(m => m.colorType === colorType);
    return materials[Math.floor(Math.random() * materials.length)];
}
