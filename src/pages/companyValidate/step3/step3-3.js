/**
 * 个人核身step3
 * yongquan.wu
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';
// 导入公共样式
import 'ASSETS/less/main.less';

//导入本页面样式
import './style.less';

// 页面组件
import Frame from 'COM/form/frame';

// antd 组件
import { Button, Form, Input, Checkbox, Steps, Row, Col, Card, Icon } from 'antd';
import classNames from 'classnames';
const createForm = Form.create;
const FormItem = Form.Item;
const Step = Steps.Step;

function noop() {
    return false;
}

class CompanyValidate extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
            window.location.href='/#/companyValidate/step4?_k=REPLACE';
        });
    }

    render() {
        const { getFieldProps } = this.props.form;

        const rules={
            password:{
                rules: [
                    { required: true, whitespace: true, message: '请填写密码' },
                ]
            },
            agreement:{
                rules:[
                    { required: true, message: '协议..' },
                ],
                initialValue: false,
                valuePropName: 'checked'
            },
        }
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        return (
            <div>
                <Steps size="big" current={2} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="企业安全认证" />
                    <Step title="提交结果" />
                </Steps>
                <Frame title="企业对公账户确认">
                    <div>
                        <h4 className="fn-mtb-30 text-align-center">请在 <span className="color_blue">48小时</span> 以内，通过<span className="color_blue">网上银行</span>或<span className="color_blue">银行柜台</span>，使用您的对公账户向指定收款账户支付验证金 <span className="color_red">0.10</span> 元。</h4>

                        <div className="tableCard" style={{ background: '#ECECEC', padding: '30px 60px' }}>
                            <Row>
                                <Col span="10">
                                    <Card title="您的对公账户" bordered={false}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        账户名称
                                                    </th>
                                                    <td>
                                                        广东亿达有限公司
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        开户行
                                                    </th>
                                                    <td>
                                                        招商银行
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        银行账号
                                                    </th>
                                                    <td>
                                                        1209 0930 1510 603
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        分支行
                                                    </th>
                                                    <td>
                                                        北京分行宣武门支行
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Card>
                                </Col>
                                <Col span="4">
                                    <div className="icon-right">
                                        <Icon type="double-right" />
                                    </div>

                                </Col>
                                <Col span="10">
                                    <Card title="指定收款账户" bordered={true}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        账户名称
                                                    </th>
                                                    <td>
                                                        中金支付有限公司客户备付金
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        开户行
                                                    </th>
                                                    <td>
                                                        招商银行
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        银行账号
                                                    </th>
                                                    <td>
                                                        1109  0799  6610  999
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        分支行
                                                    </th>
                                                    <td>
                                                        北京分行宣武门支行
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <Col span="16" offset="8">
                                <ul className="cardTip">
                                    <li>若超时支付或公司名和对公账户开户名不一致，验证失败。</li>
                                    <li>本平台不收取任何手续费，如产生手续费等，由发卡行收取。</li>
                                </ul>
                            </Col>
                        </Row>

                        <Form horizontal className="fn-mt-30">

                            <Row className="fn-mb-20">
                                <Col span="24">
                                    <Col span="12" offset="8">
                                        <Checkbox {...getFieldProps('agreement')}>我已阅读并同意
                                            <a href="">《用户服务协议》</a> 、<a href="">《企业征信查询授权书》</a>
                                        </Checkbox>
                                    </Col>
                                </Col>
                            </Row>

                            <FormItem
                                {...formItemLayout}
                                label="交易密码"
                            >
                                <Input  type="password" {...getFieldProps('password',rules.password)}
                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                            autoComplete="off" />
                            </FormItem>

                            <Row className="fn-mt-30">
                                    <Col span="12" offset="8">
                                        <Button type="primary" style={{marginRight : 20}} size="large" onClick={this.handleSubmit.bind(this)}>确认信息无误</Button>
                                        <a herf="">修改对公账户</a>
                                    </Col>
                            </Row>
                        </Form>
                    </div>
                </Frame>
            </div>

        );
    }
}



export default Form.create()(CompanyValidate);
