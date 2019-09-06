<template>
    <div class="video2" id="video-vue">
        <video  class="video" :src="this.src" :poster="this.poster||this.posterImg"></video>
        <div class="cover">
            <img src="../assets/images/icon_play@2x.png" alt="" class="cover-play" @click="play">
        </div>
    </div>
</template>

<script>
    export default {
        name: "video2",
        data:function () {
            return{
                posterImg:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/img/婚纱摄影aa.png",
            }
        },
        props:["poster","src"],
        methods:{
            play:function () {
                this.platform.play(this.src,this.poster||this.posterImg)
            }
        }
    }
</script>
<style scoped>
    .cover-play{
        position: absolute;
        left:50%;
        top:50%;
        width: 1.1rem;
        height: 1.1rem;
        transform: translate(-50%,-50%);
    }
    .video2{
        position: relative;
    }
    .video{
        display: block;
        width: 100%;
    }
    .cover{
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
    }
</style>
