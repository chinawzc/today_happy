// pages/dayDetail/day_detail.js
import config from '../../config/config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchDayDetail(options.id);
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

  fetchDayDetail: function(id) {
    wx.request({
      url: `${config.api}/todayOnhistory/queryDetail`,
      data: {
        "appid": "ab794a0c39afdb2840ca4e0f70102a2e",
        "date": id
      },
      success: (res) => {
        console.log(res)
        this.setData({
          detail: res.data.data || {}
        })
      }
    })
  }
})