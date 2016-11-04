import React, { Component, PropTypes } from 'react';

import {Link} from 'react-router';

// antd 组件
import { Row, Col, Button, Table} from 'antd';

//	业务组件
import { IdentityModal, SupplementModal } from 'BCOM/Modal/index';

import CountDown from './countDown';
import Sms from 'BCOM/Sms/index';

//  引入fetch
import { fetch } from 'UTILS';

//  引入线下支付小额验证金核验表格信息
import offlinePayTableInfo from 'PAGES/companyValidate/components/offlinePayTableInfo';

//	样式
import './style.less';

class InfoRow extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = Object.assign({},this.props,{
        	identityVisible : false,	//	用于实名认证弹窗
        	supplementVisible : false,	//	用于手机APP提交弹窗
        	basic : {
        		name : '企业基本资料',
        		status : {
        			0 : '未提交',
        			1 : '已提交'
        		},
        	},
        	corporation : {
        		name : '法定代表人认证',
        		status : {
        			0 : '待认证',
        			1 : '已认证'
        		},
        	},
        	agent : {
        		name : '委托代理人认证',
        		status : {
        			0 : '待认证',
        			1 : '已认证'
        		},
        	},
        	information : {
        		name : '证件资料上传',
        		status : {
        			0 : '待提交',
        			1 : '已提交'
        		},
                map : {
                    Registration : {
                        name : '营业执照',
                        span : 4,
                    },
                    OrgInsCode : {
                        name : '组织机构代码证',
                        span : 5,
                    },
                    SocialCredit : {
                        name : '社会信用证代码证',
                        span : 9,
                    },
                    IdentityProof : {
                        name : '企业法人身份证明书',
                        span : 7,
                    },
                    DeletegatePromiseLetter : {
                        name : '承诺函及授权委托书',
                        span : 8,
                    },
                }
        	},
        	account : {
        		name : '对公账户验证',
        		status : {
        			0 : '未认证',
        			1 : '已认证'
        		},
        	}
        });
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState(nextProps);
    // }

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

    basic(){
        if( this.state.pageType === 'check' ){
            return false;
        }
		return (
			<Col span={12}>
				<Link to='/companyValidate/editBasic'>修改资料</Link>
			</Col>
    	);
    }

    _realName(){
        let data = this.state.data;
    	if(data.passed){
    		return false;
    	}
    	/*审核不通过可以修改认证资料*/
    	let editButton = this.state.pageType === "disapproval" ? <Link to='/companyValidate/editBasic' className="fn-ml-20">修改资料</Link> : "";
        let smsData = {
            name: data.name,
            identityCode: data.identityCode,
            connectorType: data.connectorType
        };
    	return (
    		<Col span={12}>
				<Row>
					<Col span={12}><Sms data={ smsData } businesstype={1}>重新发送验证短信</Sms>{editButton}</Col>
                    <Col span={12}><Button type="primary" onClick={this.showIdentityModal.bind(this)}>如何实名认证？</Button></Col>
				</Row>
				<IdentityModal visible={ this.state.identityVisible } closeCallBack={ this.closeIdentityModal.bind(this) }/>
			</Col>
    	);
    }

    corporation(){
    	return this._realName();
    }

    agent(){
		return this._realName();
    }

    information(){
        let informationData = this.state.data;
        let information = this.state.information;
    	if(this.state.data.passed){
    		return false;
    	}
    	return (
    		<Col span={12}>
                <Row>
                    <Col span={24}>
                        你可以 <Link to='/companyValidate/documentUpload'>线上提交</Link> 或者使用 <Button type="primary" onClick={this.showSupplementModal.bind(this)}>手机APP提交</Button> 。
                    </Col>
                </Row>
                { !informationData.lackFiles.length ? "" :
                    <div>
                        <Row>
                            <Col span={24}>以下资料未上传：</Col>
                        </Row>
                        <Row>
                            {
                                informationData.lackFiles.map( (item,index) => {
                                   return (
                                        <Col span={information.map[item.fileKey].span} key={index}><span className="fn-mr-5">&bull;</span>{information.map[item.fileKey].name}</Col>
                                   );
                                })
                            }
                        </Row>
                    </div>
                }
				<SupplementModal visible={ this.state.supplementVisible } closeCallBack={ this.closeSupplementModal.bind(this) }/>
			</Col>
    	);
    }

    account(){
        let accountData = this.state.data;
    	if(accountData.passed){
    		return false;
    	}
        let accountValidateType = accountData.accountValidateType;
        // console.log(accountValidateType);
        if(accountValidateType === "bond"){
            return (
                <Col span={12} className="tableCol">
                    <CountDown />
                    <p>如您确定已向下面的指定账户支付 <strong>0.10</strong> 元，请联系客服。</p>
                    <Table dataSource={offlinePayTableInfo.dataSource} columns={offlinePayTableInfo.columns} pagination={false}/>
                    <p>如对公账户信息有误，请点击 <Link to='/companyValidate/editBasic'>修改对公账户</Link>。</p>
                </Col>
            )
        }else if(accountValidateType === "information"){
            return (
                <Col span={12} className="tableCol">需要您提供对公账户的相关资料，具体请联系核心企业或企业合作分行。</Col>
            )
        }
    }

    render() {
    	let data = this.state.data;

    	//	代表人实名认真需要加上名字
    	let personName = '';
    	if (data.name) {
			personName = '：' + data.name;
    	}

    	//	状态信息
    	let statusClassName = data.passed ? 'success-FontColor1' : 'error-FontColor1';
    	let statusType = data.passed ? 1 : 0;

    	//	拿到相对项的静态信息
    	let itemData = this.state[this.state.type];
        return(
    		<Row className="infoRow">
                <Col span={6}>{itemData.name}{personName}</Col>
                <Col span={6}><span className={statusClassName}>{ itemData.status[statusType] }</span></Col>
            	{/*核身信息补充提示页没有操作*/}
                {this.state.pageType === "supplement" ? "" : this[this.state.type]()}
            </Row>
    	);
    }
}

export default InfoRow;
