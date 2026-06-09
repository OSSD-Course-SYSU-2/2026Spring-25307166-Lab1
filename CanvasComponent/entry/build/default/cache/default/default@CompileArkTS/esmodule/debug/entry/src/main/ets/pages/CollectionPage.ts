if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CollectionPage_Params {
    currentPage?: GamePage;
    selectedMaterial?: MaterialData | null;
    showDetail?: boolean;
    currentTab?: number;
    gameManager?: GameManager;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
import { AllMaterials } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import type { MaterialData } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import { MaterialColorType, MaterialColors } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
interface ItemDisplay {
    id: string;
    name: string;
    icon: string;
    desc: string;
    rarity: string;
}
export class CollectionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__selectedMaterial = new ObservedPropertyObjectPU(null, this, "selectedMaterial");
        this.__showDetail = new ObservedPropertySimplePU(false, this, "showDetail");
        this.__currentTab = new ObservedPropertySimplePU(0, this, "currentTab");
        this.gameManager = GameManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CollectionPage_Params) {
        if (params.selectedMaterial !== undefined) {
            this.selectedMaterial = params.selectedMaterial;
        }
        if (params.showDetail !== undefined) {
            this.showDetail = params.showDetail;
        }
        if (params.currentTab !== undefined) {
            this.currentTab = params.currentTab;
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
        this.__showDetail.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTab.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__selectedMaterial.aboutToBeDeleted();
        this.__showDetail.aboutToBeDeleted();
        this.__currentTab.aboutToBeDeleted();
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
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.ItemsList.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showDetail && this.selectedMaterial) {
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
            Column.create();
            Column.width(50);
            Column.height(50);
            Column.backgroundColor(this.getColorHex(material.colorType));
            Column.borderRadius(25);
        }, Column);
        Column.pop();
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
                { id: 'stamina_potion_small', name: '小型体力药水', icon: '🧪', desc: '恢复5点体力', rarity: '普通' },
                { id: 'stamina_potion_large', name: '大型体力药水', icon: '⚗️', desc: '恢复15点体力', rarity: '稀有' },
                { id: 'combat_elixir', name: '战斗灵药', icon: '⚔️', desc: '战斗力+20', rarity: '稀有' },
                { id: 'social_perfume', name: '社交香水', icon: '🌸', desc: '交际+15', rarity: '普通' },
                { id: 'luck_amulet', name: '幸运护身符', icon: '🍀', desc: '幸运+25', rarity: '稀有' },
                { id: 'material_magnet', name: '材料磁石', icon: '🧲', desc: '掉落率+30%', rarity: '稀有' },
                { id: 'stamina_cake', name: '体力蛋糕', icon: '🎂', desc: '恢复10点体力', rarity: '普通' },
                { id: 'ancient_blessing', name: '远古祝福', icon: '✨', desc: '全面提升', rarity: '传说' }
            ], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
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
            Text.create('材料详情');
            Text.fontSize(20);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.onClick(() => {
                this.showDetail = false;
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedMaterial) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(80);
                        Column.height(80);
                        Column.backgroundColor(this.getColorHex(this.selectedMaterial.colorType));
                        Column.borderRadius(40);
                    }, Column);
                    Column.pop();
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
    rerender() {
        this.updateDirtyElements();
    }
}
