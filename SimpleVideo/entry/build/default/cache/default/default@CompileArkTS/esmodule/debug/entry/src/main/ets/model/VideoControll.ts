import { COMMON_NUM_MINUTE, COMMON_NUM_DOUBLE, ZERO_STR, SPLIT } from "@bundle:com.example.simplevideo/entry/ets/common/constants/CommonConstants";
import type { STACK_STYLE } from "@bundle:com.example.simplevideo/entry/ets/common/constants/CommonConstants";
import type { VideoPlayerModel } from './VideoPlayerModel';
import type { DurationObject } from '../view/VideoPlayer';
/**
 * video component prepared callback
 */
export function prepared(model: VideoPlayerModel, event: DurationObject) {
    model.durationTime = event.duration;
    let second: number = event.duration % COMMON_NUM_MINUTE;
    let min: number = Number.parseInt((event.duration / COMMON_NUM_MINUTE).toString());
    let head = min < COMMON_NUM_DOUBLE ? `${ZERO_STR}${min}` : min;
    let end = second < COMMON_NUM_DOUBLE ? `${ZERO_STR}${second}` : second;
    model.durationStringTime = `${head}${SPLIT}${end}`;
    model.flag = true;
}
/**
 * video component finish callback
 */
export function finish(model: VideoPlayerModel) {
    model.isPlay = false;
    model.isOpacity = false;
}
/**
 * video slider component onchange callback
 */
export function sliderOnchange(model: VideoPlayerModel, value: number, mode: SliderChangeMode) {
    model.currentTime = Number.parseInt(value.toString());
    model.controller.setCurrentTime(Number.parseInt(value.toString()), SeekMode.PreviousKeyframe);
    if (mode === SliderChangeMode.Begin) {
        model.isOpacity = false;
    }
    if (mode === SliderChangeMode.Moving) {
        model.isOpacity = false;
    }
    if (mode === SliderChangeMode.End) {
        model.isOpacity = true;
    }
}
/**
 * get video  string of current time
 * @param the number of current time
 * @return the string of current time
 */
export function changeSliderTime(value: number): string {
    let second: number = value % COMMON_NUM_MINUTE;
    let min: number = Number.parseInt((value / COMMON_NUM_MINUTE).toString());
    let head = min < COMMON_NUM_DOUBLE ? `${ZERO_STR}${min}` : min;
    let end = second < COMMON_NUM_DOUBLE ? `${ZERO_STR}${second}` : second;
    let nowTime = `${head}${SPLIT}${end}`;
    return nowTime;
}
/**
 * icon onclick callback
 */
export function iconOnclick(model: VideoPlayerModel) {
    if (model.isPlay === true) {
        model.controller.pause();
        model.isPlay = false;
        model.isOpacity = false;
        return;
    }
    if (model.flag === true) {
        model.controller.start();
        model.isPlay = true;
        model.isOpacity = true;
    }
    else {
        model.isLoading = true;
        // The video loading is not complete. The loading action is displayed.
        let intervalLoading = setInterval(() => {
            if (model.progressVal >= 100) {
                model.progressVal = 0;
            }
            else {
                model.progressVal += 10;
            }
        }, 100);
        // The scheduled task determines whether the video loading is complete.
        let intervalFlag = setInterval(() => {
            if (model.flag === true) {
                model.controller.start();
                model.isPlay = true;
                model.isOpacity = true;
                model.isLoading = false;
                clearInterval(intervalFlag);
                clearInterval(intervalLoading);
            }
        }, 100);
    }
}
