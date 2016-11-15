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
    Input,
    notification,
    Button,
    message,
    Form
} from 'antd';
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}

//fetch
import {fetch} from 'UTILS';
// 自定义验证 rule
import ruleType from 'UTILS/ruleType';
// 页面
import Frame from 'COM/form/frame';

// 页面
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                name: "",
                lastLoginTime: "",
                getUserServiceList: []
            },
            isInviteCode: true
        }
    }
    componentDidMount() {

        this.loadData();
    }
    loadData() {
        //用户简单信息
        // fetch('/user/getLoginUserSimpleInfo').then(res => {
        //     console.log(res)
        //     this.setState(res)
        // });
        //
        // fetch('/user/getUserServiceList').then(res => {
        //     console.log(res)
        //     this.setState(res)
        // });
        //

        //用户简单信息(v0.7)
        let p1 = fetch('/user/getLoginUserSimpleInfo.do');
        //返回用户服务列表(v0.3)
        let p2 = fetch('/user/getUserServiceList.do');

        //获取登录后判断状态
        let p3 = fetch('/common/getLoginCheckStatus.do');

        Promise.all([p1, p2, p3]).then(values => {
            this.state.data = values[0].data
            this.state.data.getUserServiceList = values[1].data
            this.state.data.getLoginCheckStatus = values[2].data

            //验证不通过，就跳转到验证页面
            if (values[2].data.bankCheckStatus == 1 && values[2].data.step == 999) {
                console.log("成功")
                //return true
            } else {
                this.props.history.push("/accountManagement/basicInformation")
            }

            this.forceUpdate();
        }).catch(reason => {
            console.log(reason)
        });
    }
    handleAddBusiness() {
        this.setState({visible: true});
    }
    handleSubmit(e) {
        //console.log(this.props.from.getFieldValue())
        //e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
            fetch('/service/addService.do',{
                body:{
                    "inviteCode":this.state.inviteCodeValue
                }
            }).then(res => {

                //console.log(res)
                //this.setState(res)
                //提示
                //this.openNotification(res)
                //设置值为空
                this.setState({
                    inviteCodeValue:"",
                    visible:false
                })
                //暂时用window.location.reload 其实应该返回列表然后再浪的
                //window.location.reload()
                Modal.success({
                    title: '提示',
                    content: '添加应用成功',
                    onOk() {
                        window.location.reload()
                    },
                });
                this.props.form.setFieldsValue({name:""});
                //this.setState({visible: false});
            });
        });
    }
    openNotification(getRes) {
        console.log(getRes)
        message.success('添加成功');
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
    //个人用户或者企业用户
    templateUserType(item) {
        let items = {
            1: <Tag color="blue">个人用户</Tag>,
            2: <Tag color="blue">企业用户</Tag>
        };
        return items[item]
    }
    //个人账户管理或者企业账户管理
    templateUserTypeManagement(item) {
        let items = {
            1: <Link to="/accountManagement/basicInformation">个人账户管理</Link>,
            2: <Link to="/accountManagement/basicInformation">企业账户管理</Link>
        };
        return items[item]
    }
    handleInviteCodeValue(e) {

        this.setState({inviteCodeValue: e.target.value})
    }

    render() {
        console.log(this)

        let {
            getUserServiceList
        } = this.state.data;

        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 7
            },
            wrapperCol: {
                span: 16
            }
        };
        const nameProps = getFieldProps('name', {
            rules: [
                {
                    required: true,
                    message: '请输入邀请码'
                }
            ],
            onChange:(e)=>{
                this.setState({
                    inviteCodeValue:e.target.value
                })
            }
        });

        return (
            <div style={{
                minHeight: "700px"
            }}

            >

                <Modal
                    title="添加业务"
                    visible={this.state.visible}
                    onOk={this.handleSubmit.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    wrapClassName="vertical-center-modal"
                >
                    {/*好像不用做*/}
                    {/*
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
                    */}
                    {
                        this.state.isInviteCode
                        ?
                        <Form>
                            <Row>
                                {/*
                            <Col span={4} offset={6}>
                                <label className="ant-form-item-label">邀请码:</label>
                            </Col>
                            */}
                                <Col span={12} offset={6}>
                                    {/*
                                <Input
                                    type="text"
                                    placeholder="请输入邀请码"
                                    value={this.state.inviteCodeValue}
                                    onChange={this.handleInviteCodeValue.bind(this)}
                                    />
                                */}
                                    <FormItem {...formItemLayout} label="邀请码" hasFeedback>
                                        <Input  {...nameProps} placeholder="请输入邀请码"/>
                                    </FormItem>

                                </Col>
                            </Row>
                        </Form>
                        :
                        null
                    }

                </Modal>
                {/*
                <div className="fn-pa-20">
                    首页

                    <p>
                        <Link to="/accountManagement/home">账户管理首页</Link>
                    </p>
                    <p>
                        <Link to="/accountManagement/basicInformation">账户管理基本信息</Link>
                    </p>
                    <p>
                        <Link to="/accountManagement/resetPassword/step1">账户管理修改密码</Link>
                    </p>
                    <p>
                        <Link to="/accountManagement/resetTradingPassword/step1">账户管理修改交易密码</Link>
                    </p>
                </div>
                */}

                <div className="fn-ptb-20 ">
                    <div className="ant-card-head" style={{
                        padding: 0
                    }}>
                        <h3 className="ant-card-head-title">
                            <span className="fn-mr-10">{this.state.data.name}</span>
                            {/*@:data {string} userType 用户类型(1:个人,2:企业)*/}
                            {this.templateUserType(this.state.data.userType)}

                        </h3>
                    </div>

                    <div className="alert alert-warning fn-mt-10">
                        {/*@:data {string} userType 用户类型(1:个人,2:企业)*/}
                        {this.templateUserTypeManagement(this.state.data.userType)}
                        <span className="fn-plr-10">|</span>
                        上次登录时间：{this.state.data.lastLoginTime}
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

                        {
                            getUserServiceList && getUserServiceList.map((item, index) => {
                                return (
                                    <a key={index} href={item.serviceURL}>
                                        <Col span="6">
                                            <Card>{item.serviceChannelName}</Card>
                                        </Col>
                                    </a>
                                )
                            })
                        }

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

export default createForm()(Home);
