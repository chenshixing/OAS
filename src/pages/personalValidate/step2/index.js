/**
 * 个人核身step2
 * xing
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

import codeimg from 'ASSETS/images/code.png';
import classnames from 'classnames';
import store from 'store';



import { Link } from 'react-router';

import { IdentityModal } from 'BCOM/Modal/index';

// antd 组件
import { Alert, Steps, Button, Modal, Row, Col } from 'antd';
const Step = Steps.Step;

// 页面组件
import Frame from 'COM/form/frame';
import {helper,fetch} from 'UTILS';



// 页面组件（导出）
export default class PersonalValidate extends React.Component {
    constructor(props){
        super(props);
        this.state={
            identityVisible: false,
            isSendMsgDisabled:false,
            btnSendText:'没有收到短信，重新发送',
            data:{
                realName:'',
                identityCode:'12345',
                phoneNumber:''
            }
        }
        
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    showIdentityModal() {
        this.setState({
          identityVisible: true,
        });
    }

    closeIdentityModal() {
        this.setState({
          identityVisible: false,
        });
    }

    //手动点击下一步
    handleNextClick(){
        this.props.history.push({
            pathname:'/personalValidate/step3'
        })

        //未验证提醒
        // Modal.info({
        //     title: '实名认证提示',
        //     content: (
        //     <div>
        //         <p>您的实名认证未完成，请尽快完成。</p>
        //     </div>
        //     ),
        //     onOk() {},
        // });
    }

    //发送身份识别码
    sendMsg(countNum){
        if(this.state.isSendMsgDisabled) return;
        var that=this;

        fetch('/common/pinCode',{
            body:{
                "businesstype": 1,
                "connectortype": 1
            }
        }).then((res)=>{
            if(res.code=='200'){
                console.log('身份识别码发送成功..');
                countDown(countNum);
            }
        });

        function countDown(){
            that.setState({
                isSendMsgDisabled:true
            });
            
            var count=countNum;
            let timer = setInterval(()=>{
                count--;
                if(count>0){
                    that.setState({
                        btnSendText:`发送成功，${count}秒后可重新发送`
                    });
                store.set('counter_inPersonalValidateStep2',count);
                }else{
                    clearInterval(timer);
                    store.set('counter_inPersonalValidateStep2',0);
                    that.setState({
                        btnSendText:`没有收到短信，重新发送`,
                        isSendMsgDisabled:false
                    });
                }
            },1000)
        }
    }

    componentDidMount(){
        this.initPage();
        let countNum=parseInt(store.get('counter_inPersonalValidateStep2'));
        if(countNum && countNum>0){
            this.sendMsg(countNum);
        }
    }
    //页面信息初始化请求
    initPage(){
        fetch('/user/getdesensitizemobile',{body:{"businesstype": 1}}).then((res)=>{
            console.log(res);
            if(res.code=='200'){
                this.setState({
                    data:{
                        realName:res.data.name,
                        phoneNumber:res.data.mobile
                    }
                });
            }
        });
    }

    render() {
        const sendMsgCls=classnames({
            color_gray:this.state.isSendMsgDisabled
        });
        return (
            <div>
                <Steps size="default" current={1} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="设置交易密码" />
                    <Step title="提交结果" />
                </Steps>
                <Frame title="实名认证" className="">
                    <Row className="fn-mt-30">
                        <Col span={12} offset={6}>
                            <p>
                                姓名： <span className='name'>{this.state.data.realName}</span>，您的身份识别码已发送到手机{helper.hidenPhoneNumber(this.state.data.phoneNumber)}。
                                <a href='javascript:void(0)' onClick={this.sendMsg.bind(this,60)} className={sendMsgCls}>{this.state.btnSendText}</a>
                            </p>
                            <p className='fn-mt-10'>
                                请下载实名认证APP完成认证。
                                <Button type="primary" className='fn-ml-5' onClick={this.showIdentityModal.bind(this)}>详细操作步骤</Button>
                            </p>
                        </Col>
                    </Row>
                    <Row className="text-align-center fn-mt-30">
                        <p>扫描二维码下载实名认证APP，支持IOS和安卓</p>
                        <div className="pic"><img src={codeimg}/></div>
                    </Row>
                    <Row className="text-align-center fn-mt-30">
                        <p>实名认证成功后页面自动跳转，如没有跳转请点击 <Button className='fn-ml-5' onClick={this.handleNextClick.bind(this)} type="primary">已完成认证</Button></p>
                    </Row>
                </Frame>
                <IdentityModal visible={ this.state.identityVisible } closeCallBack={ this.closeIdentityModal.bind(this) }/>
            </div>
        );
    }
}
