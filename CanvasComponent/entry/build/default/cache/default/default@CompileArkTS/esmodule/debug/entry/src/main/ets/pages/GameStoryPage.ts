if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GameStoryPage_Params {
    currentPage?: GamePage;
    currentLine?: number;
    storyLines?: string[];
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
export class GameStoryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__currentLine = new ObservedPropertySimplePU(0, this, "currentLine");
        this.storyLines = [
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
            '☽ ✧ ⚝ ✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡ ◈ ☽',
            '',
            '隐秘的炼金术士集会',
            '',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
            '是的，我接收到了您的神秘符号。',
            '',
            '新手炼金师，欢迎加入我们的行列。',
            '',
            '在这个被遗忘的世界里，炼金术并非简单的物质转换，',
            '而是连接现实与神秘维度的桥梁。',
            '',
            '我们，隐秘的炼金术士集会，',
            '守护着古老的知识与禁忌的配方。',
            '',
            '☽ ✧ ⚝ ✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡ ◈ ☽',
            '',
            '作为新手炼金师，你将学习：',
            '',
            '✧ 调配材料，掌握颜色与能量的共鸣',
            '✧ 铸造法阵，引导元素的流动',
            '✧ 探索危险之地，收集稀有的素材',
            '✧ 与神秘NPC交流，获取古老配方',
            '✧ 完成委托，积累声望与财富',
            '',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
            '但请记住，年轻的炼金师...',
            '',
            '每一次炼金都是与未知的契约。',
            '材料的配比、法阵的选择、时机的把握...',
            '任何疏忽都可能带来不可预知的后果。',
            '',
            '有些配方被封印了数百年，',
            '有些材料只存在于深渊的边缘，',
            '有些法阵能召唤出超越理解的存在...',
            '',
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━',
            '',
            '现在，拿起你的坩埚，点燃炉火。',
            '',
            '炼金的世界，等待你的探索。',
            '',
            '☽ ✧ ⚝ ✦ ⬡ ◈ ☾ ✧ ⚝ ✦ ⬡ ◈ ☽',
            '',
            '愿神秘之力与你同在。'
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GameStoryPage_Params) {
        if (params.currentLine !== undefined) {
            this.currentLine = params.currentLine;
        }
        if (params.storyLines !== undefined) {
            this.storyLines = params.storyLines;
        }
    }
    updateStateVars(params: GameStoryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__currentLine.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__currentLine.aboutToBeDeleted();
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
    private __currentLine: ObservedPropertySimplePU<number>;
    get currentLine() {
        return this.__currentLine.get();
    }
    set currentLine(newValue: number) {
        this.__currentLine.set(newValue);
    }
    private storyLines: string[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(Color.Black);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 30, right: 30, top: 40, bottom: 40 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const line = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(line);
                    Text.fontSize(this.getFontSize(line));
                    Text.fontColor(this.getFontColor(line));
                    Text.fontWeight(this.getFontWeight(line));
                    Text.textAlign(TextAlign.Center);
                    Text.margin({ top: this.getMarginTop(line) });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.storyLines, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ bottom: 50 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('开始炼金之旅');
            Button.width('80%');
            Button.height(60);
            Button.fontSize(20);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('rgba(255, 215, 0, 0.3)');
            Button.border({ width: 2, color: '#FFD700' });
            Button.borderRadius(30);
            Button.onClick(() => {
                this.currentPage = GamePage.MAIN;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☽ ☾ ✧ ⚝ ✦ ⬡ ◈');
            Text.fontSize(14);
            Text.fontColor('rgba(255, 215, 0, 0.4)');
            Text.margin({ top: 15 });
        }, Text);
        Text.pop();
        Column.pop();
        Column.pop();
        Column.pop();
    }
    getFontSize(line: string): number {
        if (line.includes('━━━━'))
            return 12;
        if (line.includes('☽ ✧ ⚝'))
            return 14;
        if (line.includes('隐秘的炼金术士集会'))
            return 28;
        if (line.includes('新手炼金师'))
            return 20;
        if (line.includes('作为新手炼金师'))
            return 18;
        if (line.includes('开始炼金之旅'))
            return 16;
        if (line.includes('但请记住'))
            return 18;
        if (line.includes('愿神秘之力'))
            return 16;
        if (line.startsWith('✧'))
            return 15;
        return 16;
    }
    getFontColor(line: string): string {
        if (line.includes('━━━━'))
            return 'rgba(255, 215, 0, 0.5)';
        if (line.includes('☽ ✧ ⚝'))
            return 'rgba(255, 215, 0, 0.6)';
        if (line.includes('隐秘的炼金术士集会'))
            return '#FFD700';
        if (line.includes('新手炼金师'))
            return '#FFD700';
        if (line.includes('作为新手炼金师'))
            return '#88ccff';
        if (line.includes('但请记住'))
            return '#ff9966';
        if (line.includes('愿神秘之力'))
            return '#FFD700';
        if (line.startsWith('✧'))
            return '#aaddff';
        return '#cccccc';
    }
    getFontWeight(line: string): FontWeight {
        if (line.includes('隐秘的炼金术士集会'))
            return FontWeight.Bold;
        if (line.includes('新手炼金师'))
            return FontWeight.Bold;
        if (line.includes('作为新手炼金师'))
            return FontWeight.Bold;
        if (line.includes('但请记住'))
            return FontWeight.Bold;
        return FontWeight.Normal;
    }
    getMarginTop(line: string): number {
        if (line === '')
            return 10;
        if (line.includes('隐秘的炼金术士集会'))
            return 20;
        if (line.includes('新手炼金师'))
            return 15;
        if (line.includes('作为新手炼金师'))
            return 25;
        if (line.includes('但请记住'))
            return 25;
        if (line.includes('开始炼金之旅'))
            return 20;
        if (line.includes('愿神秘之力'))
            return 20;
        return 5;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
