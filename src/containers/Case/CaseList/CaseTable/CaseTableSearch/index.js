import React from 'react';
import {Form, DatePicker} from 'antd';
let {RangePicker} = DatePicker;
let FormItem = Form.Item;
import {handleMoment} from '../../../../../utils/util';
import SearchTable from "../../../../../components/SearchTable/index";

class CaseTableSearch extends React.Component{
	componentDidMount() {
		let {getResetForm,form:{resetFields}}=this.props;
		getResetForm(resetFields)
	}
	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {time} = values;
			let beginTime = time&&time[0]?time[0].format('YYYY-MM-DD HH:mm') + ':00':undefined;
			let endTime = time&&time[1]?time[1].format('YYYY-MM-DD HH:mm') + ':00':undefined;
			setSearchTerm({
				beginTime,
				endTime
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
	};
    render(){
	    let formItemLayout = {
		    colon:false,
		    style: {padding: '0 5px', marginBottom: 0}
	    };
	    let {form: {getFieldDecorator},setTableH} = this.props;
	    let myProps = {
		    setTableH,
		    searchFn: this.handleSearch,
		    handleReset: this.handleReset
	    };
        return(
	        <SearchTable {...myProps}>
		        <FormItem label="发生时间" {...formItemLayout}>
			        {getFieldDecorator("time", {
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
export default Form.create()(CaseTableSearch);