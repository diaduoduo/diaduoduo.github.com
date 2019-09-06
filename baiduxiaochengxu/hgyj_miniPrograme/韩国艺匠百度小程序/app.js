//app.js
import api from "./utils/apiHost.js";
App({
  onLaunch: function () {
    swan.login();
    const updateManager = swan.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {});
    updateManager.onUpdateReady(function () {
      swan.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      swan.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
      });
    });
    this.getCode();
    this.globalData.phone = swan.getStorageSync("phone") || '';
    let system = swan.getSystemInfoSync();
    this.globalData.system = swan.getSystemInfoSync();
    let model = this.globalData.model = swan.getSystemInfoSync().model;
    this.globalData.isIphone = model.indexOf("iPhone X") !== -1 || model.indexOf("iPhone XS") !== -1 || model.indexOf("iPhone XS Max") !== -1 || model.indexOf("iPhone XR") !== -1;
  },
  getCode: function (fn) {
    swan.login({
      success(res) {
        fn && fn(res.code);
      },
      fail(e) {
        swan.showModal({
          title: '提示',
          content: '登录失败'
        });
      }
    });
  },
  apiRequest: function (obj) {
    let data = obj.data || { shopID: api.shopID };
    if (obj.shopID) {
      data[obj.shopID] = api.shopID;
    }
    if (!data.shopID) {
      data.shopID = api.shopID;
    }
    let url = '';
    let showTips = true;
    if (obj.hasOwnProperty("showTips")) {
      showTips = obj.showTips;
    }
    if (obj.url.charAt(0) === "/") {
      obj.url = obj.url.substring(1);
    }
    if (obj.url.indexOf('http') === -1) {
      url = api["apiHost" + (obj.baseUrl || '')] + obj.url;
    } else {
      url = obj.url;
    }
    swan.showNavigationBarLoading();
    swan.request({
      url: url,
      method: obj.method || "GET",
      data: data,
      success: res => {
        if (res.statusCode != 200) {
          swan.showModal({
            title: '提示',
            content: '获取信息失败，请重试'
          });
        } else {
          if (res.data.data || res.data.ReturnCode == 0) {
            obj.success && obj.success(res.data);
          } else if (showTips) {
            swan.showModal({
              title: '提示',
              content: res.data.Message
            });
          }
        }
      },
      fail: function () {
        obj.fail && obj.fail();
      },
      complete: () => {
        swan.hideNavigationBarLoading();
        swan.stopPullDownRefresh();
      }
    });
  },
  globalData: {
    userInfo: null,
    phone: '',
    system: '',
    model: '',
    isIphone: ''
  }
});