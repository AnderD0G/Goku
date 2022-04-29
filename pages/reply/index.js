import {get} from '../../utils/request.js'
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
    statusHeight :0,
    isShowInput: false, //控制输入栏
    placeholder:"123"

  },
  init :function(that){
   
  },
  onLoad:function(options){
    var id = options.id
    console.log("welcome to reply"+id)
    this.getReply(options.id)
  
  },
  async getReply(id){
    let k = await get('http://127.0.0.1:8081/comment/detail',{
      query:"(id="+id+")",
    })
    this.setData({ play : k.data})
    console.log(k)
  },
  tapName:function(){
    wx.navigateBack()
  },
  // haha:function(){
  //   this.setData({
  //     isShowInput: true
  //   })
  // },
  haha: function(e) {
    var value = e.detail.value
    console.log(value)
  },
  }

)