// react 相关库
import React from 'react';

//自己内部组件
/**
 *  Personal 个人
 *  Company 公司
 */
import BasicBody from './basicBody';

// antd 组件
import { Alert, Steps, Button } from 'antd';
import { Link } from 'react-router';
const Step = Steps.Step;

//fetch
import { fetch } from 'UTILS';

// 页面
export default class BasicInformation extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:{
                getLoginUserSimpleInfo:{},
                getCompanyPaperInfoStatus:{},
                getIsSetPayPassword:null,
                getBindMobile:null,
            }
        }
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        //用户简单信息
        let p1 = fetch('/user/getLoginUserSimpleInfo');
        //获取绑定手机(v0.2)
        let p2 = fetch('/user/getBindMobile');
        //是否设置交易密码(v0.2)
        let p3 = fetch('/user/getIsSetPayPassword');
        //获取对公账户验证状态(v0.9)
        let p4 = fetch('/user/getAccountCheckStatus');
        //获取用户信息填写人（关系人）信息(v1.4)
        let p5 = fetch('/user/getRelatedPersonInfo');
        //企业资料提交状态(v0.5)
        let p6 = fetch('/paper/getCompanyPaperInfoStatus');

        Promise.all([p1, p2,p3,p4,p5,p6]).then(values => {
          console.log(values);
          this.state.data.getLoginUserSimpleInfo = values[0].data
          this.state.data.getBindMobile = values[1].data
          this.state.data.getIsSetPayPassword = values[2].data
          this.state.data.getAccountCheckStatus = values[3].data
          this.state.data.getRelatedPersonInfo = values[4].data
          this.state.data.getCompanyPaperInfoStatus = values[5].data
          this.forceUpdate();
        }).catch(reason => {
          console.log(reason)
        });
    }
    render() {
        console.log(this)

        return (
            <div>
                {/*
                    this.state.data.getLoginUserSimpleInfo.userType==1
                    ?
                    <Personal {...this.state.data} />
                    :
                    <Company />
                */}
               {/*个人和企业写一起了。*/}
               <BasicBody {...this.state} />


            </div>
        );
    }
}
