// 样式
import './style.less';
// react 相关库
import React from 'react';
import {Link} from 'react-router';

// 页面组件
import Frame from 'COM/form/frame';

//自己内部组件
/**
 * StepsBar 步骤
 * Authenticate 验证身份
 * RealNameAuthentication 实名认证
 */
import StepsBar from './StepsBar';
import Authenticate from './Authenticate';
import UnreviewedAuthenticate from './UnreviewedAuthenticate';
import RealNameAuthentication from './RealNameAuthentication';

// antd 组件
import {
    Form,
    Input,
    Button,
    Steps,
    Row,
    Col
} from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;
// 页面
export default class Steps1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            //虚假数据
            data: {
                realName: 'xxx',
                identityCode: '12345',
                phoneNumber: '15999872092',
            },
            //是否审核通过
            isReviewed: false,
            //是否发送
            isSend:false,
            //是否验证
            isValidation:false
        }
    }
    handleNext() {
        this.setState({visible: true});
    }
    //马上认证
    handleOk() {
        this.setState({visible: false});
    }
    //稍后认证，下一步
    handleCancel(e) {
        this.setState({visible: false});
        console.log('e.target', e.target);
        if (e.target.tagName.toLowerCase() == 'span' && e.target.className == '') {
            window.location.href = '/#/personalValidate/step3?_k=REPLACE';
        }
    }
    handleSend(){
        //进入实名验证

        this.state.isSend = true;
        this.forceUpdate();
    }
    render() {
        return (
            <div>

                {/*StepsBar 步骤1*/}
                <StepsBar/>

                {/*UnreviewedAuthenticate 审核不通过时显示*/}
                {/*Authenticate 验证身份*/}
                {/* RealNameAuthentication 实名认证 */}
                {
                    this.state.isReviewed ?
                        (!this.state.isSend ? <Authenticate handleSend={this.handleSend.bind(this)} /> : <RealNameAuthentication data={this.state.data} isValidation={this.state.isValidation} />)
                    :
                        <UnreviewedAuthenticate handleSend={this.handleSend.bind(this)} />
                }
            </div>
        );
    }
}
