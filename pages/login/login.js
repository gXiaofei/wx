// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCache: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success(res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
    // 进来先判断本地是否存在缓存
    const userinfo = wx.getStorageSync('userinfo');
    if(userinfo){
      this.setData({
        isCache: true
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
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
  // 获取用户信息
  getuserinfo: function(e) {
    if (e.detail.userInfo){
      wx.request({
        url: 'http://localhost:9999/users/login',
        method: "POST",
        data: {
          ...e.detail.userInfo
        },
        success: function(data){
          if (data.statusCode === 200){
            wx.setStorageSync('userinfo', JSON.stringify(data));
            wx.switchTab({
              url: '/pages/index/index',
            })
          }else{
            console.log(data);
            console.log('服务器问题');
          }
        }
      })
    }else{
      console.log('拒绝登录');
      wx.navigateBack({ delta: 1 })
    }
  }
})