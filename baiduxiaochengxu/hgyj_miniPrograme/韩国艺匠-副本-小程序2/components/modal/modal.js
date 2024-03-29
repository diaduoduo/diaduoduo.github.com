// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    },
    title:{
      type:String,
      value:''
    },
    position:{
      type:String,
      value:"center"
    },
    scroll:{
      type:Boolean,
      value:false
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
    noScroll:function(){},
    close:function(){
      this.setData({
        show:false
      });
      this.triggerEvent("close");
    }
  }
})
