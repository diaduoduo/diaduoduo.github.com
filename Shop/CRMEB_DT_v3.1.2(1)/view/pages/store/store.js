// pages/store/store.js
import { Shopinfo, Area } from '../../api/mendian.js';

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH:"",
    shopinfo:[],
    shoplist:[],
    page: 1,
    limit: 10,
    loading: false,//是否加载中
    loadend: false,//是否加载完毕
    loadTitle: '加载更多',//提示语
    select: false,
    index: 0,//选择的下拉列表下标
    cityid:0,
    currentTab:0,
    status:0,
    distanctag:0,
    showNoTips:false,
    distance:false,
    latitude:0,
    longitude:0,
    merchantIDs:0,
    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    showmask:false

  },
  // 点击下拉显示框
  selectTap(e) {
    this.setData({
      select: !this.data.select,
      show:!this.data.show,
      showmask:!this.data.showmask,
      distance:false
    })
  },
  makePhoneCall:function(e){
    console.log(e)
    wx.makePhoneCall({
      phoneNumber:e.currentTarget.dataset.mobile,
      success:res=>{

      }
    });
  },
  // 点击城市
  optionTap(e) {
    console.log(e)
    
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
   
    var that = this;
    var F_Id = that.data.shoplist.SYSAreas[Index]["F_Id"];
    
    that.setData({
      index: Index,
      select: false,
      status:0,
      cityid:F_Id,
      currentLi:e.currentTarget.dataset.tab,
      show:!this.data.show,
      showmask:false

    });

    that.success();

  },
  success(){
    

       var that = this;
       console.log(that.data.merchantIDs);

       var merIDs=that.data.merchantIDs==0?'':that.data.merchantIDs;
       console.log(merIDs);
        var date={
          CityID: that.data.cityid??0,  
          Latitude: app.globalData.latitude,
          Longitude: app.globalData.longitude,
          MerchantIDs:merIDs
        }



        
      Area(
        date
        ).then(res => {
  
          if(res.ReturnCode==0){
     
            wx.hideLoading();
            that.setData({
              shopinfo: res.ReturnObject,
              showNoTips: res.ReturnObject!=null && res.ReturnObject.length === 0
            })
          }
        })
  },
//品牌切换
  Merchants(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    var merchantIDs = that.data.shoplist.Merchants[index]["ID"];
    wx.showLoading({ title: '加载中',mask:true });
    that.setData({
      currentTab:e.currentTarget.dataset.tab,
      merchantIDs:merchantIDs
    })
    that.success();
 
  },

  distance(e){
    var that = this;
    var merIDs=that.data.merchantIDs==0?'':that.data.merchantIDs;
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res)
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy;
        Area({Longitude: longitude,Latitude: latitude,MerchantIDs:merIDs}).then(res => {
          console.log(res)
          that.setData({
            shopinfo: res.ReturnObject,
            status:1,
            distance:true,
            distanctag:0,
            cityid:-1
          })
        }) 
        that.setData({
          select: false,
          showmask:false
          
        });
      }
     })
  },
  getShopinfo:function(){
    var that = this;
    if (that.data.loadend) return;
    if (that.data.loading) return;
    that.setData({ 
      // Merchants = res.ReturnObject.Merchants,
      loading: true, 
      loadTitle: "" 
      });
    Shopinfo({
      page: that.data.page,
      limit: that.data.limt,
    }).then(res =>{
      var list = res.ReturnObject.MerchantShopAreas || [];
      var loadend = list.length < that.data.limit;
      that.data.shopinfo = app.SplitArray(list, that.data.shopinfo);
      console.log(that.data.shopinfo)
      that.setData({
        shopinfo: that.data.shopinfo,
        loadend:loadend,
        loading: false,
        loadTitle: loadend ? "我也是有底线的" : '加载更多',
        page: that.data.page + 1,
      });
    }).catch(err =>{
      that.setData({
        loading:false,
        loadingTitle:"加载更多"
      })
    })
  },
  shoplist:function(){
    let that = this;
    Shopinfo().then(res => {
      console.log(res)
      that.setData({
        shoplist: res.ReturnObject
      })
    })
  },
  getLocation: function (e) {
    console.log(e)
    let address = e.currentTarget.dataset.address;
    let storename = e.currentTarget.dataset.storename;

    let latitude = parseFloat(e.currentTarget.dataset.latitude);

    let longitude = parseFloat(e.currentTarget.dataset.longitude);

    let lat = app.bMapTransQQMap(latitude,longitude)

    if (latitude && longitude) {
      wx.openLocation({
        latitude: lat.lng,//要去的纬度-地址
        longitude: lat.lat,//要去的经度-地址
        address: address,
        name: storename
      })
    } else {
      wx.showToast({
        title: '获取地址失败',
        icon: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options+"111")
    this.getShopinfo();
    this.shoplist();
    this.setData({
      navH: app.globalData.navHeight
    });
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res)
        app.globalData.latitude=res.latitude,
        app.globalData.longitude=res.longitude,
        wx.setStorageSync('latitude', app.globalData.latitude);
        wx.setStorageSync('longitude', app.globalData.longitude);
        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy;
        Area({Longitude: longitude,Latitude: latitude}).then(res => {
          console.log(res)
          that.setData({
            shopinfo: res.ReturnObject,
          })
        }) 
      }
     })
  
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