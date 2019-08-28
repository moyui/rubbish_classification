import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';

Page({
    Recorder: null,
    data: {
        loading: false,
        isRecording: false,
        userSearch: null
    },
    onLoad() {
        this.Recorder = wx.getRecorderManager();
        this.Recorder.onStop((res) => {
            const { tempFilePath } = res;
            this.uploadMp3Path(tempFilePath);
        })
    },
    onRecordingStart() {
        this.setData({
            isRecording: true
        })
        this.Recorder.start({
            format: 'mp3'
        });
    },
    onRecordingEnd() {
        this.setData({
            isRecording: false
        })
        this.Recorder.stop()
    },
    uploadMp3Path(filePath) {
        Toast.loading({
            mask: false,
            message: '上传中...',
            duration: 0
        });
        const uploadTask = wx.uploadFile({
            url: 'http://vip.yangxudong.broker.anjuke.test/work',
            filePath,
            header: {
                "Content-Type": "multipart/form-data"
            },
            name: 'video',
            success: (res) => {
                this.setData({
                    userSearch: this.formatData(res.data)
                })
            },
            fail: function (res) {
            },
            complete: () => Toast.clear()
        })
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
})