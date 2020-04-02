// pages/news/news.js
import { Getnewsdetail,Getvideos } from '../../api/mendian.js';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH:"",
    info:{
      ContentImg:[]
    },
    index:0,
    height:0,
    current: 0,
    imgheights: [],
		current: 0,
		imgwidth: 750,
     condition:true
  },
  back_btn:function(){
    wx.navigateBack();
  },
  imageLoad: function(e) { //获取图片真实宽度
    var imgwidth = e.detail.width,
     imgheight = e.detail.height,
   //宽高比 
   ratio = imgwidth / imgheight; 
   //计算的高度值 
   var viewHeight = 750 / ratio;
   var imgheight = viewHeight
   var imgheights = this.data.imgheights
   //把每一张图片的高度记录到数组里 
   imgheights[e.target.dataset['index']] = imgheight;
   // 改了这里  赋值给当前index
    this.setData({
     imgheights: imgheights,
   })
 },
 
  Getnewsdetail:function(){
    Getnewsdetail({newsID:this.data.options.id}).then(res=>{
      console.log(res)
      this.setData({
        info: res.ReturnObject,
        
      })
    })
  },
  change:function(e){
    let index=e.detail.current;
    this.setData({
      index,
    })

    if (e.detail.source == 'touch') {
      this.setData({
        current: e.detail.current,

      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      options
    });
    if(this.data.options.NewsTypeID == 14){
      console.log("sdf")
      this.setData({
        condition:false
      })
    } 
  this.Getnewsdetail();
  

    this.setData({
      navH: app.globalData.navHeight
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})