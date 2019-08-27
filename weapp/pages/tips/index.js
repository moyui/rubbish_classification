Page({
    data: {
        active1: 1
    },
    onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                active: 1
            })
        }
    },
    onClick(event) {
        wx.showToast({
            title: event.detail.index + 1,
        });
    }
});