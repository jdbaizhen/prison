import React from 'react';
import {Layout, Timeline, Icon, Popover, Modal, Spin} from 'antd';
import {connect} from 'react-redux';
import cloneDeep from 'lodash.clonedeep';
import * as action from '../../../../redux/actions/trackResult';

class TrackResultTime extends React.Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			getPopupContainer: undefined
		}
	}

	handleLoading = (val, callback) => {
		this.setState({
			isLoading: val
		}, callback)
	};
	getData = () => {
		let {getTimeData, id, similarity, beginTime, endTime, count} = this.props;
		this.handleLoading(true, () => {
			getTimeData({
				id,
				smallDiscernSimilar: similarity,
				startTime: beginTime,
				endTime,
				count
			}).then(data => {
				this.handleLoading(false);
				if (!data.result) {
					Modal.error({
						title: '未能成功获取数据',
						content: data.err
					})
				}
			})
		})
	};
	handleScoll=()=>{
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			let {allCount,count}=this.props;
			let {isLoading}=this.state;
			let {scrollTop, offsetHeight, scrollHeight} =this.refs.trackTimeC;
			if (scrollTop + offsetHeight +80> scrollHeight && count<allCount && !isLoading) {
				this.getData()
			}
		}, 50);
	};
	componentDidMount() {
		let {location: {pathname},id,details,history}=this.props;
		if(typeof id ==='undefined'){
			let wordPath = pathname.split('/');
			wordPath[4]='list';
			history.push(wordPath.join('/'))
		}else{
			if (!details.length) {
				this.getData();
			}
			this.refs.trackTimeC.addEventListener('scroll',this.handleScoll);
			this.setState({
				getPopupContainer: () => (this.refs.trackTime)
			})
		}

	}
	render() {
		let {details} = this.props;
		let {isLoading, getPopupContainer} = this.state;
		return (
			<Layout className="main-body" style={{position: 'relative', top: 0, left: 0,padding:0}}>
				<div className="trackTimeC" ref="trackTimeC">
					<div ref="trackTime" style={{position: 'relative', top: '150px', left: '50%'}}>
						{getPopupContainer ? (<Timeline>
								{details.map((item, index) => (
									<Timeline.Item
										dot={
											<Popover
												visible={true}
												placement={index % 2 ? "right" : "left"}
												title={item.caseDiscernTime}
												getPopupContainer={getPopupContainer}
												content={
													<div className="trackTimeItem">
														<img src={item.traceDiscernImg}/>

														<div>
															<span>{item.site}</span>
															<br/><span>相似度：<span
															className="trackSim">{item.discernSimilar}</span></span>
														</div>
													</div>
												}
											>
												<Icon type="clock-circle-o" style={{fontSize: '25px'}}/>
											</Popover>
										}
										color="blue"
									>
										<div style={{height: '165px'}}/>
									</Timeline.Item>))
								}
							</Timeline>
						) : null}
					</div>
				</div>
				{isLoading ? (<div className="delay-loading">
					<Spin/><span>正在加载</span>
				</div>) : null}
			</Layout>
		)
	}
	componentWillUnmount(){
		clearTimeout(this.timer);
		this.refs.trackTimeC.removeEventListener('scroll',this.handleScoll);
	}
}

import './index.less'

export default connect(
	state => ({...state.trackResultTermR, ...state.trackResultTimeR, allCount: state.trackResultTableR.count}),
	action
)(TrackResultTime);