import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
// antd 组件
import { Table, Alert, Steps, Button, Row, Col } from 'antd';
const Step = Steps.Step;

//  业务组件
import Content from '../components/content';
import Status from '../components/status';

class Result extends Component {
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
                }]
            }
        }
    }

    render() {
    	let identityData = [
            {
                type : 'agent',
                name : '李彤',
                number : '1234 5678',
                passed : false,
            },
            {
                type : 'corporation',
                name : '文静',
                number : '1234 5678',
                passed : true,
            }
        ];
        let supplementData = {
            passed : true,
        }
        let dataSource = [{
          key: '0',
          type: '身份实名认证',
          content: <Content data={identityData} type="identity"/>,
          status: <Status data={identityData} type="identity"/>
        },{
          key: '1',
          type: '企业资料补充',
          content: <Content type="supplement"/>,
          status: <Status data={supplementData} type="supplement"/>
        },];
        return (
            <div className="form-frame">
                <Row className="fn-mt-30">
                    <Col offset={1} span={22}>
                        <Alert message="请根据您的实际情况尽快完成以下认证内容："
                           description="1.身份实名认证；2.企业资料补充"
                           type="info"
                           showIcon
                        />

                        <Table className="fn-mt-15" dataSource={dataSource} columns={this.state.data.tableColumns} pagination={false}/>
                    </Col>
                </Row>
                <Row className="fn-mt-30">
                    <Col offset="8" span="8" className="text-align-center">
                        <Button type="primary">已完成认证</Button>
						<Link to='/' className="fn-ml-20">稍后认证，返回</Link>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Result;
