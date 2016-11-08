// react 相关库
import React from 'react';
import {Link} from 'react-router';

// 页面组件
import Sms from 'BCOM/Sms/index';

// antd 组件
import {
    Button,
    Icon,
    Tag,
    message,
    Row,
    Col
} from 'antd';

// 页面
export default class basicBodyEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
        }

    }
    //个人用户 或者 企业用户
    UserTypeTemplate(item) {
        let items = {
            1: <Tag color="blue">个人用户</Tag>,
            2: <Tag color="blue">企业用户</Tag>
        };
        return items[item]
    }
    //判断完成状态
    GetLoginCheckStatusTemplate(type) {
        //判断 获取登录后判断状态  银行审核状态，-1：审核中，0：审核不通过，1：审核通过
        //执行到的步骤，0：未开始，1：执行到第1步，2：执行到第2步，3：执行到第3步，4：执行到第4步，999：完成
        let iSuccess = (type.bankCheckStatus == 1 && type.step == 999);
        let result = null;
        if (iSuccess) {
            result = (
                <span>
                    <span className="fn-mr-10"><Icon type="check"/></span>
                    您已完成全部安全设置，请放心使用本系统的功能。
                </span>
            )

        } else {
            result = (
                <span>
                    <span className="error-FontColor1 fn-mr-10"><Icon type="cross"/></span>
                    建议您完成全部安全设置，以保障账户及资金安全。
                </span>
            )
        }
        return result;
    }
    //获取用户审核状态组合后的数据
    getUserCheckStatusCheckItems() {

        let checkItems = this.props.data.getUserCheckStatus.checkItems || [];
        let checkItemsJson = {}
        checkItems.map( (item,index) => {
            checkItemsJson[item.checkKey] = item;
        })
        return checkItemsJson;
    }
    //基本信息
    basicInformationTemplate(userType){
        let items = {
            1:(
                <div className="fn-mtb-10">
                    <Row type="flex" justify="start" align="middle">
                        <Col span={2}>
                            <Icon type="check"/>
                        </Col>
                        <Col span={6}>
                            <h3>
                                基本信息
                            </h3>
                        </Col>
                        <Col span={12}>您的基本信息已完善。如资料有变更，请及时更新，这将有助于加快您的业务申请进度。</Col>
                    </Row>
                </div>
            ),
            2:(
                <div className="fn-mtb-10">
                    <Row type="flex" justify="start" align="middle">
                        <Col span={2}>
                            <Icon type="check"/>
                        </Col>
                        <Col span={6}>
                            <h3>
                                企业信息
                            </h3>
                        </Col>
                        <Col span={12}>企业的基本信息已完善。如资料有变更，请及时更新，这将有助于加快您的业务申请进度。</Col>
                    </Row>
                </div>
            )

        }
        return items[userType]
    }
    //实名验证内容
    getRelatedPersonInfoTemplate(items,type){
        let smsData = {};
        let p1 = "";
        if(type==1){
            p1 = items.map((item,index)=>{
                if(item.connectorType==3){
                    smsData = {
                        name: item.realName,
                        identityCode: item.identityCode,
                    }
                    return (

                        <div key={index} className="fn-mtb-10">
                            <Row type="flex" justify="start" align="middle">

                                <Col span={2}>
                                    {
                                        item.checkPass>0
                                        ?
                                        <Icon type="check"/>
                                        :
                                        <Icon type="cross" className="error-FontColor1" />
                                    }
                                </Col>

                                <Col span={6}>
                                    <h3>
                                        实名验证
                                    </h3>
                                </Col>

                                <Col span={4}>
                                    姓名：
                                </Col>
                                <Col span={4}>
                                    {item.realName}
                                </Col>
                                <Col span={8}>
                                    {
                                        item.checkPass>0
                                        ?
                                        <span
                                            className="success-FontColor1"
                                            style={{width:80,display:"inline-block"}}
                                            >
                                            已验证
                                        </span>
                                        :
                                        <span>
                                            <span
                                                className="error-FontColor1"
                                                style={{width:190,display:"inline-block"}}
                                                >
                                                未认证
                                            </span>
                                            <span colSpan={2}>
                                                <Sms data={ smsData } businesstype={1}>重新发送验证短信</Sms>
                                                {/*
                                                    <a href="javascript:;" className="link-standard">
                                                    重新发送验证短信</a>
                                                */}
                                            </span>
                                        </span>
                                    }
                                </Col>
                            </Row>
                        </div>
                    )
                }
            })
        }else if(type==2){
            let result = items.every((item,index)=>{
                return item.checkPass>0
            })

            p1 = items.map((item,index)=>{
                    smsData = {
                        name: item.realName,
                        identityCode: item.identityCode,
                        connectorType: item.connectorType
                    }
                    return (
                        <div key={index} className="fn-mtb-10">
                            <Row type="flex" justify="start" align="middle">
                                {
                                    index==0
                                    ?
                                    <Col span={2}>
                                        {
                                            result
                                            ?
                                            <Icon type="check"/>
                                            :
                                            <Icon type="cross" className="error-FontColor1" />
                                        }
                                    </Col>
                                    :
                                    <Col span={2}>
                                        &nbsp;
                                    </Col>
                                }
                                {
                                    index==0
                                    ?
                                    <Col span={6}>
                                        <h3>
                                            实名验证
                                        </h3>
                                    </Col>
                                    :
                                    <Col span={6}>
                                        &nbsp;
                                    </Col>
                                }


                                <Col span={4}>
                                    { item.connectorType == 2 ? "法定代表人" : "委托代理人"}姓名：
                                </Col>
                                <Col span={4}>
                                    {item.realName}
                                </Col>
                                <Col span={8}>
                                    {
                                        item.checkPass>0
                                        ?
                                        <span
                                            className="success-FontColor1"
                                            style={{width:80,display:"inline-block"}}
                                            >
                                            已验证
                                        </span>
                                        :
                                        <span>
                                            <span
                                                className="error-FontColor1"
                                                style={{width:190,display:"inline-block"}}
                                                >
                                                未认证
                                            </span>
                                            <span colSpan={2}>
                                                <Sms data={ smsData } businesstype={1}>重新发送验证短信</Sms>
                                                {/*
                                                    <a href="javascript:;" className="link-standard">
                                                    重新发送验证短信</a>
                                                */}
                                            </span>
                                        </span>
                                    }
                                </Col>
                            </Row>
                        </div>
                    )

            })
        }


        return p1;
    }
    //证件资料，只有企业才有证件资料。
    getCompanyPaperInfoStatusTemplate(type,userType){
        let template = ""
        if(userType==2){
                template = (
                    <div className="fn-mtb-10">
                        <Row type="flex" justify="start" align="middle">
                            <Col span={2}>
                                {
                                    type.EnPaper && (type.EnPaper.checkStatus==1)
                                    ?
                                    <span className="fn-mr-10"><Icon type="check" /></span>
                                    :
                                    <span className="error-FontColor1 fn-mr-10"><Icon type="cross" /></span>
                                }

                            </Col>
                            <Col span={6}>
                                <h3>
                                    证件资料
                                </h3>
                            </Col>
                            <Col span={12}>
                                如资料有变更，请及时更新。
                            </Col>
                            <Col span={4}>
                                <Link to="/companyValidate/documentUpload" className="ant-btn ant-btn-primary">
                                    <Icon type="edit" />
                                    修改
                                </Link>
                            </Col>

                        </Row>
                    </div>
                )

        }
        return template;
    }

    //登录密码
    resetPasswordTemplate(){
        let template = "";

        template = (
            <div className="fn-mtb-10">
                <Row type="flex" justify="start" align="middle">
                    <Col span={2}>
                        <Icon type="check"/>
                    </Col>
                    <Col span={6}>
                        <h3>
                            登录密码
                        </h3>
                    </Col>
                    <Col span={12}>
                        修改更高级别的密码能提高帐号的安全性。
                    </Col>
                    <Col span={4}>
                        <Link className="ant-btn ant-btn-primary" to="/accountManagement/resetPassword/step1">
                            <Icon type="edit" />修改
                        </Link>
                    </Col>
                </Row>
            </div>
        )

        return template;
    }
    //交易密码
    resetTradingPasswordTemplate(getIsSetPayPassword){

        let template = "";

        template = (
            <div className="fn-mtb-10">
                <Row type="flex" justify="start" align="middle">
                    <Col span={2}>
                        {
                            getIsSetPayPassword==true
                            ?
                            <Icon type="check"/>
                            :
                            <Icon type="cross" className="error-FontColor1" />
                        }

                    </Col>
                    <Col span={6}>
                        <h3>
                            交易密码
                        </h3>
                    </Col>
                    <Col span={12}>
                        关联证书：保护账户资金安全，在修改资料、融资申请以及使用其他会员服务时，需要验证交易密码。
                    </Col>
                    <Col span={4}>
                        <Button
                            type="primary"
                            onClick={this.handleGetIsSetPayPasswordTemplateEditor.bind(this,getIsSetPayPassword)}
                            >
                            <Icon type="edit" />修改
                        </Button>
                    </Col>
                    </Row>
            </div>
        )

        return template;
    }
    //修改交易密码
    handleGetIsSetPayPasswordTemplateEditor(isValida){

        if(isValida===true){
            this.props.history.push('/accountManagement/resetTradingPassword/step1')
        }else{
            message.error("您的实名认证未完成，完成后才可进行此操作。")
        }
    }
    //绑定手机
    getBindMobileTemplate(item){
        let template = "";

        template = (
            <div className="fn-mtb-10">
                <Row type="flex" justify="start" align="middle">
                    <Col span={2}>
                        {
                            item
                            ?
                            <Icon type="check" />
                            :
                            <Icon type="cross" className="error-FontColor1" />
                        }
                    </Col>
                    <Col span={6}>
                        <h3>
                            绑定手机
                        </h3>
                    </Col>
                    <Col span={12}>
                        绑定手机号：{item}。保护账户资金安全，在修改资料、融资申请以及使用其他会员服务时，需要验证绑定手机。
                    </Col>
                </Row>
            </div>
        )


        return template;
    }
    //银行账户,对公账户
    /**
     * userType 个人企业
     * checkItems //获取用户审核状态组合后的数据
     * getCompanyAccountCheckStatus 获取对公账号的银行账号
     */
    getCompanyAccountCheckStatusTemplate(userType,checkItems,getCompanyAccountCheckStatus,getCheckedBank){
        console.log("getCheckedBank=》")
        console.log(getCheckedBank)
        let template = "";

        if(userType==1){
            template = (
                <div className="fn-mtb-10">
                    <Row type="flex" justify="start" align="middle">
                        <Col span={2}>
                            {
                                getCheckedBank.checkStatus && (getCheckedBank.checkStatus == 1 )
                                ?
                                <Icon type="check"/>
                                :
                                <Icon type="cross" className="error-FontColor1"  />
                            }
                        </Col>
                        <Col span={6}>
                            <h3>
                                银行账户
                            </h3>
                        </Col>
                        <Col span={12}>
                            默认账户：
                            <span>{getCheckedBank.bankName} | {getCheckedBank.cardNo}。</span>
                        </Col>
                    </Row>
                </div>
            )
        }else{
            template = (
                <div className="fn-mtb-10">
                    <Row type="flex" justify="start" align="middle">
                        <Col span={2}>
                            {
                                checkItems.EnAccount && (checkItems.EnAccount.checkStatus == 1 )
                                ?
                                <Icon type="check"/>
                                :
                                <Icon type="cross" className="error-FontColor1"  />
                            }

                        </Col>
                        <Col span={6}>
                            <h3>
                                对公账户
                            </h3>
                        </Col>
                        <Col span={12}>
                            默认账户：
                            {
                                getCompanyAccountCheckStatus && getCompanyAccountCheckStatus.length>0
                                ?
                                getCompanyAccountCheckStatus.map((item,index)=>{
                                    return (
                                        <span key={index}>{item.bankName} | {item.cardNo}。</span>
                                    )
                                })
                                :
                                <span>没有可用的银行账号</span>
                            }
                        </Col>
                    </Row>
                </div>
            )

        }


        return template;
    }

    render() {
        /**
         * 获取用户审核状态(v0.4)	/user/getUserCheckStatus
         * 用户简单信息(v2.2)	/user/getLoginUserSimpleInfo
         * 获取登录后判断状态(v0.4)	/common/getLoginCheckStatus
         * 获取用户信息填写人（关系人）信息(v2.6)	/user/getRelatedPersonInfo
         * 获取绑定手机(v0.4)	/user/getBindMobile
         * 是否设置交易密码(v0.4)	/user/getIsSetPayPassword
         * 获取对公账户验证状态(v1.6)	/user/getCompanyAccountCheckStatus
         * 获取已核身银行账号(v0.6)	/person/getCheckedBank
         */
        const {
            getUserCheckStatus,
            getLoginUserSimpleInfo,
            getLoginCheckStatus,
            getRelatedPersonInfo,
            getBindMobile,
            getIsSetPayPassword,
            getCompanyAccountCheckStatus,
            getCheckedBank
        } = this.props.data;
        /**
        * userType 判断个人或者企业
        * 个人=>1
        * 企业=>2
        */
        const userType = getUserCheckStatus.userType;
        //个人用户/企业用户
        const UserTypeTemplate = this.UserTypeTemplate(userType);
        //建议完成基本资料
        const GetLoginCheckStatusTemplate = this.GetLoginCheckStatusTemplate(getLoginCheckStatus);
        //获取用户审核状态组合后的数据
        /**
         * 审核项Key，
         * EnBasicInfo ：企业_基本信息，
         * EnOperator ：企业_经办人，
         * EnLegalPerson ：企业_法人，
         * EnPaper ：企业_证件，
         * EnAccount ：企业_对公账号，
         * PerBasicInfo ：个人_基本信息，
         * PerReal ：个人_实名
         */
        let getUserCheckStatusCheckItems  = this.getUserCheckStatusCheckItems();

        //基本信息
        const basicInformationTemplate = this.basicInformationTemplate(userType);

        //实名验证内容
        const getRelatedPersonInfoTemplate = this.getRelatedPersonInfoTemplate(getRelatedPersonInfo,userType);

        //证件资料
        let getCompanyPaperInfoStatusTemplate = this.getCompanyPaperInfoStatusTemplate(getUserCheckStatusCheckItems,userType);
        //登录密码
        let resetPasswordTemplate = this.resetPasswordTemplate();
        //交易密码
        let resetTradingPasswordTemplate = this.resetTradingPasswordTemplate(getIsSetPayPassword);
        //绑定手机
        let getBindMobileTemplate = this.getBindMobileTemplate(getBindMobile);
        //银行账户/对公账户
        let getCompanyAccountCheckStatusTemplate = this.getCompanyAccountCheckStatusTemplate(userType,getUserCheckStatusCheckItems,getCompanyAccountCheckStatus,getCheckedBank);


        return (

            <div>

                <div className="fn-mtb-20 ">
                    <h3>
                        <span className="fn-mr-10">下午好，{getLoginUserSimpleInfo.name}</span>
                        {UserTypeTemplate}
                    </h3>

                    <div className="alert alert-warning fn-mt-10">
                        <i></i>
                        <em></em>
                        {GetLoginCheckStatusTemplate}
                    </div>
                </div>
                <div className="fn-mtb-20">
                    {/*基本信息*/}
                    {basicInformationTemplate}
                    {/*实名验证*/}
                    {getRelatedPersonInfoTemplate}
                    {/*证件资料*/}
                    {getCompanyPaperInfoStatusTemplate}
                    {/*登录密码*/}
                    {resetPasswordTemplate}
                    {/*交易密码*/}
                    {resetTradingPasswordTemplate}
                    {/*绑定手机*/}
                    {getBindMobileTemplate}
                    {/*银行卡号和对公账号*/}
                    {getCompanyAccountCheckStatusTemplate}
                </div>
            </div>

        );
    }
}