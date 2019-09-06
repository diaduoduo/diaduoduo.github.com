<template>
    <div class="activity">
        <div class="activity-container">
            <div class="wrap-img" style="padding-bottom: 1.4rem;">
                <img :src="item" alt="" class="full" v-for="(item,index) in info.ContentImg">
            </div>
            <div class="bottom-btn">
                <div class="btn-left">¥<span style="font-size: 0.52rem">99</span>/立减2000</div>
                <div class="btn-right" @click="pay">立即支付</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "activity",
        data(){
            return{
                list:[],
                id:0,
                info:{}
            }
        },
        methods:{
            back:function(){
                this.platform.back();
            },
            pay:function () {
                this.$router.push({name:'pay',query:{id:this.id}});
            },
            getInfo:function () {
                this.$get("/api/Integral/GetShoppingProductDetail",{
                    params:{
                        ID: this.id
                    }
                }).then(res=>{
                    if(res.ReturnCode===0){
                        this.info=res.ReturnObject.Product;
                    }else{
                        this.$toast(res.Message);
                    }
                });
            }
        },
        created:function(){
            window.h5Callback = res => {
                if(res.action==="getToken"){
                    window.sessionStorage.setItem("token",res.token);
                    this.token=res.token;
                }
            };
            this.id=this.$route.query.id;
            this.getInfo();
        },
        components:{

        }
    }
</script>
<style>
    html, body, #app,.activity-container{
        height: 100%;
        position: relative;
    }
</style>
<style scoped>
    .btn-right{
        flex: 1;
        font-size:0.38rem;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        font-style:italic;
        color:rgba(255,255,255,1);
        line-height: 0.98rem;
        text-align: center;
        background: url("../assets/images/bt_right@2x.png") no-repeat;
        background-size: cover;
    }
    .btn-left{
        flex: 1;
        width: 4.14rem;
        font-size:0.36rem;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height: 0.98rem;
        padding-left: 0.57rem;
        box-sizing: border-box;
    }
    .bottom-btn{
        position: fixed;
        left:0.4rem;
        bottom:0.4rem;
        width: 6.7rem;
        height: 0.98rem;
        background:rgba(169,81,111,1);
        border-radius:0.49rem;
        display: flex;
        overflow: hidden;
        z-index: 12;
    }
    .activity-container{
        -webkit-overflow-scrolling : touch;
        background-color: #f5f5f5;
    }
    .wrap-img{
        -webkit-overflow-scrolling: touch
    }
</style>
