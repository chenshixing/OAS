/**
 * 核审核不通过提示页(企业)
 * limit
 */
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

// antd 组件
import { Row, Col, Icon, Button, Table,message,Modal} from 'antd';

import {fetch,helper} from 'UTILS';
// 获取全局state
import State from 'PAGES/redirect/state';

//  样式
import  '../style.less';

class Check extends Component {
    constructor(props) {
        super(props);
        const {data,sysInfo} = State.getState();
        this.state={
            userType:data && data.userType,//从全局state中获取,用户类型，1：个人；2：企业；
            step:data && data.step,//从全局state中获取,0：未开始，1：执行到第1步，2：执行到第2步，3：执行到第3步，4：执行到第4步，999：完成
            bankCheckStatus:data && data.bankCheckStatus,//银行审核状态，-1：审核中，0：审核不通过，1：审核通过
            showName:data && data.showName,//显示用户名称
            PerBasicInfoText:'',
            PerRealText:'',
            logoutUrl:sysInfo && sysInfo.logoutUrl
        };
    }

    componentDidMount(){
        this.initPage();
    }

    initPage(){
        fetch('/common/getLoginCheckStatus.do').then((res)=>{
            this.state.userType=res.data.userType;
            this.state.step=res.data.step;
            this.state.bankCheckStatus=res.data.bankCheckStatus;
            this.state.showName=res.data.showName;

            fetch('/user/getUserCheckStatus.do').then((res)=>{
                if(res.data.userType=='1'){
                    var obj = helper.convertUserCheckStatus(res.data.checkItems);
                    console.log('convertUserCheckStatus:',obj);
                    var PerBasicInfoText='待提交';
                    var PerRealText='待认证';
                    //审核状态，-1：待审核；0:未通过；1：通过；2：审核中
                    //系统：systemStatus 银行：bankStatus

                    const {PerBasicInfo,PerReal} = obj;
                    if(PerBasicInfo.systemStatus=='-1'){
                        PerBasicInfoText=<span className="error-FontColor1">待提交</span>;
                    }else{
                        PerBasicInfoText=<span className="success-FontColor1">已提交</span>;
                    }

                    if(PerReal.systemStatus=='-1'){
                        PerRealText=<span className="error-FontColor1">待认证</span>;
                    }else{
                        PerRealText=<span className="success-FontColor1">已认证</span>;
                    }

                    // this.setState({
                    //     PerBasicInfoText:PerBasicInfoText,
                    //     PerRealText:PerRealText,
                    // });
                    this.state.PerBasicInfoText=PerBasicInfoText;
                    this.state.PerRealText=PerRealText;

                    this.forceUpdate();
                }
            });
            
        })
        
    }

    //重新提交认证申请
    reVerify(){
        fetch('/personVerification/resubmitVerification.do').then((res)=>{
            Modal.success({
                title: '审核申请已提交，请耐心等待结果。',
                content: (
                    <div>
                        <p>我们将尽快完成审核，结果将以短信通知您。</p>
                        <p>如需修改信息请联系客服电话：400-106-6698。</p>
                    </div>
                ),
            });
            this.setState({
                bankCheckStatus:-1   //审核中
            });
        },(res)=>{
            message.error(`(${res.code})${res.message}`,3);
        });
    }

    reValidata(){
        fetch('/personVerification/resetStep.do').then((res)=>{
            this.props.history.push('/personalValidate/step1');
        },(res)=>{
            message.error(`(${res.code})${res.message}`,3);
        });
    }

    render() {
        var text='';
        var reVerify=null;
        if(this.state.step!='999'){//资料未提交完成
            var nextStep=`/personalValidate/step${this.state.step}`;
            console.log('nextStep:',nextStep);
            text=(<div className="ant-col-18">
                        <h4>您好，{this.state.showName}</h4>
                        <p>您的认证资料未填写完，请尽快完成。<Button type='primary' size='small'><Link to={nextStep}>继续填写</Link></Button></p>
                        <p>如需修改已提交的信息，请点击 <a href='javascript:void(0)' onClick={this.reValidata.bind(this)}>重新认证</a></p>
                  </div>);
        }else if(this.state.step=='999' && this.state.bankCheckStatus =='-1'){//资料已提交完成，审核中
            text=(<div className="ant-col-18">
                        <h4>您好，{this.state.showName}</h4>
                        <p>账号正在审核中，我们将尽快完成审核，结果将以短信通知您。</p>
                        <p>请尽快完成以下认证条件，如需修改信息请联系客服电话：400-106-6698。</p>
                  </div>);
        }else if(this.state.step=='999' && this.state.bankCheckStatus =='0'){//资料已提交完成，但审核不通过
            text=(<div className="ant-col-18">
                        <h4>您好，{this.state.showName}</h4>
                        <p>您的资料审核不通过，具体原因请联系分行客户经理。</p>
                        <p>您需要修改资料后重新提交认证申请，如有疑问请联系客服电话：400-106-6698。</p>
                  </div>);
            reVerify=(<Row>如确认申请资料无误，请重新申请认证，点击 <Button type="primary" size='small' onClick={this.reVerify.bind(this)}>提交认证申请</Button></Row>);
        }

        const {PerBasicInfoText,PerRealText} = this.state;

        return (
            <div className="tipsBox">
                <Row className="tipsRow">
                    <div className="ant-col-3 text-align-center">
                        <Icon type="exclamation-circle" className="tipsIcon exclamation"/>
                    </div>
                        {text}
                </Row>
                <Row className="tipsRow">
                    <Row className="infoRow">
                        <Col span={6}>个人基本资料</Col>
                        {/*
                            <Col span={6}><span className="success-FontColor1">{PerBasicInfoText}</span></Col>
                        */}
                        <Col span={6}>{PerBasicInfoText}</Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6}>实名认证</Col>
                        {/*
                            <Col span={6}><span className="error-FontColor1">{PerRealText}</span></Col>
                        */}
                        <Col span={6}>{PerRealText}</Col>
                    </Row>
                    {reVerify}
                </Row>
                <Row className="tipsRow pl-50">
                    <p>如您想更换账号，请点击 <a href={this.state.logoutUrl}>重新登录</a>。</p>
                </Row>
            </div>
        );
    }
}

export default Check;
