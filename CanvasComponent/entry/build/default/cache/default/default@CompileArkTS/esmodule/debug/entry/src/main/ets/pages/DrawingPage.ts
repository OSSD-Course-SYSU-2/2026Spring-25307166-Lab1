if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DrawingPage_Params {
    paths?: Path[];
    currentPath?: Path | null;
    isDrawing?: boolean;
    startTime?: number;
    canCapture?: boolean;
    currentPage?: GamePage;
    avatarImage?: string;
    settings?: RenderingContextSettings;
    canvasContext?: CanvasRenderingContext2D;
    lastX?: number;
    lastY?: number;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
export class DrawingPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__paths = new ObservedPropertyObjectPU([], this, "paths");
        this.__currentPath = new ObservedPropertyObjectPU(null, this, "currentPath");
        this.__isDrawing = new ObservedPropertySimplePU(false, this, "isDrawing");
        this.__startTime = new ObservedPropertySimplePU(0, this, "startTime");
        this.__canCapture = new ObservedPropertySimplePU(false, this, "canCapture");
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__avatarImage = new SynchedPropertySimpleTwoWayPU(params.avatarImage, this, "avatarImage");
        this.settings = new RenderingContextSettings(true);
        this.canvasContext = new CanvasRenderingContext2D(this.settings);
        this.lastX = 0;
        this.lastY = 0;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DrawingPage_Params) {
        if (params.paths !== undefined) {
            this.paths = params.paths;
        }
        if (params.currentPath !== undefined) {
            this.currentPath = params.currentPath;
        }
        if (params.isDrawing !== undefined) {
            this.isDrawing = params.isDrawing;
        }
        if (params.startTime !== undefined) {
            this.startTime = params.startTime;
        }
        if (params.canCapture !== undefined) {
            this.canCapture = params.canCapture;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.canvasContext !== undefined) {
            this.canvasContext = params.canvasContext;
        }
        if (params.lastX !== undefined) {
            this.lastX = params.lastX;
        }
        if (params.lastY !== undefined) {
            this.lastY = params.lastY;
        }
    }
    updateStateVars(params: DrawingPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__paths.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPath.purgeDependencyOnElmtId(rmElmtId);
        this.__isDrawing.purgeDependencyOnElmtId(rmElmtId);
        this.__startTime.purgeDependencyOnElmtId(rmElmtId);
        this.__canCapture.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__avatarImage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__paths.aboutToBeDeleted();
        this.__currentPath.aboutToBeDeleted();
        this.__isDrawing.aboutToBeDeleted();
        this.__startTime.aboutToBeDeleted();
        this.__canCapture.aboutToBeDeleted();
        this.__currentPage.aboutToBeDeleted();
        this.__avatarImage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __paths: ObservedPropertyObjectPU<Path[]>;
    get paths() {
        return this.__paths.get();
    }
    set paths(newValue: Path[]) {
        this.__paths.set(newValue);
    }
    private __currentPath: ObservedPropertyObjectPU<Path | null>;
    get currentPath() {
        return this.__currentPath.get();
    }
    set currentPath(newValue: Path | null) {
        this.__currentPath.set(newValue);
    }
    private __isDrawing: ObservedPropertySimplePU<boolean>;
    get isDrawing() {
        return this.__isDrawing.get();
    }
    set isDrawing(newValue: boolean) {
        this.__isDrawing.set(newValue);
    }
    private __startTime: ObservedPropertySimplePU<number>;
    get startTime() {
        return this.__startTime.get();
    }
    set startTime(newValue: number) {
        this.__startTime.set(newValue);
    }
    private __canCapture: ObservedPropertySimplePU<boolean>;
    get canCapture() {
        return this.__canCapture.get();
    }
    set canCapture(newValue: boolean) {
        this.__canCapture.set(newValue);
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
    private settings: RenderingContextSettings;
    private canvasContext: CanvasRenderingContext2D;
    private lastX: number;
    private lastY: number;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(Color.Black);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('绘制您的身份符印');
            Text.fontSize(24);
            Text.fontColor(Color.White);
            Text.margin({ top: 40, bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('60%');
            Stack.alignContent(Alignment.Center);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Canvas.create(this.canvasContext);
            Canvas.width('80%');
            Canvas.height('50%');
            Canvas.backgroundColor('#1a1a1a');
            Canvas.border({ width: 2, color: '#333333' });
            Canvas.onReady(() => {
                this.canvasContext.fillStyle = '#1a1a1a';
                this.canvasContext.fillRect(0, 0, 400, 400);
            });
            Canvas.onTouch((event: TouchEvent) => {
                this.handleTouch(event);
            });
        }, Canvas);
        Canvas.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.canCapture) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('确认头像');
                        Button.width('60%');
                        Button.height(50);
                        Button.backgroundColor('#4a90e2');
                        Button.onClick(() => {
                            this.captureAvatar();
                        });
                        Button.margin({ top: 20 });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('清空重画');
            Button.width('60%');
            Button.height(50);
            Button.backgroundColor('#666666');
            Button.onClick(() => {
                this.clearCanvas();
            });
            Button.margin({ top: 20 });
        }, Button);
        Button.pop();
        Column.pop();
    }
    handleTouch(event: TouchEvent) {
        const touch = event.touches[0];
        if (!this.isDrawing) {
            this.isDrawing = true;
            this.startTime = Date.now();
            this.startDrawingCountdown();
        }
        if (event.type === TouchType.Down) {
            this.lastX = touch.x;
            this.lastY = touch.y;
        }
        else if (event.type === TouchType.Move) {
            this.canvasContext.strokeStyle = '#FFFFFF';
            this.canvasContext.lineWidth = 3;
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(this.lastX, this.lastY);
            this.canvasContext.lineTo(touch.x, touch.y);
            this.canvasContext.stroke();
            this.lastX = touch.x;
            this.lastY = touch.y;
        }
        else if (event.type === TouchType.Up) {
            this.isDrawing = false;
        }
    }
    startDrawingCountdown() {
        setTimeout(() => {
            if (this.isDrawing || this.paths.length > 0) {
                this.canCapture = true;
            }
        }, 2000);
    }
    clearCanvas() {
        this.canvasContext.fillStyle = '#1a1a1a';
        this.canvasContext.fillRect(0, 0, 400, 400);
        this.canCapture = false;
        this.isDrawing = false;
    }
    async captureAvatar() {
        try {
            this.currentPage = GamePage.NAME_INPUT;
        }
        catch (error) {
            console.error('截图失败:', error);
            this.currentPage = GamePage.NAME_INPUT;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class Path {
    points: Point[] = [];
}
class Point {
    x: number = 0;
    y: number = 0;
}
