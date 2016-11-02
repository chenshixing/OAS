// react 相关库
import React from 'react';
// 页面组件
import Frame from 'COM/form/frame';


// antd 组件
import { Link } from 'react-router';
import {Form,Input,Button,Steps,Row,Col} from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;


// 页面身份验证
export default class Authenticate extends React.Component {
    constructor(props){
        super(props)
    }
    handleSend(){
        this.props.handleSend()
    }
    render() {
        console.log(this)
        return (
            <Frame title="验证身份" small="（您的账户已实名认证，为了您的账户安全，请使用实名认证资料进行校验。）">
                <Form horizontal className="fn-mt-30">
                    <FormItem
                        id="control-input"
                        label={this.props.getLoginUserSimpleInfo.userType==1?"姓名":"委托代理人"}
                        labelCol={{span: 10}}
                        wrapperCol={{span: 12}}
                        >
                        <label>{this.props.getdesensitizemobile.name}</label>
                    </FormItem>
                    <FormItem
                        id="control-input"
                        label="手机号码"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 12}}
                        >
                        <label>{this.props.getdesensitizemobile.mobile}</label>
                    </FormItem>
                    <FormItem wrapperCol={{ span: 8, offset: 10 }} style={{ marginTop: 24 }}>
                        <Button type="primary"  onClick={this.handleSend.bind(this)}>发送身份识别码至手机</Button>
                        <Link to="/accountManagement/resetTradingPassword/Step2">发送身份识别码至手机</Link>
                    </FormItem>


                </Form>
            </Frame>
        );
    }
}
