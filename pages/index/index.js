// pages/index/index.js
import config from '../../config/config.js';
import util from '../../utils/util.js';
import moment from 'moment';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    calendar: [],
    weatherInfo: {},
    forecast: [],
    today: 1,
    todayInfo: '',
    loadingIndex: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setCalendar();
    this.getWeather();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      console.log(1)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      console.log('master-2');
      
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      console.log(2-'c')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  setCalendar:function (params) {
    const monthDays = moment().daysInMonth();
    const lastMonthDays = moment().subtract(1, 'month').daysInMonth();
    const firstDayWeek = moment().startOf('month').day();
    const today = parseInt(moment().format('DD'));
    let arrBefore = [];
    let arrThis = [];
    let arrAfter = [];
    for (let i = 0; i < firstDayWeek -1; i++) {
      arrBefore.unshift({month: 0, day: lastMonthDays - i});
    }
    for (let j = 1; j <= monthDays; j++) {
      arrThis.push({ month: 1, day: j, isToday: j === today});
    }
    for (let k = 0; k < 7- [...arrBefore, ...arrThis].length%7; k++) {
      arrAfter.push({month: 2, day: k + 1});
    }
    let arr = [...['一', '二', '三', '四', '五', '六', '七'], ...arrBefore, ...arrThis, ...arrAfter];
    this.setData({
      calendar: util.chunk(arr, 7),
      today,
      todayInfo: moment().format('YYYY年MM月')
    })
  },

  getWeather: function() {
    const self = this;
    wx.getLocation({
      success(res) {
        self.getWeatherGps(res.latitude, res.longitude);
      }
    })
  },

  getWeatherGps: function (lat, lng) {
    wx.request({
      url: `${config.api}/weather/gps`,
      data: {
        "appid": "bd9f99061353f64119f1836f3793f3f5",
        "lat": lat,
        "lng": lng,
        "type": "GPS",
      },
      success: (res) => {
        this.setData({
          weatherInfo: res.data.data || {},
          forecast: res.data.data.forecast7,
          loadingIndex: false
        });
        app.globalData.forecast7 = res.data.data.forecast7.slice(1);
        app.globalData.climate = res.data.data.climate;
      }
    })
  },
})
