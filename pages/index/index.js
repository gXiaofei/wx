// pages/index/index.js
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
    this.fetchList(pageNo);
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
    if (pageNo < count){
      this.fetchList(pageNo + 1);
      this.setData({
        pageNo: pageNo + 1
      })
    }else{
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
  fetchList: function(pageNo ,push=true) {
    var _this = this;
    wx.showLoading({
      mask: true
    });
    const data = this.data.dataList;
    wx.request({
      url: 'http://localhost:9999/art/info',
      data: {
        pageNo: pageNo,
        pageSize: 9
      },
      method: 'GET',
      success: function(result) {
        console.log(result);
        if (result.statusCode === 200) {
          _this.setData({
            dataList: push ? [...data, ...result.data.results] : result.data.results,
            count: result.data.pageCount
          })
          wx.hideLoading();
          !push && wx.stopPullDownRefresh();
        }
      }
    })
  }
})