if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HorizontalItem_Params {
    source?: ResourceStr;
    pathStack?: NavPathStack;
    imageSrc?: Resource;
    videoName?: ResourceStr;
    param?: ParamItem;
}
interface VideoModule_Params {
    source?: ResourceStr;
    pathStack?: NavPathStack;
    moduleName?: string;
}
import { HORIZONTAL_VIDEOS } from "@bundle:com.example.simplevideo/entry/ets/viewmodel/VideoData";
import { NET } from "@bundle:com.example.simplevideo/entry/ets/common/constants/CommonConstants";
import type { MARGIN_FONT_SIZE, STRING_PERCENT } from "@bundle:com.example.simplevideo/entry/ets/common/constants/CommonConstants";
import type { HorizontalVideoItem } from '../viewmodel/HorizontalVideoItem';
import { ParamItem } from "@bundle:com.example.simplevideo/entry/ets/viewmodel/ParamItem";
export class VideoModule extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__source = this.createStorageLink('source', '', "source");
        this.pathStack = new NavPathStack();
        this.moduleName = '';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VideoModule_Params) {
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
        if (params.moduleName !== undefined) {
            this.moduleName = params.moduleName;
        }
    }
    updateStateVars(params: VideoModule_Params) {
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
    private moduleName: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({
                left: "3.3%",
                right: "3.3%"
            });
            Column.width("93.3%");
            Column.justifyContent(FlexAlign.Center);
            Column.borderRadius(24);
            Column.borderStyle(BorderStyle.Solid);
            Column.borderColor(Color.White);
            Column.backgroundColor({ "id": 16777259, "type": 10001, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Row });
            Flex.margin({
                left: "3.3%",
                bottom: 12,
                top: 12
            });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.moduleName);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bolder);
        }, Text);
        Text.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: 12 });
            List.listDirection(Axis.Horizontal);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new HorizontalItem(this, {
                                        pathStack: this.pathStack,
                                        imageSrc: item.image,
                                        videoName: item.name
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/IndexModule.ets", line: 46, col: 13 });
                                    ViewPU.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            pathStack: this.pathStack,
                                            imageSrc: item.image,
                                            videoName: item.name
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "HorizontalItem" });
                        }
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, HORIZONTAL_VIDEOS, forEachItemGenFunction, (item: HorizontalVideoItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class HorizontalItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__source = this.createStorageLink('source', '', "source");
        this.pathStack = new NavPathStack();
        this.imageSrc = { "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.simplevideo", "moduleName": "entry" };
        this.videoName = '';
        this.param = new ParamItem();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HorizontalItem_Params) {
        if (params.pathStack !== undefined) {
            this.pathStack = params.pathStack;
        }
        if (params.imageSrc !== undefined) {
            this.imageSrc = params.imageSrc;
        }
        if (params.videoName !== undefined) {
            this.videoName = params.videoName;
        }
        if (params.param !== undefined) {
            this.param = params.param;
        }
    }
    updateStateVars(params: HorizontalItem_Params) {
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
    private imageSrc: Resource;
    private videoName: ResourceStr;
    private param: ParamItem;
    aboutToAppear(): void {
        this.param.source = this.source;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.imageSrc);
            Image.width(132);
            Image.height(94);
            Image.onClick(() => {
                this.source = NET;
                this.pathStack.pushPathByName('VideoPlayerPage', this.param);
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.videoName);
            Text.margin({
                top: 12,
                bottom: 12
            });
            Text.textAlign(TextAlign.Center);
            Text.fontSize(16);
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
