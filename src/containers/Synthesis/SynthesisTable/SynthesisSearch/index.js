import React from 'react';
import {Form, DatePicker,InputNumber} from 'antd';
import SearchTable from "../../../../components/SearchTable/index";
let {RangePicker} = DatePicker;
let FormItem = Form.Item;
import {handleMoment} from '../../../../utils/util';

class SynthesisSearch extends React.Component{
	constructor() {
		super();
		this.state = {
			time: [],
			similar:undefined
		}
	}
	componentDidMount() {
		let {beginTime, endTime,similar} = this.props;
		let initBeginTime = handleMoment(beginTime);
		let initEndTime = handleMoment(endTime);
		this.setState({
			time: [initBeginTime, initEndTime],
			similar
		})
	}
	handleSearch = () => {
		let {setSearchTerm, form: {validateFields}} = this.props;
		validateFields((err, values) => {
			let {time,similar} = values;
			let beginTime = time[0]?time[0].format('YYYY-MM-DD HH:mm') + ':00':undefined;
			let endTime = time[1]?time[1].format('YYYY-MM-DD HH:mm') + ':00':undefined;
			setSearchTerm({
				beginTime,
				endTime,
				similar
			})
		})
	};
	handleReset = () => {
		this.props.form.resetFields();
		this.setState({
			time: [],
			similar:undefined
		})
	};
	handleExport = () => {
		let cameraId = this.props.id;
		let similar = '';
		let beginTime = '';
		let endTime = '';
		this.props.form.validateFields((err, values) => {
			if (values.similar) {
				similar = values.similar;
			}
			if (values.time && values.time[0]) {
				beginTime = values.time[0].format('YYYY-MM-DD HH:mm') + ':00';
			}
			if (values.time && values.time[1]) {
				endTime = values.time[1].format('YYYY-MM-DD HH:mm') + ':00';
			}
		});
		let url = '/monitor/export?';
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
		seturl('cameraId',cameraId);
		seturl('startTime',beginTime);
		seturl('endTime',endTime);
		seturl('similar',similar);
		return url;
	};
    render(){
	    let formItemLayout = {
		    colon:false,
		    style: {padding: '0 5px', marginBottom: 0}
	    };
	    let {form: {getFieldDecorator},setTableH} = this.props;
	    let {time,similar} = this.state;
	    let myProps = {
		    setTableH,
		    exportUrl:this.handleExport(),
		    searchFn: this.handleSearch,
		    handleReset: this.handleReset
	    };
        return(
            <SearchTable {...myProps}>
	            <FormItem label="相似度" colon={formItemLayout.colon} {...formItemLayout}>
		            {getFieldDecorator("similar", {
			            initialValue: similar
		            })(
			            <InputNumber
				            min={0}
				            max={1}
				            step={0.01}
				            placeholder={0.01}
			            />
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
export default Form.create()(SynthesisSearch);