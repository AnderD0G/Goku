function $res(url, method , data) {

  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method,
      data,
      success: (res => {
        resolve(res)
      }),
      fail(e) {
        reject(e.errMsg)
      },
    })
  })
}

//封装get方式请求的wx.request方法
export function get(url , data) {
  return $res(url, 'Get' , data).catch(errMsg=>{
    wx.showToast({
      title: errMsg, //弹框内容
      icon: 'fail',  //弹框模式
      duration: 1000    //弹框显示时间
    })
  })
}
