<template>
    <div class="suggest">
        <div class="search-suggest" v-show="!searchShow && query && songs.length>0">
            <p class="title" v-show="showSinger && showList">最佳匹配</p>
            <div class="search-suggest-item" v-if="suggest.artists  && showSinger">
                <img :src="suggest.artists[0].img1v1Url" width="50" height="50" alt="">
                <span>歌手{{suggest.artists[0].name}}</span>
            </div>
            <div v-if="suggest.playlist && showList" class="search-suggest-item">
                <img :src="suggest.playlists[0].coverImgUrl" width="50" height="50" alt="">
                <div class="text">
                    <p>歌单{{suggest.playlists[0].name}}</p>
                    <p class="singer">{{suggest.albums[0].artist.name}}</p>
                </div>
            </div>
        </div>
        <ul class="suggest-list" ref="suggestList" v-show="!searchShow">
            <li class="suggest-item">
                <div class="icon">
                    <i></i>
                </div>
                <div class="name">
                    <p class="song"></p>
                    <p class="singer"></p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import Singer from "../../common/js/singer";
    import {createSearchSong} from "../../common/js/song";

    import {getSearchSongs ,getSearchSuggest,getSongDetail} from "../../../axios/search";

    export default {
        name: "Suggest",
        props:{
            query: {
                type: String,
                default: ''
            },
            showSinger: {
                type: Boolean,
                default: true
            },
            showList: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return{
                singer:{},
                songs:[],
                suggest:{},
                searchShow:true,
                haveMore:true,
                page: 0,

            }
        },
        methods:{
            search(){
                this.searchShow =false
                this.haveMore =true
                getSearchSongs(this.query,this.page).then(res =>{
                    if(!res.data.result.songs){
                        this.haveMore =false
                        return
                    }
                    let list =res.data.result.songs
                    let ret = []
                    list.forEach((item) =>{
                        ret.push(createSearchSong(item))
                    })
                    this.songs =ret
                    this.$emit('refresh')
                })
                this.page +=30
                getSearchSuggest(this.query).then(res =>{
                    this.suggest =res.data.result
                })
            }
        },
        watch:{
          query(val){
              if(val === ''){
                  this.suggest ={}
                  this.songs =[]
                  this.haveMore =false
                  return
              }
              this.suggest = {}
              this.songs =[]
              this.searchShow =true
              this.page=0
              this.haveMore =true
              this.search()
          }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../common/scss/variable";
    @import "../../common/scss/mixin";

    .suggest {
        height: 100%;
        overflow: hidden;
        .search-go {
            font-size: $font-size-medium;
            margin-left: 20px;
            color: $color-theme;
        }
        .search-suggest {
            .title {
                padding-left: 20px;
                padding-bottom: 10px;
                color: $color-theme;
                font-size: 11px;
            }
            .search-suggest-item {
                display: flex;
                align-items: center;
                padding: 8px 20px;
                border-bottom: 1px solid rgb(228, 228, 228);
                font-size: $font-size-medium;
                img {
                    flex: 0 0 50px;
                    padding-right: 15px;
                }
                .text {
                    width: 100%;
                    p {
                        padding: 3px 0;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .singer {
                        font-size: 12px;
                        color: $color-text;
                    }
                }
            }
        }
        .suggest-list {
            padding-bottom: 30px;
            .suggest-item {
                display: flex;
                padding: 3px 20px;
                height: 50px;
                align-items: center;
                border-bottom: 1px solid rgb(228, 228, 228);
                p {
                    padding: 3px 0;
                }
                .song {
                    font-size: $font-size-medium-x;
                    color: $color-text;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    // padding-bottom: 20px
                }
                .singer {
                    font-size: 12px;
                    color: $color-text-g;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .icon {
                // flex: 0 0 30px
                // width: 30px
                [class^="icon-"] {
                    font-size: 14px;
                    color: $color-text;
                }
            }
            .name {
                flex: 1;
                font-size: $font-size-medium;
                color: $color-text;
                overflow: hidden;
                .text {
                    @include no-wrap();
                }
            }
        }
    }
    .no-result-wrapper {
        position: fixed;
        overflow: hidden;
        left: 50%;
        top: 40vh;
        transform: translatex(-50%);
        color: $color-text;
    }
</style>
