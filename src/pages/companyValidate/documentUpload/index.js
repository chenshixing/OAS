import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
// antd 组件
import { Form, Button, Upload, Row, Col, Icon, Modal, message} from 'antd';

// 页面组件
import Frame from 'COM/form/frame';

const createForm = Form.create;
const FormItem = Form.Item;

//  引入fetch
import { fetch } from 'UTILS';

class DocumentUpload extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            limit : 5,
            fileList : {
                registration : [],
                orgInsCode : [],
                socialCredit : [],
                identityProof : [],
                deletegatePromiseLetter : []
            },
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        let me = this;
        let fileList = me.state.fileList;
        fetch('/paper/searchCompany.do').then(res => {
            if(res.code == 200){
                for( let prop in res.data){
                    res.data[prop].map( (item,index) =>{
                        let uid = prop + '_' + new Date()/1 + '_' + index;
                        let file = {
                            uid: uid,
                            name: item.fileName,
                            status: 'done',
                            url: item.imgUrl,
                            data: item
                        }
                        fileList[prop].push(file);
                    })
                }
                me.setState({ fileList });
            }
        });
    }

    _getFileList(info){
        let fileList = info.fileList;

        // 1. 上传列表数量的限制
        //    只显示最近上传的五个，旧的会被新的顶掉
        fileList = fileList.slice(-5);

        // 2. 读取远程路径并显示链接
        fileList = fileList.map((file) => {
          if (file.response) {
            // 组件会将 file.url 作为链接进行展示
            file.url = file.response.data.imgSmallUrl;
          }
          return file;
        });

        // 3. 按照服务器返回信息筛选成功上传的文件
        fileList = fileList.filter((file) => {
          if (file.response) {
            return file.response.code == '200';
          }
          return true;
        });

        return fileList;
    }

    _warning(){
        let me = this;
        Modal.warning({
            title: '图片最多上传' + me.state.limit + '张',
            content: '请删除图片后再上传。',
        });
    }

    socialCreditChange(info) {
        if(info.fileList.length > this.state.limit){
            //  已达五张上限
            this._warning();
            return false;
        }

        let fList = this._getFileList(info);
        let fileList = this.state.fileList;
        fileList.socialCredit = fList;

        this.setState({ fileList });
    }

    registrationChange(info) {
        if(info.fileList.length > this.state.limit){
            //  已达五张上限
            this._warning();
            return false;
        }

        let fList = this._getFileList(info);
        let fileList = this.state.fileList;
        fileList.registration = fList;

        this.setState({ fileList });
    }

    orgInsCodeChange(info) {
        if(info.fileList.length > this.state.limit){
            //  已达五张上限
            this._warning();
            return false;
        }

        let fList = this._getFileList(info);
        let fileList = this.state.fileList;
        fileList.orgInsCode = fList;

        this.setState({ fileList });
    }

    identityProofChange(info) {
        if(info.fileList.length > this.state.limit){
            //  已达五张上限
            this._warning();
            return false;
        }

        let fList = this._getFileList(info);
        let fileList = this.state.fileList;
        fileList.identityProof = fList;

        this.setState({ fileList });
    }

    deletegatePromiseLetterChange(info) {
        if(info.fileList.length > this.state.limit){
            //  已达五张上限
            this._warning();
            return false;
        }

        let fList = this._getFileList(info);
        let fileList = this.state.fileList;
        fileList.deletegatePromiseLetter = fList;

        this.setState({ fileList });
    }

    submit(){
        let data = this._getSubmitData();
        console.log(data);
        fetch('/paper/save.do',{
            body : {
                uid : 123,
                data : data
            }
        }).then(res => {
            if(res.code == 200){
                console.log(res);
                //  提交成功TODO
            }
        });
    }

    _getSubmitData(){
        let data = {};

        let fileList = this.state.fileList;
        for( let prop in fileList ){
            data[prop] = [];
            fileList[prop].map( (item,index) => {
                let file = item.data ? item.data : item.response.data;
                data[prop].push(file);
            })
        }

        return data;
    }

    render() {
    	let rules={
    		registration:{
                rules:[
                    {required: true, message: '请上传营业执照'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            orgInsCode:{
                rules:[
                    {required: true, message: '请上传组织机构代码证'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            identityProof:{
                rules:[
                    {required: true, message: '请上传企业法定代表人身份证明书'},
                ],
                valuePropName: 'fileList',
                normalize: this.normFile
            },
            deletegatePromiseLetter:{
                rules:[
                    {required: true, message: '请上传承诺函及授权委托书'},
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
            }
        };

        const socialCreditUpLoadProps = Object.assign({},upLoadProps,{
            onChange : this.socialCreditChange.bind(this)
        });
        const registrationUpLoadProps = Object.assign({},upLoadProps,{
            onChange : this.registrationChange.bind(this)
        });
        const orgInsCodeUpLoadProps = Object.assign({},upLoadProps,{
            onChange : this.orgInsCodeChange.bind(this)
        });
        const identityProofUpLoadProps = Object.assign({},upLoadProps,{
            onChange : this.identityProofChange.bind(this)
        });
        const deletegatePromiseLetterUpLoadProps = Object.assign({},upLoadProps,{
            onChange : this.deletegatePromiseLetterChange.bind(this)
        });

        const { getFieldProps } = this.props.form;

        return (
            <Frame title="企业证件扫描件" small="(请提供原件照片或彩色扫描件。注：正副本均可。)">
            	<Form horizontal className="fn-mt-30">

					<FormItem
	                    {...formItemLayout}
	                    label="营业执照"
	                    required
	                >
	                    <Upload {...registrationUpLoadProps} fileList={this.state.fileList.registration}>
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
	                    <Upload {...orgInsCodeUpLoadProps} fileList={this.state.fileList.orgInsCode}>
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
                        <Upload {...identityProofUpLoadProps} fileList={this.state.fileList.identityProof}>
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
                        <Upload {...deletegatePromiseLetterUpLoadProps} fileList={this.state.fileList.deletegatePromiseLetter}>
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
                            <Button type="primary" onClick={ this.submit.bind(this) }>提交</Button>
                            <Link to="/" className="fn-ml-20">暂不修改</Link>
                        </Col>
                    </Row>

	            </Form>
            </Frame>
        );
    }
}

export default createForm()(DocumentUpload);