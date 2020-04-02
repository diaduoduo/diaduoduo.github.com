<template>
    <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide class="swiper-slide" v-for="(item,index) in swiperNumber">
            <div class="wrap-slide">
                <slot :name="'slot'+index"></slot>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script>
    export default {
        name: "swiper2",
        props:{
            width:{
                type:Number,
                default:200
            },
            swiperNumber:{
                type:Number
            }
        },
        data() {
            return {
                swiperContainer: [],
                swiperOption: {
                    spaceBetween: 9,
                    freeMode: true,
                    width: this.width
                }
            }
        },
    }
</script>

<style scoped>
    /*.swiper, .swiper-slide {*/
        /*touch-action: none;*/
    /*}*/
    .full{
        display: block;
        width: 100%;
    }
</style>
