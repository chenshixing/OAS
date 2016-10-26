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
        this.state = {
            dataSource : [{
              key: '1',
              name: '中金支付有限公司客户备付金',
              bank: '招商银行',
              account: '1109 0799 6610 999',
              branch: '北京分行宣武门支行'
            }],
            columns : [{
              title: '账户名称',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: '开户行',
              dataIndex: 'bank',
              key: 'bank',
            }, {
              title: '银行账号',
              dataIndex: 'account',
              key: 'account',
            }, {
              title: '分支行',
              dataIndex: 'branch',
              key: 'branch',
            }]
        }
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
                        <p>请根据您的实际情况尽快完成以下未认证项，如需修改信息请联系客服电话：400-106-6698。</p>
                    </div>
                </Row>
                <Row className="tipsRow">
                    <Row className="infoRow">
                        <Col span={6}>企业基本资料</Col>
                        <Col span={6}><span className="success-FontColor1">已提交</span></Col>
                        <Col span={6}><Link to='/'>修改资料</Link></Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6}>法定代表人认证：李彤</Col>
                        <Col span={6}><span className="error-FontColor1">待认证</span></Col>
                        <Col span={6}><Link to='/'>重新发送验证短信</Link></Col>
                        <Col span={6}><Link to='/'>如何实名认证？</Link></Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6}>委托代理人认证：文静</Col>
                        <Col span={6}><span className="error-FontColor1">待认证</span></Col>
                        <Col span={6}><Link to='/'>重新发送验证短信</Link></Col>
                        <Col span={6}><Link to='/'>如何实名认证？</Link></Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6}>证件资料上传</Col>
                        <Col span={6}><span className="error-FontColor1">待提交资料</span></Col>
                        <Col span={6}>你可以 <Link to='/'>线上提交</Link> 或者使用 <Link to='/'>手机APP提交</Link> 。</Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6}>对公账户验证</Col>
                        <Col span={6}><span className="error-FontColor1">未收到验证金</span></Col>
                        <Col span={12}>
                            <p>请在<span>47:59:59</span>内完成支付</p>
                            <p>如您确定已向下面的指定账户支付 0.10 元，请联系客服。</p>
                            <Table dataSource={this.state.dataSource} columns={this.state.columns} pagination={false}/>
                            <p>如对公账户信息有误，请点击 <Link to='/'>修改对公账户</Link>。</p>
                        </Col>
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

