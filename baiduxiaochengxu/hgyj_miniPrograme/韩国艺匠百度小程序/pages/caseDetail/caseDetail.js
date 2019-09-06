// pages/caseDetail/caseDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphone: app.globalData.isIphone
  },
  close: function () {},
  getInfo: function () {
    app.apiRequest({
      url: "/api/OfficialCase/GetOfficialCaseDetail",
      baseUrl: 2,
      data: {
        officialID: this.data.options.ID
      },
      success: res => {
        if (res.ReturnObject) {
          this.setData({
            info: res.ReturnObject
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options
    });
    this.getInfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "韩国艺匠",
      page: "/pages/home/home",
      imageUrl: "/images/144.png"
    };
  }
});