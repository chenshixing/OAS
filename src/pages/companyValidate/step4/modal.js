import React, { Component, PropTypes } from 'react';

// antd 组件
import { Modal, Button, Row, Col } from 'antd';

import codeimg from 'ASSETS/images/code.png';
import appimg from 'ASSETS/images/app.png';

import './style.less';

class supplementModal extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
        	visible: this.props.visible,
        	closeCallBack : this.props.closeCallBack
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible
        });
    }

    showModal() {
	    this.setState({
	      visible: true,
	    });
	}

	handleOk() {
    	console.log('点击了确定');
    	this.state.closeCallBack();
    	this.setState({
      		visible: false,
    	});
 	}

 	handleCancel(){
 		console.log('点击了关闭');
 		this.state.closeCallBack();
    	this.setState({
      		visible: false,
    	});
 	}

    render() {
        return (
	        <Modal ref="modal"
	          visible={this.state.visible}
	          title="提示" onOk={this.handleOk} onCancel={this.handleCancel.bind(this)}
	          footer={[
	            <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this)}>
	              我知道了
	            </Button>,
	          ]}
	        >
	          <h4>如何实名认证？</h4>
	          <Row className="fn-mt-20">
	          	<Col span={8}>
					<h5>第一步：</h5>
					<p>扫描二维码下载APP。</p>
					<div className="text-align-center codeWrp">
						<img className="wh80" src={codeimg} alt=""/>
		    			<p>支持IOS和安卓</p>
		    		</div>
	          	</Col>
	          	<Col span={8}>
					<h5>第一步：</h5>
					<p>使用你的 姓名 及 身份识别码 登录。</p>
					<div className="text-align-center">
						<img className="wh" src={appimg} alt=""/>
		    		</div>
	          	</Col>
	          	<Col span={8}>
					<h5>第三步：</h5>
					<p>完成以下实名信息。</p>
					<ul>
						<li>上传身份证照</li>
						<li>人脸识别</li>
						<li>银行卡验证</li>
					</ul>
	          	</Col>
	          </Row>
	        </Modal>
        );
    }
}

export default supplementModal;
