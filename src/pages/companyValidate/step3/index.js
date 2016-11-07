import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

// antd 组件
// antd 组件
import {Form, Input, Checkbox, Steps, Row, Col, Button, Modal, Icon} from 'antd';
const createForm = Form.create;
const Step = Steps.Step;
const FormItem = Form.Item;
// 页面组件
import Frame from 'COM/form/frame';

//  引入fetch
import { fetch } from 'UTILS';

// 自定义验证 rule
import ruleType from 'UTILS/ruleType';

class CompanyValidate extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            agreementChecked : false,
            pfxPassword : "",
            protocolData : {
                fileUrl : "#",
            }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        let me = this;
        let protocolData = me.state.protocolData;
        fetch('/common/getCurrentProtocol',{
            body : {
                protocolType : 2
            }
        }).then(res =>{
            protocolData = res.data;

            me.setState({
                protocolData
            });
        });
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
            return false;
          }
          console.log("passed");
          this.submit(data);
        });
    }

    submit(submitData){
        let protocolData = this.state.protocolData;
        // console.log(submitData);
        this.setState({ visible: true });
        fetch('/companyVerification/saveTransactionPassword',{
            body : {
                system : 1,
                pfxPassword : submitData.pfxPassword,
                protocolId : protocolData.id,
                protocolVersion : protocolData.protocolEdition,
                protocolName : protocolData.protocolName
            }
        }).then(res =>{
            //  申请成功TODO
            this.props.history.push('/companyValidate/step4');
        });
    }

    pfxPasswordOnChange(e){
        this.setState({
            pfxPassword : e.target.value
        })
    }

    handleCancel(){
        this.setState({ visible: false });
    }

    render() {
        let me = this;

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
            },
            pfxPasswordComfirm : {
                rules:[
                    {required: true, whitespace: true, message: '请再次输入交易密码'},
                    {validator: function(rule, value, callback) {
                        // console.log(rule)
                        if (!value) {
                            callback();
                        } else {
                            if(value !== me.state.pfxPassword){
                                callback([new Error("两次密码输入不一致。")]);
                            }else{
                                callback();
                            }
                        }
                    }}
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
	                        <Input type="password" {...getFieldProps('pfxPassword',Object.assign({},rules.pfxPassword,{ onChange : this.pfxPasswordOnChange.bind(this) }))} placeholder="8-20位英文字母（区分大小写）、数字或符号组合"/>
	                    </FormItem>

	                    <FormItem
	                        {...formItemLayout}
	                        label="确认交易密码"
	                        required
	                    >
	                        <Input type="password" {...getFieldProps('pfxPasswordComfirm',rules.pfxPasswordComfirm)} placeholder="请再次输入交易密码"/>
	                    </FormItem>

	                    <Row>
                            <Col offset="8" span="8">
                                <Checkbox checked={ this.state.agreementChecked } onChange={ this.agreementOnChange.bind(this) }>
                                	我已阅读并同意
                                    <a href={ this.state.protocolData.fileUrl } target="_blank">《数字证书服务协议》</a>
                                </Checkbox>
                            </Col>
                        </Row>

                        <Row className="fn-mt-30">
                        	<Col offset="8" span="8" className="text-align-center">
                                <Button type="primary" disabled={ !this.state.agreementChecked } onClick={ this.next.bind(this) }>下一步</Button>
                        	</Col>
                        </Row>

                        <Modal ref="modal"
                          visible={this.state.visible}
                          title="提示"
                          onCancel={this.handleCancel.bind(this)}
                          footer={null}
                        >
                          <Row className="fn-mtb-20">
                              <Col span="6" className="text-align-right">
                                    <Icon type="loading" className="fs-36"/>
                              </Col>
                              <Col span="16" offset="2">
                                    <h4>系统正在申请数字证书</h4>
                                    <p className="viceText-FontColor">请勿关闭当前页面</p>
                              </Col>
                          </Row>
                        </Modal>
	                </Form>
                </Frame>
            </div>
        );
    }
}

export default createForm()(CompanyValidate);
