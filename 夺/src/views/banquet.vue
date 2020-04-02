<template>
    <div class="banquet p11">
        <img :src="item" class="full" v-for="item in list">
        <bottom_btn :type="3" :store-style="storeStyle" :store-id="storeId"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "banquet",
        data(){
            return{
                list:[],
                storeId:1,
                storeStyle:0
            }
        },
        created() {
            this.list=this.$loadImg("宴会佳肴_{{}}.jpg", 5);
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
