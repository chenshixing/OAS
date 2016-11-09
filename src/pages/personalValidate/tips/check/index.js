/**
 * 核审核不通过提示页(企业)
 * limit
 */
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

// antd 组件
import { Row, Col, Icon, Button, Table} from 'antd';

import {fetch} from 'UTILS';

//  样式
import  '../style.less';

class Check extends Component {
    constructor(props) {
        super(props);
        this.state={
            userType:'1',//从全局state中获取,用户类型，1：个人；2：企业；
            step:'2',//从全局state中获取,0：未开始，1：执行到第1步，2：执行到第2步，3：执行到第3步，4：执行到第4步，999：完成
            bankCheckStatus:'-1',//银行审核状态，-1：审核中，0：审核不通过，1：审核通过
            showName:'张三',//显示用户名称
        };
    }

    componentDidMount(){
        this.initPage();
    }

    initPage(){
        fetch('/user/getUserCheckStatus.do').then((res)=>{

        },(res)=>{

        });
    }

    render() {
        var text='';
        if(this.state.step!='999'){//资料未提交完成
            var nextStep=`/personalValidate/step${this.state.step}`;
            text=(<div className="ant-col-18">
                        <h4>您好，{this.state.showName}</h4>
                        <p>您的认证资料未填写完，请尽快完成。<Button type='primary' size='small'><Link to={nextStep}>继续填写</Link></Button></p>
                        <p>如需修改已提交的信息，请点击 <Link to='/personalValidate/step1'>重新认证</Link></p>
                  </div>);
        }else if(this.state.step=='999' && this.state.bankCheckStatus =='0'){//资料已提交完成，审核中
            text=(<div className="ant-col-18">
                        <h4>您好，{this.state.showName}</h4>
                        <p>账号正在审核中，我们将尽快完成审核，结果将以短信通知您。</p>
                        <p>请尽快完成以下认证条件，如需修改信息请联系客服电话：400-106-6698。</p>
                  </div>);
        }else if(this.state.step=='999' && this.state.bankCheckStatus =='-1'){//资料已提交完成，但审核不通过
            text=(<div className="ant-col-18">
                        <h4>您好，{this.state.showName}</h4>
                        <p>您的资料审核不通过，具体原因请联系分行客户经理。</p>
                        <p>您需要修改资料后重新提交认证申请，如有疑问请联系客服电话：400-106-6698。</p>
                  </div>);
        }

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
                        <Col span={6}><span className="success-FontColor1">已提交</span></Col>
                    </Row>
                    <Row className="infoRow">
                        <Col span={6}>实名认证</Col>
                        <Col span={6}><span className="error-FontColor1">待认证</span></Col>
                        <Col span={6}><Link to='/'>重新发送验证短信</Link></Col>
                    </Row>
                </Row>
                <Row className="tipsRow pl-50">
                    <p>如您想更换账号，请点击 <Link to='/'>重新登录</Link>。</p>
                </Row>
            </div>
        );
    }
}

export default Check;

