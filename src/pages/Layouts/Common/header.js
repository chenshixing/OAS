/*
  公用头部
*/
import React from 'react';

//import img from 'ASSETS/images/logo.png';



export default class Header extends React.Component{
    shouldComponentUpdate(nextProps, nextState) {
      //console.log(nextProps.data.data)
      if(nextProps.data && nextProps.data.data === null)
        return false;
      else
        return true;
    }
    render() {
      const { showName } = this.props.state.data;
      const { logoutUrl } = this.props.state.sysInfo;
      return (
        <div className="the-main-nav-wrap">
          <div className="the-main-nav-box">
            <a href="/" className="logo-wrap">

            </a>
            <div className="login-box ">
              {showName? <a title={`当前登录用户${showName}`}>您好，{showName}</a> : null}
              <a href="/" title="首页">首页</a>
              {showName? <a href={logoutUrl} title="退出">退出</a> : null}
            </div>
          </div>
        </div>

      );
  }
}
