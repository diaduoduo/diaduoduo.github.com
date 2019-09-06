<template>
    <div class="modal" v-show="showModal" @touchmove='noScroll'>
        <div class="mask" :class="{'fadeIn':showModal}" @click='close'></div>
        <div class="modal-container" :class="position">
            <div class="modal-title">{{title}}
                <div class="wrap-img" @click='close'>
                    <img src='../assets/images/icon_deta_close@2x.png' class="close"/>
                </div>
            </div>
            <div class='modal-content'>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "modal",
        data(){
            return{
                showModal:false
            }
        },
        props:{
            show:{
                type:Boolean,
                default:false
            },
            title:{
                type:String,
                default:''
            },
            position:{
                type:String,
                default:"center"
            },
            scroll:{
                type:Boolean,
                default:false
            }
        },
        methods:{
            noScroll:function (e) {
                if(!this.scroll){
                    e.stopPropagation()
                    e.preventDefault()
                }
            },
            close:function(){
                this.showModal=false;
                this.$emit("close",this.showModal);
            }
        },
        watch:{
            show:function (n,o) {
                this.showModal=n;
            }
        }
    }
</script>

<style scoped>
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        z-index: 12;
        animation: fadeIn 0.3s
    }
    @keyframes fadeIn{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }

    .modal-container {
        position: fixed;
        z-index: 13;
        max-height: 90%;
        padding: 0.59rem 0.3rem 0 0.3rem;
        overflow: hidden;
        background: #fff;
        display: flex;
        flex-direction: column;
        transition: all 0.3s;
    }

    .center {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0.2rem;
        width: 5.7rem;
        animation: move1 0.3s;
    }
    /* @keyframes move1{
      from{
        top:100%;
        transform: translate(-50%, -50%);
      }
      to{
        top:50%;
        transform: translate(-50%, -50%);
      }
    } */
    .bottom {
        bottom:0;
        left: 0;
        border-radius: 0.2rem 0.2rem 0px 0px;
        width: 100%;
        box-sizing: border-box;
        animation: move2 0.3s;
    }
    /* @keyframes move1{
      from{
        top:100%;
      }
      to{
        top:initial;
        bottom:0
      }
    } */


    .modal-title {
        padding-bottom: 0.29rem;
        border-bottom: 1px solid rgba(240, 240, 240, 1);
        font-size: 0.32rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(43, 43, 43, 1);
        line-height: 0.32rem;
        height: 0.32rem;
    }

    .modal-content {
        flex: 1;
        overflow: auto;
    }

    .wrap-img {
        float: right;
        height: 0.32rem;
        width: 0.4rem;
    }

    .close {
        float: right;
        width: 0.22rem;
        height: 0.22rem;
        margin-top: 0.05rem;
    }

</style>
