<template>
    <div class="play">
        <div class="mask"></div>
        <video :src="src" class="video" x5-video-player-type="h5" autoplay ref="video" webkit-playsinline controls x5-video-player-fullscreen="true" x5-video-orientation="landscape|portrait"></video>
    </div>
</template>

<script>
    export default {
        name: "play",
        data(){
            return{
                src:'',
                client:this.platform.platform
            }
        },
        created:function(){
            this.src=decodeURIComponent(this.$route.query.src);
        },
        mounted:function(){
            launchFullscreen(this.$refs.video);
            if(this.client=="weChat"){
                document.addEventListener("WeixinJSBridgeReady", ()=> {
                    this.$refs.video.play();
                }, false);
            }
        },
        methods:{
            back:function () {
               this.$router.go(-1)
            }
        }
    }
    function launchFullscreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
</script>

<style scoped>
    .back{
        position: fixed;
        z-index: 4;
        width: 0.5rem;
        height: 0.5rem;
        left:0.2rem;
        top:0.3rem;
        transform: rotate(180deg);
    }
    .mask{
        position: fixed;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background-color: #000;
    }
    .video{
        width: 100%;
        position: fixed;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
</style>
