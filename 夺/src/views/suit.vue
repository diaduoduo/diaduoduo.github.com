<template>
    <div class="suit p11">
        <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/西装.png" alt="" class="full">
        <module title="明星系列" @viewMore="viewMore">
            <swiper2 :width="200" :swiper-number="list.length">
                <div :slot="'slot'+index" v-for="(item,index) in list" @click="viewDetail(item)">
                    <img :src="item.img" alt="" class="full">
                </div>
            </swiper2>
        </module>
        <div class="wrap-img">
            <img :src="img.bigImg" class="left-img" alt="">
            <div class="wrap-right-img">
                <img v-for="item in imgList" :class="{'border1':item.index===img.index}" :src="item.littleImg" @click="img=item" class="full">
            </div>
        </div>
        <div class="wrap-introduce">
            <div class="suit-name">TOPZIO 明星系列 金宇彬同款</div>
            <div class="suit-type">2018 New《WON KING MIN》
                <div class="wrap-price">
                    <span class="icon-rmb">￥</span>12345
                    <div class="original-price">￥23456</div>
                </div>
            </div>
            <div class="introduce">衣襟设计，简约随性。敞开穿，肆意潇洒；扣上，睿智干练。斜切式宽 垫肩线，上半身看上去更有型。选用意大利进口面料，精致舒爽的质地，
                挺括且有着自在的畅快。耗时720个小时，带来雅致的造型美和精湛的 工艺享受。
            </div>
        </div>
        <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/新品.png" alt="" class="full" @click="goAlbum('未标题-1_{{}}.jpg',10)">
        <div class="wrap-introduce" @click="goAlbum('未标题-1_{{}}.jpg',10)">
            <div class="suit-name">THE NEW CHARM SERIES</div>
            <div class="suit-type">男士有着洒中预测的深度魅力，男士有着洒中预测的深度魅力</div>
        </div>
        <div class="suit-module" @click="goAlbum('设计师介绍750-1000/未标题-2_{{}}.jpg',3)">
            <div class="suit-module-title">设计师介绍</div>
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/设计师介绍.png" alt="" class="full">
        </div>
        <div class="suit-module" @click="goAlbum('男士西装品牌简介750-1000/未标题-2_{{}}.jpg',8)">
            <div class="suit-module-title">品牌简介</div>
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/品牌简介.png" alt="" class="full">
        </div>
        <div class="suit-module" @click="goAlbum('门店介绍750-1000/未标题-2_{{}}.jpg',6)">
            <div class="suit-module-title">门店介绍</div>
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/门店介绍.png" alt="" class="full">
        </div>
        <bottom_btn :type="3" :store-style="5" :store-id="14" :product-id="306"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "suit",
        data() {
            return {
                img: {
                    littleImg: "https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/西装小图.png",
                    bigImg: "https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/西装大图.png",
                    index: 0,
                },
                imgList: [
                    {
                        littleImg:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/西装小图2.png",
                        bigImg:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/西装大图.png",
                        index: 1,
                    },
                    {
                        littleImg:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/西装小图3.png",
                        bigImg: "https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/西装大图3.png",
                        index: 2,
                    },
                    {
                        littleImg: "https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/西装小图4.png",
                        bigImg: "https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/西装大图4.png",
                        index: 0,
                    },
                ],
                list: [
                    {
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/南柱赫系列8980.png",
                        detailName:"4南柱赫系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:9
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
                        img:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/张东健系列8980.png",
                        detailName:"2张东健系列官方案例/未标题-1_{{}}.jpg",
                        detailNumber:9
                    },
                ]
            }
        },
        methods:{
            goAlbum:function (img,number,title) {
                this.$router.push({name:"Album",query:{img:img,number:number,title:title||'',storeId:14,storeStyle:5,productId:306}})
            },
            viewMore:function () {
                this.$router.push({name:"starList",query:{storeId:14,storeStyle:5,productId:306}})
            },
            viewDetail:function (item) {
                this.$router.push({name:"starChoiceList",query:{item:encodeURIComponent(JSON.stringify(item)),storeId:14,storeStyle:5,productId:306}})
            },
        }
    }
</script>

<style scoped>
    .wrap-right-img img.border1{
        border:1px solid rgba(43,43,43,1);
    }
    .suit-module {
        padding: 0 0.3rem;
    }

    .suit-module-title {
        margin: 0.6rem 0 0.3rem;
        font-size: 0.34rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(43, 43, 43, 1);
    }

    .introduce {
        font-family: PingFang-SC-Regular;
        color: #999;
        font-size: 0.22rem;
        line-height: 0.32rem;
        margin-top: 0.37rem;
    }

    .wrap-price {
        color: #a9516f;
        font-size: 0.3rem;
        font-family: GothamBookRegular;
        position: absolute;
        right: 0;
        top: 0
    }

    .icon-rmb {
        font-size: 0.2rem;
    }

    .original-price {
        display: inline-block;
        font-family: PingFang-SC-Regular;
        color: #999;
        font-size: 0.2rem;
        text-decoration: line-through;
        margin-left: 0.1rem;
    }

    .suit-name {
        color: #2b2b2b;
        font-family: PingFang-SC-Regular;
        font-size: 0.3rem;
        line-height: 0.34rem;
    }

    .suit-type {
        font-family: GothamBookRegular;
        color: #999;
        font-size: 0.2rem;
        line-height: 0.2rem;
        margin-top: 0.1rem;
        position: relative;
    }

    .wrap-introduce {
        margin: 0.3rem 0 0.6rem;
        padding: 0 0.3rem;
    }

    .wrap-img {
        display: flex;
    }

    .left-img {
        width: 5.52rem;
        height: 5.52rem;
        display: block;
    }

    .wrap-right-img {
        flex: 1;
        padding-left: 0.18rem;
    }

    .wrap-right-img img {
        width: 1.8rem;
        height: 1.8rem;
        margin-bottom: 0.06rem;
        border: 1px solid rgba(245, 245, 245, 1);
        box-sizing: border-box;
    }

    .wrap-right-img img:last-child {
        margin-bottom: 0;
    }
</style>
