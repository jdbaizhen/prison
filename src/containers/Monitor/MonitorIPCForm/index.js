import React from 'react';
import {connect} from 'react-redux';
import {Layout, Form, InputNumber, Input, Icon, Radio, Select, Button, Modal, TreeSelect} from 'antd';

let Option = Select.Option;
let {Sider} = Layout;
let FormItem = Form.Item;
let RadioButton = Radio.Button;
let RadioGroup = Radio.Group;
let TreeNode = TreeSelect.TreeNode;

import * as action from '../../../redux/actions/monitor';
import regionIdData from './regionIdData';

class MonitorIPCFormC extends React.Component {
	constructor() {
		super();
		this.state = {
			flag: true,
			title: '',
			footer: true,
			id: undefined,
			initData: {
				ip: undefined,
				username: undefined,
				password: undefined,
				deviceType: undefined,

				port: undefined,
				channel: undefined,
				cameraName: undefined,
				x: undefined,
				y: undefined,
				regionId: undefined,
				nvrId: undefined,

				name: undefined
			},
			loading: false,
			disable: false
		}
	}

	isLoading = (value) => {
		this.setState({
			loading: value
		})
	};
	handleSubmit = () => {
		let {form: {validateFields}, addTableData, editTableData} = this.props;
		validateFields((err, values) => {
			if (!err) {
				this.isLoading(true);
				let {ip, port, username, password, channel, deviceType, cameraName, x, y, regionId,nvrId,name} = values;
				let {id} = this.state;
				let fn = null;
				if (typeof id === 'undefined') {
					fn = addTableData
				} else {
					fn = editTableData
				}
				let obj=null;
				if(deviceType){
					obj={
						name
					}
				}else {
					obj={
						nvrId,
						cameraName,
						channel,
						port,
						coordinate:`x:${x} y:${y}`,
						regionId
					}
				}
				fn({
					id,
					ip,
					username,
					password,
					deviceType,
					...obj
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
			}
		})
	};
	handleEdit = (id, footer) => {
		let {getSeeData, form: {resetFields, getFieldValue}} = this.props;
		getSeeData(id).then(data => {
			if (data.result) {
				let {ip, port, username, password, channel, deviceType, cameraName, coordinate, regionId,nvrId,name} = data.data;
				let obj=null;
				if(deviceType){
					obj={
						name
					}
				}else {
					let ary = coordinate.split(' ');
					let x = parseFloat(ary[0].split(':')[1]);
					let y = parseFloat(ary[1].split(':')[1]);
					obj={
						nvrId,
						cameraName,
						channel,
						port,
						x,
						y,
						regionId
					}
				}
				this.setState({
					flag: false,
					title: footer ? '修改设备信息' : '查看设备信息',
					footer,
					id,
					initData: {
						ip,
						username,
						password,
						deviceType,
						...obj
					},
					loading: false,
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
			flag: false,
			title: '添加设备',
			footer: true,
			id: undefined,
			initData: {},
			loading: false,
			disable: false
		}, resetFields)
	};
	handleCancel = () => {
		this.setState({
			flag: true,
			loading: false
		})
	};

	componentDidMount() {
		let {getAdd, getEdit} = this.props;
		getAdd(this.handleAdd);
		getEdit(this.handleEdit);
	}

	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			initData: {},
			loading: false
		})
	};

	render() {
		let {flag, title, footer, initData, disable, loading} = this.state;
		let {ip, port, username, password, channel, deviceType, cameraName, x, y, regionId, nvrId, name} = initData;
		let {form: {getFieldDecorator, getFieldValue}, nvrs} = this.props;
		let formItemLayout = {
			labelCol: {
				sm: {span: 7},
			},
			wrapperCol: {
				sm: {span: 15},
			},
			colon: false
		};
		return (
			<Sider
				width={300}
				collapsedWidth={0}
				collapsed={flag}
				className="ipc-box"
			>
				<div className="ipc-form">
					<div className="ipc-header">
						{title}
						<Icon type="close" className="ipc-close" onClick={this.handleCancel}/>
					</div>
					<div className="ipc-form-body">
						<Form layout="Horizontal">
							<FormItem label="IP" {...formItemLayout}>
								{getFieldDecorator("ip", {
									initialValue: ip,
									trigger: disable ? null : 'onChange',
									rules: [
										{
											required: true,
											message: '请输入设备IP'
										}
									]
								})(
									<Input placeholder="IP" style={{width: '100%'}}/>
								)}
							</FormItem>
							<FormItem label="用户名" {...formItemLayout}>
								{getFieldDecorator("username", {
									initialValue: username,
									trigger: disable ? null : 'onChange',
									rules: [
										{
											required: true,
											message: '请输入设备用户名'
										}
									]
								})(
									<Input placeholder="设备用户名" style={{width: '100%'}}/>
								)}
							</FormItem>
							<FormItem label="密码" {...formItemLayout}>
								{getFieldDecorator("password", {
									initialValue: password,
									trigger: disable ? null : 'onChange',
									rules: [
										{
											required: true,
											message: '请输入设备密码'
										}
									]
								})(
									<Input placeholder="设备密码" style={{width: '100%'}}/>
								)}
							</FormItem>
							<FormItem label="设备类型" {...formItemLayout}>
								{getFieldDecorator("deviceType", {
									initialValue: deviceType,
									trigger: disable ? null : 'onChange',
									rules: [
										{
											required: true
										}
									]
								})(
									<RadioGroup className="card-container">
										<RadioButton value={0}>IPC</RadioButton>
										<RadioButton value={1}>NVR</RadioButton>
									</RadioGroup>
								)}
							</FormItem>
							{!getFieldValue("deviceType") ? (
								<div>
									<FormItem label="名称" {...formItemLayout}>
										{getFieldDecorator("cameraName", {
											initialValue: cameraName,
											trigger: disable ? null : 'onChange',
											rules: [
												{
													required: true,
													message: '请输入摄像头名称'
												}
											]
										})(
											<Input placeholder="摄像头名称" style={{width: '100%'}}/>
										)}
									</FormItem>
									<FormItem label="端口号" {...formItemLayout}>
										{getFieldDecorator("port", {
											initialValue: port,
											trigger: disable ? null : 'onChange',
											rules: [
												{
													required: false,
													message: '请输入摄像头端口号'
												}
											]
										})(
											<InputNumber placeholder="摄像头端口号" style={{width: '40%'}}/>
										)}
									</FormItem>
									<FormItem label="连接NVR" {...formItemLayout}>
										{getFieldDecorator("nvrId", {
											initialValue: nvrId,
											trigger: disable ? null : 'onChange',
											rules: [
												{
													required: false,
													message: '请选择连接的NVR'
												}
											]
										})(
											<Select placeholder="连接的NVR" style={{width: '100%'}} allowClear>
												{nvrs ? nvrs.map(item => (
													<Option value={item.id}>{item.name}</Option>
												)) : null}
											</Select>
										)}
									</FormItem>
									<FormItem label="通道" {...formItemLayout}>
										{getFieldDecorator("channel", {
											initialValue: channel,
											trigger: disable ? null : 'onChange',
											rules: [
												{
													required: true,
													message: '请输入摄像头通道'
												}
											]
										})(
											<Input placeholder="摄像头通道" style={{width: '100%'}}/>
										)}
									</FormItem>
									<FormItem label="所在楼层" {...formItemLayout}>

										{getFieldDecorator("regionId", {
											initialValue: regionId,
											trigger: disable ? null : 'onChange',
											rules: [
												{
													required: true,
													message: '请输入所在楼层'
												}
											]
										})(
											<TreeSelect
												showSearch
												placeholder="摄像头所在楼层"
												allowClear
											>
												{regionIdData.map(item => (
													<TreeNode title={item.region} key={item.region}
													          value={item.region}
													          selectable={false}>
														{item.floors.map(ite => (
															<TreeNode title={`${item.region}/${ite.floor}`}
															          key={ite.regionId}
															          value={ite.regionId}/>
														))}
													</TreeNode>
												))}

											</TreeSelect>
										)}
									</FormItem>
									<FormItem label="坐标" {...formItemLayout}>

										<FormItem label="X" {...formItemLayout}>
											{getFieldDecorator("x", {
												initialValue: x,
												trigger: disable ? null : 'onChange',
												rules: [
													{
														required: true,
														message: '请输入X坐标'
													}
												]
											})(
												<InputNumber placeholder="X坐标" style={{width: '100%'}}/>
											)}
										</FormItem>

										<FormItem label="Y" {...formItemLayout}>
											{getFieldDecorator("y", {
												initialValue: y,
												trigger: disable ? null : 'onChange',
												rules: [
													{
														required: true,
														message: '请输入Y坐标'
													}
												]
											})(
												<InputNumber placeholder="Y坐标" style={{width: '100%'}}/>
											)}
										</FormItem>

									</FormItem>
								</div>
							) : (
								<div>
									<FormItem label="名称" {...formItemLayout}>
										{getFieldDecorator("name", {
											initialValue: name,
											trigger: disable ? null : 'onChange',
											rules: [
												{
													required: true,
													message: '请输入NVR名称'
												}
											]
										})(
											<Input placeholder="NVR名称" style={{width: '100%'}}/>
										)}
									</FormItem>
								</div>
							)}

						</Form>
					</div>
					{footer ? (<div className="ipc-footer">
						<Button
							type="primary"
							icon="check"
							onClick={this.handleSubmit}
							style={{margin: '0 2px'}}
							loading={loading}
						>
							提交
						</Button>
						<Button
							onClick={this.handleReset}
							style={{margin: '0 2px'}}
						>
							重置
						</Button>
					</div>) : null}
				</div>
			</Sider>
		)
	}
}

import './index.less'

let MonitorIPCForm = Form.create()(MonitorIPCFormC);
export default connect(
	state => ({nvrs: state.monitorTableR.details.nvrVOS}),
	action
)(MonitorIPCForm)