import React from 'react';
import {Modal, Form, Card, Row, Col, InputNumber, DatePicker, Radio, TreeSelect, Slider} from 'antd';
import {connect} from 'react-redux';

let RadioButton = Radio.Button;
let RadioGroup = Radio.Group;
let {RangePicker} = DatePicker;
let FormItem = Form.Item;
let SHOW_PARENT = TreeSelect.SHOW_PARENT;
import {handleMoment} from '../../../../../utils/util';
import * as action from '../../../../../redux/actions/track';
import MyModalForm from "../../../../../components/MyModalForm/index";
import MultiImgUpload from "../../../../../components/MultiImgUpload/index";
import IPCTree from '../../../../IPCTree'


class TrackFormC extends React.Component {
	constructor() {
		super();
		this.state = {
			flag: false,
			title: '',
			footer: true,
			id: undefined,
			initData: {
				targetSex: undefined,
				age: [],
				targetSimilar: undefined,
				time: [],
				crossingData: []
			},
			loading: false,
			uploadList: [],
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
			if (!err) {
				this.isLoading(true);
				let {targetSex, age, targetSimilar, time, crossingData} = values;
				let beginTime = time && time[0] ? time[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				let endTime = time && time[1] ? time[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
				let traceArea = crossingData.join(',');
				let targetAge = age.join('-');
				let {id, uploadList} = this.state;
				let fn = null;
				if (typeof id === 'undefined') {
					fn = addTableData
				} else {
					fn = editTableData
				}
				fn({
					traceId: id,
					targetAge,
					targetSex,
					targetSimilar,
					startTime: beginTime,
					traceArea,
					endTime,
					targetImgBase64: uploadList[0].url
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
		let {getSeeData, form: {resetFields}} = this.props;
		getSeeData(id).then(data => {
			if (data.result) {
				let {targetSex, targetAge, targetSimilar, traceBeginTime, traceEndTime, traceArea, targetImgBase64} = data.data;
				let initBeginTime = handleMoment(traceBeginTime);
				let initEndTime = handleMoment(traceEndTime);
				let age = targetAge.split('-');
				let crossingData = traceArea.split(',');
				this.setState({
					flag: true,
					title: footer? '修改追查条件' : '查看追查条件',
					footer,
					id,
					initData: {
						targetSex,
						age,
						targetSimilar,
						time: [initBeginTime, initEndTime],
						crossingData
					},
					loading: false,
					uploadList: [{uid:-1,
						status:'done',
						url:targetImgBase64,
						name:'目标图片.jpg',
						isNoChange:1}],
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
			title: '新建追查条件',
			footer: true,
			id: undefined,
			initData: {
				targetSex: undefined,
				age: [],
				targetSimilar: undefined,
				time: [],
				crossingData: []
			},
			loading: false,
			uploadList: [],
			disable: false
		}, resetFields)
	};

	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			initData: {
				targetSex: undefined,
				age: [],
				targetSimilar: undefined,
				time: [],
				crossingData: []
			},
			loading: false,
			uploadList: []
		})
	};

	componentDidMount() {
		let {getAdd, getEdit} = this.props;
		getAdd(this.handleAdd);
		getEdit(this.handleEdit);
	}

	render() {
		let {flag, title, footer, initData, uploadList, disable} = this.state;
		let {form: {getFieldDecorator}} = this.props;
		let {targetSex, age, targetSimilar, time, crossingData} = initData;
		let formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 5},
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 15},
			},
			colon: false
		};
		let modalFormProps = {
			width: 600,
			flag,
			title,
			footer,
			handleSubmit: this.handleSubmit,
			myStyle: {top: 10},
			handleCancel: this.handleCancel,
			handleReset: this.handleReset
		};

		let ipcTreeProps = {
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
		};
		let imgUploadProps = {
			getImgData: this.getImgData,
			uploadList,
			disable,
			limit: 1,
			maxSize: 200
		};

		return (
			<MyModalForm {...modalFormProps}>
				<Card title="目标图片"
				      bordered={false}
				>
					<MultiImgUpload {...imgUploadProps}/>
				</Card>
				<Card
					title="追查条件"
					bordered={false}
					style={{marginTop: '8px'}}
				>
					<FormItem label="性别" {...formItemLayout}>
						{getFieldDecorator("targetSex", {
							initialValue: targetSex,
							trigger: disable ? null : 'onChange',
						})(
							<RadioGroup>
								<RadioButton value={0}>男</RadioButton>
								<RadioButton value={1}>女</RadioButton>
							</RadioGroup>
						)}
					</FormItem>
					<FormItem label="年龄" {...formItemLayout}>
						{getFieldDecorator("age", {
							initialValue: age,
							trigger: disable ? null : 'onChange'
						})(
							<Slider range min={1} max={100} marks={{
								1: '1',
								10: '10',
								20: '20',
								30: '30',
								40: '40',
								50: '50',
								60: '60',
								70: '70',
								80: '80',
								90: '90',
								100: '100'
							}} step={1} style={{width: '350px'}}/>
						)}
					</FormItem>
					<FormItem label="相似度" {...formItemLayout}>
						{getFieldDecorator("targetSimilar", {
							initialValue: targetSimilar
						})(
							<InputNumber
								min={0}
								max={1}
								step={0.01}
								placeholder={0.01}
							/>
						)}
					</FormItem>
					<FormItem label="追查时间" {...formItemLayout} wrapperCol={{
						xs: {span: 24},
						sm: {span: 19},
					}}>
						{getFieldDecorator("time", {
							initialValue: time,
							trigger: disable ? null : 'onChange',
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
					style={{marginTop: '8px'}}
				>
					<FormItem label="已选布控区域">
						{getFieldDecorator("crossingData", {
							initialValue: crossingData,
							trigger: disable ? null : 'onChange',
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
			</MyModalForm>
		)
	}
}


const TrackForm = Form.create()(TrackFormC);
export default connect(
	state => ({}),
	action
)(TrackForm)