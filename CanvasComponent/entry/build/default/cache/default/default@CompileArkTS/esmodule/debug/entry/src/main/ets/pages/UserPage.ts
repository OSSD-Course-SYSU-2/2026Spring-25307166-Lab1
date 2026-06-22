if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UserPage_Params {
    currentPage?: GamePage;
    showMaterials?: boolean;
    gameManager?: GameManager;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
import { AllMaterials } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import type { MaterialData } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import { MaterialColorType, MaterialColors } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
export class UserPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__showMaterials = new ObservedPropertySimplePU(true, this, "showMaterials");
        this.gameManager = GameManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UserPage_Params) {
        if (params.showMaterials !== undefined) {
            this.showMaterials = params.showMaterials;
        }
        if (params.gameManager !== undefined) {
            this.gameManager = params.gameManager;
        }
    }
    updateStateVars(params: UserPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__showMaterials.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__showMaterials.aboutToBeDeleted();
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
    private __showMaterials: ObservedPropertySimplePU<boolean>;
    get showMaterials() {
        return this.__showMaterials.get();
    }
    set showMaterials(newValue: boolean) {
        this.__showMaterials.set(newValue);
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
            Text.create('个人信息');
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
            Column.create();
            Column.width('100%');
            Column.padding(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.gameManager.getUserState().avatar) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.gameManager.getUserState().avatar);
                        Image.width(100);
                        Image.height(100);
                        Image.borderRadius(50);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(100);
                        Column.height(100);
                        Column.borderRadius(50);
                        Column.backgroundColor('#333333');
                    }, Column);
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.gameManager.getUserState().name);
            Text.fontSize(24);
            Text.fontColor(Color.White);
            Text.margin({ top: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`金币: ${this.gameManager.getUserState().gold}`);
            Text.fontSize(18);
            Text.fontColor('#FFD700');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('材料背包');
            Button.backgroundColor(this.showMaterials ? '#4a90e2' : '#666666');
            Button.onClick(() => {
                this.showMaterials = true;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('物品背包');
            Button.backgroundColor(!this.showMaterials ? '#4a90e2' : '#666666');
            Button.onClick(() => {
                this.showMaterials = false;
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showMaterials) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.MaterialsList.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.ItemsList.bind(this)();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ top: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('🔧 测试功能：获得所有资源');
            Button.width('90%');
            Button.backgroundColor('#9c27b0');
            Button.onClick(() => {
                this.testGetAllResources();
            });
            Button.margin({ top: 20 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('💖 测试功能：NPC好感满值');
            Button.width('90%');
            Button.backgroundColor('#e91e63');
            Button.onClick(() => {
                this.testMaxNPCFavor();
            });
            Button.margin({ top: 10 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('注销');
            Button.width('90%');
            Button.backgroundColor('#f44336');
            Button.onClick(() => {
                this.currentPage = GamePage.INTRO;
            });
            Button.margin({ top: 10 });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重启游戏');
            Button.width('90%');
            Button.backgroundColor('#ff9800');
            Button.onClick(() => {
                this.currentPage = GamePage.INTRO;
            });
            Button.margin({ top: 10 });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
    }
    MaterialsList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width('90%');
            List.layoutWeight(1);
            List.margin({ top: 15 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const colorType = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ListItemGroup.create({ header: this.ColorTypeHeader.bind(this, colorType) });
                }, ListItemGroup);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const material = _item;
                        {
                            const itemCreation = (elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                ListItem.create(deepRenderFunction, true);
                                if (!isInitialRender) {
                                    ListItem.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            };
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                ListItem.create(deepRenderFunction, true);
                            };
                            const deepRenderFunction = (elmtId, isInitialRender) => {
                                itemCreation(elmtId, isInitialRender);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                    Row.padding(10);
                                    Row.backgroundColor('rgba(50, 50, 50, 0.8)');
                                    Row.borderRadius(5);
                                    Row.margin({ bottom: 5 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width(30);
                                    Column.height(30);
                                    Column.backgroundColor(this.getColorHex(colorType));
                                    Column.borderRadius(15);
                                }, Column);
                                Column.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(material.name);
                                    Text.fontSize(16);
                                    Text.fontColor(Color.White);
                                    Text.margin({ left: 15 });
                                    Text.layoutWeight(1);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(`x${this.gameManager.getMaterialCount(material.id)}`);
                                    Text.fontSize(16);
                                    Text.fontColor('#FFD700');
                                }, Text);
                                Text.pop();
                                Row.pop();
                                ListItem.pop();
                            };
                            this.observeComponentCreation2(itemCreation2, ListItem);
                            ListItem.pop();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.getMaterialsByColor(colorType), forEachItemGenFunction);
                }, ForEach);
                ForEach.pop();
                ListItemGroup.pop();
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
        List.pop();
    }
    ItemsList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.layoutWeight(1);
            Column.margin({ top: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.gameManager.getUserState().items.size > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.width('100%');
                        List.layoutWeight(1);
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const entry = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.padding(10);
                                        Row.backgroundColor('rgba(50, 50, 50, 0.8)');
                                        Row.borderRadius(5);
                                        Row.margin({ bottom: 5 });
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(entry[0]);
                                        Text.fontSize(16);
                                        Text.fontColor(Color.White);
                                        Text.layoutWeight(1);
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(`x${entry[1]}`);
                                        Text.fontSize(16);
                                        Text.fontColor('#FFD700');
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, Array.from(this.gameManager.getUserState().items.entries()), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无物品');
                        Text.fontSize(18);
                        Text.fontColor('#aaaaaa');
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    ColorTypeHeader(colorType: MaterialColorType, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 15, bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(colorType);
            Text.fontSize(16);
            Text.fontColor(this.getColorHex(colorType));
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Row.pop();
    }
    getColorHex(colorType: MaterialColorType): string {
        const color = MaterialColors[colorType];
        return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
    }
    testGetAllResources() {
        // 所有原材料100个
        AllMaterials.forEach((m: MaterialData) => {
            this.gameManager.addMaterial(m.id, 100);
        });
        // 所有物品10个
        const allItemIds = [
            'stamina_potion_small', 'stamina_potion_medium', 'stamina_potion_large',
            'social_perfume', 'lucky_cookie', 'material_magnet',
            'combat_elixir', 'luck_amulet', 'perception_potion', 'craftsmanship_boost',
            'super_stamina_potion', 'rage_elixir', 'wind_walk_potion', 'shadow_cloak',
            'ancient_blessing', 'phoenix_feather', 'divine_essence', 'world_tree_sap',
            'gold_coin_bag', 'mystic_orb', 'elemental_crystal', 'fortune_card',
            'mysticism_tome', 'craftsman_kit', 'explorer_compass'
        ];
        allItemIds.forEach((itemId: string) => {
            this.gameManager.addItem(itemId, 10);
        });
        // 大量金币
        this.gameManager.addGold(100000);
    }
    testMaxNPCFavor() {
        const npcIds = ['opaque', 'talia', 'paparacha', 'elder_wise', 'merchant_rare'];
        npcIds.forEach((npcId: string) => {
            this.gameManager.getUserState().npcRelationships.set(npcId, {
                npcId: npcId,
                trust: 100,
                completedTasks: 10,
                currentTask: null
            });
        });
    }
    getMaterialsByColor(colorType: MaterialColorType): MaterialData[] {
        return AllMaterials.filter((m: MaterialData) => m.colorType === colorType);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
