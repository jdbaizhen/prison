import React from 'react';
import {Form, DatePicker,Input} from 'antd';
let {RangePicker} = DatePicker;
let FormItem = Form.Item;
import {handleMoment} from '../../../utils/util';
import SearchTable from "../../../components/SearchTable/index";

class CaseSearch extends React.Component{
	constructor() {
		super();
		this.state = {
			caseName:undefined,
			principal:undefined,
			time: [],
		}
	}
	componentDidMount() {
		let {caseName,principal,beginTime, endTime} = this.props;
		let initBeginTime = handleMoment(beginTime);
		let initEndTime = handleMoment(endTime);
		this.setState({
			caseName,
			principal,
			time: [initBeginTime, initEndTime]
		})
	}
	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {caseName,principal,time} = values;
			let beginTime = time[0]?time[0].format('YYYY-MM-DD HH:mm') + ':00':undefined;
			let endTime = time[1]?time[1].format('YYYY-MM-DD HH:mm') + ':00':undefined;
			setSearchTerm({
				caseName,
				principal,
				beginTime,
				endTime
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			caseName:undefined,
			principal:undefined,
			time: [],
		})
	};
	handleExport = () => {
		let name = '';
		let principal = '';
		let beginTime = '';
		let endTime = '';
		this.props.form.validateFields((err, values) => {
			if (values.caseName) {
				name = values.caseName;
			}
			if (values.principal) {
				principal = values.principal;
			}
			if (values.time && values.time[0]) {
				beginTime = values.time[0].format('YYYY-MM-DD HH:mm') + ':00';
			}
			if (values.time && values.time[1]) {
				endTime = values.time[1].format('YYYY-MM-DD HH:mm') + ':00';
			}
		});
		let url = '/case/export?';
		let flag = false;
		function seturl (key,value){
			if(value){
				if(flag){
					url+='&';
				}
				url+=key+'='+value;
				flag=true
			}
		}
		seturl('name',name);
		seturl('beginTime',beginTime);
		seturl('endTime',endTime);
		seturl('principal',principal);
		return url;
	};
    render(){
	    let formItemLayout = {
		    colon:false,
		    style: {padding: '0 5px', marginBottom: 0}
	    };
	    let {form: {getFieldDecorator},setTableH} = this.props;
	    let {caseName,principal,time} = this.state;
	    let myProps = {
		    setTableH,
		    exportUrl: this.handleExport(),
		    searchFn: this.handleSearch,
		    handleReset: this.handleReset
	    };
        return(
	        <SearchTable {...myProps}>
		        <FormItem label="案件名称" {...formItemLayout}>
			        {getFieldDecorator("caseName", {
				        initialValue: caseName
			        })(
				        <Input placeholder="案件名称" style={{width: '100%'}}/>
			        )}
		        </FormItem>
		        <FormItem label="责任人" {...formItemLayout}>
			        {getFieldDecorator("principal", {
				        initialValue: principal
			        })(
				        <Input placeholder="如张三" style={{width: '100%'}}/>
			        )}
		        </FormItem>
		        <FormItem label="识别时间" {...formItemLayout}>
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
export default Form.create()(CaseSearch);