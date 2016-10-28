// react 相关库
import React from 'react';
import {Link} from 'react-router';

//less
import './style.less'


// antd 组件
import {
    Alert,
    Tag,
    Card,
    Row,
    Col,
    Icon,
    Modal,
    Select,
    Input
} from 'antd';
const Option = Select.Option;

//fetch
import { fetch } from 'UTILS';

// 页面
export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            isInviteCode: false
        }
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        fetch('/home/getLastLoginTime').then(res => {
          this.setState({data: res})
        });
    }
    handleAddBusiness() {
        this.setState({visible: true});
    }
    handleOk() {
        console.log('点击了确定');
        this.setState({visible: false});
    }
    handleCancel(e) {
        console.log(e);
        this.setState({visible: false});
    }
    handleChange(value) {
        if (value === "isInviteCode") {
            this.setState({isInviteCode: true})
        } else {
            this.setState({isInviteCode: false})
        }
        console.log(`selected ${value}`);
    }
    render() {
        console.log(this)
        return (
            <div style={{
                minHeight: "700px"
            }}>

                <Modal title="添加业务" visible={this.state.visible} onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} wrapClassName="vertical-center-modal">

                    <Row>
                        <Col span={4} offset={6}>
                            <label className="ant-form-item-label">请选择业务:</label>
                        </Col>
                        <Col span={8} offset={0}>
                            <Select defaultValue="lucy" style={{
                                width: 162
                            }} onChange={this.handleChange.bind(this)}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="yiminghe">yiminghe</Option>
                                <Option value="isInviteCode">使用邀请码</Option>
                            </Select>
                        </Col>
                    </Row>
                    {
                        this.state.isInviteCode
                        ?
                        <Row>
                            <Col span={4} offset={6}>
                                <label className="ant-form-item-label">邀请码:</label>
                            </Col>
                            <Col span={8} offset={0}>
                                <Input type="text" placeholder="请输入邀请码"/>
                            </Col>
                        </Row>
                        :
                        null
                    }

                </Modal>
                <div className="fn-pa-20">
                    首页

                    <p>
                        <Link to="/accountManagement/home">账户管理首页</Link>
                    </p>
                    <p>
                        <Link to="/accountManagement/basicInformation">账户管理基本信息</Link>
                    </p>
                    <p>
                        <Link to="/accountManagement/resetPassword/Steps1">账户管理修改密码</Link>
                    </p>
                    <p>
                        <Link to="/accountManagement/resetTradingPassword/Steps1">账户管理修改交易密码</Link>
                    </p>
                </div>

                <div className="fn-ptb-20 ">
                    <div className="ant-card-head" style={{
                        padding: 0
                    }}>
                        <h3 className="ant-card-head-title">
                            <span className="fn-mr-10">下午好，广东亿达有限公司</span>
                            <Tag color="blue">企业用户</Tag>
                        </h3>
                    </div>

                    <div className="alert alert-warning fn-mt-10">
                        企业账户管理
                        <span className="fn-plr-10">|</span>
                        上次登录时间：{this.state.data.data}
                    </div>
                </div>

                <div>
                    <div className="ant-card-head fn-mb-20" style={{
                        padding: 0
                    }}>
                        <h3 className="ant-card-head-title">
                            我的业务
                        </h3>
                    </div>

                    <Row>
                        <Link to="/accountManagement/home">
                            <Col span="6">
                                <Card>曲江秦汉唐文化票据融资</Card>
                            </Col>
                        </Link>

                        <Link to="/accountManagement/home">
                            <Col span="6">
                                <Card>内蒙古圣牧高科应收账款融资</Card>
                            </Col>
                        </Link>

                        <Link to="/accountManagement/home">
                            <Col span="6">
                                <Card>长江汽车应收账款融资</Card>
                            </Col>
                        </Link>

                        <a href="javascript:;" onClick={this.handleAddBusiness.bind(this)}>
                            <Col span="6">
                                <Card><Icon type="plus"/>添加业务</Card>
                            </Col>
                        </a>

                    </Row>

                </div>
            </div>
        );
    }
}
