import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

// antd 组件
// antd 组件
import {Form, Input, Checkbox, Steps, Row, Col, Button} from 'antd';
const createForm = Form.create;
const Step = Steps.Step;
const FormItem = Form.Item;
// 页面组件
import Frame from 'COM/form/frame';

// 自定义验证 rule
import ruleType from 'UTILS/ruleType';

class CompanyValidate extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            agreementChecked : false
        }
    }

    agreementOnChange(e){
        this.setState({
            agreementChecked : !this.state.agreementChecked
        })
    }

    next(){
        console.log("next");
        // 表单校验
        this.props.form.validateFieldsAndScroll((errors, data) => {
          if (errors) {
            console.log(errors);
            console.log(data);
            return false;
          }
          console.log("passed");
          console.log(data);
        });
    }

    render() {
    	const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        const pfxPasswordRule = {
            validator : function(rule, value, callback) {
                if (!value) {
                    callback();
                } else {
                    const regArr = [/[0-9]\d*/,/[A-Za-z]+/,/[\W,_]+/];
                    let matchNum = 0;
                    regArr.map( (item,index) => {
                        if(item.test(value)){
                            matchNum++;
                        }
                    });
                    if(matchNum >= 2 && value.length >= 8 && value.length <= 20){
                        callback();
                    }else{
                        callback([new Error('8-20位英文字母（区分大小写）、数字或符号组合')]);
                    }
                }
            }
        };

        const rules = {
            pfxPassword : {
                rules:[
                    {required: true, whitespace: true, message: '交易密码不能为空'},
                    {min: 8, max: 20, message: '请输入8-20位字符'},
                    ruleType('pfxPassword')
                ]
            }
        };

        const { getFieldProps } = this.props.form;

        return (
            <div>
            	<Steps size="default" current={2} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="企业安全验证" />
                    <Step title="提交结果" />
                </Steps>
                <Frame title="设置交易密码" small="（用于对融资申请、修改账号信息等操作，请勿与登录密码一致。）" className="abc">
                	<Form horizontal className="fn-mt-30">
						<FormItem
	                        {...formItemLayout}
	                        label="设置交易密码"
	                        required
	                    >
	                        <Input type="text" {...getFieldProps('pfxPassword',rules.pfxPassword)} placeholder="8-20位英文字母（区分大小写）、数字或符号组合"/>
	                    </FormItem>

	                    <FormItem
	                        {...formItemLayout}
	                        label="确认交易密码"
	                        required
	                    >
	                        <Input type="text" placeholder="8-20位英文字母（区分大小写）、数字或符号组合"/>
	                    </FormItem>

	                    <Row>
                            <Col offset="8" span="8">
                                <Checkbox checked={ this.state.agreementChecked } onChange={ this.agreementOnChange.bind(this) }>
                                	我已阅读并同意
                                    <Link to="/">《数字证书服务协议》</Link>
                                </Checkbox>
                            </Col>
                        </Row>

                        <Row className="fn-mt-30">
                        	<Col offset="8" span="8" className="text-align-center">
                                <Button type="primary" disabled={ !this.state.agreementChecked } onClick={ this.next.bind(this) }>下一步</Button>
                        	</Col>
                        </Row>
	                </Form>
                </Frame>
            </div>
        );
    }
}

export default createForm()(CompanyValidate);
