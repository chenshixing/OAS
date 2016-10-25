/**
 * 企业核身step1
 * yongquan.wu
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

// antd 组件
import { Form, Input, Button, Upload, Icon, Steps, Radio, DatePicker, Checkbox, Row, Col, Modal, message } from 'antd';
const createForm = Form.create;
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
// 自定义验证 rule
import ruleType from 'UTILS/ruleType';
// 页面组件
import Frame from 'COM/form/frame';


// 页面组件（导出）
class CompanyValidate extends React.Component {

    constructor(props){
        super(props);
        this.state={
            visible:false,
            loading:false,
            data:{
                companyName:'钱途互联',
                businessLicenseType:'common',
                isLongEndTimeChange:false
            }
        }

        this.showModal=this.showModal.bind(this);
        this.handleOk=this.handleOk.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.onLongEndTimeChange=this.onLongEndTimeChange.bind(this);
    }

    showModal() {
        //validateFieldsAndScroll:与 validateFields 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if(!errors){
                //let values=this.props.form.getFieldsValue();
                if(!values.isLongEndTime){
                    values.endTime=values.endTime.toLocaleDateString(); // 或其它格式
                }
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
            window.location.href='/#/companyValidate/step2-1?_k=REPLACE';
        }, 3000);
    }
    handleCancel() {
        this.setState({ visible: false });
    }


    onBusinessLicenseTypeChange(e) {
        console.log('radio checked', e.target.value);
        let data=this.state.data;
        data.businessLicenseType=e.target.value;
        this.setState({
            data: data
        });
    }

    onLongEndTimeChange(e){
        console.log('e:',e.target.checked);
        let data=this.state.data;
        data.isLongEndTimeChange=e.target.checked;
        if(e.target.checked){
            this.props.form.setFieldsValue({endTime:null});
        }
        this.setState({data:data});
    }

    normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        let rules={};
        // 表单校验-common
        const rulesCommon = {
            businessLicenseRegistrationNumber: {
                rules: [
                    {required: true, message: '营业执照注册号不能为空'},
                ]
            },
            endTime:{
                rules:[
                    {required: true, type: 'object', message: '营业执照到期日不能为空'},
                ]
            },
            organizationCode:{
                rules:[
                    {required: true, message: '组织机构代码证不能为空'},
                ]
            },
            businessLicense:{
                rules:[
                    {required: true, type: 'array', message: '请上传营业执照'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            organizationCodeLicense:{
                rules:[
                    {required: true, type: 'array', message: '请上传组织机构代码证'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            taxRegistryLicense:{
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            bankAccountLicense:{
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            enterpriseCreditAuthorization:{
                rules:[
                    {required: true, type: 'array', message: '请上传企业征信查询授权书'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            representativeCertificate:{
                rules:[
                    {required: true, type: 'array', message: '请上传企业法定代表人身份证明书'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            incorporationArticles:{
                valuePropName: 'fileList',
                normalize: this.normFile
            }
        };
        // 表单校验-multiple
        const rulesMultiple = {
            unifiedSocialCreditCode: {
                rules: [
                    {required: true, message: '统一社会信用代码不能为空'},
                ]
            },
            endTime:{
                rules:[
                    {required: true, type: 'object', message: '营业执照到期日不能为空'},
                ]
            },
            businessLicense:{
                rules:[
                    {required: true,type: 'array', message: '请上传营业执照'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile,
            },
            bankAccountLicense:{
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            enterpriseCreditAuthorization:{
                rules:[
                    {required: true, type: 'array', message: '请上传企业征信查询授权书'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            representativeCertificate:{
                rules:[
                    {required: true, type: 'array', message: '请上传企业法定代表人身份证明书'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            incorporationArticles:{
                valuePropName: 'fileList',
                normalize: this.normFile
            }
        };

        this.state.data.businessLicenseType =='common' ? rules=rulesCommon : rules=rulesMultiple;
        rules.endTime.rules[0].required=!this.state.data.isLongEndTimeChange;

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


        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldProps } = this.props.form;
        const displayTypeCommon=this.state.data.businessLicenseType =='common' ? 'block' : 'none';
        const displayTypeMultiple=this.state.data.businessLicenseType == 'multiple' ? 'block' : 'none';
        return (
            <div>
                <Steps size="default" current={0} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="企业安全验证" />
                    <Step title="提交结果" />
                </Steps>
                <Frame title="企业信息" small="（请务必和证件上的资料保持一致）" className="abc">
                    <Form horizontal className="fn-mt-30">
                        <FormItem
                            label="企业名称"
                            {...formItemLayout}
                            required
                        >
                            <p className="ant-form-text">{this.state.data.companyName}</p>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label=" 营业执照类型"
                            required
                        >
                            <RadioGroup {...getFieldProps('businessLicenseType',{ initialValue: this.state.data.businessLicenseType })} onChange={this.onBusinessLicenseTypeChange.bind(this)}>
                                <Radio value="common">普通营业执照</Radio>
                                <Radio value="multiple">多证合一营业执照</Radio>
                            </RadioGroup>

                        </FormItem>

                        <div style={{display:displayTypeCommon}}>
                            <FormItem
                                {...formItemLayout}
                                label="营业执照注册号"
                                required
                            >
                                <Input {...getFieldProps('businessLicenseRegistrationNumber',rules.businessLicenseRegistrationNumber)} type="text"/>
                            </FormItem>
                        </div>

                        <div style={{display:displayTypeMultiple}}>
                            <FormItem
                                {...formItemLayout}
                                label="统一社会信用代码"
                                required
                            >
                                <Input {...getFieldProps('unifiedSocialCreditCode',rules.unifiedSocialCreditCode)} type="text"/>
                            </FormItem>
                        </div>

                        <FormItem
                            {...formItemLayout}
                            label=" 营业执照到期日"
                            required
                        >
                            <Col span="8">
                                <FormItem>
                                    <DatePicker {...getFieldProps('endTime',rules.endTime)} disabled={this.state.data.isLongEndTimeChange} />
                                </FormItem>
                            </Col>
                            <Col span="5">
                                <Checkbox {...getFieldProps('isLongEndTime',{onChange:this.onLongEndTimeChange})}>长期</Checkbox>
                            </Col>
                        </FormItem>

                        <div style={{display:displayTypeCommon}}>
                            <FormItem
                                {...formItemLayout}
                                label="组织机构代码"
                                required
                            >
                                <Input {...getFieldProps('organizationCode',rules.organizationCode)} type="text"/>
                            </FormItem>
                        </div>

                        <div style={{display:displayTypeCommon}}>
                            <FormItem
                                {...formItemLayout}
                                label="税务登记证号"
                            >
                                <Input {...getFieldProps('taxRegistryNumber')} type="text"/>
                            </FormItem>
                        </div>

                        <FormItem
                            {...formItemLayout}
                            label="银行开户许可证号"
                        >
                            <Input {...getFieldProps('bankAccountLicenseNumber')} type="text"/>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="财政登记证号"
                        >
                            <Input {...getFieldProps('financeRegisterNumber')} type="text"/>
                        </FormItem>


                        <div className="form-title fn-mb-30" style={{borderTop:'1px solid #e8e8e8'}}>
                            企业证件扫描件
                            <small className="viceText-FontColor"> (请提供原件照片或彩色扫描件（正副本均可）)</small>
                        </div>

                        <FormItem
                            {...formItemLayout}
                            label=" 营业执照"
                            required
                        >
                            <Upload {...upLoadProps} {...getFieldProps('businessLicense',rules.businessLicense)} >
                                <Button type="ghost">
                                    <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        </FormItem>

                        <div style={{display:displayTypeCommon}}>
                            <FormItem
                                {...formItemLayout}
                                label=" 组织机构代码证"
                                required
                            >
                                <Upload {...upLoadProps} {...getFieldProps('organizationCodeLicense',rules.organizationCodeLicense)} >
                                    <Button type="ghost">
                                        <Icon type="upload" /> 点击上传
                                    </Button>
                                </Upload>

                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label=" 税务登记证"
                            >
                                <Upload {...upLoadProps} {...getFieldProps('taxRegistryLicense',rules.taxRegistryLicense)} >
                                    <Button type="ghost">
                                        <Icon type="upload" /> 点击上传
                                    </Button>
                                </Upload>
                            </FormItem>
                        </div>

                        <FormItem
                            {...formItemLayout}
                            label=" 银行开户许可证"
                        >
                            <Upload {...upLoadProps} {...getFieldProps('bankAccountLicense',rules.bankAccountLicense)} >
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
                                <li>证件必须在有效期内且年检章齐全（当年成立的公司可无年检章）。</li>
                                <li>支持格式jpg、jpeg、png、bmp，不超过10M。</li>
                            </ul>
                        </FormItem>

                        <div className="form-title fn-mb-30" style={{borderTop:'1px solid #e8e8e8'}}>
                            其它信息
                            <small className="viceText-FontColor"> (请提供原件照片或彩色扫描件)</small>
                        </div>

                        <FormItem
                            {...formItemLayout}
                            label=" 企业征信查询授权书"
                            required
                        >
                            <Upload {...upLoadProps} {...getFieldProps('enterpriseCreditAuthorization',rules.enterpriseCreditAuthorization)}>
                                <Button type="ghost">
                                    <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        </FormItem>
                        <Row>
                            <Col span="8"></Col>
                            <Col span="12" className="ant-form-item">
                                <ul>
                                    <li>请点击下载 <a href="">企业征信查询授权书</a>，打印填写并签盖公司公章。</li>
                                    <li>支持格式jpg、jpeg、png、bmp，不超过10M。</li>
                                </ul>
                            </Col>
                        </Row>

                        <FormItem
                            {...formItemLayout}
                            label=" 企业法定代表人身份证明书"
                            required
                        >
                            <Upload {...upLoadProps} {...getFieldProps('representativeCertificate',rules.representativeCertificate)}>
                                <Button type="ghost">
                                    <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        </FormItem>
                        <Row>
                            <Col span="8"></Col>
                            <Col span="12" className="ant-form-item">
                                <ul>
                                    <li>请点击下载 <a href="">企业法定代表人身份证明书</a> ，打印填写并签盖公司公章。</li>
                                    <li>支持格式jpg、jpeg、png、bmp，不超过10M。</li>
                                </ul>
                            </Col>
                        </Row>

                        <FormItem
                            {...formItemLayout}
                            label=" 企业章程"
                        >
                            <Upload {...upLoadProps} {...getFieldProps('incorporationArticles',rules.incorporationArticles)}>
                                <Button type="ghost">
                                    <Icon type="upload" /> 点击上传
                                </Button>
                            </Upload>
                        </FormItem>
                        <Row>
                            <Col span="8"></Col>
                            <Col span="12" className="ant-form-item">
                                <ul>
                                    <li>支持格式jpg、jpeg、png、bmp、doc、docx、pdf，不超过10M。</li>
                                </ul>
                            </Col>
                        </Row>

                        <Row style={{ marginTop: 30 }}>
                            <Col span="12" offset="8">
                                <Button type="primary" size="large" htmlType="submit" onClick={this.showModal}>确认无误，下一步</Button>
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
                        label="企业名称"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.companyName}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="营业执照类型"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.businessLicenseType == 'common' ? '普通营业执照' : '多证合一营业执照'}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="营业执照注册号"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.businessLicenseRegistrationNumber}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="营业执照到期日"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.isLongEndTimeChange ? '长期' : this.state.data.endTime}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="组织机构代码"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.organizationCode}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="税务登记证号"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.taxRegistryNumber}</p>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="银行开户许可证核准号"
                        style={{marginBottom:'7px'}}
                    >
                        <p className="ant-form-text">{this.state.data.bankAccountLicenseNumber}</p>
                    </FormItem>
                </Modal>
            </div>

        );
    }
}

export default createForm()(CompanyValidate);
