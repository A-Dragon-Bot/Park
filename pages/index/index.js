//index.js
//获取应用实例
let app = getApp();
let util = require('../../utils/util.js');
let wechat = require("../../utils/wechat");
let amap = require("../../utils/amap");
import gcoord from '../../utils/gcoord.js'
let markersData = [];
var count=0
var mpCtx = wx.createMapContext("map");
Page({
  data: {
    markers: [],
    polyline: [],
    latitude: '43.86414',
    longitude: '125.35043',
    latitude2:'',
    longitude2:'',
    textData: {},
    city:"",
    name: "",
    desc: "",
    flag:false,
    flag1:false,
    flag2:true,
    flag3:true,
    
    controls: [
      {
        id: 0,
        position: {
          left: 0,
          top: 250,
          width: 40,
          height: 40
        },
        iconPath: "../imgs/location.png",
        clickable: true
      }
    ]
  },
  onLoad(e) {
    // console.log("tttt:" + wx.getStorageSync('iStop'))
    // if (wx.getStorageSync('iStop')&&!wx.getStorageSync('iFind')){
      // wx.showModal({
      //   title: '提示',
      //   content: '是否找到了车？',
      //   success: function (res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //       flag = 2;//表示找到了车     
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //       flag=1;
      //     }
      //   }
      // })
    // }
    var that = this
     console.log("isFind:" + wx.getStorageSync('isFind'))
    if (wx.getStorageSync("isFind")=="true"||wx.getStorageSync('isFind')==''){//未找到车或者第一次停车
      amap.getRegeo()
        .then(d => {
          let { name, desc, latitude, longitude } = d[0];
          console.log("latitude:" + latitude + " longitude:" + longitude);
          let { city } = d[0].regeocodeData.addressComponent;
          app.globalData.parkName = desc;
          app.globalData.parkCity = d[0].regeocodeData.addressComponent;
          console.log("Findcar:" + wx.getStorageSync("isFind"))
          //var result = gcoord.transform(
          //   [longitude, latitude],    // 经纬度坐标        //             
          //     gcoord.WGS84,// 当前坐标系
          //     gcoord.GCJ02,              // 目标坐标系
          // );
          //console.log("bbbb:" +result[0] + " " + result[1]
          //console.log("cccc:" + that.data.longitude + " " + that.data.latitude)
          //that.initMarkerData(latitude,longitude)
          wx.getLocation({
            type: 'gcj02',
            isHighAccuracy: 'true',
            success: function (res) {
              console.log("~~~latitude:" + res.latitude + " longitude:" + res.longitude);
              app.globalData.mylatitude = res.latitude
              app.globalData.mylongitude = res.longitude 
              app.globalData.parkLatitude = res.latitude
              app.globalData.parkLongitude = res.longitude
               mpCtx.moveToLocation();
              that.setData({
                flag: false,
                flag1: false,
                flag2: true,
                flag3: true,
                longitude: res.longitude,
                latitude: res.latitude,
                markers: [{
                  longitude: res.longitude,
                  latitude: res.latitude,
                  iconPath: '../imgs/people.png',
                  width: 40,
                  height: 40,
                  label:
                    {
                      content: '经度' + res.longitude + '\n' + '纬度' + res.latitude+'\n'+desc,
                      bgColor: "#ffffff", // 
                      color: "#4DB2B1", //不能用文本颜色值，只能用HEX
                      fontSize: 13,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "#4DB2B1",
                      x: 10,
                      y: -13,
                      textAlign: "center",
                      display: 'ALWAYS',
                      padding: 2.5
                    }
                }],
                polyline: []
              })
            }
          }) 
        
        })
        .catch(e => {
          console.log(e);
        })
       
    }else{//停车但没有找到车
       var that=this
      let mpCtx = wx.createMapContext("map");
      mpCtx.moveToLocation();
       wx.getLocation({
        type: 'gcj02',
        isHighAccuracy: 'true',
        success: function (res) {
          console.log("~~~latitude:" + res.latitude + " longitude:" + res.longitude);
          let latitude2 = wx.getStorageSync("parklati");
          let longitude2 = wx.getStorageSync("parklong");
          let latitude1 = res.latitude
          let longitude1 = res.longitude
         // mpCtx.moveToLocation();
      let markers = [
        {
          iconPath: "../imgs/mapicon_navi_e.png",
          id: 0,
          latitude: latitude2  ,
          longitude: longitude2 ,
          width: 36,
          height: 45,
          label:
            {
              content: '停车位置',
              padding: 3,
              bgColor: '#ffffff',
              borderRadius: 5,
              textAlign: 'center'
            }
        }, {
          iconPath: "../imgs/mapicon_navi_s.png",
          id: 1,
          latitude: latitude1 ,
          longitude: longitude1 ,
          width: 30,
          height: 36,
          label:
            {
              content: '目前位置',
              padding: 3,
              bgColor: '#ffffff',
              borderRadius: 5,
              textAlign: 'center'
            }
        }
      ];
      let origin = `${longitude1},${latitude1}`;
      let destination = `${longitude2},${latitude2}`;
      amap.getRoute(origin, destination, "getWalkingRoute", app.globalData.parkCity)
        .then(d => {
          // console.log(d);
          that.setRouteData(d, 1);
          that.setData({
            markers: markers,
            flag: true,
            flag1: true,
            flag2: false,
            flag3: false,
          });
        })
       
      }
      })
    }
  
  },
  getLocation: function () { //手动标定位置
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        var name = res.name
        var address = res.address
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("手动标记位置：1111:" + res.latitude + " " + res.longitude)
        app.globalData.parkLatitude=res.latitude
        app.globalData.parkLongitude=res.longitude
        app.globalData.parkName=res.name
        app.globalData.parkDesc=res.address
        app.globalData.parkaddress = res.name+res.address
        _this.park()
        _this.setData({
          flag: false,
          flag1: false,
          flag2: true,
          flag3: true,
          name: name,
          address: address,
          latitude: latitude,
          longitude: longitude,
          markers: [{
            id: 0,
            longitude: longitude,
            latitude: latitude,
            iconPath: '../imgs/map1.png',
            width: 35,
            height:35, 
            label:
            {
                content: '经度' + res.longitude + '\n' + '纬度' + res.latitude + '\n' + res.name,
                bgColor: "#ffffff", // 
                color: "#4DB2B1", //不能用文本颜色值，只能用HEX
                fontSize: 13,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#4DB2B1",
                x: 10,
                y: -13,
                textAlign: "center",
                display: 'ALWAYS',
                padding: 2.5
              }
          }],
          polyline:[]
        })
        wx.showToast({
          title: '点击停车停车吧！',
          icon: 'success',
          duration: 2000
        })
      }
      
    })
    
  },
  findCar: function (e) {
    // 找车
    var that=this
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
    let latitude2 = wx.getStorageSync("parklati");
    let longitude2 = wx.getStorageSync("parklong");
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: 'true',
      success: function (res) {
        console.log("~~~latitude:" + res.latitude + " longitude:" + res.longitude);
        let latitude1 = res.latitude
        let longitude1 = res.longitude 
       console.log("sto222: " + latitude2 + " " + longitude2)
        console.log("data: " + latitude1 + " " + longitude1)
    let markers = [
      {
        iconPath: "../imgs/mapicon_navi_e.png",
        id: 0,
        latitude: latitude2 ,
        longitude: longitude2 ,
        width: 36,
        height: 45,
        label:
        {
            content:'停车位置',
            padding:3,
            bgColor:'#ffffff',
            borderRadius:5,
            textAlign: 'center'
        }
      }, {
        iconPath: "../imgs/mapicon_navi_s.png",
        id: 1,
        latitude: latitude1 ,
        longitude: longitude1 ,
        width: 30,
        height: 36,
        label:
          {
            content: '目前位置',
            padding: 3,
            bgColor: '#ffffff',
            borderRadius: 5,
            textAlign: 'center'
          }
      }
    ];
    
    let origin = `${longitude1},${latitude1 }`;
    let destination = `${longitude2 },${latitude2 }`;
    amap.getRoute(origin, destination, "getWalkingRoute", app.globalData.parkCity)
      .then(d => {
        // console.log(d);
        that.setRouteData(d, 1);
      })
      .catch(e => {
        console.log(e);
      })
        that.setData({
          markers: markers,
        });
      }
    })

  },
  setRouteData(d) {
    let points = [];
      if (d.paths && d.paths[0] && d.paths[0].steps) {
        let steps = d.paths[0].steps;
        wx.setStorageSync("steps", steps);
        steps.forEach(item1 => {
          let poLen = item1.polyline.split(';');
          poLen.forEach(item2 => {
            let obj = {
              longitude: parseFloat(item2.split(',')[0]),
              latitude: parseFloat(item2.split(',')[1])
            }
            points.push(obj);
          })
        })
      }
      this.setData({
        flag: true,
        flag1: true,
        flag2: false,
        flag3: false,
        polyline: [{
          points: points,
          color: "#0091ff",
          width: 6
        }]
      }); 
      if (d.paths[0] && d.paths[0].distance) {
        this.setData({
          distance: d.paths[0].distance + '米'
        });
      }
    
  },
  clickcontrol(e) {
    console.log("回到用户当前定位点");
    let { controlId } = e;
    let mpCtx = wx.createMapContext("map");
    mpCtx.moveToLocation();
  },
  park(){
    wx.setStorageSync('name', app.globalData.parkName)
    wx.setStorageSync('address', app.globalData.parkaddress);
    wx.setStorageSync('parklati', app.globalData.parkLatitude);
    wx.setStorageSync('parklong', app.globalData.parkLongitude);
    //wx.setStorageSync('iStop', true)//表示已停车
    wx.setStorageSync("isFind", "false")//表示未找到车
    let latitude = app.globalData.parkLatitude
    let longitude = app.globalData.parkLongitude
    let name=app.globalData.parkName
    let desc=app.globalData.parkDesc
    let address = app.globalData.parkaddress
    console.log("停车的经纬度 " + longitude +" "+ latitude)
    this.setData({
      latitude1: latitude,
      longitude1: longitude,
      markers: [{
        id: 0,
        longitude: longitude,
        latitude: latitude ,
        iconPath: '../imgs/stopcar.png',
        width: 50,
        height: 50,
        label:
          {
            content: "停车位置为"+name,
            bgColor: "#ffffff", // 
            color: "#4DB2B1", //不能用文本颜色值，只能用HEX
            fontSize: 13,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#4DB2B1",
            x: 10,
            y: -13,
            textAlign: "center",
            display: 'ALWAYS',
            padding: 2.5
          }
      }]
    })
    this.setData({
      flag:false,
      flag1:true,
      flag2:false,
      flag3:false
    })
    //wx.switchTab({
      //url: '../person/person',
    //  url: '../test/test',
    //})  
  },
  // notFindcar(e){
  //   console.log("nononono========")
  //   let { controlId } = e;
  //   let mpCtx = wx.createMapContext("map");
  //   mpCtx.moveToLocation();
  //   this.setData({
  //     flag:true,
  //     flag1: true,
  //     flag2: false,
  //     flag3: true,
  //     markers: []
  //   })
  //   // wx.showToast({
  //   //   title: '点地图蓝色圆圈！',
  //   //   icon: 'success',
  //   //   duration: 4000
  //   // })
  // },
  isFindcar() {
    console.log("yesyesyes========")
    wx.setStorageSync("isFind", "true")
    wx.removeStorageSync('name')
    wx.removeStorageSync('address')
    wx.removeStorageSync('parklati')
    wx.removeStorageSync('parklong')
    this.onLoad();
    this.setData({
      flag:false,
      flag1: false,
      flag2: true,
      flag3: true,
      markers:[]
    })
  },
  mapchange() {
    console.log("改变视野");
  },
  test(){
    wx.navigateTo({
      url: '../test/test',
    })
  }
})