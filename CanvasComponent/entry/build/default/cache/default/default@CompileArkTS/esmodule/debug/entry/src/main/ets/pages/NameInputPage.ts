if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NameInputPage_Params {
    userName?: string;
    showError?: boolean;
    currentPage?: GamePage;
    avatarImage?: string;
    gameManager?: GameManager;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
export class NameInputPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__userName = new ObservedPropertySimplePU('', this, "userName");
        this.__showError = new ObservedPropertySimplePU(false, this, "showError");
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__avatarImage = new SynchedPropertySimpleTwoWayPU(params.avatarImage, this, "avatarImage");
        this.gameManager = GameManager.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NameInputPage_Params) {
        if (params.userName !== undefined) {
            this.userName = params.userName;
        }
        if (params.showError !== undefined) {
            this.showError = params.showError;
        }
        if (params.gameManager !== undefined) {
            this.gameManager = params.gameManager;
        }
    }
    updateStateVars(params: NameInputPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userName.purgeDependencyOnElmtId(rmElmtId);
        this.__showError.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__avatarImage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__userName.aboutToBeDeleted();
        this.__showError.aboutToBeDeleted();
        this.__currentPage.aboutToBeDeleted();
        this.__avatarImage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __userName: ObservedPropertySimplePU<string>;
    get userName() {
        return this.__userName.get();
    }
    set userName(newValue: string) {
        this.__userName.set(newValue);
    }
    private __showError: ObservedPropertySimplePU<boolean>;
    get showError() {
        return this.__showError.get();
    }
    set showError(newValue: boolean) {
        this.__showError.set(newValue);
    }
    private __currentPage: SynchedPropertySimpleTwoWayPU<GamePage>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: GamePage) {
        this.__currentPage.set(newValue);
    }
    private __avatarImage: SynchedPropertySimpleTwoWayPU<string>;
    get avatarImage() {
        return this.__avatarImage.get();
    }
    set avatarImage(newValue: string) {
        this.__avatarImage.set(newValue);
    }
    private gameManager: GameManager;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#000000');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('创建角色');
            Text.fontSize(32);
            Text.fontColor('#FFD700');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 80, bottom: 30 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(120);
            Column.height(120);
            Column.borderRadius(60);
            Column.linearGradient({
                angle: 135,
                colors: [['#FF6B6B', 0.0], ['#4ECDC4', 1.0]]
            });
            Column.margin({ bottom: 30 });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('请输入您的名字');
            Text.fontSize(18);
            Text.fontColor('#aaaaaa');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '炼金术士之名' });
            TextInput.width('70%');
            TextInput.height(50);
            TextInput.backgroundColor('#2a2a2a');
            TextInput.fontColor(Color.White);
            TextInput.borderRadius(10);
            TextInput.margin({ bottom: 20 });
            TextInput.onChange((value: string) => {
                this.userName = value;
                this.showError = false;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showError) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('请输入您的名字');
                        Text.fontSize(16);
                        Text.fontColor('#ff4444');
                        Text.margin({ bottom: 20 });
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
            Button.createWithLabel('开始冒险');
            Button.width('60%');
            Button.height(60);
            Button.fontSize(20);
            Button.fontColor(Color.White);
            Button.backgroundColor(this.userName.trim().length > 0 ? '#4CAF50' : '#666666');
            Button.borderRadius(15);
            Button.enabled(this.userName.trim().length > 0);
            Button.onClick(() => {
                if (this.userName.trim().length > 0) {
                    this.gameManager.setUserName(this.userName.trim());
                    this.currentPage = GamePage.GAME_STORY;
                }
                else {
                    this.showError = true;
                }
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
