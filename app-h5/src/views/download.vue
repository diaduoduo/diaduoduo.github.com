<template>
    <div class="download">
        <img :src="select.src" alt="" class="full">
        <div class="wrap-img">
            <a href="javascript:void(0)" @click="showModal=!showModal" v-if="platform==='weChat'">
                <img src="../assets/images/android@2x.png" alt="" class="download-btn">
            </a>
            <a v-else download="韩国艺匠婚尚" href="https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/APK/app-release_120_4_%E5%8D%8E%E4%B8%BA_sign.apk">
                <img src="../assets/images/android@2x.png" alt="" class="download-btn">
            </a>
            <a href="itms-apps://itunes.apple.com/cn/app/id1470347984?mt=8">
                <img src="../assets/images/ios@2x.png" alt="" class="download-btn">
            </a>
        </div>
        <div class="modal" v-show="showModal">
            <div class="mask" @click="showModal=!showModal"></div>
            <div class="content">
                <div class="tips" style="font-size: 0.38rem">链接打不开？</div>
                <div class="tips2">请点击右上角···</div>
                <div class="tips2">选择在浏览器中打开</div>
                <img src="../assets/images/line_share@2x.png" alt="" class="gou">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "download",
        data(){
            return{
                platform:'',
                showModal:false,
                img:[
                    {
                        scale:0.75,
                        src:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/APK/7.31/750x1000-.jpg"
                    },
                    {
                        scale:0.625,
                        src:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/APK/7.31/750x1200.jpg"
                    },
                    {
                        scale:0.562,
                        src:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/APK/7.31/750x1334-.jpg"
                    },
                    {
                        scale:0.5,
                        src:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/APK/7.31/750x1500.jpg"
                    },
                    {
                        scale:0.4618,
                        src:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/APK/7.31/750x1624.jpg"
                    },
                    {
                        scale:0.7995,
                        src:"https://apptopgalleria.oss-cn-shanghai.aliyuncs.com/APK/7.31/750x938.jpg"
                    }
                ],
                select:{}
            }
        },
        created() {
            this.platform=(navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1)?'weChat':'browser';
            let width=window.innerWidth;
            let height=window.innerHeight;
            let scale=width/height;
            let min=Math.abs(scale-this.img[0].scale);
            let n=0;
            this.img.forEach((val,index)=>{
                if(Math.abs(scale-val.scale)<min){
                    min=Math.abs(scale-val.scale);
                    n=index;
                }
            });
            this.select=this.img[n];
        }
    }
</script>
<style>
    html,body,#app,.download{
        height: 100%;
        overflow: hidden;
    }
</style>
<style scoped>
    .gou{
        position: absolute;
        top: 0.1rem;
        right: 0.2rem;
        width: 1.68rem;
        height: 1.68rem;
    }
    .content div{
        padding-left: 2.9rem;
    }
    .content{
        position: fixed;
        top:0.1rem;
        left:0.2rem;
        width: 7.1rem;
        background:rgba(255,255,255,1);
        border-radius: 0.1rem;
        padding-top: 1rem;
        padding-bottom: 0.2rem;
    }
    .mask{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
    }
    .wrap-img{
        position: fixed;
        bottom: 0.53rem;
        left:0;
        width: 100%;
        padding: 0 0.57rem;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
    }
    .download-btn{
        display: block;
        width: 2.3rem;
        height: 0.8rem;
    }
</style>
