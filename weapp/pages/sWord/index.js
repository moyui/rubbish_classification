import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({
    data: {
        search: '',
        loading: false,
        userSearch: null
    },
    onShow() {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                active: 0
            })
        }
    },
    onInputChange(event) {
        this.setData({
            search: event.detail
        })
    },
    onSearch() {
        Toast.loading({
            mask: true,
            message: '加载中...',
            duration: 0
        });
        wx.request({
            url: 'http://vip.yangxudong.broker.anjuke.test/size',
            method: 'GET',
            data: {
                keyword: this.data.search
            },
            success: (res) => {

            },
            complete: () => Toast.clear()
        })
    }
})
