// pages/poem_list/poem_list.js
import config from '../../config/config.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poemList: [],
    wordInfo: {},
    page: 1,
    isLoadingMore: false,
    isAllDes: false,
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPoems(options.keyword, 1);
    this.setData({
      wordInfo: app.globalData.wordInfo,
      keyWord: options.keyword
    })
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
    const { totalCount, poemList } = this.data;
    if (totalCount <= poemList.length) {
      return;
    }
    this.setData({
      isLoadingMore: true,
      page: this.data.page+1
    })
    this.getPoems(this.data.keyWord, this.data.page + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getPoems: function (keyWord, page) {
    wx.request({
      url: `${config.apiAva}/TangShiSongCi/Search`,
      method: 'GET',
      data: {
        key: 'ad348a6959f9400cbb3acfeb950da696',
        keyWord,
        page,
        rows: 20,
      },
      success: (res) => {
        this.setData({
          poemList: [...this.data.poemList, ...res.data.result],
          totalCount: res.data.total,
          isLoadingMore: false
        })
      },
    });
  },

  getPoemDetail: function (e) {
    wx.navigateTo({
      url: `../poem_detail/poem_detail?id=${e.currentTarget.dataset.id}`,
    })
  },

  seeMoreDes: function () {
    this.setData({
      isAllDes: true
    })
  }
})