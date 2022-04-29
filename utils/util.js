const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year,month, day].map(formatNumber).join('-') 
}

function getDates(days, todate) {
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}
function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time =  yearDate+'-'+ month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}
function getLocation(){
  return new Promise((reslove)=>{
    wx.getLocation({
      type: 'wgs84',
      success({longitude:lng,latitude: la}){
        console.log(lng+"and"+la)
        reslove({lng,la})
      },
      fail: (res) => {
          console.log(res.errMsg)
          wx.showToast({
            title: '获取地理位置信息失败', //弹框内容
            icon: 'fail',  //弹框模式
            duration: 1000    //弹框显示时间
          })
        reslove({lng:116.2,la:39.56})
      },
    })
  })
}
function getHeight(selector){
    const query = wx.createSelectorQuery();
    return new Promise((reslove)=>{
      query.select(selector).boundingClientRect(function (res) {
        reslove(res)
      }
      ).exec();
      
    })
}
module.exports = {
  formatTime,
  formatDate: formatDate,
  getDates: getDates,
  getLocation:getLocation,
  getHeight:getHeight
}
