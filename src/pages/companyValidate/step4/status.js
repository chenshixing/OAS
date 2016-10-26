import React, { Component, PropTypes } from 'react';


// antd 组件
import { Row, Col } from 'antd';

import './style.less';

export default class Content extends Component{
     static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = this.props;
        this.state = Object.assign({},this.state,{
            statusData : {
                identity : '未认证',
                bond : '未收到小额验证金',
                information : '待提交资料',
                supplement : '待提交资料'
            }
        });
    }

    identity(){
        let data = this.state.data;
        return (
            <div className={this.state.data.length > 1 ? "doubleTd" : ""}>
                {data.map((item,index) =>{
                    return (
                        <Row key={index} className="row">
                            <Col span={24}>
                                <span className="error-FontColor1">{this.state.statusData[this.props.type]}</span>
                            </Col>
                        </Row>
                    )
                })}
            </div>
        )
    }

    render(){
        if(this.props.type === 'identity'){
            return this[this.props.type]();
        }else{
            return (
                <span className="error-FontColor1">{this.state.statusData[this.props.type]}</span>
            )
        }
    }
}
