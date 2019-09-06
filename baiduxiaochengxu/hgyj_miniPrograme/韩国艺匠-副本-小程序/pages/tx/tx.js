// pages/tx/tx.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:0,
    value:'',
    PageIndex:1,
    total:0,
    tx:[]
  },
  setTab:function(e){
    let tab=e.currentTarget.dataset.tab;
    this.setData({
      tab,
      value: this.data.price[tab].Value
    });
    this.init();
  },
  getPrice:function(){
    app.apiRequest({
      url: "/api/Product/GetProductPrice",
      baseUrl: 2,
      success: res => {
        if (res.ReturnObject) {
          this.setData({
            price: res.ReturnObject
          });
        }
      }
    })
  },
  getList: function () {
    if (this.data.PageIndex !== 1 && this.data.tx.length === this.data.total) return
    app.apiRequest({
      url: "/api/Product/GetShopProduct",
      shopID: "MerchantShopID",
      data: {
        PageIndex: this.data.PageIndex,
        PageSize: 8,
        Price: this.data.value
      },
      baseUrl: 2,
      success: res => {
        if (res.ReturnObject) {
          this.setData({
            tx: this.data.tx.concat(res.ReturnObject.Items),
            total: res.ReturnObject.TotalItems
          });
          this.data.PageIndex++;
        }
      }
    })
  },
  init: function () {
    this.setData({
      PageIndex: 1,
      tx: [],
      total: 0
    });
    this.getList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options
    })
    this.getPrice();
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