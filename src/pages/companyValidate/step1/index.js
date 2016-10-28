/**
 * 企业核身step1
 * limit
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router';

// antd 组件
import { Table, Form, Input, Select, Button, Upload, Icon, Steps, Radio, DatePicker, Checkbox, Row, Col, Modal, message } from 'antd';
const createForm = Form.create;
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
// 自定义验证 rule
import ruleType from 'UTILS/ruleType';
// 页面组件
import Frame from 'COM/form/frame';

// 城市静态数据
const provinceData = ['浙江', '江苏'];
const cityData = {
  浙江: ['杭州', '宁波', '温州'],
  江苏: ['南京', '苏州', '镇江'],
};

// 页面组件（导出）
class CompanyValidate extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loading:false,
            display : 'block',
            visible : false,
            data:{
                companyName:'钱途互联',
                businessLicenseType:'common',
                isLongEndTimeChange:false,
                accountVerificationType:'bond',
                fillType : 'agent',
            },
            cities: cityData[provinceData[0]],
            secondCity: cityData[provinceData[0]][0],
            dataSource : [{
              key: '1',
              name: '中金支付有限公司客户备付金',
              bank: '招商银行',
              account: '1109 0799 6610 999',
              branch: '北京分行宣武门支行'
            }],
            columns : [{
              title: '账户名称',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: '开户行',
              dataIndex: 'bank',
              key: 'bank',
            }, {
              title: '银行账号',
              dataIndex: 'account',
              key: 'account',
            }, {
              title: '分支行',
              dataIndex: 'branch',
              key: 'branch',
            }],
        }

        this.showModal=this.showModal.bind(this);
        this.onLongEndTimeChange=this.onLongEndTimeChange.bind(this);
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

    handleProvinceChange(value) {
        this.setState({
          cities: cityData[value],
          secondCity: cityData[value][0],
        });
    }

    onSecondCityChange(value) {
        this.setState({
            secondCity: value,
        });
    }

    onBusinessLicenseTypeChange(e) {
        console.log('radio checked', e.target.value);
        let data=this.state.data;
        data.businessLicenseType=e.target.value;
        this.setState({
            data: data
        });
    }

    onAccountVerificationTypeChange(e) {
        console.log('radio checked', e.target.value);
        let data=this.state.data;
        if(data.accountVerificationType === e.target.value){ return false;}
        data.accountVerificationType=e.target.value;
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

        const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
        const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
        return (
            <div>
                <Steps size="default" current={0} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="企业安全验证" />
                    <Step title="提交结果" />
                </Steps>
                <Frame title="企业信息" small="（请务必和证件上的资料保持一致）" className="abc">
                    {/*企业信息*/}
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

                        <div className="form-title fn-mb-30" style={{borderTop:'1px solid #e8e8e8'}}>
                            填写人信息
                            <small className="viceText-FontColor"> (请务必与授权书的资料保持一致。)</small>
                        </div>

                        <FormItem
                            label="您的姓名"
                            {...formItemLayout}
                            required
                        >
                            <Input type="text"/>
                        </FormItem>

                        <FormItem
                            label="常用手机号码"
                            {...formItemLayout}
                            help="审核结果将通过短信发送至该手机 ，同时将作为此账号的绑定手机号码。"
                            required
                        >
                            <Input type="text"/>
                        </FormItem>

                        <FormItem
                            label="联系邮箱"
                            {...formItemLayout}
                        >
                            <Input type="text"/>
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
                                <Input type="text" />
                            </FormItem>

                            <FormItem
                                label="常用手机号码"
                                {...formItemLayout}
                            >
                                <Input type="text" />
                            </FormItem>

                            <FormItem
                                label="联系邮箱"
                                {...formItemLayout}
                            >
                                <Input type="text" />
                            </FormItem>
                        </div>

                        {/*填写企业对公账户*/}
                        <div className="form-title fn-mb-30" style={{borderTop:'1px solid #e8e8e8'}}>
                            填写企业对公账户
                        </div>

                        <FormItem
                          {...formItemLayout}
                          label="账户名称"
                        >
                          <p className="ant-form-text" id="userName" name="userName">广东亿达有限公司</p>
                        </FormItem>

                        <FormItem
                            label="银行账号"
                            {...formItemLayout}
                            required
                        >
                            <Input type="text" placeholder="请输入银行账号"/>
                        </FormItem>

                        <FormItem
                          label="所在省"
                          {...formItemLayout}
                        required
                        >
                          <div>
                            <Select defaultValue={provinceData[0]} style={{ width: 90 }} onChange={this.handleProvinceChange.bind(this)}>
                              {provinceOptions}
                            </Select>
                            <Select value={this.state.secondCity} className="fn-ml-10" style={{ width: 90 }} onChange={this.onSecondCityChange.bind(this)}>
                              {cityOptions}
                            </Select>
                          </div>
                        </FormItem>

                        <FormItem
                          label="开户行"
                          {...formItemLayout}
                        required
                        >
                          <Select size="large" defaultValue="">
                            <Option value="0">中国工商银行</Option>
                            <Option value="1">中国农业银行</Option>
                            <Option value="2">中国银行</Option>
                            <Option value="3">中国建设银行</Option>
                            <Option value="4">交通银行</Option>
                          </Select>
                        </FormItem>

                        <FormItem
                          label="分支行"
                          {...formItemLayout}
                        required
                        >
                          <Select size="large" defaultValue="">
                            <Option value="0">招商银行广州分行天河支行</Option>
                            <Option value="1">招商银行广州分行人民中路支行</Option>
                            <Option value="2">招商银行广州分行五羊支行</Option>
                          </Select>
                        </FormItem>

                        <div className="form-title fn-mb-30" style={{borderTop:'1px solid #e8e8e8'}}>
                            对公账户验证
                        </div>

                        <FormItem
                            {...formItemLayout}
                            label="请选择验证方式"
                            required
                        >
                            <RadioGroup {...getFieldProps('accountVerificationType',{ initialValue: this.state.data.accountVerificationType })} onChange={this.onAccountVerificationTypeChange.bind(this)}>
                                <Radio value="bond">线下支付小额验证金核验</Radio>
                                <Radio value="information">线下提交账户资料核验</Radio>
                            </RadioGroup>

                        </FormItem>

                        <Row>
                            <Col offset={1} span={22} className="fn-pa-20" style={{border:'1px solid #e8e8e8'}}>
                                <Row style={{display:this.state.data.accountVerificationType == 'bond' ? 'block' : 'none'}}>
                                    <Col offset={1} span={22}>
                                        <p>请在48小时以内，通过网上银行或银行柜台，使用您的对公账户向下面的指定账户支付 0.10元 验证金 。</p>
                                        <Table className="fn-mt-15" dataSource={this.state.dataSource} columns={this.state.columns} pagination={false}/>
                                        <p className="fn-mt-15">若超时支付或公司名和对公账户开户名不一致，验证失败。</p>
                                        <p className="fn-mt-15">本平台不收取任何手续费，如产生手续费等，由发卡行收取。</p>
                                    </Col>
                                </Row>
                                <Row style={{display:this.state.data.accountVerificationType == 'information' ? 'block' : 'none'}}>
                                    <Col offset={1} span={22}>
                                        <p>需要您提供对公账户的相关资料，具体请联系核心企业或企业合作分行。</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="fn-mt-30">
                            <Col span="12" offset="6" className="text-align-center">
                                <Link className="ant-btn ant-btn-primary ant-btn-lg" to="/companyValidate/step2">下一步</Link>
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
            </div>

        );
    }
}

export default createForm()(CompanyValidate);
