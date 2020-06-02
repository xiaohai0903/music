import {playMode} from "../components/common/js/config";


const state = {
    topList:{},
    playlist:[],
    musicList:{},
    singer:{},
    //顺序列表
    sequenceList:[],
    //播放模式
    mode: playMode.sequence,
    currentIndex: -1,
    fullScreen: false,
    playing: false,

}


export default state
