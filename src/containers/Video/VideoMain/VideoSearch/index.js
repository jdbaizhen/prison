import React from 'react';
import {Form, DatePicker,Input} from 'antd';
let {RangePicker} = DatePicker;
let FormItem = Form.Item;

import {handleMoment} from '../../../../utils/util';
import SearchTable from "../../../../components/SearchTable/index";

class VideoSearch extends React.Component{
	constructor() {
		super();
		this.state = {
			task: undefined,
			time: [],
		}
	}
	componentDidMount() {
		let {task, beginTime, endTime} = this.props;
		let initBeginTime = handleMoment(beginTime);
		let initEndTime = handleMoment(endTime);
		this.setState({
			task,
			time: [initBeginTime, initEndTime]
		})
	}
	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {task, time} = values;
			let beginTime = time[0] ? time[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
			let endTime = time[1] ? time[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
			setSearchTerm({
				task,
				beginTime,
				endTime
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			task: undefined,
			time: [],
		})
	};
    render(){
	    let formItemLayout = {
		    colon: false,
		    style: {padding: '0 5px', marginBottom: 0}
	    };
	    let {form: {getFieldDecorator}, setTableH} = this.props;
	    let {task, time} = this.state;
	    let myProps = {
		    setTableH,
		    searchFn: this.handleSearch,
		    handleReset: this.handleReset
	    };
        return(
	        <SearchTable {...myProps}>
		        <FormItem label="任务名称" {...formItemLayout}>
			        {getFieldDecorator("task", {
				        initialValue: task
			        })(
				        <Input placeholder="任务名称"/>
			        )}
		        </FormItem>
		        <FormItem label="创建时间" {...formItemLayout}>
			        {getFieldDecorator("time", {
				        initialValue: time
			        })(
				        <RangePicker
					        showTime={{format: 'HH:mm'}}
					        format="YYYY-MM-DD HH:mm"
					        placeholder={['开始时间', '结束时间']}
				        />
			        )}
		        </FormItem>
	        </SearchTable>
        )
    }
}
export default Form.create()(VideoSearch);