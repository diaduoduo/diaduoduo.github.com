<template>
    <div class="article">
        <div class="article-title">{{info.News.Title||''}}</div>
        <div class="author">By <span class="author-name">{{info.News.AdminName||''}}</span></div>
        <div class="article-container" v-html="info.News.Content||''"></div>
        <div class="list" v-if="client!=='weChat'&&(info.Products.length>0||info.MerchantShops.length>0)">
            <div v-if="info.Products">
                <div class="li" v-for="item in info.Products" :key="item.ID" @click="goProduct(item)">
                    <div class="li-package">
                        <img :src="item.CoverPicture" alt="" style="display: block;width: 100%;height: 100%">
                    </div>
                    <div class="package-detail">
                        <div class="package-name text-2">
                            {{item.Name}}
                        </div>
                        <div class="package-price"><span class="icon-rmb">¥</span><span
                            class="price">{{item.Price}}</span>元起
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="info.MerchantShops">
                <div class="li" v-for="item in info.MerchantShops" :key="item.ID" @click="goStore(item)">
                    <div class="li-package">
                        <img :src="item.CoverPicture" alt="" style="display: block;width: 100%;height: 100%">
                    </div>
                    <div class="package-detail">
                        <div class="package-name text-overflow">{{item.StoreName}}
                        </div>
                        <div class="package-price" style="color:rgba(102,102,102,1);font-size: 0.26rem">
                            {{item.PopularWord}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bottom-btn">
            <div class="btn">
                <img v-if="!collect" src="../assets/images/icon_home_collect_sel@2x.png" alt="" class="btn-logo"
                     @click="addCollecNum">
                <img v-else src="../assets/images/icon_colle_on@2x.png" alt="" class="btn-logo"
                     @click="cancelCollecNum">
                <span>{{info.News.CollecNum}}</span>
            </div>
            <div class="btn">
                <img v-if="!good" src="../assets/images/icon_home_good_sel@2x.png" alt="" class="btn-logo"
                     @click="addGiveNum">
                <img v-else src="../assets/images/icon_give_on@2x.png" alt="" class="btn-logo" @click="cancelGiveNum">
                <span>{{info.News.GiveNum}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "article1",
        data() {
            return {
                collect: false,
                good: false,
                id: 0,
                info: {
                    News: {},
                    Products: [],
                    MerchantShops: []
                },
                client: this.platform.platform,
                token: ''
            }
        },
        created() {
            this.id = this.$route.query.id;
            this.token = window.sessionStorage.getItem("token");
            this.getInfo();
            window.h5Callback = res => {
                if (res.action === "getToken") {
                    window.sessionStorage.setItem("token", res.token);
                    this.token = res.token;
                }
            };
        },
        methods: {
            cancelCollecNum: function () {
                if (this.token) {
                    this.collectA(() => {
                        this.collect = false;
                        this.info.News.CollecNum--;
                    })
                } else {
                    this.platform.login();
                }

            },
            cancelGiveNum: function () {
                if (this.token) {
                    this.give(() => {
                        this.good = false;
                        this.info.News.GiveNum--;
                    });
                } else {
                    this.platform.login();
                }
            },
            addCollecNum: function () {
                if (this.token) {
                    this.collectA(() => {
                        this.collect = true;
                        this.info.News.CollecNum++;
                    });
                } else {
                    this.platform.login();
                }

            },
            addGiveNum: function () {
                if (this.token) {
                    this.give(() => {
                        this.good = true;
                        this.info.News.GiveNum++;
                    });
                } else {
                    this.platform.login();
                }
            },
            collectA: function (fn) {
                this.$post("/api/UserResources/UserOperation", {
                    "ResourceTypeCode": "News",
                    "ResourceTypeID": this.id,
                    "OperationTypeCode": "Collection"
                }).then(res => {
                    if (res.ReturnCode === 0) {
                        fn && fn(res);
                        this.platform.collectNews();
                    } else {
                        this.$toast(res.Message)
                    }
                })
            },
            give: function (fn) {
                this.$post("/api/UserResources/UserOperation", {
                    "ResourceTypeCode": "News",
                    "ResourceTypeID": this.id,
                    "OperationTypeCode": "Appreciate"
                }).then(res => {
                    if (res.ReturnCode === 0) {
                        fn && fn(res);
                    } else {
                        this.$toast(res.Message)
                    }
                })
            },
            getInfo: function () {
                this.$get("/api/News/GetNewsDetail", {
                    params: {
                        newsID: this.id
                    }
                }).then(res => {
                    if (res.ReturnCode === 0) {
                        this.info = res.ReturnObject;
                        this.collect = res.ReturnObject.News.IsCollec;
                        this.good = res.ReturnObject.News.IsGive;
                    } else {
                        alert(res.Message);
                    }
                })
            },
            goProduct: function (item) {
                this.platform.productDetail(item);
            },
            goStore: function (item) {
                this.platform.storeDetail(item, item.StoreStyle, 0)
            }
        }
    }
</script>
<style>
    video {
        width: 100%;
    }

    .article-container img {
        width: 100%;
        display: block;
    }
</style>
<style scoped>
    .title {
        font-size: 0.36rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(43, 43, 43, 1);
        line-height: 0.36rem;
        margin-bottom: 0.3rem;
    }

    .btn-logo {
        width: 0.3rem;
        height: 0.3rem;
        vertical-align: text-bottom;
        margin-right: 0.2rem;
    }

    .btn {
        flex: 1;
        text-align: center;
        font-size: 0.24rem;
        line-height: 0.98rem;
        font-family: GothamBookRegular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
    }

    .btn-logo {

    }

    .bottom-btn {
        position: fixed;
        width: 100%;
        height: 0.98rem;
        left: 0;
        bottom: 0;
        background-color: #fff;
        border-top: 1px solid #f9f9f9;
        display: flex;
    }

    .icon-rmb {
        font-size: 0.2rem;
    }

    .price {
        font-size: 0.3rem;
    }

    .package-price {
        margin-top: 0.62rem;
        line-height: 0.24rem;
        color: #a9516f;
        font-family: PingFang-SC-Regular;
        font-size: 0.24rem;
    }

    .list {
        width: 6.9rem;
        margin: 0 auto 0.3rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 0.24rem 2px rgba(0, 0, 0, 0.05);
        border-radius: 0.1rem;
    }

    .li {
        display: -webkit-box;
        display: box;
        padding: 0.2rem;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
    }

    /*.li:last-child{*/
    /*border-bottom: 0;*/
    /*}*/
    .li-package {
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 0.1rem;
        display: block;
        overflow: hidden;
    }

    .package-detail {
        padding-left: 0.3rem;
        flex: 1;
    }

    .package-name {
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(43, 43, 43, 1);
        line-height: 0.4rem;
    }

    .li:last-child {
        margin-bottom: 0;
    }

    .article {
        padding-bottom: 1rem;
    }

    .article-title {
        font-size: 0.38rem;
        font-family: PingFang-SC-Light;
        font-weight: bold;
        color: rgba(43, 43, 43, 1);
        line-height: 0.6rem;
        padding: 0.15rem 0.3rem 0.13rem;
    }

    .author {
        font-size: 0.28rem;
        font-family: PingFang-SC-Light;
        color: #CECECE;
        line-height: 0.28rem;
        margin-bottom: 0.3rem;
        padding: 0 0.3rem;
    }

    .author-name {
        color: #a9516f;
    }

    .article-container {
        padding: 0 0 0.56rem;
    }
</style>
