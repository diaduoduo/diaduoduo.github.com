// components/bottom_btn/bottom_btn.js
const app=getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showTips:{
      type:Boolean,
      value:false
    },
    showModal:{
      type:Boolean,
      value:false
    },
    tel: {
      type: String,
      value: '',
      observer:function(v){
        this.setData({
          mobile:v
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    phone: app.globalData.phone,
    isIphone: app.globalData.isIphone
  },
  attached:function(){
    let mobile=wx.getStorageSync("mobile");
    if(mobile){
      this.setData({
        mobile
      })
    }
    this.getCoupon();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo: function (e) {
      let avatarUrl = '';
      let nickName='';
      if(e.detail.userInfo){
        avatarUrl = e.detail.userInfo.avatarUrl;
        nickName = e.detail.userInfo.nickName;
      }
      wx.login({
        success:res=>{
          app.apiRequest({
            url: "/api/SubscribeRecord/Subscribe",
            shopID: "MerchantShopID",
            baseUrl: 2,
            method: "POST",
            data: {
              "Mobile": this.data.mobile,
              "Nickname": nickName,
              "Avatar": avatarUrl,
              code:res.code
            },
            success: res => {
              if (res.ReturnCode == 0) {
                wx.showToast({
                  title: '预约成功',
                  icon: 'none'
                });
                wx.setStorageSync("mobile", this.data.mobile);
                this.toggleModal();
              }
            }
          })
        }
      })
    },
    input:function(e){
      let model=e.currentTarget.dataset.model;
      let value=e.detail.value;
      this.setData({
        [model]:value
      })
    },
    getCoupon: function () {
      app.apiRequest({
        url: "/api/Coupon/PostStoreCoupon",
        shopID: "storeId",
        baseUrl: 2,
        success: res => {
          if (res.ReturnObject) {
            this.setData({
              coupon: res.ReturnObject
            })
          }
        }
      })
    },
    close:function(){
      this.setData({
        showTips:false
      })
    },
    getPhoneNumber: function (e) {
      if (e.detail.iv && e.detail.encryptedData) {
        wx.login({
          success: res => {
            app.apiRequest({
              url: "/api/User/GetPhoneNumber",
              shopID: "shopCode",
              data: {
                code: res.code,
                iv: e.detail.iv,
                encryptedData: e.detail.encryptedData,
                type: 2
              },
              showTips: false,
              method: "POST",
              success: res => {
                if (res.ReturnCode == 0) {
                  this.setData({
                    mobile: res.ReturnObject.Phone||''
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
      this.toggleModal();
    },
    goH5:function(){
      wx.navigateTo({
        url: '/pages/h5/h5',
      })
    },
    toggleModal:function(){
      this.setData({
        showModal: !this.data.showModal
      });
      this.triggerEvent("contact",{
        showModal:this.data.showModal
      })
    },
    makePhoneCall:function(){
      wx.makePhoneCall({
        phoneNumber:"4000973855",
        success:res=>{

        }
      });
    }
  }
})