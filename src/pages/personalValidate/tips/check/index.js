/**
 * 核审核不通过提示页(企业)
 * limit
 */
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

// antd 组件
import { Row, Col, Icon, Button, Table} from 'antd';

//  样式
import  '../style.less';

class Check extends Component {
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
                        <Icon type="exclamation-circle" className="tipsIcon exclamation"/>
                    </div>
                    <div className="ant-col-18">
                        <h4>您好，李彤</h4>
                        <p>您的认证资料未填写完，请尽快完成。<Button type='primary' size='small'>继续填写</Button></p>
                        <p>请尽快完成以下认证条件，如需修改信息请联系客服电话：400-106-6698。</p>
                    </div>
                </Row>
                <Row className="tipsRow">
                    <Row className="infoRow">
                        <Col span={6}>个人基本资料</Col>
                        <Col span={6}><span className="success-FontColor1">已提交</span></Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6}>实名认证</Col>
                        <Col span={6}><span className="error-FontColor1">待认证</span></Col>
                        <Col span={6}><Link to='/'>重新发送验证短信</Link></Col>
                    </Row>
                </Row>
                <Row className="tipsRow pl-50">
                    <p>如您想更换账号，请点击 <Link to='/'>重新登录</Link>。</p>
                </Row>
            </div>
        );
    }
}

export default Check;

