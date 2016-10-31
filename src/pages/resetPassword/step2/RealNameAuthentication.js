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
import {IdentityModal, SupplementModal} from 'BCOM/Modal/index';



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
            window.location.href = '/#/resetPassword/step3';
        } else if (this.state.isValidation == false) {
            this.setState({visible: true});
        }
    }
    showModal() {
        this.setState({visible: true});
    }
    handleOk() {
        console.log('点击了确定');
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
        fetch('/api/home/getLastLoginTime').then(res => res.json()).then(res => {
            alert(JSON.stringify(res));
        })
    }

    render() {
        return (
            <div>
                <Modal title="提示" visible={this.state.visible} wrapClassName="vertical-center-modal" footer={[
                    <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this)}>我知道了</Button>
                ]}>
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
                                姓名：{this.state.data.realName}，您的身份识别码已发送到手机133****1234。
                                <a href='javascript:;' onClick={this.handleMessage.bind(this)}>没有收到短信，重新发送</a>
                            </p>
                            <p className="fn-mt-10">
                                请下载实名认证APP完成认证。
                                <Button type="primary" onClick={this.showIdentityModal.bind(this)}>查看详细操作步骤</Button>
                                <IdentityModal visible={this.state.identityVisible} closeCallBack={this.closeIdentityModal.bind(this)}/>
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-align-center fn-mt-30">
                        <p className="fn-mb-10">扫描二维码下载实名认证APP，支持IOS和安卓</p>
                        <div className="pic"><img src={codeimg}/></div>
                    </Row>
                    <Row className="text-align-center fn-mt-30">
                        <p>
                            实名认证成功后页面自动跳转，如没有跳转请点击
                            <Button type="primary" className="fn-ml-10" onClick={this.handleRealNameComplete.bind(this)}>已完成认证</Button>
                            <Link type="primary" className="fn-ml-10" to='/resetPassword/step3'>已完成认证</Link>
                        </p>
                    </Row>
                </Frame>
            </div>
        );
    }
}
