<template>
    <div class="businessBanquet">
        <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/商务宴.png" alt="" class="full">
        <module title="精选套餐" :show-more="false">
            <swiper2 :width="168" :swiper-number="imgList.length">
                <div :slot="'slot'+index" v-for="(item,index) in imgList" :key="item.ID" @click="goProduct(item)">
                    <img :src="item.CoverPicture" class="full" alt="">
                    <div class="slot">
                        <p class="name">{{item.Title}}</p>
                        <p class="price"><span class="icon-rmb">¥</span>{{item.SubTitle}}</p>
                    </div>
                </div>
            </swiper2>
        </module>
        <video2 :poster="this.poster" src="http://video.artiz.com.cn/business.mp4"></video2>
        <img :src="item" class="full" v-for="item in list">
        <bottom_btn :type="2" :store-id="1" :product-id="350"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "businessBanquet",
        components:{

        },
        data(){
            return{
                list:[],
                imgList:[],
                poster:'https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/商务宴aa.png'
            }
        },
        methods:{
            getInfo:function(){
                this.$post("/api/Product/GetStoreProductInfo",{
                    "TypeID": 11,
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
            this.list=this.$loadImg("商务宴品牌图/商务宴_01_{{}}.png", 12)
        }
    }
</script>

<style scoped>
    .video{
        width: 100%;
        margin-bottom: 0.8rem;
    }
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
