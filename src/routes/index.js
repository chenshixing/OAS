/*
	Routes 路由配置
*/
import React from 'react';
import { Router, hashHistory } from 'react-router';

const routes = {
  childRoutes: [
    // 不需要公用头部/尾部的页面
    // 登录
      {
          path: 'userLogin',
          getComponent(nextState, cb) {
              require.ensure([], (require) => {
                  cb(null, require('PAGES/userLogin').default);
              });
          }
      },


    // 带头部/尾部样式
    {
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
          // 注册
          {
              path: 'userRegister',
              getComponent(nextState, cb) {
                  require.ensure([], (require) => {
                      cb(null, require('PAGES/userRegister').default);
                  });
              }
          },
        /***************核身页面 ***************/
        // 审核中提示页(企业)
        {
            path: 'personalValidate/tips/check',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('PAGES/personalValidate/tips/check/index.js').default)
                })
            }
        },
        // 核身信息补充提示页(企业)
        {
            path: 'personalValidate/tips/supplement',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('PAGES/personalValidate/tips/supplement/index.js').default)
                })
            }
        },
        // 核审核不通过提示页(企业)
        {
            path: 'personalValidate/tips/disapproval',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('PAGES/personalValidate/tips/disapproval/index.js').default)
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
        // 审核中提示页(企业)
        {
            path: 'companyValidate/tips/check',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('PAGES/companyValidate/tips/check/index.js').default)
                })
            }
        },
        // 核身信息补充提示页(企业)
        {
            path: 'companyValidate/tips/supplement',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('PAGES/companyValidate/tips/supplement/index.js').default)
                })
            }
        },
        // 核审核不通过提示页(企业)
        {
            path: 'companyValidate/tips/disapproval',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    cb(null, require('PAGES/companyValidate/tips/disapproval/index.js').default)
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
        // 企业核身-step2
        {
          path: 'companyValidate/step2',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('PAGES/companyValidate/step2/index.js').default)
            })
          }
        },
        // 企业核身-step3
        {
          path: 'companyValidate/step3',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('PAGES/companyValidate/step3/index.js').default)
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
        /***************核身页面 end ***************/
        /*************** 账户管理 ***************/
        // 账户管理首页
        {
          path: 'accountManagement/home',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('PAGES/accountManagement/home').default);
            });
          }
        },
        // 账户管理基本信息（个人）
        {
          path: 'accountManagement/basicInformation/personal',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('PAGES/accountManagement/basicInformation/personal').default);
            });
          }
        },
          // 账户管理基本信息（公司）
          {
              path: 'accountManagement/basicInformation/company',
              getComponent(nextState, cb) {
                  require.ensure([], (require) => {
                      cb(null, require('PAGES/accountManagement/basicInformation/company').default);
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
        // 账户管理修改交易密码 步骤1
        {
          path: 'accountManagement/resetTradingPassword/Steps1',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('PAGES/accountManagement/resetTradingPassword/Steps1').default);
            });
          }
        },
        // 账户管理修改交易密码 步骤2
        {
          path: 'accountManagement/resetTradingPassword/Steps2',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('PAGES/accountManagement/resetTradingPassword/Steps2').default);
            });
          }
        },
        // 账户管理修改交易密码 步骤3
        {
          path: 'accountManagement/resetTradingPassword/Steps3',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('PAGES/accountManagement/resetTradingPassword/Steps3').default);
            });
          }
        },
        /***************账户管理 end ***************/
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
    }



  ]
};

export default <Router history = {hashHistory} routes = {routes} />;
