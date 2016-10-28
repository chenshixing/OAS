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

// 页面
export default class BasicInformation extends React.Component {
    render() {
        return (
            <div>
                <Personal />
                <Company />
            </div>
        );
    }
}
