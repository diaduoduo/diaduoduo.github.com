<template>
    <div class="pay">
        <div class="activity-container">
            <div class="wrap-list">
                <div class="list-title">请选择支付方式</div>
                <div class="list">
                    <div class="li" @click="way='Alipay'">
                        <img src="../assets/images/icon-ailipay@2x.png" alt="" class="way">
                        支付宝支付
                        <img src="../assets/images/icon_pay@2x.png" v-show="way==='Alipay'" alt="" class="gou">
                    </div>
                    <div class="li" @click="way='WeChat'">
                        <img src="../assets/images/icon-wechat@2x.png" alt="" class="way">
                        微信支付
                        <img src="../assets/images/icon_pay@2x.png"  v-show="way==='WeChat'" alt="" class="gou">
                    </div>
                </div>
            </div>
            <div class="bottom-btn">
                <div class="pay-amount">支付金额：<span class="amount">¥<span style="font-size: 0.36rem">99</span></span></div>
                <div class="btn" @click="pay">确认支付</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pay",
        data(){
            return{
                way:"Alipay",
                token:'',
                id:0
            }
        },
        created:function(){
            this.id=this.$route.query.id;
            this.token=window.sessionStorage.getItem("token")||'';
            window.h5Callback = res => {
                if(res.action==="getToken"){
                    window.sessionStorage.setItem("token",res.token);
                    this.token=res.token;
                }
            };
        },
        methods:{
            pay:function () {
                if(this.token){
                    this.$post("/api/DiscountActivity/DiscountPlaceOrder",{
                        "PayModeCode": this.way,
                        "ProductId": this.id
                    }).then(res=>{
                        if(res.ReturnCode===0){
                            this.platform.pay2({
                                payType:this.way==="WeChat"?2:1,
                                OrderNum:res.ReturnObject.OrderNum,
                                payCharacter:this.way==="WeChat"?JSON.parse(res.ReturnObject.PayCharacter):encodeURIComponent(res.ReturnObject.PayCharacter)
                            })
                        }else{
                            this.$toast(res.Message);
                        }
                    })
                }else{
                    this.platform.login();
                }
            }
        },
        components:{

        }
    }
</script>

<style scoped>
    .btn{
        float: right;
        margin-right: 0.4rem;
        width: 2.6rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        overflow: hidden;
        margin-top: 0.09rem;
        background:rgba(60,45,68,1);
        text-align: center;
        font-size:0.32rem;
        font-family:PingFang-SC-Regular;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height: 0.8rem;
    }
    .amount{
        color:rgba(169, 81, 111, 1);
        font-size: 0.24rem;
    }
    .pay-amount{
        float: left;
        margin-left: 0.4rem;
        height: 0.98rem;
        line-height: 0.98rem;
        font-size:0.28rem;
        font-family:PingFang-SC-Medium;
        font-weight:500;
        color:rgba(43,43,43,1);
    }
    .bottom-btn{
        position: fixed;
        bottom: 0;
        left:0;
        width: 100%;
        height: 0.98rem;
        background: #fff;
    }
    .way{
        float: left;
        margin-right: 0.48rem;
        width: 0.44rem;
        height: 0.44rem;
        margin-top: 0.28rem;
    }
    .gou{
        position: absolute;
        right: 0;
        top:50%;
        transform: translate(0,-50%);
        width: 0.3rem;
        height: 0.3rem;
    }
    .li:last-child{
        border-bottom: 0;
    }
    .li{
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid rgba(240,240,240,1);
        font-size:0.3rem;
        font-family:PingFang-SC-Light;
        font-weight:bold;
        color:rgba(43,43,43,1);
        position: relative;
    }
    .list{
        background: #fff;
        padding: 0 0.3rem;
    }
    .list-title{
        line-height: 0.56rem;
        font-size:0.24rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        padding-left: 0.3rem;
    }
    .wrap-list{
        position: fixed;
        left:0;
        width: 100%;
    }
    .activity-container{
        position: fixed;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        overflow: auto;
    }
</style>
