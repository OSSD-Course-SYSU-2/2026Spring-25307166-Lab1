/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { VideoPlayer } from '../view/VideoPlayer';
import {
  MARGIN_FONT_SIZE,
  COMMON_NUM_FONT_WEIGHT,
  ALL_PERCENT,
  STACK_STYLE
} from '../common/constants/CommonConstants';
import { VideoPlayerModel } from '../model/VideoPlayerModel';
import { Danmaku } from '../components/Danmaku';
import { DanmakuItem } from '../common/bean/DanmakuItem';
import common from '@ohos.app.ability.common';
import display from '@ohos.display';

@Builder
export function VideoPlayerPageBuilder() {
  VideoPlayerPage()
}

/**
 * Second page.
 */
@Component
export struct VideoPlayerPage {
  private startIconResource: Resource = $r('app.media.ic_public_play');
  private backIconResource: Resource = $r('app.media.ic_back');
  @Provide videoPlayerModel: VideoPlayerModel = new VideoPlayerModel();
  private pathStack: NavPathStack = new NavPathStack();
  @StorageLink('source') source: ResourceStr = '';
  @State showInput: boolean = false;
  @State inputText: string = '';
  @State danmakuList: DanmakuItem[] = [];
  @State screenWidth: number = 1080; // 屏幕宽度
  private danmakuComponent: Danmaku | null = null; // 弹幕组件引用
  private context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

  async aboutToAppear() {
    // 获取屏幕宽度
    try {
      const displayInfo = display.getDefaultDisplaySync();
      this.screenWidth = displayInfo.width;
      console.log("[弹幕] 屏幕宽度:", this.screenWidth);
    } catch (error) {
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
    } catch (error) {
      console.error('VideoPlayerPage onPageHide error:', error);
    }
  }

  aboutToDisappear() {
    // 组件销毁时释放资源
    try {
      if (this.videoPlayerModel && this.videoPlayerModel.controller) {
        this.videoPlayerModel.controller.stop();
      }
    } catch (error) {
      console.error('VideoPlayerPage aboutToDisappear error:', error);
    }
  }

  build() {
    NavDestination() {
      Column() {
        // 顶部返回栏
        Row() {
          Image(this.backIconResource)
            .width(MARGIN_FONT_SIZE.FOURTH_MARGIN)
            .height(MARGIN_FONT_SIZE.FOURTH_MARGIN)
            .margin({ left: MARGIN_FONT_SIZE.FOURTH_MARGIN })
            .onClick(() => {
              this.pathStack.pop();
            })
          Text($r('app.string.back'))
            .fontColor(Color.White)
            .fontSize(MARGIN_FONT_SIZE.FOURTH_MARGIN)
            .fontWeight(COMMON_NUM_FONT_WEIGHT)
            .margin({ left: MARGIN_FONT_SIZE.FIRST_MARGIN })
        }
        .width(ALL_PERCENT)
        .margin({
          left: MARGIN_FONT_SIZE.FIRST_MARGIN,
          top: MARGIN_FONT_SIZE.FIRST_MARGIN
        })
        .justifyContent(FlexAlign.Start)
        .zIndex(1000)

        // 视频播放区域
        Stack() {
          // 视频播放器
          VideoPlayer({ source: this.source })
            .zIndex(0)

          // 播放按钮
          if (!this.videoPlayerModel.isPlay && !this.videoPlayerModel.isLoading) {
            Image(this.startIconResource)
              .width(MARGIN_FONT_SIZE.FIFTH_MARGIN)
              .height(MARGIN_FONT_SIZE.FIFTH_MARGIN)
              .zIndex(STACK_STYLE.IMAGE_Z_INDEX)
          }

          // 加载进度
          if (this.videoPlayerModel.isLoading) {
            Progress({
              value: STACK_STYLE.PROGRESS_VALUE,
              total: STACK_STYLE.PROGRESS_TOTAL,
              type: ProgressType.ScaleRing
            })
              .color(Color.Grey)
              .value(this.videoPlayerModel.progressVal)
              .width(STACK_STYLE.PROGRESS_WIDTH)
              .style({
                strokeWidth: STACK_STYLE.PROGRESS_STROKE_WIDTH,
                scaleCount: STACK_STYLE.PROGRESS_SCALE_COUNT,
                scaleWidth: STACK_STYLE.PROGRESS_SCALE_WIDTH
              })
              .zIndex(STACK_STYLE.PROGRESS_Z_INDEX)
          }

          // 弹幕层
          Danmaku({
            danmakuList: this.danmakuList,
            containerWidth: this.screenWidth,
            currentProgress: this.videoPlayerModel.currentTime
          })
            .width('100%')
            .height('70%')
            .position({ x: 0, y: 0 })
            .zIndex(999)
        }
        .width('100%')
        .height('80%')
        .backgroundColor(Color.Black)

        // 弹幕发送区域
        Row() {
          TextInput({ text: this.inputText, placeholder: '输入弹幕内容' })
            .width('70%')
            .height(40)
            .backgroundColor('#FFFFFF')
            .borderRadius(20)
            .padding({ left: 15, right: 15 })
            .onChange((value: string) => {
              this.inputText = value;
            })

          Button('发送')
            .width('25%')
            .height(40)
            .backgroundColor('#4CAF50')
            .fontColor(Color.White)
            .borderRadius(20)
            .margin({ left: 10 })
            .onClick(() => {
              this.sendDanmaku();
            })
        }
        .width('95%')
        .height(60)
        .margin({ top: 10 })
        .justifyContent(FlexAlign.Center)
      }
      .width(ALL_PERCENT)
      .height(ALL_PERCENT)
      .backgroundColor('#1a1a1a')
    }
    .hideTitleBar(true)
    .hideToolBar(true)
    .height(ALL_PERCENT)
    .backgroundColor(Color.Black)
    .onReady((context: NavDestinationContext) => {
      this.pathStack = context.pathStack;
    });
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
      const newDanmaku = new DanmakuItem(
        Date.now().toString() + Math.random(),
        content,
        `${line * 40}px`,
        currentProgress,
        this.screenWidth,
        -contentWidth,
        line * 40,
        8000
      );

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
}
