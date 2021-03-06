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
    isSave: true,
    isLogin: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const userinfo = wx.getStorageSync('userinfo');
    if (userinfo) {
      this.setData({
        isLogin: true,
      })
    } else {
      this.setData({
        isLogin: false
      })
    }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    const isSubmit = this.data.isSubmit;
    const _this = this;
    if (!isSubmit) {
      wx.showModal({
        title: '是否要保存草稿？',
        showCancel: true,
        success: function(e) {
          if (e.confirm) {
            _this.setData({
              isSave: true,
            })
          } else {
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
    } else {
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
  onUnload: function() {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 保存标题
  titleInput: function(e) {
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
  contentInput: function(e) {
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
  formSubmit: function(event) {
    const value = this.data.value;
    const userinfoStr = wx.getStorageSync('userinfo');
    const uesrinfoObj = JSON.parse(userinfoStr);

    if (value.title.trim() !== '' && value.content.trim() !== '') {
      wx.showLoading({
        mask: true
      });
      this.setData({
        isSubmit: true
      });
      wx.request({
        url: getApp().globalData.url + '/art/write',
        method: 'POST',
        data: {
          ...value,
          nickName: uesrinfoObj.data.nickName,
          avatarUrl: uesrinfoObj.data.avatarUrl
        },
        success: function(result) {
          if (result.statusCode === 200) {
            wx.hideLoading();
            wx.showToast({
              title: 'write success!\^o^/',
              success: function() {
                // 跳转到详情     
                wx.navigateTo({
                  url: '/pages/detail/detail?data=' + JSON.stringify(result.data),
                });
              }
            });
          }
        }
      })
    } else {
      wx.showToast({
        title: '标题和内容都不能为空',
        icon: 'none'
      })
    }
  },
  // 获取用户信息
  getuserinfo: function(e) {
    if (e.detail.userInfo) {
      e.detail.userInfo.loginTime = new Date().getTime();
      const _this = this;
      wx.request({
        url: getApp().globalData.url + '/users/login',
        method: "POST",
        data: {
          ...e.detail.userInfo
        },
        success: function(data) {

          if (data.statusCode === 200) {
            wx.setStorageSync('userinfo', JSON.stringify(data));
            _this.setData({
              isLogin: true
            })
          } else {
            console.log(data);
            console.log('服务器问题');
          }
        }
      })
    } else {
      console.log('拒绝登录');
      wx.navigateBack({
        delta: 1
      })
    }
  }
})