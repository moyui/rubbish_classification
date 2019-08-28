import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({
    data: {
        loading: false,
        isRecording: false,
        userSearch: null
    },
    onTakingPhoto() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            success: (res) => {
                const tempFilePaths = res.tempFilePaths
                if (Array.isArray(tempFilePaths)) {
                    this.uploadPhoto(tempFilePaths[0])
                }
            },
            fail: () => { },
            complete: () => { }
        })
    },
    uploadPhoto(filePath = '') {
        if (!filePath) {
            Toast.fail({
                message: '照片拍摄失败，请重传'
            });
        }
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
            name: 'photo',
            success: function (res) {
                console.log(res);
                // Toast.success('上传成功');
            },
            fail: function (res) {
                console.log(res);
                // Toast.fail('上传失败');
            }
        })
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