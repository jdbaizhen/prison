import React from 'react';
import {connect} from 'react-redux';
import {Route, NavLink} from 'react-router-dom';
import {Layout, Card, Tag, Icon, List, Tooltip, Modal} from 'antd';

let {Sider} = Layout;
import Title from "../../../components/Title/index";
import * as action from '../../../redux/actions/trackResult';


class TrackResult extends React.Component {
	constructor() {
		super();
		this.state = {
			title: undefined,
		}
	}

	componentDidMount() {
		let {match: {params}, setSearchId, getMapData, location: {pathname}} = this.props;
		let wordPath = pathname.split('/');
		let terms = {
			id: parseFloat(params.id),
			pageIndex: 1,
			pageSize: 10,
		};
		setSearchId(terms.id);
		this.props.getTableData(terms).then(data => {
			if (!data.result) {
				Modal.error({
					title: '未能成功获取数据',
					content: data.err
				})
			}
		});
		let key = wordPath[4];
		let titleWord = null;
		if (key === 'list') {
			titleWord = '列表视图';
		} else if (key === 'time') {
			titleWord = '时间轴视图';
		} else {
			titleWord = '列表视图';
		}
		this.setState({
			title: titleWord
		});
	}

	setTitle = (val) => {
		this.setState({
			title: val
		});
	};

	render() {
		let {routes, crossingNum, match: {params: {id}}, url, searchNum} = this.props;
		id = parseFloat(id);
		let {title} = this.state;
		return (
			<Layout>
			{/*<div className="main-box">*/}
				<Title tier1="追查行踪" tier1Link="/track/trackMain" tier2="结果展示" tier3={title}/>
				<Layout >
					{/*className="main-body"*/}
					<Sider width={300}
					       className="trackResultC">
						<Card
							cover={<img alt="目标检索图片" src={url}/>}
							actions={[(<Tooltip placement="top" title="列表视图">
								<NavLink to={`/track/trackResult/${id}/list`}
								         className="trackLink"
								         onClick={() => this.setTitle("列表视图")}
								>
									<Icon type="table"/>
								</NavLink>
							</Tooltip>),
								(<Tooltip placement="top" title="时间轴视图">
									<NavLink to={`/track/trackResult/${id}/time`}
									         className="trackLink"
									         onClick={() => this.setTitle("时间轴视图")}
									>
										<Icon type="clock-circle"/>
									</NavLink>
								</Tooltip>)]}
						>
							<div style={{width: '100%'}}>
								<Tag color="blue"
								     style={{marginBottom: '10px'}}>性别：{searchNum.targetSex ? '女' : '男'}</Tag>
								<Tag color="blue" style={{marginBottom: '10px'}}>相似度：{searchNum.similarity}</Tag>
								<Tag color="blue"
								     style={{marginBottom: '10px'}}>年龄：{searchNum.targetAge}</Tag>
								<br/>
								<Tag color="blue" style={{
									marginBottom: '10px',
									height: 'auto'
								}}>起止时间：<br/>从 {searchNum.beginTime}<br/>至 {searchNum.endTime}</Tag>
							</div>

						</Card>
						<Card title="行踪汇总" bordered={false} style={{marginTop: '10px'}}>
							<List
								itemLayout="horizontal"
								dataSource={crossingNum}
								renderItem={item => (
									<List.Item>
										<List.Item.Meta
											style={{width:'100%'}}
											title={`匹配地点：${item.site}`}
											description={`匹配次数：${item.count}`}
										/>
									</List.Item>
								)}
							/>
						</Card>
					</Sider>
					{
						routes.map((route, i) => (
							<Route path={route.path} {...route.props} key={i} render={props => {
								return (
									<route.component history={props.history} location={props.location}
									                 routes={route.routes}/>
								)
							}}/>
						))
					}
				</Layout>
			{/*</div>*/}
		</Layout>
		)
	}
}

import './index.less';

export default connect(
	state => ({...state.trackResultTableR}),
	action
)(TrackResult)