
// path:entry/src/main/ets/components/Danmaku.ets
import { DanmakuItem } from '../common/bean/DanmakuItem';

const DANMAKU_SPEED = 100; // 弹幕移动速度（像素/秒）
const DANMAKU_DURATION = 8000; // 弹幕显示时长（毫秒）
const DANMAKU_LINE_HEIGHT = 40; // 每行弹幕高度（增加行高避免重叠）
const MAX_DANMAKU_LINES = 6; // 最大弹幕行数（减少行数适应不同屏幕）

@Component
export struct Danmaku {
  @Link danmakuList: DanmakuItem[];
  @Prop containerWidth: number = 1080; // 容器宽度
  @Prop currentProgress: number = 0; // 当前视频进度（秒）
  @State private updateFlag: number = 0; // 用于触发UI更新的标志
  private animationTimer: number = -1; // 定时器ID
  private lastUpdateTime: number = 0;
  private isComponentActive: boolean = false; // 组件是否活跃

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

  build() {
    Stack() {
      ForEach(this.danmakuList, (item: DanmakuItem) => {
        if (item.visible && item.currentX > -item.content.length * 16 - 50) { // 只显示在屏幕内的弹幕
          Text(item.content)
            .fontSize(16)
            .fontColor(Color.White)
            .textShadow({ radius: 2, color: Color.Black, offsetX: 1, offsetY: 1 })
            .position({ x: item.currentX, y: item.top })
            .textAlign(TextAlign.Start)
            .zIndex(999)
        }
      })
    }
    .width('100%')
    .height('100%')
    .clip(true) // 裁剪超出边界的内容
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
    const newItem = new DanmakuItem(
      Date.now().toString() + Math.random(),
      content,
      `${line * DANMAKU_LINE_HEIGHT}px`,
      progress,
      this.containerWidth, // 从右侧开始
      -contentWidth, // 移动到左侧
      line * DANMAKU_LINE_HEIGHT,
      DANMAKU_DURATION
    );

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
}