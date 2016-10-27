import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
// antd 组件
import { Form, Input, Button, Radio, Row, Col, Modal } from 'antd';

const createForm = Form.create;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

// 页面组件
import Frame from 'COM/form/frame';

class EditRealName extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
        	display : "block",
        	visible : false,
        	data:{
        		fillType : 'agent'
        	}
        }
    }

    onFillTypeChange(e) {
        console.log('radio checked', e.target.value);
        let display = e.target.value == "agent" ? "block" : "none";
        if(this.state.display == display){ return false;}
        if(e.target.value == "corporation"){
			this.showModal();
        }else{
        	let state = this.state;
	  		state.display = display;
	  		state.data.fillType = 'agent';
	    	this.setState(state);
        }
    }

    showModal() {
	    this.setState({
	      visible: true,
	    });
  	}

  	handleOk() {
  		let state = this.state;
  		state.display = 'none';
  		state.visible = false;
  		state.data.fillType = 'corporation';
    	this.setState(state);
  	}

  	handleCancel() {
    	this.setState({ visible: false });
  	}

    render() {

    	const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        const { getFieldProps } = this.props.form;

        return (
            <Frame title="填写人信息" small="（请务必与授权书的资料保持一致。）">
                <Form horizontal className="fn-mt-30">

                	<FormItem
                        label="您的姓名"
                        {...formItemLayout}
                        required
                    >
                        <Input type="text" value="邹小敏"/>
                    </FormItem>

                    <FormItem
                        label="常用手机号码"
                        {...formItemLayout}
                        help="审核结果将通过短信发送至该手机 ，同时将作为此账号的绑定手机号码。"
                        required
                    >
                        <Input type="text" value="13388888888"/>
                    </FormItem>

                    <FormItem
                        label="联系邮箱"
                        {...formItemLayout}
                    >
                        <Input type="text" value="xiaomin.zou@frontpay.cn"/>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label=" 填写人的身份"
                        required
                    >
                        <RadioGroup {...getFieldProps('fillType',{ initialValue: this.state.data.fillType })} onChange={ this.onFillTypeChange.bind(this) }>
                            <Radio value="agent">我是委托代理人</Radio>
                            <Radio value="corporation">我是法定代表人</Radio>
                        </RadioGroup>

                    </FormItem>

                    <div style={{display:this.state.display}}>
                    	<div className="form-title fn-mb-30" style={{borderTop:'1px solid #e8e8e8'}}>
                            法定代表人信息
                            <small className="viceText-FontColor"> (请务必与法定代表人身份证明书、营业执照上的资料保持一致。)</small>
                        </div>

                        <FormItem
	                        label="法定代表人姓名"
	                        {...formItemLayout}
	                        required
	                    >
	                        <Input type="text" value="彭丽媛"/>
	                    </FormItem>

	                    <FormItem
	                        label="常用手机号码"
	                        {...formItemLayout}
	                    >
	                        <Input type="text" value="18888888888"/>
	                    </FormItem>

	                    <FormItem
	                        label="联系邮箱"
	                        {...formItemLayout}
	                    >
	                        <Input type="text" value="10000@qq.com"/>
	                    </FormItem>
                    </div>

                    <Row className="fn-mt-30">
                        <Col span="12" offset="6" className="text-align-center">
                            <Link className="ant-btn ant-btn-primary ant-btn-lg" to="/companyValidate/result">下一步</Link>
                        </Col>
                    </Row>

                    <Modal ref="modal"
			          visible={this.state.visible}
			          title="提示" onCancel={this.handleCancel.bind(this)}
			          footer={[
			            <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this)}>
			              我知道了
			            </Button>,
			          ]}
			        >
			          <h4>您将以法定代表人身份作为该企业账号的全权委托代理人，日后使用该账号发起的融资申请必须由法定代表人本人操作。</h4>
			        </Modal>

                </Form>
            </Frame>
        );
    }
}

export default createForm()(EditRealName);
