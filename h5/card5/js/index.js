(function($){
    var userTemplateID = helpClass.getQueryString("userTemplateID");
    var previewid = helpClass.getQueryString("previewid");
    var shareid = helpClass.getQueryString("shareid");
    console.log(previewid + "+++++++++" + shareid)
    if (userTemplateID == null && previewid === null && shareid === null) {
        console.log(userTemplateID+"111111");
        var id = helpClass.getQueryString("id");
        var token = helpClass.getQueryString("token");
        localStorage.setItem("token", token);
        $(document).on("touchstart", ".back_btns", function () {
            obj.finish()
        });
            hosts({
                    url: "api/HappinessTemplate/GetTemplateDetail",
                    data: {
                        ID: id
                    }
                },
                function (res) {
                    console.log(res)
                    document.title = res.ReturnObject.Title;
                    $('.music_src').attr('src', res.ReturnObject.MusicUrl);
                    $(".men_name").html(res.ReturnObject.GroomName);
                    $(".gril_name").html(res.ReturnObject.BridesName);
                    $(".WeddingTime").html(res.ReturnObject.WeddingTime);
                    $(".WeddingAddress").html(res.ReturnObject.WeddingAddress);
                    $("[custom-type-img]").each(function () {
                        var imgnum = $(this).attr("custom-type-img");
                        var attach = res.ReturnObject.SYSAttachs.find(function (item) {
                            return item.CustomType == imgnum;
                        });
                        if (attach) $(this).attr("src", attach.FilePath);
                    });
                    $("[custom-type-font]").each(function () {
                        console.log(this);
                        var fontnum = $(this).attr("custom-type-font");
                        var contents = res.ReturnObject.TemplateContents.find(function (item) {
                            return item.CustomType == fontnum;
                        });
                        if (contents) {
                            $(this).html(contents.Content);
                        }
                    });
                    $(".start_btns").click(function () {
                        window.location.href = "address.html?id=" + res.ReturnObject.ID + "&MusicLibraryID=" + res.ReturnObject.MusicLibraryID;
                    });
                }
            )
    } else if (userTemplateID && previewid === null && shareid === null) {
         console.log(userTemplateID + "2222");
        $("body").removeClass("state");
        $(".start_btns").hide()
        var btnimage = undefined;
        var content = "";
        var title = "";
        $(document).on("touchstart", ".back_btns", function () {
            obj.finish()
        });
        hosts({
                url: "api/UseTemplateRecord/GetTemplateDetail",
                data: {
                    ID: userTemplateID
                }
            },
            function (res) {
                console.log(res);
                $('.music_src').attr('src', res.ReturnObject.MusicUrl);
                $(".men_name").html(res.ReturnObject.GroomName);
                $(".girl_name").html(res.ReturnObject.BridesName);
                $(".WeddingTime").html(res.ReturnObject.WeddingTime);
                $(".WeddingAddress").html(res.ReturnObject.WeddingAddress);
                
                var showtime = res.ReturnObject.WeddingTime.substring(0, 10);
                content = "我们将在" + showtime + "举行婚礼诚挚邀请您的到来";
                title = res.ReturnObject.GroomName + "&" + res.ReturnObject.BridesName + "的婚礼邀请";


                $("[custom-type-img]").each(function () {
                    var imgnum = $(this).attr("custom-type-img");
                    var attach = res.ReturnObject.SYSAttachs.find(function (item) {
                        return item.CustomType == imgnum;
                    });
                    if (attach) $(this).attr("src", attach.FilePath);
                });

                $("[custom-type-font]").each(function () {
                    console.log(this);
                    var fontnum = $(this).attr("custom-type-font");
                    var contents = res.ReturnObject.TemplateContents.find(function (item) {
                        return item.CustomType == fontnum;
                    });
                    console.log(contents);

                    if (contents) {
                        $(this).html(contents.Content);
                    }
                });

                $(".photo_btn").click(function () {
                    btnimage = $(this).next();
                    console.log(btnimage)
                    var ratio = btnimage.attr("ratio");
                    var pose = btnimage.attr("custom-type-img");
                    var id = res.ReturnObject.ID;
                    // console.log(ratio + "====" + pose + "==="+id)

                    obj.uploadImg(res.ReturnObject.ID, ratio, pose);
                })
                $(document).on("click", ".set_icon", function () {
                    window.location.href = "address.html?addressId=" + res.ReturnObject.ID + "&MusicLibraryID=" + res.ReturnObject.MusicLibraryID;
                });

            }
        );
        //预览
      $(document).on("click", ".preview_icon", function () {
          var url = helpClass.prodUrl + "card5/index.html?previewid=" + userTemplateID;
          var shareurl = helpClass.prodUrl + "card5/index.html?shareid=" + userTemplateID;
          console.log(url)
          console.log(shareurl)
          var audio = document.querySelector("#audio");
           audio.pause();
           $(".icon-music").removeClass("rotate-music");
        obj.preview(title, content, url, shareurl)
      });
      // 编辑文字
        $.fn.autoHeight = function () {
            function autoHeight(elem) {
                elem.style.height = "auto";
                elem.scrollTop = 0; //防抖动
                elem.style.height = elem.scrollHeight + "px";
            }
            this.each(function () {
                autoHeight(this);
                $(this).on("keyup", function () {
                    autoHeight(this);
                });
            });
        };
        var fonttype = undefined;
        $(".click_btn").click(function (e) {
            fonttype = $(this).find(".html");
            var font = fonttype.attr("custom-type-font");
            var gethtml = $(this).find(".html").text();
            $(".form_box").show();
            $(".textarea_box").focus();
            $(".textarea_box").val(gethtml);
            $("textarea[autoHeight]").autoHeight();
        });
        $(".sure_btns").click(function () {
            var font = fonttype.attr("custom-type-font");
            var value = $(".textarea_box").val().replace(/\s+/g, "");
            hosts({
                    url: "api/UseTemplateRecord/AddTemplateContent",
                    type: "POST",
                    contentType: "application/json-patch+json",
                    data: {
                        "UseTemplateID": userTemplateID * 1,
                        "CustomType": font,
                        "Content": value,
                    }
                },
                function (res) {
                    console.log(res)
                    if (res.ReturnCode == "0") {
                        console.log("保存成功");
                        fonttype.html(value);
                        $(".form_box").hide();
                    }
                })
        });
        //发送
        $(".sending_btns").click(function () {
            hosts({
                    type: "POST",
                    contentType: "application/json-patch+json",
                    url: "api/UseTemplateRecord/UserTemplateSubmit",
                    data: {
                        UserTemplateID: userTemplateID * 1
                    }
                },
                function (res) {
                    console.log(res);
                    var url = helpClass.prodUrl + "card5/index.html?shareid=" + userTemplateID;
                    // console.log(content)
                     console.log(url)
                    // console.log(title)
                    obj.invite(title, content, url)

                }
            );
        })

      window.h5Callback = function (data) {
          if (data.action === "uploadImg") {
              //alert(data.imageUrl);
              if (btnimage)
                  btnimage.attr("src", data.imageUrl)
          }
      };
    } else if (previewid && userTemplateID == null && shareid === null) {
        console.log(previewid + "3333");
        $(".start_btns").hide();
        $(".top_box").hide();
        hosts({
                url: "api/UseTemplateRecord/GetTemplateDetail",
                data: {
                    ID: previewid
                }
            },
            function (res) {
                console.log(res.ReturnObject);
                document.title = res.ReturnObject.GroomName + "&" + res.ReturnObject.BridesName + "的婚礼邀请";
                $('.music_src').attr('src', res.ReturnObject.MusicUrl);
                $(".men_name").html(res.ReturnObject.GroomName);
                $(".girl_name").html(res.ReturnObject.BridesName);
                $(".WeddingTime").html(res.ReturnObject.WeddingTime);
                $(".WeddingAddress").html(res.ReturnObject.WeddingAddress);
                $("[custom-type-img]").each(function () {
                    var imgnum = $(this).attr("custom-type-img");
                    var attach = res.ReturnObject.SYSAttachs.find(function (item) {
                        return item.CustomType == imgnum;
                    });
                    if (attach) $(this).attr("src", attach.FilePath);
                });

                $("[custom-type-font]").each(function () {
                    //console.log(this);
                    var fontnum = $(this).attr("custom-type-font");
                    var contents = res.ReturnObject.TemplateContents.find(function (item) {
                        return item.CustomType == fontnum;
                    });
                    //console.log(contents);

                    if (contents) {
                        $(this).html(contents.Content);
                    }
                });
            }
        );
    } else if (shareid && userTemplateID == null) {

       console.log(shareid + "44444");
        $(".start_btns").hide();
        $(".top_box").hide();
        $(".link_box").show();
        $("#mobile").blur(function () {
            document.body.scrollTop = 0;
        })
        hosts({
                url: "api/UseTemplateRecord/GetTemplateDetail",
                data: {
                    ID: shareid
                }
            },
            function (res) {
                console.log(res.ReturnObject);
                document.title = res.ReturnObject.GroomName + "&" + res.ReturnObject.BridesName + "的婚礼邀请";
                $('.music_src').attr('src', res.ReturnObject.MusicUrl);
                $(".men_name").html(res.ReturnObject.GroomName);
                $(".girl_name").html(res.ReturnObject.BridesName);
                $(".WeddingTime").html(res.ReturnObject.WeddingTime);
                $(".WeddingAddress").html(res.ReturnObject.WeddingAddress);
                $("[custom-type-img]").each(function () {
                    var imgnum = $(this).attr("custom-type-img");
                    var attach = res.ReturnObject.SYSAttachs.find(function (item) {
                        return item.CustomType == imgnum;
                    });
                    if (attach) $(this).attr("src", attach.FilePath);
                });

                $("[custom-type-font]").each(function () {
                    //console.log(this);
                    var fontnum = $(this).attr("custom-type-font");
                    var contents = res.ReturnObject.TemplateContents.find(function (item) {
                        return item.CustomType == fontnum;
                    });
                    //console.log(contents);

                    if (contents) {
                        $(this).html(contents.Content);
                    }
                });
            }
        );

      $(".take_btns").click(function () {
          if ($("#name").val() == "") {
              alert("姓名不能为空");
              return false;
          }
          if ($("#mobile").val() == "") {
              alert("请填写手机号码！");
              $("#mobile").focus();
              return false;
          }
          var partten = /^1[3,5,8]\d{9}$/;
          if (!partten.test($("#mobile").val())) {
              alert("手机号码格式不正确！");
              $("#mobile").focus();
              return false;
          }
          hosts({
                  url: "api/UseTemplateRecord/ShootRecordSubmit",
                  type: "POST",
                  contentType: "application/json-patch+json",
                  data: {
                      "Name": $("#name").val(),
                      "Mobile": $("#mobile").val(),
                  }
              },
              function (res) {
                  if (res.ReturnCode == "0") {
                      $(".submit_succss").show();
                      setTimeout(function () { //定时器 
                              $(".submit_succss").css("display", "none"); //将图片的display属性设置为none
                          },
                          2000);
                      console.log("提交成功！");
                      //alert("提交成功！")
                      $("#name").val("");
                      $("#mobile").val("");
                  }
              })

      })
            document.body.addEventListener('focusout', () => {
                // 回到原点  若觉得一瞬间回到底部不够炫酷，那自己可以自定义缓慢回弹效果， 可用css 、贝塞尔曲线、js的 requestAnimationFrame  等等 方法 实现体验性更好的回弹效果
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
            })
    }

   
})($)