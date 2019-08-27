import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

const RecorderManager = wx.getRecorderManager();

RecorderManager.onStop((res) => {
    const { tempFilePath } = res;
    uploadMp3Path(tempFilePath);
})

const uploadMp3Path = (filePath) => {
    Toast({
        mask: false,
        message: '上传中，请稍后'
    });
    const uploadTask = wx.uploadFile({
        url: 'http://vip.yangxudong.broker.anjuke.test/work',
        filePath,
        header: {
            "Content-Type": "multipart/form-data"
        },
        name: 'video',
        success: function (res) {
            console.log(res);
            // Toast.success('上传成功');
        },
        fail: function (res) {
            console.log(res);
            // Toast.fail('上传失败');
        }
    })
}

Page({
    data: {
        loading: false,
        isRecording: false,
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
    }
})