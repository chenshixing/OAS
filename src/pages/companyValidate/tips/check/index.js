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

class Check extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            pageType : 'check',
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
                        <p>请根据您的实际情况尽快完成以下未认证项，如需修改信息请联系客服电话：400-106-6698。</p>
                    </Col>
                </Row>
                <TipsContent pageType={ this.state.pageType } />
            </div>
        );
    }
}

export default Check;

