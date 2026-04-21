if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SwiperItem_Params {
    source?: ResourceStr;
    imageSrc?: Resource;
    paramItem?: ParamItem;
    pathStack?: NavPathStack;
}
interface SwiperVideo_Params {
    source?: ResourceStr;
    pathStack?: NavPathStack;
}
import { SWIPER_VIDEOS } from "@bundle:com.example.simplevideo/entry/ets/viewmodel/VideoData";
import type { STRING_PERCENT, MARGIN_FONT_SIZE } from '../common/constants/CommonConstants';
import type { SwiperVideoItem } from '../viewmodel/SwiperVideoItem';
import { ParamItem } from "@bundle:com.example.simplevideo/entry/ets/viewmodel/ParamItem";
export class SwiperVideo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__source = this.createStorageLink('source', '', "source");
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SwiperVideo_Params) {
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: SwiperVideo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__source.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__source.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __source: ObservedPropertyAbstractPU<ResourceStr>;
    get source() {
        return this.__source.get();
    }
    set source(newValue: ResourceStr) {
        this.__source.set(newValue);
    }
    private pathStack: NavPathStack;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height("24.1%");
            Column.width("93.3%");
            Column.backgroundColor({ "id": 16777259, "type": 10001, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" });
            Column.margin({
                left: "3.3%",
                right: "3.3%",
                top: 24
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.autoPlay(true);
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SwiperItem(this, { pathStack: this.pathStack, imageSrc: item.image }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/IndexSwiper.ets", line: 33, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    pathStack: this.pathStack,
                                    imageSrc: item.image
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "SwiperItem" });
                }
            };
            this.forEachUpdateFunction(elmtId, SWIPER_VIDEOS, forEachItemGenFunction, (item: SwiperVideoItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class SwiperItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__source = this.createStorageLink('source', '', "source");
        this.imageSrc = { "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" };
        this.paramItem = new ParamItem();
        this.pathStack = new NavPathStack();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SwiperItem_Params) {
        if (params.imageSrc !== undefined) {
            this.imageSrc = params.imageSrc;
        }
        if (params.paramItem !== undefined) {
            this.paramItem = params.paramItem;
        }
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
    }
    updateStateVars(params: SwiperItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__source.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__source.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __source: ObservedPropertyAbstractPU<ResourceStr>;
    get source() {
        return this.__source.get();
    }
    set source(newValue: ResourceStr) {
        this.__source.set(newValue);
    }
    private imageSrc: Resource;
    private paramItem: ParamItem;
    private pathStack: NavPathStack;
    aboutToAppear() {
        this.paramItem.source = this.source;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.imageSrc);
            Image.borderRadius(12);
            Image.onClick(() => {
                this.source = { "id": 0, "type": 30000, params: ['videoTest.mp4'], "bundleName": "com.example.simplevideo", "moduleName": "entry" };
                this.pathStack.pushPathByName('VideoPlayerPage', undefined);
            });
        }, Image);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
