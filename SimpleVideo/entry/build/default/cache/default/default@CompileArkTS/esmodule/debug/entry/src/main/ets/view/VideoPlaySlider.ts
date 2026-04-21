if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VideoSlider_Params {
    videoPlayerModel?: VideoPlayerModel;
}
import { iconOnclick, sliderOnchange } from "@bundle:com.example.simplevideo/entry/ets/model/VideoControll";
import { ALL_PERCENT, SMALL_TRACK_THICK_NESS, DEFAULT_OPACITY, BIG_TRACK_THICK_NESS, IMAGE_SIZE } from "@bundle:com.example.simplevideo/entry/ets/common/constants/CommonConstants";
import type { MARGIN_FONT_SIZE, STRING_PERCENT } from "@bundle:com.example.simplevideo/entry/ets/common/constants/CommonConstants";
import type { VideoPlayerModel } from '../model/VideoPlayerModel';
export class VideoSlider extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__videoPlayerModel = this.initializeConsume("videoPlayerModel", "videoPlayerModel");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoSlider_Params) {
    }
    updateStateVars(params: VideoSlider_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__videoPlayerModel.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__videoPlayerModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __videoPlayerModel: ObservedPropertyAbstractPU<VideoPlayerModel>;
    get videoPlayerModel() {
        return this.__videoPlayerModel.get();
    }
    set videoPlayerModel(newValue: VideoPlayerModel) {
        this.__videoPlayerModel.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.opacity(this.videoPlayerModel.isOpacity ? DEFAULT_OPACITY : 1);
            Row.width(ALL_PERCENT);
            Row.alignItems(VerticalAlign.Center);
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.videoPlayerModel.isPlay ? { "id": 16777264, "type": 20000, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" } : { "id": 16777265, "type": 20000, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" });
            Image.width(IMAGE_SIZE);
            Image.height(IMAGE_SIZE);
            Image.margin({ left: 12 });
            Image.onClick(() => {
                iconOnclick(this.videoPlayerModel);
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.videoPlayerModel.currentStringTime);
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                value: this.videoPlayerModel.currentTime,
                min: 0,
                max: this.videoPlayerModel.durationTime,
                step: 1,
                style: SliderStyle.OutSet
            });
            Slider.blockColor({ "id": 16777259, "type": 10001, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" });
            Slider.width("46.7%");
            Slider.trackColor(Color.Gray);
            Slider.selectedColor({ "id": 16777259, "type": 10001, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" });
            Slider.showSteps(true);
            Slider.showTips(true);
            Slider.trackThickness(this.videoPlayerModel.isOpacity ? SMALL_TRACK_THICK_NESS : BIG_TRACK_THICK_NESS);
            Slider.onChange((value: number, mode: SliderChangeMode) => {
                sliderOnchange(this.videoPlayerModel, value, mode);
            });
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.videoPlayerModel.durationStringTime);
            Text.fontSize(16);
            Text.margin({ right: 12 });
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
