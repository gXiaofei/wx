// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 搜索函数
  searchFunc: function (event) {
    console.log(event);

    const value = event.detail.value;

    if(value.trim() === ''){
      wx.showToast({
        title: '可以输入关键字搜索',
        icon: 'none'
      })
    }else{
      const _this = this;
      wx.request({
        url: getApp().globalData.url + '/art/search',
        method: 'GET',
        data: {
          value: value,
          pageNo: 1,
          pageSize: 9
        },
        success: function (result) {
          console.log(result);
          if (result.statusCode === 200){
            wx.hideLoading();
            _this.setData({
              dataList: [...result.data.results]
            })
          }else{
            console.log('接口获取失败');
          }
        }
      })
    }
  },
  clickDetail: function (e) {
    const id = e.currentTarget.dataset.id;
    wx.showLoading({
      mask: true
    });
    wx.request({
      url: getApp().globalData.url + '/art/detail',
      method: 'GET',
      data: {
        id: id
      },
      success: function (result) {
        if (result.statusCode === 200) {
          const data = JSON.stringify(result.data);
          wx.navigateTo({
            url: '/pages/detail/detail?data=' + data
          })
        } else {
          console.log('详情获取失败');
        }
      }
    })
  }
})