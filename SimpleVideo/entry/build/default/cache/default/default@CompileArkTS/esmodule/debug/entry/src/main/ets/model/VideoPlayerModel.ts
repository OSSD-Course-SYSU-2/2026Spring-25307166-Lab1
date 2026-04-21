import { START_TIME } from "@bundle:com.example.simplevideo/entry/ets/common/constants/CommonConstants";
export class VideoPlayerModel {
    public currentTime: number = 0;
    public durationTime: number = 0;
    public isPlay: boolean = false;
    public isOpacity: boolean = false;
    public durationStringTime: string = START_TIME;
    public currentStringTime: string = START_TIME;
    public flag: boolean = false;
    public isLoading: boolean = false;
    public progressVal: number = 0;
    public controller: VideoController = new VideoController();
}
