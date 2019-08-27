const RecorderManager = wx.getRecorderManager();

const buffer = new ArrayBuffer(16)
const int32View = new Int32Array(buffer);

// RecorderManager.onFrameRecorded((res) => {
//     const { frameBuffer, isLastFrame } = res
//     int32View.push(frameBuffer)
//     if (isLastFrame) {
//         uploadMp3Buffer();
//     }
// })

RecorderManager.onStop((res) => {
    const { tempFilePath } = res;
    uploadMp3Path(tempFilePath);
    // uploadMp3Buffer()
})


const uploadMp3Path = (filePath) => {
    // const uploadTask = wx.uploadFile({
    //     url: 'http://vip.yangxudong.broker.anjuke.test/work',
    //     filePath,
    //     header: {
    //         "Content-Type": "multipart/form-data"
    //     },
    //     name: 'video',
    //     success: function (res) {
    //         console.log(res);
    //         wx.showToast({
    //             title: '上传成功',
    //             icon: 'success',
    //             duration: 2000
    //         })
    //     },
    //     fail: function (res) {
    //         console.log(res);
    //     }
    // })


    wx.request({
        url: 'http://vip.yangxudong.broker.anjuke.test/work',
        method: 'POST',
        data: {
            url: 5
        }
    })
}

// const uploadMp3Buffer = () => {
//     console.log(int32View)
//     wx.request({
//         url: 'http://vip.yangxudong.broker.anjuke.test/work',
//         method: 'POST',
//         // header: {
//         //     "Content-Type": "application/x-www-form-urlencoded"
//         // },
//         header: {
//             "Content-Type": "application/octet-stream"
//         },
//         data: int32View
//     })
// }



Page({
    data: {
        text: "This is page data.",
        active: 0,
        buffer: new ArrayBuffer()
    },
    onChange(event) {
        console.log(event.detail);
    },
    onRecordingStart() {
        RecorderManager.start({
            sampleRate: 16000,
            numberOfChannels: 1,
            encodeBitRate: 32000,
            format: 'mp3',
            frameSize: 50
        });
    },
    onRecordingEnd() {
        RecorderManager.stop()
    }
})
