// pages/case/case.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    PageIndex: 1,
    total:0,
    list:[]
  },
  viewDetail: function (e) {
    let item2 = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/caseDetail/caseDetail?ID=' + item2.ID,
    })
  },
  getList: function() {
    if(this.data.PageIndex!==1&&this.data.list.length===this.data.total)return
    app.apiRequest({
      url: "/api/OfficialCase/GetOfficialCaseList",
      shopID: "MerchantShopID",
      baseUrl: 2,
      data: {
        TypeCode: this.data.options.TypeCode,
        PageIndex: this.data.PageIndex,
        PageSize: 10
      },
      success: res => {
        if (res.ReturnObject) {
          this.setData({
            list: this.data.list.concat(res.ReturnObject.Items),
            total: res.ReturnObject.TotalItems
          });
          this.data.PageIndex++;
        }
      }
    })
  },
  init: function() {
    this.setData({
      PageIndex: 1,
      list: [],
      total:0
    });
    this.getList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options
    });
    this.init();
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
    this.init();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getList();
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