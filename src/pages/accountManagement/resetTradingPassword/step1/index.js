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

import { fetch } from 'UTILS';
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
                getLoginUserSimpleInfo:{},
                getdesensitizemobile:{},
            },
            //是否发送
            isSend:sessionStorage.getItem("isSend") || false,
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
        //发送短信验证码
        fetch('/common/smsAutoCode',{
            body:{
                "businesstype": "register"
            }
        }).then(res=>{
            this.state.isSend = true;
            sessionStorage.setItem("isSend", this.state.isSend);
            this.forceUpdate();
        })
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){

        //用户简单信息(v0.7)
        let p1 = fetch('/user/getLoginUserSimpleInfo');
        //获取姓名及脱敏手机号(v0.2)
        let p2 = fetch('/user/getdesensitizemobile',{
            body:{
                "businesstype": 3
            }
        })

        Promise.all([p1, p2]).then(values => {
          console.log(values);
          this.state.data.getLoginUserSimpleInfo = values[0].data
          this.state.data.getdesensitizemobile = values[1].data
          this.forceUpdate();
        }).catch(reason => {
          console.log(reason)
        });
    }
    render() {
        console.log(this)
        return (
            <div>

                {/*StepsBar 步骤1*/}
                <StepsBar/>

                {/*Authenticate 验证身份*/}
                {/* RealNameAuthentication 实名认证 */}
                {
                    !this.state.isSend
                    ?
                    <Authenticate

                        handleSend={this.handleSend.bind(this)}
                        {...this.state.data}
                    />
                    :
                    <RealNameAuthentication
                        isValidation={this.state.isValidation}
                        {...this.state.data}
                    />
                }
            </div>
        );
    }
}
