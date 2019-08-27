import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

const RecorderManager = wx.getRecorderManager();

RecorderManager.onStop((res) => {
    const { tempFilePath } = res;
    // uploadMp3Path(tempFilePath);
})

const uploadMp3Path = (filePath) => {
    const uploadTask = wx.uploadFile({
        url: 'http://vip.yangxudong.broker.anjuke.test/work',
        filePath,
        header: {
            "Content-Type": "multipart/form-data"
        },
        name: 'video',
        success: function (res) {
            console.log(res);
            wx.showToast({
                title: '上传成功',
                icon: 'success',
                duration: 2000
            })
        },
        fail: function (res) {
            console.log(res);
        }
    })


}

Page({
    data: {
        active: 0,
        search: '',
        loading: false,
        isRecording: false
    },
    onRecordingStart() {
        this.setData({
            isRecording: true
        })
        RecorderManager.start({
            sampleRate: 16000,
            numberOfChannels: 1,
            encodeBitRate: 32000,
            format: 'mp3'
        });
    },
    onRecordingEnd() {
        this.setData({
            isRecording: false
        })
        RecorderManager.stop()
    },
    onChange(event) {
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
