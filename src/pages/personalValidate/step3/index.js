/**
 * 个人核身step3
 * yongquan.wu
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';
// 导入公共样式
import 'ASSETS/less/main.less';
// 自定义验证 rule
import ruleType from 'UTILS/ruleType';
// 页面组件
import Frame from 'COM/form/frame';

// antd 组件
import { Button, Form, Input, Checkbox, Steps, Row, Col } from 'antd';
import classNames from 'classnames';
const createForm = Form.create;
const FormItem = Form.Item;
const Step = Steps.Step;

function noop() {
    return false;
}

class PersonalValidate extends React.Component {
    constructor(props){
        super(props);
        this.state={};

    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!',errors);
                return;
            }
            console.log('Submit!!!');
            console.log(values);
            //todo ajax submit...
            // window.location.href='/#/personalValidate/step4?_k=REPLACE';
            this.props.history.push({
                pathname:'personalValidate/step4'
            });
        });
    }

    checkPassWordAgain(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('两次所填写的密码不一致，请重新输入');
        } else {
            callback();
        }
    }

    onPassWordBlur(e){
        const value=e.target.value;
        const { validateFields,getFieldError } = this.props.form;
        console.log('pwd:',getFieldError('password'));
        if (value && !getFieldError('password')) {
            validateFields(['rePassword'], { force: true });
        }
    }

    validateAgreement(rule,value,callback){
        console.log('请阅读并同意协议:',value);
        if(value=='false'){
            callback('请阅读并同意协议')
        }else{
            callback();
        }
    }

    render(){
        const { getFieldProps } = this.props.form;
        // 表单校验
        const rules = {
            password: {
                rules: [
                    {required: true, message: '密码不能为空'},
                    {min: 8, max: 20, message: '请输入8-20位字符'},
                    //{validator: this.checkPassWord.bind(this)},
                    ruleType('en-num')
                ]
            },
            rePassword: {
                rules: [
                    {required: true, message: '请再次输入密码'},
                    {validator: this.checkPassWordAgain.bind(this)}
                ]
            },
            agreement:{
                initialValue: false, 
                valuePropName: 'checked',
                rules:[{validator: this.validateAgreement.bind(this)}],
            }
        };
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        return(
            <div>
                <Steps size="default" current={2} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="设置交易密码" />
                    <Step title="提交结果" />
                </Steps>
                <Frame title="设置交易密码" small="（用于对融资申请、修改账号信息等操作，请勿与登录密码一致）">
                    <div>
                        <Form horizontal className="fn-mt-30">
                            <FormItem
                                {...formItemLayout}
                                label="设置交易密码"
                                required
                            >
                                <Input type="password" {...getFieldProps('password', rules.password)} onBlur={this.onPassWordBlur.bind(this)} autoComplete="off" placeholder="8-20位英文字母、数字或符号的组合，字母区分大小写" />
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label="确认交易密码"
                                required
                            >
                                <Input {...getFieldProps('rePassword', rules.rePassword)} type="password" autoComplete="off" />
                            </FormItem>
                            
                            <Row>
                                <Col span="24">
                                    <Col span="12" offset="8">
                                        <Checkbox {...getFieldProps('agreement',rules.agreement)} >我已阅读并同意
                                                <a href="">《数字证书服务协议》</a>
                                        </Checkbox>
                                    </Col>
                                </Col>
                            </Row>
                            <Row className="fn-mt-30">
                                <Col span="24">
                                    <Col span="12" offset="8">
                                        <Button type="primary" size="large" onClick={this.handleSubmit.bind(this)}>提交</Button>
                                    </Col>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Frame>
            </div>
        )
    }
}


export default createForm()(PersonalValidate);
