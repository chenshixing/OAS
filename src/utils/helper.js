
/**
 * 常用工具类
 * wuyongquan
 */
let helper={
    //隐藏中间部分的手机号码
    hidenPhoneNumber(phoneNumber){
        //手机号码隐藏处理
        const reg = new RegExp("(\\d{3})(\\d{5})(\\d{3})");
        return phoneNumber.replace(reg,"$1*****$3");
    }
}

export default helper;