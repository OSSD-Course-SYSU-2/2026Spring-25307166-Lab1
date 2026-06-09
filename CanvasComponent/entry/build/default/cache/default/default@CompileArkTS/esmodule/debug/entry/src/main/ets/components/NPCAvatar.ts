if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NPCAvatar_Params {
    npcId?: string;
    avatarSize?: number;
}
export class NPCAvatar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__npcId = new SynchedPropertySimpleOneWayPU(params.npcId, this, "npcId");
        this.__avatarSize = new SynchedPropertySimpleOneWayPU(params.avatarSize, this, "avatarSize");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NPCAvatar_Params) {
        if (params.avatarSize === undefined) {
            this.__avatarSize.set(80);
        }
    }
    updateStateVars(params: NPCAvatar_Params) {
        this.__npcId.reset(params.npcId);
        this.__avatarSize.reset(params.avatarSize);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__npcId.purgeDependencyOnElmtId(rmElmtId);
        this.__avatarSize.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__npcId.aboutToBeDeleted();
        this.__avatarSize.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __npcId: SynchedPropertySimpleOneWayPU<string>;
    get npcId() {
        return this.__npcId.get();
    }
    set npcId(newValue: string) {
        this.__npcId.set(newValue);
    }
    private __avatarSize: SynchedPropertySimpleOneWayPU<number>;
    get avatarSize() {
        return this.__avatarSize.get();
    }
    set avatarSize(newValue: number) {
        this.__avatarSize.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(this.avatarSize);
            Stack.height(this.avatarSize);
            Stack.border({
                width: 2,
                color: this.getBorderColor()
            });
            Stack.borderRadius(this.avatarSize / 2);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.avatarSize);
            Column.height(this.avatarSize);
            Column.borderRadius(this.avatarSize / 2);
            Column.linearGradient({
                angle: this.getGradientAngle(),
                colors: this.getGradientColors()
            });
            Column.shadow({
                radius: this.avatarSize / 4,
                color: this.getGlowColor(),
                offsetX: 0,
                offsetY: 0
            });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getInitial());
            Text.fontSize(this.avatarSize * 0.45);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Stack.pop();
    }
    getInitial(): string {
        return this.npcId.charAt(0).toUpperCase();
    }
    getGradientAngle(): number {
        const hash = this.hashCode(this.npcId);
        return (hash % 360);
    }
    getGradientColors(): Array<[
        string,
        number
    ]> {
        const colorSets: Array<Array<[
            string,
            number
        ]>> = [
            [['#8B0000', 0.0], ['#DC143C', 0.5], ['#FF4500', 1.0]],
            [['#4B0082', 0.0], ['#8A2BE2', 0.5], ['#9932CC', 1.0]],
            [['#191970', 0.0], ['#4169E1', 0.5], ['#6495ED', 1.0]],
            [['#006400', 0.0], ['#228B22', 0.5], ['#32CD32', 1.0]],
            [['#B8860B', 0.0], ['#DAA520', 0.5], ['#FFD700', 1.0]],
            [['#2F4F4F', 0.0], ['#5F9EA0', 0.5], ['#00CED1', 1.0]],
            [['#483D8B', 0.0], ['#6959CD', 0.5], ['#9370DB', 1.0]],
            [['#800000', 0.0], ['#A0522D', 0.5], ['#CD853F', 1.0]] // 褐红
        ];
        const index = Math.abs(this.hashCode(this.npcId) % colorSets.length);
        return colorSets[index];
    }
    getBorderColor(): string {
        const borders = [
            '#FFD700',
            '#C0C0C0',
            '#CD7F32',
            '#E5E4E2',
            '#B76E79',
            '#8A2BE2',
            '#00CED1',
            '#FF6347' // 番茄红
        ];
        const index = Math.abs(this.hashCode(this.npcId) % borders.length);
        return borders[index];
    }
    getGlowColor(): string {
        const glows = [
            'rgba(255, 215, 0, 0.3)',
            'rgba(138, 43, 226, 0.3)',
            'rgba(0, 191, 255, 0.3)',
            'rgba(50, 205, 50, 0.3)',
            'rgba(255, 69, 0, 0.3)',
            'rgba(255, 20, 147, 0.3)',
            'rgba(72, 61, 139, 0.3)',
            'rgba(184, 134, 11, 0.3)'
        ];
        const index = Math.abs(this.hashCode(this.npcId) % glows.length);
        return glows[index];
    }
    hashCode(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
