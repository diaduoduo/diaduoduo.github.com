// pages/home/home.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showContact:false,
    isIphone: app.globalData.isIphone,
    comment:{
      data:[],
      recordsFiltered:0
    },
    showTelBtn:true,
    mobile:''
  },
  go:function(e){
    let item = e.currentTarget.dataset.item;
    if (item.Link && item.Link!=='#'){
      wx.navigateTo({
        url: item.Link,
      })
    }
  },
  viewDiscount:function(e){
    this.setData({
      showContact:!this.data.showContact
    })
  },
  getPhoneNumber:function(e){
    this.setData({
      showTelBtn:false
    });
    
    if (e.detail.iv && e.detail.encryptedData) {
      wx.login({
        success: res => {
          app.apiRequest({
            url: "/api/User/GetPhoneNumber",
            shopID:"shopCode",
            data: {
              code: res.code,
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
              type: 2,
            },
            method: "POST",
            showTips: false,
            success: res2 => {
              if (res2.ReturnCode == 0) {
                this.setData({
                  mobile: res2.ReturnObject.Phone || ''
                });
                wx.login({
                  success:res3=>{
                    app.apiRequest({
                      url: "/api/SubscribeRecord/Subscribe",
                      shopID: "MerchantShopID",
                      data: {
                        code:res3.code,
                        Mobile: res2.ReturnObject.Phone
                      },
                      method: "POST",
                      showTips: false,
                      success: res4 => {
                        if (res4.ReturnCode == 0){

                        }else{

                        }
                      }
                    })
                  }
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: res.Message,
                })
              }
            }
          })
        }
      })
    }
  },
  viewMore: function(e) {
    let module = e.currentTarget.dataset.module;
    if (module == "comment") {
      wx.navigateTo({
        url: '/pages/comment/comment'
      })
    } else if (module == "tx") {
      wx.navigateTo({
        url: '/pages/tx/tx'
      })
    }else{
      wx.navigateTo({
        url: '/pages/case/case?TypeCode='+module
      })
    }
  },
  goDetail:function(e){
    let item2=e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/caseDetail/caseDetail?ID='+item2.ID,
    })
  },
  getInfo:function(){
    app.apiRequest({
      url:"api/MerchantShop/GetMerchantShop",
      data:{},
      success:res=>{
        if (res.ReturnObject){
          let arr=[];
          res.ReturnObject.Products.forEach(val=>{
            if (val.ProductTypeID===20){
              arr.push(val)
            }
          })
          this.setData({
            info: res.ReturnObject,
            tx:arr
          })
        }
      }
    })
  },
  getComment:function(){
    app.apiRequest({
      url:"https://job.kylinteam.cn/api/DianPingData/GetStoreEvaluationByApp",
      method:"POST",
      data: {
        "length": 4,
        "start": 0,//页数
        "sidx": "UserSubmitTime",
        "sort": "desc",
        "recordsFiltered": 0,
        "TotaPage": 10,
        "ParameterJson": '[{"paramName":"a.State","paramValue":"1","Operation":"Equal"}]'
      },
      success:res=>{
        console.log(res);
          this.setData({
            comment:res
          })
      }
    })
  },
  getCoupon:function(){
    app.apiRequest({
      url: "/api/Coupon/PostStoreCoupon",
      shopID: "storeId",
      baseUrl:2,
      success: res => {
        if (res.ReturnObject) {
          this.setData({
            coupon: res.ReturnObject
          })
        }
      }
    })
  },
  getCase: function () {
    app.apiRequest({
      url: "/api/OfficialCase/GetAllOfficialCase",
      baseUrl: 2,
      success: res => {
        if (res.ReturnObject) {
          this.setData({
            case: res.ReturnObject
          })
        }
      }
    })
  },
  checkBind:function(){
    wx.login({
      success:res=>{
        app.apiRequest({
          url:"/api/SubscribeRecord/GetOpenIDBinding",
          method:"POST",
          shopID: "MerchantShopID",
          data:{
            code:res.code,
            type:2
          },
          showTips:false,
          success:res=>{
            if (res.ReturnCode===0){
              this.setData({
                showTelBtn:false
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getInfo();
    this.getCoupon();
    this.getCase();
    this.getComment();
    this.checkBind();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getInfo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "韩国艺匠",
      page: "/pages/home/home",
      imageUrl: "/images/144.png"
    }
  }
})