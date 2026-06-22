if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CommissionPage_Params {
    currentPage?: GamePage;
    commissions?: Commission[];
    selectedCommission?: Commission | null;
    showDialog?: boolean;
    currentTab?: number;
    showMerchant?: boolean;
    merchantItems?: ShopItem[];
    merchantMessage?: string;
    gameManager?: GameManager;
    npcNames?: string[];
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import type { Commission } from '../model/GameState';
import { AllMaterials, getMaterialById } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import type { MaterialData } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
import { AllItems, getItemById } from "@bundle:com.example.canvascomponent/entry/ets/model/Item";
import { MaterialColors } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { MaterialPatternDrawer } from "@bundle:com.example.canvascomponent/entry/ets/common/utils/MaterialPatternDrawer";
interface ShopItem {
    type: 'material' | 'item';
    id: string;
    price: number;
    amount: number;
}
export class CommissionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__commissions = new ObservedPropertyObjectPU([], this, "commissions");
        this.__selectedCommission = new ObservedPropertyObjectPU(null, this, "selectedCommission");
        this.__showDialog = new ObservedPropertySimplePU(false, this, "showDialog");
        this.__currentTab = new ObservedPropertySimplePU(0, this, "currentTab");
        this.__showMerchant = new ObservedPropertySimplePU(false, this, "showMerchant");
        this.__merchantItems = new ObservedPropertyObjectPU([], this, "merchantItems");
        this.__merchantMessage = new ObservedPropertySimplePU('', this, "merchantMessage");
        this.gameManager = GameManager.getInstance();
        this.npcNames = ['炼金商人', '古老法师', '神秘旅者', '药剂大师', '元素使者'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CommissionPage_Params) {
        if (params.commissions !== undefined) {
            this.commissions = params.commissions;
        }
        if (params.selectedCommission !== undefined) {
            this.selectedCommission = params.selectedCommission;
        }
        if (params.showDialog !== undefined) {
            this.showDialog = params.showDialog;
        }
        if (params.currentTab !== undefined) {
            this.currentTab = params.currentTab;
        }
        if (params.showMerchant !== undefined) {
            this.showMerchant = params.showMerchant;
        }
        if (params.merchantItems !== undefined) {
            this.merchantItems = params.merchantItems;
        }
        if (params.merchantMessage !== undefined) {
            this.merchantMessage = params.merchantMessage;
        }
        if (params.gameManager !== undefined) {
            this.gameManager = params.gameManager;
        }
        if (params.npcNames !== undefined) {
            this.npcNames = params.npcNames;
        }
    }
    updateStateVars(params: CommissionPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__commissions.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCommission.purgeDependencyOnElmtId(rmElmtId);
        this.__showDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTab.purgeDependencyOnElmtId(rmElmtId);
        this.__showMerchant.purgeDependencyOnElmtId(rmElmtId);
        this.__merchantItems.purgeDependencyOnElmtId(rmElmtId);
        this.__merchantMessage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__commissions.aboutToBeDeleted();
        this.__selectedCommission.aboutToBeDeleted();
        this.__showDialog.aboutToBeDeleted();
        this.__currentTab.aboutToBeDeleted();
        this.__showMerchant.aboutToBeDeleted();
        this.__merchantItems.aboutToBeDeleted();
        this.__merchantMessage.aboutToBeDeleted();
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
    private __commissions: ObservedPropertyObjectPU<Commission[]>;
    get commissions() {
        return this.__commissions.get();
    }
    set commissions(newValue: Commission[]) {
        this.__commissions.set(newValue);
    }
    private __selectedCommission: ObservedPropertyObjectPU<Commission | null>;
    get selectedCommission() {
        return this.__selectedCommission.get();
    }
    set selectedCommission(newValue: Commission | null) {
        this.__selectedCommission.set(newValue);
    }
    private __showDialog: ObservedPropertySimplePU<boolean>;
    get showDialog() {
        return this.__showDialog.get();
    }
    set showDialog(newValue: boolean) {
        this.__showDialog.set(newValue);
    }
    private __currentTab: ObservedPropertySimplePU<number>;
    get currentTab() {
        return this.__currentTab.get();
    }
    set currentTab(newValue: number) {
        this.__currentTab.set(newValue);
    }
    private __showMerchant: ObservedPropertySimplePU<boolean>;
    get showMerchant() {
        return this.__showMerchant.get();
    }
    set showMerchant(newValue: boolean) {
        this.__showMerchant.set(newValue);
    }
    private __merchantItems: ObservedPropertyObjectPU<ShopItem[]>;
    get merchantItems() {
        return this.__merchantItems.get();
    }
    set merchantItems(newValue: ShopItem[]) {
        this.__merchantItems.set(newValue);
    }
    private __merchantMessage: ObservedPropertySimplePU<string>;
    get merchantMessage() {
        return this.__merchantMessage.get();
    }
    set merchantMessage(newValue: string) {
        this.__merchantMessage.set(newValue);
    }
    private gameManager: GameManager;
    private npcNames: string[];
    aboutToAppear() {
        this.generateCommissions();
        this.checkMerchant();
    }
    checkMerchant() {
        const merchantChance = Math.random() * 100;
        if (merchantChance >= 20) {
            this.showMerchant = true;
            this.generateMerchantItems();
        }
        else {
            this.showMerchant = false;
            this.merchantMessage = '今天商人没有出摊';
        }
    }
    generateMerchantItems() {
        this.merchantItems = [];
        const materialCount = Math.floor(Math.random() * 4) + 3;
        for (let i = 0; i < materialCount; i++) {
            const material = AllMaterials[Math.floor(Math.random() * AllMaterials.length)];
            const rarity = material.difficulty;
            let basePrice = 30;
            if (rarity === '中等')
                basePrice = 50;
            else if (rarity === '较高')
                basePrice = 80;
            else if (rarity === '高')
                basePrice = 120;
            else if (rarity === '极高')
                basePrice = 200;
            const price = basePrice + Math.floor(Math.random() * 30);
            const amount = Math.floor(Math.random() * 5) + 3;
            this.merchantItems.push({
                type: 'material',
                id: material.id,
                price: price,
                amount: amount
            });
        }
        const itemCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < itemCount; i++) {
            const item = AllItems[Math.floor(Math.random() * AllItems.length)];
            const rarity = item.rarity;
            let basePrice = 50;
            if (rarity === 'rare')
                basePrice = 150;
            else if (rarity === 'epic')
                basePrice = 400;
            else if (rarity === 'legendary')
                basePrice = 1000;
            const price = basePrice + Math.floor(Math.random() * 100);
            const amount = Math.floor(Math.random() * 2) + 1;
            this.merchantItems.push({
                type: 'item',
                id: item.id,
                price: price,
                amount: amount
            });
        }
    }
    generateCommissions() {
        this.commissions = [];
        const numCommissions = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < numCommissions; i++) {
            const material = AllMaterials[Math.floor(Math.random() * AllMaterials.length)];
            const commission: Commission = {
                id: `commission_${Date.now()}_${i}`,
                npcName: this.npcNames[Math.floor(Math.random() * this.npcNames.length)],
                requiredItem: material.id,
                requiredAmount: Math.floor(Math.random() * 5) + 1,
                reward: (Math.floor(Math.random() * 100) + 50) * 10,
                description: `需要${material.name}用于炼金实验`,
                deadline: Date.now() + 7 * 24 * 60 * 60 * 1000,
                isAccepted: false,
                isCompleted: false
            };
            this.commissions.push(commission);
        }
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
            Text.create('📜 委托板 📜');
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
            Button.createWithLabel('刷新');
            Button.height(30);
            Button.onClick(() => {
                this.generateCommissions();
                this.checkMerchant();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☾');
            Text.fontSize(12);
            Text.fontColor('rgba(255, 215, 0, 0.5)');
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('可接委托');
            Button.backgroundColor(this.currentTab === 0 ? '#4a90e2' : '#666666');
            Button.onClick(() => {
                this.currentTab = 0;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('已接委托');
            Button.backgroundColor(this.currentTab === 1 ? '#4a90e2' : '#666666');
            Button.onClick(() => {
                this.currentTab = 1;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('商人区');
            Button.backgroundColor(this.currentTab === 2 ? '#4a90e2' : '#666666');
            Button.onClick(() => {
                this.currentTab = 2;
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('90%');
            Scroll.layoutWeight(1);
            Scroll.margin({ top: 20 });
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
                            const commission = _item;
                            this.CommissionCard.bind(this)(commission);
                        };
                        this.forEachUpdateFunction(elmtId, this.commissions, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else if (this.currentTab === 1) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const commission = _item;
                            this.AcceptedCommissionCard.bind(this)(commission);
                        };
                        this.forEachUpdateFunction(elmtId, this.gameManager.getUserState().acceptedCommissions, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.gameManager.getUserState().acceptedCommissions.length === 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('暂无已接受的委托');
                                    Text.fontSize(16);
                                    Text.fontColor('#aaaaaa');
                                    Text.margin({ top: 50 });
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
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.MerchantArea.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    CommissionCard(commission: Commission, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('rgba(50, 50, 50, 0.9)');
            Column.borderRadius(10);
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(commission.npcName);
            Text.fontSize(20);
            Text.fontColor('#FFD700');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (commission.isAccepted && !commission.isCompleted) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('进行中');
                        Text.fontSize(14);
                        Text.fontColor('#4CAF50');
                        Text.margin({ left: 10 });
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
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(commission.description);
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.margin({ top: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`需要: ${this.getMaterialName(commission.requiredItem)} x${commission.requiredAmount}`);
            Text.fontSize(14);
            Text.fontColor('#aaaaaa');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`奖励: ${commission.reward}金币`);
            Text.fontSize(14);
            Text.fontColor('#FFD700');
            Text.margin({ left: 20 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!commission.isAccepted) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.justifyContent(FlexAlign.End);
                        Row.margin({ top: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('接受');
                        Button.backgroundColor('#4CAF50');
                        Button.onClick(() => {
                            this.gameManager.acceptCommission(commission);
                            this.commissions = this.commissions.filter(c => c.id !== commission.id);
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('拒绝');
                        Button.backgroundColor('#f44336');
                        Button.margin({ left: 20 });
                        Button.onClick(() => {
                            this.commissions = this.commissions.filter(c => c.id !== commission.id);
                        });
                    }, Button);
                    Button.pop();
                    Row.pop();
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
    AcceptedCommissionCard(commission: Commission, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('rgba(50, 50, 50, 0.9)');
            Column.borderRadius(10);
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(commission.npcName);
            Text.fontSize(20);
            Text.fontColor('#FFD700');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (commission.isCompleted) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('已完成');
                        Text.fontSize(14);
                        Text.fontColor('#4CAF50');
                        Text.margin({ left: 10 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.getTimeRemaining(commission.deadline));
                        Text.fontSize(14);
                        Text.fontColor(this.getTimeColor(commission.deadline));
                        Text.margin({ left: 10 });
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(commission.description);
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.margin({ top: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`需要: ${this.getMaterialName(commission.requiredItem)} x${commission.requiredAmount}`);
            Text.fontSize(14);
            Text.fontColor('#aaaaaa');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`奖励: ${commission.reward}金币`);
            Text.fontSize(14);
            Text.fontColor('#FFD700');
            Text.margin({ left: 20 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!commission.isCompleted) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.justifyContent(FlexAlign.End);
                        Row.margin({ top: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('提交');
                        Button.backgroundColor(this.canComplete(commission) ? '#4CAF50' : '#666666');
                        Button.enabled(this.canComplete(commission));
                        Button.onClick(() => {
                            this.completeCommission(commission);
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('放弃');
                        Button.backgroundColor('#f44336');
                        Button.margin({ left: 20 });
                        Button.onClick(() => {
                            this.abandonCommission(commission);
                        });
                    }, Button);
                    Button.pop();
                    Row.pop();
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
    getMaterialName(id: string): string {
        const material = AllMaterials.find((m: MaterialData) => m.id === id);
        return material ? material.name : '未知材料';
    }
    getTimeRemaining(deadline: number): string {
        const remaining = deadline - Date.now();
        if (remaining <= 0)
            return '已超时';
        const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
        const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        if (days > 0)
            return `剩余${days}天${hours}时`;
        if (hours > 0)
            return `剩余${hours}小时`;
        return '即将超时';
    }
    getTimeColor(deadline: number): string {
        const remaining = deadline - Date.now();
        const days = remaining / (24 * 60 * 60 * 1000);
        if (days <= 0)
            return '#ff3333';
        if (days <= 1)
            return '#ff9900';
        if (days <= 3)
            return '#ffcc00';
        return '#4CAF50';
    }
    canComplete(commission: Commission): boolean {
        return this.gameManager.getMaterialCount(commission.requiredItem) >= commission.requiredAmount;
    }
    completeCommission(commission: Commission) {
        this.gameManager.useMaterial(commission.requiredItem, commission.requiredAmount);
        this.gameManager.completeCommission(commission.id);
    }
    abandonCommission(commission: Commission) {
        const userState = this.gameManager.getUserState();
        userState.acceptedCommissions = userState.acceptedCommissions.filter(c => c.id !== commission.id);
        const penalty = Math.floor(commission.reward * 0.2);
        this.gameManager.addGold(-penalty);
    }
    MerchantArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showMerchant) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('🏪 神秘商人 🏪');
                        Text.fontSize(20);
                        Text.fontColor('#FFD700');
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ top: 20, bottom: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`金币: ${this.gameManager.getUserState().gold}`);
                        Text.fontSize(16);
                        Text.fontColor('#FFD700');
                        Text.margin({ bottom: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('售卖物品:');
                        Text.fontSize(16);
                        Text.fontColor('#aaaaaa');
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const shopItem = _item;
                            this.ShopItemCard.bind(this)(shopItem);
                        };
                        this.forEachUpdateFunction(elmtId, this.merchantItems, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('🏪');
                        Text.fontSize(60);
                        Text.margin({ top: 50 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.merchantMessage);
                        Text.fontSize(18);
                        Text.fontColor('#aaaaaa');
                        Text.margin({ top: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('商人可能明天会来，请明天再来看看吧。');
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                        Text.margin({ top: 10 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    ShopItemCard(shopItem: ShopItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(10);
            Row.backgroundColor('rgba(50, 50, 50, 0.9)');
            Row.borderRadius(8);
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (shopItem.type === 'material') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(50);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.width(40);
                        Stack.height(40);
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Canvas.create(new CanvasRenderingContext2D(new RenderingContextSettings(true)));
                        Canvas.width(40);
                        Canvas.height(40);
                        Canvas.onReady(() => {
                            const material = getMaterialById(shopItem.id);
                            if (material) {
                                let ctx = new CanvasRenderingContext2D(new RenderingContextSettings(true));
                                ctx.clearRect(0, 0, 40, 40);
                                const color = MaterialColors[material.colorType];
                                ctx.fillStyle = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
                                ctx.beginPath();
                                ctx.arc(20, 20, 18, 0, Math.PI * 2);
                                ctx.fill();
                                MaterialPatternDrawer.drawPattern(ctx, shopItem.id, 20, 20, 15);
                            }
                        });
                    }, Canvas);
                    Canvas.pop();
                    Stack.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.getItemIcon(shopItem.id));
                        Text.fontSize(32);
                        Text.width(50);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (shopItem.type === 'material') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(getMaterialById(shopItem.id)?.name || '未知');
                        Text.fontSize(14);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(getItemById(shopItem.id)?.name || '未知');
                        Text.fontSize(14);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`数量: ${shopItem.amount}`);
            Text.fontSize(12);
            Text.fontColor('#aaaaaa');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(80);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`💰${shopItem.price}`);
            Text.fontSize(14);
            Text.fontColor('#FFD700');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('购买');
            Button.fontSize(12);
            Button.height(30);
            Button.backgroundColor(this.canBuy(shopItem) ? '#4CAF50' : '#666666');
            Button.enabled(this.canBuy(shopItem));
            Button.onClick(() => {
                this.buyItem(shopItem);
            });
        }, Button);
        Button.pop();
        Column.pop();
        Row.pop();
    }
    getItemIcon(itemId: string): string {
        const item = getItemById(itemId);
        return item ? item.icon : '📦';
    }
    canBuy(shopItem: ShopItem): boolean {
        return this.gameManager.getUserState().gold >= shopItem.price;
    }
    buyItem(shopItem: ShopItem) {
        if (!this.canBuy(shopItem))
            return;
        this.gameManager.addGold(-shopItem.price);
        if (shopItem.type === 'material') {
            this.gameManager.addMaterial(shopItem.id, shopItem.amount);
        }
        else {
            this.gameManager.addItem(shopItem.id, shopItem.amount);
        }
        this.merchantItems = this.merchantItems.filter(item => item !== shopItem);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
