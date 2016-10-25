/**
 * 个人核身step4
 * xing
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

import codeimg from 'ASSETS/images/code.png'


// antd 组件
import { Alert, Steps, Button } from 'antd';
const Step = Steps.Step;

// 页面组件
import Frame from 'COM/form/frame';



// 页面组件（导出）
export default class PersonalValidate extends React.Component {


    render() {
        return (
            <div>
                <Steps size="big" current={3} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="企业安全认证" />
                    <Step title="提交结果" />
                </Steps>
                <div className="form-frame">
                    <div style={{ width: '58%', margin: '0 auto',marginTop:30 }}>
                        <Alert message="审核申请已提交，小额验证金请在 47:59:59 内完成支付"
                               description="我们将尽快完成审核，结果将以短信通知您。
                                如需修改信息请联系客服电话：400-106-6698。"
                               type="info"
                               showIcon
                        />
                        <div className="text-align-center fn-mt-30">
                            <Button type="primary">返回首页</Button>
                        </div>
                    </div>


                </div>
            </div>

        );
    }
}
