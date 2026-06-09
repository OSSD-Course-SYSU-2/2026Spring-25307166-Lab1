if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IdentityConfirmPage_Params {
    opacityValue?: number;
    showConfirm?: boolean;
    currentPage?: GamePage;
    gameManager?: GameManager;
    timer?: number;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
export class IdentityConfirmPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__opacityValue = new ObservedPropertySimplePU(0, this, "opacityValue");
        this.__showConfirm = new ObservedPropertySimplePU(false, this, "showConfirm");
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.gameManager = GameManager.getInstance();
        this.timer = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IdentityConfirmPage_Params) {
        if (params.opacityValue !== undefined) {
            this.opacityValue = params.opacityValue;
        }
        if (params.showConfirm !== undefined) {
            this.showConfirm = params.showConfirm;
        }
        if (params.gameManager !== undefined) {
            this.gameManager = params.gameManager;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
    }
    updateStateVars(params: IdentityConfirmPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__opacityValue.purgeDependencyOnElmtId(rmElmtId);
        this.__showConfirm.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__opacityValue.aboutToBeDeleted();
        this.__showConfirm.aboutToBeDeleted();
        this.__currentPage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __opacityValue: ObservedPropertySimplePU<number>;
    get opacityValue() {
        return this.__opacityValue.get();
    }
    set opacityValue(newValue: number) {
        this.__opacityValue.set(newValue);
    }
    private __showConfirm: ObservedPropertySimplePU<boolean>;
    get showConfirm() {
        return this.__showConfirm.get();
    }
    set showConfirm(newValue: boolean) {
        this.__showConfirm.set(newValue);
    }
    private __currentPage: SynchedPropertySimpleTwoWayPU<GamePage>;
    get currentPage() {
        return this.__currentPage.get();
    }
    set currentPage(newValue: GamePage) {
        this.__currentPage.set(newValue);
    }
    private gameManager: GameManager;
    private timer: number;
    aboutToAppear() {
        this.startAnimation();
    }
    aboutToDisappear() {
        if (this.timer !== -1) {
            clearTimeout(this.timer);
        }
    }
    startAnimation() {
        this.timer = setTimeout(() => {
            this.opacityValue = 1;
            this.timer = setTimeout(() => {
                this.showConfirm = true;
            }, 2000);
        }, 100);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(Color.Black);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.padding({ left: 40, right: 40 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('身份验证完成');
            Text.fontSize(32);
            Text.fontColor('#FFD700');
            Text.fontWeight(FontWeight.Bold);
            Text.opacity(this.opacityValue);
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`欢迎您，${this.gameManager.getUserState().name}`);
            Text.fontSize(24);
            Text.fontColor(Color.White);
            Text.opacity(this.opacityValue);
            Text.margin({ bottom: 40 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我们已经收到了您的身份证明');
            Text.fontSize(20);
            Text.fontColor('#aaaaaa');
            Text.opacity(this.opacityValue);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('炼金术士集会的大门已为您敞开');
            Text.fontSize(20);
            Text.fontColor('#aaaaaa');
            Text.opacity(this.opacityValue);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showConfirm) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('踏入炼金世界');
                        Button.width('70%');
                        Button.height(60);
                        Button.backgroundColor('#4a90e2');
                        Button.fontSize(20);
                        Button.margin({ top: 60 });
                        Button.onClick(() => {
                            this.currentPage = GamePage.MAIN;
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
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
