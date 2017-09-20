//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    arraylist: [{
      title: 'hello thank you thank you very much!hello thank you thank you very much!'
    }, {
      title: 'hello thank you thank you very much!hello thank you thank you very much!'
    }, {
      title: 'hello thank you thank you very much!hello thank you thank you very much!'
    }],
    obj:{},
    current:0,
    winHeight:0,
    winWidth:0,
    delBtnwidth:150
  },

  onLoad: function () {
      var that = this;
      wx.getSystemInfo({
          success: function (res) {
              that.setData({
                  winWidth: res.windowWidth,
                  winHeight: res.windowHeight
              });
          }
      });
  },

  loadmore: function (e) {
    var num = e.currentTarget.dataset.num;
    var obj = this.data.obj
    obj['tip'+num] = num
    this.setData({
      obj: obj
    })
    console.log(this.data.obj)
  },
  hide:function(e){
    var num = e.currentTarget.dataset.num;
    var obj = this.data.obj
    obj['tip' + num] = null
    this.setData({
      obj: obj
    })
  },
  move:function(e){
      if(this.data.current === e.target.dataset.current){
          return
      }else{
          this.setData({
                current:e.target.dataset.current
          })
      }     
  },
  change:function(e){
      this.setData({current:e.detail.current})
  },
  moveStart:function(e){
      if(e.touches.length == 1){
          this.setData({
              startX:e.touches[0].clientX
          })
      }
  },
  moveTouche:function(e){
      if(e.touches.length == 1){
          var moveX = e.touches[0].clientX
          var disX = this.data.startX - moveX
          var delBtnwidth = this.data.delBtnwidth
          var txtStyle = ''
          if(disX == 0 || disX < 0){
              txtStyle = 0
          }else if(disX > 0){
              txtStyle = -disX
              if(disX >= delBtnwidth){
                  txtStyle = -delBtnwidth
              }
          }
          this.setData({
              txtStyle:txtStyle
          })
      }
  },
  moveEnd:function(e){
      var endX = e.changedTouches[0].clientX
      var disX = this.data.startX - endX
      var delBtnwidth = this.data.delBtnwidth
      var txtStyle = disX > delBtnwidth/2?delBtnwidth:0
      this.setData({
          txtStyle : txtStyle
      })
  }

})
