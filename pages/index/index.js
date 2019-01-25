// pages/index/index.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    pageNo: 1,
    count: 1,
    isLast: false,
    type: 'index',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var pageNo = this.data.pageNo;
    if (this.data.dataList.length === 0) {
      this.fetchList(pageNo);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(e) {
    this.fetchList(1, false);

    this.setData({
      pageNo: 1,
      isLast: false,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var pageNo = this.data.pageNo;
    var count = this.data.count;
    if (pageNo < count) {
      this.fetchList(pageNo + 1, true);
      this.setData({
        pageNo: pageNo + 1
      })
    } else {
      this.setData({
        isLast: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 请求列表
  fetchList: function(pageNo, push = false) {
    var _this = this;
    wx.showLoading({
      mask: true
    });
    const data = this.data.dataList;
    wx.request({
      url: getApp().globalData.url + '/art/info',
      data: {
        pageNo: pageNo,
        pageSize: 9
      },
      method: 'GET',
      success: function(result) {
        const results = result.data.results;
        results.forEach(item => {
          item.time = util.formatTime(new Date(item.artCreateTime));
        })
        if (result.statusCode === 200) {
          _this.setData({
            dataList: push ? [...data, ...results] : results,
            count: result.data.pageCount
          })
          wx.hideLoading();
          !push && wx.stopPullDownRefresh();
        }
      }
    })
  },
  // 进入详情
  clickDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.request({
      url: getApp().globalData.url + '/art/detail',
      method: 'GET',
      data: {
        id: id
      },
      success: function(result) {
        if (result.statusCode === 200) {
          console.log('result.data', result);
          const data = JSON.stringify(result.data);
          wx.navigateTo({
            url: '/pages/detail/detail?data=' + data
          })
        } else {
          console.log('详情获取失败');
        }
      }
    })
  },
  toSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  }
})