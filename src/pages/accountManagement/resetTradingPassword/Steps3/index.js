// react 相关库
import React from 'react';

// antd 组件
import { Alert, Steps, Button } from 'antd';
import { Link } from 'react-router';
const Step = Steps.Step;

// 页面
export default class Steps3 extends React.Component {
    render() {
        return (
            <div>
                <Steps size="big" current={2} className="fn-mb-30">
                    <Step title="验证身份"/>
                    <Step title="重置交易密码"/>
                    <Step title="重置成功"/>
                </Steps>
                <div className="form-frame">
                    <div
                        style={{
                        width: '58%',
                        margin: '0 auto',
                        marginTop: 30
                        }}
                    >
                        <Alert message="重置交易密码成功" description="交易密码已重置成功，请妥善保管您的密码。
如需帮助请联系客服电话：400-106-6698。" type="info" showIcon/>
                        <div className="text-align-center fn-mt-30">
                            <Link to="/accountManagement/home" className="ant-btn ant-btn-primary">返回账户管理</Link>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
