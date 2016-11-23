/**
 * indexState
 * 主要用作全局获取登录后的状态
 * 
 * by koen
 * 2016/11/16
 */
import { restate } from 'UTILS';

class State {
    constructor () {
        // 初始化的state数据
        this.state = {
            data: {
                "userType": 0, // 用户类型，1：个人；2：企业
                "step": 0, // 执行到的步骤，0：未开始，1：执行到第1步，2：执行到第2步，3：执行到第3步，4：执行到第4步，999：完成
                "bankCheckStatus": 0, // 银行审核状态，-1：审核中，0：审核不通过，1：审核通过
                "showName": "", // 显示用户名称
                "loginName": "" // 登录名
            },
            sysInfo: { // 全局用到的业务系统信息
                "logoutUrl": "",
                "loginUrl": "",
                "appQrcodeUrl": ""
            }
        };
        this.sessionId = 'redirect_state';
    }
}

export default restate.createState(State)
