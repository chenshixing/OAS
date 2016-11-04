/*
	layout主页面
*/
import React from 'react';

import Header from './Common/header';
import Footer from './Common/footer';

// Loading icon
import { Spin } from 'antd';

import State from './state';

export default class Index extends React.Component{
    constructor(props) {
        super(props);
        this.state = State.bind(this).getState();
        // 导出方法
        State.showLoading = () => this.setLoading(true);
        State.hideLoading = () => this.setLoading(false);
    }
    setLoading(bool) {
        State.setState({
            loading: bool
        });
    }
    render() {
      return (
          <div className="main-frm">
            <Spin spinning={this.state.loading}>
            <Header />
            <div className="frame-wrap-bg">
              <div className="frame-wrap">
                {/* 主内容区 */}
                {this.props.children}
              </div>
            </div>
            <Footer />
            </Spin>
          </div>
      );
  }
}
