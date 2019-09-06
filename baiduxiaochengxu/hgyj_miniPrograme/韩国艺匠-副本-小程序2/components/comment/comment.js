// components/comment2/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    page: {
      type: String,
      value: "home"
    },
    comment: {
      type: Array,
      value: []
    },
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
    preview:function(e){
      let imgs = e.currentTarget.dataset.img;
      let index=e.currentTarget.dataset.index;
      let arr=[];
      imgs.forEach(val=>{
        arr.push(val.PicUrl)
      });
      wx.previewImage({
        urls: arr,
        current:arr[index],
        fail:function(e){
          console.log(e)
        }
      })
    },
    goList:function(){
      if(this.data.page!=="comment"){
        wx.navigateTo({
          url: '/pages/comment/comment',
        })
      }
    }
  }
})