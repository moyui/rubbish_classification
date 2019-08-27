Page({
    data: {
        active: 1,
        active1: 1
    },
    onChange(event) {
        switch (event.detail) {
            case 0: wx.navigateTo({
                url: '/pages/search/index'
            }); break;
            case 1: wx.navigateTo({
                url: '/pages/tips/index'
            }); break;
            case 4: wx.navigateTo({
                url: '/pages/tag/index'
            }); break;
        }
    },
    onClick(event) {
        wx.showToast({
          title: event.detail.index + 1,   
        });
      }
    });