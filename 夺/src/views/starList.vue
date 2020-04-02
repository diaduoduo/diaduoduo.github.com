<template>
    <div class="starList p11">
        <img v-lazy="item.img" class="full img" v-for="item in list" @click="viewDetail(item)">
        <bottom_btn :type="2" :store-style="storeStyle" :store-id="storeId" :product-id="productId"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "starList",
        data:function(){
            return{
                list:[
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/李敏镐系列5980.png",
                        detailName:"1李敏镐系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:9
                    },
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/李钟硕系列10980.png",
                        detailName:"9李钟硕系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:14
                    },
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/南柱赫系列8980.png",
                        detailName:"4南柱赫系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:9
                    },
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/朴宝剑系列16980.png",
                        detailName:"11朴宝剑系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:7
                    },
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/朴海镇系列10980.png",
                        detailName:"8朴海镇系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:10
                    },
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/朴炯植系列6980.png",
                        detailName:"5朴炯植系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:5
                    },
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/朴叙俊明星系列6980.png",
                        detailName:"3朴叙俊·明星系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:11
                    },
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/朴叙俊系列10980.png",
                        detailName:"7朴叙俊系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:8
                    },
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/玄彬系列8980.png",
                        detailName:"6玄彬系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:10
                    },
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/张东健系列8980.png",
                        detailName:"2张东健系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:9
                    },
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/赵寅成系列10980.png",
                        detailName:"10赵寅成系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:6
                    }
                ],
                storeId:1,
                storeStyle:0,
                productId:0
            }
        },
        created() {
            if(this.$route.query.storeStyle){
                this.storeStyle=this.$route.query.storeStyle;
            }
            if(this.$route.query.storeId){
                this.storeId=this.$route.query.storeId;
            }
            if(this.$route.query.productId){
                this.productId=this.$route.query.productId;
            }
        },
        methods:{
            viewDetail:function (item) {
                this.$router.push({name:"starChoiceList",query:{item:encodeURIComponent(JSON.stringify(item)),productId:this.productId}})
            },
        }
    }
</script>

<style scoped>
    .img{
        width: 6.9rem;
        display: block;
        margin: 0.3rem auto;
        border-radius: 0.2rem;
    }
</style>
