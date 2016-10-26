// react 相关库
import React from 'react';
import { Link } from 'react-router';

// 页面组件
import Frame from 'COM/form/frame';

import codeimg from 'ASSETS/images/code.png';

// antd 组件
import {Form,Input,Button,Steps,Row,Col} from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;
// 页面
export default class Steps1 extends React.Component {
    constructor(props){
        super(props)
        this.state={
            visible: false,
            data:{
                realName:'xxx',
                identityCode:'12345',
                phoneNumber:'15999872092'
            }
        }
    }
    handleNext(){
        this.setState({
            visible: true,
        });
    }
    //马上认证
    handleOk() {
        this.setState({
            visible: false,
        });
    }
    //稍后认证，下一步
    handleCancel(e) {
        this.setState({
            visible: false,
        });
        console.log('e.target',e.target);
        if(e.target.tagName.toLowerCase()=='span' && e.target.className==''){
            window.location.href='/#/personalValidate/step3?_k=REPLACE';
        }
    }
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
                <Frame title="实名认证" className="">
                    <Row className="fn-mt-30">
                        <Col span={12} offset={6}>
                            <p>
                                姓名：{this.state.data.realName}，您的身份识别码已发送到手机133****1234。
                                <Link to='/'>没有收到短信，重新发送</Link>
                            </p>
                            <p>
                                请下载实名认证APP完成认证。
                                <Link to='/'>详细操作步骤</Link>
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-align-center fn-mt-30">
                        <p>扫描二维码下载实名认证APP，支持IOS和安卓</p>
                        <div className="pic"><img src={codeimg}/></div>
                    </Row>
                    <Row className="text-align-center fn-mt-30">
                        <p>实名认证成功后页面自动跳转，如没有跳转请点击 <Button type="primary">已完成认证</Button></p>
                    </Row>
                </Frame>
            </div>
        );
    }
}
