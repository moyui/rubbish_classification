import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({
    data: {
        search: '',
        loading: false,
        userSearch: null,
        hisRecord: [],
        isHisOpen: false
    },
    onInputChange(event) {
        this.setData({
            search: event.detail
        })
    },
    onSearch() {
        this.saveHisRecord(this.data.search)
        Toast.loading({
            mask: false,
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
                console.log(res.data);
                this.setData({
                    userSearch: { 4: "电池类", 1: "纸箱" }
                })
            },
            complete: () => Toast.clear()
        })
    },
    onHisOpen() {
        const res = this.getHisRecord();
        this.setData({
            hisRecord: res,
            isHisOpen: true
        })
    },
    onHisClose() {
        this.setData({
            hisRecord: null,
            isHisOpen: false
        })
    },
    getHisRecord() {
        try {
            const res = wx.getStorageSync('searchWordHistory');
            return res
        } catch (e) {
            console.warn(e)
            return []
        }
    },
    saveHisRecord(newSearch) {
        const res = this.getHisRecord();
        // 寻找是否有重复值
        if (Array.isArray(res) && res.includes(newSearch)) {
            console.log('已经存过了')
            return true;
        }
        try {
            if (Array.isArray(res)) {
                wx.setStorageSync('searchWordHistory', [...res, newSearch])
            } else {
                wx.setStorageSync('searchWordHistory', [newSearch])
            }
            return true;
        } catch (e) {
            console.warn('存取失败')
        }
    }
})
