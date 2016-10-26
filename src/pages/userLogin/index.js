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

import vcode from 'ASSETS/images/vcode.png'
import eaccountlogo from 'ASSETS/images/eaccountlogo.png'


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
          labelCol: { span:8 },
          wrapperCol: { span: 12 },
      };
    return (
        <div className="login-page">
            <div className="main-frm">
                <div className="login-layerout">
                    <div className="login-head-wrap">
                        <div className="login-head-content">
                            <a href="#" className="login-head-logo">
                                <img src={eaccountlogo} />
                            </a>
                            <a href="###" className="login-admin default-FontColor">管理员登录</a>
                        </div>
                    </div>
                    <div className="login-wrap">
                        <div className="login-bg">
                            <div className="login-content">
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

                                                        <img className="ant-search-btn" src={vcode}/>
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
                            </div>


                        </div>
                    </div>
                </div>


                <div className="main-footer clearfix">
                    <div className="main-ft-inner">
                        <div className="main-ft-bank"><span className="bank-bg bank-cmb"></span></div>
                        <div className="main-ft-helper">
                            <ul>
                                <li className="has-r-line">
                                    <Icon type="message"  />
                                    <a href="##">帮助中心</a>
                                </li>
                                <li className="tel has-r-line"><Icon type="phone" />客服热线<b>400-106-6698</b></li>
                                <li>粤ICP备 14098252号-2</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    );
  }
}
export default Form.create()(Login);

