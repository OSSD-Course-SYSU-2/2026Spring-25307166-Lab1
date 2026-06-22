if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AdventurePage_Params {
    currentPage?: GamePage;
    selectedLocation?: AdventureLocation | null;
    showResult?: boolean;
    adventureResult?: AdventureResult | null;
    showItemSelection?: boolean;
    selectedItems?: string[];
    showNoStaminaDialog?: boolean;
    currentStamina?: number;
    currentGold?: number;
    gameManager?: GameManager;
    staminaTimer?: number;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
import { AdventureLocations, getRandomEvent, rollDice, getRandomDialogue } from "@bundle:com.example.canvascomponent/entry/ets/model/Adventure";
import type { AdventureLocation, AdventureEvent, AdventureResult, EventReward, EventFailure } from "@bundle:com.example.canvascomponent/entry/ets/model/Adventure";
import { AllMaterials, getMaterialById } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import { AllItems } from "@bundle:com.example.canvascomponent/entry/ets/model/Item";
import type { Item } from "@bundle:com.example.canvascomponent/entry/ets/model/Item";
export class AdventurePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__selectedLocation = new ObservedPropertyObjectPU(null, this, "selectedLocation");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.__adventureResult = new ObservedPropertyObjectPU(null, this, "adventureResult");
        this.__showItemSelection = new ObservedPropertySimplePU(false, this, "showItemSelection");
        this.__selectedItems = new ObservedPropertyObjectPU([], this, "selectedItems");
        this.__showNoStaminaDialog = new ObservedPropertySimplePU(false, this, "showNoStaminaDialog");
        this.__currentStamina = new ObservedPropertySimplePU(0, this, "currentStamina");
        this.__currentGold = new ObservedPropertySimplePU(0, this, "currentGold");
        this.gameManager = GameManager.getInstance();
        this.staminaTimer = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AdventurePage_Params) {
        if (params.selectedLocation !== undefined) {
            this.selectedLocation = params.selectedLocation;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.adventureResult !== undefined) {
            this.adventureResult = params.adventureResult;
        }
        if (params.showItemSelection !== undefined) {
            this.showItemSelection = params.showItemSelection;
        }
        if (params.selectedItems !== undefined) {
            this.selectedItems = params.selectedItems;
        }
        if (params.showNoStaminaDialog !== undefined) {
            this.showNoStaminaDialog = params.showNoStaminaDialog;
        }
        if (params.currentStamina !== undefined) {
            this.currentStamina = params.currentStamina;
        }
        if (params.currentGold !== undefined) {
            this.currentGold = params.currentGold;
        }
        if (params.gameManager !== undefined) {
            this.gameManager = params.gameManager;
        }
        if (params.staminaTimer !== undefined) {
            this.staminaTimer = params.staminaTimer;
        }
    }
    updateStateVars(params: AdventurePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedLocation.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
        this.__adventureResult.purgeDependencyOnElmtId(rmElmtId);
        this.__showItemSelection.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedItems.purgeDependencyOnElmtId(rmElmtId);
        this.__showNoStaminaDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__currentStamina.purgeDependencyOnElmtId(rmElmtId);
        this.__currentGold.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__selectedLocation.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        this.__adventureResult.aboutToBeDeleted();
        this.__showItemSelection.aboutToBeDeleted();
        this.__selectedItems.aboutToBeDeleted();
        this.__showNoStaminaDialog.aboutToBeDeleted();
        this.__currentStamina.aboutToBeDeleted();
        this.__currentGold.aboutToBeDeleted();
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
    private __selectedLocation: ObservedPropertyObjectPU<AdventureLocation | null>;
    get selectedLocation() {
        return this.__selectedLocation.get();
    }
    set selectedLocation(newValue: AdventureLocation | null) {
        this.__selectedLocation.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    private __adventureResult: ObservedPropertyObjectPU<AdventureResult | null>;
    get adventureResult() {
        return this.__adventureResult.get();
    }
    set adventureResult(newValue: AdventureResult | null) {
        this.__adventureResult.set(newValue);
    }
    private __showItemSelection: ObservedPropertySimplePU<boolean>;
    get showItemSelection() {
        return this.__showItemSelection.get();
    }
    set showItemSelection(newValue: boolean) {
        this.__showItemSelection.set(newValue);
    }
    private __selectedItems: ObservedPropertyObjectPU<string[]>;
    get selectedItems() {
        return this.__selectedItems.get();
    }
    set selectedItems(newValue: string[]) {
        this.__selectedItems.set(newValue);
    }
    private __showNoStaminaDialog: ObservedPropertySimplePU<boolean>;
    get showNoStaminaDialog() {
        return this.__showNoStaminaDialog.get();
    }
    set showNoStaminaDialog(newValue: boolean) {
        this.__showNoStaminaDialog.set(newValue);
    }
    private __currentStamina: ObservedPropertySimplePU<number>;
    get currentStamina() {
        return this.__currentStamina.get();
    }
    set currentStamina(newValue: number) {
        this.__currentStamina.set(newValue);
    }
    private __currentGold: ObservedPropertySimplePU<number>;
    get currentGold() {
        return this.__currentGold.get();
    }
    set currentGold(newValue: number) {
        this.__currentGold.set(newValue);
    }
    private gameManager: GameManager;
    private staminaTimer: number;
    aboutToAppear() {
        this.currentStamina = this.gameManager.getUserState().stamina;
        this.currentGold = this.gameManager.getUserState().gold;
        this.startStaminaRecovery();
    }
    aboutToDisappear() {
        if (this.staminaTimer !== -1) {
            clearInterval(this.staminaTimer);
        }
    }
    startStaminaRecovery() {
        this.staminaTimer = setInterval(() => {
            const state = this.gameManager.getUserState();
            this.currentStamina = state.stamina;
            this.currentGold = state.gold;
        }, 1000);
    }
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
            Text.create('⚔ 冒险探索 ⚔');
            Text.fontSize(24);
            Text.fontColor(Color.White);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`💰${this.currentGold}`);
            Text.fontSize(16);
            Text.fontColor('#FFD700');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`⚡${this.currentStamina}/${this.gameManager.getUserState().maxStamina}`);
            Text.fontSize(14);
            Text.fontColor('#00ff88');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☽');
            Text.fontSize(12);
            Text.fontColor('rgba(255, 215, 0, 0.5)');
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.UserStatusPanel.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择冒险地点');
            Text.fontSize(20);
            Text.fontColor('#aaaaaa');
            Text.margin({ top: 15, bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('90%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.On);
            Scroll.edgeEffect(EdgeEffect.Spring);
            Scroll.margin({ top: 10 });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const location = _item;
                this.LocationCard.bind(this)(location);
            };
            this.forEachUpdateFunction(elmtId, AdventureLocations, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showResult && this.adventureResult) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.ResultDialog.bind(this)();
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
            if (this.showItemSelection) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.ItemSelectionDialog.bind(this)();
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
            if (this.showNoStaminaDialog) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.NoStaminaDialog.bind(this)();
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
    UserStatusPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.backgroundColor('rgba(40, 40, 40, 0.8)');
            Column.borderRadius(8);
            Column.padding(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.padding({ top: 2, bottom: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`战斗力: ${this.gameManager.getUserState().combatPower}`);
            Text.fontSize(12);
            Text.fontColor('#ff6666');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`交际: ${this.gameManager.getUserState().social}`);
            Text.fontSize(12);
            Text.fontColor('#66ff66');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`幸运: ${this.gameManager.getUserState().luck}`);
            Text.fontSize(12);
            Text.fontColor('#6666ff');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.padding({ top: 2, bottom: 2 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`神秘: ${this.gameManager.getUserState().mysticism}`);
            Text.fontSize(12);
            Text.fontColor('#9966ff');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`感知: ${this.gameManager.getUserState().perception}`);
            Text.fontSize(12);
            Text.fontColor('#ff9966');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`技艺: ${this.gameManager.getUserState().craftsmanship}`);
            Text.fontSize(12);
            Text.fontColor('#66ffff');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    LocationCard(location: AdventureLocation, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('rgba(50, 50, 50, 0.9)');
            Column.borderRadius(10);
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(location.name);
            Text.fontSize(22);
            Text.fontColor('#FFD700');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(location.description);
            Text.fontSize(14);
            Text.fontColor('#aaaaaa');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`危险: ${location.danger}`);
            Text.fontSize(14);
            Text.fontColor(this.getDangerColor(location.danger));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`💰${location.cost}`);
            Text.fontSize(16);
            Text.fontColor('#FFD700');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`主要收获: ${this.getMaterialNames(location.mainReward)}`);
            Text.fontSize(14);
            Text.fontColor('#88ccff');
            Text.margin({ top: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(location.features);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('使用物品');
            Button.width('45%');
            Button.height(40);
            Button.backgroundColor('#4a90e2');
            Button.onClick(() => {
                this.showItemSelection = true;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('出发冒险');
            Button.width('45%');
            Button.height(40);
            Button.backgroundColor(this.canAdventure(location) ? '#4CAF50' : '#666666');
            Button.enabled(this.canAdventure(location));
            Button.onClick(() => {
                this.startAdventure(location);
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    ItemSelectionDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('80%');
            Column.padding(20);
            Column.backgroundColor('rgba(30, 30, 30, 0.98)');
            Column.borderRadius(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择物品（最多3种）');
            Text.fontSize(20);
            Text.fontColor('#FFD700');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('50%');
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding(10);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${item.icon} ${item.name}`);
                    Text.fontSize(16);
                    Text.fontColor(Color.White);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`x${this.gameManager.getItemCount(item.id)}`);
                    Text.fontSize(14);
                    Text.fontColor('#aaaaaa');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Toggle.create({ type: ToggleType.Checkbox, isOn: this.selectedItems.includes(item.id) });
                    Toggle.onChange((isOn: boolean) => {
                        if (isOn && this.selectedItems.length < 3) {
                            this.selectedItems.push(item.id);
                        }
                        else if (!isOn) {
                            this.selectedItems = this.selectedItems.filter(id => id !== item.id);
                        }
                    });
                    Toggle.enabled(this.gameManager.getItemCount(item.id) > 0);
                }, Toggle);
                Toggle.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, AllItems.filter(item => item.usableInAdventure), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.width('45%');
            Button.backgroundColor('#666666');
            Button.onClick(() => {
                this.showItemSelection = false;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确定');
            Button.width('45%');
            Button.backgroundColor('#4CAF50');
            Button.onClick(() => {
                this.selectedItems.forEach(itemId => {
                    this.gameManager.useItem(itemId);
                });
                this.selectedItems = [];
                this.showItemSelection = false;
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    ResultDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('80%');
            Column.padding(20);
            Column.backgroundColor('rgba(30, 30, 30, 0.98)');
            Column.borderRadius(15);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getResultTitle());
            Text.fontSize(24);
            Text.fontColor(this.getResultTitleColor());
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.adventureResult) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.margin({ bottom: 15 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`骰子: ${this.adventureResult.diceRoll}`);
                        Text.fontSize(16);
                        Text.fontColor('#aaaaaa');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`判定值: ${this.adventureResult.userValue}`);
                        Text.fontSize(16);
                        Text.fontColor('#aaaaaa');
                        Text.margin({ top: 5 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.adventureResult.message);
                        Text.fontSize(16);
                        Text.fontColor(Color.White);
                        Text.textAlign(TextAlign.Center);
                        Text.padding({ left: 20, right: 20 });
                        Text.margin({ bottom: 15 });
                    }, Text);
                    Text.pop();
                    this.RewardsPanel.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确定');
            Button.width('60%');
            Button.height(50);
            Button.backgroundColor('#4a90e2');
            Button.margin({ top: 20 });
            Button.onClick(() => {
                this.showResult = false;
                this.adventureResult = null;
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    RewardsPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.adventureResult && (this.adventureResult.success || this.adventureResult.criticalSuccess)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(10);
                        Column.backgroundColor('rgba(60, 60, 60, 0.8)');
                        Column.borderRadius(8);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('获得奖励:');
                        Text.fontSize(16);
                        Text.fontColor('#FFD700');
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.adventureResult.rewards.materialId) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(`${getMaterialById(this.adventureResult.rewards.materialId)?.name || ''} x${this.adventureResult.rewards.materialAmount}`);
                                    Text.fontSize(14);
                                    Text.fontColor('#88ccff');
                                }, Text);
                                Text.pop();
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
                        if (this.adventureResult.rewards.gold) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(`金币 +${this.adventureResult.rewards.gold}`);
                                    Text.fontSize(14);
                                    Text.fontColor('#FFD700');
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    NoStaminaDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('80%');
            Column.padding(30);
            Column.backgroundColor('rgba(30, 30, 30, 0.98)');
            Column.borderRadius(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('体力不足！');
            Text.fontSize(24);
            Text.fontColor('#ff6666');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('你的体力已经耗尽，无法继续冒险。\n请等待体力恢复（每3分钟恢复1点）\n或使用体力恢复物品。');
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.textAlign(TextAlign.Center);
            Text.padding({ left: 20, right: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确定');
            Button.width('60%');
            Button.height(50);
            Button.backgroundColor('#4a90e2');
            Button.margin({ top: 30 });
            Button.onClick(() => {
                this.showNoStaminaDialog = false;
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    canAdventure(location: AdventureLocation): boolean {
        return this.gameManager.canAdventure() && this.gameManager.getUserState().gold >= location.cost;
    }
    getMaterialNames(colorTypes: string[]): string {
        return colorTypes.join('、') + '系材料';
    }
    getDangerColor(danger: string): string {
        if (danger === '中等')
            return '#ffcc00';
        if (danger === '较高')
            return '#ff9900';
        if (danger === '高')
            return '#ff6600';
        if (danger === '极高')
            return '#ff3300';
        return '#ffffff';
    }
    getResultTitle(): string {
        if (!this.adventureResult)
            return '';
        if (this.adventureResult.criticalSuccess)
            return '大成功！';
        if (this.adventureResult.criticalFailure)
            return '大失败！';
        if (this.adventureResult.success)
            return '成功！';
        return '失败...';
    }
    getResultTitleColor(): string {
        if (!this.adventureResult)
            return '#ffffff';
        if (this.adventureResult.criticalSuccess)
            return '#FFD700';
        if (this.adventureResult.criticalFailure)
            return '#ff3300';
        if (this.adventureResult.success)
            return '#4CAF50';
        return '#ff6666';
    }
    startAdventure(location: AdventureLocation) {
        if (!this.gameManager.canAdventure()) {
            this.showNoStaminaDialog = true;
            return;
        }
        this.gameManager.addGold(-location.cost);
        this.gameManager.useStamina(1);
        this.currentStamina = this.gameManager.getUserState().stamina;
        this.currentGold = this.gameManager.getUserState().gold;
        const event = getRandomEvent(location);
        if (event) {
            this.adventureResult = this.processEvent(event);
        }
        else {
            this.adventureResult = this.processNormalAdventure(location);
        }
        this.showResult = true;
    }
    processEvent(event: AdventureEvent): AdventureResult {
        const diceRoll = rollDice();
        const userValue = this.gameManager.getValueForCheck(event.checkType);
        const criticalSuccess = diceRoll === 100;
        const criticalFailure = diceRoll === 1;
        const success = diceRoll <= userValue && !criticalFailure;
        let message = '';
        const rewards = event.rewards || {};
        const failures = event.failures || { staminaLoss: 10 };
        if (criticalSuccess) {
            message = getRandomDialogue(event.dialogues.criticalSuccess);
            if (rewards.materialId && rewards.materialAmount) {
                this.gameManager.addMaterial(rewards.materialId, rewards.materialAmount * 2);
            }
            if (rewards.gold) {
                this.gameManager.addGold(rewards.gold * 2);
            }
        }
        else if (criticalFailure) {
            message = getRandomDialogue(event.dialogues.criticalFailure);
            this.gameManager.useStamina(failures.staminaLoss * 2);
            if (failures.materialLoss) {
                this.gameManager.useMaterial(failures.materialLoss.materialId, failures.materialLoss.amount);
            }
            if (failures.goldLoss) {
                this.gameManager.addGold(-failures.goldLoss);
            }
        }
        else if (success) {
            message = getRandomDialogue(event.dialogues.success);
            if (rewards.materialId && rewards.materialAmount) {
                this.gameManager.addMaterial(rewards.materialId, rewards.materialAmount);
            }
            if (rewards.gold) {
                this.gameManager.addGold(rewards.gold);
            }
        }
        else {
            message = getRandomDialogue(event.dialogues.failure);
            this.gameManager.useStamina(failures.staminaLoss);
            if (failures.goldLoss) {
                this.gameManager.addGold(-failures.goldLoss);
            }
        }
        return {
            success: success,
            criticalSuccess: criticalSuccess,
            criticalFailure: criticalFailure,
            diceRoll: diceRoll,
            userValue: userValue,
            message: message,
            rewards: rewards,
            failures: failures
        };
    }
    processNormalAdventure(location: AdventureLocation): AdventureResult {
        const diceRoll = rollDice();
        const userValue = this.gameManager.getUserState().luck;
        const success = diceRoll <= userValue;
        const criticalSuccess = diceRoll >= 95;
        const criticalFailure = diceRoll <= 5;
        let message = '';
        const rewards: EventReward = {};
        const failures: EventFailure = { staminaLoss: 0 };
        const dangerLossChance = this.getDangerLossChance(location.danger);
        const lossRoll = Math.random() * 100;
        if (criticalSuccess) {
            const rewardType = location.mainReward[0];
            const materials = AllMaterials.filter(m => m.colorType === rewardType);
            if (materials.length > 0) {
                const material = materials[Math.floor(Math.random() * materials.length)];
                const amount = Math.floor(Math.random() * 16) + 15;
                this.gameManager.addMaterial(material.id, amount);
                rewards.materialId = material.id;
                rewards.materialAmount = amount;
                const itemDropChance = 0.5;
                if (Math.random() < itemDropChance) {
                    const itemAmount = Math.floor(Math.random() * 3) + 1;
                    const randomItem = AllItems[Math.floor(Math.random() * AllItems.length)];
                    this.gameManager.addItem(randomItem.id, itemAmount);
                    rewards.itemId = randomItem.id;
                    rewards.itemAmount = itemAmount;
                }
                const goldAmount = Math.floor(Math.random() * 200) + 100;
                this.gameManager.addGold(goldAmount);
                rewards.gold = goldAmount;
                message = `大成功！在${location.name}发现了${material.name}x${amount}！还获得了额外奖励！`;
            }
        }
        else if (success) {
            const rewardType = location.mainReward[0];
            const materials = AllMaterials.filter(m => m.colorType === rewardType);
            if (materials.length > 0) {
                const material = materials[Math.floor(Math.random() * materials.length)];
                const amount = Math.floor(Math.random() * 16) + 5;
                this.gameManager.addMaterial(material.id, amount);
                rewards.materialId = material.id;
                rewards.materialAmount = amount;
                const itemDropChance = 0.25;
                if (Math.random() < itemDropChance) {
                    const itemAmount = Math.floor(Math.random() * 3) + 1;
                    const randomItem = AllItems[Math.floor(Math.random() * AllItems.length)];
                    this.gameManager.addItem(randomItem.id, itemAmount);
                    rewards.itemId = randomItem.id;
                    rewards.itemAmount = itemAmount;
                }
                message = `探索成功！在${location.name}发现了${material.name}x${amount}！`;
            }
        }
        else if (criticalFailure) {
            this.gameManager.useStamina(20);
            failures.staminaLoss = 20;
            const goldLoss = Math.floor(Math.random() * 50) + 30;
            this.gameManager.addGold(-goldLoss);
            failures.goldLoss = goldLoss;
            message = `大失败！在${location.name}遭遇严重挫折，损失惨重！`;
        }
        else {
            if (lossRoll < dangerLossChance) {
                this.gameManager.useStamina(10);
                failures.staminaLoss = 10;
                message = `探索${location.name}失败，损失了一些体力。`;
            }
            else {
                message = `探索${location.name}没有收获，但至少安全返回了。`;
            }
        }
        return {
            success: success,
            criticalSuccess: criticalSuccess,
            criticalFailure: criticalFailure,
            diceRoll: diceRoll,
            userValue: userValue,
            message: message,
            rewards: rewards,
            failures: failures
        };
    }
    getDangerLossChance(danger: string): number {
        switch (danger) {
            case '中等': return 30;
            case '较高': return 45;
            case '高': return 60;
            case '极高': return 75;
            default: return 20;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
