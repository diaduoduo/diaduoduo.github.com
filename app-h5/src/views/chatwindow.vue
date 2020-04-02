<template>
    <div class="range_content">

        <!-- <button @click="send">发消息</button> -->
        <ul class="chat-thread" id="chatRecord" ref="cont">
            <li>你好</li>

            <li v-for="(list,index) in list2" :key="index">{{list.question}}</li>
             <li v-show="ewm_pic" class="ewm_pic">
                <img width="100%" height="100%" src="../assets/images/1.jpg" alt="">
              </li>
        </ul>
        <div class="range_box">
            <ul class="range_list"  v-show="answer">

                <li v-show="show" class="sd_btn">请稍等</li>
                <template v-for="(list,infoindex) in info"  v-if='infoindex == answerid'>
                    <li v-for="(item,index) in list.answer" :key="index" @click="go(item,infoindex)">{{item.content}}
                    </li>
                </template>
            </ul>
            <div class="copy_box"  v-show="copy" @click="goGet()">
              长按复制：remenber625
              <a href="javascript:window.location.href='weixin://'" v-show="weixin" class="goweixin">去微信</a>
            </div>
        </div>
    </div>
</template>


<script>
   export default{
    data() {
        return {
          answer:true,
          ewm_pic:false,
            weixin:true,
            list3:[],
            list2:[],
            show:false,
            answerid:0,
            qid:0,
            questionid:0,
            copy:false,
            info:{},
            json:""
        }
    },
    methods: {
        
        getInfo :function(){

         
                var _this = this;
             
                _this.$get("https://vendor.studioartiz.com/ask/index",{}).then(function(res){
                 
                    if(res.errcode==0){
                        _this.info=res.data;
                        if(_this.info && _this.info.length > 0){

                          _this.list2[0]= {question:  _this.info[0].q};
                        }
                    }else{
                        _this.$toast(res.Message);
                    }
                });
        },     
        go:function(e,index){
            this.info.forEach((val,inx)=>{
             if(inx == index){
               this.list2.push({question:e.content});   
               this.list3.push({question:e.content,answer:val.q});
               if(val.isover == 1){
                 setTimeout(() => {
                   this.copy = true,
                   this.answer = false,
                   this.ewm_pic = true
                 }, 2000);
                var ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                  this.weixin = false;
                }
                  console.log(this.list3);
                  console.log(JSON.stringify(this.list3));
                this.$get("https://vendor.studioartiz.com/ask/save",{
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Accept': 'application/json'
                  },
                    params: {
                      data:JSON.stringify(this.list3)
                    },
                }).then(res=> {
                    if(res.errcode===0){
                        console.log(res.err_msg);
                    }else{
                        alert(res.err_msg);
                    }
                })
               }
                this.show= true;
                  setTimeout(() => {
                  this.show= false;
                  this.answerid = index +1;
                  this.list2.push({question:this.info[index + 1].q});
              }, 2000);
               
  
             }


            });



        }
     },
    created:function(){
        this.getInfo();

    },
    updated() {
      console.log(this.$refs.cont)
          let ele = document.getElementById('chatRecord');
          ele.scrollTop = ele.scrollHeight;
          this.$refs.cont.scrollTo=200

    },
}

</script>

<style scoped>
.chat-thread {
  padding: .2rem;
  list-style: none;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 600px;
  /* background: green; */
  padding-bottom: 100px;
  box-sizing: border-box
}

.chat-thread li {
  position: relative;
  clear: both;
  display: inline-block;
  padding: .3rem  0.5rem;
  margin: 0 0 20px 0;
  font: 16px/20px 'Noto Sans', sans-serif;
  border-radius: 10px;
  background-color: rgba(25, 147, 147, 0.2);
}

/* Chat - Avatar */
.chat-thread li:before {
  position: absolute;
  top: 0;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  content: '';
}

/* Chat - Speech Bubble Arrow */
.chat-thread li:after {
  position: absolute;
  top: 15px;
  content: '';
  width: 0;
  height: 0;
  border-top: 15px solid #9dc650;
}
.chat-thread li:nth-child(even):after,.chat-thread li.ewm_pic:after {
  position: absolute;
  top: 15px;
  content: '';
  width: 0;
  height: 0;
  border-top: 15px solid #fff;
}

.chat-thread li:nth-child(odd) {
  animation: show-chat-odd 0.15s 1 ease-in;
  -moz-animation: show-chat-odd 0.15s 1 ease-in;
  -webkit-animation: show-chat-odd 0.15s 1 ease-in;
  float: right;
  margin-right: 80px;
  color: #fff;
  background: #9dc650;
}

.chat-thread li:nth-child(odd):before {
  right: -80px;
  background-image: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBoRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAExAAIAAAASAAAATgAAAAAAAABgAAAAAQAAAGAAAAABUGFpbnQuTkVUIHYzLjUuMTAA/9sAQwAHBQUGBQQHBgUGCAcHCAoRCwoJCQoVDxAMERgVGhkYFRgXGx4nIRsdJR0XGCIuIiUoKSssKxogLzMvKjInKisq/9sAQwEHCAgKCQoUCwsUKhwYHCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioq/8AAEQgAMgAyAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A8wre0/w55qLLqM62ysMrEWAdh+PSl8M6fFLMbu5K7YziNT3b1/CqniRLq98UA2SlhHGobnA55FdbajHmZwxTnLlRtm78NabDGhs/tEwchmVfMGD0znvn0pqahoN3fCH+z0RcHcWiKY4745/KuUVtTtdSFtJCvmxHmN+317Gp5dTthGZXUSXPJJVsh1PUH1rP2rZt7GKOi1LwxHIv2jRg20jPks4b64b+h/OuZZWRyrqVZTggjBBrZ0PWftFwkA8xImTpu7gVJr1kpX7UhzJ0cZ5I9a0umtDJxcWYVFFFBJ1WlKkOmQASYyoYjZnk81aukuLHTP7YFtDeW6zJEFmyu4555H8PQemaz9NmR9PhO45C7T+HFa1rrk9iwSZ3vLJU+WyaVUCsDncMjJI64H41riYRVHmS7E4KbliOWT7nPePtPvbm8j1trWSyF3GpkgkYEbl4BBHTjHBrn49GkfRLnUpn2tBgtFj76k4GD/e749K63xb4gtdTtp4LeRismGVyOmDnpWBq2pXd74ZsdPjG2GCTdHDEnzSN/ebHLH+VeXBuyR7E4wu35EXhKKObVCRnMKMwY+hwAPz5rrJ7bzYXTfu3Ag5yKwfC+nNZvcPPJHvdQDGnJjOehPTPsOlb0zLFA8m/hVJ/SvXo0oundnhV6slU5UcjRRRXPY3Luk3giYwSHCscqfetfULXOlR3TXIhZ2ZYfLILHHDkjsO3PJPSuXqeC5aPzd5ZjIQdxOcEDFa+0fJyEKmvac5myyQWJlRZnkkTHytjoeuPepLaa9vi4ib7LbOMyFG5KjtnrVMabPd30gcrCjMSZGPQf1NbF0i29pHBAUlbABVT8pPqSOwrljDW53c+lrl/RWxvymyDAWPjsPSpdVnVF8iNsk8tz0HpVFLloowEYvJjBkIwB7AdhUGSxJJyT1JrpU2o8py1IwlJS6hRS0VAiKiiikUKKUUUUxC0ooooAKKKKQH/2Q==);
}

.chat-thread li:nth-child(odd):after {
  border-right: 15px solid transparent;
  right: -15px;
}

.chat-thread li:nth-child(even),.chat-thread li.ewm_pic {
  animation: show-chat-even 0.15s 1 ease-in;
  -moz-animation: show-chat-even 0.15s 1 ease-in;
  -webkit-animation: show-chat-even 0.15s 1 ease-in;
  float: left;
  margin-left: 80px;
  background: white;
  color: #000;
}

.chat-thread li:nth-child(even):before,.chat-thread li.ewm_pic:before {
  left: -80px;
  background-image: url(data:image/jpeg;base64,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);
}

.chat-thread li:nth-child(even):after,.chat-thread li.ewm_pic:after {
  border-left: 15px solid transparent;
  left: -15px;
}

.chat-window {
  position: fixed;
  bottom: 18px;
}

.chat-window-message {
  width: 100%;
  height: 48px;
  font: 32px/48px 'Noto Sans', sans-serif;
  background: none;
  color: #0AD5C1;
  border: 0;
  border-bottom: 1px solid rgba(25, 147, 147, 0.2);
  outline: none;
}

    .range_content{
        background:#e7e5e0;
        height: 100vh;
        padding-bottom: 1.2rem;
        box-sizing: border-box

    }
   .range_box{
       height: 1.2rem;
       background: #fff;
       position: fixed;
       bottom:0;
       right:0;
       left: 0;
       overflow: hidden;
   } 
   .range_list{
       display: flex;
        margin-left:10px;
        overflow: hidden;
        margin-top:10px;
   }
   .range_list li{
       flex:1;
       background: #9dc650;
       height: .78rem;
       line-height: .78rem;
       border-radius: .08rem;
       margin-right:10px;
       text-align: center;
       color: white;
       font-size:.3rem;
   }
   .range_list li.sd_btn{
    flex: 1;
    background: #9dc650;
    height: .81rem;
    line-height: .81rem;
    border-radius: .08rem;
    margin-right: 10px;
    text-align: center;
    color: white;
    font-size: .3rem;
    position: absolute;
    left: 10px;
    top:5px;
    width: 96%;
    height: 0.9rem;
}
.copy_box{
      -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background: #f9f6ef;
    height: .81rem;
    line-height: .81rem;
    border-radius: .08rem;
    margin-right: 10px;
    text-align: center;
    color: #333;
    font-size: .3rem;
    position: absolute;
    left: 10px;
    top: 5px;
    width: 96%;
    height: 0.9rem;
    z-index: 9;
}
.goweixin{
background: #f00;
    border-radius: 10px;
    color: white;
    padding: 0px 15px;
    margin-left: .5rem;
    display: inline-block;
    text-decoration: none;
    box-sizing: border-box;
    
-webkit-user-select: text ;  /* Chrome all / Safari all /opera15+*/  
-moz-user-select: text ;     /* Firefox all */  
-ms-user-select: text ;      /* IE 10+ */  
user-select: text ; 
}
</style>