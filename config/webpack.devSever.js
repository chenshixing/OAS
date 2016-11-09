/**
 * 连开发环境构建配置
 */
const path = require('path');
const webpack = require('webpack');
// 公用配置
const commonConfig = require('./webpack.common');
// WDS
const utils = require('./utils');
const HOST = utils.getIP();
const PORT = 8090;

module.exports = Object.assign(commonConfig, {
    devtool: 'cheap-source-map', // 'eval'
    cache: true,
    plugins: commonConfig.plugins.concat([
        // 配置全局常量
        new webpack.DefinePlugin({
            'process.env': { // React/Redux打包常用
                NODE_ENV: JSON.stringify('development')
            },
            __DEV__: true,
            __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
        })
    ]),
    // webpack dev server 配置
    devServer: {
        host: HOST,
        port: PORT,
        proxy: {
            '/api/*': {
                target: 'http://accountcmb.frontpay.cn/',
                //target: 'http://192.168.9.154:8081/',
                pathRewrite: {
                    '^/api': ''
                },
                secure: false
            }
        }
    }
});
