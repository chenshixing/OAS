// react 相关库
import React from 'react';
// antd 组件
import { Button, Form, Input } from 'antd';
// 自定义验证 rule
import ruleType from 'UTILS/ruleType';
// 页面
import Frame from 'COM/form/frame';
class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
        });
    }

    checkPass(rule, value, callback) {
        if(value) {
            this.props.form.validateFields(['confirmPassword'], {force: true});
        }
        callback();
    }

    checkConfirmPass(rule, value, callback) {
        if(value && value !== this.props.form.getFieldValue('password')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    render() {
        const props = {
            labelCol: {span: 8},
            wrapperCol: {span: 8},
        };
        const {getFieldProps} = this.props.form; //用于和表单进行双向绑定
        const oldPasswdProps = getFieldProps('oldPassword', { //原登录密码
            rules: [
                {required: true, whitespace: true, message: '请输入原登录密码'},
            ],
        });
        const passwdProps = getFieldProps('password', {//新登录密码
            rules: [
                {required: true, min: 8, max: 20, message: '请输入8-20个字符'},
                {validator: this.checkPass.bind(this)},
                ruleType('en-num')
            ],
        });
        const confirmPasswordProps = getFieldProps('confirmPassword', {//确认新登录密码
            rules: [
                {required: true, message: '请再次输入密码'},
                {validator: this.checkConfirmPass.bind(this)},
            ],
        });
        return (
            <Frame title="修改登录密码" small="  避免使用有规律的数字或字母，请勿与交易密码一致。">
                <div className="fn-pt-30">
                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item {...props} label="登录名">
                            <label>HYP123</label>
                        </Form.Item>
                        <Form.Item {...props} label="原登录密码" hasFeedback required>
                            <Input type="password"
                                   autoComplete="off"
                                   placeholder=""
                                {...oldPasswdProps}/>
                        </Form.Item>
                        <Form.Item {...props} label="新登录密码" hasFeedback required>
                            <Input type="password"
                                   autoComplete="off"
                                   placeholder="8-20位英文字母（区分大小写）、数字或符号的组合"
                                {...passwdProps}/>
                        </Form.Item>
                        <Form.Item {...props} label="确认新登录密码" hasFeedback required>
                            <Input type="password"
                                   autoComplete="off"
                                   placeholder="8-20位英文字母（区分大小写）、数字或符号的组合"
                                {...confirmPasswordProps} />
                        </Form.Item>
                        <Form.Item wrapperCol={{span: 12, offset: 8}}>
                            <Button type="primary" htmlType="submit">确认提交</Button>
                            <a style={{paddingLeft: 20}} href="#">取消</a>
                        </Form.Item>
                    </Form>
                </div>
            </Frame>
        )
    }
}
export default Form.create()(ResetPassword)