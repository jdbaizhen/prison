import React from 'react';
import {Layout, Modal, Card, Tag, Collapse, Tooltip, Icon, Row, Col} from 'antd';

let {Meta} = Card;
let {Sider} = Layout;
let {Panel} = Collapse;
import {getResultDataA,getResultPlayA} from '../../../api/video';
import Title from "../../../components/Title/index";
import MyPlayBack from "../../../components/MyPlayBack/index";

export default class VideoResult extends React.Component {
	constructor() {
		super();
		this.state = {
			targetImg: [],
			result: [],
			videoVO: {}
		}
	}

	componentDidMount() {
		let {match: {params}} = this.props;
		getResultDataA({id: params.id}).then(data => {
			if (data.result) {
				let tableData = JSON.parse(data.data);
				console.log(tableData);
				this.setState({
					targetImg: tableData.targetImg,
					result: tableData.result,
					videoVO: tableData.videoVO
				})
			} else {
				Modal.error({
					title: '未能成功获取数据',
					content: data.err
				})
			}
		});
	}

	showBigImg = (similarity,url) => {
		Modal.info({
			maskClosable:true,
			width:'50%',
			title:`相似度${similarity}`,
			content:(
				<img src={url} alt="" style={{width:'100%'}}/>
			)
		})
	}
	getPlayBackFlag=(fn)=>{
		this.getPlay=fn;
	};
	myPlayBack=(id)=>{
		getResultPlayA({id}).then(data=>{
			if (data.result) {
				let tableData= JSON.parse(data.data);
				console.log(tableData);
				this.getPlay(tableData)
			} else {
				Modal.error({
					title: '未能成功获取数据',
					content: data.err
				})
			}
		})
	};
	render() {
		let {targetImg, result, videoVO} = this.state;
		let {ip, port, channel, username, password, beginTime, endTime} = videoVO;
		return (
			<Layout>
				<Title tier1="视屏解析" tier1Link="/video/videoMain" tier2="结果展示"/>
				<Layout className="main-body">
					<Sider width={300} style={{backgroundColor: '#fff', overflow: 'auto', padding: '0 20px'}}>
						<Collapse bordered={false} defaultActiveKey={['1']}>
							<Panel
								header="已选照片"
								key="1"
								className="video-card">
								{
									targetImg.map(item => (
										<div className="video-targetImg">
											<img src={item.img} alt=""/>
											<span>{item.targetName}</span>
										</div>
									))
								}
							</Panel>
							<Panel
								header="已选视频"
								key="2"
								className="video-card">
								<Tag color="blue" className="video-tag">IP：{ip}</Tag><br/>
								<Tag color="blue" className="video-tag">端口号：{port}</Tag><br/>
								<Tag color="blue" className="video-tag">通道号：{channel}</Tag><br/>
								<Tag color="blue" className="video-tag">用户名：{username}</Tag><br/>
								<Tag color="blue" className="video-tag">密码：{password}</Tag><br/>
								<Tag color="blue" className="video-tag">时间：<br/>从{beginTime}开始<br/>到{endTime}结束</Tag>
							</Panel>
						</Collapse>
					</Sider>
					<Layout style={{backgroundColor: '#ffffff', padding: '25px 20px 25px 30px'}}>
						<Collapse defaultActiveKey={['1']}>
							{result.map((item,index)=> (
								<Panel
									header={item.targetName}
									key={index+1}
								>
									<Row gutter={16}>
										{
											item.compareResult ? item.compareResult.map(ite => (
												<Col xxl={{span:3}} xl={{span:4}} lg={{span:6}} md={{span:8}} sm={{span:12}}>
													<Card
														hoverable
														cover={<img src={ite.img}/>}
														actions={[(<Tooltip placement="top" title="查看大图">

															<Icon type="picture" onClick={()=>this.showBigImg(ite.similarity,ite.bigImg)}/>
														</Tooltip>),
															(<Tooltip placement="top" title="视频回放">
																<Icon type="video-camera" onClick={()=>{this.myPlayBack(ite.id)}}/>
															</Tooltip>)]}
													>
														<Meta
															title={`相似度：${ite.similarity}`}
															description={<div>时长：<br/>{ite.schedule}</div>}
														/>
													</Card>
												</Col>
											)) : null}
									</Row>
								</Panel>
							))}
						</Collapse>
					</Layout>
				</Layout>
				<MyPlayBack id="videoPlayBack" getPlayBackFlag={this.getPlayBackFlag}/>
			</Layout>
		)
	}
}
import './index.less'