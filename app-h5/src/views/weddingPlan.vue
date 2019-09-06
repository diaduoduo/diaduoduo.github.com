<template>
    <div class="weddingPlan p11">
        <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚礼策划.png" alt="" class="full">
        <module title="精选套餐" :show-more="false">
            <swiper2 :width="200" :swiper-number="imgList.length">
                <div :slot="'slot'+index" v-for="(item,index) in imgList" :key="item.ID" @click="goProduct(item)">
                    <img :src="item.CoverPicture" class="full" alt="">
                    <div class="slot">
                        <p class="name">{{item.Title}}</p>
                        <p class="price"><span class="icon-rmb">¥</span>{{item.SubTitle}}</p>
                    </div>
                </div>
            </swiper2>
        </module>
        <img :src="item" class="full" v-for="item in list">
        <bottom_btn :type="2" :store-id="1" :product-id="268" :imgList="imgList"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "weddingPlan",
        data(){
            return{
                imgList:[
                    {
                        url:this.$loadImg2("套餐.png"),
                        name:"Milky Way",
                        price:59800
                    },
                    {
                        url:this.$loadImg2("套餐2.png"),
                        name:"Mysterious Kongdom",
                        price:99800
                    },
                    {
                        url:this.$loadImg2("套餐3.png"),
                        name:"Romantic Aurora",
                        price:79800
                    }
                ],
                list:[]
            }
        },
        methods:{
            getInfo:function(){
                this.$post("/api/Product/GetStoreProductInfo",{
                    "TypeID": 12,
                    "PageIndex": 1,
                    "PageSize": 20,
                    "PageCount": 0
                }).then(res=> {
                    if(res.ReturnObject){
                        this.imgList=res.ReturnObject.Items;
                    }else{
                        alert(res.Message);
                    }
                })
            },
            goProduct:function (item) {
                this.platform.productDetail(item);
            }
        },
        created() {
            this.getInfo();
            this.list=this.$loadImg("婚礼策划品牌介绍(1)/婚礼策划_01_{{}}.png", 7);
        },
        components:{

        }
    }
</script>
<style>
    .weddingPlan .swiper-slide{
        border-radius: 0;
    }
</style>
<style scoped>
    .icon-rmb{
        font-size: 0.2rem;
    }
    .name{
        font-family: PingFang-SC-Regular;
        font-size: 0.28rem;
        color: #2b2b2b;
        line-height: 0.34rem;
    }
    .price{
        font-family: GothamBookRegular;
        color: #a9516f;
        font-size: 0.26rem;
        line-height: 0.34rem;
        margin-top: 0.1rem;
    }
    .slot{
        padding: 0.21rem 0.1rem 0;
    }
    .full{
        display: block;
        width: 100%;
    }
</style>
