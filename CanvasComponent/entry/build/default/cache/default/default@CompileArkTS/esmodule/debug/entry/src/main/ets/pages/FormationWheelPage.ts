if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FormationWheelPage_Params {
    currentPage?: GamePage;
    rotateDegree?: number;
    selectedFormation?: Formation | null;
    showResult?: boolean;
    flashOpacity?: number;
    settings?: RenderingContextSettings;
    canvasContext?: CanvasRenderingContext2D;
    staticContext?: CanvasRenderingContext2D;
    gameManager?: GameManager;
    screenAdapter?: ScreenAdapter;
}
import { GamePage } from "@bundle:com.example.canvascomponent/entry/ets/model/GameTypes";
import type { Formation } from "@bundle:com.example.canvascomponent/entry/ets/model/Formation";
import { AllFormations } from "@bundle:com.example.canvascomponent/entry/ets/model/Formation";
import { GameManager } from "@bundle:com.example.canvascomponent/entry/ets/model/GameManager";
import { ScreenAdapter } from "@bundle:com.example.canvascomponent/entry/ets/common/utils/ScreenAdapter";
export class FormationWheelPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentPage = new SynchedPropertySimpleTwoWayPU(params.currentPage, this, "currentPage");
        this.__rotateDegree = new ObservedPropertySimplePU(0, this, "rotateDegree");
        this.__selectedFormation = new ObservedPropertyObjectPU(null, this, "selectedFormation");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.__flashOpacity = new ObservedPropertySimplePU(1, this, "flashOpacity");
        this.settings = new RenderingContextSettings(true);
        this.canvasContext = new CanvasRenderingContext2D(this.settings);
        this.staticContext = new CanvasRenderingContext2D(this.settings);
        this.gameManager = GameManager.getInstance();
        this.screenAdapter = ScreenAdapter.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FormationWheelPage_Params) {
        if (params.rotateDegree !== undefined) {
            this.rotateDegree = params.rotateDegree;
        }
        if (params.selectedFormation !== undefined) {
            this.selectedFormation = params.selectedFormation;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.flashOpacity !== undefined) {
            this.flashOpacity = params.flashOpacity;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.canvasContext !== undefined) {
            this.canvasContext = params.canvasContext;
        }
        if (params.staticContext !== undefined) {
            this.staticContext = params.staticContext;
        }
        if (params.gameManager !== undefined) {
            this.gameManager = params.gameManager;
        }
        if (params.screenAdapter !== undefined) {
            this.screenAdapter = params.screenAdapter;
        }
    }
    updateStateVars(params: FormationWheelPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentPage.purgeDependencyOnElmtId(rmElmtId);
        this.__rotateDegree.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedFormation.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
        this.__flashOpacity.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentPage.aboutToBeDeleted();
        this.__rotateDegree.aboutToBeDeleted();
        this.__selectedFormation.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        this.__flashOpacity.aboutToBeDeleted();
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
    private __rotateDegree: ObservedPropertySimplePU<number>;
    get rotateDegree() {
        return this.__rotateDegree.get();
    }
    set rotateDegree(newValue: number) {
        this.__rotateDegree.set(newValue);
    }
    private __selectedFormation: ObservedPropertyObjectPU<Formation | null>;
    get selectedFormation() {
        return this.__selectedFormation.get();
    }
    set selectedFormation(newValue: Formation | null) {
        this.__selectedFormation.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    private __flashOpacity: ObservedPropertySimplePU<number>;
    get flashOpacity() {
        return this.__flashOpacity.get();
    }
    set flashOpacity(newValue: number) {
        this.__flashOpacity.set(newValue);
    }
    private settings: RenderingContextSettings;
    private canvasContext: CanvasRenderingContext2D;
    private staticContext: CanvasRenderingContext2D;
    private gameManager: GameManager;
    private screenAdapter: ScreenAdapter;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(Color.Black);
            Column.opacity(this.flashOpacity);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.showResult) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('星盘');
                        Text.fontSize(this.screenAdapter.scaleFont(24));
                        Text.fontColor(Color.White);
                        Text.margin({ top: 30, bottom: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.width(this.screenAdapter.scaleValue(320));
                        Stack.height(this.screenAdapter.scaleValue(320));
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Canvas.create(this.canvasContext);
                        Canvas.width(this.screenAdapter.scaleValue(320));
                        Canvas.height(this.screenAdapter.scaleValue(320));
                        Canvas.onReady(() => {
                            this.drawWheel();
                        });
                        Canvas.rotate({
                            angle: this.rotateDegree,
                            centerX: this.screenAdapter.scaleValue(160),
                            centerY: this.screenAdapter.scaleValue(160)
                        });
                    }, Canvas);
                    Canvas.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Canvas.create(this.staticContext);
                        Canvas.width(this.screenAdapter.scaleValue(320));
                        Canvas.height(this.screenAdapter.scaleValue(320));
                        Canvas.onReady(() => {
                            this.drawStaticNames();
                        });
                    }, Canvas);
                    Canvas.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(70);
                        Column.height(70);
                        Column.borderRadius(35);
                        Column.backgroundColor('#1a1a1a');
                        Column.border({ width: 3, color: '#FFD700' });
                        Column.onClick(() => {
                            this.spinWheel();
                        });
                    }, Column);
                    Column.pop();
                    Stack.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
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
                        Column.padding({ left: 15, right: 15 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('法阵显现!');
                        Text.fontSize(this.screenAdapter.scaleFont(20));
                        Text.fontColor('#FFD700');
                        Text.margin({ top: 30, bottom: 20 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.selectedFormation) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.FormationDisplay.bind(this)(ObservedObject.GetRawObject(this.selectedFormation));
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('90%');
                                    Column.padding(15);
                                    Column.backgroundColor('rgba(50, 50, 50, 0.8)');
                                    Column.borderRadius(10);
                                    Column.margin({ top: 15 });
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('━━━━━━━━━━━━━━━');
                                    Text.fontSize(this.screenAdapter.scaleFont(12));
                                    Text.fontColor('#666666');
                                    Text.margin({ top: 15, bottom: 10 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('炼金物品');
                                    Text.fontSize(this.screenAdapter.scaleFont(16));
                                    Text.fontColor('#FFD700');
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.margin({ bottom: 8 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.margin({ bottom: 8 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.getItemName());
                                    Text.fontSize(this.screenAdapter.scaleFont(16));
                                    Text.fontColor('#FFFFFF');
                                    Text.fontWeight(FontWeight.Bold);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(' Lv.' + this.getItemLevel());
                                    Text.fontSize(this.screenAdapter.scaleFont(14));
                                    Text.fontColor('#00ff88');
                                    Text.margin({ left: 8 });
                                }, Text);
                                Text.pop();
                                Row.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.getItemRarity());
                                    Text.fontSize(this.screenAdapter.scaleFont(14));
                                    Text.fontColor(this.getItemRarityColor());
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
                        Button.createWithLabel('收入囊中');
                        Button.width('70%');
                        Button.height(this.screenAdapter.scaleValue(50));
                        Button.fontSize(this.screenAdapter.scaleFont(16));
                        Button.backgroundColor('#9c27b0');
                        Button.margin({ top: 20, bottom: 30 });
                        Button.onClick(() => {
                            this.addItemToInventory();
                            this.currentPage = GamePage.MAIN;
                        });
                    }, Button);
                    Button.pop();
                    Column.pop();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    drawWheel() {
        const ctx = this.canvasContext;
        const canvasSize = this.screenAdapter.scaleValue(320);
        const centerX = canvasSize / 2;
        const centerY = canvasSize / 2;
        const radius = this.screenAdapter.scaleValue(140);
        ctx.fillStyle = '#2a2a2a';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.stroke();
        const formationsCount = AllFormations.length;
        const anglePerFormation = (Math.PI * 2) / formationsCount;
        for (let i = 0; i < formationsCount; i++) {
            const startAngle = (i * anglePerFormation) - Math.PI / 2;
            const endAngle = startAngle + anglePerFormation;
            ctx.strokeStyle = '#444444';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.stroke();
            const textAngle = startAngle + anglePerFormation / 2;
            const textX = centerX + Math.cos(textAngle) * (radius * 0.65);
            const textY = centerY + Math.sin(textAngle) * (radius * 0.65);
            this.drawFormationPattern(ctx, textX, textY, i, this.screenAdapter.scaleValue(25));
        }
    }
    drawStaticNames() {
        const ctx = this.staticContext;
        const canvasSize = this.screenAdapter.scaleValue(320);
        const centerX = canvasSize / 2;
        const centerY = canvasSize / 2;
        const radius = this.screenAdapter.scaleValue(140);
        const formationsCount = AllFormations.length;
        const anglePerFormation = (Math.PI * 2) / formationsCount;
        ctx.font = `${this.screenAdapter.scaleFont(10)}px sans-serif`;
        ctx.textAlign = 'center';
        for (let i = 0; i < formationsCount; i++) {
            const startAngle = (i * anglePerFormation) - Math.PI / 2;
            const textAngle = startAngle + anglePerFormation / 2;
            const textX = centerX + Math.cos(textAngle) * (radius * 0.65);
            const textY = centerY + Math.sin(textAngle) * (radius * 0.65);
            ctx.fillStyle = '#aaaaaa';
            ctx.fillText(AllFormations[i].name, textX, textY + this.screenAdapter.scaleValue(35));
        }
    }
    drawFormationPattern(ctx: CanvasRenderingContext2D, x: number, y: number, type: number, size: number) {
        ctx.save();
        ctx.translate(x, y);
        switch (type) {
            case 0:
                this.drawFireFormation(ctx, size);
                break;
            case 1:
                this.drawWindFormation(ctx, size);
                break;
            case 2:
                this.drawWaterFormation(ctx, size);
                break;
            case 3:
                this.drawMoonFormation(ctx, size);
                break;
            case 4:
                this.drawChaosFormation(ctx, size);
                break;
            case 5:
                this.drawTreeFormation(ctx, size);
                break;
            case 6:
                this.drawAbyssFormation(ctx, size);
                break;
            case 7:
                this.drawConstellationFormation(ctx, size);
                break;
        }
        ctx.restore();
    }
    drawFireFormation(ctx: CanvasRenderingContext2D, size: number) {
        ctx.strokeStyle = '#FF4444';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(0, -size + i * 8);
            ctx.lineTo(-size * 0.5 + i * 4, size - i * 8);
            ctx.lineTo(size * 0.5 - i * 4, size - i * 8);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.fillStyle = '#FF6666';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
        ctx.fill();
    }
    drawWindFormation(ctx: CanvasRenderingContext2D, size: number) {
        ctx.strokeStyle = '#44FF44';
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(Math.cos(angle) * size * 0.7, Math.sin(angle) * size * 0.7, size * 0.15, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.fillStyle = '#66FF66';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
    }
    drawWaterFormation(ctx: CanvasRenderingContext2D, size: number) {
        ctx.strokeStyle = '#4444FF';
        ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, size - i * 10, 0, Math.PI * 2);
            ctx.stroke();
        }
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI / 3);
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * size * 0.3, Math.sin(angle) * size * 0.3);
            ctx.lineTo(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.8);
            ctx.stroke();
        }
        ctx.fillStyle = '#6666FF';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.2, 0, Math.PI * 2);
        ctx.fill();
    }
    drawMoonFormation(ctx: CanvasRenderingContext2D, size: number) {
        ctx.strokeStyle = '#AA44FF';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            const angle = (i * Math.PI * 2 / 5) - Math.PI / 2;
            const nextAngle = ((i + 2) * Math.PI * 2 / 5) - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * size * 0.4, Math.sin(angle) * size * 0.4);
            ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
            ctx.lineTo(Math.cos(nextAngle) * size * 0.4, Math.sin(nextAngle) * size * 0.4);
            ctx.stroke();
        }
        ctx.fillStyle = '#CC66FF';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
    }
    drawChaosFormation(ctx: CanvasRenderingContext2D, size: number) {
        ctx.strokeStyle = '#8B0000';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2 / 8);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
            ctx.stroke();
        }
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, size * (0.3 + i * 0.25), 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.strokeStyle = '#FF4500';
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI / 3) + Math.PI / 6;
            const x1 = Math.cos(angle) * size * 0.5;
            const y1 = Math.sin(angle) * size * 0.5;
            const x2 = Math.cos(angle + Math.PI) * size * 0.5;
            const y2 = Math.sin(angle + Math.PI) * size * 0.5;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        ctx.fillStyle = '#8B0000';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
    }
    drawTreeFormation(ctx: CanvasRenderingContext2D, size: number) {
        ctx.strokeStyle = '#228B22';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, size * 0.8);
        ctx.lineTo(0, -size * 0.2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.1);
        ctx.lineTo(-size * 0.5, -size * 0.6);
        ctx.moveTo(0, -size * 0.1);
        ctx.lineTo(size * 0.5, -size * 0.6);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.3);
        ctx.lineTo(-size * 0.35, -size * 0.8);
        ctx.moveTo(0, -size * 0.3);
        ctx.lineTo(size * 0.35, -size * 0.8);
        ctx.stroke();
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.arc(0, -size * 0.6, size * 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#32CD32';
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(0, -size * 0.6, size * (0.2 + i * 0.15), 0, Math.PI * 2);
            ctx.stroke();
        }
    }
    drawAbyssFormation(ctx: CanvasRenderingContext2D, size: number) {
        ctx.strokeStyle = '#4B0082';
        ctx.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, size * (0.15 + i * 0.15), 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.strokeStyle = '#800080';
        ctx.lineWidth = 3;
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI * 2 / 12);
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * size * 0.2, Math.sin(angle) * size * 0.2);
            ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
            ctx.stroke();
        }
        ctx.fillStyle = '#4B0082';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.05, 0, Math.PI * 2);
        ctx.fill();
    }
    drawConstellationFormation(ctx: CanvasRenderingContext2D, size: number) {
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 2;
        const starPositions: number[][] = [];
        for (let i = 0; i < 7; i++) {
            const angle = (i * Math.PI * 2 / 7) - Math.PI / 2;
            const r = size * 0.7;
            starPositions.push([Math.cos(angle) * r, Math.sin(angle) * r]);
        }
        ctx.fillStyle = '#FFD700';
        for (let pos of starPositions) {
            ctx.beginPath();
            ctx.arc(pos[0], pos[1], size * 0.08, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 1;
        for (let i = 0; i < starPositions.length; i++) {
            const next = (i + 2) % starPositions.length;
            ctx.beginPath();
            ctx.moveTo(starPositions[i][0], starPositions[i][1]);
            ctx.lineTo(starPositions[next][0], starPositions[next][1]);
            ctx.stroke();
        }
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2);
        ctx.fill();
    }
    spinWheel() {
        const randomAngle = Math.random() * 360;
        const finalAngle = 360 * 5 + randomAngle;
        const steps = 100;
        const duration = 4000;
        const stepDuration = duration / steps;
        let currentStep = 0;
        const animate = () => {
            if (currentStep < steps) {
                currentStep++;
                const progress = currentStep / steps;
                const easeOut = 1 - Math.pow(1 - progress, 3);
                this.rotateDegree = finalAngle * easeOut;
                setTimeout(animate, stepDuration);
            }
            else {
                this.determineResult(randomAngle);
                this.showResult = true;
                this.startFlash();
            }
        };
        animate();
    }
    determineResult(angle: number) {
        const normalizedAngle = angle % 360;
        const formationsCount = AllFormations.length;
        const anglePerFormation = 360 / formationsCount;
        let formationIndex = Math.floor(normalizedAngle / anglePerFormation);
        formationIndex = (formationsCount - formationIndex) % formationsCount;
        this.selectedFormation = AllFormations[formationIndex];
    }
    startFlash() {
        let flashCount = 0;
        const maxFlash = 6;
        const flash = () => {
            if (flashCount < maxFlash) {
                this.flashOpacity = this.flashOpacity === 1 ? 0.3 : 1;
                flashCount++;
                setTimeout(flash, 300);
            }
            else {
                this.flashOpacity = 1;
            }
        };
        flash();
    }
    FormationDisplay(formation: Formation, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Canvas.create(this.canvasContext);
            Canvas.width(this.screenAdapter.scaleValue(240));
            Canvas.height(this.screenAdapter.scaleValue(240));
            Canvas.onReady(() => {
                this.drawFormation(formation);
            });
        }, Canvas);
        Canvas.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(formation.name);
            Text.fontSize(this.screenAdapter.scaleFont(20));
            Text.fontColor('#FFD700');
            Text.margin({ top: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(formation.description);
            Text.fontSize(this.screenAdapter.scaleFont(12));
            Text.fontColor('#aaaaaa');
            Text.margin({ top: 8 });
            Text.padding({ left: 20, right: 20 });
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        Column.pop();
    }
    drawFormation(formation: Formation) {
        const ctx = this.canvasContext;
        const canvasSize = this.screenAdapter.scaleValue(240);
        const centerX = canvasSize / 2;
        const centerY = canvasSize / 2;
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvasSize, canvasSize);
        const formationIndex = AllFormations.findIndex(f => f.name === formation.name);
        this.drawFormationPattern(ctx, centerX, centerY, formationIndex, this.screenAdapter.scaleValue(80));
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.screenAdapter.scaleValue(100), 0, Math.PI * 2);
        ctx.stroke();
    }
    getItemName(): string {
        if (!this.selectedFormation)
            return '未知物品';
        const items = [
            '炼金药剂',
            '魔力结晶',
            '元素精华',
            '神秘法器',
            '炼金催化剂',
            '魔法增幅器'
        ];
        const index = AllFormations.findIndex(f => f.name === this.selectedFormation!.name);
        return items[index % items.length];
    }
    getItemLevel(): number {
        if (!this.selectedFormation)
            return 1;
        let baseLevel = this.selectedFormation.complexity + Math.floor(Math.random() * 3);
        if (this.selectedFormation.levelBonus) {
            baseLevel += this.selectedFormation.levelBonus;
        }
        else {
            if (this.selectedFormation.name === '赤焰') {
                baseLevel += 1;
            }
            else if (this.selectedFormation.name === '翠风') {
                baseLevel += 1;
            }
            else if (this.selectedFormation.name === '幽蓝') {
                baseLevel += 2;
            }
            else if (this.selectedFormation.name === '紫月') {
                baseLevel += 2;
            }
        }
        return Math.min(15, baseLevel);
    }
    getItemRarity(): string {
        const level = this.getItemLevel();
        if (level >= 8)
            return '★★★★★ 传说';
        if (level >= 6)
            return '★★★★ 史诗';
        if (level >= 4)
            return '★★★ 稀有';
        if (level >= 2)
            return '★★ 优秀';
        return '★ 普通';
    }
    getItemRarityColor(): string {
        const level = this.getItemLevel();
        if (level >= 8)
            return '#FFD700'; // 金色
        if (level >= 6)
            return '#FF00FF'; // 紫色
        if (level >= 4)
            return '#00BFFF'; // 蓝色
        if (level >= 2)
            return '#00FF00'; // 绿色
        return '#FFFFFF'; // 白色
    }
    addItemToInventory() {
        if (!this.selectedFormation)
            return;
        if (this.selectedFormation.failChance && this.selectedFormation.failChance > 0) {
            const roll = Math.random() * 100;
            if (roll < this.selectedFormation.failChance) {
                return;
            }
        }
        const itemName = this.getItemName();
        const level = this.getItemLevel();
        this.gameManager.addGold(level * 50);
        const materials = ['red_spider', 'slime_heart', 'fairy_dust', 'cat_eye', 'phoenix_ash', 'demon_heart'];
        const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
        this.gameManager.addMaterial(randomMaterial, Math.floor(Math.random() * 5) + 1);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
