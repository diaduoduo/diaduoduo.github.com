import Vue from 'vue'

function addZero(n) {
    return n>9?n:'0'+n
}
// function loadImg(name,n) {
//     let arr=[];
//     for(let k =0;k<n;k++){
//         arr.push(require("../assets/img/"+name.replace("{{}}",addZero(k+1))));
//     }
//     return arr;
// }
function loadImg(name,n) {
    let arr=[];
    for(let k =0;k<n;k++){
        arr.push("https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/"+name.replace("{{}}",addZero(k+1)));
    }
    return arr;
}
function loadImg2(name) {
    return "https://apptopgalleria2.oss-cn-shanghai.aliyuncs.com/img/"+name;
}

// Vue.prototype.$loadImg=loadImg;
Vue.prototype.$loadImg=loadImg;
Vue.prototype.$loadImg2=loadImg2;
