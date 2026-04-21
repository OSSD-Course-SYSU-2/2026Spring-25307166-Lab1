import { VideoPlayerModel } from '../model/VideoPlayerModel';
import { ALL_PERCENT, STRING_PERCENT, COMMON_NUM_DURATION } from '../common/constants/CommonConstants';
import { changeSliderTime, prepared, finish } from '../common/utils/VideoUtils'; // 根据实际路径调整

@Component
export struct VideoPlayer {
  @Consume videoPlayerModel: VideoPlayerModel;
  private previewUris: Resource = $r('app.media.preview');
  @Prop source: ResourceStr = '';

  build() {
    Column() {
      Video({
        src: this.source,
        previewUri: this.previewUris,
        controller: this.videoPlayerModel.controller
      })
        .width(ALL_PERCENT)
        .height(STRING_PERCENT.NINETY_PERCENT)
        .controls(false)
        .autoPlay(false)
        .objectFit(ImageFit.Contain)
        .loop(false)
        .onUpdate((event) => {
          this.videoPlayerModel.currentTime = event.time;
          this.videoPlayerModel.currentStringTime = changeSliderTime(this.videoPlayerModel.currentStringTime);
        })
        .onPrepared((event?: DurationObject) => {
          if (event !== undefined) {
            prepared(this.videoPlayerModel, event);
          }
        })
        .onFinish(() => {
          finish(this.videoPlayerModel);
        })
        .onError(() => {
          this.getUIContext().getPromptAction().showToast({
            duration: COMMON_NUM_DURATION,
            message: $r('app.string.network_error')
          });
        })

      // 视频进度条组件（如果你有的话，没有则删除下面一行）
      // VideoSlider()
    }
    .width(ALL_PERCENT)
    .height(ALL_PERCENT)
  }
}

export interface DurationObject {
  duration: number;
}