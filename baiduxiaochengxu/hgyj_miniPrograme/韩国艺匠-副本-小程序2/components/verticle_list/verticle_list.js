// components/verticle_list/verticle_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    page: {
      type: String,
      value: "home"
    },
    tx: {
      type: Array,
      value: []
    },
    number: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail:function(e){
      let item=e.currentTarget.dataset.item;
      wx.navigateTo({
        url: '/pages/tx_detail/tx_detail?ID='+item.ID,
      })
    }
  }
})