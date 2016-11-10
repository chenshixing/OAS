/**
 * 协议弹窗
 * wuyongquan
 *
 * 参数说明：
 * {
 *     this.props.iframeSrc 就是连接
 * }
 * 使用说明
 * <AgreementModal iframeSrc="连接地址" />
 */
// react 相关库
import React from 'react';
import ReactDOM from 'react-dom';

import './style.less';

// antd 组件
import { Button, Modal, Row, Col } from 'antd';

const baiduSrc = "https://www.baidu.com/";
class AgreementModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            iframeSrc:this.props.iframeSrc || baiduSrc
        };
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
                <Modal
                    title={this.props.name}
                    visible={this.props.visible}
                    maskClosable={false}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    okText="已阅读并同意此协议"
                    width="60%"
                    wrapClassName="vertical-center-modal"

                >
                    <iframe
                        src={this.state.iframeSrc}
                        scrolling="yes"
                        frameBorder="no"
                        allowTransparency="true"
                        style={{
                            border: 'none',
                            width:"100%",
                            display: 'block',
                            height: '430px',
                            overflow: 'hidden'
                        }}
                        name="dialog-iframe1478073723066"
                        >

                    </iframe>
                </Modal>
            </div>

        )
    }

}

export default AgreementModal;
