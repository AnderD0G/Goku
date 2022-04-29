function hint(data){
  wx.showToast({
    title: data,
    icon: 'none',
    duration: 100//持续的时间
  })
}

Page({
  data: {
    //主题array
    themes : new Array(),
    //颜色数组
    colors : new Array(),
    theme: 1,
    dis : 1,
    // 页面总高度将会放在这里
    windowHeight: 0,
    // navbar的高度
    navbarHeight: 0,
    // header的高度
    headerHeight: 0,
    // scroll-view的高度
    scrollViewHeight: 0,
    //每个剧本的高度
    avaHeight: 0,
    //每个剧本的宽度
    avaWidth:0,
    //页数
    page : 1,
    //剧本列表
    mycars : new Array(),
    //查询语句
    queryArr : "",
    //人数
    num : "",
    //tag id
    tag :"",
    //小于等于
    char_lt:"<=",
    //大于等于
    char_gt:">="
  },
  init :function(that){
    that.page = 1,
    that.tag = ""
  },
  onLoad:function(options){
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
          that.setData({
              windowHeight: res.windowHeight
          });
      }
  });
    let query = wx.createSelectorQuery().in(this);
    console.log(query)
    query.select('#navbar').boundingClientRect();
    query.select('#num').boundingClientRect();
    query.exec((res) => {
      console.log(res)
      // 分别取出navbar和header的高度
      let navbarHeight = res[0].height;
      let headerHeight = res[1].height;
      // 然后就是做个减法
      let scrollViewHeight = this.data.windowHeight - navbarHeight - headerHeight;
      console.log(scrollViewHeight)
      // 算出来之后存到data对象里面
      this.setData({
          avaHeight: scrollViewHeight / 3,
          avaWidth: scrollViewHeight / 3 * 0.73,
          scrollViewHeight: scrollViewHeight
      });
  });
  that.getS(1,that.setS);
  that.getTheme()
  },

  onPullDownRefresh: function () {
    var that  = this
    that.data.page = 1
    that.data.tag = ""
    that.data.queryArr = ""
    that.getS(1,that.setS)
  },

  appendScr: function(event) {
    var that = this
    that.data.page = that.data.page+1
    that.getS(that.data.page,that.appendS)
    console.log(that.data.page)
  },

  //设置剧本列表
  setS :function(res){
    var that = this;
    that.setData({
      mycars:res.data
  }) 
  },

  //追加剧本列表
  appendS :function(res){
    var that = this;
    that.setData(
      {
        mycars : that.data.mycars.concat(res.data)
      }
    )

  },

   getS: function(page,f){
     
    var that = this;
    var data = {
      page:that.data.page,
      size : 6
    }
    data.query = that.data.queryArr
    wx.request
    ({
      url: 'http://127.0.0.1:8081/script',
      method: 'GET', 
      header: { "content-type": "application/json" },
      data:data,

      success: function (res) {
        f(res)
        console.log(res.data)
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
  //进入剧本详情
  getDetail:function(event){
    wx.navigateTo({
      url: '../detail/index?id='+event.currentTarget.id
    })
  },
  getTheme: function(){
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/category',
      method: 'GET', 
      header: { "content-type": "application/json" },
      data:{
        query:"(value=theme)",
      },

      success: function (res) {
        that.setData({
          themes:res.data.data.data.elements[0].tags
      }) 
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
    console.log(event)
    var that = this
    if (that.data.num == ""){
        //先选择了某一个tag
        that.data.tag = event.currentTarget.id
        that.data.queryArr = "(script_tag=("+event.currentTarget.id+"))"
    }else{
        that.data.queryArr = "(script_tag=("+event.currentTarget.id+"),script_player_limit"+that.data.num+")"
    }
    //选择第一页，只有滚动下拉的时候加加
    that.data.page = 1
    that.getS(1,that.setS)
  },
  searchTap: function(event) {
    wx.navigateTo({
      url: '../list/index'
    })
  }
})
