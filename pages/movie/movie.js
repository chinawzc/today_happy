// pages/movie/movie.js
import config from '../../config/config.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchMove('')
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

  fetchMove: function(day) {
    wx.request({
      url: `${config.api}/promovie/piaofang`,
      data: {
        "appid": 'b53aebaf681b1cefdccceb1939089546',
        "date": day
      },
      success: (res) => {
        console.log(res)
        let data = (res.data || {}).data || [];
        for(let i=0; i<data.length; i++) {
          data[i].duration = data[i] && data[i].duration.substring(2)
        }
        this.setData({
          movieList: (res.data || {}).data || []
        })
      }
    })
  }

})