/**
 * 企业核身step1
 * limit
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router';

// antd 组件
import { Form, Input, Select, Button, Upload, Icon, Steps, Radio, DatePicker, Checkbox, Row, Col, Modal, message } from 'antd';
const createForm = Form.create;
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
//  表单验证配置
import formValidation from '../components/formValidation';
// 页面组件
import Frame from 'COM/form/frame';

//  业务组件
import OffLinePayTable from '../components/offlinePayTable';
import Account from '../components/accountComponent';

//  引入fetch
import { fetch } from 'UTILS';

//  引入moment
import moment from 'moment';

//  引入store
import store from 'store';

// 页面组件（导出）
class CompanyValidate extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loading:false,
            display : 'block',
            visible : false,
            data:{
                companyName: "",
                companyPaperType:"2",
                isLongEndTime:false,
                writerType : '1'
            }
        }

        this.onLongEndTimeChange=this.onLongEndTimeChange.bind(this);
    }

    componentDidMount() {
        this.dataRender();
    }

    dataRender(){
        let me = this;
        let data = me.state.data;
        let fieldsValue = store.get('cvs1FieldsValue');
        if(!fieldsValue){ return false; }
        // console.log(fieldsValue);
        //  企业名称处理
        data.companyName = fieldsValue.companyName;
        //  营业执照类型处理
        data.companyPaperType = fieldsValue.companyPaperType;
        //  营业执照到期日处理
        if(fieldsValue.registrationExtendField2){
            fieldsValue.registrationExtendField2 = moment(fieldsValue.registrationExtendField2)._d;
        }
        data.isLongEndTime = fieldsValue.isLongEndTime;
        //  填写人的身份处理
        data.writerType = fieldsValue.writerType;
        let display = "block";
        if(data.writerType == "2"){
            //  法定代表人TODO
            display = "none";
        }
        // console.log(fieldsValue);
        //  证件号转字符串处理
        if(fieldsValue.companyPaperType == 2){
            fieldsValue.registrationPaperNo = fieldsValue.registrationPaperNo ? fieldsValue.registrationPaperNo.toString() : "";
            fieldsValue.orgInsCodePaperNo = fieldsValue.orgInsCodePaperNo ? fieldsValue.orgInsCodePaperNo.toString() : "";
        }else{
            fieldsValue.socialCreditPaperNo = fieldsValue.socialCreditPaperNo ? fieldsValue.socialCreditPaperNo.toString() : "";
        }

        me.setState({
            display : display,
            data : data
        });
        this.props.form.setFieldsValue(fieldsValue);
    }

    onCompanyNameChange(e){
        let data = this.state.data;
        data.companyName = e.target.value;
        this.setState({
            data : data
        });
    }

    onWriterTypeChange(e) {
        console.log('radio checked', e.target.value);
        let display = e.target.value == "1" ? "block" : "none";
        if(this.state.display == display){ return false;}
        if(e.target.value == "2"){
            this.warning();
        }
        this.setState({
            display : display
        });
    }

    warning() {
      Modal.warning({
        title: '提示',
        content: '您将以法定代表人身份作为该企业账号的全权委托代理人，日后使用该账号发起的融资申请必须由法定代表人本人操作。',
      });
    }

    onCompanyPaperTypeChange(e) {
        console.log('radio checked', e.target.value);
        let data=this.state.data;
        data.companyPaperType=e.target.value;
        this.setState({
            data: data
        });
    }

    onLongEndTimeChange(e){
        console.log('e:',e.target.checked);
        let data=this.state.data;
        data.isLongEndTime=e.target.checked;
        // if(e.target.checked){
        //     this.props.form.setFieldsValue({registrationExtendField2:""});
        // }
        this.setState({data:data});
    }

    //  点击下一步
    next(){
        let me = this;
        //  本地存储表单信息
        let fieldsValue = this.props.form.getFieldsValue();
        store.set('cvs1FieldsValue',fieldsValue);
        // 表单校验
        this.props.form.validateFieldsAndScroll((errors, data) => {
          if (errors) {
            console.log(errors);
            console.log(data);
            return false;
          }
          console.log("passed");
          // console.log(data);
          // 验证通过TODO
          let submitData = me._getSubmitData(data);
          me.submit(submitData);
        });
    }

    submit(submitData){
        console.log(submitData);
        fetch('/companyVerification/saveBasicInfo.do',{
            body : submitData
        }).then(res => {
            if(res.code == 200){
                //  提交成功TODO
                console.log('next finish');
                this.props.history.push('/companyValidate/step2');
            }
        });
    }

    //  获取提交数据
    _getSubmitData(data){
        let map = this.refs.Account.state.data.map;
        let submitData = data;

        //  账户名称
        submitData.accountName = submitData.companyName;

        //  添加银行账户相关的名称
        submitData.bankName = map.bank[submitData.bankId];
        submitData.provinceName = map.province[submitData.provinceId];
        submitData.cityName = map.city[submitData.cityId];
        submitData.branchBankName = map.branch[submitData.branchBankId];

        // 证件类型
        if(submitData.companyPaperType == 2){
            //  普通营业执照TODO
            delete submitData.socialCreditPaperNo;
        }else if(submitData.companyPaperType == 3){
            //  社会信用证TODO
            delete submitData.registrationPaperNo;
            delete submitData.orgInsCodePaperNo;
        }

        //  营业执照到期日
        if(submitData.isLongEndTime){
            submitData.registrationExtendField2 = "长期";
        }else{
            submitData.registrationExtendField2 = moment(submitData.registrationExtendField2).format('YYYY-MM-DD');
        }
        delete submitData.isLongEndTime;

        // 填写人类型
        let client = client = {
            name : submitData.name,
            mobile : submitData.mobile,
            email : submitData.email
        };
        let corperator = undefined;
        if(submitData.writerType == 1){
            //  委托代理人TODO
            corperator = {
                name : submitData.corporationName,
                mobile : submitData.corporationMobile,
                email : submitData.corporationEmail
            };
        }
        let companyConnectorInfoDto = {
            writerType : submitData.writerType,
            client : client
        }

        if(corperator){
            companyConnectorInfoDto.corperator = corperator;
        }
        submitData.companyConnectorInfoDto = companyConnectorInfoDto;
        delete submitData.writerType;
        delete submitData.name;
        delete submitData.mobile;
        delete submitData.email;
        delete submitData.corporationName;
        delete submitData.corporationMobile;
        delete submitData.corporationEmail;

        for (let prop in submitData){
            if(submitData[prop] === undefined){
                delete submitData[prop];
            }
        }

        return submitData;
    }

    render() {
        // console.log("limit");
        // 表单校验

        // 根据营业执照类型类型选择验证机制
        const rulesBusiness = this.state.data.companyPaperType == 2 ? formValidation.rulesCommon : formValidation.rulesMultiple;

        //  根据填写人身份选择验证机制
        const rulesFill = this.state.data.writerType == '1' ? formValidation.rulesAgent : {};

        // 根据不同类型选择验证机制
        let rules = Object.assign({},formValidation.rulesBase,rulesBusiness,rulesFill);

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        const { getFieldProps } = this.props.form;
        const displayTypeCommon=this.state.data.companyPaperType == 2 ? 'block' : 'none';
        const displayTypeMultiple=this.state.data.companyPaperType == 3 ? 'block' : 'none';

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
                            <RadioGroup {...getFieldProps('companyPaperType',{ initialValue: this.state.data.companyPaperType,onChange: this.onCompanyPaperTypeChange.bind(this) })}>
                                <Radio value="2">普通营业执照</Radio>
                                <Radio value="3">多证合一营业执照</Radio>
                            </RadioGroup>

                        </FormItem>

                        <div style={{display:displayTypeCommon}}>
                            <FormItem
                                {...formItemLayout}
                                label="营业执照注册号"
                                required
                            >
                                <Input {...getFieldProps('registrationPaperNo',rules.registrationPaperNo)} type="text"/>
                            </FormItem>
                        </div>

                        <div style={{display:displayTypeMultiple}}>
                            <FormItem
                                {...formItemLayout}
                                label="统一社会信用代码"
                                required
                            >
                                <Input {...getFieldProps('socialCreditPaperNo',rules.socialCreditPaperNo)} type="text"/>
                            </FormItem>
                        </div>

                        <FormItem
                            {...formItemLayout}
                            label=" 营业执照到期日"
                            required
                        >
                            <Col span="8">
                                { this.state.data.isLongEndTime === true ?
                                    <FormItem validateStatus="success" help={null}>
                                        <DatePicker {...getFieldProps('registrationExtendField2')} disabled={true} />
                                    </FormItem>
                                    :
                                    <FormItem>
                                        <DatePicker {...getFieldProps('registrationExtendField2',rules.registrationExtendField2)} disabled={false} />
                                    </FormItem>
                                }
                            </Col>
                            <Col span="5">
                                <Checkbox {...getFieldProps('isLongEndTime',{onChange:this.onLongEndTimeChange})} checked={ this.state.data.isLongEndTime }>长期</Checkbox>
                            </Col>
                        </FormItem>

                        <div style={{display:displayTypeCommon}}>
                            <FormItem
                                {...formItemLayout}
                                label="组织机构代码"
                                required
                            >
                                <Input {...getFieldProps('orgInsCodePaperNo',rules.orgInsCodePaperNo)} type="text"/>
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
                            <Input {...getFieldProps('mobile',rules.mobile)} type="text"/>
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
                            <RadioGroup {...getFieldProps('writerType',{ initialValue: this.state.data.writerType, onChange: this.onWriterTypeChange.bind(this) })}>
                                <Radio value="1">我是委托代理人</Radio>
                                <Radio value="2">我是法定代表人</Radio>
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
                                <Input {...getFieldProps('corporationMobile',rules.corporationMobile )} type="text" />
                            </FormItem>

                            <FormItem
                                label="联系邮箱"
                                {...formItemLayout}
                            >
                                <Input {...getFieldProps('corporationEmail',rules.corporationEmail)} type="text" />
                            </FormItem>
                        </div>

                        <Account ref="Account" getFieldProps={ getFieldProps }  rules = { rules } form={ this.props.form } companyName = {this.state.data.companyName}/>

                        <Row className="fn-mt-30">
                            <Col span="12" offset="6" className="text-align-center">
                                <Button type="primary" onClick={ this.next.bind(this) }>下一步</Button>
                            </Col>
                        </Row>
                    </Form>

                </Frame>
            </div>

        );
    }
}

export default createForm()(CompanyValidate);