// pages/addArt/addArt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: {
      title: '',
      content: ''
    },
    isSubmit: true,
    isSave: true
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
    const isSubmit = this.data.isSubmit;
    const _this = this;
    if (!isSubmit){
      wx.showModal({
        title: '是否要保存草稿？',
        showCancel: true,
        success: function (e) {
          if (e.confirm){
            _this.setData({
              isSave: true,
            })
          }else{
            _this.setData({
              isSave: false,
              value: {
                title: '',
                content: ''
              }
            })
          }
        }
      })
    }else{
      this.setData({
        isSave: false,
        value: {
          title: '',
          content: ''
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(33333);
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
  // 保存标题
  titleInput: function (e) {
    const value = JSON.stringify(this.data.value);
    this.setData({
      isSubmit: false,
      value: {
        ...JSON.parse(value),
        title: e.detail.value
      }
    })
  },
  // 保存内容
  contentInput: function (e) {
    const value = JSON.stringify(this.data.value);
    this.setData({
      isSubmit: false,
      value: {
        ...JSON.parse(value),
        content: e.detail.value
      }
    })
  },

  // 提交
  formSubmit: function (event) {
    const value = this.data.value;
    const userinfoStr = wx.getStorageSync('userinfo');
    const uesrinfoObj = JSON.parse(userinfoStr);
    
    if (value.title.trim() !== '' && value.content.trim() !== ''){
      wx.showLoading({
        mask: true
      });
      this.setData({
        isSubmit: true
      });
      wx.request({
        url: 'http://localhost:9999/art/write',
        method: 'POST',
        data: {
          ...value,
          nickName: uesrinfoObj.data.nickName,
          avatarUrl: uesrinfoObj.data.avatarUrl
        },
        success: function(result){
          console.log('result', result);
          if (result.statusCode === 200){
            wx.hideLoading();
            wx.showToast({
              title: 'write success!\^o^/',
              success: function () {
                 // 跳转到详情     
              }
            });
          }
        }
      })
    }else{
      wx.showToast({
        title: '标题和内容都不能为空',
        icon: 'none'
      })
    }
  }
})