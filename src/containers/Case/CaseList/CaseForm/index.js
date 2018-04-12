import React from 'react';
import {Modal, Form, Card, Row, Col, Input, InputNumber, DatePicker, TreeSelect} from 'antd';
import {connect} from 'react-redux';

let {RangePicker} = DatePicker;
let FormItem = Form.Item;
let SHOW_PARENT = TreeSelect.SHOW_PARENT;

import {handleMoment} from '../../../../utils/util';
import * as action from '../../../../redux/actions/case'
import MyModalForm from "../../../../components/MyModalForm/index";
import MultiImgUpload from "../../../../components/MultiImgUpload/index";
import IPCTree from "../../../IPCTree/index";

class CaseFormC extends React.Component {
	constructor() {
		super();
		this.state = {
			flag: false,
			title: '',
			footer: true,
			id: undefined,
			initData: {
				name: undefined,
				principal: undefined,
				similarity: undefined,
				time: [],
				crossingData: [],
			},
			loading: false,
			uploadList:[],
			initImgList:[],
			disable:false
		}
	}
	getImgData=(uploadList)=>{
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
		let {form: {validateFields}, addTableData,editTableData} = this.props;
		validateFields((err, values) => {
			if (!err) {
				this.isLoading(true);
				let {name,principal, similarity, time, crossingData} = values;
				let beginTime = time && time[0] ? time[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				let endTime = time && time[1] ? time[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				let {id, uploadList,initImgList} = this.state;
				let fn = null;
				if (typeof id === 'undefined') {
					fn = addTableData
				} else {
					fn = editTableData
				}
				fn({
					caseId:id,
					caseName : name,
                    principal,
					similarity,
					beginTime,
					crossingData,
					endTime,
					imgPath:uploadList.filter(item=>item.isNoChange).map(item=>item.url),
					deleteImgPath:initImgList.filter(item=>(
						!uploadList.find(ite=>ite.isNoChange?ite.url!==item:false)
					)),

					imgData:uploadList.filter(item=>!item.isNoChange).map(item=>item.url)
				}).then(data => {
					if (data.result==='9999') {
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
	handleEdit = (id,footer) => {
		let {getSeeData,form: {resetFields}} = this.props;
		getSeeData(id).then(data=>{
			if(data.result==='9999'){
				let {caseName,principal, similarity, crossingData,imgData,beginTime,endTime}=data.data;
				let initBeginTime = handleMoment(beginTime);
				let initEndTime = handleMoment(endTime);
                this.setState({
					flag: true,
					title: footer ? '修改案件信息' : '查看案件信息',
	                footer,
	                id,
					initData: {
						name:caseName,
                        principal,
						similarity,
						time: [initBeginTime, initEndTime],
						crossingData,
					},
					loading: false,
	                uploadList: imgData.map((item,index)=>({
		                uid:-index,
		                status:'done',
		                url:item,
		                name:`${index}.jpg`,
		                isNoChange:1
	                })),
	                initImgList:imgData,
					disable:!footer
				},resetFields)
			}else{
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
			title: '新建案件',
			footer: true,
			id: undefined,
			initData: {
				name: undefined,
				principal: undefined,
				similarity: undefined,
				time: [],
				crossingData: [],
			},
			loading: false,
			uploadList: [],
			initImgList:[],
			disable:false
		},resetFields)
	};
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			initData: {
				name: undefined,
				principal: undefined,
				similarity: undefined,
				time: [],
				crossingData: [],
			},
			uploadList:[]
		})
	};

	componentDidMount() {
		let {getAdd, getEdit} = this.props;
		getAdd(this.handleAdd);
		getEdit(this.handleEdit);
	}

	render() {
		let {flag, title, footer, initData,uploadList,disable} = this.state;
		let {form: {getFieldDecorator}} = this.props;
		let {name, principal, similarity, time, crossingData} = initData;
		let formItemLayout = {
			labelCol: {
				sm: {span: 5},
			},
			wrapperCol: {
				sm: {span: 15},
			},
			colon: false
		};
		let modalFormProps = {
			width: 800,
			flag,
			title,
			footer,
			handleSubmit: this.handleSubmit,
			handleCancel: this.handleCancel,
			handleReset: this.handleReset
		};
		let imgUploadProps={
			getImgData:this.getImgData,
			uploadList,
			disable,
			limit:5,
			maxSize:200
		};
		let ipcTreeProps={
			showSearch: true,
			dropdownStyle: {
				maxHeight: 400,
				overflow: 'auto'
			},
			size: 'large',
			dropdownMatchSelectWidth: false,
			treeDefaultExpandAll: true,
			showCheckedStrategy: SHOW_PARENT,
			placeholder: '请选择布控区域',
			treeCheckable: true,
			allowClear: true,
		}
		return (
			<MyModalForm {...modalFormProps}>
				<Row gutter={8} type="flex">
					<Col span={15}>
						<Card title="案件信息" bordered={false}>
							<FormItem label="案件名称" {...formItemLayout}>
								{getFieldDecorator("name", {
									initialValue: name,
									trigger:disable?null:'onChange',
									rules: [
										{
											required: true,
											message: '请输入案件名称'
										}
									]
								})(
									<Input placeholder="案件名称" style={{width: '100%'}}/>
								)}
							</FormItem>
							<FormItem label="责任人" {...formItemLayout}>
								{getFieldDecorator("principal", {
									initialValue: principal,
									trigger:disable?null:'onChange',
									rules: [
										{
											required: true,
											message: '请输入责任人'
										}
									]
								})(
									<Input placeholder="如张三" style={{width: '100%'}}/>
								)}
							</FormItem>
							<FormItem label="相似度阈值" colon={formItemLayout.colon} {...formItemLayout}>
								{getFieldDecorator("similarity", {
									initialValue: similarity,
									trigger:disable?null:'onChange',
								})(
									<InputNumber
										min={0}
										max={1}
										step={0.01}
										placeholder={0.01}
									/>
								)}
							</FormItem>
							<FormItem label="有效时间" {...formItemLayout} wrapperCol={{
								xs: {span: 24},
								sm: {span: 19},
							}}>
								{getFieldDecorator("time", {
									initialValue: time,
									trigger:disable?null:'onChange',
								})(
									<RangePicker
										showTime={{format: 'HH:mm'}}
										format="YYYY-MM-DD HH:mm"
										placeholder={['生效时间', '失效时间']}
										style={{width: '100%'}}
									/>
								)}
							</FormItem>
						</Card>
						<Card
							title="摄像头区域布控"
							bordered={false}
							style={{marginTop:'8px'}}
						>
							<FormItem label="已选布控区域">
								{getFieldDecorator("crossingData", {
									initialValue: crossingData,
									trigger:disable?null:'onChange',
									rules: [
										{
											required: true,
											message: '请选择布控区域'
										}
									]
								})(
									<IPCTree {...ipcTreeProps}/>
								)}
							</FormItem>

						</Card>
					</Col>
					<Col span={9} style={{display:'flex'}}>
						<Card title="人员布控" bordered={false} style={{width:'100%'}}>
							<MultiImgUpload {...imgUploadProps}/>
						</Card>
					</Col>
				</Row>
			</MyModalForm>
		)
	}
}

const CaseForm = Form.create()(CaseFormC);

export default connect(
	state => ({}),
	action
)(CaseForm)