<template>
    <div class="car p11">
        <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚车.png" alt="" class="full">
        <div class="wrap-wedding-car">
            <div class="module-title">FIRST WEDDING CAR</div>
            <swiper class="swiper" :options="swiperOption" ref="swiper1" @slideChangeTransitionEnd="onSlideChangeEnd(1)">
                <swiper-slide class="swiper-slide" v-for="item in list">
                    <div class="wrap-car">
                        <img :src="item.car1" alt="" class="full">
                        <div class="wrap-car-price">
                            <div class="car-price"><span>¥</span>{{item.price}}</div>
                            <div class="time-km">
                                <p class="time">5小时</p>
                                <p class="time">50公里</p>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="wrap-wedding-car">
            <div class="module-title">FOLLOW WEDDING CAR</div>
            <swiper class="swiper" :options="swiperOption" ref="swiper2" @slideChangeTransitionEnd="onSlideChangeEnd(2)">
                <swiper-slide class="swiper-slide" v-for="item in list">
                    <div class="wrap-car">
                        <img :src="item.car2" alt="" class="full">
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="module-title">SUPERIORITY优势</div>
        <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚车_01.jpg" alt="" class="full">
        <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚车_02.jpg" alt="" class="full">
        <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚车_03.jpg" alt="" class="full">
        <bottom_btn :type="2" :store-id="1" :product-id="298"></bottom_btn>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        name: "car",
        data() {
            return {
                list: [],
                swiperNumber: 6,
                swiperOption: {
                    initialSlide:0
                }
            }
        },
        created:function(){
            // this.getInfo();
            this.list=[
                {
                    car1:this.$loadImg2("1.主车-至尊奢华A套系 9980.png"),
                    car2:this.$loadImg2("1.跟车-至尊奢华A套系 9980.png"),
                    price:9980
                },
                {
                    car1:this.$loadImg2("2.主车-至尊奢华B套系 12980.png"),
                    car2:this.$loadImg2("2.跟车-至尊奢华B套系 12980.png"),
                    price:12980
                },
                {
                    car1:this.$loadImg2("3.主车-明星礼遇A 4980.png"),
                    car2:this.$loadImg2("3.跟车-明星礼遇A 4980.png"),
                    price:4980
                },
                {
                    car1:this.$loadImg2("4.主车-明星礼遇B 6980.png"),
                    car2:this.$loadImg2("4.跟车-明星礼遇B 6980.png"),
                    price:6980
                }
            ]
        },
        methods:{
            getInfo:function(){
                this.$post("/api/Product/GetStoreProductInfo",{
                    "TypeID": 13,
                    "PageIndex": 1,
                    "PageSize": 20,
                    "PageCount": 0
                }).then(res=> {
                    console.log(res);

                })
            },
            onSlideChangeEnd:function (type) {
                if(type===1&&this.swiper1.activeIndex!==this.swiper2.activeIndex){
                    this.swiper2.slideTo(this.swiper1.activeIndex);
                }
                if(type===2&&this.swiper1.activeIndex!==this.swiper2.activeIndex){
                    this.swiper1.slideTo(this.swiper2.activeIndex);
                }
            }
        },
        computed: {
            swiper1() {
                return this.$refs.swiper1.swiper
            },
            swiper2() {
                return this.$refs.swiper2.swiper
            }
        },
        components: {
            swiper, swiperSlide
        }
    }
</script>

<style scoped>
    .car{
        width: 100%;
        overflow: hidden;
    }
    .wrap-car-price{
        position: absolute;
        left:-0.3rem;
        bottom:0.18rem;
        background:rgba(0,0,0,0.6);
        border-radius: 0.2rem;
        height: 0.78rem;
        display: flex;
        padding: 0 0.17rem 0 0.44rem;
    }
    .time-km{
        font-size:0.24rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(245,245,245,1);
        padding-left: 0.17rem;
    }
    .car-price{
        font-size:0.38rem;
        line-height: 0.78rem;
        font-family:GothamBookRegular;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .car-price span{
        font-size: 0.24rem;
        letter-spacing: 2px;
    }
    .module-title {
        font-size: 0.34rem;
        line-height: 0.34rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(43, 43, 43, 1);
        text-align: center;
        padding: 0.6rem 0 0.3rem;
    }

    .full {
        display: block;
        width: 100%;
    }

    .swiper {
        margin: 0 auto;
        width: 88%;
        overflow: inherit !important;
        position: relative;
    }

    .swiper-slide {
        border: 1px solid #f5f5f5;
        box-sizing: border-box;
    }
</style>
<style>
    .swiper-slide {
        border-radius: 0.2rem;
        overflow: hidden;
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -ms-transition: all 0.2s;
        -o-transition: all 0.2s;
        transition: all 0.2s;
    }

    .car .swiper-slide-prev, .car .swiper-slide-next {
        -webkit-transform: scale(0.93);
        -moz-transform: scale(0.93);
        -ms-transform: scale(0.93);
        -o-transform: scale(0.93);
        transform: scale(0.93);
    }
</style>
