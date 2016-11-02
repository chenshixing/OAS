/**
 * 企业核身step1
 * limit
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router';

// antd 组件
import { Table, Form, Input, Select, Button, Upload, Icon, Steps, Radio, DatePicker, Checkbox, Row, Col, Modal, Cascader, message } from 'antd';
const createForm = Form.create;
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
//  表单验证配置
import formValidation from '../components/formValidation';
// 页面组件
import Frame from 'COM/form/frame';

//  引入fetch
import { fetch } from 'UTILS';

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
                bankAccount : '',
                provinces : [],
                cities : [],
                bankList : [],
                bank : undefined,
                province : undefined,
                city : undefined,
                cityPlaceHolder : "请先选择省份",
                cityDisabled : true,
                branchDisabled : true,
                branchPlaceHolder : "请先选择开户行和所在城市",
                branches : [],
                companyName: ""
            },
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

    componentDidMount() {
        this.bankInit();
        this.provinceInit();
    }

    bankInit(){
        let me = this;
        let data = this.state.data;
        fetch('/bank/banklist').then(res => {
            if(res.code == 200){
                data.bankList = res.data;
                // console.log(data.bankList);
                me.setState({
                    data : data
                });
            }
        });
    }

    provinceInit(){
        let me = this;
        let data = this.state.data;
        fetch('/bank/provinces').then(res => {
            if(res.code == 200){
                data.provinces = res.data;
                // console.log(data.provinces);
                me.setState({
                    data : data
                });
            }
        });
    }

    onCompanyNameChange(e){
        let data = this.state.data;
        data.companyName = e.target.value;
        this.setState({
            data : data
        });
    }

    onBankAccountChange(e){
        let me = this;
        let data = me.state.data;
        data.bankAccount = e.target.value;
        fetch('/bank/cardNumber',{
            body:{
              "cardNumber": data.bankAccount
            }
        }).then(res => {
            if(res.code == 200){
                data.bank = res.data.B_BankID;
                // console.log(data);
                me.setState({
                    data : data
                });
                me.props.form.setFieldsValue({
                    bank : data.bank
                });
            }
        });
    }

    onProvinceChange(value){
        let me = this;
        let data = me.state.data;
        data.province = value;
        fetch('/bank/citys',{
            body:{
                provinceId : value
            }
        }).then(res => {
            if(res.code == 200){
                data.cities = res.data;
                data.cityPlaceHolder = "请选择城市";
                data.cityDisabled = false;
                // console.log(data.cities);
                me.setState({
                    data : data
                });
            }
        });
    }

    onBankChange(value){
        let data = this.state.data;
        data.bank = value;
        // console.log(data);
        this._getBranch();
    }

    onCityChange(value){
        let data = this.state.data;
        data.city = value;
        this._getBranch();
    }

    _getBranch(){
        let me = this;
        let data = me.state.data;
        if( data.bank && data.city ){
            fetch('/bank/branchlist',{
                body:{
                  "bankId": data.bank,
                  "cityId": data.city
                }
            }).then(res => {
                if(res.code == 200){
                    data.branches = res.data;
                    data.branchPlaceHolder = "请选择分支行";
                    data.branchDisabled = false;
                    me.setState({
                        data : data
                    });
                }
            });
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

    next(){
        // 表单校验
        this.props.form.validateFieldsAndScroll((errors, values) => {
          if (errors) {
            console.log(errors);
            console.log(values);
            return false;
          }
          console.log("passed");
          console.log(values);
          //    验证通过TODO
        });
    }

    render() {
        // console.log("limit");
        // 表单校验

        // 根据营业执照类型类型选择验证机制
        const rulesBusiness = this.state.data.businessLicenseType == 'common' ? formValidation.rulesCommon : formValidation.rulesMultiple;

        //  根据填写人身份选择验证机制
        const rulesFill = this.state.data.fillType == 'agent' ? formValidation.rulesAgent : {};

        // 根据不同类型选择验证机制
        const rules = Object.assign({},formValidation.rulesBase,rulesBusiness,rulesFill);

        //  营业执照到期日选择了长期则设置为不必填
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
                <Frame title="企业信息" small="（请务必和证件上的资料保持一致）">
                    {/*企业信息*/}
                    <Form horizontal className="fn-mt-30">
                        <FormItem
                            label="企业名称"
                            {...formItemLayout}
                            required
                        >
                           <Input {...getFieldProps('companyName',Object.assign({},rules.companyName,{ onChange : this.onCompanyNameChange.bind(this) }))} />
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
                            <Input {...getFieldProps('name',rules.name)} type="text"/>
                        </FormItem>

                        <FormItem
                            label="常用手机号码"
                            {...formItemLayout}
                            extra="审核结果将通过短信发送至该手机 ，同时将作为此账号的绑定手机号码。"
                            required
                        >
                            <Input {...getFieldProps('cellPhone',rules.cellPhone)} type="text"/>
                        </FormItem>

                        <FormItem
                            label="联系邮箱"
                            {...formItemLayout}
                        >
                            <Input type="text" {...getFieldProps('email',rules.email)} />
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
                                <Input {...getFieldProps('corporationName',rules.corporationName)} type="text" />
                            </FormItem>

                            <FormItem
                                label="常用手机号码"
                                {...formItemLayout}
                            >
                                <Input {...getFieldProps('corporationCellPhone',rules.corporationCellPhone)} type="text" />
                            </FormItem>

                            <FormItem
                                label="联系邮箱"
                                {...formItemLayout}
                            >
                                <Input {...getFieldProps('corporationEmail',rules.corporationEmail)} type="text" />
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
                          <p className="ant-form-text" id="userName" name="userName">{ this.state.data.companyName }</p>
                        </FormItem>

                        <FormItem
                            label="银行账号"
                            {...formItemLayout}
                            required
                        >
                            <Input type="text" {...getFieldProps('bankAccount',Object.assign({},rules.bankAccount,{ onChange: this.onBankAccountChange.bind(this) }))} placeholder="请输入银行账号"/>
                        </FormItem>

                        <FormItem
                          label="开户行"
                          {...formItemLayout}
                          required
                        >
                          <Select showSearch optionFilterProp="children" notFoundContent="无法找到" {...getFieldProps('bank',Object.assign({},rules.bank,{ onChange: this.onBankChange.bind(this) }))} size="large" placeholder="请选择开户行">
                            { this.state.data.bankList.map( (item,index) => {
                                return (
                                    <Option value={item.B_BankID} key={index}>{item.BankName}</Option>
                                );
                            })}
                          </Select>
                        </FormItem>

                        <FormItem
                          {...formItemLayout}
                          label="所在省份"
                          required
                        >
                            <Select showSearch optionFilterProp="children" notFoundContent="无法找到" placeholder="请选择省份" {...getFieldProps('province',Object.assign({},rules.province,{ onChange: this.onProvinceChange.bind(this) }))} >
                                { this.state.data.provinces.map( (item,index) => {
                                    return (
                                        <Option value={item.B_BankAreaID} key={index}>{item.AreaName}</Option>
                                    );
                                })}
                            </Select>
                        </FormItem>

                        <FormItem
                          {...formItemLayout}
                          label="所在城市"
                          required
                        >
                            <Select showSearch optionFilterProp="children" notFoundContent="无法找到" placeholder={ this.state.data.cityPlaceHolder } {...getFieldProps('city',Object.assign({},rules.city,{ onChange: this.onCityChange.bind(this) }))} disabled={ this.state.data.cityDisabled }>
                                { this.state.data.cities.map( (item,index) => {
                                    return (
                                        <Option value={item.B_BankAreaID} key={index}>{item.AreaName}</Option>
                                    );
                                })}
                            </Select>
                        </FormItem>

                        <FormItem
                          label="分支行"
                          {...formItemLayout}
                          required
                        >
                          <Select showSearch optionFilterProp="children" notFoundContent="无法找到" {...getFieldProps('branch',rules.branch)} placeholder={ this.state.data.branchPlaceHolder } disabled = { this.state.data.branchDisabled } >
                            { this.state.data.branches.map( (item,index) => {
                                return (
                                    <Option value={ item.BranchBankCode } key={ index }>{ item.BranchBankName }</Option>
                                );
                            }) }
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
                                        <p>请在<span className="warning-FontColor">48小时</span>以内，通过<span className="warning-FontColor">网上银行</span>或<span className="warning-FontColor">银行柜台</span>，使用您的对公账户向下面的指定账户支付<span className="warning-FontColor">0.10元</span>验证金 。</p>
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
                                <Button type="primary" onClick={ this.next.bind(this) }>下一步</Button>
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