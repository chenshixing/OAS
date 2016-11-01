import React, { Component, PropTypes } from 'react';

import {Link} from 'react-router';

// antd 组件
import { Row, Col, Button, Table} from 'antd';

//	业务组件
import { IdentityModal, SupplementModal } from 'BCOM/Modal/index';

//  引入fetch
import { fetch } from 'UTILS';

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
        		name : '法定代表人',
        		status : {
        			0 : '待认证',
        			1 : '已认证'
        		},
        	},
        	bond : {
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
                },
                lackFiles : [],
        	},
        	account : {
        		name : '对公账户验证',
        		status : {
        			0 : '未认证',
        			1 : '已认证'
        		},
        		tableInfo : {
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
		            }]
        		}
        	}
        });
    }

    componentDidMount() {
        this.getPaperInfoStatus();
    }

    getPaperInfoStatus(){
        if(this.props.type === "information" && !this.props.data.passed){
            let me = this;
            let information = this.state.information;
            fetch('/paper/PaperInfoStatus').then(res => {
                if(res.code == 200){
                    information.lackFiles = res.data.lackFiles;
                    console.log(information.lackFiles);
                    me.setState({
                        information : information
                    })
                }
            });
        }
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

    basic(){
		return (
			<Col span={12}>
				<Link to='/companyValidate/editBasic'>修改资料</Link>
			</Col>
    	);

    	return false;
    }

    _realName(){
    	if(this.state.data.passed){
    		return false;
    	}
    	/*审核不通过可以修改认证资料*/
    	let editButton = this.state.pageType === "disapproval" ? <Link to='/companyValidate/editBasic' className="fn-ml-20">修改资料</Link> : "";
    	return (
    		<Col span={12}>
				<Row>
					<Col span={12}><Link to='/'>重新发送验证短信</Link>{editButton}</Col>
                    <Col span={12}><Button type="primary" onClick={this.showIdentityModal.bind(this)}>如何实名认证？</Button></Col>
				</Row>
				<IdentityModal visible={ this.state.identityVisible } closeCallBack={ this.closeIdentityModal.bind(this) }/>
			</Col>
    	);
    }

    corporation(){
    	return this._realName();
    }

    bond(){
		return this._realName();
    }

    information(){
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
                { !information.lackFiles.length ? "" :
                    <div>
                        <Row>
                            <Col span={24}>以下资料未上传：</Col>
                        </Row>
                        <Row>
                            {
                                information.lackFiles.map( (item,index) => {
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
    	if(this.state.data.passed){
    		return false;
    	}
    	//	拿到表格的静态信息
    	let tableInfo = this.state[this.state.type].tableInfo;
    	return (
    		<Col span={12} className="tableCol">
                <p>请在 <span className="warning-FontColor fs-26">47:59:59</span> 内完成支付</p>
                <p>如您确定已向下面的指定账户支付 <strong>0.10</strong> 元，请联系客服。</p>
                <Table dataSource={tableInfo.dataSource} columns={tableInfo.columns} pagination={false}/>
                <p>如对公账户信息有误，请点击 <Link to='/companyValidate/editBasic'>修改对公账户</Link>。</p>
            </Col>
    	)
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
