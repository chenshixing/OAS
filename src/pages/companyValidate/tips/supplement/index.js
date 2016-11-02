/**
 * 核身信息补充提示页(企业)
 * limit
 */
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

// antd 组件
import { Row, Col, Icon, Button} from 'antd';

//  业务组件
import TipsContent from '../components/tipsContent';

//  样式
import  '../style.less';

class Supplement extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            pageType : 'supplement'
        }
    }

    render() {
        return (
            <div className="tipsBox">
                <Row className="tipsRow">
                    <Col span={3} className="text-align-center">
                        <Icon type="exclamation-circle" className="tipsIcon exclamation"/>
                    </Col>
                    <Col span={21}>
                        <h4>广东亿达有限公司</h4>
                        <p>您的认证资料未填写完，请尽快完成。<Button type="primary">继续填写</Button></p>
                        <p>如需修改已提交信息，请点击<Link to='/companyValidate/step1'>重新认证</Link>。</p>
                    </Col>
                </Row>
                <TipsContent pageType={ this.state.pageType } />
            </div>
        );
    }
}

export default Supplement;

