// react 相关库
import React from 'react';
import classNames from 'classNames';
import {Link} from 'react-router';

// 页面组件
import Frame from 'COM/form/frame';
// antd 组件
import {
    Alert,
    Steps,
    Button,
    Form,
    Input,
    Col,
    Row,
} from 'antd';
const Step = Steps.Step;
const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
    return false;
}
// 页面
class Steps2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passBarShow: false, // 是否显示密码强度提示条
            rePassBarShow: false,
            passStrength: 'L', // 密码强度
            rePassStrength: 'L'
        }
    }
    handleSubmit() {
        console.log(this)
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            window.location.href="/#/accountManagement/resetTradingPassword/Steps3?_k=aam5lv"
            console.log('Submit!!!');
            console.log(values);
        });
    }

    getPassStrenth(value, type) {
        if (value) {
            let strength;
            // 密码强度的校验规则自定义，这里只是做个简单的示例
            if (value.length < 6) {
                strength = 'L';
            } else if (value.length <= 9) {
                strength = 'M';
            } else {
                strength = 'H';
            }
            if (type === 'pass') {
                this.setState({passBarShow: true, passStrength: strength});
            } else {
                this.setState({rePassBarShow: true, rePassStrength: strength});
            }
        } else {
            if (type === 'pass') {
                this.setState({passBarShow: false});
            } else {
                this.setState({rePassBarShow: false});
            }
        }
    }

    checkPass(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'pass');

        if (form.getFieldValue('pass')) {
            form.validateFields(['rePass'], {force: true});
        }

        callback();
    }

    checkPass2(rule, value, callback) {
        const form = this.props.form;
        this.getPassStrenth(value, 'rePass');

        if (value && value !== form.getFieldValue('pass')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    renderPassStrengthBar(type) {
        const strength = type === 'pass'
            ? this.state.passStrength
            : this.state.rePassStrength;
        const classSet = classNames({
            'ant-pwd-strength': true,
            'ant-pwd-strength-low': strength === 'L',
            'ant-pwd-strength-medium': strength === 'M',
            'ant-pwd-strength-high': strength === 'H'
        });
        const level = {
            L: '低',
            M: '中',
            H: '高'
        };

        return (
            <div>
                <ul className={classSet}>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-1"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-2"></li>
                    <li className="ant-pwd-strength-item ant-pwd-strength-item-3"></li>
                    <span className="ant-form-text">
                        {level[strength]}
                    </span>
                </ul>
            </div>
        );
    }

    render() {
        const {getFieldProps} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const passProps = getFieldProps('pass', {
            rules: [
                {
                    required: true,
                    whitespace: true,
                    message: '请填写密码'
                }, {
                    min: 8,
                    max: 20,
                    message: '请输入8-20位字符'
                }, {
                    validator: this.checkPass.bind(this)
                }
            ],
            onChange: (e) => {
                console.log('你的密码就是这样被盗的：', e.target.value);
            }
        });
        const rePassProps = getFieldProps('rePass', {
            rules: [
                {
                    required: true,
                    whitespace: true,
                    message: '请再次输入密码'
                }, {
                    min: 8,
                    max: 20,
                    message: '请输入8-20位字符'
                }, {
                    validator: this.checkPass2.bind(this)
                }
            ]
        });

        return (
            <div>
                <Steps size="big" current={1} className="fn-mb-30">
                    <Step title="验证身份"/>
                    <Step title="重置交易密码"/>
                    <Step title="重置成功"/>
                </Steps>
                <Frame title="重置交易密码" small=" 用于对融资申请、修改账号信息等操作，请勿与登录密码一致。" className="">
                    <Form horizontal  className="fn-mt-30">
                        <FormItem {...formItemLayout} label="设置交易密码">
                            <Input {...passProps} type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" id="pass"/>
                            {this.state.passBarShow
                                ? this.renderPassStrengthBar('pass')
                                : null}
                        </FormItem>


                        <FormItem {...formItemLayout} label="确认交易密码">
                            <Input {...rePassProps} type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off" id="rePass"/>
                            {this.state.rePassBarShow
                                ? this.renderPassStrengthBar('rePass')
                                : null}
                        </FormItem>

                        <Row>
                            <Col span="16">
                                <Col span="8" offset="12">
                                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>提交</Button>
                                    <Link to="/accountManagement/resetTradingPassword/Steps3">提交</Link>
                                </Col>
                            </Col>
                        </Row>
                    </Form>
                </Frame>
            </div>
        );
    }
}
export default createForm()(Steps2);
