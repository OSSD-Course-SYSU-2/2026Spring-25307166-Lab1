if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AlchemyPage_Params {
    currentPage?: GamePage;
    selectedMaterials?: Map<string, number>;
    currentColor?: ColorRGB;
    totalAmount?: number;
    showMaterialSelector?: boolean;
    isProcessing?: boolean;
    colorIntensity?: number;
    gameManager?: GameManager;
    screenAdapter?: ScreenAdapter;
    settings?: RenderingContextSettings;
    canvasContext?: CanvasRenderingContext2D;
    materialCanvasContext?: CanvasRenderingContext2D;
    bubbleInterval?: number;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
import { AllMaterials, getMaterialsByColor } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import type { MaterialData } from "@bundle:com.example.canvascomponent/entry/ets/model/Material";
import { MaterialColorType, MaterialColors } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import type { ColorRGB } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import { ScreenAdapter, DeviceType } from "@bundle:com.example.canvascomponent/entry/ets/common/utils/ScreenAdapter";
import { MaterialPatternDrawer } from "@bundle:com.example.canvascomponent/entry/ets/common/utils/MaterialPatternDrawer";
interface HSL {
    h: number;
    s: number;
    l: number;
}
interface RGB {
    r: number;
    g: number;
    b: number;
}
export class AlchemyPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__selectedMaterials = new ObservedPropertyObjectPU(new Map(), this, "selectedMaterials");
        this.__currentColor = new ObservedPropertyObjectPU({ r: 80, g: 80, b: 120 }, this, "currentColor");
        this.__totalAmount = new ObservedPropertySimplePU(0, this, "totalAmount");
        this.__showMaterialSelector = new ObservedPropertySimplePU(false, this, "showMaterialSelector");
        this.__isProcessing = new ObservedPropertySimplePU(false, this, "isProcessing");
        this.__colorIntensity = new ObservedPropertySimplePU(0, this, "colorIntensity");
        this.gameManager = GameManager.getInstance();
        this.screenAdapter = ScreenAdapter.getInstance();
        this.settings = new RenderingContextSettings(true);
        this.canvasContext = new CanvasRenderingContext2D(this.settings);
        this.materialCanvasContext = new CanvasRenderingContext2D(this.settings);
        this.bubbleInterval = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AlchemyPage_Params) {
        if (params.selectedMaterials !== undefined) {
            this.selectedMaterials = params.selectedMaterials;
        }
        if (params.currentColor !== undefined) {
            this.currentColor = params.currentColor;
        }
        if (params.totalAmount !== undefined) {
            this.totalAmount = params.totalAmount;
        }
        if (params.showMaterialSelector !== undefined) {
            this.showMaterialSelector = params.showMaterialSelector;
        }
        if (params.isProcessing !== undefined) {
            this.isProcessing = params.isProcessing;
        }
        if (params.colorIntensity !== undefined) {
            this.colorIntensity = params.colorIntensity;
        }
        if (params.gameManager !== undefined) {
            this.gameManager = params.gameManager;
        }
        if (params.screenAdapter !== undefined) {
            this.screenAdapter = params.screenAdapter;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.canvasContext !== undefined) {
            this.canvasContext = params.canvasContext;
        }
        if (params.materialCanvasContext !== undefined) {
            this.materialCanvasContext = params.materialCanvasContext;
        }
        if (params.bubbleInterval !== undefined) {
            this.bubbleInterval = params.bubbleInterval;
        }
    }
    updateStateVars(params: AlchemyPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedMaterials.purgeDependencyOnElmtId(rmElmtId);
        this.__currentColor.purgeDependencyOnElmtId(rmElmtId);
        this.__totalAmount.purgeDependencyOnElmtId(rmElmtId);
        this.__showMaterialSelector.purgeDependencyOnElmtId(rmElmtId);
        this.__isProcessing.purgeDependencyOnElmtId(rmElmtId);
        this.__colorIntensity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__selectedMaterials.aboutToBeDeleted();
        this.__currentColor.aboutToBeDeleted();
        this.__totalAmount.aboutToBeDeleted();
        this.__showMaterialSelector.aboutToBeDeleted();
        this.__isProcessing.aboutToBeDeleted();
        this.__colorIntensity.aboutToBeDeleted();
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
    private __selectedMaterials: ObservedPropertyObjectPU<Map<string, number>>;
    get selectedMaterials() {
        return this.__selectedMaterials.get();
    }
    set selectedMaterials(newValue: Map<string, number>) {
        this.__selectedMaterials.set(newValue);
    }
    private __currentColor: ObservedPropertyObjectPU<ColorRGB>;
    get currentColor() {
        return this.__currentColor.get();
    }
    set currentColor(newValue: ColorRGB) {
        this.__currentColor.set(newValue);
    }
    private __totalAmount: ObservedPropertySimplePU<number>;
    get totalAmount() {
        return this.__totalAmount.get();
    }
    set totalAmount(newValue: number) {
        this.__totalAmount.set(newValue);
    }
    private __showMaterialSelector: ObservedPropertySimplePU<boolean>;
    get showMaterialSelector() {
        return this.__showMaterialSelector.get();
    }
    set showMaterialSelector(newValue: boolean) {
        this.__showMaterialSelector.set(newValue);
    }
    private __isProcessing: ObservedPropertySimplePU<boolean>;
    get isProcessing() {
        return this.__isProcessing.get();
    }
    set isProcessing(newValue: boolean) {
        this.__isProcessing.set(newValue);
    }
    private __colorIntensity: ObservedPropertySimplePU<number>;
    get colorIntensity() {
        return this.__colorIntensity.get();
    }
    set colorIntensity(newValue: number) {
        this.__colorIntensity.set(newValue);
    }
    private gameManager: GameManager;
    private screenAdapter: ScreenAdapter;
    private settings: RenderingContextSettings;
    private canvasContext: CanvasRenderingContext2D;
    private materialCanvasContext: CanvasRenderingContext2D;
    private bubbleInterval: number;
    aboutToAppear() {
        this.startBubbles();
    }
    aboutToDisappear() {
        if (this.bubbleInterval !== -1) {
            clearInterval(this.bubbleInterval);
        }
    }
    startBubbles() {
        this.bubbleInterval = setInterval(() => {
            this.drawCauldron();
        }, 100);
    }
    drawCauldron() {
        const ctx = this.canvasContext;
        const canvasSize = this.screenAdapter.scaleValue(320);
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        const centerX = canvasSize / 2;
        const cauldronY = canvasSize * 0.72;
        const radius = canvasSize * 0.38;
        this.drawMagicCircle(ctx, centerX, cauldronY, radius);
        ctx.fillStyle = '#333333';
        ctx.beginPath();
        ctx.ellipse(centerX, cauldronY, radius * 0.83, radius * 0.28, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#222222';
        ctx.beginPath();
        ctx.moveTo(centerX - radius, cauldronY);
        ctx.quadraticCurveTo(centerX - radius, cauldronY - radius * 1.2, centerX, cauldronY - radius * 1.5);
        ctx.quadraticCurveTo(centerX + radius, cauldronY - radius * 1.2, centerX + radius, cauldronY);
        ctx.lineTo(centerX + radius, cauldronY + radius * 0.1);
        ctx.quadraticCurveTo(centerX, cauldronY + radius * 0.2, centerX - radius, cauldronY + radius * 0.1);
        ctx.closePath();
        ctx.fill();
        const r = Math.max(10, Math.min(255, this.currentColor.r));
        const g = Math.max(10, Math.min(255, this.currentColor.g));
        const b = Math.max(10, Math.min(255, this.currentColor.b));
        const gradient = ctx.createRadialGradient(centerX, cauldronY - radius * 0.5, 0, centerX, cauldronY - radius * 0.5, radius);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.9)`);
        gradient.addColorStop(0.5, `rgba(${Math.floor(r * 0.8)}, ${Math.floor(g * 0.8)}, ${Math.floor(b * 0.8)}, 0.85)`);
        gradient.addColorStop(1, `rgba(${Math.floor(r * 0.4)}, ${Math.floor(g * 0.4)}, ${Math.floor(b * 0.4)}, 0.95)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(centerX - radius * 0.9, cauldronY - radius * 0.1);
        ctx.quadraticCurveTo(centerX - radius * 0.9, cauldronY - radius * 1.2, centerX, cauldronY - radius * 1.4);
        ctx.quadraticCurveTo(centerX + radius * 0.9, cauldronY - radius * 1.2, centerX + radius * 0.9, cauldronY - radius * 0.1);
        ctx.lineTo(centerX + radius * 0.9, cauldronY);
        ctx.quadraticCurveTo(centerX, cauldronY + radius * 0.1, centerX - radius * 0.9, cauldronY);
        ctx.closePath();
        ctx.fill();
        this.drawSwirlEffect(ctx, centerX, cauldronY - radius * 0.5, r, g, b);
        const time = Date.now();
        const bubbleCount = this.totalAmount > 0 ? Math.min(15, 5 + Math.floor(this.totalAmount / 10)) : 8;
        for (let i = 0; i < bubbleCount; i++) {
            const x = centerX - radius * 0.5 + Math.random() * radius;
            const y = cauldronY - radius * 0.8 + Math.random() * radius * 0.6;
            const size = this.screenAdapter.scaleValue(3 + Math.random() * 8 + (this.colorIntensity / 20));
            const opacity = 0.2 + Math.sin(time / 500 + i) * 0.4;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`;
            ctx.beginPath();
            ctx.arc(x, y - (time / 50 % 100), size, 0, Math.PI * 2);
            ctx.fill();
        }
        if (this.totalAmount > 0) {
            this.drawGlowEffect(ctx, centerX, cauldronY - radius * 0.5, r, g, b);
        }
    }
    drawSwirlEffect(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, g: number, b: number) {
        const time = Date.now() / 1000;
        ctx.save();
        for (let i = 0; i < 3; i++) {
            const radius = 40 + i * 25;
            const alpha = 0.15 - i * 0.03;
            ctx.strokeStyle = `rgba(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)}, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
                const swirl = Math.sin(angle * 3 + time + i) * 10;
                const px = x + Math.cos(angle) * (radius + swirl);
                const py = y + Math.sin(angle) * (radius + swirl) * 0.6;
                if (angle === 0) {
                    ctx.moveTo(px, py);
                }
                else {
                    ctx.lineTo(px, py);
                }
            }
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
    }
    drawGlowEffect(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, g: number, b: number) {
        const glowRadius = 60 + this.colorIntensity / 2;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
        const alpha = Math.min(0.3, this.colorIntensity / 300);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
    }
    drawMagicCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.85, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI / 3) - Math.PI / 2;
            const x1 = x + Math.cos(angle) * radius * 0.3;
            const y1 = y + Math.sin(angle) * radius * 0.3;
            const x2 = x + Math.cos(angle) * radius * 0.95;
            const y2 = y + Math.sin(angle) * radius * 0.95;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI / 3) - Math.PI / 2;
            const px = x + Math.cos(angle) * radius * 0.6;
            const py = y + Math.sin(angle) * radius * 0.6;
            ctx.beginPath();
            ctx.arc(px, py, radius * 0.08, 0, Math.PI * 2);
            ctx.stroke();
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
            Row.width('100%');
            Row.padding({ left: 15, right: 15, top: 10, bottom: 10 });
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.fontSize(this.screenAdapter.scaleFont(14));
            Button.onClick(() => {
                this.currentPage = GamePage.MAIN;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⚗ 炼金工坊 ⚗');
            Text.fontSize(this.screenAdapter.scaleFont(20));
            Text.fontColor(Color.White);
            Text.layoutWeight(1);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.totalAmount}/100`);
            Text.fontSize(this.screenAdapter.scaleFont(16));
            Text.fontColor('#FFD700');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☽ ☾');
            Text.fontSize(this.screenAdapter.scaleFont(10));
            Text.fontColor('rgba(255, 215, 0, 0.4)');
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height(this.screenAdapter.scaleValue(340));
            Stack.alignContent(Alignment.Center);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Canvas.create(this.canvasContext);
            Canvas.width(this.screenAdapter.scaleValue(320));
            Canvas.height(this.screenAdapter.scaleValue(320));
            Canvas.onReady(() => {
                this.drawCauldron();
            });
        }, Canvas);
        Canvas.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.position({ x: '35%', y: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✧ ⚝ ✦ ⬡ ◈');
            Text.fontSize(this.screenAdapter.scaleFont(10));
            Text.fontColor('rgba(255, 215, 0, 0.3)');
        }, Text);
        Text.pop();
        Column.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 15, right: 15 });
            Column.margin({ top: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('已添加材料:');
            Text.fontSize(this.screenAdapter.scaleFont(14));
            Text.fontColor(Color.White);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedMaterials.size > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.constraintSize({ maxHeight: 80 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const entry = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.justifyContent(FlexAlign.SpaceBetween);
                                Row.padding({ left: 15, right: 15 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.getMaterialName(entry[0]));
                                Text.fontSize(this.screenAdapter.scaleFont(12));
                                Text.fontColor('#aaaaaa');
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(` x${entry[1]}`);
                                Text.fontSize(this.screenAdapter.scaleFont(12));
                                Text.fontColor('#FFD700');
                            }, Text);
                            Text.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, Array.from(this.selectedMaterials.entries()), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 15, right: 15 });
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.margin({ top: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加材料');
            Button.fontSize(this.screenAdapter.scaleFont(14));
            Button.backgroundColor('#4CAF50');
            Button.onClick(() => {
                this.showMaterialSelector = true;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('开始炼金');
            Button.fontSize(this.screenAdapter.scaleFont(14));
            Button.backgroundColor('#FF9800');
            Button.enabled(this.totalAmount === 100);
            Button.onClick(() => {
                this.startAlchemy();
            });
            Button.margin({ left: 15 });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showMaterialSelector) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.MaterialSelectorSheet.bind(this)();
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
    MaterialSelectorSheet(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('70%');
            Column.backgroundColor('rgba(30, 30, 30, 0.95)');
            Column.borderRadius({ topLeft: 20, topRight: 20 });
            Column.position({ x: 0, y: '30%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding({ left: 15, right: 15, top: 15, bottom: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择材料');
            Text.fontSize(this.screenAdapter.scaleFont(18));
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.fontSize(this.screenAdapter.scaleFont(14));
            Button.onClick(() => {
                this.showMaterialSelector = false;
            });
        }, Button);
        Button.pop();
        Row.pop();
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
            Column.padding({ bottom: 20, left: 10, right: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const colorType = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.margin({ bottom: 10 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(colorType);
                    Text.fontSize(this.screenAdapter.scaleFont(14));
                    Text.fontColor(this.getColorHex(colorType));
                    Text.fontWeight(FontWeight.Bold);
                    Text.margin({ top: 8, bottom: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Grid.create();
                    Grid.columnsTemplate(this.getGridColumnsTemplate());
                    Grid.rowsGap(this.screenAdapter.getMargin());
                    Grid.columnsGap(this.screenAdapter.getMargin());
                    Grid.width('100%');
                }, Grid);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const material = _item;
                        {
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                GridItem.create(() => { }, false);
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation2(itemCreation2, GridItem);
                                this.MaterialCard.bind(this)(material);
                                GridItem.pop();
                            };
                            observedDeepRender();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, getMaterialsByColor(colorType), forEachItemGenFunction);
                }, ForEach);
                ForEach.pop();
                Grid.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, [
                MaterialColorType.RED,
                MaterialColorType.ORANGE,
                MaterialColorType.YELLOW,
                MaterialColorType.GREEN,
                MaterialColorType.CYAN,
                MaterialColorType.BLUE,
                MaterialColorType.PURPLE
            ], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    MaterialCard(material: MaterialData, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(6);
            Column.backgroundColor('rgba(60, 60, 60, 0.9)');
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(this.screenAdapter.getImageSize());
            Stack.height(this.screenAdapter.getImageSize());
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Canvas.create(new CanvasRenderingContext2D(new RenderingContextSettings(true)));
            Canvas.width(this.screenAdapter.getImageSize());
            Canvas.height(this.screenAdapter.getImageSize());
            Canvas.onReady(() => {
                let ctx = new CanvasRenderingContext2D(new RenderingContextSettings(true));
                const size = this.screenAdapter.getImageSize();
                ctx.clearRect(0, 0, size, size);
                ctx.fillStyle = this.getColorHex(material.colorType);
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
                ctx.fill();
                MaterialPatternDrawer.drawPattern(ctx, material.id, size / 2, size / 2, size * 0.35);
            });
        }, Canvas);
        Canvas.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(material.name);
            Text.fontSize(this.screenAdapter.scaleFont(10));
            Text.fontColor(Color.White);
            Text.margin({ top: 4 });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`库存: ${this.gameManager.getMaterialCount(material.id)}`);
            Text.fontSize(this.screenAdapter.scaleFont(9));
            Text.fontColor('#aaaaaa');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('+5');
            Button.fontSize(this.screenAdapter.scaleFont(10));
            Button.height(this.screenAdapter.scaleValue(24));
            Button.width('85%');
            Button.backgroundColor(this.gameManager.getMaterialCount(material.id) >= 5 ? '#4CAF50' : '#666666');
            Button.enabled(this.totalAmount < 100 && this.gameManager.getMaterialCount(material.id) >= 5);
            Button.onClick(() => {
                this.addMaterial(material.id, 5);
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    addMaterial(materialId: string, amount: number) {
        if (this.totalAmount + amount > 100) {
            amount = 100 - this.totalAmount;
        }
        if (amount <= 0)
            return;
        const current = this.selectedMaterials.get(materialId) || 0;
        this.selectedMaterials.set(materialId, current + amount);
        this.totalAmount += amount;
        // 强制更新Map
        const newMap = new Map<string, number>();
        this.selectedMaterials.forEach((value: number, key: string) => {
            newMap.set(key, value);
        });
        this.selectedMaterials = newMap;
        this.updateColor();
    }
    updateColor() {
        if (this.selectedMaterials.size === 0) {
            this.currentColor = { r: 80, g: 80, b: 120 };
            this.colorIntensity = 0;
            return;
        }
        let totalR = 0, totalG = 0, totalB = 0;
        let totalAmount = 0;
        const colorComponents: Map<string, number> = new Map();
        this.selectedMaterials.forEach((amount: number, materialId: string) => {
            const material = AllMaterials.find((m: MaterialData) => m.id === materialId);
            if (material) {
                const color = MaterialColors[material.colorType];
                totalR += color.r * amount;
                totalG += color.g * amount;
                totalB += color.b * amount;
                totalAmount += amount;
                const colorTypeStr = material.colorType.toString();
                const currentCount = colorComponents.get(colorTypeStr) || 0;
                colorComponents.set(colorTypeStr, currentCount + amount);
            }
        });
        if (totalAmount > 0) {
            const depthLevel = totalAmount / 100;
            this.colorIntensity = totalAmount;
            let r = totalR / totalAmount;
            let g = totalG / totalAmount;
            let b = totalB / totalAmount;
            const subtractiveR = 1 - Math.pow(1 - r / 255, totalAmount / 15);
            const subtractiveG = 1 - Math.pow(1 - g / 255, totalAmount / 15);
            const subtractiveB = 1 - Math.pow(1 - b / 255, totalAmount / 15);
            r = subtractiveR * 255;
            g = subtractiveG * 255;
            b = subtractiveB * 255;
            const hsl = this.rgbToHsl(r, g, b);
            const colorDiversity = colorComponents.size;
            if (colorDiversity >= 2) {
                const blendEnhance = Math.min(0.4, (colorDiversity - 1) * 0.12);
                hsl.s = Math.min(1.0, hsl.s * (1.0 + blendEnhance));
            }
            const baseLightness = 0.85;
            const maxDarkness = 0.15;
            const lightnessRange = baseLightness - maxDarkness;
            const targetLightness = baseLightness - (lightnessRange * depthLevel);
            hsl.l = targetLightness;
            if (depthLevel < 0.2) {
                hsl.s = Math.max(0.3, hsl.s * 0.7);
            }
            else if (depthLevel > 0.6) {
                hsl.s = Math.min(1.0, hsl.s * 1.2);
            }
            hsl.l = Math.max(0.1, Math.min(0.85, hsl.l));
            hsl.s = Math.max(0.2, Math.min(1.0, hsl.s));
            const rgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
            this.currentColor = {
                r: Math.max(10, Math.min(255, Math.floor(rgb.r))),
                g: Math.max(10, Math.min(255, Math.floor(rgb.g))),
                b: Math.max(10, Math.min(255, Math.floor(rgb.b)))
            };
        }
    }
    rgbToHsl(r: number, g: number, b: number): HSL {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;
        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }
        return { h, s, l };
    }
    hslToRgb(h: number, s: number, l: number): RGB {
        let r: number, g: number, b: number;
        if (s === 0) {
            r = g = b = l;
        }
        else {
            const hue2rgb = (p: number, q: number, t: number): number => {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }
    getMaterialName(id: string): string {
        const material = AllMaterials.find((m: MaterialData) => m.id === id);
        return material ? material.name : '未知';
    }
    getColorHex(colorType: MaterialColorType): string {
        const color = MaterialColors[colorType];
        return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
    }
    startAlchemy() {
        this.isProcessing = true;
        if (this.bubbleInterval !== -1) {
            clearInterval(this.bubbleInterval);
        }
        this.currentPage = GamePage.FORMATION_WHEEL;
    }
    getGridColumnsTemplate(): string {
        const deviceType = this.screenAdapter.getDeviceType();
        if (deviceType === DeviceType.PHONE) {
            return '1fr 1fr 1fr';
        }
        else if (deviceType === DeviceType.TABLET) {
            return '1fr 1fr 1fr 1fr';
        }
        else {
            return '1fr 1fr 1fr 1fr 1fr';
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
