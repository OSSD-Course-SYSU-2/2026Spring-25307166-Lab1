// path:entry/src/main/ets/common/bean/DanmakuItem.ets
export class DanmakuItem {
    id: string;
    content: string;
    startX: number; // 起始X位置
    targetX: number; // 目标X位置
    top: number; // Y轴位置（行号）
    duration: number; // 动画时长
    currentX: number; // 当前X位置
    isFixed: boolean = false; // 是否为固定弹幕
    visible: boolean = true; // 是否可见
    progress: number = 0; // 弹幕出现时的视频进度（秒）
    constructor(id: string, content: string, positionY: string = '0px', progress: number = 0, startX?: number, targetX?: number, top?: number, duration?: number) {
        this.id = id;
        this.content = content;
        this.progress = progress;
        this.startX = startX || 0;
        this.targetX = targetX || 0;
        this.top = top || 0;
        this.duration = duration || 8000;
        this.currentX = startX || 0;
    }
}
