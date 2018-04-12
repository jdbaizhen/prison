import React from 'react';
import {Form, DatePicker, Select, TreeSelect, Radio, Row, Col, Button} from 'antd';

let RadioButton = Radio.Button;
let RadioGroup = Radio.Group;
let SHOW_PARENT = TreeSelect.SHOW_PARENT;
let FormItem = Form.Item;
import moment from 'moment';
import SearchTable from "../../../components/SearchTable/index";
import IPCTree from '../../IPCTree';


class ChartSearchC extends React.Component {
	constructor() {
		super();
		this.state = {
			road: [],
			time: undefined,
			dataType: '日'
		}
	}

	componentDidMount() {
		let {date, road} = this.props;
		this.setState({
			time: date,
			road
		})
	}

	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {time, road} = values;
			let date = time ? time.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
			setSearchTerm({
				road,
				date
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			road: [],
			time: undefined
		})
	};
	handleDataType = (e) => {
		this.setState({
			dataType:e.target.value
		})
	}
	render() {
		let formItemLayout = {
			colon: false,
			style: {padding: '0 5px', marginBottom: 0}
		};
		let {form: {getFieldDecorator}} = this.props;
		let {time, road, dataType} = this.state;
		let myProps = {
			searchFn: this.handleSearch,
			handleReset: this.handleReset
		};
		let ipcTreeProps = {
			showSearch: false,
			dropdownMatchSelectWidth: false,
			treeDefaultExpandAll: true,
			showCheckedStrategy: SHOW_PARENT,
			placeholder: '请选择摄像头',
			treeCheckable: true,
			allowClear: true,
			style: {width: 300}
		};
		return (
			<Row type="flex" justify="center" align="middle">
				<Col span={17} style={{paddingLeft:'20px'}}>
					<SearchTable {...myProps}>
						<FormItem label="摄像头" {...formItemLayout}>
							{getFieldDecorator("road", {
								initialValue: road
							})(
								<IPCTree {...ipcTreeProps}/>
							)}
						</FormItem>
						<FormItem label="识别时间" {...formItemLayout}>
							{getFieldDecorator("time", {
								initialValue: time
							})(
								<DatePicker
									format="YYYY-MM-DD"
								/>
							)}
						</FormItem>
					</SearchTable>
				</Col>
				<Col span={7} style={{textAlign:'right',paddingRight:'70px'}}>
					<Button>上一{dataType}</Button>
					<RadioGroup defaultValue="a" value={dataType} onChange={this.handleDataType} style={{margin:'0 15px'}}>
						<RadioButton value="日">日</RadioButton>
						<RadioButton value="月">月</RadioButton>
						<RadioButton value="年">年</RadioButton>
					</RadioGroup>
					<Button>下一{dataType}</Button>
				</Col>
			</Row>
		)
	}
}

export const ChartSearch = Form.create()(ChartSearchC);