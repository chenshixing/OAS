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
    }

    sms() {
    	let me = this;
		fetch('/common/smsAutoCode',{
			body : {
			  "mobile": 13888888888,
			  "businesstype": "register"
			}
		}).then(res => {
            if(res.code == 200){
            	console.log(res);
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
					<Col span={8} className="text-align-right">法定代表人姓名：</Col><Col span={16}>陈龙</Col>
	    		</Row>
	    		<Row>
					<Col span={8} className="text-align-right">身份识别码：</Col><Col span={16}>12345678</Col>
	    		</Row>
	    		<Row>
					<Col span={8} className="text-align-right">接收手机号码：</Col><Col span={16}>13612345678</Col>
	    		</Row>
    		</div>
    	);
    }

    render() {
        return (
            <Button type="primary" onClick={ this.sms.bind(this) }>重新发送验证短信</Button>
        );
    }
}

export default Sms;
