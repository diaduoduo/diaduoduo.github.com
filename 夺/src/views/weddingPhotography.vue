<template>
    <div class="weddingPhotography p11">
        <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/guanxiaotong/46046aa2a37e0856460562315247b64.jpg" alt="" class="full">
        <div class="title">我是关晓彤，我选择韩国艺匠</div>
        <div class="wrap-img1">
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/2相册.png" @click="goAlbum('相册_{{}}.jpg',15)" class="img1 fl" alt="">
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/2妆容.png" @click="goAlbum('妆容(1)/妆容_01_{{}}.png', 9)" class="img1 fr" alt="">
        </div>
        <video2 :poster="this.poster" src="http://video.artiz.com.cn/411X231.mp4"></video2>
        <div class="wrap-module-title">
            <div class="module-title">PHOTOGRAPHY TEAM</div>
            <div class="module-title-small">摄影团队</div>
        </div>
        <div class="wrap-img2" @click="goAlbum('摄影团队(1)/摄影团队_{{}}.jpg', 27)">
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/3金龙善.png" alt="" class="full">
            <div class="wrap-img2">
                <div class="fl img2-div">
                    <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/3摄影师.png" alt="" class="img2">
                    <div class="photo-detail">
                        <div class="photo-name">金峻荣</div>
                        <div class="photo-name-primary ">韩国样片级摄影师</div>
                    </div>
                </div>
                <div class="fr img2-div">
                    <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/3摄影师.png" alt="" class="img2">
                    <div class="photo-detail">
                        <div class="photo-name">金峻荣</div>
                        <div class="photo-name-primary ">韩国样片级摄影师</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap-module-title">
            <div class="module-title">CUSTOMER PHOTO</div>
            <div class="module-title-small">客照100%=样照</div>
        </div>
        <div class="wrap-img1">
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/guanxiaotong/关晓彤@2x.png" class="img1 fl" alt="">
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/guanxiaotong/客片@2x.png" class="img1 fr" alt="">
        </div>
        <div class="wrap-module-title">
            <div class="module-title-small">全球明星对ARTIZ的祝福</div>
        </div>
        <div class="imgList">
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/guanxiaotong/690X388@2x.png" alt="" class="full" @click="goAlbum('guanxiaotong/%2B水印_{{}}.jpg',13)">
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/5明星的选择3.png" alt="" class="full" @click="goAlbum('唐嫣750-1000/未标题-2_{{}}.png',5)">
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/5明星的选择4.png" alt="" class="full" @click="goAlbum('佟丽娅750-1000/未标题-2_{{}}.png',4)">
            <img src="https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/明星的选择2.png" alt="" class="full" @click="goAlbum('张东健750-1000/未标题-2_{{}}.png',6)">
        </div>
        <div class="wrap-module-title">
            <div class="module-title">OTHER STYLE</div>
            <div class="module-title-small">猜你喜欢</div>
        </div>
        <swiper2 :width="168" class="img-swiper" :swiper-number="imgList.length">
            <div :slot="'slot'+index" v-for="(item,index) in imgList" @click="goAlbum('猜你喜欢'+(index+1)+'_{{}}.jpg', item.number)">
                <img :src="item.url" class="slide-img full" alt="">
            </div>
        </swiper2>
        <bottom_btn :type="3" :store-style="1" :store-id="12"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "weddingPhotography",
        data(){
            return{
                poster:'https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/guanxiaotong/690X388@2x.png',
                imgList:[
                    {
                        url:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/upload/image/20190830/1a34e474-a08d-4a54-b4dd-16d161b13032.jpg",
                        number:22
                    },
                    {
                        url:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/upload/image/20190830/04ba04b3-6ddb-4625-a6b0-b1dd9282ab80.jpg",
                        number:14
                    },
                    {
                        url:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/upload/image/20190830/13a40386-845a-4c6c-80c0-8aba09282135.jpg",
                        number:22
                    },
                    {
                        url:"https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/upload/image/20190830/c96f1506-b091-4768-88c9-3e73c4de86b6.jpg",
                        number:23
                    }
                ]
            }
        },
        components:{

        },
        created:function(){

        },
        methods:{
            goAlbum:function (img,number) {
                this.$router.push({name:"Album",query:{img:img,number:number,storeId:12,storeStyle:4}})
            },
            goPlay:function(src){
                this.$router.push({path:"play",query:{src:encodeURIComponent(src)}})
            },
        }
    }
</script>

<style scoped>
    .img-swiper{
        margin-left:0.3rem ;
    }
    .slide-img{
        border-radius: 0.1rem;
    }
    .imgList img{
        width:6.9rem;
        height:3.88rem;
        border-radius:0.1rem;
        margin-bottom: 0.18rem;
    }
    .imgList img:last-child{
        margin-bottom: 0;
    }
    .imgList{
        padding: 0 0.3rem;
    }
    .photo-name-primary{
        font-size: 0.2rem;
        color: #2b2b2b;
        line-height: 0.2rem;
        margin-top: 0.1rem;
    }
    .photo-name{
        font-size: 0.24rem;
        color: #2b2b2b;
        line-height: 0.24rem;
    }
    .photo-detail{
        flex: 1;
        padding: 0.86rem 0 0.1rem 0.1rem;
        font-family: PingFang-SC-Regular;
    }
    .img2{
        display: block;
        width: 1.6rem;
        height: 1.6rem;
    }
    .img2-div{
        width: 50%;
        display: flex;
    }
    .wrap-img2{
        margin-top: 0.18rem;
        overflow: hidden;
    }
    .module-title-small{
        font-size:0.24rem;
        line-height: 0.24rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        letter-spacing: 3px;
    }
    .module-title{
        font-family: Didot-Bold;
        color: #2b2b2b;
        font-size: 0.48rem;
        line-height: 0.48rem;
        margin-bottom: 0.2rem;
    }
    .wrap-module-title{
        padding: 0.8rem 0 0.3rem;
        text-align: center;
    }

    .wrap-img1{
        margin-bottom: 0.18rem;
        overflow: hidden;
    }
    .img1{
        width: 3.66rem;
        display: block;
    }
    .title{
        font-size:0.2rem;
        line-height: 0.2rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        text-align: center;
        padding: 0.23rem 0 0.59rem;
    }
</style>
