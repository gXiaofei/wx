App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 获取本地缓存
    const userinfo = wx.getStorageSync('userinfo');
    if(userinfo){
      const currentTime = new Date().getTime();
      const loginTime = JSON.parse(userinfo).loginTime;
      // 3天
      if(currentTime - loginTime > 3600 * 1000 * 24 * 3){
        try {
          wx.removeStorageSync('userinfo');
        } catch (e) {
          console.log('删除缓存失败')
        }
      }
    }else{
      
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData: {
    url: 'http://localhost:9999',
    // url: 'https://qwerdf.vip',
  }
})
