/**
 * 核审核不通过提示页(企业)
 * limit
 */
import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

// antd 组件
import { Row, Col, Icon, Button} from 'antd';

//  样式
import  '../style.less';

//  业务组件
import InfoRow from '../components/infoRow';

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
        let basicData = {
          passed : true
        };
        let corporationData = {
          name : '李彤',
          passed : false
        };
        let bondData = {
          name : '文静',
          passed : false
        };
        let informationData = {
          passed : true
        };
        let accountData = {
          passed : true
        };
        return (
            <div className="tipsBox">
                <Row className="tipsRow">
                    <div className="ant-col-3 text-align-center">
                        <Icon type="cross-circle" className="tipsIcon across"/>
                    </div>
                    <div className="ant-col-18">
                        <h4>广东亿达有限公司</h4>
                        <p>您的资料审核不通过，具体原因请联系分行客户经理。</p>
                        <p>您需要修改资料后重新提交认证申请，如有疑问请联系客服电话：400-106-6698。</p>
                    </div>
                </Row>
                <Row className="tipsRow">
                    <InfoRow type="basic" pageType={ this.state.pageType } data={ basicData } />

                    <InfoRow type="corporation" pageType={ this.state.pageType } data={ corporationData } />

                    <InfoRow type="bond" pageType={ this.state.pageType } data={ bondData } />

                    <InfoRow type="information" pageType={ this.state.pageType } data={ informationData } />

                    <InfoRow type="account" pageType={ this.state.pageType } data={ accountData } />
                </Row>
                <Row className="tipsRow pl-50">
                    <p>如您想更换账号，请点击 <Link to='/'>重新登录</Link>。</p>
                </Row>
            </div>
        );
    }
}

export default Disapproval;
