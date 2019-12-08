//app.js
let wechat = require('./utils/wechat.js');

App({
  globalData:{
    parkName:'',
    parkDesc:'',
    parkaddress:'',
    parkCity:"",
    mylatitude:'',
    mylongitude:'',
    parkLatitude: '',//停车的纬度
    parkLongitude: '',//停车的经度

  },
  onLaunch: function () {
    
    
  }
// "tabBar": {
  //   "color": "#000000",
  //   "selectedColor": "#0066FF",
  //   "list": [
  //     {
  //       "pagePath": "pages/index/index",
  //       "text": "停车助手",
  //       "iconPath": "pages/imgs/P2.png",
  //       "selectedIconPath": "pages/imgs/P1.png"
  //     },
  //     {
  //       "pagePath": "pages/search/search",
  //         "text": "导航助手",
  //         "iconPath": "pages/imgs/to.png",
  //        "selectedIconPath": "pages/imgs/to1.png"
  //     }
  //   ]
  // },
  //{
  //  "pagePath": "pages/person/person",
  //  "text": "我的",
  // "iconPath": "pages/imgs/me.png",
  // "selectedIconPath": "pages/imgs/me_select.png"
  //},
    //{
  //  "pagePath": "pages/weather/weather",
  //  "text": "天气助手",
  // "iconPath": "pages/imgs/me.png",
  // "selectedIconPath": "pages/imgs/me_select.png"
  //}
})
