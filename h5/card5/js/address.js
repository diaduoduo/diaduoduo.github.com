(function ($){
        new Jdate({
            el: '#date-group1-5',
            format: 'YYYY-MM-DD hh:mm:ss',
            beginYear: 2000,
            endYear: 2100,
            trigger: "click", //是否为内部触发事件，默认为内部触发事件
        })
        $(".back_btns").click(function () {
            history.go(-1)
        })
        $("#date-group1-5").click(function () {
            $("#girlname").blur()
        })
        var addressId = helpClass.getQueryString("addressId");
        console.log(addressId)
        if (addressId === null) {
            console.log("新建")
            $(".save_bts").click(function () {
                if ($("#boyname").val() == "") {
                    alert("新郎姓名不能为空");
                    return false;
                }
                if ($("#girlname").val() == "") {
                    alert("新娘姓名不能为空");
                    return false;
                }
                if ($("#date-group1-5").val() == "") {
                    alert("时间不能为空");
                    $(this).focus();
                    return false;
                }
                if ($("#address").val() == "") {
                    alert("地址不能为空");
                    return false;
                }
                var id = helpClass.getQueryString("id");

                hosts({
                        url: "api/UseTemplateRecord/SaveUserTemplate",
                        type: "POST",
                        contentType: "application/json-patch+json",
                        data: {
                            "TemplateID": id * 1,
                            "GroomName": $("#boyname").val(),
                            "BridesName": $("#girlname").val(),
                            "WeddingTime": $("#date-group1-5").val(),
                            "WeddingAddress": $("#address").val(),
                            UseTemplateUrl: "/h5/card5/index.html?userTemplateID={id}"
                        }
                    },
                    function (res) {
                        console.log(res.ReturnObject);
                        if (res.ReturnCode == "0") {
                            console.log("保存成功");
                            window.location.href = "index.html?userTemplateID=" + res.ReturnObject;
                        }
                    })
            })
        } else {
             console.log("编辑")
        hosts({
                url: "api/UseTemplateRecord/GetTemplateDetail",
                data: {
                    ID: addressId
                }
            },
            function (res) {

                if (res.ReturnCode == "0") {
                    $("#boyname").val(res.ReturnObject.GroomName);
                    $("#girlname").val(res.ReturnObject.BridesName);
                    $("#date-group1-5").val(res.ReturnObject.WeddingTime);
                    $("#address").val(res.ReturnObject.WeddingAddress);
                }
            })
            $(".save_bts").click(function () {
                if ($("#boyname").val() == "") {
                    alert("新郎姓名不能为空");
                    return false;
                }
                if ($("#girlname").val() == "") {
                    alert("新娘姓名不能为空");
                    return false;
                }
                if ($("#date-group1-5").val() == "") {
                    alert("时间不能为空");
                    $(this).focus();
                    return false;
                }
                if ($("#address").val() == "") {
                    alert("地址不能为空");
                    return false;
                }
                //var id = helpClass.getQueryString("addressId");

                hosts({
                        url: "api/UseTemplateRecord/SaveUserTemplate",
                        type: "POST",
                        contentType: "application/json-patch+json",
                        data: {
                            ID: addressId,
                            "TemplateID": addressId * 1,
                            "GroomName": $("#boyname").val(),
                            "BridesName": $("#girlname").val(),
                            "WeddingTime": $("#date-group1-5").val(),
                            "WeddingAddress": $("#address").val(),
                            UseTemplateUrl: "/h5/card5/index.html?userTemplateID={id}"
                        }
                    },
                    function (res) {
                        console.log(res);
                        if (res.ReturnCode == "0") {
                            console.log("保存成功");
                            window.location.href = "index.html?userTemplateID=" + res.ReturnObject;
                        }
                    })
            })
        }


})($)