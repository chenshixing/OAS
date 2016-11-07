import React, { Component, PropTypes } from 'react';

// antd 组件
import { Row, Col } from 'antd';

class ComfirmContent extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
        	data : this.props.data
        }
    }

    render() {
    	// console.log(this.state);
    	let data = this.state.data;
        return (
            <div>
            	{
            		data.sort.map( (prop,index) => {
            			if(!data.kvp[prop]){ return true; }
            			return (
            				<Row className="fn-mt-10" key={index}>
								<Col span={10} className="text-align-right">{data.map[prop]}：</Col>
								<Col span={14}>{data.kvp[prop]}</Col>
							</Row>
            			)
            		})
            	}
            </div>
        );
    }
}

export default ComfirmContent;
