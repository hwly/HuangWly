var CryptoJs = require('D:/nodejs/node_global/node_modules/crypto-js')

var r = function (data, ua) {
    var t = CryptoJs.MD5(ua).toString()
        , r = "" + (new Date).getTime()
        , i = r + parseInt(10 * Math.random(), 10);
    return {
        ts: r,
        bv: t,
        salt: i,
        sign: CryptoJs.MD5("fanyideskweb" + data + i + "Ygy_4c=r#e#4EX^NUGUc5").toString()
    }
}

// console.log(r('喜欢', "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"))