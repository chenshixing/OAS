// react 相关库
import React from 'react';

//自己内部组件
/**
 *  Personal 个人
 *  Company 公司
 */
import BasicBodyEditor from './basicBodyEditor';

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
                getUserCheckStatus:{
                    checkItems:[],
                },
                getLoginUserSimpleInfo:{},
                getLoginCheckStatus:{},
                getRelatedPersonInfo:{

                }
            },
            history:this.props.history
        }
    }
    componentDidMount() {
        this.loadData();
    }
    // loadData() {
    //     //用户简单信息
    //     let p1 = fetch('/user/getLoginUserSimpleInfo');
    //     //获取绑定手机(v0.2)
    //     let p2 = fetch('/user/getBindMobile');
    //     //是否设置交易密码(v0.2)
    //     let p3 = fetch('/user/getIsSetPayPassword');
    //     //获取对公账户验证状态(v0.9) getAccountCheckStatus
    //     let p4 = fetch('/user/getCompanyAccountCheckStatus');
    //     //获取用户信息填写人（关系人）信息(v1.4) //实名认证
    //     let p5 = fetch('/user/getRelatedPersonInfo');
    //     //企业资料提交状态(v0.5)
    //     let p6 = fetch('/paper/getCompanyPaperInfoStatus');
    //     //获取登录后判断状态
    //     let p7 = fetch('/common/getLoginCheckStatus');
    //
    //
    //     Promise.all([p1, p2,p3,p4,p5,p6,p7]).then(values => {
    //       //console.log(values);
    //       this.state.data.getLoginUserSimpleInfo = values[0].data
    //       this.state.data.getBindMobile = values[1].data
    //       this.state.data.getIsSetPayPassword = values[2].data
    //       this.state.data.getCompanyAccountCheckStatus = values[3].data
    //       this.state.data.getRelatedPersonInfo = values[4].data
    //       this.state.data.getCompanyPaperInfoStatus = values[5].data
    //       this.state.data.getLoginCheckStatus = values[6].data
    //       console.log(this.state.data.getLoginCheckStatus)
    //       this.forceUpdate();
    //     }).catch(reason => {
    //       console.log(reason)
    //     });
    // }
    loadData(){




        //获取用户审核状态(v0.4)
        let p1 = fetch('/user/getUserCheckStatus');
        //用户简单信息(v2.2)
        let p2 = fetch('/user/getLoginUserSimpleInfo');
        //获取登录后判断状态(v0.4)
        let p3 = fetch('/common/getLoginCheckStatus');
        //获取绑定手机(v0.4)	/user/getBindMobile
        let p4 = fetch('/user/getBindMobile');
        //是否设置交易密码(v0.4)	/user/getIsSetPayPassword
        let p5 = fetch('/user/getIsSetPayPassword');
        //获取对公账户验证状态(v1.6)	/user/getCompanyAccountCheckStatus
        let p6 = fetch('/user/getCompanyAccountCheckStatus');
        //获取已核身银行账号(v0.6)	/person/getCheckedBank
        let p7 = fetch('/person/getCheckedBank');
        //获取用户信息填写人（关系人）信息(v2.6)
        let p8 = fetch('/user/getRelatedPersonInfo');




        Promise.all([p1,p2,p3,p4,p5,p6,p7,p8]).then(values => {
          //console.log(values);
          this.state.data.getUserCheckStatus = values[0].data
          this.state.data.getLoginUserSimpleInfo = values[1].data
          this.state.data.getLoginCheckStatus = values[2].data
          this.state.data.getBindMobile = values[3].data
          this.state.data.getIsSetPayPassword = values[4].data
          this.state.data.getCompanyAccountCheckStatus = values[5].data
          this.state.data.getCheckedBank = values[6].data
          this.state.data.getRelatedPersonInfo = values[7].data
          //this.state.data.getRelatedPersonInfo = values[7].data
          //this.state.data.getRelatedPersonInfo = values[3].data

          console.log(this.state.data)
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
               <BasicBodyEditor {...this.state} />


            </div>
        );
    }
}
