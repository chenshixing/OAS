/**
 * 协议弹窗
 * wuyongquan
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

import './style.less';

// antd 组件
import { Button, Modal, Row, Col } from 'antd';


class AgreementModal extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }

    handleOk(){
        console.log('AgreementModal ok');
        this.props.onOk();
    }

    handleCancel(){
        console.log('AgreementModal cancel');
        this.props.onCancel();
    }

    render(){
        return(
            <div className='agreementModal'>
                <Modal title={this.props.name} visible={this.props.visible} maskClosable={false}
                onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)} okText="已阅读并同意此协议"
                >
                    <iframe src="http://www.tuicool.com/articles/InIJBfV" scrolling="yes" frameBorder="no" allowTransparency="true" style={{border: 'none', width: '100%', display: 'block', height: '100%', overflow: 'hidden'}} name="dialog-iframe1478073723066">
                        
                    </iframe>
                </Modal>
            </div>
            
        )
    }

}

export default AgreementModal;