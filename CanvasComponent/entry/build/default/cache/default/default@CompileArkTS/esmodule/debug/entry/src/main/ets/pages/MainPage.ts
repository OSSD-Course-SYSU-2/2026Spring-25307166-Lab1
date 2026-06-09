if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    currentPage?: GamePage;
    gameManager?: GameManager;
    screenAdapter?: ScreenAdapter;
    romanNumerals?: string[];
    mysticSymbols?: string[];
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
import { ScreenAdapter } from "@bundle:com.example.canvascomponent/entry/ets/common/utils/ScreenAdapter";
export class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.gameManager = GameManager.getInstance();
        this.screenAdapter = ScreenAdapter.getInstance();
        this.romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
        this.mysticSymbols = ['☽', '☾', '✧', '⚝', '✦', '⬡', '⬢', '◈'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.gameManager !== undefined) {
            this.gameManager = params.gameManager;
        }
        if (params.screenAdapter !== undefined) {
            this.screenAdapter = params.screenAdapter;
        }
        if (params.romanNumerals !== undefined) {
            this.romanNumerals = params.romanNumerals;
        }
        if (params.mysticSymbols !== undefined) {
            this.mysticSymbols = params.mysticSymbols;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
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
    private gameManager: GameManager;
    private screenAdapter: ScreenAdapter;
    private romanNumerals: string[];
    private mysticSymbols: string[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
            Stack.linearGradient({
                angle: 135,
                colors: [['#0a0a1f', 0.0], ['#1a1a2e', 0.5], ['#16213e', 1.0]]
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.MysticBackgroundPattern.bind(this)();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(this.screenAdapter.getPadding());
            Row.backgroundColor('rgba(50, 50, 50, 0.8)');
            Row.borderRadius(10);
            Row.margin({ top: 20, left: 15, right: 15 });
            Row.border({ width: 1, color: 'rgba(255, 215, 0, 0.3)' });
            Row.height(70);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(this.screenAdapter.getImageSize());
            Stack.height(this.screenAdapter.getImageSize());
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.screenAdapter.getImageSize() * 0.8);
            Column.height(this.screenAdapter.getImageSize() * 0.8);
            Column.borderRadius(this.screenAdapter.getImageSize() * 0.4);
            Column.linearGradient({
                angle: 135,
                colors: [['#FF6B6B', 0.0], ['#4ECDC4', 1.0]]
            });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☉');
            Text.fontSize(this.screenAdapter.scaleFont(20));
            Text.fontColor('#FFD700');
        }, Text);
        Text.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 10 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.gameManager.getUserState().name);
            Text.fontSize(this.screenAdapter.scaleFont(16));
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`金币: ${this.gameManager.getUserState().gold}`);
            Text.fontSize(this.screenAdapter.scaleFont(12));
            Text.fontColor('#FFD700');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⚗️');
            Text.fontSize(this.screenAdapter.scaleFont(24));
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.margin({ top: 15 });
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
            Scroll.align(Alignment.Top);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 15, right: 15 });
        }, Column);
        this.FunctionButton.bind(this)('委托', '接受任务，获取奖励', '#8B0000', 'I', () => {
            this.currentPage = GamePage.COMMISSION;
        });
        this.FunctionButton.bind(this)('炼金', '调配材料，铸造法阵', '#4B0082', 'II', () => {
            this.currentPage = GamePage.ALCHEMY;
        });
        this.FunctionButton.bind(this)('图鉴', '查看解锁的材料和物品', '#006400', 'III', () => {
            this.currentPage = GamePage.COLLECTION;
        });
        this.FunctionButton.bind(this)('冒险', '探索危险地点，收集稀有材料', '#B8860B', 'IV', () => {
            this.currentPage = GamePage.ADVENTURE;
        });
        this.FunctionButton.bind(this)('公会', '与NPC交流，接受委托', '#2F4F4F', 'V', () => {
            this.currentPage = GamePage.NPC;
        });
        this.FunctionButton.bind(this)('个人信息', '查看背包和设置', '#483D8B', 'VI', () => {
            this.currentPage = GamePage.USER;
        });
        Column.pop();
        Scroll.pop();
        Column.pop();
        Stack.pop();
    }
    MysticBackgroundPattern(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.justifyContent(FlexAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 60 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☽ ✧ ⚝ ✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡ ◈ ☽');
            Text.fontSize(this.screenAdapter.scaleFont(12));
            Text.fontColor('rgba(255, 215, 0, 0.15)');
            Text.letterSpacing(6);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 25 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⬢ ◈ ☽ ✧ ⚝ ✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡');
            Text.fontSize(this.screenAdapter.scaleFont(12));
            Text.fontColor('rgba(255, 215, 0, 0.12)');
            Text.letterSpacing(6);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 25 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☾ ✧ ⚝ ✦ ⬡ ◈ ☽ ✧ ⚝ ✦ ⬡ ◈ ☾');
            Text.fontSize(this.screenAdapter.scaleFont(12));
            Text.fontColor('rgba(255, 215, 0, 0.15)');
            Text.letterSpacing(6);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 25 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡ ◈ ☽ ✧ ⚝ ✦');
            Text.fontSize(this.screenAdapter.scaleFont(12));
            Text.fontColor('rgba(255, 215, 0, 0.12)');
            Text.letterSpacing(6);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    FunctionButton(title: string, desc: string, color: string, romanNum: string, onClick: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(this.screenAdapter.getCardHeight());
            Column.backgroundColor(color);
            Column.borderRadius(12);
            Column.margin({ bottom: this.screenAdapter.getMargin() });
            Column.border({ width: 1, color: 'rgba(255, 215, 0, 0.2)' });
            Column.onClick(onClick);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height('100%');
            Row.padding({
                left: this.screenAdapter.getPadding(),
                right: this.screenAdapter.getPadding(),
                top: 10,
                bottom: 10
            });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(romanNum);
            Text.fontSize(this.screenAdapter.scaleFont(16));
            Text.fontColor('rgba(255, 215, 0, 0.6)');
            Text.fontWeight(FontWeight.Bold);
            Text.width(30);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.margin({ left: 10, right: 10 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(this.screenAdapter.scaleFont(18));
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(desc);
            Text.fontSize(this.screenAdapter.scaleFont(10));
            Text.fontColor('#aaaaaa');
            Text.margin({ top: 3 });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getRandomSymbol());
            Text.fontSize(this.screenAdapter.scaleFont(18));
            Text.fontColor('rgba(255, 255, 255, 0.3)');
            Text.width(30);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    getRandomSymbol(): string {
        const index = Math.floor(Math.random() * this.mysticSymbols.length);
        return this.mysticSymbols[index];
    }
    rerender() {
        this.updateDirtyElements();
    }
}
