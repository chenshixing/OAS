/*
  公用头部
*/
import React from 'react';

//import img from 'ASSETS/images/logo.png';

export default class Header extends React.Component{
    render() {
      return (
        <div className="the-main-nav-wrap">
          <div className="the-main-nav-box">
            <a href="首页.html" className="logo-wrap">

            </a>
            <div className="login-box ">
              <a href="javascript:;void(0)" title="当前登录用户：Jim">您好，广东益达有限公司</a>
              <a href="javascript:;void(0)" title="首页">首页</a>
              <a href="javascript:;void(0)" title="退出">退出</a>
              <a className="frm-header-link" href="/other">网站其他入口>>></a>
            </div>
          </div>
        </div>

      );
  }
}
