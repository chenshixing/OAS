/**
 * 新用户注册
 * 
 * by koen
 * 2016/9/21
 */
// 样式
import './style.less';

// react 相关库
import React from 'react';

// antd 组件
import { Tabs, Alert } from 'antd';
const TabPane = Tabs.TabPane;

// 页面组件
import Frame from 'COM/form/frame';
import FormPerson from './formPerson';
import FormCompany from './formCompany';

// 页面
export default class Reg extends React.Component {
  render() {
    return (
      <Frame title="填写注册信息">
        <Tabs defaultActiveKey="1">
          <TabPane tab="个人用户" key="1">
            <FormPerson />
          </TabPane>
          <TabPane tab="企业用户" key="2">
            <Alert message="您的企业名称与手机号，应与您提交的申请材料信息一致。" type="warning" showIcon />
            <FormCompany />
          </TabPane>
        </Tabs>
      </Frame>
    );
  }
}
