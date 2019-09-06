<template>
    <div class="caseList">
        <div class="wrap-img"  v-for="item in list" :key="item.img" @click="go(item)">
            <img v-lazy="item.img" class="img full" alt="">
            <div class="name text-overflow">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "caseList",
        data:function () {
            return{
                type:1,
                list:[],
                list1:[
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/官方案例-ANGELABABY同款.png",
                        detailImg:"官方案例-ANGELABABY同款/未标题-1_{{}}.jpg",
                        detailNumber:8,
                        name:"ANGELABABY"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/官方案例-AORA.png",
                        detailImg:"官方案例-AORA/未标题-1_{{}}.jpg",
                        detailNumber:14,
                        name:"AORA"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/官方案例-BIANCA.png",
                        detailImg:"官方案例-BIANCA/未标题-1_{{}}.jpg",
                        detailNumber:17,
                        name:"BIANCA"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/官方案例-FAIRY.png",
                        detailImg:"官方案例-FAIRY/未标题-1_{{}}.jpg",
                        detailNumber:13,
                        name:"FAIRY"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/官方案例-GRACE KELLY2019大秀.png",
                        detailImg:"官方案例-GRACE KELLY2019大秀/未标题-1_{{}}.jpg",
                        detailNumber:8,
                        name:"GRACE KELLY2019大秀"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/官方案例-MARILENA.png",
                        detailImg:"官方案例-MARILENA/未标题-1_{{}}.jpg",
                        detailNumber:13,
                        name:"MARILENA"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/官方案例-MIMOSA.png",
                        detailImg:"官方案例-MIMOSA/未标题-1_{{}}.jpg",
                        detailNumber:10,
                        name:"MIMOSA"
                    },{
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/官方案例-QUEEN.png",
                        detailImg:"官方案例-QUEEN/未标题-1_{{}}.jpg",
                        detailNumber:8,
                        name:"QUEEN"
                    },

                ],//样片
                list2:[
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片.png",
                        detailImg:"客片/未标题-1_{{}}.jpg",
                        detailNumber:11,
                        name:"1月1日客人"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片-1.png",
                        detailImg:"客片2/未标题-1_{{}}.jpg",
                        detailNumber:10,
                        name:"1月12日客人"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片-2.png",
                        detailImg:"客片3/客片3_{{}}.jpg",
                        detailNumber:10,
                        name:"12月21日客人"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片-BERTA.png",
                        detailImg:"客片-BERTA/未标题-1_{{}}.jpg",
                        detailNumber:8,
                        name:"BERTA"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片-GK高定.png",
                        detailImg:"客片-GK高定/未标题-1_{{}}.jpg",
                        detailNumber:10,
                        name:"GK高级定制"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片-GK高定2.png",
                        detailImg:"客片-GK高定2/未标题-1_{{}}.jpg",
                        detailNumber:11,
                        name:"GK高级定制2"
                    },
                    {
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片-高定婚纱.png",
                        detailImg:"客片-高定婚纱/未标题-1_{{}}.jpg",
                        detailNumber:10,
                        name:"高级定制婚纱"
                    },{
                        img:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/客片-高定礼服.png",
                        detailImg:"客片-高定礼服/未标题-1_{{}}.jpg",
                        detailNumber:6,
                        name:"高级定制礼服"
                    }
                ],//客片
                storeId:1,
                storeStyle:0,
                productId:0
            }
        },
        beforeCreate:function(){
            window.scrollTo(0,0)
        },
        created() {
            this.list=this['list'+this.$route.query.type];
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
            go:function (item) {
                this.$router.push({name:"caseDetail",query:{item:encodeURIComponent(JSON.stringify(item)),storeId:this.storeId,storeStyle:this.storeStyle,productId:this.productId}})
            }
        }
    }
</script>

<style scoped>
    .wrap-img{
        width: 3.66rem;
        float: left;
        margin-bottom: 0.2rem;
    }
    .wrap-img:nth-child(2n){
        float: right;
    }
    .img{
        height: 6.5rem;
    }
    .name{
        padding:0.27rem;
        height: 0.3rem;
        text-align: center;
        font-size:0.3rem;
        line-height: 0.3rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(43,43,43,1);
    }
</style>
