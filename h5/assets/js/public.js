(function ($) {

 window.helpClass = window.helpClass || {};
 var helpClass = window.helpClass;
// http://10.0.102.46:1001/h5/
 helpClass.prodUrl = "http://10.0.102.46:1001/h5/";
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



})($);
