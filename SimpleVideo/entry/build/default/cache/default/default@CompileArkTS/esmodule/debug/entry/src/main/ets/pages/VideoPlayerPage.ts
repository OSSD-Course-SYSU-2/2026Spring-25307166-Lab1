if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VideoPlayerPage_Params {
    startIconResource?: Resource;
    backIconResource?: Resource;
    videoPlayerModel?: VideoPlayerModel;
    pathStack?: NavPathStack;
    source?: ResourceStr;
    showInput?: boolean;
    inputText?: string;
    danmakuList?: DanmakuItem[];
    screenWidth?: number;
    danmakuComponent?: Danmaku | null;
    context?: common.UIAbilityContext;
}
import { VideoPlayer } from "@bundle:com.example.simplevideo/entry/ets/view/VideoPlayer";
import { COMMON_NUM_FONT_WEIGHT, ALL_PERCENT } from "@bundle:com.example.simplevideo/entry/ets/common/constants/CommonConstants";
import type { MARGIN_FONT_SIZE, STACK_STYLE } from "@bundle:com.example.simplevideo/entry/ets/common/constants/CommonConstants";
import { VideoPlayerModel } from "@bundle:com.example.simplevideo/entry/ets/model/VideoPlayerModel";
import { Danmaku } from "@bundle:com.example.simplevideo/entry/ets/components/Danmaku";
import { DanmakuItem } from "@bundle:com.example.simplevideo/entry/ets/common/bean/DanmakuItem";
import type common from "@ohos:app.ability.common";
import display from "@ohos:display";
export function VideoPlayerPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new VideoPlayerPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/VideoPlayerPage.ets", line: 30, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "VideoPlayerPage" });
    }
}
export class VideoPlayerPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.startIconResource = { "id": 16777266, "type": 20000, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" };
        this.backIconResource = { "id": 16777263, "type": 20000, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" };
        this.__videoPlayerModel = new ObservedPropertyObjectPU(new VideoPlayerModel(), this, "videoPlayerModel");
        this.addProvidedVar("videoPlayerModel", this.__videoPlayerModel, false);
        this.pathStack = new NavPathStack();
        this.__source = this.createStorageLink('source', '', "source");
        this.__showInput = new ObservedPropertySimplePU(false, this, "showInput");
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.__danmakuList = new ObservedPropertyObjectPU([], this, "danmakuList");
        this.__screenWidth = new ObservedPropertySimplePU(1080, this, "screenWidth");
        this.danmakuComponent = null;
        this.context = getContext(this) as common.UIAbilityContext;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoPlayerPage_Params) {
        if (params.startIconResource !== undefined) {
            this.startIconResource = params.startIconResource;
        }
        if (params.backIconResource !== undefined) {
            this.backIconResource = params.backIconResource;
        }
        if (params.videoPlayerModel !== undefined) {
            this.videoPlayerModel = params.videoPlayerModel;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
        if (params.showInput !== undefined) {
            this.showInput = params.showInput;
        }
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.danmakuList !== undefined) {
            this.danmakuList = params.danmakuList;
        }
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
        if (params.danmakuComponent !== undefined) {
            this.danmakuComponent = params.danmakuComponent;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: VideoPlayerPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__videoPlayerModel.purgeDependencyOnElmtId(rmElmtId);
        this.__source.purgeDependencyOnElmtId(rmElmtId);
        this.__showInput.purgeDependencyOnElmtId(rmElmtId);
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
        this.__danmakuList.purgeDependencyOnElmtId(rmElmtId);
        this.__screenWidth.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__videoPlayerModel.aboutToBeDeleted();
        this.__source.aboutToBeDeleted();
        this.__showInput.aboutToBeDeleted();
        this.__inputText.aboutToBeDeleted();
        this.__danmakuList.aboutToBeDeleted();
        this.__screenWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private startIconResource: Resource;
    private backIconResource: Resource;
    private __videoPlayerModel: ObservedPropertyObjectPU<VideoPlayerModel>;
    get videoPlayerModel() {
        return this.__videoPlayerModel.get();
    }
    set videoPlayerModel(newValue: VideoPlayerModel) {
        this.__videoPlayerModel.set(newValue);
    }
    private pathStack: NavPathStack;
    private __source: ObservedPropertyAbstractPU<ResourceStr>;
    get source() {
        return this.__source.get();
    }
    set source(newValue: ResourceStr) {
        this.__source.set(newValue);
    }
    private __showInput: ObservedPropertySimplePU<boolean>;
    get showInput() {
        return this.__showInput.get();
    }
    set showInput(newValue: boolean) {
        this.__showInput.set(newValue);
    }
    private __inputText: ObservedPropertySimplePU<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    private __danmakuList: ObservedPropertyObjectPU<DanmakuItem[]>;
    get danmakuList() {
        return this.__danmakuList.get();
    }
    set danmakuList(newValue: DanmakuItem[]) {
        this.__danmakuList.set(newValue);
    }
    private __screenWidth: ObservedPropertySimplePU<number>; // 屏幕宽度
    get screenWidth() {
        return this.__screenWidth.get();
    }
    set screenWidth(newValue: number) {
        this.__screenWidth.set(newValue);
    }
    private danmakuComponent: Danmaku | null; // 弹幕组件引用
    private context: common.UIAbilityContext;
    async aboutToAppear() {
        // 获取屏幕宽度
        try {
            const displayInfo = display.getDefaultDisplaySync();
            this.screenWidth = displayInfo.width;
            console.log("[弹幕] 屏幕宽度:", this.screenWidth);
        }
        catch (error) {
            console.error("[弹幕] 获取屏幕宽度失败:", error);
            this.screenWidth = 1080; // 默认值
        }
    }
    onPageHide() {
        // 页面隐藏时暂停视频
        try {
            if (this.videoPlayerModel && this.videoPlayerModel.controller) {
                this.videoPlayerModel.controller.pause();
            }
        }
        catch (error) {
            console.error('VideoPlayerPage onPageHide error:', error);
        }
    }
    aboutToDisappear() {
        // 组件销毁时释放资源
        try {
            if (this.videoPlayerModel && this.videoPlayerModel.controller) {
                this.videoPlayerModel.controller.stop();
            }
        }
        catch (error) {
            console.error('VideoPlayerPage aboutToDisappear error:', error);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(ALL_PERCENT);
                    Column.height(ALL_PERCENT);
                    Column.backgroundColor('#1a1a1a');
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 顶部返回栏
                    Row.create();
                    // 顶部返回栏
                    Row.width(ALL_PERCENT);
                    // 顶部返回栏
                    Row.margin({
                        left: 12,
                        top: 12
                    });
                    // 顶部返回栏
                    Row.justifyContent(FlexAlign.Start);
                    // 顶部返回栏
                    Row.zIndex(1000);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.backIconResource);
                    Image.width(24);
                    Image.height(24);
                    Image.margin({ left: 24 });
                    Image.onClick(() => {
                        this.pathStack.pop();
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" });
                    Text.fontColor(Color.White);
                    Text.fontSize(24);
                    Text.fontWeight(COMMON_NUM_FONT_WEIGHT);
                    Text.margin({ left: 12 });
                }, Text);
                Text.pop();
                // 顶部返回栏
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 视频播放区域
                    Stack.create();
                    // 视频播放区域
                    Stack.width('100%');
                    // 视频播放区域
                    Stack.height('80%');
                    // 视频播放区域
                    Stack.backgroundColor(Color.Black);
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.zIndex(0);
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new 
                            // 视频播放器
                            VideoPlayer(this, { source: this.source }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/VideoPlayerPage.ets", line: 113, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    source: this.source
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "VideoPlayer" });
                }
                __Common__.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 播放按钮
                    if (!this.videoPlayerModel.isPlay && !this.videoPlayerModel.isLoading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create(this.startIconResource);
                                Image.width(50);
                                Image.height(50);
                                Image.zIndex(2);
                            }, Image);
                        });
                    }
                    // 加载进度
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 加载进度
                    if (this.videoPlayerModel.isLoading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Progress.create({
                                    value: 0,
                                    total: 100,
                                    type: ProgressType.ScaleRing
                                });
                                Progress.color(Color.Grey);
                                Progress.value(this.videoPlayerModel.progressVal);
                                Progress.width(80);
                                Progress.style({
                                    strokeWidth: 15,
                                    scaleCount: 15,
                                    scaleWidth: 5
                                });
                                Progress.zIndex(1);
                            }, Progress);
                        });
                    }
                    // 弹幕层
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.width('100%');
                    __Common__.height('70%');
                    __Common__.position({ x: 0, y: 0 });
                    __Common__.zIndex(999);
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new 
                            // 弹幕层
                            Danmaku(this, {
                                danmakuList: this.__danmakuList,
                                containerWidth: this.screenWidth,
                                currentProgress: this.videoPlayerModel.currentTime
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/VideoPlayerPage.ets", line: 143, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    danmakuList: this.danmakuList,
                                    containerWidth: this.screenWidth,
                                    currentProgress: this.videoPlayerModel.currentTime
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                containerWidth: this.screenWidth,
                                currentProgress: this.videoPlayerModel.currentTime
                            });
                        }
                    }, { name: "Danmaku" });
                }
                __Common__.pop();
                // 视频播放区域
                Stack.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 弹幕发送区域
                    Row.create();
                    // 弹幕发送区域
                    Row.width('95%');
                    // 弹幕发送区域
                    Row.height(60);
                    // 弹幕发送区域
                    Row.margin({ top: 10 });
                    // 弹幕发送区域
                    Row.justifyContent(FlexAlign.Center);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ text: this.inputText, placeholder: '输入弹幕内容' });
                    TextInput.width('70%');
                    TextInput.height(40);
                    TextInput.backgroundColor('#FFFFFF');
                    TextInput.borderRadius(20);
                    TextInput.padding({ left: 15, right: 15 });
                    TextInput.onChange((value: string) => {
                        this.inputText = value;
                    });
                }, TextInput);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('发送');
                    Button.width('25%');
                    Button.height(40);
                    Button.backgroundColor('#4CAF50');
                    Button.fontColor(Color.White);
                    Button.borderRadius(20);
                    Button.margin({ left: 10 });
                    Button.onClick(() => {
                        this.sendDanmaku();
                    });
                }, Button);
                Button.pop();
                // 弹幕发送区域
                Row.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/VideoPlayerPage" });
            NavDestination.hideTitleBar(true);
            NavDestination.hideToolBar(true);
            NavDestination.height(ALL_PERCENT);
            NavDestination.backgroundColor(Color.Black);
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pathStack = context.pathStack;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    // 发送弹幕
    private sendDanmaku(): void {
        if (this.inputText.trim()) {
            const content = this.inputText.trim();
            // 获取当前视频进度
            const currentProgress = this.videoPlayerModel.currentTime;
            console.log("[弹幕] 发送弹幕:", content, "进度:", currentProgress);
            // 计算弹幕宽度
            const contentWidth = content.length * 16;
            // 找到合适的行（避免重叠）
            const line = this.findAvailableLine();
            // 创建新弹幕
            const newDanmaku = new DanmakuItem(Date.now().toString() + Math.random(), content, `${line * 40}px`, currentProgress, this.screenWidth, -contentWidth, line * 40, 8000);
            // 设置初始位置（从屏幕右侧开始）和可见性
            newDanmaku.currentX = this.screenWidth + 100; // 确保从屏幕外开始
            newDanmaku.visible = true;
            // 添加到弹幕列表
            this.danmakuList = [...this.danmakuList, newDanmaku];
            // 清空输入框
            this.inputText = '';
        }
    }
    // 找到可用的弹幕行
    private findAvailableLine(): number {
        const MAX_DANMAKU_LINES = 6;
        const DANMAKU_LINE_HEIGHT = 40;
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
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("VideoPlayerPage", wrapBuilder(VideoPlayerPageBuilder));
    }
})();
