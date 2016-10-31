// react 相关库
import React from 'react';
// 页面组件
import Frame from 'COM/form/frame';


// antd 组件
import { Link } from 'react-router';
import {Form,Input,Button,Steps,Row,Col} from 'antd';
const Step = Steps.Step;
const createForm = Form.create;
const FormItem = Form.Item;
const InputGroup = Input.Group;


// 页面身份验证
//export default class UnreviewedAuthenticate extends React.Component {
class UnreviewedAuthenticate extends React.Component {
    constructor(props){
        super(props)
    }
    handleSend(){
        this.props.handleSend()
    }
    getVCode(){
        alert('验证码已经发送到您的手机');
    }
    render() {
        console.log(this.props.form);
        const { getFieldProps } = this.props.form;
        return (
            <Frame title="验证身份" small="（您的账户已实名认证，为了您的账户安全，请使用实名认证资料进行校验。）">
                <Form horizontal className="fn-mt-30">
                    <FormItem
                        id="control-input"
                        label="手机号码"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 12}}
                        >
                        <label>13312345678</label>
                    </FormItem>
                    <FormItem
                        label="短信验证码"
                        labelCol={{span: 10}}
                        wrapperCol={{span: 12}}
                    >
                        <InputGroup className="ant-search-input" style={{ width: 80 }}>
                            {<Input {...getFieldProps('mobileVCode')} style={{ width: 80 }}/>}
                            <div className="ant-input-group-wrap" style={{ marginLeft: 90 , marginTop: 1 ,display: "block"}}>
                                <Button type="primary" onClick={this.getVCode.bind(this)}>获取验证码</Button>
                            </div>
                        </InputGroup>
                    </FormItem>
                    <FormItem wrapperCol={{ span: 8, offset: 10 }} style={{ marginTop: 24 }}>
                        <Button type="primary" onClick={this.handleSend.bind(this)}>下一步</Button>
                    </FormItem>
                </Form>
            </Frame>
        );
    }
}

export default Form.create()(UnreviewedAuthenticate);