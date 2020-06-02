<template>
        <Scroll  @scroll="scroll" :probe-type="3" class="listView" ref="listView" :listen-scroll="true">
            <ul>
                <li class="list-group" ref="listGroup" v-for="group in data" :key="group.id">
                    <h2 class="list-group-title">{{group.title}}</h2>
                    <ul>
                        <li @click="selectItem(item)" class="list-group-item" v-for="item in group.items" :key="item.id">
                            <img v-lazy="item.avatar" class="avatar">
                            <span class="name">{{item.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>

            <div class="list-shortcut" @touchstart="onShortcutStart">
                <ul>
                    <li :data-index="index" :class="{'current':currentIndex === index}" v-for="(item, index) in shortcutList" class="item" :key="item.id">
                        {{item}}
                    </li>
                </ul>
            </div>
        </Scroll>
</template>

<script>
    import Scroll from "../../../base/scroll/Scroll";
    import {getData} from "../../common/js/dom";

    const ANCHOR_HEIGHT = 100
    export default {
        name: "ListView",
        data(){
            return{
                currentIndex: 0,
                scrollY:-1
            }
        },
        props:{
          data:{
              type:Array
          }
        },
        computed:{
          shortcutList(){
              return this.data.map((group) =>{
                  return group.title.substr(0,1)
              })
          }
        },
        created() {
            this.touch={}
            this.listHeight=[]
        },
        methods:{
            selectItem(item){
              this.$emit('select', item)
            },
            refresh(){
              this.$refs.listView.refresh()
            },
            scroll(pos){
                this.scrollY = pos.y
            },
            onShortcutStart (e) {
                let anchorIndex = getData(e.target, 'index')
                let firstTouch = e.touches[0]
                this.touch.y1 = firstTouch.pageY
                this.touch.anchorIndex = anchorIndex
                this._scrollTo(anchorIndex)
            },
            _scrollTo (index) {
                if (!index && index !== 0) {
                    return
                }
                if (index < 0) {
                    index = 0
                }
                this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
            },
            _calculateHeight () {
                const list = this.$refs.listGroup
                let height = 0
                this.listHeight.push(height)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            }
        },
        watch: {
            data () {
                setTimeout(() => {
                    this._calculateHeight()
                }, 20)
            },
            scrollY (newY) {
                // console.log(newY)
                const listHeight = this.listHeight
                if (newY > 0) {
                    this.currentIndex = 0
                    return
                }
                for (let i = 0; i < listHeight.length - 1; i++) {
                    let height1 = listHeight[i]
                    let height2 = listHeight[i + 1]
                    if (-newY >= height1 && -newY < height2) {
                        this.currentIndex = i
                        return
                    }
                }
            }
        },
        components:{
            Scroll
        }
    }
</script>

<style scoped lang="scss">
    @import "src/components/common/scss/variable";
        .listView{
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: $color-background;
            .list-group{
                .list-group-title{
                    height: 20px;
                    line-height: 20px;
                    padding-left: 12px;
                    margin-bottom: 10px;
                    font-size: $font-size-small;
                    color: #fff;
                    background: rgba(0,0,0, 0.1);
                }
                .list-group-item{
                    display: flex;
                    align-items: center;
                    padding: 5px 0;
                    margin: 0 5px;
                    border-bottom: 1px solid rgb(228,228,228);
                    &:last-child{
                        border: none;
                        margin-bottom: 10px;
                    }
                    .avatar{
                        width: 50px;
                        height: 50px;
                        border-radius: 3px;
                    }
                    .name{
                        margin-left: 20px;
                        color: $color-text;
                        font-size: $font-size-medium;
                    }
                }
            }
            .list-shortcut{
                position: absolute;
                z-index: 30;
                right: 3px;
                top: 50%;
                transform: translateY(-50%);
                padding: 200px 0;
                width: 20px;
                border-radius: 3px;
                text-align: center;
                font-family: Helvetica;
            }
            .item{
                padding: 5px 5px;
                line-height: 1;
                color: $color-text-g;
                font-size: $font-size-small;
                font-weight: bold;
                &.current{
                    color: $color-theme;
                }
            }
        }


</style>
