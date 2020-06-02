<template>
    <div class="player">
        <transition>
            <div class="normal-player">
                <div class="background">
                    <div class="filter"></div>
                    <img src="" alt="">
                </div>
                <div class="top">
                    <div class="back">
                        <i class="fa fa-angle-down"></i>
                    </div>
                    <h1 class="title"></h1>
                    <h2 class="subtitle"></h2>
                </div>
                <div class="middle">
                    <transition>
                        <div class="middle-l">
                            <div class="cd-wrapper">
                                <div class="cd">
                                    <img src="" alt="">
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Player"
    }
</script>

<style scoped>

</style>
