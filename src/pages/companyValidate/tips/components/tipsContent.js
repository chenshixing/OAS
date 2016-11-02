import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

// antd 组件
import { Row, Col, Icon, Button, Table} from 'antd';

//  业务组件
import InfoRow from './infoRow';
import Map from '../../components/map';

//  引入fetch
import { fetch } from 'UTILS';

class TipsRow extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = Object.assign({},this.props,{
        	data : {
                basicData : {
                    passed : true
                },
                tipsRow : ""
            }
        });
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(){
        let me = this;
        let data = me.state.data;
        //  身份实名认证
        let p1 = fetch('/user/getRelatedPersonInfo');
        //  企业对公账户认证
        let p2 = fetch('/user/getAccountCheckStatus');
        //  企业资料补充
        let p3 = fetch('/paper/getCompanyPaperInfoStatus');

        Promise.all([p1,p2,p3]).then(res => {
            // console.log(res);

            //  身份实名认证数据处理
            let user = {};
            res[0].data.map( (item,index) => {
              let userData = {
                name : item.realName,
                connectorType : item.connectorType,
                identityCode : item.identityCode,
                passed : Map.identityMap.passType[item.checkPass]
              }
              let dataType = Map.identityMap.type[item.connectorType];
              user[dataType + "Data"] = userData;
            });

            //  企业对公账户认证数据处理
            let accountItem = res[1].data[0];
            let accountData = {
                accountValidateType : Map.accountMap.type[accountItem.accountValidateType],
                passed : Map.accountMap.passType[accountItem.checkStatus]
            }

            //  企业资料补充
            let informationData = {
                lackFiles : res[2].data.lackFiles,
                passed : Map.supplementMap.passType[res[2].data.status]
            }

            data.tipsRow = <Row className="tipsRow">
                                <InfoRow type="basic" pageType={ this.state.pageType } data={ this.state.data.basicData } />

                                <InfoRow type="corporation" pageType={ this.state.pageType } data={ user.corporationData } />

                                <InfoRow type="agent" pageType={ this.state.pageType } data={ user.agentData } />

                                <InfoRow type="information" pageType={ this.state.pageType } data={ informationData } />

                                <InfoRow type="account" pageType={ this.state.pageType } data={ accountData } />
                            </Row>;

            me.setState({
                data : data
            });
        }).catch(reason => {
          console.log(reason)
        });
    }

    render() {
        return (
            <div>
            	{ this.state.data.tipsRow }
            	<Row className="tipsRow pl-50">
            		<Col span={24}>
            			<p>如您想更换账号，请点击 <Link to='/'>重新登录</Link>。</p>
            		</Col>
                </Row>
            </div>
        );
    }
}

export default TipsRow;
