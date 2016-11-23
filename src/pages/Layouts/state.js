/**
 * for Layouts
 */
import { restate } from 'UTILS';

class State {
    constructor() {
        this.state = {
            loading: false, // 全局ajax的loading状态
            sysInfo: { // 全局用到的业务系统信息
                "logoutUrl": "",
                "loginUrl": "",
                "appQrcodeUrl": ""
            }
        };
        this.sessionId = 'layouts_state';
    }
}

export default restate.createState(State)