/**
 * 个人核身step3
 * yongquan.wu
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';
// 导入公共样式
import 'ASSETS/less/main.less';

// 页面组件
import Frame from 'COM/form/frame';

// antd 组件
import { Button, Form, Input, Steps, Row, Col,Cascader } from 'antd';
import classNames from 'classnames';
import { Select } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const Step = Steps.Step;
const Option = Select.Option;

function noop() {
    return false;
}

//城市联动选择器数据
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
    },{
        value: 'hangzhou2',
        label: 'Hangzhou2',
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
    }]
}];

class CompanyValidate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{
                companyName:'钱途互联'
            }
        }
    }

    handleNext(){
        let form =this.props.form;
        form.validateFields((errors, values)=>{
            if(!errors){
                console.log('values:',values);
                console.log('submit...');
                window.location.href='/#/companyValidate/step3-3?_k=REPLACE';
            }
        })
    }

    onChange(value) {
        console.log(value);
    }

    handleChange(e){
        //console.log(e.target.value);
    }

    render() {
        const {getFieldProps} =this.props.form;
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 },
        };
        //表单验证
        let rules={
            account:{
                rules:[
                    {required: true, message: '银行账号不能为空'}
                ]
            },
            openBank:{
                rules:[
                    {required: true, message: '开户行不能为空'}
                ],
                onChange:this.handleChange
            },
            ProvinceAndCity:{
                rules:[
                    {required: true, type:'array', message: '所属省市不能为空'}
                ],
                onChange:this.onChange
            },
            branchBank:{
                rules:[
                    {required: true, message: '分支行不能为空'}
                ],
                onChange:this.handleChange
            }
        };
        return (
            <div>
                <Steps size="big" current={2} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="企业安全认证" />
                    <Step title="提交结果" />
                </Steps>
                <Frame title="填写企业对公账号">
                    <Form horizontal className="fn-mt-30">
                        <FormItem
                            label="账户名称"
                            {...formItemLayout}
                        >
                            <p className="ant-form-text">{this.state.data.companyName}</p>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="银行账号"
                            required
                        >
                            <Input {...getFieldProps('account',rules.account)} type="text" placeholder="请输入银行账号"/>
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="开户行"
                            required
                        >
                            <Select {...getFieldProps('openBank',rules.openBank)}
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                notFoundContent="Nothing found"
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>

                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="所属省市"
                            required
                        >
                            <Cascader {...getFieldProps('ProvinceAndCity',rules.ProvinceAndCity)} options={options}  placeholder="请选择所属省市" />
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="分支行"
                            required
                        >
                            <Select {...getFieldProps('branchBank',rules.branchBank)}
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    notFoundContent="Nothing found"
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </FormItem>



                        <Row style={{ marginTop: 30 }}>
                            <Col span="12" offset="8">
                                <Button type="primary" size="large" onClick={this.handleNext.bind(this)}>下一步</Button>
                            </Col>
                        </Row>
                    </Form>
                </Frame>
            </div>

        );
    }
};


export default Form.create()(CompanyValidate);
