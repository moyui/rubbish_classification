Page({
    data: {
        active: 1
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
