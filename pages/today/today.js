// pages/today/today.js
import config from '../../config/config.js';
import moment from 'moment';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todayList: [],
    daysList: [],
    objectDaysList: [],
    day: moment().format('MM月DD日')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchToday(moment().month() + 1, moment().date());
    const arr1 = [];
    const objectArr1 = [];
    const arr2 = [];
    const objectArr2 = [];
    for (let i = 1; i <= 12; i++) {
      arr1.push(i);
      objectArr1.push({ id: i, name: i })
    }
    for (let i = 1; i <= 31; i++) {
      arr2.push(i);
      objectArr2.push({ id: i, name: i })
    }
    this.setData({
      daysList: [arr1, arr2],
      objectDaysList: [objectArr1, objectArr2]
    })
    return;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  fetchToday: function(month, day) {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `${config.api}/todayOnhistory/queryEvent`,
      data: {
        "appid": 'ab794a0c39afdb2840ca4e0f70102a2e',
        "date": `${month}/${day}`,
      },
      success: (res) => {
        const data = res.data.data || [];
        data.reverse();
        this.setData({
          todayList: data
        });
        wx.hideLoading()
      }
    })
  },

  onChangeDay: function(e) {
    const arr = e.detail.value;
    const { daysList } = this.data;
    this.fetchToday(daysList[0][arr[0]], daysList[1][arr[1]]);
    this.setData({
      day: `${daysList[0][arr[0]]}月${daysList[1][arr[1]]}日`
    })
  },

  viewDetail: function(e) {
    wx.navigateTo({
      url: `../day_detail/day_detail?id=${e.currentTarget.dataset.id}`,
    })
  },
})