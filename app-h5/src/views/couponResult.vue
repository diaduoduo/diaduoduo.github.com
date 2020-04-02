<template lang="">
    <div class="coupon-container">
        <h3 class="coupon_title">优惠券</h3>
        <div class="coupon_bd">
            <div class="getCoupon">
                <img class="icon_sucess" src="../assets/images/icon_success@2x.png">
                <p class="getcouponfont">您已成功领取优惠券~</p>
                <div class="get_app" @click="appCoupon">前往APP查看我的优惠券</div>
            </div>
            <div class="coupon_rule">
                <span class="round round_l"></span>
                <span class="round round_r"></span>
                <h5 class="rule_title">使用规则</h5>
                <div class="rule_info">
                   {{info.Remarks}}
                </div>
            </div>
        </div>
        <div class="modal" v-show="showModal">
            <div class="mask" @click="showModal=!showModal"></div>
            <div class="content">
                <div class="tips" style="font-size: 0.38rem">链接打不开？</div>
                <div class="tips2">请点击右上角···</div>
                <div class="tips2">选择在浏览器中打开</div>
                <img src="../assets/images/line_share@2x.png" alt="" class="gou">
            </div>
        </div>
    </div>
</template>
<script>
export default {
        name: "couponResult",
        data(){
            return{
                showModal:false,
                getCoupon:false,
                code:this.$route.query.code,
                active:false,
                info:{},
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
            appCoupon:function(){
                var u = navigator.userAgent;
                 console.log(navigator.userAgent);
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isiOS){
                    //ios系统输出
                    console.log('ios端');
                    window.location = 'itms-apps://itunes.apple.com/cn/app/id1470347984?mt=8';
                   // alert('itms-apps://itunes.apple.com/cn/app/id1470347984?mt=8')
                }else{
                    //android系统输出
                    console.log('android端');
                    var ua = navigator.userAgent.toLowerCase();  
                        if(ua.match(/MicroMessenger/i)=="micromessenger") {  
                        this.showModal = true;
                        window.location = 'https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/APK/app-release_120_4_%E5%8D%8E%E4%B8%BA_sign.apk'
                        } else { 
                        //其他输出
                        window.location = 'https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/APK/app-release_120_4_%E5%8D%8E%E4%B8%BA_sign.apk'
                        }  

                }

            }
        },

        created:function(){
            this.getCouponInfo();
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