<template>
    <div class="diamond p11">
        <img :src="item" class="full" v-for="item in list">
        <bottom_btn :type="2" :store-id="1" :product-id="353"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "diamond",
        data(){
            return{
                list:[]
            }
        },
        created() {
            this.list=this.$loadImg("萧邦婚戒750-1000_{{}}.jpg", 8)
        }
    }
</script>

<style scoped>
    .full {
        display: block;
        width: 100%;
    }
</style>
