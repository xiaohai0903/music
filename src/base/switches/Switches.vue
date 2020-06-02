<template>
    <ul class="switches">
        <li class="switch-item"
            v-for="(item, index) in switches"
            :key="item.id"
            :class="{'active':currentIndex === index}"
            @click="switchItem(index)"
        >
            <span>{{item.name}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "Switches",
        props:{
            switches:{
                type:Array
            },
            currentIndex:{
                type:Number,
                default:0
            }
        },
        methods:{
            switchItem(index){
                this.$emit('switch', index)
            }
        }
    }
</script>

<style scoped>

</style>
