// react 相关库
import React from 'react';
import {Link} from 'react-router';

// antd 组件
import {Alert, Tag, Card,Row,Col,Icon} from 'antd';

// 页面
export default class Home extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:{}
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        fetch('/api/home/getLastLoginTime').then(res => res.json()).then(res => {
            let loadData = res;
            this.setState({
                data:loadData
            })
        })
    }
    render() {
        console.log(this)
        return (
            <div style={{minHeight:"700px"}}>
                <div className="fn-pa-20">
                    首页

                    <p>
                        <Link to="/accountManagement/home">账户管理首页</Link>
                    </p>
                    <p>
                        <Link to="/accountManagement/basicInformation">账户管理基本信息</Link>
                    </p>
                    <p>
                        <Link to="/accountManagement/resetPassword">账户管理修改密码</Link>
                    </p>
                    <p>
                        <Link to="/accountManagement/resetTradingPassword/Steps1">账户管理修改交易密码</Link>
                    </p>
                </div>

                <div className="fn-ptb-20 ">
                    <div className="ant-card-head" style={{padding:0}}>
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
                    <div className="ant-card-head fn-mb-20" style={{padding:0}}>
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
                        <Col span="6">
                            <Card>内蒙古圣牧高科应收账款融资</Card>
                        </Col>
                        <Col span="6">
                            <Card>长江汽车应收账款融资</Card>
                        </Col>
                        <Col span="6">

                            <Card><Icon type="plus" />添加业务</Card>
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}
