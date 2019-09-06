// pages/comment/comment.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    total: 0,
    comment: []
  },
  getComment: function () {
    if (this.data.page !== 1 && this.data.comment.length === this.data.total||this.data.page>30) return
    app.apiRequest({
      url: "https://job.kylinteam.cn/api/DianPingData/GetStoreEvaluationByApp",
      method: "POST",
      data: {
        "length": 10,
        "start": (10 * (this.data.page - 1)),//页数
        "sidx": "UserSubmitTime",
        "sort": "desc",
        "recordsFiltered": 0,
        "TotaPage": 10,
        "ParameterJson": '[{"paramName":"a.State","paramValue":"1","Operation":"Equal"}]'
      },
      success: res => {
        this.setData({
          comment: this.data.comment.concat(res.data),
          total: res.recordsFiltered
        });
        this.data.page++;
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getComment();
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getComment();
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