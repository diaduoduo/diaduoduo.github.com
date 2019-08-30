$(function(){
    var mySwiper = new Swiper(".swiper-container", {
        direction: "vertical",
        // autoplay:5000,
        mousewheelControl: true,
        speed: 1200,
        resistanceRatio: 0,
        onInit: function (swiper) {
            swiperAnimateCache(swiper);
            swiperAnimate(swiper);
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper);
        },
        onTransitionEnd: function (swiper) {
            swiperAnimate(swiper);
        },
        onTouchStart: function (s) { },
        onProgress: function (swiper) { },

        onSetTransition: function (swiper, speed) { }
    });
})