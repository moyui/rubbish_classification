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
        console.log(filePath)
        const uploadTask = wx.uploadFile({
            // url: 'http://vip.yangxudong.broker.anjuke.test/work',
            url: 'http://10.249.23.100:9000',
            filePath,
            header: {
                "Content-Type": "multipart/form-data"
            },
            name: 'video',
            success: (res) => {
                this.setData({
                    userSearch: this.formatData(JSON.parse(res.data))
                })
            },
            fail: function (res) {
            },
            complete: () => Toast.clear()
        })
        // setTimeout(() => {
        //     Toast.clear();

        //     const random = Math.round(Math.random() * 9);

        //     this.setData({
        //         userSearch: this.formatData(rd[random])
        //     })
        // }, 3500)
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