Component({
  data: {
    selected: 0,
    color: "#000",
    selectedColor: "#ff0000",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/pages/images/home_black.png",
      selectedIconPath: "/pages/images/home_red.png",
      text: "首页"
    }, {
      pagePath: "/pages/optimus/optimus",
      iconPath: "/pages/images/cart_black.png",
      selectedIconPath: "/pages/images/cart_red.png",
      text: "精品"
    }
    // , {
    //   pagePath: "/pages/my/my",
    //   iconPath: "/pages/images/user_center_black.png",
    //   selectedIconPath: "/pages/images/user_center_red.png",
    //   text: "我的"
    // }
    ]
  },
  attached() {
    
  },
  methods: {
    switchTab(e) {
      console.log(e.currentTarget.dataset)
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})