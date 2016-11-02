// react 相关库
import React from 'react';
import {Link} from 'react-router';

// 页面组件
import Frame from 'COM/form/frame';

// antd 组件
import {
    Form,
    Input,
    Button,
    Steps,
    Row,
    Col,
    Modal,
    Icon,
    message
} from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;

import codeimg from 'ASSETS/images/code.png';
import {IdentityModal, SupplementModal} from 'BCOM/Modal/index';
import {fetch} from 'UTILS';


// 页面身份验证
export default class RealNameAuthentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            data: this.props.data,
            isValidation: this.props.isValidation,
            identityVisible: false
        }

    }
    handleRealNameComplete() {
        if (this.state.isValidation == true) {
            window.location.href = '/#/accountManagement/resetTradingPassword/Steps2';
        } else if (this.state.isValidation == false) {
            this.setState({visible: true});
        }
    }
    showModal() {
        this.setState({visible: true});
    }
    handleOk() {

        //window.location.href = '/#/personalValidate/step1?_k=x8v39c';
        console.log('点击了确定，然后跳转去完善资料');
        this.setState({visible: false});
    }
    handleCancel(e) {
        console.log(e);
        this.setState({visible: false});
    }
    showIdentityModal() {
        this.setState({identityVisible: true});
        console.log(this);
    }

    closeIdentityModal() {
        this.setState({identityVisible: false});
        console.log(this);
    }

    handleMessage() {

        fetch('/common/smsAutoCode',{
            body:{
                "businesstype": "register"
            }
        }).then(res=>{
            message.success('验证码发送发送成功...');
        })
    }

    render() {
        return (
            <div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    footer={[
          	            <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this)}>
          	              我知道了
          	            </Button>,
                    ]}
                    wrapClassName="vertical-center-modal">
                    <p>
                        <span className="ant-exclamation-circle">
                            <Icon type="exclamation-circle"/>
                        </span>
                        您的实名认证未完成，请尽快完成。
                    </p>
                </Modal>
                <Frame title="实名认证" className="">
                    <Row className="fn-mt-30">
                        <Col span={12} offset={6}>
                            <p>
                                姓名：{this.props.getdesensitizemobile.name}，您的身份识别码已发送到手机{this.props.getdesensitizemobile.mobile}。
                                <a href='javascript:;' onClick={this.handleMessage.bind(this)}>没有收到短信，重新发送</a>
                            </p>
                            <p>
                                请下载实名认证APP完成认证。
                                <Button type="primary" onClick={this.showIdentityModal.bind(this)}>查看详细操作步骤</Button>
                                <IdentityModal visible={this.state.identityVisible} closeCallBack={this.closeIdentityModal.bind(this)}/>
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-align-center fn-mt-30">
                        <p>扫描二维码下载实名认证APP，支持IOS和安卓</p>
                        <div className="pic"><img src={codeimg}/></div>
                    </Row>
                    <Row className="text-align-center fn-mt-30">
                        <p>
                            实名认证成功后页面自动跳转，如没有跳转请点击
                            <Button type="primary" onClick={this.handleRealNameComplete.bind(this)}>已完成认证</Button>
                        </p>
                    </Row>
                </Frame>
            </div>
        );
    }
}
