Page({
    data: {},
    onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                active: 0
            })
        }
    },
    onTapToWord() {
        wx.navigateTo({ url: '/pages/sWord/index' })
    },
    onTapToVoice() {
        wx.navigateTo({ url: '/pages/sVoice/index' })
    },
    onTapToPic() {
        wx.navigateTo({ url: '/pages/sPic/index' })
    }
})
