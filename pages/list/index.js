const app = getApp()

Page({

  data: {
    isFocus: false, // 强制聚焦bug
    timer: null, // 节流 
    inputValue : "",
    lists : new Array()
  },

  tap() {
    if (!this.data.isFocus) {
      this.setData({
        isFocus: true
      })
      // input 聚焦失灵 bug
    }
  },
  blur(event) {
    // console.log('blur', event.detail.value.length)
    if (event.detail.value.length <= 0 && this.data.isFocus) {
      this.setData({
        isFocus: false
      })
    }
  },
  search(event) {
    // 输入过快将会处理
    clearTimeout(this.data.timer)
    // 节流
    this.data.timer = setTimeout(() => {
      this.triggerEvent('searchevent', {
        value: event.detail.value, // 传出value值
      }, {})
    }, 300);
    // 第一个参数 detail 对象
    // 第二个参数 触发事件的选项

  },
  bindKeyInput: function (e) {
    var that = this
    that.setData({
      inputValue: e.detail.value
    })
    if(e.detail.value!=""){
      that.getS()
    }
    
  },
  getS: function(){
     
    var that = this;
    var data = {
      key : that.data.inputValue
    }
    wx.request
    ({
      url: 'http://127.0.0.1:8080/script/vague',
      method: 'GET', 
      header: { "content-type": "application/json" },
      data:data,

      success: function (res) {
        that.setData({
          lists: res.data.data.data.elements
        })
        console.log(that.data.lists)
      },

      fail: function (res) {
        hint("服务器开小差啦")
        console.log("获取数据失败！");
      },
  
      complete: function () {
        // complete
      }
    });
  },


})