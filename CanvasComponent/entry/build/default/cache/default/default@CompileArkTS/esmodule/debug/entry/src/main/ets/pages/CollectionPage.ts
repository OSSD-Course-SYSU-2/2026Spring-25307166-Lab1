if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CollectionPage_Params {
    currentPage?: GamePage;
    selectedMaterial?: MaterialData | null;
    selectedItem?: ItemDisplay | null;
    showDetail?: boolean;
    currentTab?: number;
    selectedNPCStory?: NPCStory | null;
    selectedSpecialRecipe?: NPCSpecialRecipe | null;
    gameManager?: GameManager;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
import { AllMaterials } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import type { MaterialData } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import { MaterialColorType, MaterialColors } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { MaterialPatternDrawer } from "@bundle:com.example.canvascomponent/entry/ets/common/utils/MaterialPatternDrawer";
import { FixedNPCs, NPCSpecialRecipes } from "@bundle:com.example.canvascomponent/entry/ets/model/NPC";
import type { FixedNPC, NPCStory, NPCSpecialRecipe } from "@bundle:com.example.canvascomponent/entry/ets/model/NPC";
interface ItemDisplay {
    id: string;
    name: string;
    icon: string;
    desc: string;
    rarity: string;
    effect?: string;
    usage?: string;
    source?: string;
    tip?: string;
    story?: string;
}
export class CollectionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__selectedMaterial = new ObservedPropertyObjectPU(null, this, "selectedMaterial");
        this.__selectedItem = new ObservedPropertyObjectPU(null, this, "selectedItem");
        this.__showDetail = new ObservedPropertySimplePU(false, this, "showDetail");
        this.__currentTab = new ObservedPropertySimplePU(0, this, "currentTab");
        this.__selectedNPCStory = new ObservedPropertyObjectPU(null, this, "selectedNPCStory");
        this.__selectedSpecialRecipe = new ObservedPropertyObjectPU(null, this, "selectedSpecialRecipe");
        this.gameManager = GameManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CollectionPage_Params) {
        if (params.selectedMaterial !== undefined) {
            this.selectedMaterial = params.selectedMaterial;
        }
        if (params.selectedItem !== undefined) {
            this.selectedItem = params.selectedItem;
        }
        if (params.showDetail !== undefined) {
            this.showDetail = params.showDetail;
        }
        if (params.currentTab !== undefined) {
            this.currentTab = params.currentTab;
        }
        if (params.selectedNPCStory !== undefined) {
            this.selectedNPCStory = params.selectedNPCStory;
        }
        if (params.selectedSpecialRecipe !== undefined) {
            this.selectedSpecialRecipe = params.selectedSpecialRecipe;
        }
        if (params.gameManager !== undefined) {
            this.gameManager = params.gameManager;
        }
    }
    updateStateVars(params: CollectionPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedMaterial.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedItem.purgeDependencyOnElmtId(rmElmtId);
        this.__showDetail.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTab.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedNPCStory.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedSpecialRecipe.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__selectedMaterial.aboutToBeDeleted();
        this.__selectedItem.aboutToBeDeleted();
        this.__showDetail.aboutToBeDeleted();
        this.__currentTab.aboutToBeDeleted();
        this.__selectedNPCStory.aboutToBeDeleted();
        this.__selectedSpecialRecipe.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentPage: SynchedPropertySimpleTwoWayPU<GamePage>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: GamePage) {
        this.__currentPage.set(newValue);
    }
    private __selectedMaterial: ObservedPropertyObjectPU<MaterialData | null>;
    get selectedMaterial() {
        return this.__selectedMaterial.get();
    }
    set selectedMaterial(newValue: MaterialData | null) {
        this.__selectedMaterial.set(newValue);
    }
    private __selectedItem: ObservedPropertyObjectPU<ItemDisplay | null>;
    get selectedItem() {
        return this.__selectedItem.get();
    }
    set selectedItem(newValue: ItemDisplay | null) {
        this.__selectedItem.set(newValue);
    }
    private __showDetail: ObservedPropertySimplePU<boolean>;
    get showDetail() {
        return this.__showDetail.get();
    }
    set showDetail(newValue: boolean) {
        this.__showDetail.set(newValue);
    }
    private __currentTab: ObservedPropertySimplePU<number>;
    get currentTab() {
        return this.__currentTab.get();
    }
    set currentTab(newValue: number) {
        this.__currentTab.set(newValue);
    }
    private __selectedNPCStory: ObservedPropertyObjectPU<NPCStory | null>;
    get selectedNPCStory() {
        return this.__selectedNPCStory.get();
    }
    set selectedNPCStory(newValue: NPCStory | null) {
        this.__selectedNPCStory.set(newValue);
    }
    private __selectedSpecialRecipe: ObservedPropertyObjectPU<NPCSpecialRecipe | null>;
    get selectedSpecialRecipe() {
        return this.__selectedSpecialRecipe.get();
    }
    set selectedSpecialRecipe(newValue: NPCSpecialRecipe | null) {
        this.__selectedSpecialRecipe.set(newValue);
    }
    private gameManager: GameManager;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#1a1a1a');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.padding(15);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.onClick(() => {
                this.currentPage = GamePage.MAIN;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('炼金图鉴');
            Text.fontSize(24);
            Text.fontColor(Color.White);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(60);
        }, Column);
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('材料');
            Button.backgroundColor(this.currentTab === 0 ? '#4a90e2' : '#666666');
            Button.onClick(() => {
                this.currentTab = 0;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('物品');
            Button.backgroundColor(this.currentTab === 1 ? '#4a90e2' : '#666666');
            Button.onClick(() => {
                this.currentTab = 1;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('NPC');
            Button.backgroundColor(this.currentTab === 2 ? '#4a90e2' : '#666666');
            Button.onClick(() => {
                this.currentTab = 2;
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.On);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentTab === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const colorType = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('90%');
                                Column.margin({ bottom: 20 });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(colorType);
                                Text.fontSize(16);
                                Text.fontColor(this.getColorHex(colorType));
                                Text.fontWeight(FontWeight.Bold);
                                Text.margin({ bottom: 10 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Grid.create();
                                Grid.columnsTemplate('1fr 1fr 1fr 1fr');
                                Grid.rowsGap(10);
                                Grid.columnsGap(10);
                                Grid.width('100%');
                            }, Grid);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const material = _item;
                                    {
                                        const itemCreation2 = (elmtId, isInitialRender) => {
                                            GridItem.create(() => { }, false);
                                        };
                                        const observedDeepRender = () => {
                                            this.observeComponentCreation2(itemCreation2, GridItem);
                                            this.MaterialCard.bind(this)(material);
                                            GridItem.pop();
                                        };
                                        observedDeepRender();
                                    }
                                };
                                this.forEachUpdateFunction(elmtId, this.getMaterialsByColorType(colorType), forEachItemGenFunction);
                            }, ForEach);
                            ForEach.pop();
                            Grid.pop();
                            Column.pop();
                        };
                        this.forEachUpdateFunction(elmtId, [
                            MaterialColorType.RED,
                            MaterialColorType.ORANGE,
                            MaterialColorType.YELLOW,
                            MaterialColorType.GREEN,
                            MaterialColorType.CYAN,
                            MaterialColorType.BLUE,
                            MaterialColorType.PURPLE
                        ], forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else if (this.currentTab === 1) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.ItemsList.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.NPCList.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showDetail && (this.selectedMaterial || this.selectedItem)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.MaterialDetailSheet.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedNPCStory) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.NPCStoryDialog.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedSpecialRecipe) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.SpecialRecipeDialog.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    MaterialCard(material: MaterialData, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(8);
            Column.backgroundColor('rgba(60, 60, 60, 0.9)');
            Column.borderRadius(8);
            Column.onClick(() => {
                this.selectedMaterial = material;
                this.showDetail = true;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(50);
            Stack.height(50);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Canvas.create(new CanvasRenderingContext2D(new RenderingContextSettings(true)));
            Canvas.width(50);
            Canvas.height(50);
            Canvas.onReady(() => {
                let ctx = new CanvasRenderingContext2D(new RenderingContextSettings(true));
                ctx.clearRect(0, 0, 50, 50);
                ctx.fillStyle = this.getColorHex(material.colorType);
                ctx.beginPath();
                ctx.arc(25, 25, 23, 0, Math.PI * 2);
                ctx.fill();
                MaterialPatternDrawer.drawPattern(ctx, material.id, 25, 25, 18);
            });
        }, Canvas);
        Canvas.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(material.name);
            Text.fontSize(11);
            Text.fontColor(Color.White);
            Text.maxLines(1);
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`x${this.gameManager.getMaterialCount(material.id)}`);
            Text.fontSize(10);
            Text.fontColor('#FFD700');
        }, Text);
        Text.pop();
        Column.pop();
    }
    ItemsList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('炼金物品');
            Text.fontSize(18);
            Text.fontColor('#FFD700');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 20, bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr 1fr 1fr');
            Grid.rowsGap(10);
            Grid.columnsGap(10);
            Grid.width('100%');
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width('100%');
                            Column.padding(8);
                            Column.backgroundColor('rgba(60, 60, 60, 0.9)');
                            Column.borderRadius(8);
                            Column.onClick(() => {
                                this.selectedItem = item;
                                this.showDetail = true;
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.icon);
                            Text.fontSize(32);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.name);
                            Text.fontSize(12);
                            Text.fontColor(Color.White);
                            Text.maxLines(1);
                            Text.margin({ top: 5 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.rarity);
                            Text.fontSize(10);
                            Text.fontColor(this.getRarityColor(item.rarity));
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(`拥有: ${this.gameManager.getItemCount(item.id)}`);
                            Text.fontSize(10);
                            Text.fontColor('#aaaaaa');
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, [
                { id: 'stamina_potion_small', name: '小型体力药水', icon: '🧪', desc: '恢复5点体力', rarity: '普通', effect: '体力+5', usage: '冒险前使用', source: '炼金、商店', tip: '基础体力恢复道具', story: '炼金学徒的入门作品，蕴含着对生命力的初步理解' },
                { id: 'stamina_potion_medium', name: '中型体力药水', icon: '💊', desc: '恢复10点体力', rarity: '普通', effect: '体力+10', usage: '冒险前使用', source: '炼金、商店', tip: '稳定的体力恢复', story: '经过改良的配方，已成为冒险者的常备之物' },
                { id: 'stamina_potion_large', name: '大型体力药水', icon: '⚗️', desc: '恢复15点体力', rarity: '稀有', effect: '体力+15', usage: '冒险前使用', source: '炼金（紫月法阵）', tip: '高效的体力恢复', story: '紫月法阵的杰作，月光精华赋予其强大的恢复力' },
                { id: 'super_stamina_potion', name: '超级体力药水', icon: '🧬', desc: '恢复30点体力', rarity: '史诗', effect: '体力+30', usage: '冒险前使用', source: '高级炼金', tip: '强大的体力恢复', story: '传说中炼金大师的秘方，能瞬间恢复大量体力' },
                { id: 'combat_elixir', name: '战斗灵药', icon: '⚔️', desc: '战斗力+20，持续1小时', rarity: '稀有', effect: '战斗力+20', usage: '冒险中使用', source: '炼金（赤焰法阵）', tip: '提升战斗能力', story: '赤焰法阵的烈火淬炼而成，蕴含着战士的勇气' },
                { id: 'berserker_elixir', name: '狂暴灵药', icon: '🔥', desc: '战斗力+35，持续1小时', rarity: '史诗', effect: '战斗力+35', usage: '冒险中使用', source: '高级炼金', tip: '强大的战斗提升', story: '古代狂战士的秘药，能激发体内潜藏的力量' },
                { id: 'social_perfume', name: '社交香水', icon: '🌸', desc: '交际+15，持续1小时', rarity: '普通', effect: '交际+15', usage: '与NPC交流前使用', source: '炼金（翠风法阵）', tip: '提升NPC好感度', story: '翠风法阵的清风凝结，散发着自然的芬芳' },
                { id: 'luck_amulet', name: '幸运护身符', icon: '🍀', desc: '幸运+25，持续1小时', rarity: '稀有', effect: '幸运+25', usage: '冒险中使用', source: '炼金（幽蓝法阵）', tip: '提高暴击和掉落率', story: '幽蓝法阵的神秘力量，能扭转命运的轨迹' },
                { id: 'luck_cookie', name: '幸运饼干', icon: '🍪', desc: '幸运+10，持续30分钟', rarity: '普通', effect: '幸运+10', usage: '冒险中使用', source: '炼金、商店', tip: '小幅提升幸运', story: '古老的幸运符文被烘焙进饼干中，美味又实用' },
                { id: 'material_magnet', name: '材料磁石', icon: '🧲', desc: '材料掉落率+30%，持续1小时', rarity: '稀有', effect: '掉落率+30%', usage: '冒险前使用', source: '炼金（星辰命运阵）', tip: '增加材料获取', story: '星辰命运阵的星力凝聚，能吸引稀有的材料' },
                { id: 'stamina_cake', name: '体力蛋糕', icon: '🎂', desc: '恢复10点体力', rarity: '普通', effect: '体力+10', usage: '冒险前使用', source: '炼金（生命神树阵）', tip: '美味的体力恢复', story: '生命神树阵的自然之力，化作美味的生命蛋糕' },
                { id: 'combat_ration', name: '战斗口粮', icon: '🍖', desc: '战斗力+10，持续30分钟', rarity: '普通', effect: '战斗力+10', usage: '冒险中使用', source: '炼金、商店', tip: '基础的战斗提升', story: '军需官配发的标准战斗补给，简单但有效' },
                { id: 'energy_drink', name: '能量饮料', icon: '🥤', desc: '恢复8点体力', rarity: '普通', effect: '体力+8', usage: '冒险前使用', source: '商店', tip: '快速恢复体力', story: '现代炼金术的产物，蕴含着浓缩的能量精华' },
                { id: 'healing_herb', name: '治愈草药', icon: '🌿', desc: '恢复6点体力', rarity: '普通', effect: '体力+6', usage: '冒险前使用', source: '冒险掉落', tip: '天然的体力恢复', story: '生长在纯净之地的灵草，蕴含着自然的治愈之力' },
                { id: 'warrior_potion', name: '勇士药剂', icon: '💪', desc: '战斗力+15，幸运+10', rarity: '稀有', effect: '战斗力+15，幸运+10', usage: '冒险中使用', source: '炼金', tip: '综合提升战斗能力', story: '古代勇士出征前的祝福药剂，能带来勇气与好运' },
                { id: 'nature_blessing', name: '自然祝福', icon: '🍃', desc: '恢复12体力，交际+10', rarity: '稀有', effect: '体力+12，交际+10', usage: '冒险前使用', source: '炼金', tip: '自然之力加持', story: '自然精灵的祝福，能恢复体力并提升魅力' },
                { id: 'ocean_essence', name: '海洋精华', icon: '🌊', desc: '恢复18体力，幸运+15', rarity: '稀有', effect: '体力+18，幸运+15', usage: '冒险前使用', source: '炼金', tip: '海洋的力量', story: '深海中提取的精华，蕴含着海洋的神秘力量' },
                { id: 'moonlight_dew', name: '月光露珠', icon: '🌙', desc: '交际+20，幸运+15', rarity: '稀有', effect: '交际+20，幸运+15', usage: '与NPC交流前使用', source: '炼金', tip: '月光的祝福', story: '满月之夜收集的露珠，蕴含着月神的祝福' },
                { id: 'arcane_crystal', name: '奥术水晶', icon: '💎', desc: '战斗力+12，掉落率+20%', rarity: '稀有', effect: '战斗力+12，掉落率+20%', usage: '冒险中使用', source: '炼金', tip: '奥术能量结晶', story: '奥术能量凝结而成的晶体，能增强战斗和探索能力' },
                { id: 'wind_walk_potion', name: '风行药剂', icon: '💨', desc: '恢复20体力，交际+25', rarity: '史诗', effect: '体力+20，交际+25', usage: '冒险前使用', source: '高级炼金', tip: '风之精灵的祝福', story: '风之精灵的恩赐，能让人如风般轻盈自如' },
                { id: 'abyss_tear', name: '深渊之泪', icon: '💧', desc: '恢复25体力，掉落率+40%', rarity: '史诗', effect: '体力+25，掉落率+40%', usage: '冒险前使用', source: '深渊探索', tip: '深渊的神秘力量', story: '深渊领主的眼泪，蕴含着深渊的神秘力量' },
                { id: 'celestial_blessing', name: '天界祝福', icon: '⭐', desc: '恢复20体力，交际+30', rarity: '史诗', effect: '体力+20，交际+30', usage: '冒险前使用', source: '天界冒险', tip: '天界的神圣祝福', story: '天界神明的祝福，能带来强大的力量与魅力' },
                { id: 'ancient_blessing', name: '远古祝福', icon: '✨', desc: '全属性+30，持续2小时', rarity: '传说', effect: '全属性+30', usage: '随时使用', source: '炼金（虚空混沌阵）', tip: '远古神明的祝福', story: '远古神明留下的祝福，能全面提升使用者的能力' },
                { id: 'phoenix_feather', name: '凤凰之羽', icon: '🔥', desc: '冒险失败时自动复活', rarity: '史诗', effect: '自动复活', usage: '被动效果', source: '炼金（深渊召唤阵）', tip: '凤凰的重生之力', story: '不死凤凰的羽毛，蕴含着重生之力，能在危急时刻拯救生命' },
                { id: 'godly_essence', name: '神之精华', icon: '🌟', desc: '恢复40体力，全属性+40', rarity: '传说', effect: '体力+40，全属性+40', usage: '随时使用', source: '神级炼金', tip: '神明的精华凝聚', story: '神明精华的凝聚，能带来接近神明的力量' },
                { id: 'world_tree_sap', name: '世界树汁液', icon: '🌳', desc: '恢复50体力，掉落率+50%', rarity: '传说', effect: '体力+50，掉落率+50%', usage: '冒险前使用', source: '世界树', tip: '世界树的生命精华', story: '世界树的生命精华，蕴含着无穷的生命力与探索之力' }
            ], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Scroll.pop();
        Column.pop();
    }
    getRarityColor(rarity: string): string {
        switch (rarity) {
            case '传说': return '#FFD700';
            case '史诗': return '#FF00FF';
            case '稀有': return '#00BFFF';
            case '优秀': return '#00FF00';
            default: return '#FFFFFF';
        }
    }
    MaterialDetailSheet(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('70%');
            Column.backgroundColor('rgba(20, 20, 20, 0.98)');
            Column.borderRadius({ topLeft: 20, topRight: 20 });
            Column.position({ x: 0, y: '30%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding(20);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentTab === 0 ? '材料详情' : '物品详情');
            Text.fontSize(20);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.onClick(() => {
                this.showDetail = false;
                this.selectedMaterial = null;
                this.selectedItem = null;
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentTab === 0 && this.selectedMaterial) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.width(80);
                        Stack.height(80);
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Canvas.create(new CanvasRenderingContext2D(new RenderingContextSettings(true)));
                        Canvas.width(80);
                        Canvas.height(80);
                        Canvas.onReady(() => {
                            if (this.selectedMaterial) {
                                let ctx = new CanvasRenderingContext2D(new RenderingContextSettings(true));
                                ctx.clearRect(0, 0, 80, 80);
                                ctx.fillStyle = this.getColorHex(this.selectedMaterial.colorType);
                                ctx.beginPath();
                                ctx.arc(40, 40, 38, 0, Math.PI * 2);
                                ctx.fill();
                                MaterialPatternDrawer.drawPattern(ctx, this.selectedMaterial.id, 40, 40, 30);
                            }
                        });
                    }, Canvas);
                    Canvas.pop();
                    Stack.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.selectedMaterial.name);
                        Text.fontSize(24);
                        Text.fontColor(Color.White);
                        Text.margin({ top: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.margin({ top: 20 });
                    }, Column);
                    this.DetailRow.bind(this)('产地', this.selectedMaterial.origin);
                    this.DetailRow.bind(this)('属性', this.selectedMaterial.property);
                    this.DetailRow.bind(this)('效果', this.selectedMaterial.effect);
                    this.DetailRow.bind(this)('传说', this.selectedMaterial.legend);
                    this.DetailRow.bind(this)('获取难度', this.selectedMaterial.difficulty);
                    Column.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentTab === 1 && this.selectedItem) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.selectedItem.icon);
                        Text.fontSize(60);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.selectedItem.name);
                        Text.fontSize(24);
                        Text.fontColor(Color.White);
                        Text.margin({ top: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.selectedItem.rarity);
                        Text.fontSize(18);
                        Text.fontColor(this.getRarityColor(this.selectedItem.rarity));
                        Text.margin({ top: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.margin({ top: 20 });
                    }, Column);
                    this.DetailRow.bind(this)('描述', this.selectedItem.desc);
                    this.DetailRow.bind(this)('拥有数量', `${this.gameManager.getItemCount(this.selectedItem.id)}个`);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.selectedItem.effect) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.DetailRow.bind(this)('效果', this.selectedItem.effect);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.selectedItem.usage) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.DetailRow.bind(this)('使用场景', this.selectedItem.usage);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.selectedItem.source) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.DetailRow.bind(this)('获取途径', this.selectedItem.source);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.selectedItem.tip) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.DetailRow.bind(this)('提示', this.selectedItem.tip);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.selectedItem.story) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.DetailRow.bind(this)('故事', this.selectedItem.story);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.selectedItem.rarity === '传说') {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.DetailRow.bind(this)('特性', '极其珍贵，使用后获得强大效果');
                            });
                        }
                        else if (this.selectedItem.rarity === '史诗') {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.DetailRow.bind(this)('特性', '非常稀有，效果显著');
                            });
                        }
                        else if (this.selectedItem.rarity === '稀有') {
                            this.ifElseBranchUpdateFunction(2, () => {
                                this.DetailRow.bind(this)('特性', '较为稀有，效果良好');
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(3, () => {
                                this.DetailRow.bind(this)('特性', '常见物品，效果普通');
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    DetailRow(label: string, value: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 10 });
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label + ':');
            Text.fontSize(14);
            Text.fontColor('#aaaaaa');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(14);
            Text.fontColor(Color.White);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    isUnlocked(materialId: string): boolean {
        return this.gameManager.getUserState().unlockedMaterials.has(materialId);
    }
    getMaterialsByColorType(colorType: MaterialColorType): MaterialData[] {
        return AllMaterials.filter((m: MaterialData) => m.colorType === colorType);
    }
    getColorHex(colorType: MaterialColorType): string {
        const color = MaterialColors[colorType];
        return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
    }
    NPCList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('NPC图鉴');
            Text.fontSize(18);
            Text.fontColor('#FFD700');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 20, bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const npc = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.margin({ bottom: 15 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('90%');
                    Row.padding(15);
                    Row.backgroundColor('rgba(60, 60, 60, 0.9)');
                    Row.borderRadius(8);
                    Row.onClick(() => {
                        this.selectedItem = {
                            id: npc.id,
                            name: npc.name,
                            icon: npc.avatar,
                            desc: npc.description,
                            rarity: 'NPC',
                            effect: npc.personality,
                            usage: npc.taskType,
                            source: npc.symbol,
                            story: npc.stories.map(s => `【${s.title}】\n${s.content}${s.letter ? '\n\n信件:\n' + s.letter : ''}${s.specialRecipe ? '\n\n配方: ' + s.specialRecipe : ''}`).join('\n\n')
                        };
                        this.showDetail = true;
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(npc.avatar);
                    Text.fontSize(40);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.alignItems(HorizontalAlign.Start);
                    Column.layoutWeight(1);
                    Column.margin({ left: 15 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(npc.name);
                    Text.fontSize(16);
                    Text.fontColor(Color.White);
                    Text.fontWeight(FontWeight.Bold);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(npc.description);
                    Text.fontSize(12);
                    Text.fontColor('#aaaaaa');
                    Text.margin({ top: 5 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`好感度: ${this.gameManager.getNPCTrust(npc.id)}/100`);
                    Text.fontSize(12);
                    Text.fontColor('#FFD700');
                    Text.margin({ top: 5 });
                }, Text);
                Text.pop();
                Column.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.gameManager.getNPCTrust(npc.id) >= 100) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('90%');
                                Column.margin({ top: 5 });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('已解锁所有故事');
                                Text.fontSize(12);
                                Text.fontColor('#00FF00');
                                Text.margin({ top: 5 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const story = _item;
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.justifyContent(FlexAlign.Center);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        if (story.letter) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Button.createWithLabel(`✉️ ${story.title}`);
                                                    Button.height(28);
                                                    Button.fontSize(11);
                                                    Button.backgroundColor('#4a90e2');
                                                    Button.margin({ top: 3, right: 5 });
                                                    Button.onClick(() => {
                                                        this.selectedNPCStory = story;
                                                    });
                                                }, Button);
                                                Button.pop();
                                            });
                                        }
                                        else {
                                            this.ifElseBranchUpdateFunction(1, () => {
                                            });
                                        }
                                    }, If);
                                    If.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        if (story.specialRecipe) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Button.createWithLabel(`📜 ${this.getRecipeName(story.specialRecipe)}`);
                                                    Button.height(28);
                                                    Button.fontSize(11);
                                                    Button.backgroundColor('#9c27b0');
                                                    Button.margin({ top: 3 });
                                                    Button.onClick(() => {
                                                        const recipe = NPCSpecialRecipes.find(r => r.id === story.specialRecipe);
                                                        if (recipe) {
                                                            this.selectedSpecialRecipe = recipe;
                                                        }
                                                    });
                                                }, Button);
                                                Button.pop();
                                            });
                                        }
                                        else {
                                            this.ifElseBranchUpdateFunction(1, () => {
                                            });
                                        }
                                    }, If);
                                    If.pop();
                                    Row.pop();
                                };
                                this.forEachUpdateFunction(elmtId, npc.stories, forEachItemGenFunction);
                            }, ForEach);
                            ForEach.pop();
                            Column.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, FixedNPCs, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    getRecipeName(recipeId: string): string {
        const recipe = NPCSpecialRecipes.find(r => r.id === recipeId);
        return recipe ? recipe.name : recipeId;
    }
    NPCStoryDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.height('70%');
            Column.padding(20);
            Column.backgroundColor('rgba(30, 30, 30, 0.98)');
            Column.borderRadius(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedNPCStory!.title);
            Text.fontSize(22);
            Text.fontColor('#FFD700');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedNPCStory!.content);
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.textAlign(TextAlign.Center);
            Text.lineHeight(24);
            Text.padding({ left: 20, right: 20 });
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedNPCStory!.letter) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('━━━━━━━━━━━━━━━');
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                        Text.margin({ bottom: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('✉️ 信件');
                        Text.fontSize(18);
                        Text.fontColor('#FFD700');
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.selectedNPCStory!.letter!);
                        Text.fontSize(14);
                        Text.fontColor('#aaaaaa');
                        Text.lineHeight(22);
                        Text.padding({ left: 20, right: 20 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedNPCStory!.specialRecipe) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('━━━━━━━━━━━━━━━');
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                        Text.margin({ top: 20, bottom: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📜 特殊配方');
                        Text.fontSize(18);
                        Text.fontColor('#FFD700');
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.getRecipeName(this.selectedNPCStory!.specialRecipe!));
                        Button.backgroundColor('#9c27b0');
                        Button.onClick(() => {
                            const recipe = NPCSpecialRecipes.find(r => r.id === this.selectedNPCStory!.specialRecipe);
                            if (recipe) {
                                this.selectedSpecialRecipe = recipe;
                            }
                        });
                    }, Button);
                    Button.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.width('60%');
            Button.height(50);
            Button.backgroundColor('#666666');
            Button.margin({ top: 20 });
            Button.onClick(() => {
                this.selectedNPCStory = null;
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    SpecialRecipeDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.height('70%');
            Column.padding(20);
            Column.backgroundColor('rgba(30, 30, 30, 0.98)');
            Column.borderRadius(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedSpecialRecipe!.name);
            Text.fontSize(24);
            Text.fontColor('#FFD700');
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedSpecialRecipe!.icon);
            Text.fontSize(60);
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('【传说配方】');
            Text.fontSize(16);
            Text.fontColor('#FF00FF');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedSpecialRecipe!.description);
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.textAlign(TextAlign.Center);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('━━━━━━━━━━━━━━━');
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('传说');
            Text.fontSize(18);
            Text.fontColor('#FFD700');
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedSpecialRecipe!.legend);
            Text.fontSize(14);
            Text.fontColor('#aaaaaa');
            Text.lineHeight(22);
            Text.padding({ left: 20, right: 20 });
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('━━━━━━━━━━━━━━━');
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`价值: ${this.selectedSpecialRecipe!.value[0]} ~ ${this.selectedSpecialRecipe!.value[1]} 金币`);
            Text.fontSize(16);
            Text.fontColor('#FFD700');
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('满好感解锁后可炼制并出售');
            Text.fontSize(14);
            Text.fontColor('#00ff88');
        }, Text);
        Text.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.width('60%');
            Button.height(50);
            Button.backgroundColor('#666666');
            Button.margin({ top: 20 });
            Button.onClick(() => {
                this.selectedSpecialRecipe = null;
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
