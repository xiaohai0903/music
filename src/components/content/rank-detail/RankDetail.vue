<template>
<transition>
    <div class="music-list">
        <div class="header">
            <div class="back" @click="back">
                <i class="fa fa-angle-left"><</i>
            </div>
            <div class="text">
                <h1 class="title">{{headerTitle}}</h1>
            </div>
        </div>
        <Scroll class="list"
                ref="list"
                :probe-type="3"
                :listen-scroll="true"
        >
            <div class="music-list-wrapper">
                <div class="bg-image" ref="bgImage" :style="bgStyle">
                    <div class="filter"></div>
                    <div class="text">
                        <h2 class="list-title">
                            {{title}}
                        </h2>
                        <p class="update">{{updateTime}}</p>
                    </div>
                </div>
                <div class="song-list-wrapper">
                    <div class="sequence-play" v-show="listDetail.length">
                        <i class="iconfont icon-bofangicon"></i>
                        <span class="text">播放全部</span>
                        <span class="count">(共{{listDetail.length}}首)</span>
                    </div>
                    <SongList :songs="listDetail"></SongList>
                </div>
            </div>
            <div class="loading-content">

            </div>
        </Scroll>
    </div>
</transition>
</template>

<script>
    import Scroll from "../../../base/scroll/Scroll";
    import SongList from "../../../base/song-list/SongList";
    import Loading from "../../../base/loading/Loading";

    import {mapGetters,mapActions} from'vuex'
    import {createSong} from "../../common/js/song";
    import {playlistMixin} from "../../common/js/mixin";

    export default {
        mixins:[playlistMixin],
        name: "Rank-Detail",
        components:{
            Scroll,
            SongList,
            Loading
        },
        data(){
            return {
                headerTitle:'歌手',
                listDetail:[],
            }
        },
        created() {
            this._normalizeSongs(this.topList.tracks)
        },
        computed:{
            ...mapGetters(['topList']),
            bgStyle(){
                return `background-image:url(${this.topList.coverImgUrl})`
                console.log(this.topList)
            },
            headerTitleTouchDown(){
              return this.topList.name
            },
            title(){
                return this.headerTitleTouchDown
            },
            updateTime(){
                let time = new Date(this.topList.updateTime)
                let month= time.getMonth()+1
                let day = time.getDate()
                return `最近更新:${month}月${day}日`
            }
        },
        methods:{
            handlePlaylist(){
                this.$refs.list.refresh()
            },
            _normalizeSongs(list){
                if(!this.topList.id){
                    this.$router.push('/rank')
                    return
                }
                let ret =[]
                list.forEach((item) =>{
                    ret.push(createSong(item))
                })
                this.listDetail =ret
            },
            back(){
                this.$router.back()
            }
        },
    }
</script>

<style scoped lang="scss">
@import "../../common/scss/variable";
@import "../../common/scss/mixin";

    .music-list{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
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
                    padding-top: 75%;
                    background-size: cover;
                    background-position: 0 20%;
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
                        bottom: 50px;
                        left: 20px;
                        color: #fff;
                        .list-title{
                            position: absolute;
                            bottom: 0;
                            font-style: italic;
                            font-size: $font-size-large;
                            line-height: 18px;
                            font-weight: bold;
                            letter-spacing: 1px;
                        }
                        .update{
                            position: absolute;
                            top: 45px;
                            left: 7px;
                            line-height: 14px;
                            font-size: $font-size-small;
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
                        border-bottom: 1px solid rgb(228,228,228);
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
