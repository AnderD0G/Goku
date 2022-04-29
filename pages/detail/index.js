import {get} from '../../utils/request.js'
import{getHeight} from '../../utils/util.js'
var app = getApp();
let detailHeight = 0
Page({
  data: {
    play:{},
    height:0,
    comments:[],
    scrollTrigger:false,
    bigTrigger:true,
    detailHeight :0,
    statusHeight :0
  },
  init :function(that){

  },
  onLoad:function(options){
    var that = this
    var id = options.id
    that.getGame(id)
    // this.setData({comments:  this.makeComments()})
    this.setData({ height : app.globalData.windowHeight,statusHeight:app.globalData.statusBarHeight})
    //获取detail高度，为后续判断作准备
    this.getHeight(".detail")
  },
  async getHeight(s){
   let res = await getHeight(s)
   detailHeight = res.height
  },
  onPageScroll: function (event) {
    // console.log(event.scrollTop)
    let flag = false
    if(event.scrollTop > detailHeight - app.globalData.statusBarHeight){
      flag = true
    }
    this.setData({
      scrollTrigger:flag,
    })
  },
  tapName:function(){
    wx.navigateBack()
  },
  async getGame(uuid){
    var that = this
    let k = await get('http://127.0.0.1:8081/script',{
      query:"(uuid="+uuid+")",
    })
    let b = await get('http://127.0.0.1:8081/comment',{
      query:"(relation_id="+uuid+",relation_type=1)",
    })
    console.log(b.data)
    that.setData({comments:b.data})
    console.log(k.data[0])
    that.setData({play:k.data[0]})
  },
  makeComments(){
    return [...Array(100)].map((k,i)=>i+1);
  },
  reply: function(event) {
    console.log(event)
    wx.navigateTo({
      url: '../reply/index?id='+event.currentTarget.id
    })
  },
  }
)