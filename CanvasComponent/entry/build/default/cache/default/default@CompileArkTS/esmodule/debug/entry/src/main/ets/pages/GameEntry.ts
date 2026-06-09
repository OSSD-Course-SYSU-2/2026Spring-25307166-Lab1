if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GameEntry_Params {
    currentPage?: GamePage;
    avatarImage?: string;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { IntroPage } from "@bundle:com.example.canvascomponent/entry/ets/pages/IntroPage";
import { NameInputPage } from "@bundle:com.example.canvascomponent/entry/ets/pages/NameInputPage";
import { GameStoryPage } from "@bundle:com.example.canvascomponent/entry/ets/pages/GameStoryPage";
import { MainPage } from "@bundle:com.example.canvascomponent/entry/ets/pages/MainPage";
import { CommissionPage } from "@bundle:com.example.canvascomponent/entry/ets/pages/CommissionPage";
import { AlchemyPage } from "@bundle:com.example.canvascomponent/entry/ets/pages/AlchemyPage";
import { FormationWheelPage } from "@bundle:com.example.canvascomponent/entry/ets/pages/FormationWheelPage";
import { CollectionPage } from "@bundle:com.example.canvascomponent/entry/ets/pages/CollectionPage";
import { AdventurePage } from "@bundle:com.example.canvascomponent/entry/ets/pages/AdventurePage";
import { NPCPage } from "@bundle:com.example.canvascomponent/entry/ets/pages/NPCPage";
import { UserPage } from "@bundle:com.example.canvascomponent/entry/ets/pages/UserPage";
class GameEntry extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new ObservedPropertySimplePU(GamePage.INTRO, this, "currentPage");
        this.__avatarImage = new ObservedPropertySimplePU('', this, "avatarImage");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GameEntry_Params) {
        if (params.currentPage !== undefined) {
            this.currentPage = params.currentPage;
        }
        if (params.avatarImage !== undefined) {
            this.avatarImage = params.avatarImage;
        }
    }
    updateStateVars(params: GameEntry_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__avatarImage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__avatarImage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentPage: ObservedPropertySimplePU<GamePage>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: GamePage) {
        this.__currentPage.set(newValue);
    }
    private __avatarImage: ObservedPropertySimplePU<string>;
    get avatarImage() {
        return this.__avatarImage.get();
    }
    set avatarImage(newValue: string) {
        this.__avatarImage.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentPage === GamePage.INTRO) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IntroPage(this, { currentPage: this.__currentPage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 23, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "IntroPage" });
                    }
                });
            }
            else if (this.currentPage === GamePage.NAME_INPUT) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new NameInputPage(this, { currentPage: this.__currentPage, avatarImage: this.__avatarImage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 25, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage,
                                        avatarImage: this.avatarImage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "NameInputPage" });
                    }
                });
            }
            else if (this.currentPage === GamePage.GAME_STORY) {
                this.ifElseBranchUpdateFunction(2, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new GameStoryPage(this, { currentPage: this.__currentPage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 27, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "GameStoryPage" });
                    }
                });
            }
            else if (this.currentPage === GamePage.MAIN) {
                this.ifElseBranchUpdateFunction(3, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new MainPage(this, { currentPage: this.__currentPage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 29, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "MainPage" });
                    }
                });
            }
            else if (this.currentPage === GamePage.COMMISSION) {
                this.ifElseBranchUpdateFunction(4, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CommissionPage(this, { currentPage: this.__currentPage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 31, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "CommissionPage" });
                    }
                });
            }
            else if (this.currentPage === GamePage.ALCHEMY) {
                this.ifElseBranchUpdateFunction(5, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new AlchemyPage(this, { currentPage: this.__currentPage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 33, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "AlchemyPage" });
                    }
                });
            }
            else if (this.currentPage === GamePage.FORMATION_WHEEL) {
                this.ifElseBranchUpdateFunction(6, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new FormationWheelPage(this, { currentPage: this.__currentPage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 35, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "FormationWheelPage" });
                    }
                });
            }
            else if (this.currentPage === GamePage.COLLECTION) {
                this.ifElseBranchUpdateFunction(7, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new CollectionPage(this, { currentPage: this.__currentPage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 37, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "CollectionPage" });
                    }
                });
            }
            else if (this.currentPage === GamePage.USER) {
                this.ifElseBranchUpdateFunction(8, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new UserPage(this, { currentPage: this.__currentPage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 39, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "UserPage" });
                    }
                });
            }
            else if (this.currentPage === GamePage.ADVENTURE) {
                this.ifElseBranchUpdateFunction(9, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new AdventurePage(this, { currentPage: this.__currentPage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 41, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "AdventurePage" });
                    }
                });
            }
            else if (this.currentPage === GamePage.NPC) {
                this.ifElseBranchUpdateFunction(10, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new NPCPage(this, { currentPage: this.__currentPage }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GameEntry.ets", line: 43, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        currentPage: this.currentPage
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "NPCPage" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(11, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "GameEntry";
    }
}
registerNamedRoute(() => new GameEntry(undefined, {}), "", { bundleName: "com.example.canvascomponent", moduleName: "entry", pagePath: "pages/GameEntry", pageFullPath: "entry/src/main/ets/pages/GameEntry", integratedHsp: "false", moduleType: "followWithHap" });
