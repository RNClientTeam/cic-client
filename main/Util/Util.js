import CryptoJS from 'crypto-js';
import RNFetchBlob from 'react-native-fetch-blob'
const allKeys = {
    'gestureSecret': 'gestureSecret',
    'nativeCommonlyApp': 'nativeCommonlyApp',
    'userMessage': 'userMessage',
    'usernameAndPW': 'usernameAndPW'
};

export function padStart(num) {
    if(parseInt(num)/10>=1){
        return num
    }else{
        return '0'+parseInt(num)
    }
}

//统一管理所有本地数据对应的键名，方便查看
export function getKey(key) {
    return allKeys[key];
}

//MD5加密
export function MD5Encrypt(str) {
    return CryptoJS.MD5(str).toString().toUpperCase();
}

//AES解密
export function AESDecrypt(base64Str, secretKey) {
    //对base64Str进行base64解码
    var decodeBase64 = CryptoJS.enc.Base64.parse(base64Str);
    var decodeStr = CryptoJS.enc.Base64.stringify(decodeBase64);
    //对iv和key进行编码处理
    var iv = CryptoJS.enc.Utf8.parse('cn.com.cic-c.app');
    var key = CryptoJS.enc.Utf8.parse(secretKey);
    var decryptObj = CryptoJS.AES.decrypt(decodeStr, key, {iv: iv});
    var userMessage = decryptObj.toString(CryptoJS.enc.Utf8);
    return userMessage;
}

//判断是否为闰年,是则返回1，否则返回0
function isLeap(year) {
    return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
}

//获取当前月份第一天，以及最后一天
export function getCurrentMonS() {
    return `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().length === 1 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-01`
}

export function getCurrentMonE() {
    let days_per_month = new Array(31, 28 + isLeap(new Date().getFullYear()), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)
    return `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().length === 1 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-${days_per_month[new Date().getMonth()]}`
}

//获取签名sign
export function getSign(message, secret) {
    if (message.sign) {
        delete message.sign;
    }
    let sortKeys = Object.keys(message).sort();
    let str = '';
    for (let key in sortKeys) {
        str = str + sortKeys[key] + '=' + message[sortKeys[key]];
    }
    if (!secret) {
        secret = SECRETKEY;
    }
    console.log('参数：' + str + ' , secretKey：' + secret + ' , 签名：' + CryptoJS.SHA1(str + secret).toString());
    return CryptoJS.SHA1(str + secret).toString();
}

//时间戳
export function getTimestamp() {
    return Date.parse(new Date())
}

//随机id

export function getRandomId(n=19) {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let res = "";
    for (let i = 0; i < n; i++) {
        let id = Math.ceil(Math.random() * 35);
        res += chars[id];
    }
    return res+Date.parse(new Date());
}


//获取当期时间
export function getCurrentTime() {
    let now = new Date();

    let year = now.getFullYear();       //年
    let month = now.getMonth() + 1;     //月
    let day = now.getDate();            //日

    let hh = now.getHours();            //时
    let mm = now.getMinutes();          //分
    let ss = now.getSeconds();           //秒

    let clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

//获取当前日期
export function getCurrentDate() {
    let now = new Date();

    let year = now.getFullYear();       //年
    let month = now.getMonth() + 1;     //月
    let day = now.getDate();            //日

    let clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    return (clock)
}

export function uploadFile(url, body, successCallBack, failCallBack) {
    return RNFetchBlob
        .fetch('POST', url,{
            'Content-Type' : 'multipart/form-data'
        }, body)
        .progress((received,total)=>{
            console.log(received/total)
        })
        .then(response => response.json())
        .then(response => {
            successCallBack(response)
        }).catch(err => {
            console.log(err);
            failCallBack(err);
        });
}
