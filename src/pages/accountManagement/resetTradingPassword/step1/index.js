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
    Col,
    message
} from 'antd';
const Step = Steps.Step;
const FormItem = Form.Item;

import { fetch } from 'UTILS';

let iTime = null;


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
                getDesensitizeMobile:{},
                getAccountRealCheckStatus:{},
                getRelatedPersonInfo:[]
            },
            //是否发送
            isSend:sessionStorage.getItem("isSend") || 0,
            //是否验证
            isValidation:false,
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
    //进入实名验证
    handleSend(){
        //发送识别码接口(v0.7)	/common/pinCode
        //如果已经验证
        fetch('/common/pinCode',{
            body:{
                "connectorType":this.state.data.getDesensitizeMobile.connectorType,
                "businessType": 3,
                "isFirst": true
            }
        }).then(res=>{
            sessionStorage.setItem("isSend", 1);
            this.loadPaddingFetchFn();
            this.setState({
                isSend:1
            });
        })
    }
    componentDidMount(){
        console.log("1")
        console.log(typeof this.state.isSend)

        this.loadData();

        //无限请求
        this.loadPaddingFetch(3000);



    }

    //无限请求
    loadPaddingFetch(endTime){
        clearInterval(iTime);
        iTime = setInterval(()=>{
            if(this.state.isSend==1){
                this.loadPaddingFetchFn()
            }
        },endTime)
    }
    //单次请求
    loadPaddingFetchFn(){
        fetch('/user/getAccountRealCheckStatus',{
           body:{
               "businessType": 3
           }
        }).then(res=>{
           if(res.code==200){
               //window.location.href = '/#/accountManagement/resetTradingPassword/step2?_k=c8odmq';
               //this.props.history.push("/accountManagement/resetTradingPassword/step2");
               sessionStorage.removeItem("isSend");
               this.props.history.push({
                   pathname: '/accountManagement/resetTradingPassword/step2'
               })
           }
        })
    }
    componentWillUnmount(){
        clearInterval(iTime);
    }
    loadData(){

        //用户简单信息(v0.7)
        let p1 = fetch('/user/getLoginUserSimpleInfo');
        //获取姓名及脱敏手机号(v0.2)
        let p2 = fetch('/user/getDesensitizeMobile',{
            body:{
                "businessType": 3
            }
        })
        //实名验证
        let p3 = fetch('/user/getAccountRealCheckStatus',{
            body:{
                "businessType": 3
            }
        })

        //  身份实名认证
        let p4 = fetch('/user/getRelatedPersonInfo');

        Promise.all([p1, p2,p3,p4]).then(values => {
          console.log(values);
          this.state.data.getLoginUserSimpleInfo = values[0].data
          this.state.data.getDesensitizeMobile = values[1].data
          this.state.data.getAccountRealCheckStatus = values[2].data
          this.state.data.getRelatedPersonInfo = values[3].data;
          console.log(values[3].data)
          this.forceUpdate();
        }).catch(reason => {

          console.log(reason)
        });
    }
    render() {
        console.log(this)
        //console.log(reason)
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
                        handleSend={this.handleSend.bind(this)}
                    />
                }
            </div>
        );
    }
}
