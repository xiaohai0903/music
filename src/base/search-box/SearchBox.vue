<template>
    <div class="search-box">
        <input class="box" v-model="query" :placeholder="placeholder" type="text">
        <i class=" icon-delete" @click="clear">×</i>
    </div>
</template>

<script>
    import {debounce} from "../../components/common/js/utl";

    export default {
        name: "SearchBox",
        props:{
            placeholder:{
                type:String,
                default:'搜索歌曲，歌手'
            }
        },
        data(){
            return{
                query:'',
                clickInfo:'搜索'
            }
        },
        created () {
            this.$watch('query', debounce((newQuery) => {
                this.$emit('query', newQuery)
            }, 300))
        },
        methods:{
            clear(){
                this.query=''
            },
            setQuery(query){
                this.query=query
            }
        }

    }
</script>

<style scoped lang="scss">
    @import "../../components/common/scss/variable";

    .search-box{
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 25px;
        border-bottom: 1px solid rgb(235,235,235);
        .icon-search{
            font-size: 24px;
            color: $color-text-g;
        }
        .box{
            flex: 1;
            line-height: 25px;
            background: $color-theme;
            color: #ffffff;
            font-size: $font-size-medium;
            border: none;
            outline: medium;
            &::placeholder{
                color: rgba(255,255,255,0.8);
            }
        }
        .icon-delete{
            position: absolute;
            right: 12px;
            font-size: 24px;
            color: rgba(255,255,255,0.8);
            border: none;
        }
        .search{
            padding: 0 5px;
            font-size: 14px;
            color: $color-text;
        }
    }
</style>
