import { getCombinationDetail } from '../../../api/activity.js';
import { postCartAdd, collectAdd, collectDel } from '../../../api/store.js';
import wxh from '../../../utils/wxh.js';
import wxParse from '../../../wxParse/wxParse.js';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '商品详情'
    },
    userInfo:{},
    itemNew: [],
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    attribute: {
      'cartAttr': false
    },
    productSelect: [],
    productAttr: [],
    productValue: [],
    isOpen: false,
    attr: '请选择',
    attrValue: '',
    AllIndex:2,
    replyChance:'',
    limitNum: 1,
    timeer:null,
    iSplus:false,
    navH: "",
    navList: ['商品', '评价', '详情'],
    opacity: 0,
    scrollY: 0,
    topArr: [],
    toView: '',
    height: 0,
    heightArr: [],
    lock: false,
  },
  returns: function () {
    wx.navigateBack();
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    // if (!this.data.good_list.length && id == "past2") {
    //   id = "past3"
    // }
    this.setData({
      toView: id,
      navActive: index,
      lock: true
    });
  },
  scroll: function (e) {
    var that = this, scrollY = e.detail.scrollTop;
    var opacity = scrollY / 200;
    opacity = opacity > 1 ? 1 : opacity;
    that.setData({
      opacity: opacity,
      scrollY: scrollY
    })
    if (that.data.lock) {
      that.setData({
        lock: false
      })
      return;
    }
    for (var i = 0; i < that.data.topArr.length; i++) {
      if (scrollY < that.data.topArr[i] + that.data.heightArr[i]) {
        that.setData({
          navActive: i
        });
        break
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      navH: app.globalData.navHeight
    });
    //设置商品列表高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          height: (res.windowHeight) * (750 / res.windowWidth) - 98 - that.data.navH
          //res.windowHeight:获取整个窗口高度为px，*2为rpx；98为头部占据的高度；
        })
      },
    });
    if (options.hasOwnProperty('id')) {
      this.setData({ id: options.id });
      app.globalData.openPages = '/pages/activity/goods_combination_details/index?id=' + this.data.id + '&spid=' + this.data.userInfo.uid;
    } else {
      app.Tips({
        title: '参数错误',
        icon: 'none',
        duration: 1000,
        mask: true,
      },{tab:3,url:1});
    };
  },
  infoScroll: function () {
    var that = this, topArr = [], heightArr = [];
    for (var i = 0; i < that.data.navList.length; i++) { //productList
      //获取元素所在位置
      var query = wx.createSelectorQuery().in(this);
      var idView = "#past" + i;
      // if (!that.data.good_list.length && i == 2) {
      //   var idView = "#past" + 3;
      // }
      query.select(idView).boundingClientRect();
      query.exec(function (res) {
        var top = res[0].top;
        var height = res[0].height;
        topArr.push(top);
        heightArr.push(height);
        that.setData({
          topArr: topArr,
          heightArr: heightArr
        });
      });
    };
  },
   /**
   * 默认选中属性
   * 
  */
  DefaultSelect: function () {
  var productAttr = this.data.productAttr, storeInfo = this.data.storeInfo, productValue = this.data.productValue, value = [];
  for (var key in productValue) {
    if (productValue[key].quota > 0 && productValue[key].product_stock > 0 ) {
      value = this.data.productAttr.length ? key.split(",") : [];
      break;
    }
  }
  for (var i = 0, len = productAttr.length; i < len; i++) {
    if (productAttr[i].attr_value[0]) productAttr[i].checked = value[i];
  }
  var productSelect = this.data.productValue[value.sort().join(',')];
  if (productSelect) {
    this.setData({
      ["productSelect.store_name"]: storeInfo.store_name,
      ["productSelect.image"]: productSelect.image,
      ["productSelect.price"]: productSelect.price,
      ["productSelect.quota"]: productSelect.quota,
      ["productSelect.stock"]: productSelect.stock,
      ["productSelect.quota_show"]: productSelect.quota_show,
      ["productSelect.product_stock"]: productSelect.product_stock,
      ['productSelect.unique']: productSelect.unique,
      ['productSelect.cart_num']: 1,
      attrValue: value,
      attr: '已选择'
    });
  } else {
    this.setData({
      ["productSelect.store_name"]: storeInfo.store_name,
      ["productSelect.image"]: storeInfo.image,
      ["productSelect.price"]: storeInfo.price,
      ["productSelect.quota_show"]: 0,
      ["productSelect.quota"]:  0,
      ['productSelect.unique']: '',
      ['productSelect.cart_num']: this.data.productAttr.length ? 0 : 1,
      attrValue: '',
      attr: '请选择'
    });
  }
  this.setData({ productAttr: productAttr });
  },
  selecAttr: function () {
    this.setData({
      'attribute.cartAttr': true
    });
  },
   /**
   * 收藏商品
   */
  setCollect: function () {
    if (app.globalData.isLog === false) {
      this.setData({
        isAuto: true,
        iShidden: false,
      });
    } else {
      var that = this;
      if (this.data.storeInfo.userCollect) {
        collectDel(this.data.storeInfo.product_id).then(res => {
          that.setData({
            ['storeInfo.userCollect']: !that.data.storeInfo.userCollect
          })
        })
      } else {
        collectAdd(this.data.storeInfo.product_id).then(res => {
          that.setData({
            ['storeInfo.userCollect']: !that.data.storeInfo.userCollect
          })
        })
      }
    }
  },
  goProduct:function(){
    return app.Tips('/pages/goods_details/index?id=' + this.data.storeInfo.product_id);
  },
  combinationDetail:function(){
    var that = this;
    var data = that.data.id; 
    getCombinationDetail(data).then(function(res){
      console.log(6);
      console.log(res.data.storeInfo.title);
      that.setData({
        // ["parameter.title"]: res.data.storeInfo.title.substring(0,16),
        imgUrls: res.data.storeInfo.images,
        storeInfo: res.data.storeInfo,
        pink: res.data.pink,
        pindAll: res.data.pindAll,
        reply: [res.data.reply],
        replyCount: res.data.replyCount,
        itemNew: res.data.pink_ok_list,
        pink_ok_sum: res.data.pink_ok_sum,
        replyChance: res.data.replyChance,
        productAttr: res.data.productAttr,
        productValue: res.data.productValue
      });
      that.setTime();
      wxParse.wxParse('description', 'html', that.data.storeInfo.description, that, 0);
      app.globalData.openPages = '/pages/activity/goods_combination_details/index?id=' + that.data.id + '&scene=' + that.data.userInfo.uid;
      that.setProductSelect();
      that.DefaultSelect();
      setTimeout(function () {
        that.infoScroll();
      }, 1000);
    });
  },
  onMyEvent: function (e) {
    this.setData({ 'attribute.cartAttr': e.detail.window, isOpen: false })
  },
  setTime: function () {//到期时间戳
    var that = this;
    var endTimeList = that.data.pink;
    var countDownArr = [];
    var timeer=setInterval(function(){
      var newTime = new Date().getTime() / 1000;
      for (var i in endTimeList) {
        var endTime = endTimeList[i].stop_time;
        var obj = [];
        if (endTime - newTime > 0) {
          var time = endTime - newTime;
          var day = parseInt(time / (60 * 60 * 24));
          var hou = parseInt(time % (60 * 60 * 24) / 3600);
          var min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
          var sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
          hou = parseInt(hou) + parseInt(day * 24);
          obj = {
            day: that.timeFormat(day),
            hou: that.timeFormat(hou),
            min: that.timeFormat(min),
            sec: that.timeFormat(sec)
          }
        } else {
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
        }
        endTimeList[i].time = obj;
      }
      that.setData({
        pink: endTimeList
      })
    },1000);
    that.setData({
      timeer: timeer
    })
  },
  timeFormat(param) {//小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
   /**
   * 购物车手动填写
   * 
  */
  iptCartNum: function (e) {
    this.setData({
      ['productSelect.cart_num']: e.detail,
      cart_num: e.detail
    });
  },
  /**
   * 购物车数量加和数量减
   * 
  */
  ChangeCartNum: function (e) {
    //是否 加|减
    var changeValue = e.detail;
    //获取当前变动属性
    var productSelect = this.data.productValue[this.data.attrValue];
    if (this.data.cart_num) {
      productSelect.cart_num = this.data.cart_num;
    }
    //如果没有属性,赋值给商品默认库存
    if (productSelect === undefined && !this.data.productAttr.length) productSelect = this.data.productSelect;
    //不存在不加数量
    if (productSelect === undefined) return;
    //提取库存
    var stock = productSelect.stock || 0;
    var quotaShow = productSelect.quota_show || 0;
    var productStock = productSelect.product_stock || 0;
    //设置默认数据
    if (productSelect.cart_num == undefined) productSelect.cart_num = 1;
    //数量+
    console.log(this.data.productSelect.cart_num);
    if (changeValue) {
      productSelect.cart_num++;
      //大于库存时,等于库存
      if (quotaShow >= productStock) {
        if (productSelect.cart_num >= productStock) productSelect.cart_num = productStock;
      } else {
        if (productSelect.cart_num >= quotaShow) productSelect.cart_num = quotaShow;
      }
      this.setData({
        ['productSelect.cart_num']: productSelect.cart_num,
        cart_num: productSelect.cart_num
      });
    } else {
      //数量减
      productSelect.cart_num--;
      //小于1时,等于1
      if (productSelect.cart_num < 1) productSelect.cart_num = 1;
      this.setData({
        ['productSelect.cart_num']: productSelect.cart_num,
        cart_num: productSelect.cart_num
      });
    }
  },
  /**
   * 属性变动赋值
   * 
  */
  ChangeAttr: function (e) {
    var values = e.detail;
    var productSelect = this.data.productValue[values];
    var storeInfo = this.data.storeInfo;
    this.setData({
      cart_num: 1
    });
    if (productSelect) {
      this.setData({
        ["productSelect.image"]: productSelect.image,
        ["productSelect.price"]: productSelect.price,
        ["productSelect.quota"]: productSelect.quota,
        ["productSelect.stock"]: productSelect.stock,
        ["productSelect.quota_show"]: productSelect.quota_show,
        ["productSelect.product_stock"]: productSelect.product_stock,
        ['productSelect.unique']: productSelect.unique,
        ['productSelect.cart_num']: 1,
        ['productSelect.is_on']: true,
        attrValue: values,
        attr: '已选择'
      });
    } else {
      this.setData({
        ["productSelect.image"]: storeInfo.image,
        ["productSelect.price"]: storeInfo.price,
        ["productSelect.quota_show"]: 0,
        ["productSelect.quota"]: 0,
        ['productSelect.unique']: '',
        ['productSelect.cart_num']: 0,
        ['productSelect.is_on']: true,
        attrValue: '',
        attr: '请选择'
      });
    }
  },
  setProductSelect: function () {
    var that = this;
    if (that.data.productSelect.length == 0) {
      that.setData({
        ['productSelect.image']: that.data.storeInfo.image,
        ['productSelect.store_name']: that.data.storeInfo.title,
        ['productSelect.price']: that.data.storeInfo.price,
        ['productSelect.quota']: that.data.storeInfo.stock,
        ['productSelect.unique']: '',
        ['productSelect.cart_num']: 1,
        ['productSelect.is_on']:true
      })
    }
  },
  /*
  * 下订单
  */
  goCat: function () {
    var that = this;
    var productSelect = this.data.productValue[this.data.attrValue];
    //打开属性
    if (this.data.isOpen)
      this.setData({ 'attribute.cartAttr': true })
    else
      this.setData({ 'attribute.cartAttr': !this.data.attribute.cartAttr });
    //只有关闭属性弹窗时进行加入购物车
    if (this.data.attribute.cartAttr === true && this.data.isOpen == false) return this.setData({ isOpen: true });
    //如果有属性,没有选择,提示用户选择
    if (this.data.productAttr.length && productSelect === undefined && this.data.isOpen == true) return app.Tips({ title: '请选择属性' });
    var data = {
      productId: that.data.storeInfo.product_id,
      secKillId: 0,
      bargainId: 0,
      combinationId: that.data.id,
      cartNum: that.data.cart_num,
      uniqueId: productSelect !== undefined ? productSelect.unique : '',
      is_new: 1,
    };
    postCartAdd(data).then(function (res) {
      that.setData({ isOpen: false });
      wx.navigateTo({ url: '/pages/order_confirm/index?cartId=' + res.data.cartId });
    }).catch(function(res){
      return app.Tips({ title: res });
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onLoadFun:function(e){
    this.setData({ userInfo:e.detail });
    this.combinationDetail();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.isClose) this.combinationDetail();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ isClose: 1 });
    this.data.timeer !== null && clearInterval(this.data.timeer);
  },

  showAll:function(){
    if (this.data.AllIndex > this.data.pink.length) 
      this.data.AllIndex = this.data.pink.length;
    else 
      this.data.AllIndex+=2;
    this.setData({ AllIndex: this.data.AllIndex });
  },
  hideAll:function(){
    this.setData({ AllIndex: 2 });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.data.timeer !== null && clearInterval(this.data.timeer);
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
    var that = this;
    return {
      title: that.data.storeInfo.title,
      path: app.globalData.openPages,
      imageUrl: that.data.storeInfo.image,
      success: function () {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
})