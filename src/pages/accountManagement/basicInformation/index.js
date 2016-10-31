// react 相关库
import React from 'react';

//自己内部组件
/**
 *  Personal 个人
 *  Company 公司
 */
import Personal from './personal';
import Company from './company';

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
            data:{}
        }
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        //用户简单信息
        fetch('/user/getLoginUserSimpleInfo').then(res => {
            console.log(res)
            this.setState(res)
        });
    }
    render() {
        console.log(this)

        return (
            <div>
                {
                    this.state.data.userType==1
                    ?
                    <Personal />
                    :
                    <Company />
                }


            </div>
        );
    }
}
