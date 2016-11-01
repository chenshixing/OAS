/**
 * 核身信息补充提示页(企业)
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
        let basicData = {
          passed : true
        };
        let corporationData = {
          name : '李彤',
          passed : false
        };
        let bondData = {
          name : '文静',
          passed : true
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
                        <Icon type="exclamation-circle" className="tipsIcon exclamation"/>
                    </div>
                    <div className="ant-col-18">
                        <h4>广东亿达有限公司</h4>
                        <p>您的认证资料未填写完，请尽快完成。<Button type="primary">继续填写</Button></p>
                        <p>如需修改已提交信息，请点击<Link to='/companyValidate/step1'>重新认证</Link>。</p>
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

export default Supplement;

