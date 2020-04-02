(function ($) {

 window.helpClass = window.helpClass || {};
 var helpClass = window.helpClass;
 //http://10.0.102.40:1000/diaduoduo.github.com/h5/
// http://10.0.102.46:1001/h5/ https://h5.studioartiz.com/h5/
    helpClass.prodUrl = "https://h5.studioartiz.com/h5/";
    helpClass.getQueryString = function (name) {
     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
     var r = window.location.search.substr(1).match(reg);
     if (r != null) {
         return unescape(r[2]);
     }
     return null;
 };

 window.h5Callback = function (data) {
     if (data.action === "uploadImg") {
         window.sessionStorage.setItem("imageUrl", data.imageUrl);
     }
 };

    var audio = document.querySelector("#audio");
    var icon_music = document.querySelector("#icon_music");
    audio.addEventListener("canplay", function () {
      icon_music.className = "icon-music rotate-music";
      audio.play();
    });
    icon_music.addEventListener("click", function () {
      console.log(audio.paused);
      if (audio.paused) {
        audio.play();
        icon_music.className = "icon-music rotate-music";
      } else {
        audio.pause();
        icon_music.className = "icon-music";
      }
    });



//JS绑定自动播放（操作window时，播放音乐）


// $(window).one('touchstart', function(){
//     audio.play();
// })
//  setTimeout(function () {
//       alert("sdf");
//     $(window).one('touchstart', function () {
//       audio.play();
//     });
//  }, 1000);


//微信下兼容处理
document.addEventListener("WeixinJSBridgeReady", function () {
    audio.play();
}, false);


})($);
