// 使用方式：
// 传入data和businesstype
// data : {
//     name: data.name,                        姓名
//     identityCode: data.identityCode,        身份识别码
//     connectorType: data.connectorType       关系人类型 （2：企业法人，3：经办人）（个人账户不用传，企业账户必须）
// };

// businesstype : （1：身份核实，2.重置登录密码，3：重置交易密码）

import React, { Component, PropTypes } from 'react';

// antd 组件
import { Button, Modal, Row, Col } from 'antd';


//  引入fetch
import { fetch } from 'UTILS';   

class Sms extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = Object.assign({},this.props,{});
    }

    sms() {
    	let me = this;
		fetch('/common/pinCode',{
			body : {
			  "businesstype": me.state.businesstype,
			  "connectortype": me.state.data.connectorType
			}
		}).then(res => {
            if(res.code == 200){
            	// console.log(res);
                //	重新发送验证码TODO
				me.success();
            }
        });
    }

    success(){
    	let me = this;
		Modal.success({
		    title: '实名认证邀请已发送，请尽快完成认证。',
		    content: me._getSuccessContent()
		});
    }

    _getSuccessContent(){
    	return (
    		<div>
	    		<Row>
					<Col span={8} className="text-align-right">{ this.state.data.connectorType == 2 ? "法定代表人" : "委托代理人"}姓名：</Col><Col span={16}>{this.state.data.name}</Col>
	    		</Row>
	    		<Row>
					<Col span={8} className="text-align-right">身份识别码：</Col><Col span={16}>{ this.state.data.identityCode }</Col>
	    		</Row>
	    		<Row>
					<Col span={8} className="text-align-right">接收手机号码：</Col><Col span={16}>13612345678</Col>
	    		</Row>
    		</div>
    	);
    }

    render() {
        return (
            <Button type="primary" onClick={ this.sms.bind(this) }>{ this.props.children }</Button>
        );
    }
}

export default Sms;
