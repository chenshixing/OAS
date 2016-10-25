/**
 * 用户登录
 *
 * by xing
 * 2016/10/24
 */
// 样式
import './style.less';

// react 相关库
import React from 'react';

// antd 组件
import { Tabs , Alert ,Form, Input, Button, Checkbox, Radio, Tooltip, Icon } from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const InputGroup = Input.Group;

// 页面组件
//import Frame from 'COM/form/frame';

// 页面
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
        };
    }

  render() {
      const { getFieldProps } = this.props.form;

      // 表单布局
      const formItemLayout = {
          labelCol: { span: 7 },
          wrapperCol: { span: 12 },
      };
    return (
        <Tabs type="card">
            <TabPane tab="个人用户" key="1">

                    <Form horizontal>
                        <FormItem
                            {...formItemLayout}
                            label="真实姓名"
                        >
                            <Input type="input" {...getFieldProps('userName')} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="登录名"
                        >
                            <Input type="input" {...getFieldProps('accountId')} />
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="登录密码"
                        >
                            <Input type="password" {...getFieldProps('loginPassword')} />
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="验证码"
                        >
                            <InputGroup className="ant-search-input">
                                <Input {...getFieldProps('vCode')} />
                                <div className="ant-input-group-wrap">
                                    <img className="ant-search-btn" src="./images/vcode.png"/>
                                </div>
                            </InputGroup>
                        </FormItem>

                        <FormItem wrapperCol={{ span: 16, offset: 7 }} style={{ marginTop: 24 }}>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </FormItem>

                        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                            <a href="#">新用户注册</a>
                            <a href="#" className="float-right">忘记密码</a>
                        </FormItem>

                    </Form>


            </TabPane>
            <TabPane tab="企业用户" key="2">
                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label="企业名称"
                    >
                        <Input {...getFieldProps('CompanyName')} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="登录名"
                    >
                        <Input {...getFieldProps('accountId')} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="登录密码"
                    >
                        <Input type="password" {...getFieldProps('loginPassword')} />
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="验证码"
                    >
                        <InputGroup className="ant-search-input">
                            <Input {...getFieldProps('vCode')} />
                            <div className="ant-input-group-wrap">
                                <img className="ant-search-btn" src="./images/vcode.png"/>
                            </div>
                        </InputGroup>
                    </FormItem>

                    <FormItem wrapperCol={{ span: 16, offset: 7 }} style={{ marginTop: 24 }}>
                        <Button type="primary" htmlType="submit">登录</Button>
                    </FormItem>

                    <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                        <a href="#">新用户注册</a>
                        <a href="#" className="float-right">忘记密码</a>
                    </FormItem>

                </Form>
            </TabPane>
        </Tabs>

    );
  }
}
export default Form.create()(Login);

//let Login = React.createClass({
//
//    render() {
//        const { getFieldProps } = this.props.form;
//        // 表单布局
//        const formItemLayout = {
//            labelCol: { span: 7 },
//            wrapperCol: { span: 12 },
//        };
//        return(
//            <Tabs type="card">
//                <TabPane tab="个人用户" key="1">
//                    <div>
//                        <Form horizontal>
//                            <FormItem {...formItemLayout} label="真实姓名">
//                                <Input {...getFieldProps('userName')} />
//                            </FormItem>
//
//                        </Form>
//                    </div>
//
//                </TabPane>
//                <TabPane tab="企业用户" key="2">企业用户</TabPane>
//            </Tabs>
//        );
//    }
//});
//Login = Form.create()(Login);
//export default Login;
