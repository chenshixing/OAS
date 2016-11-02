/**
 * 核审核不通过提示页(企业)
 * limit
 */
import React, { Component, PropTypes } from 'react';

// antd 组件
import { Row, Col, Icon} from 'antd';

//  业务组件
import TipsContent from '../components/tipsContent';

//  样式
import  '../style.less';

class Disapproval extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            pageType : 'disapproval'
        }
    }

    render() {
        return (
            <div className="tipsBox">
                <Row className="tipsRow">
                    <Col span={3} className="text-align-center">
                        <Icon type="cross-circle" className="tipsIcon across"/>
                    </Col>
                    <Col span={21}>
                        <h4>广东亿达有限公司</h4>
                        <p>您的资料审核不通过，具体原因请联系分行客户经理。</p>
                        <p>您需要修改资料后重新提交认证申请，如有疑问请联系客服电话：400-106-6698。</p>
                    </Col>
                </Row>
                <TipsContent pageType={ this.state.pageType } />
            </div>
        );
    }
}

export default Disapproval;

