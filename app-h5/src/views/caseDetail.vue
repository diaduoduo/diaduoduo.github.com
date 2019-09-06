<template>
    <div class="caseDetail p11">
        <img v-lazy="item" class="full" v-for="item in list">
        <bottom_btn :type="2" :store-style="storeStyle" :store-id="storeId" :product-id="productId"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "caseDetail",
        data:function () {
            return{
                item:{},
                list:[],
                storeId:1,
                storeStyle:0,
                productId:0
            }
        },
        created:function () {
            this.item=JSON.parse(decodeURIComponent(this.$route.query.item));
            this.list=this.$loadImg(this.item.detailImg, this.item.detailNumber);
            if(this.$route.query.storeStyle){
                this.storeStyle=this.$route.query.storeStyle;
            }
            if(this.$route.query.storeId){
                this.storeId=this.$route.query.storeId;
            }
            if(this.$route.query.productId){
                this.productId=this.$route.query.productId;
            }
        }
    }
</script>

<style scoped>

</style>
