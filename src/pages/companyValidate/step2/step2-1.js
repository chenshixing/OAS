/**
 * 企业核身step2-1
 * yongquan.wu
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

// antd 组件
import { Form, Input, Button, Upload, Icon, Steps, Radio, DatePicker, Checkbox, Row, Col, Modal } from 'antd';
const Step = Steps.Step;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
// 页面组件
import Frame from 'COM/form/frame';
import FormAgent from './agent';
import FormLegalRepresentative from './legalRepresentative';

// 页面组件（导出）
class CompanyValidate extends React.Component {

    constructor(props){
        super(props);
        this.state={
            operationIdentity:'agent'
        }
    }

    onOperationIdentityChange(e) {
        console.log('radio checked', e.target.value);
        let self=this;
        if(e.target.value=='legalRepresentative'){
            Modal.info({
                title: '温馨提示',
                content: (
                    <div>
                        <p>如将法定代表人作为经办人，日后发起融资申请时需法定代表人操作</p>
                    </div>
                ),
                onOk() {},
            });
        }
        self.setState({
            operationIdentity:  e.target.value
        });

    }


    render() {

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        const { getFieldProps } = this.props.form;

        return (
            <div>
                <Steps size="default" current={1} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="企业安全验证" />
                    <Step title="提交结果" />
                </Steps>
                <FormItem
                    {...formItemLayout}
                    label=" 操作人身份"
                    required
                >
                    <RadioGroup {...getFieldProps('operationIdentity',{ initialValue: 'agent',onChange:this.onOperationIdentityChange.bind(this) })} >
                        <Radio value="agent">我是经办人</Radio>
                        <Radio value="legalRepresentative">我是法定代表人</Radio>
                    </RadioGroup>
                </FormItem>

                {this.state.operationIdentity == 'agent' ? <FormAgent /> : <FormLegalRepresentative />}

            </div>

        );
    }
}

export default Form.create()(CompanyValidate);
