/**
 * 个人核身step2
 * xing
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

import codeimg from 'ASSETS/images/code.png';

import { Link } from 'react-router';

import { IdentityModal } from 'BCOM/Modal/index';

// antd 组件
import { Alert, Steps, Button, Modal, Row, Col } from 'antd';
const Step = Steps.Step;

// 页面组件
import Frame from 'COM/form/frame';



// 页面组件（导出）
export default class PersonalValidate extends React.Component {
    constructor(props){
        super(props);
        this.state={
            identityVisible: false,
            data:{
                realName:'xxx',
                identityCode:'12345',
                phoneNumber:'15999872092'
            }
        }
    }

    showIdentityModal() {
        this.setState({
          identityVisible: true,
        });
        console.log(this);
    }

    closeIdentityModal() {
        this.setState({
          identityVisible: false,
        });
        console.log(this);
    }

    render() {
        return (
            <div>
                <Steps size="default" current={1} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="设置交易密码" />
                    <Step title="提交结果" />
                </Steps>
                <Frame title="实名认证" className="">
                    <Row className="fn-mt-30">
                        <Col span={12} offset={6}>
                            <p>
                                姓名：{this.state.data.realName}，您的身份识别码已发送到手机133****1234。
                                <Link to='/'>没有收到短信，重新发送</Link>
                            </p>
                            <p>
                                请下载实名认证APP完成认证。
                                <Button type="primary" onClick={this.showIdentityModal.bind(this)}>详细操作步骤</Button>
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
                <IdentityModal visible={ this.state.identityVisible } closeCallBack={ this.closeIdentityModal.bind(this) }/>
            </div>
        );
    }
}
