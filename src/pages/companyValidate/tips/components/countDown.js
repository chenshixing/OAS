import React, { Component, PropTypes } from 'react';

class CountDown extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = Object.assign({},this.props,{
			time : 172800000,
			timeDisplay: "",
        });
    }

	componentWillMount() {
		this.state.timeDisplay = this._getTimeDisplay();
	}

	componentDidMount() {
		this._timeCountDown();
	}

	_timeCountDown(){
		let me = this;
		let timer = setInterval(() =>{
			let state = me.state;
			state.time -= 1000;
			state.timeDisplay = me._getTimeDisplay();
			me.setState({
				state : state
			});
			if(state.time < 1000){
				clearInterval(timer);
				//	倒计时结束TODO
			}
		},1000);
	}

	_getTimeDisplay(){
		let time = this.state.time;
		let secTime = 1000;
		let minTime = 60*secTime;
		let hourTime = 3600*secTime;

		let zeroFill = (num) => {
			return num >= 10 ? num : "0" + num;
		}

		let hour = zeroFill(Math.floor(time/hourTime));
		let min = zeroFill(Math.floor((time - hourTime * hour) / minTime));
		let sec = zeroFill(Math.floor((time - hourTime * hour - minTime * min) / secTime));

		return hour + ":" + min + ":" + sec;
	}

    render() {
        return (
            <span className="warning-FontColor fs-26">{ this.state.timeDisplay }</span>
        );
    }
}

export default CountDown;
