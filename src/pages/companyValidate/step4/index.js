/**
 * 企业核身step4
 * limit
 */
// react 相关库
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

// antd 组件
import { Table, Alert, Steps, Button, Row, Col } from 'antd';
const Step = Steps.Step;

//  业务组件
import Content from '../components/content';
import Status from '../components/status';

import Map from '../components/map';

//  引入fetch
import { fetch } from 'UTILS';

// 页面组件（导出）
export default class PersonalValidate extends React.Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            data : {
                tableColumns : [{
                  title: '认证类型',
                  dataIndex: 'type',
                  key: 'type',
                }, {
                  title: '认证内容',
                  dataIndex: 'content',
                  key: 'content',
                }, {
                  title: '认证状态',
                  dataIndex: 'status',
                  key: 'status',
                }],
                identityData : []
            }
        }
    }

    componentDidMount() {
      this.identityDataInit();
    }

    identityDataInit(){
      let me = this;
      let data = me.state.data;
      fetch('/user/getRelatedPersonInfo').then(res => {
          if(res.code == 200){
              res.data.map( (item,index) => {
                if(Map.identityMap.checkPassType[item.checkPass]){
                  return true;
                }
                let identityItem = {
                  type : Map.identityMap.type[item.connectorType],
                  name : item.realName,
                  identityCode : item.identityCode,
                  passed : Map.identityMap.checkPassType[item.checkPass]
                }
                data.identityData.push(identityItem);
              });
              me.setState({
                data : data
              });
          }
      });
    }

    render() {
        let accountData1 = {
            passed : false,
        }
        let accountData2 = {
            passed : false,
        }
        let supplementData = {
            passed : false,
        }
        let dataSource = [{
          key: '0',
          type: '身份实名认证',
          content: <Content data={this.state.data.identityData} type="identity"/>,
          status: <Status data={this.state.data.identityData} type="identity"/>
        },{
          key: '1',
          type: '企业对公账户认证',
          content: <Content type="bond"/>,
          status: <Status data={accountData1} type="bond"/>
        },{
          key: '2',
          type: '企业对公账户认证',
          content: <Content type="information"/>,
          status: <Status data={accountData2} type="information"/>
        },,{
          key: '3',
          type: '企业资料补充',
          content: <Content type="supplement"/>,
          status: <Status data={supplementData} type="supplement"/>
        },];
        return (
            <div>
                <Steps size="big" current={3} className="fn-mb-30">
                    <Step title="填写基本信息" />
                    <Step title="实名认证" />
                    <Step title="企业安全认证" />
                    <Step title="提交结果" />
                </Steps>
                <div className="form-frame">
                    <Row className="fn-mt-30">
                        <Col offset={1} span={22}>
                            <Alert message="请根据您的实际情况尽快完成以下认证内容："
                               description="1.身份实名认证；2.企业对公账户认证；3.企业资料补充"
                               type="info"
                               showIcon
                            />

                            <Table className="fn-mt-15" dataSource={dataSource} columns={this.state.data.tableColumns} pagination={false}/>
                        </Col>
                    </Row>
                    <Row className="fn-mt-30">
                        <Col offset="8" span="8" className="text-align-center">
                            <Button type="primary">已完成认证</Button>
                        </Col>
                    </Row>
                </div>
            </div>

        );
    }
}

