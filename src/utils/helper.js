
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
    },
    // 获取用户审核状态数据转换
    convertUserCheckStatus(itemsList) {
        let o = {};
        itemsList.forEach(n => {
            // 审核项Key，EnBasicInfo：企业_基本信息，EnOperator：企业_经办人，EnLegalPerson：企业_法人，EnPaper：企业_证件，EnAccount：企业_对公账号，PerBasicInfo：个人_基本信息，PerReal：个人_实名
            const key = n.checkKey;
            // 审核级别，1：系统；3：银行
            const level = {
                "1": "systemStatus",
                "3": "bankStatus"
            }[n.checkLevel];
            // 生成key对象
            if(!o[key]){
                o[key] = {};
            }
            o[key][level] = n.checkStatus;
        });
        return o;
    },
    //定位元素的错误并提示错误信息
    /** 
     * form  :this.props.form
     * fieldName: 字段名 res.fieldName
     * message:错误信息 res.message
    */
    focusError(form,fieldName,message){
        form.setFields({[fieldName]:{
            "errors":[new Error(message)],
            "value":form.getFieldValue(fieldName)
        }});
    }
}

export default helper;