Page({
    data: {
        active: 0
    },
    onChange(event) {
        this.setData({
            active: event.detail
        });
        switch (event.detail) {
            case 0: wx.switchTab({
                url: '/pages/search/index'
            }); break;
            case 1: wx.switchTab({
                url: '/pages/tips/index'
            }); break;
        }
    }
})