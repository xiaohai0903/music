<template>
    <transition name="search">
        <div class="search" ref="searchWrapper">
            <div class="search-box-wrapper">
                <i class="fa" @click="back"><</i>
                <SearchBox @query="onQueryChange" ref="searchBox"></SearchBox>
            </div>
            <Scroll :pullup="true" class="search-scroll-wrapper" ref="scroll" @scrollToEnd="searchMore">
                <div ref="search">
                    <div class="search-hots" >
                        <p class="title">热门搜索</p>
                        <span @click="addQuery(item.first)" v-for="item in hots" :key="item.id" class="search-hots-item">{{item.first}}</span>
                    </div>
                    <div class="shortcut-wrapper">
                        <div class="search-history">
                            <h1 class="title">
                                <span class="text">搜索历史</span>
                                <span class="clear">
                                    <i class="icon-clear"></i>
                                </span>
                            </h1>
                            <SearchList @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></SearchList>
                        </div>
                    </div>
                    <div class="search-result">
                        <Suggest ref="suggest" :query="query" @select="saveSearch"></Suggest>
                    </div>
                </div>
            </Scroll>
            <Confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空历史记录？" confirmBtnText="清空"> </Confirm>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    import SearchBox from "../../../base/search-box/SearchBox";
    import SearchList from "../../../base/song-list/SongList";
    import Suggest from "../suggest/Suggest";
    import Confirm from "../../../base/confirm/Confirm";

    import Scroll from "../../../base/scroll/Scroll";

    import {getSearchHot} from "../../../axios/search";
    import {searchMixin} from "../../common/js/mixin";

    export default {
        mixins:[searchMixin],
        name: "Search",
        components:{
            SearchBox,
            Scroll,
            SearchList,
            Suggest,
            Confirm

        },
        data(){
            return{
                hots:[]
            }
        },
        created() {
            this._getSearchHot()
        },
        methods:{
            back(){
                this.$router.back()
                this.$refs.searchBox.clear()
            },
            _getSearchHot(){
                getSearchHot().then(res =>{
                    this.hots =res.data.result.hots
                    console.log(this.hots)
                })
            },
            searchMore(){
                this.$refs.suggest.searchMore()
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../common/scss/variable";
    @import "../../common/scss/mixin";

    .search-enter-active, .search-leave-active{
        transition: all 0.3s;
    }
    .search-enter, .search-leave-to{
        transform: translate3d(50%,0,0);
        opacity: 0;
    }

    .search{
        position: fixed;
        z-index: 100;
        width: 100%;
        top: 0;
        bottom: 0;
        background: $color-background;
        .search-box-wrapper{
            padding: 10px 40px 10px 43px;
            background: $color-theme;
            .fa {
                position: absolute;
                left: 5px;
                top: 3px;
                padding: 3px 10px;
                font-size: 30px;
                color: #fff;
            }
        }
        .search-scroll-wrapper{
            height: 100%;
            overflow: hidden;
            .search-hots{
                margin: 0 20px;
                .title{
                    padding: 10px 5px 0 5px;
                    height: 30px;
                    line-height: 30px;
                    font-size: $font-size-small-x;
                    color: $color-text-g;
                }
                span{
                    display: inline-block;
                    padding: 3px 5px;
                    margin: 4px 4px;
                    border: 0.8px solid $color-text-ggg;
                    border-radius: 5px;
                    line-height: 20px;
                    color: $color-text;
                    font-size: $font-size-medium;
                }
            }
            .shortcut-wrapper{
                position: relative;
                margin: 0 auto;
                .search-history{
                    position: relative;
                    margin: 10px 25px;
                    .title{
                        display: flex;
                        align-items: center;
                        height: 30px;
                        font-size: $font-size-small-x;
                        color: $color-text-g;
                        .text{
                            flex: 1;
                        }
                        .clear{
                            @include extend-click();
                            .icon-clear{
                                font-size: $font-size-medium;
                                color: $color-text;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
