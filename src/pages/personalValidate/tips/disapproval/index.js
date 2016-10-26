/**
 * 核审核不通过提示页(企业)
 * limit
 */
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

// antd 组件
import { Row, Col, Icon, Button} from 'antd';

//  样式
import  '../style.less';

class Disapproval extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tipsBox">
                <Row className="tipsRow">
                    <div className="ant-col-3 text-align-center">
                        <Icon type="cross-circle" className="tipsIcon across"/>
                    </div>
                    <div className="ant-col-18">
                        <h4>您好，李彤</h4>
                        <p>您的资料审核不通过，具体原因请联系分行客户经理。</p>
                        <p>您需要修改资料后重新提交认证申请，如有疑问请联系客服电话：400-106-6698。</p>
                    </div>
                </Row>
                <Row className="tipsRow">
                    <Row className="infoRow">
                        <Col span={6}>个人基本资料</Col>
                        <Col span={6}><span className="success-FontColor1">已提交</span></Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6}>法定代表人认证：李彤</Col>
                        <Col span={6}><span className="error-FontColor1">待认证</span></Col>
                        <Col span={6}><Link to='/'>重新发送验证短信</Link></Col>
                    </Row>
                    <Row>如确认申请资料无误，请重新申请认证，点击 <Button type="primary">提交认证申请</Button></Row>
                </Row>
                <Row className="tipsRow pl-50">
                    <p>如您想更换账号，请点击 <Link to='/'>重新登录</Link>。</p>
                </Row>
            </div>
        );
    }
}

export default Disapproval;

