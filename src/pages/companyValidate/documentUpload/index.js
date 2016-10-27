import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
// antd 组件
import { Form, Button, Upload, Row, Col, Icon} from 'antd';

// 页面组件
import Frame from 'COM/form/frame';

const createForm = Form.create;
const FormItem = Form.Item;

class DocumentUpload extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
    	let rules={
    		businessLicense:{
                rules:[
                    {required: true, type: 'array', message: '请上传营业执照'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            organizationCodeLicense:{
                rules:[
                    {required: true, type: 'array', message: '请上传组织机构代码证'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            representativeCertificate:{
                rules:[
                    {required: true, type: 'array', message: '请上传企业法定代表人身份证明书'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            promiseCertificate:{
                rules:[
                    {required: true, type: 'array', message: '请上传承诺函及授权委托书'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
    	};

		const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };

        const upLoadProps = {
            name: 'file',
            action: '/api/upload.do',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }
        };

        const { getFieldProps } = this.props.form;

        return (
            <Frame title="企业证件扫描件" small="(请提供原件照片或彩色扫描件。注：正副本均可。)">
            	<Form horizontal className="fn-mt-30">

					<FormItem
	                    {...formItemLayout}
	                    label="营业执照"
	                    required
	                >
	                    <Upload {...upLoadProps} {...getFieldProps('businessLicense',rules.businessLicense)} >
	                        <Button type="ghost">
	                            <Icon type="upload" /> 点击上传
	                        </Button>
	                    </Upload>
	                </FormItem>

	                <FormItem
	                    {...formItemLayout}
	                    label="组织机构代码证"
	                    required
	                >
	                    <Upload {...upLoadProps} {...getFieldProps('organizationCodeLicense',rules.businessLicense)} >
	                        <Button type="ghost">
	                            <Icon type="upload" /> 点击上传
	                        </Button>
	                    </Upload>
	                </FormItem>

	                <FormItem
                        {...formItemLayout}
                        label="上传文件要求"
                    >
                        <ul>
                            <li>证件必须在有效期内且年检章齐全（当年成立的公司可无年检章）。</li>
                            <li>支持格式jpg、jpeg、png、bmp，不超过10M。</li>
                        </ul>
                    </FormItem>

                    <div className="form-title fn-mb-30" style={{borderTop:'1px solid #e8e8e8'}}>
                        其他资料
                        <small className="viceText-FontColor"> (请提供原件照片或彩色扫描件。)</small>
                    </div>

                    <FormItem
                        {...formItemLayout}
                        label=" 企业法定代表人身份证明书"
                        required
                    >
                        <Upload {...upLoadProps} {...getFieldProps('representativeCertificate',rules.representativeCertificate)}>
                            <Button type="ghost">
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="上传文件要求"
                    >
                        <ul>
                            <li>下载<a href="javaScript:void(0);">企业法定代表人身份证明书</a>，打印填写并加盖公章。</li>
                            <li>支持格式jpg、jpeg、png、bmp，不超过10M。</li>
                        </ul>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="承诺函及授权委托书"
                        required
                    >
                        <Upload {...upLoadProps} {...getFieldProps('promiseCertificate',rules.representativeCertificate)}>
                            <Button type="ghost">
                                <Icon type="upload" /> 点击上传
                            </Button>
                        </Upload>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="上传文件要求"
                    >
                        <ul>
                            <li>下载<a href="javaScript:void(0);">承诺函及授权委托书</a>，打印填写并加盖公章。</li>
                            <li>支持格式jpg、jpeg、png、bmp，不超过10M。</li>
                        </ul>
                    </FormItem>

                    <Row style={{ marginTop: 30 }}>
                        <Col span="12" offset="8">
                            <Button type="primary">提交</Button>
                            <Link to="/" className="fn-ml-20">暂不修改</Link>
                        </Col>
                    </Row>

	            </Form>
            </Frame>
        );
    }
}

export default createForm()(DocumentUpload);
