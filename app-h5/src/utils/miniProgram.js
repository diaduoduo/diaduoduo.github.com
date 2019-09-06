export default {
    platform:"miniProgram",
    login:function(){
        wx.miniProgram.navigateTo({url: '/pages/login/login?type=h5'})
    },
    createOrder:function (type,storeId,productId) {
        wx.miniProgram.navigateTo({url: '/pages/form/form?store='+type+"&shop="+storeId+"&product="+productId})
    },
    loadStores:function(){

    },
    chat:function () {
        window.location.href="./cs.html";
    }
}
