// react 相关库
import React from 'react';
import classNames from 'classNames';
import {Link} from 'react-router';
// 页面组件
import Frame from 'COM/form/frame';

//自己内容组件
import StepsBar from './StepsBar';
// 自定义验证 rule
import ruleType from 'UTILS/ruleType';

// antd 组件
import {Alert,Steps,Button,Form,Input,Col,Row,message} from 'antd';
const Step = Steps.Step;
const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}
// 页面
class Step3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                let data =values;
                console.log('Submit!!!',data);

                fetch('/user/resetPwd.do',{
                    body:data
                }).then((res)=>{
                    this.props.history.push({
                        pathname:'resetPassword/step4'
                    });
                },(res)=>{
                    message.error(`提交失败！${res.message}`,5);
                });
            }


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

    render() {
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        // 表单校验
        const rules = {
            password: {
                rules: [
                    {required: true, message: '密码不能为空'},
                    {min: 8, max: 20, message: '请输入8-20位字符'},
                    ruleType('pfxPassword')
                ]
            },
            rePassword: {
                rules: [
                    {required: true, message: '请再次输入密码'},
                    {validator: this.checkPassWordAgain.bind(this)}
                ]
            },
        };

        return (
            <div>
                {/*步骤*/}
                <StepsBar />
                <Frame title="重置交易密码" small=" &nbsp;&nbsp;请勿与交易密码一致" className="">
                    <Form horizontal  className="fn-mt-30">
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
                            <Col span="16">
                                <Col span="8" offset="12">
                                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                                </Col>
                            </Col>
                        </Row>
                    </Form>
                </Frame>
            </div>
        );
    }
}
export default createForm()(Step3);
