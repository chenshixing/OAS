import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

// antd 组件
// antd 组件
import {Form, Input, Checkbox, Steps, Row, Col} from 'antd';
const createForm = Form.create;
const Step = Steps.Step;
const FormItem = Form.Item;
// 页面组件
import Frame from 'COM/form/frame';



class CompanyValidate extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
    	const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
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
	                        <Input type="text" placeholder="8-20位英文字母（区分大小写）、数字或符号组合"/>
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
                                    <Checkbox>
                                    	我已阅读并同意
                                        <Link to="/">《数字证书服务协议》</Link>
                                    </Checkbox>
                            </Col>
                        </Row>

                        <Row className="fn-mt-30">
                        	<Col offset="8" span="8" className="text-align-center">
                        		<Link className="ant-btn ant-btn-primary ant-btn-lg" to="/companyValidate/step4">下一步</Link>
                        	</Col>
                        </Row>
	                </Form>
                </Frame>
            </div>
        );
    }
}

export default CompanyValidate;
