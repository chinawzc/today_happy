// pages/poem_detail/poem_detail.js
import config from '../../config/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poem: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchPoemDetail(options.id)
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

  fetchPoemDetail: function (id) {
    if(!id) {
      return;
    }
    wx.request({
      url: `${config.apiAva}/TangShiSongCi/LookUp`,
      data: {
        key:'ad348a6959f9400cbb3acfeb950da696',
        id,
      },
      method: 'GET',
      success: (res)=>{
        console.log(res.data.result);
        this.setData({
          poem: res.data.result
        })
      },
    });
  }
})