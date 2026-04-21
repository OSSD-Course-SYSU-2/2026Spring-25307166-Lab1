if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Danmaku_Params {
    danmakuList?: DanmakuItem[];
    containerWidth?: number;
    currentProgress?: number;
    updateFlag?: number;
    animationTimer?: number;
    lastUpdateTime?: number;
    isComponentActive?: boolean;
}
import { DanmakuItem } from "@bundle:com.example.simplevideo/entry/ets/common/bean/DanmakuItem";
const DANMAKU_SPEED = 100; // 弹幕移动速度（像素/秒）
const DANMAKU_DURATION = 8000; // 弹幕显示时长（毫秒）
const DANMAKU_LINE_HEIGHT = 40; // 每行弹幕高度（增加行高避免重叠）
const MAX_DANMAKU_LINES = 6; // 最大弹幕行数（减少行数适应不同屏幕）
export class Danmaku extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__danmakuList = new SynchedPropertyObjectTwoWayPU(params.danmakuList, this, "danmakuList");
        this.__containerWidth = new SynchedPropertySimpleOneWayPU(params.containerWidth, this, "containerWidth");
        this.__currentProgress = new SynchedPropertySimpleOneWayPU(params.currentProgress, this, "currentProgress");
        this.__updateFlag = new ObservedPropertySimplePU(0, this, "updateFlag");
        this.animationTimer = -1;
        this.lastUpdateTime = 0;
        this.isComponentActive = false;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Danmaku_Params) {
        if (params.containerWidth === undefined) {
            this.__containerWidth.set(1080);
        }
        if (params.currentProgress === undefined) {
            this.__currentProgress.set(0);
        }
        if (params.updateFlag !== undefined) {
            this.updateFlag = params.updateFlag;
        }
        if (params.animationTimer !== undefined) {
            this.animationTimer = params.animationTimer;
        }
        if (params.lastUpdateTime !== undefined) {
            this.lastUpdateTime = params.lastUpdateTime;
        }
        if (params.isComponentActive !== undefined) {
            this.isComponentActive = params.isComponentActive;
        }
    }
    updateStateVars(params: Danmaku_Params) {
        this.__containerWidth.reset(params.containerWidth);
        this.__currentProgress.reset(params.currentProgress);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__danmakuList.purgeDependencyOnElmtId(rmElmtId);
        this.__containerWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__currentProgress.purgeDependencyOnElmtId(rmElmtId);
        this.__updateFlag.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__danmakuList.aboutToBeDeleted();
        this.__containerWidth.aboutToBeDeleted();
        this.__currentProgress.aboutToBeDeleted();
        this.__updateFlag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __danmakuList: SynchedPropertySimpleOneWayPU<DanmakuItem[]>;
    get danmakuList() {
        return this.__danmakuList.get();
    }
    set danmakuList(newValue: DanmakuItem[]) {
        this.__danmakuList.set(newValue);
    }
    private __containerWidth: SynchedPropertySimpleOneWayPU<number>; // 容器宽度
    get containerWidth() {
        return this.__containerWidth.get();
    }
    set containerWidth(newValue: number) {
        this.__containerWidth.set(newValue);
    }
    private __currentProgress: SynchedPropertySimpleOneWayPU<number>; // 当前视频进度（秒）
    get currentProgress() {
        return this.__currentProgress.get();
    }
    set currentProgress(newValue: number) {
        this.__currentProgress.set(newValue);
    }
    private __updateFlag: ObservedPropertySimplePU<number>; // 用于触发UI更新的标志
    get updateFlag() {
        return this.__updateFlag.get();
    }
    set updateFlag(newValue: number) {
        this.__updateFlag.set(newValue);
    }
    private animationTimer: number; // 定时器ID
    private lastUpdateTime: number;
    private isComponentActive: boolean; // 组件是否活跃
    aboutToAppear() {
        this.isComponentActive = true;
        // 启动动画循环 - 使用setInterval代替requestAnimationFrame
        this.startAnimation();
    }
    aboutToDisappear() {
        // 停止动画
        this.isComponentActive = false;
        if (this.animationTimer !== -1) {
            clearInterval(this.animationTimer);
            this.animationTimer = -1;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
            Stack.clip(true);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (item.visible && item.currentX > -item.content.length * 16 - 50) { // 只显示在屏幕内的弹幕
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.content);
                                Text.fontSize(16);
                                Text.fontColor(Color.White);
                                Text.textShadow({ radius: 2, color: Color.Black, offsetX: 1, offsetY: 1 });
                                Text.position({ x: item.currentX, y: item.top });
                                Text.textAlign(TextAlign.Start);
                                Text.zIndex(999);
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
            };
            this.forEachUpdateFunction(elmtId, this.danmakuList, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Stack.pop();
    }
    // 启动动画循环 - 使用定时器代替requestAnimationFrame
    private startAnimation(): void {
        // 使用16ms间隔接近60fps
        this.animationTimer = setInterval(() => {
            if (!this.isComponentActive) {
                return;
            }
            const currentTime = Date.now();
            if (!this.lastUpdateTime) {
                this.lastUpdateTime = currentTime;
            }
            const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // 转换为秒
            this.lastUpdateTime = currentTime;
            // 更新所有弹幕位置
            this.updateDanmakuPositions(deltaTime);
        }, 16); // 约60fps
    }
    // 更新弹幕位置
    private updateDanmakuPositions(deltaTime: number): void {
        let needUpdate = false;
        this.danmakuList.forEach((item, index) => {
            if (item.visible && !item.isFixed) {
                // 计算新位置
                const newX = item.currentX - DANMAKU_SPEED * deltaTime;
                // 更新位置
                if (Math.abs(newX - item.currentX) > 0.1) {
                    item.currentX = newX;
                    needUpdate = true;
                }
                // 检查是否移出屏幕
                if (item.currentX < -item.content.length * 16 - 100) {
                    item.visible = false;
                    needUpdate = true;
                }
            }
        });
        // 触发UI更新 - 使用updateFlag触发响应式更新
        if (needUpdate) {
            this.updateFlag++;
            this.danmakuList = [...this.danmakuList];
        }
    }
    // 添加新弹幕
    public addDanmaku(content: string, progress: number): void {
        // 计算弹幕宽度
        const contentWidth = content.length * 16;
        // 找到合适的行（避免重叠）
        const line = this.findAvailableLine();
        // 创建新弹幕
        const newItem = new DanmakuItem(Date.now().toString() + Math.random(), content, `${line * DANMAKU_LINE_HEIGHT}px`, progress, this.containerWidth, // 从右侧开始
        -contentWidth, // 移动到左侧
        line * DANMAKU_LINE_HEIGHT, DANMAKU_DURATION);
        // 设置初始位置
        newItem.currentX = this.containerWidth;
        newItem.visible = true;
        // 添加到列表
        this.danmakuList = [...this.danmakuList, newItem];
    }
    // 找到可用的弹幕行
    private findAvailableLine(): number {
        const lineCounts: number[] = new Array(MAX_DANMAKU_LINES).fill(0);
        // 统计每行的弹幕数量
        this.danmakuList.forEach((item: DanmakuItem) => {
            if (item.visible) {
                const line = Math.floor(item.top / DANMAKU_LINE_HEIGHT);
                if (line >= 0 && line < MAX_DANMAKU_LINES) {
                    lineCounts[line]++;
                }
            }
        });
        // 找到弹幕最少的行
        let minCount: number = lineCounts[0];
        let selectedLine = 0;
        for (let i = 1; i < MAX_DANMAKU_LINES; i++) {
            if (lineCounts[i] < minCount) {
                minCount = lineCounts[i];
                selectedLine = i;
            }
        }
        return selectedLine;
    }
    // 重置所有弹幕状态
    public resetDanmakuState(): void {
        this.danmakuList.forEach(item => {
            item.visible = false;
            item.currentX = this.containerWidth;
        });
        this.danmakuList = [...this.danmakuList];
    }
    rerender() {
        this.updateDirtyElements();
    }
}
