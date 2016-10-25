/**
 * 核身信息补充提示页(企业)
 * limit
 */
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

// antd 组件
import { Row, Col, Icon, Button} from 'antd';

//  样式
import  '../style.less';

class SupplementTips extends Component {
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
                        <h4>广东亿达有限公司</h4>
                        <p>您的认证资料未填写完，请尽快完成。<Button type="primary">继续填写</Button></p>
                        <p>如需修改已提交信息，请点击<Link to='/'>重新认证</Link>。</p>
                    </div>
                </Row>
                <Row className="tipsRow">
                    <Row className="infoRow">
                        <Col span={6} offset={6}>企业基本资料</Col>
                        <Col span={6}><span className="success-FontColor1">已提交</span></Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6} offset={6}>法定代表人认证：李彤</Col>
                        <Col span={6}><span className="error-FontColor1">待认证</span></Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6} offset={6}>委托代理人认证：文静</Col>
                        <Col span={6}><span className="success-FontColor1">已认证</span></Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6} offset={6}>证件资料上传</Col>
                        <Col span={6}><span className="success-FontColor1">已提交</span>/<span className="error-FontColor1">待提交资料</span></Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6} offset={6}>对公账户验证</Col>
                        <Col span={6}><span className="success-FontColor1">已认证</span>/<span className="error-FontColor1">未收到验证金</span>/<span className="error-FontColor1">待提交资料</span></Col>
                    </Row>
                </Row>
                <Row className="tipsRow pl-50">
                    <p>如您想更换账号，请点击 <Link to='/'>重新登录</Link>。</p>
                </Row>
            </div>
        );
    }
}

export default SupplementTips;

