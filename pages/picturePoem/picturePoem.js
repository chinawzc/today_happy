// pages/picturePoem/picturePoem.js
import config from '../../config/config.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: '',
    picWord: '',
    picWords: [],
    poemList: [],
    isLoading: true,
    hasMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  selectPic: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (res)=>{
        this.setData({
          imageUrl: res.tempFilePaths[0]
        })
        wx.showLoading({
          title: '识别加载中',
        });
        var fileManager = wx.getFileSystemManager();
        fileManager.readFile({
          filePath: res.tempFilePaths[0],
          encoding: 'base64',
          success: (result) => {
            this.getToken(result.data)
          }
        })
      },
    });
  },

  getToken: function (image) {
    wx.request({
      url: `${config.apiBaidu}/oauth/2.0/token`,
      data:{
        grant_type:'client_credentials',
        client_id: 'v4Ggtzen34RrWouqrS7GXdsN',
        client_secret: '1uCL1bPLnT49PXr97Z0x6ix9OP8tYRdq'
      },
      success: (result) => {
        this.aiPicture(result.data.access_token, image)
      },
    })
  },

  aiPicture: function (access_token, image) {
    wx.request({
      url: `${config.apiBaidu}/rest/2.0/image-classify/v2/advanced_general?access_token=${access_token}`,
      data: { image, baike_num: 10 },
      header: { 'content-type':'application/x-www-form-urlencoded'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res)=>{
        if (!res.data.result) {
          wx.hideLoading();
          wx.showToast({
            title: res.data.error_msg,
            duration: 1500,
            mask: false,
            success: (result)=>{
              
            },
          });
          return;         
        }
        const picWord = res.data.result && res.data.result[0] && res.data.result[0].keyword || '';
        this.setData({
          picWord,
          picWords: res.data.result && res.data.result.slice(0, 10) || [],
          isLoading: false
        });
        this.getPoems(picWord);
      },
    });
  },

  getPoems: function (keyWord) {
    wx.request({
      url: `${config.apiAva}/TangShiSongCi/Search`,
      method: 'GET',
      data: {
        key: 'ad348a6959f9400cbb3acfeb950da696',
        keyWord,
        page: 1,
        rows: 10,
      },
      success: (res)=>{
        wx.hideLoading();
        this.setData({
          poemList: res.data.result,
          hasMore: res.data.total > 10,
          isLoading: false
        })
      },
    });
  },

  getPoemDetail: function (e) {
    wx.navigateTo({
      url: `../poem_detail/poem_detail?id=${e.currentTarget.dataset.id}`,
    })
  },

  goPoems: function (e) {
    app.globalData.wordInfo = e.currentTarget.dataset.wordinfo.baike_info || {};
    wx.navigateTo({
      url: `../poem_list/poem_list?keyword=${e.currentTarget.dataset.wordinfo.keyword}`,
    })
  }
})