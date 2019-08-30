var obj ={
    createOrder:function (type,storeId,productId) {
        var data = {
            action: "createOrder",
            args:{
                storeId: storeId,
                jumpType: type,
                productId:productId
            }
        }
        invoke(data);
    },
    loadStores:function (type) {
        let data = {
            action: "loadStores",
            args:{
                jumpType: type
            }
        }
        invoke(data);
    },
    play:function (src,poster) {
        let data = {
            action: "play",
            args:{
                src: src,
                poster:poster
            }
        }
        invoke(data);
    },
    storeDetail:function (item,type,productId) {
        let data = {
            action: "storeDetail",
            args:{
                "storeId": item.ID,
                "jumpType": type,
                'storeStyle':item.StoreStyle,
                productId:productId
            }
        };
        invoke(data)
    },
    productDetail:function (item) {
        let data = {
            action: "productDetail",
            args:{
                "productId": item.ID
            }
        };
        invoke(data)
    },
    chat:function () {
        let data = {
            action: "imChat",
            args:{}
        };
        invoke(data)
    },
    getVersion:function () {
        invoke({
            action:"getVersion"
        });
    },
    collectNews:function () {
        invoke({
            action:"collectNews"
        });
    },
    login:function () {
        invoke({
            action:"login"
        });
    },
    pay2: function (obj) {
        var data = {
            action: "pay2",
            args: obj
        };
        invoke(data);
    },
    uploadImg: function (UserTemplateID, ratio, PoseImg) {
        var data = {
            action: "uploadImg",
            args: {
                UserTemplateID: UserTemplateID,
                ratio: ratio,
                PoseImg: PoseImg
            }
        }
        invoke(data);
    },
    preview: function (title, content, url,shareurl) {
        var data = {
            action: "preview",
            args: {
                title: title,
                content: content,
                url: url,
                shareurl: shareurl
            }
        }
        invoke(data);
    },
    invite: function (title, content, url) {
        var data = {
            action: "invite",
            args: {
                title: title,
                content: content,
                url: url
            }
        };
        invoke(data);
    },
    finish: function () {
        var data = {
            action: "finish"
        }
        invoke(data);
    },
}

//h5调用原生
function invoke(data) {
    window.location.href = "galleria-app//protocol:" + JSON.stringify(data);
}


