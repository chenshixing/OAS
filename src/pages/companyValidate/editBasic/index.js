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
import ComfirmContent from '../components/comfirmContent';

//  引入fetch
import { fetch } from 'UTILS';

//  引入moment
import moment from 'moment';

const propsMap = {
    companyName : "企业名称",
    companyPaperType : "证件类型",
    registrationPaperNo : "营业执照号",
    registrationExtendField2 : "证件到期日",
    orgInsCodePaperNo : "组织机构代码",
    socialCreditPaperNo : "社会信用证代码",
    accountName : "账户名称",
    cardNo : "银行卡号",
    bankId : "开户行ID",
    bankName : "开户行名称",
    provinceId : "省份ID",
    provinceName : "省份名称",
    cityId : "城市ID",
    cityName : "城市名称",
    branchBankId : "分支行ID",
    branchBankName : "分支行名称",
    validateType : "对公账户验证方式",
}

const companyPaperTypeMap = {
    2 : "普通营业执照",
    3 : "多证合一营业执照"
}

const validateTypeMap = {
    OffLinePayAuth : "线下支付小额验证金核验",
    OffLineSubmitInfo : "线下提交账户资料核验"
}

// 页面组件（导出）
class CompanyValidate extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loading:false,
            data:{
                companyName: "",
                companyPaperType:"2",
                isLongEndTime:false,
                validateType:'OffLinePayAuth',
                provinces : [],
                cities : [],
                bankList : [],
                cityPlaceHolder : "请先选择省份",
                cityDisabled : true,
                branchDisabled : true,
                branchPlaceHolder : "请先选择开户行和所在城市",
                branches : [],
                map : {
                    bank : {},
                    province : {},
                    city: {},
                    branch : {}
                }
            }
        }

        this.onLongEndTimeChange=this.onLongEndTimeChange.bind(this);
    }

    componentDidMount() {
        this.loadData(this.dataRender.bind(this));
    }

    loadData(callBack){
        let me = this;
        let data = me.state.data;
        //  银行列表信息
        let p1 = fetch('/bank/banklist');
        //  省份列表信息
        let p2 = fetch('/bank/provinces');

        Promise.all([p1, p2]).then(res => {
            // console.log(res);
            data.bankList = res[0].data;
            // console.log(data.bankList);

            data.provinces = res[1].data;
            // console.log(data.provinces);
            //  配置映射表
            data.bankList.map( (item,index) => {
                data.map.bank[item.B_BankID] = item.BankName;
            });
            data.provinces.map( (item,index) => {
                data.map.province[item.B_BankAreaID] = item.AreaName;
            });

            me.setState({
                data : data
            });

            callBack && callBack();
        }).catch(reason => {
            console.log(reason)
        });
    }

    dataRender(){
        let me = this;
        let data = me.state.data;
        //  企业信息
        let p1 = fetch('/companyVerification/getCompanyInfo');
        //  企业对公账户信息
        let p2 = fetch('/companyVerification/getBankAccountInfo');

        Promise.all([p1,p2]).then(res => {
            //  数据合并
            let renderData = Object.assign({},res[0].data,res[1].data);

            //  营业执照类型
            data.companyPaperType = renderData.companyPaperType;
            //  营业执照到期日
            if(renderData.registrationExtendField2 == "长期"){
                renderData.registrationExtendField2 = null;
                data.isLongEndTime = renderData.isLongEndTime = true;
            }else{
                renderData.registrationExtendField2 = moment(renderData.registrationExtendField2)._d;
            }
            //  账户名称
            data.companyName = renderData.companyName;
            //  开户行
            data.bankId = renderData.bankId;
            //  所在省份
            me.onProvinceChange(renderData.provinceId);
            //  所在城市
            data.cityId = renderData.cityId;
            //  获取分支行信息
            this._getBranch();
            //  对公账户验证方式
            data.validateType = renderData.validateType;
            //  证件号转字符串处理
            if(renderData.companyPaperType == 2){
                renderData.registrationPaperNo = renderData.registrationPaperNo.toString();
                renderData.orgInsCodePaperNo = renderData.orgInsCodePaperNo.toString();
            }else{
                renderData.socialCreditPaperNo = renderData.socialCreditPaperNo.toString();
            }

            me.setState({
                data : data
            });

            me.props.form.setFieldsValue(renderData);
            // console.log(data);
            // console.log(renderData);
        }).catch(reason => {
            console.log(reason)
        });
    }

    onCompanyNameChange(e){
        let data = this.state.data;
        data.companyName = e.target.value;
        this.setState({
            data : data
        });
    }

    onCardNoChange(e,value){
        let me = this;
        let data = me.state.data;
        let cardNo = value ? value : e.target.value;
        if(cardNo.length < 4){ return false; }      //  输入银行账号长度大于4才去请求匹配开户行
        fetch('/bank/cardNumber',{
            body:{
              "cardNumber": cardNo
            }
        }).then(res => {
            if(res.code == 200){
                let bankId = res.data.B_BankID;
                data.bankId = bankId;
                me.setState({
                    data : data
                });
                me.props.form.setFieldsValue({
                    bankId : bankId
                });
            }
        });
    }

    onProvinceChange(value){
        let me = this;
        let data = me.state.data;
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

                //  配置映射表
                data.cities.map( (item,index) => {
                    data.map.city[item.B_BankAreaID] = item.AreaName;
                });
                me.setState({
                    data : data
                });
            }
        });
    }

    onBankChange(value){
        let data = this.state.data;
        data.bankId = value;
        // console.log(data);
        this._getBranch();
    }

    onCityChange(value){
        let data = this.state.data;
        data.cityId = value;
        this._getBranch();
    }

    _getBranch(){
        let me = this;
        let data = me.state.data;
        // console.log(data);
        if( data.bankId && data.cityId ){
            fetch('/bank/branchlist',{
                body:{
                  "bankId": data.bankId,
                  "cityId": data.cityId
                }
            }).then(res => {
                if(res.code == 200){
                    data.branches = res.data;
                    data.branchPlaceHolder = "请选择分支行";
                    data.branchDisabled = false;

                    //  配置映射表
                    data.branches.map( (item,index) => {
                        data.map.branch[item.BranchBankCode] = item.BranchBankName;
                    });
                    me.setState({
                        data : data
                    });
                }
            });
        }
    }

    onCompanyPaperTypeChange(e) {
        console.log('radio checked', e.target.value);
        let data=this.state.data;
        data.companyPaperType=e.target.value;
        this.setState({
            data: data
        });
    }

    onValidateTypeChange(e) {
        console.log('radio checked', e.target.value);
        let data=this.state.data;
        if(data.validateType === e.target.value){ return false;}
        data.validateType = e.target.value;
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
        // console.log(data);
    }

    normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    //  点击下一步
    next(){
        let me = this;
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
          // me.submit(submitData);
          me.confirm(submitData);
        });
    }

    confirm(submitData){
        let me = this;
        Modal.confirm({
            title: '信息确认',
            content: me.getConfirmContent(submitData),
            okText: '确定',
            cancelText: '取消',
            onOk() {
                // console.log('确定');
                me.submit(submitData);
            }
        });
    }

    //  确定窗口数据渲染
    getConfirmContent(submitData){
        console.log(submitData);
        const basic = ["companyName","companyPaperType","registrationExtendField2","accountName","cardNo","bankName","provinceName","cityName","branchBankName","validateType"];
        const common = ["registrationPaperNo","orgInsCodePaperNo"];
        const multiple = ["socialCreditPaperNo"];
        const props = basic.concat(submitData.companyPaperType == 2 ? common : multiple);
        let kvp = {};
        props.map( (item,index) => {
            kvp[item] = submitData[item];
        });
        kvp.companyPaperType = companyPaperTypeMap[kvp.companyPaperType];
        kvp.validateType = validateTypeMap[kvp.validateType];
        let sort = ["companyName","companyPaperType","registrationPaperNo","orgInsCodePaperNo","socialCreditPaperNo","registrationExtendField2","accountName","cardNo","bankName","provinceName","cityName","branchBankName","validateType"];
        let map = propsMap;
        let data = {
            kvp : kvp,
            sort : sort,
            map : map
        }
        return (
            <ComfirmContent data={data} />
        );
    }

    submit(submitData){
        console.log(submitData);
        fetch('/companyVerification/modifyCompanyInfo',{
            body : submitData
        }).then(res => {
            if(res.code == 200){
                //  提交成功TODO
                console.log('next finish');
                // this.props.history.push('/companyValidate/step2');
            }
        });
    }

    //  获取提交数据
    _getSubmitData(data){
        let map = this.state.data.map;
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

        // 根据不同类型选择验证机制
        let rules = Object.assign({},formValidation.rulesBase,rulesBusiness);

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        const { getFieldProps } = this.props.form;
        const displayTypeCommon=this.state.data.companyPaperType == 2 ? 'block' : 'none';
        const displayTypeMultiple=this.state.data.companyPaperType == 3 ? 'block' : 'none';

        return (
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
                            <Input type="text" {...getFieldProps('cardNo',Object.assign({},rules.cardNo,{ onChange: this.onCardNoChange.bind(this) }))} placeholder="请输入银行账号"/>
                        </FormItem>

                        <FormItem
                          label="开户行"
                          {...formItemLayout}
                          required
                        >
                          <Select showSearch optionFilterProp="children" notFoundContent="无法找到" {...getFieldProps('bankId',Object.assign({},rules.bankId,{ onChange: this.onBankChange.bind(this) }))} size="large" placeholder="请选择开户行">
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
                            <Select showSearch optionFilterProp="children" notFoundContent="无法找到" placeholder="请选择省份" {...getFieldProps('provinceId',Object.assign({},rules.provinceId,{ onChange: this.onProvinceChange.bind(this) }))} >
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
                            <Select showSearch optionFilterProp="children" notFoundContent="无法找到" placeholder={ this.state.data.cityPlaceHolder } {...getFieldProps('cityId',Object.assign({},rules.cityId,{ onChange: this.onCityChange.bind(this) }))} disabled={ this.state.data.cityDisabled }>
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
                          <Select showSearch optionFilterProp="children" notFoundContent="无法找到" {...getFieldProps('branchBankId',rules.branchBankId)} placeholder={ this.state.data.branchPlaceHolder } disabled = { this.state.data.branchDisabled } >
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
                            <RadioGroup {...getFieldProps('validateType',{ initialValue: this.state.data.validateType , onChange : this.onValidateTypeChange.bind(this)})}>
                                <Radio value="OffLinePayAuth">线下支付小额验证金核验</Radio>
                                <Radio value="OffLineSubmitInfo">线下提交账户资料核验</Radio>
                            </RadioGroup>

                        </FormItem>

                        <Row>
                            <Col offset={1} span={22} className="fn-pa-20" style={{border:'1px solid #e8e8e8'}}>
                                <Row style={{display:this.state.data.validateType == 'OffLinePayAuth' ? 'block' : 'none'}}>
                                    <Col offset={1} span={22}>
                                        <OffLinePayTable />
                                    </Col>
                                </Row>
                                <Row style={{display:this.state.data.validateType == 'OffLineSubmitInfo' ? 'block' : 'none'}}>
                                    <Col offset={1} span={22}>
                                        <p>需要您提供对公账户的相关资料，具体请联系核心企业或企业合作分行。</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row className="fn-mt-30">
                            <Col span="12" offset="6" className="text-align-center">
                                <Button type="primary" onClick={ this.next.bind(this) }>下一步</Button>
                                <Link className="fn-ml-20" to="/">暂不修改</Link>
                            </Col>
                        </Row>
                    </Form>

                </Frame>
        );
    }
}

export default createForm()(CompanyValidate);