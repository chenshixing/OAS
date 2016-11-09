/**
 * 核审提示页(企业)
 * limit
 */
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

// antd 组件
import { Row, Col, Icon, Button} from 'antd';

//  业务组件
import TipsContent from '../components/tipsContent';

//  样式
import  '../style.less';

//  全局状态
import State from 'PAGES/redirect/state';
// const globalState = State.getState();

//  登录对接完成后去掉
const globalState = {
    userType : 2,
    step : 999,                 //  0:未开始;1:第一步;2:第二步;3:第三步;4:第四步;999:完成;
    bankCheckStatus : 0,       //  -1:审核中;0:审核不通过;1:审核通过
    showName : "用户名称"
}

class Check extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        //  没有完成 核身信息补充提示页
        let pageType = "supplement";
        if(globalState.step == 999){
            //  完成
            if(globalState.bankCheckStatus == -1){
                //  审核中提示页
                pageType = "check";
            }else if(globalState.bankCheckStatus == 0){
                //  审核不通过提示页
                pageType = "disapproval";
            }
        }
        this.state = {
            pageType : pageType,
        }
    }

    headerRender(){
        //  中转
        return this["_" + this.state.pageType]();
    }

    continueToFill(){
        let step = globalState.step == 0 ? 1 : globalState.step;
        this.props.history.push('/companyValidate/step' + step);
    }

    _supplement(){
        return (
            <Row className="tipsRow">
                <Col span={3} className="text-align-center">
                    <Icon type="exclamation-circle" className="tipsIcon exclamation"/>
                </Col>
                <Col span={21}>
                    <h4>广东亿达有限公司</h4>
                    <p>您的认证资料未填写完，请尽快完成。<Button type="primary" onClick={ this.continueToFill.bind(this) }>继续填写</Button></p>
                    <p>如需修改已提交信息，请点击<Link to='/companyValidate/step1'>重新认证</Link>。</p>
                </Col>
            </Row>
        );
    }

    _check(){
        return (
            <Row className="tipsRow">
                <Col span={3} className="text-align-center">
                    <Icon type="exclamation-circle" className="tipsIcon exclamation"/>
                </Col>
                <Col span={21}>
                    <h4>广东亿达有限公司</h4>
                    <p>请根据您的实际情况尽快完成以下未认证项，如需修改信息请联系客服电话：400-106-6698。</p>
                </Col>
            </Row>
        );
    }

    _disapproval(){
        return (
            <Row className="tipsRow">
                <Col span={3} className="text-align-center">
                    <Icon type="cross-circle" className="tipsIcon across"/>
                </Col>
                <Col span={21}>
                    <h4>广东亿达有限公司</h4>
                    <p>您的资料审核不通过，具体原因请联系分行客户经理。</p>
                    <p>您需要修改资料后重新提交认证申请，如有疑问请联系客服电话：400-106-6698。</p>
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <div className="tipsBox">
                { this.headerRender() }
                <TipsContent pageType={ this.state.pageType } />
            </div>
        );
    }
}

export default Check;

