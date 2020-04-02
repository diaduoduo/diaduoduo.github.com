import { GetguestphotoList,Useroperation,Getnewstypes,GetNewsList } from '../../api/mendian.js';
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navH:"",
        currentTab: 0,
        newsList: [],
        newsList1: [],
        newsList2: [],
        typeList: [],
        loaded: false,
        page: 1,
        processing: false,
        leftHeight: 0,
        rightHeight: 0,
        isGoIndex:false,
        iShidden:true,
        isAuto:false,
        fixed: false,
        querySelector: null,
        current:0,
        updateCity:false,
        init:false,


        newsList11: [],
        newsList22: [],
        newsList33: [],
        loaded2: false,
        page2: 1,
        processing2: false,
        id:0,

        loading:false,

        latitude:app.globalData.latitude,
        longitude:app.globalData.longitude




    },
    checkTab:function(e){
        let tab = e.currentTarget.dataset.tab;
        this.setData({
          currentTab: tab
        });
    },
    getshailist:function(){
      var date={
        PageIndex: this.data.page,  
        PageSize: 10,
      }
      wx.showLoading ({
        title: '数据加载中...',
        icon: "none"
      });
      GetguestphotoList(date).then(res =>{
        if(res.ReturnCode==0){
          wx.hideLoading()
        }
        if(this.data.page==1){
          this.setData({
            newsList: [],
            newsList1: [],
            newsList2:[],
          })
        }
        this.setData({
          newsList: this.data.page === 1 ? res.ReturnObject.Items : this.data.newsList.concat(res.ReturnObject.Items) 
        });
        this.setNewsList(res.ReturnObject.Items);
       if(this.data.newsList.length === res.ReturnObject.TotalItems){
         this.data.loaded = true
       } else {
         this.data.page++
       }
        
      })
      complete:()=>{
        this.data.processing = false
      }
    },
    setNewsList: function(list) {
      list.forEach(val => {
        let height = val.CoverHigh * 100 / val.CoverWide;
        if (this.data.rightHeight >= this.data.leftHeight) {
          this.data.leftHeight += height;
          this.data.newsList1.push(val);
        } else {
          this.data.rightHeight += height;
          this.data.newsList2.push(val);
        }
      });
      this.setData({
        newsList1: this.data.newsList1,
        newsList2: this.data.newsList2,
      })
    },

  /**
   * 点赞
  */
 give:function(e){
    if (app.globalData.isLog === false)
      this.setData({isAuto: true,iShidden: false})
    else{
      let item=e.currentTarget.dataset.item;
      console.log(item)
    }
  },
  /**
   * 封面故事
  */
  onPageScroll: function(e) {
    this.data.querySelector.exec(res=>{
      console.log(res)
      this.setData({
        fixed:res[0].top<=0
      });
    })
    
  },
  getType:function(){
    Getnewstypes().then(res=>{
      this.setData({
        typeList: res.ReturnObject
      })
    })
  },
  getfengmianstory:function(id){
    if (this.data.loaded2 || this.data.processing2) return;
    this.data.processing2 = true;
    var date={
      NewsTypeID: id || 0,
      PageIndex: this.data.page2,  
      PageSize: 10,
    }
    wx.showLoading ({
      title: '数据加载中...',
      icon: "none"
    });
    GetNewsList(date).then(res =>{

      if(res.ReturnCode==0){
        wx.hideLoading()
      }

      if(this.data.page2==1){
        this.setData({
          newsList11: [],
          newsList22: [],
          newsList33:[],
        })
      }
      this.setData({
        newsList11: this.data.page2 === 1 ? res.ReturnObject.Items : this.data.newsList11.concat(res.ReturnObject.Items),
        
      });
      this.setfengmianstory(res.ReturnObject.Items);
     if(this.data.newsList11.length === res.ReturnObject.TotalItems){
       this.data.loaded2 = true
     } else {
       this.data.page2++
     }
     this.data.processing2 = false
        
    }).catch(res=>{
      console.log
    })

  },
  setfengmianstory: function(list) {
    console.log(list)
    list.forEach(val => {
      let height = val.CoverHigh * 100 / val.CoverWide;
      if (this.data.rightHeight >= this.data.leftHeight) {
        this.data.leftHeight += height;
        this.data.newsList22.push(val);
      } else {
        this.data.rightHeight += height;
        this.data.newsList33.push(val);
      }
    });
    this.setData({
      newsList22: this.data.newsList22,
      newsList33: this.data.newsList33,
    })
  },
  change: function(e) {
    let index = e.currentTarget.dataset.index;
   if (index === this.data.current) return;
    this.setData({
      current: index
    });
    this.setData({
      loaded2: false,
      page2: 1
    })
    this.getfengmianstory(this.data.typeList[index].ID);
  },
    /**
     * 生命周期函数--监听页面加载
     */
    init: function() {
      this.setData({
        newsList: [],
        newsList1: [],
        newsList2: [],
        loaded: false,
        page: 1,
      })
      this.setData({
        newsList11: [],
        newsList22: [],
        newsList33: [],
        loaded2: false,
        page2: 1
      })
      this.getshailist();
      this.getfengmianstory();
    },
    /**
     * 点击二级页面
     */
    goDetail:function(e){
      console.log(e)
      let item = e.currentTarget.dataset.item;
      console.log(item.NewsTypeID)
      //　跳h5
      if(item.JumpType ===3){
        console.log(e.currentTarget.dataset.item.Url)
        let url= e.currentTarget.dataset.item.Url
        wx.navigateTo({
          url: "../h5/h5?url=" + url,
        })
      }
      //跳详情页面
      if (item.JumpType === 4) {
        wx.navigateTo({
          url: '/pages/news/news?id=' + item.ID,
        })
      }
      //跳详情页面jint 
      if (item.JumpType === 5) {
        wx.navigateTo({
          url: '/pages/news/news?id=' + item.ID +"&NewsTypeID="+ item.NewsTypeID,
        })
      }

    },
    onLoad: function (options) {
      this.init();
      this.getType();
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

      this.data.querySelector = wx.createSelectorQuery().select('#news').boundingClientRect();
     // console.log(wx.getStorageSync('latitude'))
      if(wx.getStorageSync('latitude')){
        console.log("dsdd")
      } else {
        console.log("222")
      }
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
     // console.log(this.data.currentTab)
 
      

      if(this.data.currentTab == 0){
        this.getshailist(); 
      }
      if(this.data.currentTab == 1){
        let id = this.data.current;
        this.getfengmianstory(this.data.typeList[id].ID);
       // this.getfengmianstory()
       // console.log(this.data.current);
      }
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    }
  })