
import {get} from '../../utils/request.js'
import{getLocation} from '../../utils/util.js'
var app = getApp();
Page({
  data: {
    //展示的数据
    journey:{
  }
  },
  
  onLoad:function(options){
    console.log("here")
    var that = this;
    that.getGame()
    console.log("there")
    app.globalData.statusBarHeight
    
  },

  tapName: function(event) {
    console.log(event)
    wx.navigateTo({
      url: '../journey/index?id='+event.currentTarget.id+'&dis='+event.currentTarget.dataset.dis
    })
  },

  onPullDownRefresh: function () {
    var that = this
    that.onLoad();
  },

  async getGame(){
    var that = this 
    let {
      lng,la
    } = await getLocation()
    console.log(lng,la)
    let k = await get('http://127.0.0.1:8081/js',{
      long:lng,
      lat :la
    })
    that.setData({
      journey : k.data}) 
  }
})