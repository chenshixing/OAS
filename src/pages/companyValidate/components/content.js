import React, { Component, PropTypes } from 'react';


// antd 组件
import { Tooltip, Table, Button, Row, Col } from 'antd';

// import { Modal } from 'antd';

import { Link } from 'react-router';

import './style.less';

import codeimg from 'ASSETS/images/code.png';
import { IdentityModal, SupplementModal } from 'BCOM/Modal/index';


export default class Content extends Component{
    static propTypes = {
        className: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = Object.assign({},this.props,{
			identityVisible : false,
			supplementVisible : false
        });

    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    showIdentityModal() {
	    this.setState({
	      identityVisible: true,
	    });
	    console.log(this);
	}

	closeIdentityModal() {
	    this.setState({
	      identityVisible: false,
	    });
	    console.log(this);
	}

	showSupplementModal() {
	    this.setState({
	      supplementVisible: true,
	    });
	    console.log(this);
	}

	closeSupplementModal() {
	    this.setState({
	      supplementVisible: false,
	    });
	    console.log(this);
	}

    identity(){
        let data = this.state.data;
        var name = {
            agent : '委托代理人',
            corporation : '法定代表人'
        };
        return (
            <div className={this.props.data.length > 1 ? "doubleTd" : ""}>
                {data.map((item,index) =>{
                    return (
                        <Row key={index} className="row doubleLine">
                            <Col span={24}>
                                <p>
                                    {name[item.type]}：<strong>{item.name}</strong>，您的身份识别码为<span className="warning-FontColor">{item.identityCode}</span>，请扫描以下二维码下载APP进行<br />
                                    实名认证。
                                    <Tooltip placement="top" title={<QRCode />} >
                                    	<a href="javaScript:void(0);">鼠标指向这里显示二维码。</a>
                                    </Tooltip>
                                    <Button type="primary" onClick={this.showIdentityModal.bind(this)}>查看详细操作步骤</Button>
                                </p>
                            </Col>
                        </Row>
                    )
                })}
				<IdentityModal visible={ this.state.identityVisible } closeCallBack={ this.closeIdentityModal.bind(this) }/>
            </div>
        )
    }

    bond(){
    	let dataSource = [{
          key: '1',
          name: '中金支付有限公司客户备付金',
          bank: '招商银行',
          account: '1109 0799 6610 999',
          branch: '北京分行宣武门支行'
        }];
        let columns = [{
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
        }];
    	return(
    		<Row>
                <Col offset={1} span={22}>
                    <p>请在<span className="warning-FontColor">48小时</span>以内，通过<span className="warning-FontColor">网上银行</span>或<span className="warning-FontColor">银行柜台</span>，使用您的对公账户向下面的指定账户支付<span className="warning-FontColor">0.10元</span>验证金 。</p>
                    <Table className="fn-mt-15" dataSource={dataSource} columns={columns} pagination={false}/>
                    <p className="fn-mt-15">若超时支付或公司名和对公账户开户名不一致，验证失败。</p>
                    <p className="fn-mt-15">本平台不收取任何手续费，如产生手续费等，由发卡行收取。</p>
                </Col>
            </Row>
    	)
    }

    information(){
    	return(
    		<p>需要您提供对公账户的相关资料，具体请联系核心企业或企业合作分行。</p>
    	)
    }

    supplement(){
    	return(
    		<div>
	    		<div>
		    		<p>点击下载以下资料，打印填写并加盖公章：<a href="javaScript:void(0);">企业法定代表人身份证明书</a>、<a href="javaScript:void(0);">承诺函及授权委托书</a>。</p>
		    		<p>登录实名认证APP上传营业执照、组织机构代码证（多证合一营业执照可不提供）、企业法定代表人身份证明书、承诺函及授权委托书。<Button type="primary" onClick={this.showSupplementModal.bind(this)}>查看详细操作步骤</Button></p>
		    		<p>您还可以点击这里<Link to="/companyValidate/documentUpload">线上提交</Link> 。</p>
	    		</div>
	    		<SupplementModal visible={ this.state.supplementVisible } closeCallBack={ this.closeSupplementModal.bind(this) }/>
    		</div>
    	)
    }

    render(){
    	return this[this.props.type]();
    }
}

class QRCode extends Component{
	static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render(){
    	return(
    		<div className="text-align-center">
				<img src={codeimg} alt=""/>
    			<p>支持IOS和安卓</p>
    		</div>
    	)
    }
}
