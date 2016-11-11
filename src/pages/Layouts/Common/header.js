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
      let showName = '';
      if(this.props.dat){
        showName = this.props.data.data;
      }
      return (
        <div className="the-main-nav-wrap">
          <div className="the-main-nav-box">
            <a href="首页.html" className="logo-wrap">

            </a>
            <div className="login-box ">
              {showName? <a href="javascript:;void(0)" title="当前登录用户">您好，{showName}</a> : null}
              <a href="javascript:;void(0)" title="首页">首页</a>
              {showName? <a href="javascript:;void(0)" title="退出">退出</a> : null}
            </div>
          </div>
        </div>

      );
  }
}
