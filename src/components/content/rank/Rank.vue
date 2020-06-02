<template>
    <div class="rank" ref="rank">
        <Scroll class="topList" ref="scroll">
            <ul>
                <li class="item" v-for="(item, index) in yunTopList" :key="index" @click="selectItem(item)">
                <div class="icon">
                    <img v-lazy="item.coverImgUrl" width="100" height="100" alt="">
                </div>
                    <ul class="songList">
                        <li class="song" v-for="(song ,index) in item.top" :key="index">
                            <span>{{index+1}}.</span>
                            <span>{{song.name}} - {{song.ar[0].name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div v-show="showLoading" class="loading-content">
                <Loading></Loading>
            </div>
        </Scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import Scroll from "../../../base/scroll/Scroll";
    import Loading from "../../../base/loading/Loading";


    import {getTop} from "../../../axios/rank";
    import {mapMutations} from 'vuex'
    import {playlistMixin} from "../../common/js/mixin";


    export default {
        name: "Rank",
        mixins:[playlistMixin],
        components:{
            Scroll,
            Loading
        },
        data(){
            return {
                yunTopList:[],
                showLoading:true
            }
        },
        created() {
            this._getTop()
        },
        mounted() {
            this.$refs.scroll.refresh()
        },
        methods:{
            selectItem(item){
                this.$router.push({
                    path:`/rank/${item.id}`
                })
                this.setTopList(item)
            },
            handlePlaylist(){
                this.$refs.scroll.refresh()
            },
            _getTop(){
                const yunMusic_Top=[0,1,2,3,4,5,15,26,6,7,8,9,10,11]
                for(let i=0; i<yunMusic_Top.length; i++){
                    getTop(yunMusic_Top[i]).then(res =>{
                        let list =res.data.playlist
                        list.top =res.data.playlist.tracks.slice(0,3)
                        this.yunTopList.push(list)
                    })
                    if(i === yunMusic_Top.length - 1){
                        this.showLoading = false
                    }
                }
            },
            ...mapMutations({
                setTopList:'SET_TOP_LIST'
            })
        }
    }
</script>

<style scoped lang="scss">

    @import "../../common/scss/mixin.scss";
    @import "../../common/scss/variable";
.rank{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .topList{
        height: 100%;
        overflow: hidden;
        padding-top: 5px;
        .item{
            display: flex;
            margin: 10px 10px;
            padding: 10px 0;
            box-sizing: border-box;
            height: 100px;
            &:last-child{
                padding-bottom: 20px;
            }
            .icon{
                width: 100px;
                height: 100px;
                img{
                    border-radius: 3px;
                }
            }
            .songList{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 20px;
                height: 100px;
                overflow: hidden;
                color: $color-text;
                font-size: $font-size-small-x;
                .song{
                    @include no-wrap();
                    line-height: 30px;
                }
            }
        }
        .loading-content{
            position: absolute;
            width: 100%;
            top: 70%;
            transform: translateY(-50%);
        }
    }
    .loading-content{
        position: fixed;
        width: 100%;
        top: 70%;
        transform: translateY(-50%);
    }
}

</style>
