// components/module2/module.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    more: {
      type: String,
      value: "查看更多"
    },
    showArrow: {
      type: Boolean,
      value: true
    },
    number: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    viewMore: function () {
      this.triggerEvent("viewmore");
    }
  }
});