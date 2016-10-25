/**
 * 个人核身step2
 * wuyq
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

import codeimg from 'ASSETS/images/code.png'


// antd 组件
import { Alert, Steps, Button, Modal } from 'antd';
const Step = Steps.Step;

// 页面组件
import Frame from 'COM/form/frame';



// 页面组件（导出）
export default class CompanyValidate extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible: false,
            data:{
                realName:'xxx',
                identityCode:'12345',
                phoneNumber:'15999872092',
                email:'1599987202@163.com'
            }
        }
    }

    handleNext(){
        this.setState({
            visible: true,
        });
    }
    //马上认证
    handleOk() {
        this.setState({
            visible: false,
        });
    }
    //稍后认证，下一步
    handleCancel(e) {
        this.setState({
            visible: false,
        });
        console.log('e.target',e.target);
        if(e.target.tagName.toLowerCase()=='span' && e.target.className==''){
            window.location.href='/#/companyValidate/step3-1?_k=REPLACE';
        }
    }

    render() {
        return (
            <div>
                <Steps size="large" current={1} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="设置交易密码" />
                    <Step title="提交结果" />
                </Steps>
                <div className="form-frame">
                    <div style={{ width: '62%', margin: '0 auto',marginTop:30 }}>
                        <Alert message="实名认证邀请已发送，请下载APP完成认证。"
                               description=" "
                               type="warning"
                               showIcon
                        />
                        <table className="table ant-alert-warning">
                            <tbody>
                            <tr>
                                <th width="15%">法定代表人：</th>
                                <td width="35%"><b className="fs-16">{this.state.data.realName}</b></td>
                                <th width="15%">经办人：</th>
                                <td width="35%"><b className="fs-16">{this.state.data.realName}</b></td>
                            </tr>
                            <tr>
                                <th>身份识别码：</th>
                                <td>{this.state.data.identityCode}</td>
                                <th>身份识别码：</th>
                                <td>{this.state.data.identityCode}</td>
                            </tr>
                            <tr>
                                <th>手机号码：</th>
                                <td>{this.state.data.phoneNumber}</td>
                                <th>手机号码：</th>
                                <td>{this.state.data.phoneNumber}</td>
                            </tr>
                            <tr>
                                <th>邮箱：</th>
                                <td>{this.state.data.email}</td>
                                <th>邮箱：</th>
                                <td>{this.state.data.email}</td>
                            </tr>
                            </tbody>

                        </table>
                        <table className=" table qr-code fn-mt-40">
                            <tbody>
                            <tr>
                                <td>
                                    <div className="fn-pa-10 text-align-center code-border">
                                        <div className="pic"><img src={codeimg}/></div>
                                        <p className="fn-mb-5">扫描二维码即可下载</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="code-right lh-28">
                                        <h3>E+实名认证APP</h3>
                                        <p>支持iPhone及Android，三步完成认证</p>
                                        <p>1.上传身份证 &nbsp; 2.人脸识别 &nbsp; 3.银行卡验证</p>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="text-align-center fn-mt-30">
                            <Button type="primary" size="large" onClick={this.handleNext.bind(this)}>下一步</Button>
                            <a href="/#/companyValidate/step2-1?_k=REPLACE" className="link-standard fn-pl-20">信息有误，返回修改</a>
                        </div>
                    </div>
                </div>
                <Modal title="温馨提示" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                       cancelText="稍后认证，下一步" okText="马上认证"
                >
                    <p>您的实名认证未完成，请尽快完成。</p>
                </Modal>
            </div>

        );
    }
}
