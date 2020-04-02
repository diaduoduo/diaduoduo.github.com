<template lang="">
    <div class="coupon-container">
        <h3 class="coupon_title">优惠券</h3>
        <div class="coupon_bd">
            <div>
                <h3 class="title">{{info.Name}}</h3>
                <div class="price_box">
                    <span class="price_tag">¥</span>
                    <span class="price_nums">{{info.Money}}</span>
                </div>
                <p class="coupon_tips">订单满{{info.OrderAmountLower}}元可用</p>
                <div class="coupon_form">
                    <div class="coupon_ipt">
                        <input type='number' pattern="\d*" v-model="phoneNum" class="input input_w1" placeholder="请输入您的手机号" >
                    </div>
                    <div class="coupon_ipt">
                        <input type='number' pattern="\d*" v-model="verifyNum" class="input input_w2" placeholder="请输入验证码">
                        <button v-model="btnContent"  class="getCode"　:class="{'active':active}"  @click="sendCode">{{sendCodetext}}</button>
                    </div>
                    <button class="goGet" @click="goGet">立即领取</button>
                </div>
            </div>
            <div class="coupon_rule">
                <span class="round round_l"></span>
                <span class="round round_r"></span>
                <h5 class="rule_title">使用规则</h5>
                <div class="rule_info"　v-html="info.Remarks">
                  <!-- {{info.Remarks}} -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
        name: "coupon",
        data(){
            return{
                showModal:false,
                getCoupon:false,
                code:this.$route.query.code,
                info:{},
                phoneNum:'',//手机号
                verifyNum:"",//验证码
                time:0,//发送验证码间隔的时间,
                btnContent:"获取验证码",
                sendCodetext:"获取验证码",
                disabled:false, //按钮状态
                active:false,
            }
        },
        methods: {
            getCouponInfo:function(){
                this.$get("/api/CouponType/GetCouponDetailByCode",{
                    params:{
                        Code:this.code
                    }
                }).then(res=>{
                    console.log(res)
                    if (res.ReturnCode === 0) {
                        this.info = res.ReturnObject;
                        
                    }
                })
            },
            sendCode:function(){
                var phoneNum = this.phoneNum;
                if(!phoneNum){
                    this.$toast("请输入手机号");
                    return;
                }
                if(!(/^1[3456789]\d{9}$/.test(phoneNum))){
                    this.$toast("您输入的手机号码不合法，请重新输入");
                    return;
                }


                let data = new FormData();
                data.append('mobile',phoneNum);
                this.$post("/api/Coupon/GetVerificationCode",data).then(res =>{
                    if(res.ReturnCode==0){
                        this.time = 60;
                        this.timer();
                     this.$toast(res.Message);
                    } else {
                        this.$toast(res.Message);
                    }
                   // console.log(res)

                })

            },
            timer(){
                if(this.time>0){
                this.time--;
                this.sendCodetext = this.time+"s后重新获取";
                this.active = true;
                var timer = setTimeout(this.timer,1000);
                }else if(this.time == 0){
                this.sendCodetext = "获取验证码";
                clearTimeout(timer);
                this.active = false;
                }
            },
            goGet:function(){
                var phoneNum = this.phoneNum;
                var verifyNum = this.verifyNum;
                var code = this.code
                if(!phoneNum){
                    this.$toast("请输入手机号");
                    return;
                }
                if(!(/^1[3456789]\d{9}$/.test(phoneNum))){
                    this.$toast("您输入的手机号码不合法，请重新输入");
                    return;
                }
                if(!verifyNum){
                    this.$toast("请输入验证码");
                    return;
                }
                this.$post("/api/Coupon/ReceiveCoupons",{
                    "mobile":phoneNum,
                    "Code":verifyNum,
                    "CouponCode":code
                }).then(res =>{
                    console.log(res);
                    if(res.ReturnCode ==0){
                         console.log(this.$route.path)
                        this.$router.push({
                            path:'/couponResult',
                            query:{
                                code:this.code
                            }
                        })

                    } else {
                    this.$toast(res.Message);
                    }

                })
            },
        },

        created:function(){
            this.getCouponInfo();
        },
        mounted () {// 软键盘关闭事件   可在全局的地方  vue的话比如App.vue 文件里添加以下代码
            document.body.addEventListener('focusout', () => {
            // 回到原点  若觉得一瞬间回到底部不够炫酷，那自己可以自定义缓慢回弹效果， 可用css 、贝塞尔曲线、js的 requestAnimationFrame  等等 方法 实现体验性更好的回弹效果
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            })
        }
}
</script>
<style>
    html, body, #app,.coupon-container{
        height: 100%;
        position: relative;
    }
    input{
        border: 0;
        -webkit-appearance:none;
    }
</style>
<style scoped>
button{
    margin: 0;
    padding: 0;
    border: 1px solid transparent; 
    outline: none;
}
input:focus, textarea:focus, select:focus {
        outline: none;
}
    .coupon-container{
        background:linear-gradient(180deg,rgba(255,177,175,1) 0%,rgba(251,146,143,1) 100%);
        height: 100vh;
    }
    .coupon_title{
        height:0.9rem;
        font-size:0.32rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:0.9rem;
        text-align: center
    }
    .coupon_bd{
        width:6.9rem;
        padding-bottom: .5rem;
        background:rgba(255,255,255,1);
        border-radius:0 0 0.2rem 0.2rem;
        margin:0 auto;
    }
    .title{
        width:100%;
        height:0.9rem;
        font-size:0.32rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(43,43,43,1);
        line-height:0.9rem;
        text-align: center;
        padding-top: .1rem
        
    }
    .price_box{
        text-align: center;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(169,81,111,1);

    }
    .price_tag{
        font-size: .32rem;
        margin-right: .05rem
    }
    .price_nums{
        font-size:.68rem
    }
    .coupon_tips{
        height:.64rem;
        font-size: .26rem;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(43,43,43,1);
        line-height: .64rem;
        text-align: center
    }
    .coupon_form{
        margin-top: .3rem
    }
    .coupon_ipt{
        overflow: hidden;
        display: flex;
        width: 5.82rem;
        margin:0 auto;
        margin-bottom: .2rem
    }
    .input{
        height: .44rem;
        line-height: .44rem;
        border: .02rem solid rgba(206,206,206,1);
        border-radius:.44rem;
        padding: .22rem .4rem;
        font-size: .3rem

    }
    .input_w1{
        width: 5.02rem;
    }
    .input_w2{
        width:2.62rem;
    }
    input::-webkit-input-placeholder{
        color:#CECECE;
    }
    .getCode{
        width:2.24rem;
        height:0.88rem;
        background:white;
        border-radius:0.44rem;
        font-size:0.3rem;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(169, 81, 111, 1);
        margin-left: .16rem;
        border:rgba(169, 81, 111, 1) .02rem solid 
    }
    .goGet{
        width:5.82rem;
        height:0.88rem;
        line-height: 0.88rem;
        background:rgba(169,81,111,1);
        border-radius:0.44rem;
        margin:0 auto;
        font-size:0.30rem;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        display: block
    }
    .coupon_rule{
        width: 6.9rem;
        border-top:.02rem solid rgba(240,240,240,1);
        position: relative;
        margin:0 auto;
        margin-top: .4rem;

    }
    .round{
    width: .3rem;
    height: .3rem;
    border-radius: 50%;
    position: absolute;
    top: -0.18rem;
    background: #FC9E9C;
    }
    .round_l{
         left: -0.15rem;
    }
    .round_r{
        right: -0.15rem;
    }
    .rule_title{
        margin-top:.4rem;
        font-size:.3rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(43,43,43,1);
        margin:.4rem .3rem 0 .3rem
    }
    .rule_info{
        margin:.22rem 0.3rem 0 0.3rem;
        font-size:0.28rem;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height: .4rem
    }
    .icon_sucess{
        margin: 0 auto ; 
        width: 2.06rem;
        height: 1.48rem;
        display: block;
        padding-top:1.2rem
    }
    .getcouponfont{
        margin-top: .33rem;
        text-align: center;
        font-size:0.28rem;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:.64rem;
    }
    .get_app{
        text-align: center;
        width:5.82rem;
        height:.88rem;
        line-height: 0.88rem;
        border:.02rem solid rgba(169,81,111,1);
        border-radius:.44rem;
        margin:0 auto;
        margin-top: .5rem;
        font-size:.3rem;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(169,81,111,1);
    }
    .content div{
        padding-left: 2.9rem;
    }
    .content{
        position: fixed;
        top:0.1rem;
        left:0.2rem;
        width: 7.1rem;
        background:rgba(255,255,255,1);
        border-radius: 0.1rem;
        padding-top: 1rem;
        padding-bottom: 0.2rem;
    }
    .mask{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
    }
    .gou{
        position: absolute;
        top: 0.1rem;
        right: 0.2rem;
        width: 1.68rem;
        height: 1.68rem;
    }
    .active{
       background:rgba(240,240,240,1);
        border-radius: .44rem;
        font-size: .3rem;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        border-color: rgba(240,240,240,1);
    }
</style>