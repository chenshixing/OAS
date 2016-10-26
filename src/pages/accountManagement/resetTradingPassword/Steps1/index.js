// react 相关库
import React from 'react';
import { Link } from 'react-router';

// 页面组件
import Frame from 'COM/form/frame';

// antd 组件
import {Form,Input,Button,Steps} from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;
// 页面
export default class Steps1 extends React.Component {
    render() {
        return (
            <div>
                <Steps size="big" current={0} className="fn-mb-30">
                    <Step title="验证身份" />
                    <Step title="重置交易密码" />
                    <Step title="重置成功" />
                </Steps>
                <Frame title="验证身份" small="（您的账户已实名认证，为了您的账户安全，请使用实名认证资料进行校验。）">
                    <Form horizontal className="fn-mt-30">
                        <FormItem
                            id="control-input"
                            label="委托代理人"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            >
                            <label>李彤</label>
                        </FormItem>
                        <FormItem
                            id="control-input"
                            label="手机号码"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            >
                            <label>133****1234</label>
                        </FormItem>
                        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
                            <Button type="primary" htmlType="submit">发送身份识别码至手机</Button>
                            <Link to="/accountManagement/resetTradingPassword/Steps2">发送身份识别码至手机</Link>
                        </FormItem>


                    </Form>
                </Frame>
            </div>
        );
    }
}
