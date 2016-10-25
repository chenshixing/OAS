/*
	Routes 路由配置
*/
import React from 'react';
import { Router, hashHistory } from 'react-router';

const routes = {
  component: require('PAGES/Layouts').default,
  childRoutes: [{
      // 首页跳转
      path: '/',
      indexRoute: {
        onEnter: (nextState, replace) => replace('', 'home')
      },
    },
    // 首页
    {
      path: 'home',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('PAGES/home').default)
        })
      }
    },
    // 404
    {
      path: '*',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('PAGES/404').default);
        });
      }
    },
    // 账户管理首页
    {
      path: 'accountManagement/home',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('PAGES/accountManagement/home').default);
        });
      }
    },
    // 账户管理基本信息
    {
      path: 'accountManagement/basicInformation',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('PAGES/accountManagement/basicInformation').default);
        });
      }
    },
    // 账户管理修改密码
    {
      path: 'accountManagement/resetPassword',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('PAGES/accountManagement/resetPassword').default);
        });
      }
    },
    // 账户管理修改交易密码
    {
      path: 'accountManagement/resetTradingPassword',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('PAGES/accountManagement/resetTradingPassword').default);
        });
      }
    }

  ]
};

export default <Router history = {hashHistory} routes = {routes} />;
