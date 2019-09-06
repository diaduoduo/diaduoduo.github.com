<template>
    <div class="Album p11">
        <img v-lazy="item" class="full" v-for="item in list" :class="{'star':title==='明星系列'}">
        <bottom_btn :type="2" :store-style="storeStyle" :store-id="storeId" :product-id="productId"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "Album",
        data(){
            return{
                list:[],
                title:'',
                storeId:1,
                storeStyle:0,
                productId:0
            }
        },
        created() {
            let img=this.$route.query.img;
            let number=this.$route.query.number;
            this.title=this.$route.query.title||'';
            this.list=this.$loadImg(img,number);
            if(this.title){
                document.title=this.title;
            }
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
    .star{
        width: 6.9rem;
        display: block;
        margin: 0.3rem auto;
        border-radius:0.2rem;
    }
</style>
