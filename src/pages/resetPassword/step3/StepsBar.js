// react 相关库
import React from 'react';



// antd 组件
import {Steps} from 'antd';
const Step = Steps.Step;


// 页面身份验证
export default class StepsBar extends React.Component {
    render() {
        return (
                <Steps size="default" current={2} className="fn-mb-30">
                    <Step title="账户信息" />
                    <Step title="验证身份" />
                    <Step title="重置登录密码" />
                    <Step title="重置成功" />
                </Steps>
        );
    }
}
