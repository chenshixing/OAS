// react 相关库
import React from 'react';
import {Link} from 'react-router';

// antd 组件
import {Alert} from 'antd';

// 页面
export default class Home extends React.Component {
    render() {
        return (
            <div>
                首页

                <p>
                    <Link to="/accountManagement/home">账户管理首页</Link>
                </p>
                <p>
                    <Link to="/accountManagement/basicInformation">账户管理基本信息</Link>
                </p>
                <p>
                    <Link to="/accountManagement/resetPassword">账户管理修改密码</Link>
                </p>
                <p>
                    <Link to="/accountManagement/resetTradingPassword">账户管理修改交易密码</Link>
                </p>
            </div>
        );
    }
}
