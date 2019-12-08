// pages/person/person.js
const app = getApp()
Page({
 data:{
   flag:true,
   locate:'',
   open:false,
 },
  onShow: function () {
    var address = wx.getStorageSync('address')
    this.setData({
      locate: address
    })
  },
  locateshowitem: function () {
    this.setData({
      open: !this.data.open,
      locate: app.globalData.parkaddress,
      flag: false
    })
  },
  //事件处理函数
  go: function () {
    console.log("test!!!")
      wx.switchTab({
       url: "../index/index",
     })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})