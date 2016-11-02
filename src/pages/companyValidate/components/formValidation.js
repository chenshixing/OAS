// 自定义验证 rule
import ruleType from 'UTILS/ruleType';

const rulesBase = {
    companyName : {
        rules:[
            {required: true, message: '企业名称不能为空'},
        ]
    },
    endTime:{
        rules:[
            {required: true, type: 'object', message: '营业执照到期日不能为空'},
        ]
    },
    name:{
        rules:[
            {required: true, message: '您的姓名不能为空'},
        ]
    },
    cellPhone:{
        rules:[
            {required: true, message: '填写人常用手机号码不能为空'},
            ruleType('mobile')
        ]
    },
    email: {
        rules: [
            ruleType('email')
        ]
    },
    bankAccount:{
        rules:[
            {required: true, message: '银行账号不能为空'},
        ]
    },
    bank:{
        rules:[
            {required: true, message: '开户行不能为空'},
        ]
    },
    province:{
        rules: [{ required: true, message: '所在省份不能为空'}],
    },
    city:{
        rules: [{ required: true, message: '所在城市不能为空'}],
    },
    branch:{
        rules:[
            {required: true, message: '分支行不能为空'},
        ]
    }
}
const rulesCommon = {
    businessLicenseRegistrationNumber: {
        rules: [
            {required: true, message: '营业执照注册号不能为空'},
        ]
    },
    organizationCode:{
        rules:[
            {required: true, message: '组织机构代码证不能为空'},
        ]
    }
};

const rulesMultiple = {
    unifiedSocialCreditCode: {
        rules: [
            {required: true, message: '统一社会信用代码不能为空'},
        ]
    },
};

const rulesAgent = {
    corporationName: {
        rules: [
            {required: true, message: '法定代表人姓名不能为空'},
        ]
    },
    corporationCellPhone: {
        rules: [
            ruleType('mobile')
        ]
    },
    corporationEmail: {
        rules: [
            ruleType('email')
        ]
    },
};

export default {
	rulesBase : rulesBase,
	rulesCommon : rulesCommon,
	rulesMultiple : rulesMultiple,
	rulesAgent : rulesAgent,
}