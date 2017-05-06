import CryptoJS from 'crypto-js';
const allKeys = {
    'gestureSecret'     : 'gestureSecret',
    'nativeCommonlyApp' : 'nativeCommonlyApp',
    'userMessage'       : 'userMessage',
    'usernameAndPW'     : 'usernameAndPW'
};

//统一管理所有本地数据对应的键名，方便查看
export function getKey(key) {
    return allKeys[key];
}

//MD5加密
export function MD5Encrypt (str) {
    return CryptoJS.MD5(str).toString().toUpperCase();
}

//AES解密
export function AESDecrypt(base64Str, secretKey) {
    //对base64Str进行base64解码
    var decodeBase64 = CryptoJS.enc.Base64.parse(base64Str);
    var decodeStr  = CryptoJS.enc.Base64.stringify(decodeBase64);
    //对iv和key进行编码处理
    var iv = CryptoJS.enc.Utf8.parse('cn.com.cic-c.app');
    var key = CryptoJS.enc.Utf8.parse(secretKey);
    var decryptObj = CryptoJS.AES.decrypt(decodeStr, key, {iv: iv});
    var userMessage = decryptObj.toString(CryptoJS.enc.Utf8);
    return userMessage;
}

//获取修改密码时的签名sign
export function getSign(newPassword, oldPassword, userID, secretKey) {
    var str = 'newPassword='+newPassword+'oldPassword='+oldPassword+'userID='+userID+secretKey;
    return CryptoJS.SHA1(str).toString();
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

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return(clock);
}

//获取当前日期
export function getCurrentDate() {
    let now = new Date();

    let year = now.getFullYear();       //年
    let month = now.getMonth() + 1;     //月
    let day = now.getDate();            //日

    let clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    return (clock)
}
