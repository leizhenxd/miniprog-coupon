// pages/optimus/optimus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: []
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
    this.initData();
  },
  initData: function(){
    var _this = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://yhq.leizhenxd.com/coupon/getOptimus',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'form-data' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.data) {
          _this.setData({
            items: res.data.data
          })
        }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  copyPwd: function (e) {
    console.log(e)
    var _this = this;
    wx.showModal({
      title: '提示',
      content: e.currentTarget.dataset.item.copyTip,
      showCancel: false,
      success: function () {
        wx.showLoading({
          title: '加载中',
        })
        wx.request({
          url: 'https://yhq.leizhenxd.com/coupon/getTbPwd', //仅为示例，并非真实的接口地址
          data: e.currentTarget.dataset.item,
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            wx.setClipboardData({
              data: res.data.data
            })
          },
          complete: function () {
            wx.hideLoading()
          }
        })
      }
    })
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
    this.initData();
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

  }
})
