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
        this.state = {
            fileList : []
        }
    }

    handleChange(info) {
        let fileList = info.fileList;

        // 1. 上传列表数量的限制
        //    只显示最近上传的一个，旧的会被新的顶掉
        fileList = fileList.slice(-2);

        // 2. 读取远程路径并显示链接
        fileList = fileList.map((file) => {
          if (file.response) {
            // 组件会将 file.url 作为链接进行展示
            file.url = file.response.url;
          }
          return file;
        });

        // 3. 按照服务器返回信息筛选成功上传的文件
        fileList = fileList.filter((file) => {
          if (file.response) {
            return file.response.status === 'success';
          }
          return true;
        });

        this.setState({ fileList });
    }

    render() {
    	let rules={
    		Registration:{
                rules:[
                    {required: true, type: 'array', message: '请上传营业执照'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            OrgInsCode:{
                rules:[
                    {required: true, type: 'array', message: '请上传组织机构代码证'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            IdentityProof:{
                rules:[
                    {required: true, type: 'array', message: '请上传企业法定代表人身份证明书'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            DeletegatePromiseLetter:{
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
            action: '/api/common/fileupload',
            headers: {
                authorization: 'authorization-text',
            },
            data: {
                "userId": "123"
            },
            onChange: this.handleChange.bind(this),
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
	                    <Upload {...upLoadProps} fileList={this.state.fileList} {...getFieldProps('Registration',rules.Registration)} >
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
	                    <Upload {...upLoadProps} {...getFieldProps('OrgInsCode',rules.OrgInsCode)} >
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
                        <Upload {...upLoadProps} {...getFieldProps('IdentityProof',rules.IdentityProof)}>
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
                        <Upload {...upLoadProps} {...getFieldProps('DeletegatePromiseLetter',rules.DeletegatePromiseLetter)}>
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
