let AipSpeech = require("baidu-aip-sdk").speech;
let fs = require('fs');
var exec = require('child_process').exec;

const koaBody = require('koa-body')
const qs = require('querystring');

var cmdStr = 'ffmpeg -i /Users/moyui/sean/Mycode/rubbish_classification/node/go.mp3 -f s16le -ar 16000 -ac 1 -acodec pcm_s16le /Users/moyui/sean/Mycode/rubbish_classification/node/pcm16k.pcm';

const Koa = require('koa');
const app = new Koa();

var request = require('request');


app.use(koaBody({
    multipart: true, // 支持文件上传
    // encoding:'gzip'
    // formidable:{
    //   uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    //   keepExtensions: true,    // 保持文件的后缀
    // }
}));

app.use(async ctx => {
    // console.log(ctx.request.files.video)


    let data = fs.readFileSync(ctx.request.files.video.path);


    ctx.body = await new Promise((resolve) => {
        fs.writeFile('./go.mp3', data, function (err) {
            exec(cmdStr, function (err, stdout, stderr) {
                let client = new AipSpeech(0, '6EaS0RO9Euicpo6TBw2tWmaL', 'GuUqTE5jkvyf9xxcoZ1q3u6z5ShlvcDM');

                let voice = fs.readFileSync('./pcm16k.pcm');

                let voiceBase64 = new Buffer(voice);

                // 识别本地语音文件
                client.recognize(voiceBase64, 'pcm', 16000).then(function (result) {

                    let res = result

                    var options = {
                        method: 'get',
                        url: `http://192.168.19.170:8080/app-msc-web/consultant/getGarbage/${qs.escape(res.result[0])}.json`
                    };

                    console.log(options)


                    request(options, function (err, res, body) {
                        if (err) {
                            console.log(err)
                        } else {
                            resolve(body)
                        }
                    })
                }, function (err) {
                    console.log(err);
                });
            });

        });
    })
});

app.listen(9000);
