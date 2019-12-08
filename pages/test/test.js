let amap = require("../../utils/amap");
Page({
  data: {
    controls: [{
      id: 1,
      iconPath: '../imgs/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  onLoad(e) {
    // var that = this
    // amap.getRegeo()
    //   .then(d => {
    //     let { latitude, longitude } = d[0];
    //     console.log("22222latitude:" + latitude + " longitude:" + longitude);
    //     that.setData({
    //       longitude: longitude,
    //       latitude: latitude,
    //       markers: [{
    //         longitude: longitude,
    //         latitude: latitude,
    //           iconPath: '../imgs/people.png',
    //           width: 20,
    //           height: 20,
    //           label:
    //            {
    //             content: '经度' +longitude + '\n' + '纬度' +latitude,
    //              padding: 3,
    //              bgColor: '#ffffff',
    //              borderRadius: 5,
    //              textAlign: 'center'
    //            }
    //         }]
    //     })
    //   })
    var that = this
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy:'true',
      success: function (res) {
        console.log("11111latitude:" + res.latitude + " longitude:" + res.longitude);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: [{
            longitude: res.longitude,
            latitude: res.latitude,
              iconPath: '../imgs/people.png',
              width: 20,
              height: 20,
              label:
               {
                content: '经度' + res.longitude + '\n' + '纬度' + res.latitude,
                 padding: 3,
                 bgColor: '#ffffff',
                 borderRadius: 5,
                 textAlign: 'center'
               }
            }]
        })
      }
    })
    },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})