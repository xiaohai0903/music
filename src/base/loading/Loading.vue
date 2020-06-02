<template>
    <div class="loading">
        <img src="./loading.gif" width="24" height="24" alt="">
    </div>
</template>

<script>
    export default {
        name: "Loading",
        props:{
            title:{
                type:String,
                default:'正在载入'
            }
        }
    }
</script>

<style scoped lang="scss">
@import "src/components/common/scss/variable";
    .loading{
        width: 100%;
        height: 40px;
        text-align: center;
        img{
            margin-top: 10px;
        }
    }
</style>
