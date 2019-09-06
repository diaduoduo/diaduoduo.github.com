<template>
    <div class="module" :style="{paddingLeft:pad_l+'rem'}">
        <div class="wrap-module-title">
            <div class="module-title" :style="{paddingLeft:pad_l===0?'0.3rem':'0'}">{{title}}</div>
            <div class="wrap-more" @click='viewMore' v-if="showMore">
                {{more}}
                <img v-if="showArrow" src='../assets/images/icon_mor@2x.png' class="arrow"/>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "module",
        props:{
            title: {
                type: String,
                default: ''
            },
            more: {
                type: String,
                default: "查看更多"
            },
            showArrow: {
                type: Boolean,
                default: true
            },
            showMore: {
                type: Boolean,
                default: true
            },
            pad_l: {
                type: Number,
                default: 0.3
            }
        },
        methods:{
            viewMore:function () {
                this.$emit("viewMore");
            }
        },
    }
</script>

<style scoped>
    .module {
        background-color: #fff;
        margin-bottom: 0.6rem;
    }

    .wrap-module-title {
        margin: 0.6rem 0 0.3rem;
        position: relative;
        overflow: hidden;
    }

    .module-title {
        height: 0.38rem;
        font-size: 0.34rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(43, 43, 43, 1);
        line-height: 0.38rem;
        float: left;
    }

    .wrap-more {
        font-size: 0.24rem;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 0.34rem;
        position: absolute;
        right: 0;
        top:0;
        padding-right: 0.54rem;
        height: 0.32rem;
        min-width: 0.3rem;
    }

    .arrow {
        position: absolute;
        right: 0.24rem;
        top: 50%;
        width: 0.22rem;
        height: 0.22rem;
        transform: translate(0, -50%);
    }

</style>
