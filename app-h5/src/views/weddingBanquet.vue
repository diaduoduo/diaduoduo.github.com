<template>
    <div class="weddingBanquet p11">
        <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚宴.png" alt="" class="full">
        <div class="wrap-img">
            <div class="img-content" @click="go('weddingDreammaker')">
                <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/2-1婚礼造梦师.png" alt="" class="img">
                <div class="wrap-name">
                    <div class="name">婚礼造梦师</div>
                    <div class="name-small">THE GALLERIA</div>
                </div>
            </div>
            <div class="img-content" @click="go('customWeddingDress')">
                <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/2定制级婚纱礼服2.png" alt="" class="img">
                <div class="wrap-name">
                    <div class="name">定制级婚纱礼服</div>
                    <div class="name-small">THE GALLERIA</div>
                </div>
            </div>
            <div class="img-content" @click="go('banquet')">
                <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/2宴会佳肴3.png" alt="" class="img">
                <div class="wrap-name">
                    <div class="name">宴会佳肴</div>
                    <div class="name-small">THE GALLERIA</div>
                </div>
            </div>
        </div>
        <module title="婚宴场馆" :show-more="false">
            <swiper2 :width="200" :swiper-number="imgList.length">
                <div :slot="'slot'+index" v-for="(item,index) in imgList" @click="viewStore(item)">
                    <img :src="item.url" class="full" alt="">
                    <div class="slot">
                        <p class="name2 text-overflow">{{item.name}}</p>
                        <p class="price2">{{item.label}}</p>
                    </div>
                </div>
            </swiper2>
        </module>
        <div style="width:6.9rem;margin: 0 auto" @click="goAlbum('中部点击跳转750-1000(1)/未标题-2_{{}}.png',10)">
            <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/4婚宴新品.png" alt="" class="full">
        </div>
        <module title="婚礼实录" :show-more="false">
            <swiper2 :width="200" :swiper-number="imgList2.length">
                <div :slot="'slot'+index" v-for="(item,index) in imgList2" @click="viewHYDetail(item)">
                    <img :src="item.url" class="full" alt="">
                    <div class="slot">
                        <p class="name2 text-overflow">{{item.label}}</p>
                        <!--<p class="price2">{{item.label}}</p>-->
                    </div>
                </div>
            </swiper2>
        </module>
        <module title="明星的选择" :show-more="false">
            <img :src="item.url" v-for="item in imgList3" alt="" class="choice" style="width: 6.9rem" @click="viewDetail(item)">
        </module>
        <bottom_btn :type="3" :store-style="2" :store-id="1"></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "weddingBanquet",
        data(){
            return{
                imgList:[
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/3-1婚宴场馆-徐汇店.png",
                        name:"韩国格乐利雅婚礼会所(徐汇店)",
                        label:"仪式堂 | 草坪婚礼 | 大厅无柱",
                        page:"https://720yun.com/t/675je7umzv4?scene_id=17763599"
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/3-2婚宴场馆-黄浦店.png",
                        name:"韩国格乐利雅婚礼会所(黄浦店)",
                        label:"草坪婚礼  | 大厅无柱 |  层高高",
                        page:"https://720yun.com/t/7d4je7uwsf7?scene_id=17768322"
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/3-3婚宴场馆-静安店.png",
                        name:"韩国格乐利雅婚礼会所(静安店)",
                        label:"仪式堂  | 大厅无柱  | 地铁沿线",
                        detailImg:"美女与野兽 750-1000/未标题-1_{{}}.jpg",
                        detailNumber:6
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/3-4婚宴场馆-陆家嘴.png",
                        name:"韩国格乐利雅婚礼会所(陆家嘴)",
                        label:"草坪婚礼 | 大厅无柱 |  地铁沿线",
                        page:"https://720yun.com/t/675je7umzv4?scene_id=17763600"
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/3-5婚宴场馆-外滩店.png",
                        name:"韩国格乐利雅婚礼会所(外滩店)",
                        label:"坪婚礼 | 大厅无柱  | 地铁沿线",
                        page:"https://720yun.com/t/675je7umzv4?scene_id=17763596"
                    }
                ],
                imgList2:[
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/COLD FLAME.png",
                        name:"婚礼实录",
                        label:"COLD FLAME",
                        detailImg:"COLD FLAME/1_{{}}.jpg",
                        detailNumber:11
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/LET THIS LINGERING VERSE.png",
                        name:"婚礼实录",
                        label:"LET THIS LINGERING VERSE",
                        detailImg:"LET THIS LINGERING VERSE/1_{{}}.jpg",
                        detailNumber:5
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/LET'S GET MARRIED.png",
                        name:"婚礼实录",
                        label:"LET'S GET MARRIED",
                        detailImg:"LET'S GET MARRIED/1_{{}}.jpg",
                        detailNumber:9
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/陈先生 王女士.png",
                        name:"婚礼实录",
                        label:"陈先生 王女士",
                        detailImg:"陈先生 王女士/未标题-1_{{}}.jpg",
                        detailNumber:10
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/高先生 顾女士.png",
                        name:"婚礼实录",
                        label:"高先生 顾女士",
                        detailImg:"高先生 顾女士/未标题-1_{{}}.jpg",
                        detailNumber:8
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/陆先生 韩女士.png",
                        name:"婚礼实录",
                        label:"陆先生 韩女士",
                        detailImg:"陆先生 韩女士/未标题-1_{{}}.jpg",
                        detailNumber:9
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/梅先生 高女士.png",
                        name:"婚礼实录",
                        label:"梅先生 高女士",
                        detailImg:"梅先生 高女士/未标题-1_{{}}.jpg",
                        detailNumber:6
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/王先生 顾女士.png",
                        name:"婚礼实录",
                        label:"王先生 顾女士",
                        detailImg:"陆先生 韩女士/未标题-1_{{}}.jpg",
                        detailNumber:7
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/张先生 沈女士.png",
                        name:"婚礼实录",
                        label:"张先生 沈女士",
                        detailImg:"张先生 沈女士/未标题-1_{{}}.jpg",
                        detailNumber:4
                    }
                ],
                imgList3:[
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/6明星的选择.png",
                        detailName:"明星的选择1/明星的选择1_{{}}.jpg",
                        detailNumber:3
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/6明星的选择2.png",
                        detailName:"明星的选择2/明星的选择2_{{}}.jpg",
                        detailNumber:3
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/6明星的选择3.png",
                        detailName:"明星的选择3/明星的选择_{{}}.jpg",
                        detailNumber:5
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/6明星的选择4.png",
                        detailName:"明星的选择4/明星的选择4_{{}}.jpg",
                        detailNumber:6
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/6明星的选择5.png",
                        detailName:"张东健/明星的选择5_01_{{}}.png",
                        detailNumber:6
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/6明星的选择6.png",
                        detailName:"明星的选择6/明星的选择6_{{}}.jpg",
                        detailNumber:6
                    },
                    {
                        url:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/6明星的选择7.png",
                        detailName:"明星的选择7/明星的选择7_{{}}.jpg",
                        detailNumber:9
                    },
                ]
            }
        },
        methods:{
            go:function (str) {
                this.$router.push({path:str,query:{storeId:1,storeStyle:2}});
            },
            viewDetail:function (item) {
                this.$router.push({name:"starChoiceList",query:{item:encodeURIComponent(JSON.stringify(item)),storeId:1,storeStyle:2}})
            },
            viewHYDetail:function (item) {
                this.$router.push({name:"Album",query:{img:item.detailImg,number:item.detailNumber,storeId:1,storeStyle:2}})
            },
            goAlbum:function (img,number) {
                this.$router.push({name:"Album",query:{img:img,number:number,storeId:1,storeStyle:2}})
            },
            viewStore:function (item) {
                if(item.page){
                    location.href=item.page;
                }else{
                    this.viewHYDetail(item)
                }
            }
        }
    }
</script>

<style scoped>
    .choice{
        width: 100%;
        display: block;
        border-radius: 0.1rem;
        margin-bottom: 0.18rem;
    }
    .name2{
        font-family: PingFang-SC-Regular;
        font-size: 0.28rem;
        color: #2b2b2b;
        line-height: 0.34rem;
        margin-top: 0.2rem;
    }
    .price2{
        font-family: GothamBookRegular;
        color: #999999;
        font-size: 0.24rem;
        line-height: 0.34rem;
        margin-top: 0.1rem;
    }
    .name-small{
        font-size:0.16rem;
        line-height: 0.16rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        margin-top: 0.1rem;
    }
    .name{
        text-align: center;
        font-size:0.24rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height: 0.24rem;
    }
    .wrap-img .wrap-name{
        position: absolute;
        left:50%;
        top:50%;
        width: 100%;
        transform: translate(-50%,-50%);
        padding: 0.1rem 0 0.07rem;
        background:rgba(0,0,0,0.6);
    }
    .wrap-img{
        padding: 0.6rem 0 0 0.3rem;
        overflow: hidden;
    }
    .wrap-img .img-content{
        width: 2.18rem;
        height: 2.18rem;
        float: left;
        margin-right: 0.18rem;
        position: relative;
    }
    .img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .wrap-img .img-content .img:last-child{
        margin-right: 0;
    }
</style>
