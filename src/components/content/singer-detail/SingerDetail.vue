<template>
    <div class="music-list">
        <div class="header" ref="header">
            <div class="back" @click="back">
                <i class="fa fa-angle-left"><</i>
            </div>
            <div class="text">
                <h1 class="title">{{headerTitle}}</h1>
            </div>
        </div>
        <Scroll @scroll="scroll" class="list" :probe-type="3" :listen-scroll="true">
            <div class="music-list-wrapper">
                <div class="bg-image" :style="bgStyle" ref="bgImage">
                    <div class="filter"></div>
                    <div class="text">
                        <h2 class="list-title">{{title}}</h2>
                    </div>
                </div>
                <div class="song-list-wrapper">
                    <div class="sequence-play" v-show="listDetail.length" @click="sequence">
                        <i class="iconfont icon-bofangicon"></i>
                        <span class="text">播放全部</span>
                        <span class="count">(共{{listDetail.length}}首)</span>
                    </div>
                    <SongList @select="selectItem" :songs="listDetail"></SongList>
                </div>
            </div>
            <div class="loading-content">
                <Loading></Loading>
            </div>
        </Scroll>
    </div>
</template>

<script>
    import Scroll from "../../../base/scroll/Scroll";
    import Loading from "../../../base/loading/Loading";
    import SongList from "../../../base/song-list/SongList";

    import {mapGetters,mapActions} from 'vuex'
    import {getSingerDetail} from "../../../axios/singer";
    import {ERR_OK} from "../../common/js/config";
    import {createSong} from "../../common/js/song";

    const RESERVED_HEIGHT = 44

    export default {
        name: "SingerDetail",
        components:{
            Scroll,
            Loading,
            SongList
        },
        data(){
            return {
                listDetail:[],
                scrollY:0,
                node:null,
                headerTitle: '歌手'
            }
        },
        computed:{
            ...mapGetters([
                'singer'
            ]),
            bgStyle(){
                return `background-image:url(${this.singer.avatar})`
            },
            headerTitleTouchDown(){
                let name=''
                if(this.singer.aliaName){
                    name = this.singer.name + `(${this.singer.aliaName})`
                }else{
                    name = this.singer.name
                }
                return name
            },
            title(){
                return this.headerTitleTouchDown
            }
        },
        created() {
            this._getSingerDetail()
        },
        mounted() {
            this.imageHeight = this.$refs.bgImage.clientHeight
            this.minTranSlateY = -this.imageHeight +RESERVED_HEIGHT
        },
        methods:{
            ...mapActions({
                selectPlay:'selectPlay',
                sequencePlay:'sequencePlay'
            }),
            _getSingerDetail(){
                if(!this.singer.id){
                    this.$router.push('/singer')
                }
                getSingerDetail(this.singer.id).then(res =>{
                    if(res.status === ERR_OK)
                    this.node = res.data.hotSongs
                })
            },
            _normalizeSongs(list){
                let ret =[]
                list.forEach((item) =>{
                    ret.push(createSong(item))
                })
                console.log(ret)
                return ret
            },
            selectItem(item,index){
                this.selectPlay({list:this.listDetail,index:index})
            },
            back(){
                this.$router.back()
            },
            scroll(pos){
                this.scrollY=pos.y
            },
            sequence(){
                let list =this.listDetail
                this.sequencePlay({
                    list:list
                })
            }

        },
        watch:{
            node(val){
                this.listDetail = this._normalizeSongs(val)
            },
            scrollY(newY){
                const  percent =Math.abs(newY/this.imageHeight)
                if(newY <(this.minTranSlateY + RESERVED_HEIGHT-20)){
                    this.headerTitle = this.headerTitleTouchDown
                }else {
                    this.headerTitle = '歌手'
                }
                if(newY <0){
                    this.$refs.header.style.background =`rgba(212,68,57,${percent})`
                }else {
                    this.$refs.header.style.background =`rgba(212,68,57,0)`
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../common/scss/variable.scss";
    @import "../../common/scss/mixin.scss";

    .loading-content{
        width:100%;
        height: 100%;
    }
    .music-list{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: $color-background;
        .header{
            position: fixed;
            top: 0;
            width: 100%;
            height: 44px;
            color: #fff;
            z-index: 100;
            .back{
                position: absolute;
                top: 0;
                left: 4px;
                .fa-angle-left{
                    padding: 5px 10px;
                    font-size: 30px;
                }
            }
            .text{
                position: absolute;
                left: 38px;
                line-height: 44px;
                font-size: $font-size-medium-x;
                @include no-wrap()
            }
        }
        .list{
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;
            background: $color-background;
            .music-list-wrapper{
                .bg-image{
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-top: 75%;
                    background-size: cover;
                    background-position: 0 30%;
                    .filter{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: black;
                        opacity: 0.2;
                    }
                    .text{
                        position: absolute;
                        width: 80%;
                        height: 40px;
                        bottom: 40px;
                        left: 20px;
                        color: #fff;
                        .list-title{
                            position: absolute;
                            bottom: 0;
                            font-size: $font-size-large-s;
                            line-height: 18px;
                            font-weight: bold;
                            letter-spacing: 1px;
                        }
                    }
                }
                .song-list-wrapper{
                    padding: 41px 0 20px 0;
                    border-radius: 10px;
                    position: relative;
                    top: -20px;
                    background: $color-background;
                    .sequence-play{
                        position: absolute;
                        top: 0px;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 40px;
                        padding-left: 16px;
                        border-bottom: 1px solid rgb(288,288,288);
                        .iconfont{
                            font-size: 18px;
                            color: $color-text;
                            padding-right: 14px;
                        }
                        .text{
                            font-size: $font-size-medium-x;
                        }
                        .count{
                            font-size: $font-size-medium;
                            color: $color-text-g;
                        }
                    }
                }
            }
        }
    }
</style>
