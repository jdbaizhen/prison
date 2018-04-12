import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {Modal, Form, Card, Row, Col, Input, InputNumber, DatePicker, Radio, Icon, Tabs, Layout} from 'antd';

let FormItem = Form.Item;
let TabPane = Tabs.TabPane;
let RadioButton = Radio.Button;
let RadioGroup = Radio.Group;
let {RangePicker} = DatePicker;

import {handleMoment} from '../../../../../utils/util';
import * as action from '../../../../../redux/actions/video';
import MyModalForm from "../../../../../components/MyModalForm/index";
import IPCTree from '../../../../IPCTree'
import MultiImgUpload from "../../../../../components/MultiImgUpload/index";

class VideoFormC extends React.Component {
	constructor() {
		super();
		this.state = {
			flag: false,
			title: '',
			footer: true,
			id: undefined,
			initData: {
				task: undefined,
				similarity: undefined,
				type: 1,
				video: {}
			},
			loading: false,
			uploadList:[],
			initImgList:[],
			disable: false
		}
	}

	getImgData = (uploadList) => {
		this.setState({
			uploadList
		})
	};
	isLoading = (value) => {
		this.setState({
			loading: value
		})
	};
	handleCancel = () => {
		this.setState({
			flag: false,
			loading: false
		})
	};
	handleSubmit = () => {
		let {form: {validateFields}, addTableData, editTableData} = this.props;
		validateFields((err, values) => {
			if (!err&&this.state.uploadList.length) {
				this.isLoading(true);
				let {task, similarity, type} = values;
				let {id, uploadList,initImgList} = this.state;
				let fn = null;
				if (typeof id === 'undefined') {
					fn = addTableData
				} else {
					fn = editTableData
				}
				let video = {};
				if (type == 1) {
					let {/*ip, port, username, password,*/ value, NVRTime} = values;
					console.log(value);
					// video.ip = ip;
					// video.port = port;
					// video.username = username;
					// video.password = password;
					video.value = value;
					video.beginTime = NVRTime && NVRTime[0] ? NVRTime[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
					video.endTime = NVRTime && NVRTime[1] ? NVRTime[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				} else {
					let {localVideo} = values;
					video.localVideo = localVideo;
				}
				fn({
					id,
					task,
					similarity,
					type,
					video,
					targetPicture: {
						deleteList:initImgList.filter(item=>(
							!uploadList.find(ite=>ite.isNoChange?ite.url!==item:false)
						)),
						updateList:uploadList.filter(item=>!item.isNoChange).map(item=>item.url)
					}
				}).then(data => {
					if (data.result) {
						Modal.success({
							title: '提交成功'
						});
						this.handleCancel();
					} else {
						this.isLoading(false);
						Modal.error({
							title: '提交失败',
							content: data.err
						})
					}
				});
			}else if(!this.state.uploadList.length){
				Modal.error({
					title: '目标图片不能为空',
					content: '请上传至少一张目标图片'
				})
			}
		})
	};
	handleEdit = (id, footer) => {
		let {getSeeData, form: {resetFields}} = this.props;
		getSeeData(id).then(data => {
			if (data.result) {
				let {task, similarity, type, video, targetPicture} = data.data;
				console.log(targetPicture);
				if (type == 1) {
					let NVRBeginTime = handleMoment(video.beginTime);
					let NVREndTime = handleMoment(video.endTime);
					video.NVRTime = [NVRBeginTime, NVREndTime];
				} else {

				}
				this.setState({
					flag: true,
					title: footer ? '修改任务信息' : '查看任务信息',
					footer,
					id,
					initData: {
						task,
						similarity,
						type,
						video
					},
					loading: false,
					uploadList: targetPicture.updateList.map((item,index)=>({
						uid:-(index+1),
						status:'done',
						url:item,
						name:`${index}.jpg`,
						isNoChange:1
					})),
					initImgList:targetPicture.updateList.map(item=>item.img),
					disable: !footer
				}, resetFields)
			} else {
				Modal.error({
					title: '获取信息失败',
					content: data.err
				})
			}
		})
	};
	handleAdd = () => {
		let {form: {resetFields}} = this.props;
		this.setState({
			flag: true,
			title: '新建任务',
			footer: true,
			id: undefined,
			initData: {
				type: 1,
				video: {}
			},
			loading: false,
			uploadList: [],
			initImgList:[],
			disable: false
		}, resetFields)
	};

	componentDidMount() {
		let {getAdd, getEdit} = this.props;
		getAdd(this.handleAdd);
		getEdit(this.handleEdit);
	}

	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			initData: {
				type: 1,
				video: {}
			},
			loading: false,
			uploadList: []
		})
	};

	render() {
		let {flag, title, footer, initData, uploadList, disable} = this.state;
		let {form: {getFieldDecorator, getFieldValue}} = this.props;
		let {task, type, similarity, video} = initData;
		let formItemLayout = {
			labelCol: {
				sm: {span: 5},
			},
			wrapperCol: {
				sm: {span: 15},
			},
			colon: false
		};
		let formItemLayoutT = {
			labelCol: {
				sm: {span: 5},
			},
			wrapperCol: {
				sm: {span: 19},
			},
			colon: false
		};
		let modalFormProps = {
			width: 1000,
			flag,
			title,
			footer,
			handleSubmit: this.handleSubmit,
			myStyle: {top: 10},
			handleCancel: this.handleCancel,
			handleReset: this.handleReset
		};
		let imgUploadProps = {
			getImgData: this.getImgData,
			uploadList,
			disable,
			limit:5,
			maxSize:200
		};
		let formTabStyle = {
			width: '92px',
			height: '40px',
			margin: '0 -16px',
			border: 'none',
			textAlign: 'center',
			backgroundColor: 'transparent'
		};
		let ipcTreeProps={
			showSearch:true,
			dropdownMatchSelectWidth: false,
			placeholder: '请选择摄像头',
			treeCheckable: false,
			allowClear: false,
			mySelectable:[3]
		};
		let typeWord = ['本地上传', 'NVR'];
		return (
			<MyModalForm {...modalFormProps}>
				<Row gutter={16}>
					<Col span={16} style={{backgroundColor: '#ffffff', height: '660px', padding: '40px 0'}}>
						<FormItem label="任务名称" {...formItemLayout}>
							{getFieldDecorator("task", {
								initialValue: task,
								trigger: disable ? null : 'onChange',
								rules: [
									{
										required: true,
										message: '请输入任务名称'
									}
								]
							})(
								<Input placeholder="任务名称"/>
							)}
						</FormItem>
						<FormItem label="最低相似度" colon={formItemLayout.colon} {...formItemLayout}>
							{getFieldDecorator("similarity", {
								initialValue: similarity,
								trigger: disable ? null : 'onChange'
							})(
								<InputNumber
									min={0}
									max={1}
									step={0.01}
									placeholder={0.01}
								/>
							)}
						</FormItem>
						<FormItem label="视频来源" {...formItemLayoutT}>
							{getFieldDecorator("type", {
								initialValue: type,
								trigger: disable ? null : 'onChange',
								rules: [
									{
										required: true,
										message: '请选择视频来源'
									}
								]
							})(
								<RadioGroup className="card-container">

									<Tabs defaultActiveKey={`${type}`}>
										<TabPane
											tab={<RadioButton
												value={1}
												style={formTabStyle}
											>
												<Icon type="user"/>{typeWord[1]}
											</RadioButton>}
											key='1'
										>
											{/*<FormItem label="IP" {...formItemLayout}>*/}
												{/*{getFieldDecorator("ip", {*/}
													{/*initialValue: video.ip,*/}
													{/*trigger: disable ? null : 'onChange',*/}
													{/*rules: [*/}
														{/*{*/}
															{/*required: getFieldValue("type") == 1,*/}
															{/*message: '请输入IP'*/}
														{/*}*/}
													{/*]*/}
												{/*})(*/}
													{/*<Input placeholder="IP" style={{width: '100%'}}/>*/}
												{/*)}*/}
											{/*</FormItem>*/}
											{/*<FormItem label="端口号" {...formItemLayout}>*/}
												{/*{getFieldDecorator("port", {*/}
													{/*initialValue: video.port,*/}
													{/*trigger: disable ? null : 'onChange',*/}
													{/*rules: [*/}
														{/*{*/}
															{/*required: getFieldValue("type") == 1,*/}
															{/*message: '请输入端口号'*/}
														{/*}*/}
													{/*]*/}
												{/*})(*/}
													{/*<InputNumber placeholder="端口号" style={{width: '100%'}}/>*/}
												{/*)}*/}
											{/*</FormItem>*/}
											{/*<FormItem label="用户名" {...formItemLayout}>*/}
												{/*{getFieldDecorator("username", {*/}
													{/*initialValue: video.username,*/}
													{/*trigger: disable ? null : 'onChange',*/}
													{/*rules: [*/}
														{/*{*/}
															{/*required: getFieldValue("type") == 1,*/}
															{/*message: '请输入用户名'*/}
														{/*}*/}
													{/*]*/}
												{/*})(*/}
													{/*<Input placeholder="用户名" style={{width: '100%'}}/>*/}
												{/*)}*/}
											{/*</FormItem>*/}
											{/*<FormItem label="密码" {...formItemLayout}>*/}
												{/*{getFieldDecorator("password", {*/}
													{/*initialValue: video.password,*/}
													{/*trigger: disable ? null : 'onChange',*/}
													{/*rules: [*/}
														{/*{*/}
															{/*required: getFieldValue("type") == 1,*/}
															{/*message: '请输入密码'*/}
														{/*}*/}
													{/*]*/}
												{/*})(*/}
													{/*<Input placeholder="密码" style={{width: '100%'}}/>*/}
												{/*)}*/}
											{/*</FormItem>*/}

											<FormItem label="设备" {...formItemLayout}>
												{getFieldDecorator("value", {
													initialValue: video.value,
													trigger: disable ? null : 'onChange',
													rules: [
														{
															required: getFieldValue("type") == 1,
															message: '请输入通道'
														}
													]
												})(
													<IPCTree {...ipcTreeProps}/>
												)}
											</FormItem>
											<FormItem label="NVR时间" {...formItemLayoutT}>
												{getFieldDecorator("NVRTime", {
													initialValue: video.NVRTime,
													trigger: disable ? null : 'onChange',
													rules: [
														{
															required: getFieldValue("type") == 1,
															message: '请选择时间'
														}
													]
												})(
													<RangePicker
														showTime={{format: 'HH:mm'}}
														format="YYYY-MM-DD HH:mm"
														placeholder={['开始时间', '结束时间']}
													/>
												)}
											</FormItem>

										</TabPane>
										<TabPane
											tab={<RadioButton
												value={2}
												style={formTabStyle}
											>
												<Icon type="car"/>{typeWord[0]}
											</RadioButton>}
											key='0'
										>
											2
										</TabPane>
									</Tabs>

								</RadioGroup>
							)}
						</FormItem>
					</Col>
					<Col span={8} style={{height: '660px'}}>

						<Card title="目标图片" bordered={false} style={{height: '100%'}}>
							<MultiImgUpload {...imgUploadProps}/>
						</Card>
					</Col>
				</Row>
			</MyModalForm>
		)
	}
}
const VideoForm = Form.create()(VideoFormC);
export default connect(
	state => ({...state.videoTableR}),
	action
)(VideoForm)