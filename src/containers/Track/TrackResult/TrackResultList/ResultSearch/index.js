import React from 'react';
import {Form, DatePicker, InputNumber} from 'antd';
let {RangePicker} = DatePicker;
let FormItem = Form.Item;
import {handleMoment} from '../../../../../utils/util';
import SearchTable from "../../../../../components/SearchTable/index";

class ResultSearchC extends React.Component{
	constructor() {
		super();
		this.state = {
			similarity: undefined,
			time: [],
		}
	}
	componentDidMount() {
		let {similarity, beginTime, endTime} = this.props;
		let initBeginTime = handleMoment(beginTime);
		let initEndTime = handleMoment(endTime);
		this.setState({
			similarity,
			time: [initBeginTime, initEndTime]
		})
	}
	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {similarity, time} = values;
			let beginTime = time[0] ? time[0].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
			let endTime = time[1] ? time[1].format('YYYY-MM-DD HH:mm') + ':00' : undefined;
			setSearchTerm({
				similarity,
				beginTime,
				endTime
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			similarity: undefined,
			time: [],
		})
	};

    render(){
	    let formItemLayout = {
		    colon: false,
		    style: {padding: '0 5px', marginBottom: 0}
	    };
	    let {form: {getFieldDecorator}, setTableH} = this.props;
	    let {similarity, time} = this.state;
	    let myProps = {
		    setTableH,
		    searchFn: this.handleSearch,
		    handleReset: this.handleReset
	    };
        return(
	        <SearchTable {...myProps}>
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
		        <FormItem label="最低相似度" {...formItemLayout}>
			        {getFieldDecorator("similarity", {
				        initialValue: similarity
			        })(
				        <InputNumber
					        min={0}
					        max={1}
					        step={0.01}
					        placeholder={0.01}
				        />
			        )}
		        </FormItem>
	        </SearchTable>
        )
    }
}
export const ResultSearch= Form.create()(ResultSearchC)