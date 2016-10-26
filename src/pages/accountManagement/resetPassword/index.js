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

    handleSubmit(e) {
    }

    render() {
        const props = {
            labelCol: {span: 8},
            wrapperCol: {span: 8},
        };
        return (
            <Frame title="修改登录密码" small="  避免使用有规律的数字或字母，请勿与交易密码一致。">
                <div className="fn-pt-30">
                    <Form horizontal>
                        <Form.Item {...props} label="登录名">
                            <label>HYP123</label>
                        </Form.Item>
                        <Form.Item {...props} label="原登录密码" required>
                            <Input type="password"/>
                        </Form.Item>
                        <Form.Item {...props} label="新登录密码" required>
                            <Input type="password" autoComplete="off" placeholder="8-20位英文字母（区分大小写）、数字或符号的组合"/>
                        </Form.Item>
                        <Form.Item {...props} label="确认新登录密码" required>
                            <Input type="password" autoComplete="off" placeholder="8-20位英文字母（区分大小写）、数字或符号的组合"/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 8 }}>
                            <Button type="primary" onClick={this.handleSubmit}>确认提交</Button>
                            <a href="#">取消</a>
                        </Form.Item>
                    </Form>
                </div>
            </Frame>
        )
    }
}
