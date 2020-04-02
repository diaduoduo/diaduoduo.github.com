<template>
    <div class="wrap-success">
        <img src='../assets/images/icon_rou@2x.png' class="icon_rou"/>
        <div class="tips">专业顾问正在为您查询档期，</div>
        <div class="tips" style='margin-bottom:0.48rem;'>请留意电话接听！</div>
        <div class='tips-small'>直接联系顾问补充服务细节</div>
        <div class='wrap-btn'>
            <a href="tel:4006909562">
                <div class="btn">
                    <img src='../assets/images/icon_tel@2x.png' class='icon_tel'/>
                </div>
            </a>
            <div class='btn'>
                <button class='icon_tel'>
                    <img src='../assets/images/icon_vie@2x.png' class='icon_tel'/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "success"
    }
</script>

<style scoped>
    .icon_rou {
        display: block;
        width: 1.76rem;
        height: 1.76rem;
        margin: 1.28rem auto 0.46rem;
    }

    .tips {
        font-size: 0.3rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.52rem;
        text-align: center;
    }

    .tips-small {
        font-size: 0.24rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 0.24rem;
        text-align: center;
        margin-bottom: 1.14rem;
    }

    .wrap-btn {
        display: flex;
        justify-content: space-around
    }

    .btn {
        display: block;
        width: 1.2rem;
        height: 1.2rem;
    }

    .icon_tel, button.icon_tel {
        width: 100%;
        height: 100%;
        display: block;
        border: 0;
        padding: 0;
        outline: 0;
        background-color: rgba(0, 0, 0, 0);
        border-radius: 50%;
        text-decoration:none;
    }
</style>
