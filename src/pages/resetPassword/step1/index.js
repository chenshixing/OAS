/**
 * 企业核身step1
 * yongquan.wu
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

// antd 组件
import { Form, Input, Button, Steps, Radio, Row, Col, Modal, message } from 'antd';
const createForm = Form.create;
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
// 自定义验证 rule
import ruleType from 'UTILS/ruleType';
// 页面组件
import Frame from 'COM/form/frame';


// 页面组件（导出）
class CompanyValidate extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loading:false,
            data:{
                businessLicenseType:'Personal',
                isLongEndTimeChange:false
            }
        }
        this.handleNext=this.handleNext.bind(this);
    }

    handleNext() {
        this.props.form.validateFields((errors, values) => {
            if(!errors){
                this.setState({ loading: true });
                setTimeout(() => {
                    this.setState({ loading: false});
                    window.location.href='/#/resetPassword/step2';
                }, 1000);
            }
        });
    }
    onBusinessLicenseTypeChange(e) {
        this.props.form.resetFields()
        let data=this.state.data;
        data.businessLicenseType=e.target.value;
        this.setState({
            data: data
        });
    }

    render() {
        // 表单校验
        const rules = {
            realName: {
                rules: [
                    {required: true, message: '真实姓名不能为空'},
                ]
            },
            companyName:{
                rules:[
                    {required: true, message: '企业名称不能为空'},
                ]
            },
            loginName:{
                rules:[
                    {required: true, message: '登录名不能为空'},
                ]
            },
            userMobile:{
                rules:[
                    {required: true, message: '常用手机号码不能为空或者格式不正确'},
                    ruleType('mobile')
                ]
            },
        };


        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldProps } = this.props.form;
        const displayTypePersonal=this.state.data.businessLicenseType =='Personal' ? 'block' : 'none';
        const displayTypeCompany=this.state.data.businessLicenseType == 'company' ? 'block' : 'none';
        return (
            <div>
                <Steps size="default" current={0} className="fn-mb-30">
                    <Step title="账户信息" />
                    <Step title="验证身份" />
                    <Step title="重置登录密码" />
                    <Step title="重置成功" />
                </Steps>

                <Frame title="填写账户信息" small=" 输入你需要找回登录密码的账户信息">
                    <Form horizontal className="fn-mt-30">
                        <FormItem
                            {...formItemLayout}
                            label="用户类型"
                            required
                        >
                            <RadioGroup {...getFieldProps('businessLicenseType',{ initialValue: this.state.data.businessLicenseType })} onChange={this.onBusinessLicenseTypeChange.bind(this)}>
                                <Radio value="Personal">个人用户</Radio>
                                <Radio value="company">企业用户</Radio>
                            </RadioGroup>

                        </FormItem>

                        <div style={{display:displayTypePersonal}}>
                            <FormItem
                                {...formItemLayout}
                                label="真实姓名"
                                required
                            >
                                <Input {...getFieldProps('realName',rules.realName)} type="text"/>
                            </FormItem>
                        </div>

                        <div style={{display:displayTypeCompany}}>
                            <FormItem
                                {...formItemLayout}
                                label="企业名称"
                                required
                            >
                                <Input {...getFieldProps('companyName',rules.companyName)} type="text"/>
                            </FormItem>
                        </div>

                        <div>
                            <FormItem
                                {...formItemLayout}
                                label="登录名"
                                required
                            >
                                <Input {...getFieldProps('loginName',rules.loginName)} type="text"/>
                            </FormItem>
                        </div>

                        <div>
                            <FormItem
                                {...formItemLayout}
                                label="手机号码"
                                required
                            >
                                <Input {...getFieldProps('userMobile',rules.userMobile)}/>
                            </FormItem>
                        </div>

                        <Row style={{ marginTop: 30 }}>
                            <Col span="12" offset="8">
                                <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleNext}>下一步 </Button>
                                <Link type="primary" className="fn-ml-10" to='/resetPassword/step2'>下一步（审核不通过）</Link>
                                <Link to="/userRegister" className="link-standard fn-pl-20">重新登录</Link>
                            </Col>
                        </Row>
                        {/*<div className="text-align-center fn-mt-30">
                            <Button type="primary" size="large">下一步</Button>
                            <a href="/#/personalValidate/step1?_k=REPLACE" className="link-standard fn-pl-20">重新登录</a>
                        </div>*/}


                    </Form>

                </Frame>
            </div>

        );
    }
}

export default createForm()(CompanyValidate);
