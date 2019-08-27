Page({
    data: {
        active: 1,
        active1: 1
    },
    onClick(event) {
        wx.showToast({
          title: event.detail.index + 1,   
        });
      }
    });