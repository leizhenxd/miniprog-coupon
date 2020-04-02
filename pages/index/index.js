//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    queryData: '',
    focus: false,
    haveResult: false,
    haveResultTip: false,
    coupon: null
  },
  //事件处理函数
  onLoad: function () {
    this.setData({
      search: this.search.bind(this)
    })
  },
  onReady: function () {

  },
  focusSearch: function (e) {
    var _this = this;
    wx.getClipboardData({
      success(res1) {
        if (res1.data && res1.data != '')
          wx.showModal({
            title: '提示',
            content: '检测到复制了内容，要粘贴吗?',
            success(res) {
              if (res.confirm) {
                _this.setData({
                  queryData: res1.data,
                  focus: true
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
              wx.setClipboardData({
                data: ''
              })
            }
          })
      }
    })
  },
  copyAuthor: function(){
    wx.setClipboardData({
      data: 'yhq_leizhenxd',
    })
  },
  getCouponInfo: function (e) {
    this.setData({
      queryData: e.detail.value
    })
    var _this = this;
    if (e.detail.value == '') return;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://yhq.leizhenxd.com/coupon/query', //仅为示例，并非真实的接口地址
      data: {
        q: _this.data.queryData
      },
      method: 'GET',
      header: {
        'content-type': 'form-data' // 默认值
      },
      success(res) {
        if (res.data.data) {
          _this.setData({
            haveResult: true,
            haveResultTip: false,
            coupon: res.data.data
          })
        }
        else {
          _this.setData({
            haveResult: false,
            haveResultTip: true
          })
        }
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  search: function (value) {
    return new Promise((resolve, reject) => {

    })
  },
  selectResult: function (e) {

  },
  copyPwd: function (e) {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: _this.data.coupon.copyTip,
      showCancel: false,
      success: function () {
        wx.setClipboardData({
          data: e.currentTarget.dataset.url
        })
      }
    })
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  onShareAppMessage: function () {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
