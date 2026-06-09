import display from "@ohos:display";
export enum DeviceType {
    PHONE = "phone",
    TABLET = "tablet",
    DESKTOP = "desktop"
}
export interface ScreenSize {
    width: number;
    height: number;
    density: number;
}
export class ScreenAdapter {
    private static instance: ScreenAdapter;
    private screenSize: ScreenSize = { width: 360, height: 640, density: 1 };
    private deviceType: DeviceType = DeviceType.PHONE;
    private constructor() {
        this.initScreenSize();
    }
    static getInstance(): ScreenAdapter {
        if (!ScreenAdapter.instance) {
            ScreenAdapter.instance = new ScreenAdapter();
        }
        return ScreenAdapter.instance;
    }
    private initScreenSize() {
        try {
            let displayClass = display.getDefaultDisplaySync();
            this.screenSize.width = displayClass.width;
            this.screenSize.height = displayClass.height;
            this.screenSize.density = displayClass.densityDPI / 160;
            this.deviceType = this.determineDeviceType();
        }
        catch (error) {
            console.error('ScreenAdapter init error:', error);
        }
    }
    private determineDeviceType(): DeviceType {
        const minDimension = Math.min(this.screenSize.width, this.screenSize.height);
        const maxDimension = Math.max(this.screenSize.width, this.screenSize.height);
        if (maxDimension < 600) {
            return DeviceType.PHONE;
        }
        else if (maxDimension < 900 || minDimension < 600) {
            return DeviceType.TABLET;
        }
        else {
            return DeviceType.DESKTOP;
        }
    }
    getScreenSize(): ScreenSize {
        return this.screenSize;
    }
    getDeviceType(): DeviceType {
        return this.deviceType;
    }
    scaleValue(value: number): number {
        if (this.deviceType === DeviceType.PHONE) {
            return Math.round(value * 0.9);
        }
        else if (this.deviceType === DeviceType.TABLET) {
            return Math.round(value * 1.0);
        }
        else {
            return Math.round(value * 1.2);
        }
    }
    scaleFont(fontSize: number): number {
        if (this.deviceType === DeviceType.PHONE) {
            return Math.round(fontSize);
        }
        else if (this.deviceType === DeviceType.TABLET) {
            return Math.round(fontSize * 1.2);
        }
        else {
            return Math.round(fontSize * 1.4);
        }
    }
    getColumns(): number {
        switch (this.deviceType) {
            case DeviceType.PHONE:
                return 1;
            case DeviceType.TABLET:
                return 2;
            case DeviceType.DESKTOP:
                return 3;
        }
    }
    getGridSpan(): number {
        switch (this.deviceType) {
            case DeviceType.PHONE:
                return 6;
            case DeviceType.TABLET:
                return 4;
            case DeviceType.DESKTOP:
                return 3;
        }
    }
    getCardHeight(): number {
        switch (this.deviceType) {
            case DeviceType.PHONE:
                return 80;
            case DeviceType.TABLET:
                return 100;
            case DeviceType.DESKTOP:
                return 120;
        }
    }
    getImageSize(): number {
        switch (this.deviceType) {
            case DeviceType.PHONE:
                return 40;
            case DeviceType.TABLET:
                return 60;
            case DeviceType.DESKTOP:
                return 80;
        }
    }
    getPadding(): number {
        switch (this.deviceType) {
            case DeviceType.PHONE:
                return 15;
            case DeviceType.TABLET:
                return 25;
            case DeviceType.DESKTOP:
                return 35;
        }
    }
    getMargin(): number {
        switch (this.deviceType) {
            case DeviceType.PHONE:
                return 10;
            case DeviceType.TABLET:
                return 15;
            case DeviceType.DESKTOP:
                return 20;
        }
    }
    isLandscape(): boolean {
        return this.screenSize.width > this.screenSize.height;
    }
}
