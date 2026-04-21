
// path:entry/src/main/ets/common/bean/DanmakuItem.ets
export class DanmakuItem {
  id: string;
  content: string;
  positionY: string; // 垂直位置偏移
  visible: boolean = true;   // 是否可见
  currentX: string;  // 当前X位置（支持百分比）

  constructor(
    id: string,
    content: string,
    positionY: string = '50%'
  ) {
    this.id = id;
    this.content = content;
    this.positionY = positionY;
    this.currentX = '0%'; // 默认位置
  }
}