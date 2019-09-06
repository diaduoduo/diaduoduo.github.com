<template>
    <div class="tc">
        <div class="tc-top">
            <img src="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/aa.jpeg" class="tc-img" alt="">
            <div class="top-detail">
                <p class="label">婚庆晚宴</p>
                <p class="top-address">顶级奢华-9号厅</p>
                <div class="package-price"><span class="icon-rmb">¥</span><span class="price">7980</span>元/桌起</div>
                <div class="btn-search">查询档期</div>
            </div>
        </div>
        <div class="list">
            <div class="li">
                <div class="li-title">起订价：</div><div class="li-content w2">7980元/桌</div>
                <div class="li-title">起订桌数：</div><div class="li-content">14桌</div>
            </div>
            <div class="li">
                <div class="li-title">桌规格：</div><div class="li-content w2">10人/桌</div>
                <div class="li-title">迎宾区：</div><div class="li-content">有</div>
            </div>
            <div class="li">
                <div class="li-title">香槟塔：</div><div class="li-content w2">有</div>
                <div class="li-title">舞台：</div><div class="li-content">无</div>
            </div>
            <div class="li">
                <div class="li-title">服务费：</div><div class="li-content w2">5%</div>
                <div class="li-title">层高：</div><div class="li-content">11米</div>
            </div>

        </div>
        <div class="img-list">
            <img v-lazy="src" class="detail-img" alt="">
        </div>
        <bottom_btn></bottom_btn>
    </div>
</template>

<script>
    export default {
        name: "tcDetail",
        data(){
            return{
                src:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553072707176&di=2ed32af70f34f1f47118198f97faaf9d&imgtype=0&src=http%3A%2F%2Fpic.ffpic.com%2Ffiles%2F2018%2F0611%2F0530shdlrbchwmgqsjbz3.jpg"
            }
        },
        components:{

        }
    }
</script>

<style scoped>
    .li-title{
        display: inline-block;
        width: 1.46rem;
        font-size: 0.24rem;
        color: #999;
    }
    .li-content{
        display: inline-block;
        font-size: 0.24rem;
        color: #666;
    }
    .w2{
        width: 2.6rem;
    }
    .list{
        padding: 0.56rem;
        overflow: hidden;
    }
    .li{
        float: left;
        margin-bottom: 0.32rem;
        width: 100%;
        font-family: PingFang-SC-Regular;
        line-height: 0.32rem;
    }
    .li:last-child{
        margin-bottom: 0;
    }
    .icon-rmb{
        font-size: 0.2rem;
    }
    .price{
        font-size: 0.3rem;
    }
    .package-price{
        margin-top: 0.66rem;
        line-height: 0.24rem;
        color: #a9516f;
        font-family: PingFang-SC-Regular;
        font-size: 0.24rem;
    }
    .top-address{
        clear: both;
        padding-top: 0.14rem;
        font-family: PingFang-SC-Regular;
        color: #2b2b2b;
        font-size: 0.28rem;
        line-height: 0.28rem;
    }
    .label{
        height:0.3rem;
        line-height: 0.3rem;
        background:rgba(254,189,86,1);
        border-radius:0.04rem;
        font-size:0.18rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        padding: 0 0.04rem;
        float: left;
        margin-top: 0.06rem;
    }
    .top-detail{
        flex: 1;
        padding-left: 0.2rem;
        position: relative;
    }
    .btn-search{
        position: absolute;
        right:0;
        top:50%;
        width:1.2rem;
        height:0.44rem;
        background:#3c2d44;
        border-radius:0.22rem;
        line-height: 0.44rem;
        font-size:0.24rem;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        -webkit-transform: translate(0,-50%);
        -moz-transform: translate(0,-50%);
        -ms-transform: translate(0,-50%);
        -o-transform: translate(0,-50%);
        transform: translate(0,-50%);
        text-align: center;
    }
    .tc-img{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 0.1rem;
    }
    .tc-top{
        padding: 0.32rem 0.3rem 0;
        display: flex;
    }
    .detail-img{
        display: block;
        width: 100%;
    }
    .tc{
        padding-bottom: 1.1rem;
    }
</style>
