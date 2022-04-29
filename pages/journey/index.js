function hint(data){
  wx.showToast({
    title: data,
    icon: 'none',
    duration: 2000//持续的时间
  })
}

Page({

  data: {
    detail:{
  },
    theme: 1,
    dis : 1
  },
  
  onLoad:function(options){
    var that = this
    var dis = options.dis
    var id = options.id
    console.log(dis)
    hint(id)

    wx.request({
      url: 'http://127.0.0.1:8080/js/detail',
      method: 'GET', 
      header: { "content-type": "application/json" },
      data:{
        id : id
      },

      success: function (res) {
        console.log(res.data)
          that.setData({
            detail : res.data.data.elements,
            dis : dis  
        }) 

        // if (res.data.code!=0){
        //     hint("服务器开小差啦")
        //     return
        // }

        // console.log(that.data.journey)
        // hint("获取数据成功")
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
  tapName: function(event) {
    wx.navigateBack()
  },
})