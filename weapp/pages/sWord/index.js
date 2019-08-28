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
        this.onCancelHis();
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
                this.setData({
                    userSearch: this.formatData(res.data)
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
    onCancelHis() {
        this.setData({
            hisRecord: null,
            isHisOpen: false
        })
    },
    onClickHis(e) {
        this.setData({
            search: e.currentTarget.dataset.item
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
    saveHisRecord(newSearch, isCancal = false) {
        const res = this.getHisRecord();
        if (isCancal) {
            try {
                if (Array.isArray(res)) {
                    wx.setStorageSync('searchWordHistory', [])
                } else {
                    wx.setStorageSync('searchWordHistory', [])
                }
                return true;
            } catch (e) {
                console.warn('存取失败')
            }
            return;
        }

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
    },
    formatData(data) {
        const format = Object.keys(data).reduce((pre, item) => {
            return [...pre, { name: item, type: data[item], css: this.getType(data[item]) }]
        }, [])
        return format
    },
    getType(type) {
        switch (type) {
            case 0: return 'card-unknown';
            case 1: return 'card-retrive';
            case 2: return 'card-bad';
            case 3: return 'card-wet';
            case 4: return 'card-dry';
        }
    },
    onClearHis() {
        this.onCancelHis();
        this.saveHisRecord('', true);
    }
})
