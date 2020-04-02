<template>
    <div class="tx">
        <div class="wrap-detail">
            <img src='https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/1-1Q2111A539.jpg' class="img"/>
            <div class="top-info">
                <div class="info">
                    <div class="top-title">
                        <div class="title fl text-overflow">2019全新《ARTIZ PARIS》系列</div>
                        <div class="label fr">人气爆款</div>
                    </div>
                    <div class="wrap-price">
                        <span class="icon-rmb">￥</span>12345
                        <div class="original-price">￥23456</div>
                    </div>
                </div>
            </div>
            <div class="wrap-intro">
                <div class="wrap-intro-title">
                    <div class="module-title">套餐介绍</div>
                    <div class="wrap-more" @click='toggleModal'>
                        查看更多
                        <img src='../assets/images/icon_mor@2x.png' class="arrow"/>
                    </div>
                </div>
                <div class="intro-list">
                    <div class="intro-li">
                        <img src='../assets/images/144.png' class="icon-intro"/>
                        <div class="li-detail">
                            <div class="li-detail-name">造型</div>
                            <div class="li-detail-value">5套</div>
                        </div>
                    </div>
                    <div class="intro-li">
                        <img src='../assets/images/144.png' class="icon-intro"/>
                        <div class="li-detail">
                            <div class="li-detail-name">拍摄</div>
                            <div class="li-detail-value">5套</div>
                        </div>
                    </div>
                    <div class="intro-li">
                        <img src='../assets/images/144.png' class="icon-intro"/>
                        <div class="li-detail">
                            <div class="li-detail-name">精修</div>
                            <div class="li-detail-value">5套</div>
                        </div>
                    </div>
                    <div class="intro-li">
                        <img src='../assets/images/144.png' class="icon-intro"/>
                        <div class="li-detail">
                            <div class="li-detail-name">摄影师</div>
                            <div class="li-detail-value">首席</div>
                        </div>
                    </div>
                </div>
                <div class="package">
                    <div class='package-title'>套餐亮点</div>
                    <div class="package-list">
                        <div class="package-li">
                            <span style='font-weight:bold'>·</span> 全新《星夜》系列</div>
                        <div class="package-li">
                            <span style='font-weight:bold'>·</span> 更多详情咨询客服</div>
                    </div>
                </div>
            </div>
            <img src='https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/1-1Q2111A539.jpg' class="img"/>
            <bottom_btn/>
        </div>
        <modal title="套餐介绍" :show="showModal" @close="toggleModal" :scroll="true">
            <div class="wrap-package-detail">
                <div class="modal-package-detail">
                    <div class="modal-package-title">拍摄特色</div>
                    <div class="detail-line">
                        <div class="line-label">拍摄类型</div>
                        <div class="line-content">婚纱摄影</div>
                    </div>
                    <div class="detail-line">
                        <div class="line-label">拍摄风格</div>
                        <div class="line-content">韩式</div>
                    </div>
                </div>
                <div class="modal-package-detail">
                    <div class="modal-package-title">服装</div>
                    <div class="detail-line">
                        <div class="line-label">服装造型</div>
                        <div class="line-content">5套</div>
                    </div>
                    <div class="detail-line">
                        <div class="line-label">化妆造型</div>
                        <div class="line-content">5套</div>
                    </div>
                    <div class="detail-line">
                        <div class="line-label">服装说明</div>
                        <div class="line-content">新娘5套服装：GK水晶一件 拍摄区4件 韩国一线品牌GraceKelly水晶纱；新郎 5套衣服；拍摄区5件</div>
                    </div>
                </div>
                <div class="modal-package-detail">
                    <div class="modal-package-title">拍摄特色</div>
                    <div class="detail-line">
                        <div class="line-label">拍摄类型</div>
                        <div class="line-content">婚纱摄影</div>
                    </div>
                    <div class="detail-line">
                        <div class="line-label">拍摄风格</div>
                        <div class="line-content">韩式</div>
                    </div>
                </div>
                <div class="modal-package-detail">
                    <div class="modal-package-title">服装</div>
                    <div class="detail-line">
                        <div class="line-label">服装造型</div>
                        <div class="line-content">5套</div>
                    </div>
                    <div class="detail-line">
                        <div class="line-label">化妆造型</div>
                        <div class="line-content">5套</div>
                    </div>
                    <div class="detail-line">
                        <div class="line-label">服装说明</div>
                        <div class="line-content">新娘5套服装：GK水晶一件 拍摄区4件 韩国一线品牌GraceKelly水晶纱；新郎 5套衣服；拍摄区5件</div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    import modal from "../components/modal"
    export default {
        name: "txDetail",
        data(){
            return{
                showModal:false
            }
        },
        methods:{
            toggleModal:function(){
                this.showModal=!this.showModal
            },
        },
        components:{
            modal
        }
    }
</script>

<style scoped>
    .wrap-detail {
        padding-bottom: 1.1rem;
    }

    .img {
        width: 100%;
        display: block;
    }

    .top-info {
        padding: 0 0.3rem;
    }

    .info {
        padding: 0.3rem 0;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
    }

    .top-title {
        overflow: hidden;
    }

    .title {
        width: 6rem;
        font-family: PingFang-SC-Medium;
        color: #2b2b2b;
        font-size: 0.28rem;
        line-height: 0.32rem;
    }

    .label {
        width: 0.8rem;
        height: 0.28rem;
        line-height: 0.28rem;
        background: rgba(254, 189, 86, 1);
        border-radius: 0.04rem;
        font-size: 0.18rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        margin-top: 0.02rem;
    }

    .wrap-price {
        color: #a9516f;
        font-size: 0.3rem;
        font-family: GothamBookRegular;
        margin-top: 0.16rem;
    }

    .icon-rmb {
        font-size: 0.2rem;
    }

    .original-price {
        display: inline-block;
        font-family: PingFang-SC-Regular;
        color: #999;
        font-size: 0.2rem;
        text-decoration: line-through;
        margin-left: 0.1rem;
    }

    .wrap-intro-title {
        padding: 0.3rem 0 0.4rem;
        position: relative;
        overflow: hidden;
    }

    .module-title {
        height: 0.28rem;
        font-size: 0.28rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(43, 43, 43, 1);
        line-height: 0.28rem;
        float: left;
    }

    .wrap-more {
        font-size: 0.24rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 0.28rem;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        padding-right: 0.3rem;
        height: 0.28rem;
        min-width: 0.3rem;
    }

    .arrow {
        position: absolute;
        right: 0;
        top: 50%;
        width: 0.22rem;
        height: 0.22rem;
        transform: translate(0, -50%);
    }

    .wrap-intro {
        padding: 0 0.3rem;
    }

    .intro-list {
        margin-bottom: 0.25rem;
        overflow: hidden;
    }

    .intro-li {
        margin-bottom: 0.33rem;
        float: left;
        width: 1.9rem;
        margin-right: 0.5rem;
        display: flex;
        height: 0.52rem;
    }

    .intro-li:nth-child(3n) {
        margin-right: 0;
    }

    .icon-intro {
        width: 0.52rem;
        height: 0.52rem;
        display: block;
        box-sizing: border-box;
    }

    .li-detail {
        flex: 1;
        padding-left: 0.1rem;
    }

    .li-detail-name {
        font-size: 0.24rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 0.24rem;
        margin-bottom: 0.08rem;
    }

    .li-detail-value {
        font-size: 0.22rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: #3c2d44;
        line-height: 0.22rem;
    }

    .package-title {
        font-family: PingFang-SC-Regular;
        font-size: 0.28rem;
        color: #666;
        margin-bottom: 0.3rem;
    }

    .package-li {
        font-family: PingFang-SC-Regular;
        font-size: 0.28rem;
        color: #666;
        list-style-type: circle;
    }

    .package-list {
        margin-bottom: 0.6rem;
    }

    .wrap-package-detail {
        padding-top: 0.6rem;
        height: 100%;
    }

    .modal-package-detail {
        padding-bottom: 0.6rem;
    }

    .modal-package-title {
        font-size: 0.28rem;
        line-height: 0.28rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(43, 43, 43, 1);
        margin-bottom: 0.28rem;
    }

    .detail-line {
        margin-bottom: 0.08rem;
        display: flex;
    }

    .modal-package-title .detail-line:last-child {
        margin-bottom: 0;
    }

    .line-label, .line-content {
        width: 1.4rem;
        font-family: PingFang-SC-Regular;
        color: #999;
        font-size: 0.24rem;
        line-height: 0.36rem;
    }

    .line-content {
        flex: 1;
        color: #2b2b2b;
    }
</style>
