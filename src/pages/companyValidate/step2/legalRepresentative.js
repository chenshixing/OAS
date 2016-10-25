/**
 * 企业核身step2-1
 * yongquan.wu
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

// antd 组件
import { Form, Input, Button, Upload, Icon, Steps, Radio, DatePicker, Checkbox, Row, Col, Modal } from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
// 页面组件
import Frame from 'COM/form/frame';
// 自定义验证 rule
import ruleType from 'UTILS/ruleType';

class CompanyValidate extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,
            loading:false,
            data:{}
        }

        this.showModal=this.showModal.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
    }

    showModal(){
        this.props.form.validateFields((errors, values) => {
            if(!errors){
                let values=this.props.form.getFieldsValue();
                //if(!values.isLongEndTime){
                //    values.endTime=values.endTime.format('YYYY-MM-DD'); // 或其它格式
                //}
                let data=this.state.data;
                Object.assign(data,values);
                this.setState({
                    visible: true,
                    data:data
                });
                console.log('Submit!!!');
                console.log('state:',this.state.data);
            }
        });
    }
    handleOk() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
            window.location.href='/#/companyValidate/step2-2?_k=REPLACE';
        }, 3000);
    }
    handleCancel() {
        this.setState({ visible: false });
    }

    normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render(){
        const { getFieldProps } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        // 表单校验
        const rules = {
            legalRepresentativeName:{
                rules: [
                    {required: true, message: '法定代表人姓名不能为空'}
                ]
            },
            legalRepresentativeIdCard:{
                rules: [
                    ruleType('id-card')
                ]
            },
            legalRepresentativePhoneNum:{
                rules:[
                    {required: true, message: '常用手机号码不能为空或者格式不正确'},
                    ruleType('mobile')
                ]
            },
            legalRepresentativeEmail:{
                rules: [
                    ruleType('email')
                ]
            },
            authorizationLicense:{
                rules:[
                    {required: true, type: 'array', message: '请上传承诺函及授权委托书'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            personalCreditAuthorization:{
                valuePropName: 'fileList',
                normalize: this.normFile
            }
        };
        const upLoadProps = {
            name: 'file',
            action: '/api/upload.do',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }
        };
        return(
            <div>
                <Frame title="法人代表人信息" small="（请务必授权书上的资料保持一致。）">
                    <Form horizontal className="fn-mt-30">
                        <FormItem
                            {...formItemLayout}
                            label=" 法定代表人姓名"
                            required
                        >
                            <Input {...getFieldProps('legalRepresentativeName',rules.legalRepresentativeName)} type="text"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label=" 身份证号码"
                        >
                            <Input {...getFieldProps('legalRepresentativeIdCard',rules.legalRepresentativeIdCard)} type="number"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label=" 常用手机号码"
                            help="审核结果将通过短信发送至该手机，同时将作为此账号的绑定手机号码。"
                            required
                        >
                            <Input {...getFieldProps('legalRepresentativePhoneNum',rules.legalRepresentativePhoneNum)} type="number" placeholder="用于接收身份验证短信"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label=" 联系邮箱"
                        >
                            <Input {...getFieldProps('legalRepresentativeEmail',rules.legalRepresentativeEmail)} type="email"/>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="承诺函及授权委托书"
                            required
                        >
                            <Upload {...upLoadProps} {...getFieldProps('authorizationLicense',rules.authorizationLicense)}>
                                <Button type="ghost">
                                    <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="上传文件要求 "
                        >
                            <ul>
                                <li>下载 <a href="">承诺函及授权委托书</a> ，打印填写并加盖公章，上传原件照片或彩色扫描件。</li>
                                <li>支持格式jpg、jpeg、png、bmp，不超过10M。</li>
                            </ul>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="个人征信查询授权书"
                        >
                            <Upload {...upLoadProps} {...getFieldProps('personalCreditAuthorization',rules.personalCreditAuthorization)}>
                                <Button type="ghost">
                                    <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="上传文件要求 "
                        >
                            <ul>
                                <li>下载 <a href="">个人征信查询授权书</a> ，打印填写并签名，上传原件照片或彩色扫描件。</li>
                                <li>支持格式jpg、jpeg、png、bmp，不超过10M。</li>
                            </ul>
                        </FormItem>

                        <Row style={{ marginTop: 30 }}>
                            <Col span="12" offset="8">
                                <Button type="primary" size="large" htmlType="submit" onClick={this.showModal} >下一步</Button>
                                <Button type="dashed" size="large" className="fn-ml-20" > <a href="/#/companyValidate/step1?_k=REPLACE">上一步</a> </Button>
                            </Col>
                        </Row>
                    </Form>
                </Frame>

                <Modal ref="modal"
                       visible={this.state.visible}
                       style={{ top: 150 }}
                       title="信息确认" onOk={this.handleOk} onCancel={this.handleCancel}
                       footer={[
                        <Button key="back" type="ghost" size="large" onClick={this.handleCancel}>返回修改</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                          确定
                        </Button>,
                      ]}
                >
                    <FormItem
                        {...formItemLayout}
                        label="法定代表人姓名"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.legalRepresentativeName}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="法定代表人身份证号码"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.legalRepresentativeIdCard}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="法定代表人常用手机号码"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.legalRepresentativePhoneNum}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="法定代表人联系邮箱"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.legalRepresentativeEmail}</p>
                    </FormItem>
                </Modal>
            </div>

        )
    }
}

export default Form.create()(CompanyValidate);
