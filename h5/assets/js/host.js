var host = "https://openapi.studioartiz.com/";
//https://openapi.studioartiz.com/线上环境地址
// http://10.0.102.46:99/
function hosts(obj,fn) {
    var obj1　= {
        type: "GET",
        url: "", 
        contentType: "application/x-www-form-urlencoded",
        data: {},
        "AccessToken": localStorage.getItem("token"),
    }
    var objs = extend(obj1, obj)
    if (objs.contentType == "application/json-patch+json"){
        objs.data = JSON.stringify(objs.data)
    }
    $.ajax({
        url: host + objs.url,
        type: objs.type,
        data: objs.data,
        contentType: objs.contentType,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", objs.AccessToken);
        }, 
        success: function (res) {
            fn(res)
        }
    });
    
    
}
function extend(target, source) {
    for (var obj in source) {
        target[obj] = source[obj];
    }
    return target;
}