/**
 * 企业核身step2
 * limit
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router';

// antd 组件
import { Table, Form, Button, Icon, Steps, Row, Col, message } from 'antd';
const createForm = Form.create;
const Step = Steps.Step;
const FormItem = Form.Item;
// 页面组件
import Frame from 'COM/form/frame';

// 页面组件（导出）
class CompanyValidate extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loading:false,
            data:{
                companyName:'钱途互联'
            },
            dataSource : [{
              key: '1',
              name: '中金支付有限公司客户备付金',
              bank: '招商银行',
              account: '1109 0799 6610 999',
              branch: '北京分行宣武门支行'
            }],
            columns : [{
              title: '账户名称',
              dataIndex: 'name',
              key: 'name',
            }, {
              title: '开户行',
              dataIndex: 'bank',
              key: 'bank',
            }, {
              title: '银行账号',
              dataIndex: 'account',
              key: 'account',
            }, {
              title: '分支行',
              dataIndex: 'branch',
              key: 'branch',
            }],
        }

    }

    render() {

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        return (
            <div>
                <Steps size="default" current={1} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="企业安全验证" />
                    <Step title="提交结果" />
                </Steps>
                <Frame title="企业信息" small="（请务必和证件上的资料保持一致）" className="abc">
                    <Form horizontal className="fn-mt-30">
                        {/*企业信息*/}
                        <FormItemDefault label="企业名称" formItemLayout={formItemLayout} text={this.state.data.companyName}></FormItemDefault>

                        <FormItemDefault label="营业执照类型" formItemLayout={formItemLayout} text="普通营业执照"></FormItemDefault>

                        <FormItemDefault label="营业执照注册号" formItemLayout={formItemLayout} text="100010000100000"></FormItemDefault>

                        <FormItemDefault label="营业执照到期日" formItemLayout={formItemLayout} text="2017-01-29"></FormItemDefault>

                        <FormItemDefault label="组织机构代码" formItemLayout={formItemLayout} text="100010000100000"></FormItemDefault>

                        <div className="form-title fn-mb-30" style={{borderTop:'1px solid #e8e8e8'}}>
                            填写人信息
                            <small className="viceText-FontColor"> (请务必与授权书的资料保持一致。)</small>
                        </div>

                        <FormItemDefault label="代理人姓名" formItemLayout={formItemLayout} text="李彤"></FormItemDefault>

                        <FormItemDefault label="代理人手机号码" formItemLayout={formItemLayout} text="13366666666"></FormItemDefault>

                        <FormItemDefault label="代理人联系邮箱" formItemLayout={formItemLayout} text="litong@litong.com"></FormItemDefault>

                        <FormItemDefault label="法定代表人姓名" formItemLayout={formItemLayout} text="文静"></FormItemDefault>

                        <FormItemDefault label="法定代表人手机号码" formItemLayout={formItemLayout} text="13388888888"></FormItemDefault>

                        <FormItemDefault label="法定代表人联系邮箱" formItemLayout={formItemLayout} text="wenjing@wenjing.com"></FormItemDefault>

                        <div className="form-title fn-mb-30" style={{borderTop:'1px solid #e8e8e8'}}>
                            企业对公账户
                            <small className="viceText-FontColor"> (请务必与授权书的资料保持一致。)</small>
                        </div>

                        <FormItemDefault label="账户名称" formItemLayout={formItemLayout} text="宇宙超级无敌有限公司"></FormItemDefault>

                        <FormItemDefault label="银行账号" formItemLayout={formItemLayout} text="6220 0000 0000 0010 123"></FormItemDefault>

                        <FormItemDefault label="开户行" formItemLayout={formItemLayout} text="招商银行"></FormItemDefault>

                        <FormItemDefault label="所在省市" formItemLayout={formItemLayout} text="广东省广州市"></FormItemDefault>

                        <FormItemDefault label="分支行" formItemLayout={formItemLayout} text="招商银行体育西路分行"></FormItemDefault>

                        <FormItemDefault label="对公账户验证方式" formItemLayout={formItemLayout} text="线下支付小额验证金核验"></FormItemDefault>

                        <Row>
                            <Col offset={1} span={22}>
                                <p>请在48小时以内，通过网上银行或银行柜台，使用您的对公账户向下面的指定账户支付 0.10元 验证金 。</p>
                                <Table className="fn-mt-15" dataSource={this.state.dataSource} columns={this.state.columns} pagination={false}/>
                                <p className="fn-mt-15">若超时支付或公司名和对公账户开户名不一致，验证失败。</p>
                                <p className="fn-mt-15">本平台不收取任何手续费，如产生手续费等，由发卡行收取。</p>
                            </Col>
                        </Row>

                        <Row className="fn-mt-30">
                            <Col span="12" offset="6" className="text-align-center">
                                <Link className="ant-btn ant-btn-primary ant-btn-lg" to="/companyValidate/step3">下一步</Link>
                                <Link to="/companyValidate/step1" className="fn-ml-20">信息有误，返回修改</Link>
                            </Col>
                        </Row>

                    </Form>
                </Frame>
            </div>

        );
    }
}

// 私有组件
class FormItemDefault extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <FormItem
                label={this.props.label}
                {...this.props.formItemLayout}
            >
                <p className="ant-form-text">{this.props.text}</p>
            </FormItem>
        )
    }
}

export default createForm()(CompanyValidate);
