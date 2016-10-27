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
    Icon
} from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;

import codeimg from 'ASSETS/images/code.png';

// 页面身份验证
export default class RealNameAuthentication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            data: this.props.data
        }

    }
    handleRealNameComplete() {
        if (this.state.data.isValidation == true) {
            window.location.href = '/#/accountManagement/resetTradingPassword/Steps2';
        } else if (this.state.data.isValidation == false) {
            this.setState({visible: true});
        }
    }
    showModal() {
        this.setState({visible: true});
    }
    handleOk() {

        window.location.href = '/#/personalValidate/step1?_k=x8v39c';
        console.log('点击了确定，然后跳转去完善资料');
        this.setState({visible: false});
    }
    handleCancel(e) {
        console.log(e);
        this.setState({visible: false});
    }

    render() {
        return (
            <div>
                <Modal
                    title="钱途互联提示"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okText="朕前去完善资料"
                    cancelText="容妾身再考虑一下嘛"
                    wrapClassName="vertical-center-modal"
                    >
                    <p>
                        <span className="ant-exclamation-circle">
                            <Icon type="exclamation-circle" />
                        </span>
                        您的实名认证未完成，请尽快完成。
                    </p>
                </Modal>
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
