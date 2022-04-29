// app.js
App({
  globalData: {
    statusBarHeight:0,
    windowHeight:0,
    //胶囊距离顶上的距离
    buttonTop:0
  },
  onLaunch() {
    let menuButton = wx.getMenuButtonBoundingClientRect()
    let statusBarHeight = menuButton.height
    let top = menuButton.top
    // console.log("status height"+statusBarHeight)
    this.globalData.statusBarHeight = statusBarHeight
    this.globalData.buttonTop = top
    this.globalData.windowHeight = wx.getSystemInfoSync().windowHeight

  },

})
