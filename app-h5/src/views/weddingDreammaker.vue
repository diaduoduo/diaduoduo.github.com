<template>
    <div class="weddingDreammaker p11">
        <img :src="item" class="full" v-for="item in list">
        <bottom_btn :type="3" :store-style="storeStyle" :store-id="storeId"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "weddingDreammaker",
        data(){
            return{
                list:[],
                storeId:1,
                storeStyle:0
            }
        },
        created() {
            this.list=this.$loadImg("婚礼造梦师(1)/婚礼造梦师_01_{{}}.png", 6);
            if(this.$route.query.storeStyle){
                this.storeStyle=this.$route.query.storeStyle;
            }
            if(this.$route.query.storeId){
                this.storeId=this.$route.query.storeId;
            }
        }
    }
</script>

<style scoped>

</style>
