<template>
    <div class="bottom-btn">
        <div class="wrap-bottom" :class="{'wrap-bottom2':type===2,'phone':phone}" ref="bottom">
            <div class="left-btn" @click="goChat">
                <img src='../assets/images/kefu@2x.png' class="btn-img"/>
                <div class="btn-content">联系客服</div>
            </div>
            <div class="left-btn" style="margin-right: 0;" v-if="type===3" @click="viewShop">
                <img src='../assets/images/icon_store@2x.png' class="btn-img"/>
                <div class="btn-content">查看门店</div>
            </div>
            <div class="left-btn" style="margin-right: 0;" v-if="type===1">
                <a href="tel:4006909562" style="text-decoration: none">
                    <img src='../assets/images/icon_tel@2x.png' class="btn-img"/>
                    <div class="btn-content">电话咨询</div>
                </a>
            </div>
            <button class="btn-order" @click='toggleModal'>立即预约</button>
        </div>
        <modal title="预约到店" :show="show" @close="close" position="bottom">
            <div class="wrap-contact">
                <div class="discount-list">
                    <div class="discount-li">
                        <div class="discount-icon">优惠</div>
                        <div class="disocunt-content">凡预定婚纱拍摄，均有精美礼品相送</div>
                    </div>
                    <div class="discount-li">
                        <div class="discount-icon">优惠</div>
                        <div class="disocunt-content">凡预定婚纱拍摄，均有精美礼品相送</div>
                    </div>
                </div>
                <div class="discount-tips">留下您的联系方式方便我们尽快联系您</div>
                <div class="wrap-tel-input">
                    <input type='number' class="tel-input" placeholder='请填写您的手机号码'/>
                </div>
                <div class="contact-btn">立即预约</div>
            </div>
        </modal>
        <div class="wrap-iframe" ref="iframe" :class="{'showIframe':showIframe}">
            <div class="wrap-iframe-close" @click="showIframe=!showIframe">
                <img src="../assets/images/icon_mor_@2x1.png" class="icon_mor" alt="">
            </div>
            <iframe class="iframe" ref="frame_page" frameborder="0"></iframe>
        </div>
        <awesome-picker ref="picker" :data="shop" @confirm="confirm"></awesome-picker>
    </div>
</template>

<script>
    import modal from "./modal"

    export default {
        name: "bottom_btn",
        data() {
            return {
                show: this.showModal,
                showIframe: false,
                shop: [
                    {
                        index: 0,
                        value: 'A'
                    },
                    {
                        index: 1,
                        value: 'A-a'
                    }
                ],
                phone: false,
                client: this.platform.platform
            }
        },
        props: {
            showModal: {
                type: Boolean,
                default: false
            },
            type: {
                type: Number,
                default: 1//1:联系客服/电话咨询/立即预定    2：联系客服/立即预定   3：联系客服/查看门店/立即预定
            },
            storeStyle: {
                type: Number,
                default: 1
            },
            storeId: {
                type: Number,
                default: 1
            },
            productId: {
                type: Number,
                default:0
            }
        },
        components: {
            modal
        },
        methods: {
            close: function (e) {
                this.show = this.showModal = e;
            },
            goChat:function(){
                this.platform.chat();
            },
            toggleModal: function () {
                this.platform.createOrder(this.storeStyle,this.shop[0].ID,this.productId);
                // this.show = !this.show;
                // this.$emit("contact", {
                //     show: this.show
                // });
            },
            viewShop: function () {
                this.$refs.picker.show();
            },
            confirm: function (e) {
                this.platform.storeDetail(this.shop[e[0].index],this.storeStyle,this.productId);
            }
        },
        created: function () {
            // iPhone X、iPhone XS
            var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
            // iPhone XS Max
            var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
            // iPhone XR
            var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;
            if (isIPhoneX || isIPhoneXSMax || isIPhoneXR) {
                this.phone = true;
            }
            window.h5Callback = res => {
                switch (res.action) {
                    case "loadStores":
                        res.list.forEach(val => {
                            val.value = val.storeName;
                        });
                        this.shop = res.list;
                        break;
                    case "getVersion":
                        window.appVersion=res.version;
                        break;
                }
            };
            if(location.href.indexOf("localhost")===-1){
                this.platform.getVersion();
                setTimeout(()=>{
                    this.platform.loadStores(this.storeStyle);
                },200);
            }
        },
        watch: {
            showIframe: function (n) {
                if (n) {
                    this.$refs.frame_page.src="https://www7.53kf.com/webCompany.php?kf_sign=zIyNTMTU1MM4NjEwNzY1ODgzOTAzMDA3&arg=10136163&style=6";
                    this.$refs.iframe.style.top = (document.documentElement.clientHeight - (this.$refs.iframe.clientHeight + this.$refs.bottom.clientHeight)) + "px"
                } else {
                    this.$refs.frame_page.src="";
                    this.$refs.iframe.style.top = "100%";
                }
            }
        }
    }
</script>

<style scoped>
    .phone, .isIPhoneX, .isIPhoneXSMax, .isIPhoneXR {
        padding-bottom: 0.34rem !important;
    }

    .wrap-iframe.showIframe {

    }

    .iframe {
        width: 100%;
        height: 100%;
    }

    .icon_mor {
        float: right;
        width: 0.4rem;
        height: 0.4rem;
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
        margin-right: 0.4rem;
        margin-top: 0.35rem;
    }

    .wrap-iframe {
        position: fixed;
        top: 100%;
        left: 0;
        width: 100%;
        height: 80%;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        background-color: #fff;
        z-index: 2;
    }

    .wrap-iframe-close {
        height: 1.1rem;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background-color: #3c2d44;
    }

    .wrap-bottom2 .btn-order {
        width: 4.82rem;
    }

    .wrap-bottom {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        background: #fff;
        padding: 0.14rem 0.5rem;
        box-sizing: border-box;
        border-top: 1px solid #eee;
        z-index: 3;
    }

    .left-btn {
        float: left;
        margin-right: 0.4rem;
        width: 1rem;
        position: relative;
    }

    .btn-img {
        width: 0.4rem;
        height: 0.4rem;
        display: block;
        margin: 0 auto 0.1rem;
    }

    .btn-content {
        height: 0.2rem;
        font-size: 0.2rem;
        line-height: 0.2rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: #3c2d44;
        text-align: center;
    }

    .btn-order {
        width: 3.6rem;
        height: 0.8rem;
        background: #3c2d44;
        border-radius: 0.4rem;
        float: right;
        font-size: 0.32rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 0.72rem;
        border: 0;
        outline: 0
    }

    .text-overflow {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .wrap-kf {
        position: absolute;
        left: 50%;
        bottom: 118%;
        width: 6.2rem;
        height: 1.26rem;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 0.2rem 0.2rem 0.2rem 0.02rem;
        z-index: 3;
        padding: 0.2rem 0.82rem 0.2rem 0.3rem;
        box-sizing: border-box;
    }

    .kf-close {
        width: 0.14rem;
        height: 0.14rem;
        display: block;
    }

    .wrap-close {
        position: absolute;
        right: 0;
        height: 0.44rem;
        width: 0.44rem;
        top: 0;
        box-sizing: border-box;
        padding-right: 0.28rem;
        padding-top: 0.28rem;
    }

    .kf-container {
        display: flex;
    }

    .tips-img {
        width: 0.86rem;
        height: 0.86rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
        display: block;
    }

    .wrap-kf-tips {
        flex: 1;
        overflow: hidden;
        padding-left: 0.18rem;
        box-sizing: border-box;
    }

    .tips-top {
        font-size: 0.24rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.24rem;
        margin-top: 0.13rem;
    }

    .tips-bottom {
        font-size: 0.22rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 0.22rem;
        margin-top: 0.17rem;
    }

    .wrap-contact {
        padding-bottom: 0.3rem;
    }

    .discount-list {
        padding: 0.31rem 0;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
    }

    .discount-li {
        display: flex;
        margin-bottom: 0.24rem;
    }

    .discount-li:last-child {
        margin-bottom: 0;
    }

    .discount-icon {
        width: 0.53rem;
        height: 0.28rem;
        border: 1px solid rgba(251, 129, 129, 1);
        border-radius: 0.04rem;
        line-height: 0.28rem;
        font-size: 0.2rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(251, 129, 129, 1);
        text-align: center;
    }

    .disocunt-content {
        flex: 1;
        line-height: 0.28rem;
        font-size: 0.24rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        padding-left: 0.21rem;
    }

    .discount-tips {
        padding: 0.3rem 0 0.23rem;
        font-size: 0.24rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(43, 43, 43, 1);
        line-height: 0.24rem;
    }

    .tel-input {
        display: block;
        margin: 0 auto 0.14rem;
        width: 99%;
        height: 0.68rem;
        border: 1px solid rgba(240, 240, 240, 1);
        border-radius: 0.34rem;
        font-size: 0.28rem;
        font-family: PingFang-SC-Regular;
        padding: 0 0.3rem;
        box-sizing: border-box;
        outline: 0;
    }

    ::-webkit-input-placeholder {
        font-size: 0.28rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(206, 206, 206, 1);
        text-align: center;
        line-height: 0.28rem;
    }

    .contact-btn {
        width: 100%;
        height: 0.68rem;
        background: #3c2d44;
        border-radius: 0.34rem;
        line-height: 0.68rem;
        text-align: center;
        font-size: 0.28rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    button.wrap-kf-concat {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border: 0
    }
</style>
