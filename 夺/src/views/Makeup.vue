<template>
    <div class="Makeup">
        <img v-lazy="item" class="full" v-for="item in list">
        <bottom_btn :type="2"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "Makeup",
        data(){
            return{
                list:[]
            }
        },
        created() {
            this.list=this.$loadImg("妆容_{{}}.jpg", 9)
        }
    }
</script>

<style scoped>

</style>
