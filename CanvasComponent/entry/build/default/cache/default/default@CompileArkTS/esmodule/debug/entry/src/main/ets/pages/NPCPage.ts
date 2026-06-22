if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NPCPage_Params {
    currentPage?: GamePage;
    selectedNPC?: FixedNPC | null;
    showStory?: boolean;
    showStoryList?: boolean;
    currentStory?: NPCStory | null;
    currentRecipe?: AlchemyRecipe | null;
    selectedSpecialRecipe?: NPCSpecialRecipe | null;
    gameManager?: GameManager;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
import { FixedNPCs, getStoryByTrust, NPCSpecialRecipes } from "@bundle:com.example.canvascomponent/entry/ets/model/NPC";
import type { FixedNPC, NPCStory, NPCSpecialRecipe } from "@bundle:com.example.canvascomponent/entry/ets/model/NPC";
import { AllRecipes } from "@bundle:com.example.canvascomponent/entry/ets/model/AlchemyRecipe";
import type { AlchemyRecipe } from "@bundle:com.example.canvascomponent/entry/ets/model/AlchemyRecipe";
import { NPCAvatar } from "@bundle:com.example.canvascomponent/entry/ets/components/NPCAvatar";
export class NPCPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__selectedNPC = new ObservedPropertyObjectPU(null, this, "selectedNPC");
        this.__showStory = new ObservedPropertySimplePU(false, this, "showStory");
        this.__showStoryList = new ObservedPropertySimplePU(false, this, "showStoryList");
        this.__currentStory = new ObservedPropertyObjectPU(null, this, "currentStory");
        this.__currentRecipe = new ObservedPropertyObjectPU(null, this, "currentRecipe");
        this.__selectedSpecialRecipe = new ObservedPropertyObjectPU(null, this, "selectedSpecialRecipe");
        this.gameManager = GameManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NPCPage_Params) {
        if (params.selectedNPC !== undefined) {
            this.selectedNPC = params.selectedNPC;
        }
        if (params.showStory !== undefined) {
            this.showStory = params.showStory;
        }
        if (params.showStoryList !== undefined) {
            this.showStoryList = params.showStoryList;
        }
        if (params.currentStory !== undefined) {
            this.currentStory = params.currentStory;
        }
        if (params.currentRecipe !== undefined) {
            this.currentRecipe = params.currentRecipe;
        }
        if (params.selectedSpecialRecipe !== undefined) {
            this.selectedSpecialRecipe = params.selectedSpecialRecipe;
        }
        if (params.gameManager !== undefined) {
            this.gameManager = params.gameManager;
        }
    }
    updateStateVars(params: NPCPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedNPC.purgeDependencyOnElmtId(rmElmtId);
        this.__showStory.purgeDependencyOnElmtId(rmElmtId);
        this.__showStoryList.purgeDependencyOnElmtId(rmElmtId);
        this.__currentStory.purgeDependencyOnElmtId(rmElmtId);
        this.__currentRecipe.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedSpecialRecipe.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__selectedNPC.aboutToBeDeleted();
        this.__showStory.aboutToBeDeleted();
        this.__showStoryList.aboutToBeDeleted();
        this.__currentStory.aboutToBeDeleted();
        this.__currentRecipe.aboutToBeDeleted();
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
    private __selectedNPC: ObservedPropertyObjectPU<FixedNPC | null>;
    get selectedNPC() {
        return this.__selectedNPC.get();
    }
    set selectedNPC(newValue: FixedNPC | null) {
        this.__selectedNPC.set(newValue);
    }
    private __showStory: ObservedPropertySimplePU<boolean>;
    get showStory() {
        return this.__showStory.get();
    }
    set showStory(newValue: boolean) {
        this.__showStory.set(newValue);
    }
    private __showStoryList: ObservedPropertySimplePU<boolean>;
    get showStoryList() {
        return this.__showStoryList.get();
    }
    set showStoryList(newValue: boolean) {
        this.__showStoryList.set(newValue);
    }
    private __currentStory: ObservedPropertyObjectPU<NPCStory | null>;
    get currentStory() {
        return this.__currentStory.get();
    }
    set currentStory(newValue: NPCStory | null) {
        this.__currentStory.set(newValue);
    }
    private __currentRecipe: ObservedPropertyObjectPU<AlchemyRecipe | null>;
    get currentRecipe() {
        return this.__currentRecipe.get();
    }
    set currentRecipe(newValue: AlchemyRecipe | null) {
        this.__currentRecipe.set(newValue);
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
            Text.create('炼金术师公会');
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
            If.create();
            if (!this.selectedNPC) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.layoutWeight(1);
                        Column.margin({ top: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const npc = _item;
                            this.NPCCard.bind(this)(npc);
                        };
                        this.forEachUpdateFunction(elmtId, FixedNPCs, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.NPCDetail.bind(this)();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showStory && this.currentStory) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.StoryDialog.bind(this)();
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
            if (this.showStoryList) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.StoryListDialog.bind(this)();
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
                    this.RecipeDetailDialog.bind(this)();
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
    NPCCard(npc: FixedNPC, parent = null) {
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
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new NPCAvatar(this, { npcId: npc.id, avatarSize: 80 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NPCPage.ets", line: 73, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            npcId: npc.id,
                            avatarSize: 80
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        npcId: npc.id, avatarSize: 80
                    });
                }
            }, { name: "NPCAvatar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(npc.name);
            Text.fontSize(20);
            Text.fontColor('#FFD700');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(npc.description);
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
            Text.create(`好感: ${this.getTrust(npc.id)}`);
            Text.fontSize(16);
            Text.fontColor(this.getTrustColor(this.getTrust(npc.id)));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.getTrust(npc.id) >= 20) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('♥');
                        Text.fontSize(20);
                        Text.fontColor('#ff69b4');
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
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(npc.personality);
            Text.fontSize(12);
            Text.fontColor('#888888');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(npc.symbol);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ left: 10 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('交流');
            Button.width('100%');
            Button.height(40);
            Button.backgroundColor('#4a90e2');
            Button.margin({ top: 10 });
            Button.onClick(() => {
                this.selectedNPC = npc;
                this.currentRecipe = this.getRandomRecipe();
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    NPCDetail(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.padding(15);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.onClick(() => {
                this.selectedNPC = null;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedNPC!.name);
            Text.fontSize(24);
            Text.fontColor('#FFD700');
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
            Column.width('90%');
            Column.layoutWeight(1);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new NPCAvatar(this, { npcId: this.selectedNPC!.id, avatarSize: 120 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/NPCPage.ets", line: 156, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            npcId: this.selectedNPC!.id,
                            avatarSize: 120
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        npcId: this.selectedNPC!.id, avatarSize: 120
                    });
                }
            }, { name: "NPCAvatar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedNPC!.description);
            Text.fontSize(16);
            Text.fontColor('#aaaaaa');
            Text.margin({ top: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`好感度: ${this.getTrust(this.selectedNPC!.id)}/100`);
            Text.fontSize(18);
            Text.fontColor(this.getTrustColor(this.getTrust(this.selectedNPC!.id)));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('查看故事');
            Button.height(30);
            Button.backgroundColor('#9c27b0');
            Button.margin({ left: 20 });
            Button.onClick(() => {
                this.currentStory = getStoryByTrust(this.selectedNPC!, this.getTrust(this.selectedNPC!.id));
                if (this.currentStory) {
                    this.showStory = true;
                }
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.getTrust(this.selectedNPC!.id) === 100) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('♥');
                        Text.fontSize(20);
                        Text.fontColor('#ff69b4');
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
            If.create();
            if (this.getTrust(this.selectedNPC!.id) === 100) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('━━━━━━━━━━━━━━━');
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                        Text.margin({ top: 15, bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('已解锁所有故事');
                        Text.fontSize(16);
                        Text.fontColor('#ff69b4');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('查看所有故事');
                        Button.height(35);
                        Button.backgroundColor('#e91e63');
                        Button.margin({ top: 10 });
                        Button.onClick(() => {
                            this.showStoryList = true;
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`任务特点: ${this.selectedNPC!.taskType}`);
            Text.fontSize(14);
            Text.fontColor('#888888');
            Text.margin({ top: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#333333');
            Divider.margin({ top: 20, bottom: 20 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('当前委托');
            Text.fontSize(18);
            Text.fontColor(Color.White);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.QuestPanel.bind(this)();
        Column.pop();
        Column.pop();
    }
    QuestPanel(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('rgba(40, 40, 40, 0.9)');
            Column.borderRadius(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentRecipe) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`需求: ${this.currentRecipe.icon} ${this.currentRecipe.name}`);
                        Text.fontSize(16);
                        Text.fontColor('#ffcc00');
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.currentRecipe.effect);
                        Text.fontSize(14);
                        Text.fontColor('#aaaaaa');
                        Text.margin({ bottom: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`奖励: ${this.calculateReward(ObservedObject.GetRawObject(this.currentRecipe))} 金币`);
                        Text.fontSize(18);
                        Text.fontColor('#FFD700');
                        Text.margin({ bottom: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('接受委托');
                        Button.backgroundColor('#4CAF50');
                        Button.onClick(() => {
                            this.acceptQuest(this.currentRecipe!);
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('拒绝');
                        Button.backgroundColor('#f44336');
                        Button.margin({ left: 20 });
                        Button.onClick(() => {
                            this.selectedNPC = null;
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
    StoryDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.height('70%');
            Column.padding(20);
            Column.backgroundColor('rgba(30, 30, 30, 0.98)');
            Column.borderRadius(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentStory!.title);
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
            Text.create(this.currentStory!.content);
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.textAlign(TextAlign.Center);
            Text.padding({ left: 20, right: 20 });
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentStory!.letter) {
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
                        Text.create(this.currentStory!.letter!);
                        Text.fontSize(14);
                        Text.fontColor('#aaaaaa');
                        Text.padding({ left: 20, right: 20 });
                        Text.lineHeight(22);
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
            if (this.currentStory!.specialRecipe) {
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
                        Text.create('📜 获得特殊配方');
                        Text.fontSize(18);
                        Text.fontColor('#FFD700');
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.getRecipeName(this.currentStory!.specialRecipe!));
                        Button.backgroundColor('#9c27b0');
                        Button.onClick(() => {
                            const recipe = NPCSpecialRecipes.find(r => r.id === this.currentStory!.specialRecipe);
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
            Button.createWithLabel('确定');
            Button.width('60%');
            Button.height(50);
            Button.backgroundColor('#9c27b0');
            Button.margin({ top: 20 });
            Button.onClick(() => {
                this.showStory = false;
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    StoryListDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.height('75%');
            Column.padding(20);
            Column.backgroundColor('rgba(30, 30, 30, 0.98)');
            Column.borderRadius(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.selectedNPC!.name}的故事`);
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
            Column.width('90%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const story = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.padding(15);
                    Column.backgroundColor('rgba(60, 60, 60, 0.8)');
                    Column.borderRadius(8);
                    Column.margin({ bottom: 10 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`第${story.level}阶段`);
                    Text.fontSize(14);
                    Text.fontColor('#888888');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(story.title);
                    Text.fontSize(18);
                    Text.fontColor(Color.White);
                    Text.layoutWeight(1);
                    Text.margin({ left: 10 });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.justifyContent(FlexAlign.End);
                    Row.margin({ top: 10 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (story.letter) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('✉️');
                                Text.fontSize(16);
                                Text.margin({ right: 10 });
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
                    if (story.specialRecipe) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('📜');
                                Text.fontSize(16);
                                Text.margin({ right: 10 });
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
                    Button.createWithLabel('查看详情');
                    Button.height(30);
                    Button.backgroundColor('#4a90e2');
                    Button.onClick(() => {
                        this.currentStory = story;
                        this.showStoryList = false;
                        this.showStory = true;
                    });
                }, Button);
                Button.pop();
                Row.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.selectedNPC!.stories, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.width('60%');
            Button.height(50);
            Button.backgroundColor('#666666');
            Button.margin({ top: 20 });
            Button.onClick(() => {
                this.showStoryList = false;
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    RecipeDetailDialog(parent = null) {
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
    getTrust(npcId: string): number {
        const relationships = this.gameManager.getUserState().npcRelationships;
        const relationship = relationships.get(npcId);
        return relationship ? relationship.trust : 0;
    }
    getTrustColor(trust: number): string {
        if (trust < 20)
            return '#888888';
        if (trust < 40)
            return '#aaaaaa';
        if (trust < 60)
            return '#ffcc00';
        if (trust < 80)
            return '#ff9900';
        return '#ff69b4';
    }
    getRandomRecipe(): AlchemyRecipe | null {
        const recipes = AllRecipes.filter(r => r.id !== 'magicless_water');
        return recipes[Math.floor(Math.random() * recipes.length)];
    }
    calculateReward(recipe: AlchemyRecipe): number {
        const baseReward = (recipe.rewardRange[0] + recipe.rewardRange[1]) / 2;
        const trust = this.getTrust(this.selectedNPC!.id);
        const trustBonus = 1 + (trust / 100) * 0.5;
        return Math.floor(baseReward * trustBonus);
    }
    acceptQuest(recipe: AlchemyRecipe) {
        this.addTrust(this.selectedNPC!.id, 5);
        const reward = this.calculateReward(recipe);
        this.gameManager.addGold(reward);
        this.selectedNPC = null;
    }
    addTrust(npcId: string, amount: number) {
        const state = this.gameManager.getUserState();
        let relationship = state.npcRelationships.get(npcId);
        if (!relationship) {
            relationship = {
                npcId: npcId,
                trust: 0,
                completedTasks: 0,
                currentTask: null
            };
            state.npcRelationships.set(npcId, relationship);
        }
        relationship.trust = Math.min(100, relationship.trust + amount);
        relationship.completedTasks++;
    }
    getRecipeName(recipeId: string): string {
        const recipe = NPCSpecialRecipes.find(r => r.id === recipeId);
        return recipe ? `${recipe.icon} ${recipe.name}` : recipeId;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
