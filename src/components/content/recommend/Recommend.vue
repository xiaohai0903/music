<template>
    <div class="recommend" ref="recommend">
        <Scroll class="recommend-content" ref="scroll" >
            <div>
                <div v-show="banner.length" v-if="banner.length" class="decorate"></div>
                <div v-if="banner.length" class="slider-wrapper">
                    <Slider>
                        <div v-for="(item,index) in banner" :key="index" @click="selectBanner(item)">
                            <img :src="item.imageUrl" alt="">
                        </div>
                    </Slider>
                </div>
                <div class="recommend-list" ref="recommendList">
                    <h1 class="title">推荐歌单</h1>
                    <ul>
                        <li class="item" v-for="(item, index) in playList" :key="index">
                            <div class="icon">
                                <div class="gradients"></div>
                                <img v-lazy="item.picUrl" alt="">
                            </div>
                            <p class="play-count">
                                <i class="fa fa-headphones"></i>
                                {{Math.floor(item.playCount/10000)}}万
                            </p>
                            <div class="text">
                                <p class="name">{{item.name}}</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="recommend-song" ref="recommendSong">
                    <h1 class="title">推荐歌曲</h1>
                    <ul>
                        <li class="item" v-for="(item, index) in recommendMusic" :key="index">
                            <div class="icon">
                                <img v-lazy="item.image" alt="">
                            </div>
                            <p class="text">{{item.name}}</p>
                            <p class="singer">{{item.singer}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </Scroll>
    </div>
</template>

<script>
    import Scroll from "../../../base/scroll/Scroll";
    import Slider from "../../../base/slider/Slider";

    import {getBanner,getRecommendList,getRecommendMusic} from "../../../axios/recommend";
    import {ERR_OK} from "../../common/js/config";
    import {createRecommendSong} from "../../common/js/song";


    export default {
        name: "Recommend",
        components:{
            Scroll,
            Slider
        },
        data(){
            return{
                type:2,
                banner:[],
                playList:[],
                recommendMusic:[]
            }
        },
        created() {
            this._getBanner(this.type)
            this._getRecommendList()
            this. _getRecommendMusic()
        },
        methods:{
            _getBanner(type){
                getBanner(type).then(res =>{
                    if(res.status ===ERR_OK){
                        // console.log(res)
                        const list =res.data.banners
                        this.banner =list
                        console.log(this.banner)
                    }else {
                        console.error('banner 获取失败')
                    }
                })
            },
            _getRecommendList(){
                getRecommendList().then(res =>{
                    if(res.status ==ERR_OK){
                        this.playList =res.data.result
                        console.log(this.playList)
                    }else {
                        console.error('getRecommendList 获取失败')
                    }
                })
            },
            _getRecommendMusic(){
                getRecommendMusic().then(res =>{
                    if(res.status === ERR_OK){
                        let list =res.data.result.map((item) =>{
                            return createRecommendSong(item)
                        })
                        list.splice(9)
                        this.recommendMusic =list
                        console.log(list)
                    }else{
                        console.error('getRecommendMusic 获取失败')
                    }
                })
            },
            selectBanner(){

            }
        }

    }
</script>

<style scoped lang="scss">
    @import "src/components/common/scss/variable";
    @import "src/components/common/scss/mixin";
    .recommend{
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        z-index: 100;
        .recommend-content{
            width: 100%;
            height: 100%;
            overflow: hidden;
            .decorate{
                position: absolute;
                top: -30vh;
                z-index: -10;
                background: $color-theme;
                width: 100%;
                height: 50vh;
                vertical-align: inherit;
            }
            .slider-wrapper{
                width: 96%;
                margin: 0 auto;
                border-radius: 5px;
                overflow: hidden;
            }
            .recommend-list{
                position: relative;
                box-sizing: border-box;
                width: 100%;
                text-align: center;
                .title{
                    height: 65px;
                    line-height: 65px;
                    text-align: left;
                    font-size: $font-size-medium;
                    font-weight: bold;
                    color: $color-text;
                }
                .item{
                    display: inline-block;
                    position: relative;
                    box-sizing: border-box;
                    width: 33%;
                    padding: 0 1%;
                    .icon{
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        margin-bottom: 5px;
                        .gradients{
                            position: absolute;
                            top: 0;
                            width: 100%;
                            height: 35px;
                            border-radius: 3px;
                            background: linear-gradient(rgba(109, 109, 109, 0.4),rgba(255, 255, 255, 0));
                        }
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 3px;
                        }
                    }
                    .play-count{
                        position: absolute;
                        top: 5px;
                        right: 8px;
                        font-size: $font-size-small-s;
                        color: $color-text-l;
                    }
                    .text{
                        float: left;
                        line-height: 16px;
                        text-align: left;
                        height: 40px;
                        overflow: hidden;
                        margin-bottom: 10px;
                        font-size: $font-size-small;
                    }
                }
            }
        }
        .recommend-song{
            margin-top: -20px;
            box-sizing: border-box;
            width: 100%;
            text-align: center;
            .title{
                height: 65px;
                line-height: 65px;
                padding-left: 1.5%;
                text-align: left;
                font-size: $font-size-medium;
                font-weight: bold;
                color: $color-text;
            }
            .item{
                display: inline-block;
                position: relative;
                box-sizing: border-box;
                width: 33%;
                padding: 0 1%;
                .icon{
                    position: relative;
                    display: inline-block;
                    width: 100%;
                    margin-bottom: 5px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 3px;
                    }
                }
                .text{
                    line-height: 16px;
                    text-align: left;
                    height: 16px;
                    @include no-wrap;
                    font-size: $font-size-small;
                }
                .singer{
                    line-height: 16px;
                    margin-bottom: 10px;
                    text-align: left;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: $font-size-small;
                    color: $color-text-g;
                }
            }
        }
    }
</style>
