<template>
    <div class="weddingDress p11">
        <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚纱礼服.png" alt="" class="full">
        <module title="视频" :showMore="false">
            <swiper2 :width="168" :swiper-number="list.length">
                <div :slot="'slot'+index" v-for="(item,index) in list" style="position: relative">
                    <video :src="item.src" preload="auto" :poster="item.img" class="swiper-video" ref="video"></video>
                    <div class="cover"></div>
                    <img src="../assets/images/icon_play@2x.png" @click="goPlay(item)" alt="" class="center">
                </div>
            </swiper2>
        </module>
        <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/2中banner.png" alt="" class="full">
        <module title="样片" :pad_l="0" :showMore="true" @viewMore="viewMore(1)">
            <div class="wrap-img1">
                <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/样片.png" @click="go(1)" class="img1 fl" alt="">
                <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/样片2.png" @click="go(2)" class="img1 fr" alt="">
            </div>
        </module>
        <module title="客片" :pad_l="0" :showMore="true" @viewMore="viewMore(2)">
            <div class="wrap-img1">
                <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片.png" @click="go(3)" class="img1 fl" alt="">
                <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片2.png" @click="go(4)" class="img1 fr" alt="">
            </div>
        </module>
        <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/底品牌.png" alt="" class="full">
        <bottom_btn :type="3" :store-style="3" :store-id="16" :product-id="338"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "weddingDress",
        data() {
            return {
                list: [
                    {
                        src: "https://s3plus.meituan.net/v1/mss_44977afbb0cb409db8736441cf62a2d1/video/4698653e1364c6c23c048179b2bc857f.mp4",
                        img: "https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚纱礼服-AORA.png"
                    },
                    {
                        src: "https://s3plus.meituan.net/v1/mss_44977afbb0cb409db8736441cf62a2d1/video/39bb71397fefb11b5e65c44d4b1026cd.mp4",
                        img: "https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚纱礼服-BIANCA.png"
                    },
                    {
                        src: "https://s3.meituan.net/v1/mss_44977afbb0cb409db8736441cf62a2d1/video/316002e82f7bc578076b2e69dc40b603.mp4",
                        img: "https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚纱礼服-FAIRY.png"
                    },
                    {
                        src: "https://s3.meituan.net/v1/mss_44977afbb0cb409db8736441cf62a2d1/video/0125a451ac3cd4ae59fd18e7642dfdc0.mp4",
                        img: "https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚纱礼服-GRACE KELLY × MILLA NOVA.png"
                    },
                    {
                        src: "https://s3.meituan.net/v1/mss_44977afbb0cb409db8736441cf62a2d1/video/4531edfc82db1d7136e4ac5642d3e4fe.mp4",
                        img: "https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚纱礼服-MIMOSA.png"
                    },
                    {
                        src: "https://s3.meituan.net/v1/mss_44977afbb0cb409db8736441cf62a2d1/video/33462ca34c9829eb88bf2ffe72f43a0d.mp4",
                        img: "https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚纱礼服-QUEEN.png"
                    }
                ],
                case: {
                    1: {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/官方案例-BIANCA.png",
                        detailImg: "官方案例-BIANCA/未标题-1_{{}}.jpg",
                        detailNumber: 17,
                        name: "BIANCA"
                    },
                    2: {
                        img: "https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/官方案例-FAIRY.png",
                        detailImg:
                            "官方案例-FAIRY/未标题-1_{{}}.jpg",
                        detailNumber:
                            13,
                        name:
                            "FAIRY"
                    },
                    3: {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片.png",
                        detailImg:"客片/未标题-1_{{}}.jpg",
                        detailNumber:11,
                        name:"1月1日客人"
                    },
                    4:  {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片-1.png",
                        detailImg:"客片2/未标题-1_{{}}.jpg",
                        detailNumber:10,
                        name:"1月12日客人"
                    }

                }
            }
        },
        methods: {
            goPlay: function (item) {
                this.$router.push({path: "play", query: {src: encodeURIComponent(item.src)}})
            },
            viewMore: function (type) {
                //1:样片   2：客片
                this.$router.push({name: "caseList", query: {type: type,storeId:16,storeStyle:3,productId:338}});
            },
            go: function (n) {
                this.$router.push({name: "caseDetail", query: {item: encodeURIComponent(JSON.stringify(this.case[n])),storeId:16,storeStyle:3,productId:338}})
            }
        },
        created: function () {
            window.addEventListener("resize", () => {
                console.log(1231)
            })
        }
    }
</script>

<style scoped>
    .wrap-img1 {
        overflow: hidden;
    }

    .img1 {
        width: 3.66rem;
        display: block;
    }

    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 0.8rem;
        height: 0.8rem;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .cover {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .swiper-video {
        width: 100%;
    }
</style>
