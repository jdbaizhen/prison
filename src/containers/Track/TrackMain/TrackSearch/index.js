import React from 'react';
import {Form, DatePicker, Select} from 'antd';

let {RangePicker} = DatePicker;
let FormItem = Form.Item;
import {handleMoment} from '../../../../utils/util';
import SearchTable from "../../../../components/SearchTable/index";

class TrackSearch extends React.Component {
	constructor() {
		super();
		this.state = {
			traceStatus: 2,
			time: [],
		}
	}

	componentDidMount() {
		let {traceStatus, beginTime, endTime} = this.props;
		let initBeginTime = handleMoment(beginTime);
		let initEndTime = handleMoment(endTime);
		this.setState({
			traceStatus,
			time: [initBeginTime, initEndTime]
		})
	}

	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {traceStatus, time} = values;
			let beginTime = time[0] ? time[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
			let endTime = time[1] ? time[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
			setSearchTerm({
				traceStatus,
				beginTime,
				endTime
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			traceStatus: 2,
			time: [],
		})
	};

	render() {
		let formItemLayout = {
			colon: false,
			style: {padding: '0 5px', marginBottom: 0}
		};
		let {form: {getFieldDecorator}, setTableH} = this.props;
		let {traceStatus, time} = this.state;
		let myProps = {
			setTableH,
			searchFn: this.handleSearch,
			handleReset: this.handleReset
		};
		let stateWord=["查询中", "查询完毕","不限"];
		return (
			<SearchTable {...myProps}>
				<FormItem label="状态" {...formItemLayout}>
					{getFieldDecorator("traceStatus", {
						initialValue: traceStatus
					})(
						<Select
							style={{width: 100}}
							optionFilterProp="children"
						>
							{
								stateWord.map((item,index)=>(
									<Option value={index} key={index}>{item}</Option>
								))
							}
						</Select>
					)}
				</FormItem>
				<FormItem label="创建时间" {...formItemLayout}>
					{getFieldDecorator("time", {
						initialValue: time
					})(
						<RangePicker
							showTime={{format: 'HH:mm'}}
							format="YYYY-MM-DD HH:mm"
							placeholder={['Start Time', 'End Time']}
						/>
					)}
				</FormItem>
			</SearchTable>
		)
	}
}

export default Form.create()(TrackSearch);