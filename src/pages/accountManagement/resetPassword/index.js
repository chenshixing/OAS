// react 相关库
import React from 'react';
// antd 组件
import { Button, Form, Input } from 'antd';
// 页面
import Frame from 'COM/form/frame';
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Frame title="修改登录密码" small="  避免使用有规律的数字或字母，请勿与交易密码一致。">
                
                <div>登录名</div>
                <div>原登录密码</div>
                <div>新登录密码</div>
                <div>登录名</div>

                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label="登录名"
                        required
                    >
                        <Input {...getFieldProps('inviteCode', rules.inviteCode)} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="原登录密码"
                        required
                    >
                        <Input {...getFieldProps('userName', rules.userName)} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="新登录密码"
                        required
                    >
                        <Input placeholder="4-20个英文字母、数字" {...getFieldProps('accountId', rules.accountId)} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="登录密码"
                        required
                    >
                        <Input type="password" autoComplete="off" placeholder="8-20位英文字母、数字或符号的组合，字母区分大小写" {...getFieldProps('loginPassword', rules.loginPassword)} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                        required
                    >
                        <Input type="password" autoComplete="off" {...getFieldProps('loginPasswordAgain', rules.loginPasswordAgain)} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="登录名"
                        required
                    >
                        <Input {...getFieldProps('userMobile', rules.userMobile)} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="短信验证码"
                        required
                    >
                        <InputGroup className="ant-search-input">
                            <Input {...getFieldProps('vCode', rules.vCode)} />
                            <div className="ant-input-group-wrap">
                                <Button className="ant-search-btn" onClick={this.getVerifyCode.bind(this)}>获取验证码</Button>
                            </div>
                        </InputGroup>

                    </FormItem>

                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>下一步</Button>
                    </FormItem>

                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <p>已有账号？ <a href="#">直接登录</a></p>
                    </FormItem>
                </Form>
                
            </Frame>
        );
    }
}
