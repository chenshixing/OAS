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
        onEnter: (nextState, replace) => replace('', 'userRegister')
      },
    },
    // 首页
    {
      path: 'userRegister',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('PAGES/userRegister').default)
        })
      }
    },
      // 个人核身引导页
      {
          path: 'personalValidate/guide',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/personalValidate/guide').default)
              })
          }
      },
      // 个人核身-step1
      {
          path: 'personalValidate/step1',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/personalValidate/step1').default)
              })
          }
      },
      // 个人核身-step2
      {
          path: 'personalValidate/step2',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/personalValidate/step2').default)
              })
          }
      },
      // 个人核身-step3
      {
          path: 'personalValidate/step3',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/personalValidate/step3').default)
              })
          }
      },
      // 个人核身-step4
      {
          path: 'personalValidate/step4',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/personalValidate/step4').default)
              })
          }
      },
      // 企业核身引导页
      {
          path: 'companyValidate/guide',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/companyValidate/guide').default)
              })
          }
      },
      // 企业核身-step1
      {
          path: 'companyValidate/step1',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/companyValidate/step1/index.js').default)
              })
          }
      },
      // 企业核身-step2-1
      {
          path: 'companyValidate/step2-1',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/companyValidate/step2/step2-1.js').default)
              })
          }
      },
      // 企业核身-step2-2
      {
          path: 'companyValidate/step2-2',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/companyValidate/step2/step2-2.js').default)
              })
          }
      },
      // 企业核身-step2
      {
          path: 'companyValidate/step2-2',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/companyValidate/step2/step2-2').default)
              })
          }
      },
      // 企业核身-step3
      {
          path: 'companyValidate/step3-1',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/companyValidate/step3/step3-1').default)
              })
          }
      },
      {
          path: 'companyValidate/step3-2',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/companyValidate/step3/step3-2').default)
              })
          }
      },
      {
          path: 'companyValidate/step3-3',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/companyValidate/step3/step3-3').default)
              })
          }
      },
      // 企业核身-step4
      {
          path: 'companyValidate/step4',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/companyValidate/step4/index').default)
              })
          }
      },
    // test
    {
      path: 'test',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('PAGES/test').default)
        })
      }
    },
    // test2
    {
      path: 'test2',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('PAGES/test2').default)
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
    }
  ]
};

export default <Router history = {hashHistory} routes = {routes} />;
