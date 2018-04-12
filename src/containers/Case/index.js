import React from 'react';
import {Layout,Modal} from 'antd';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/case';
import Title from "../../components/Title/index";
import CaseList from './CaseList';
import MyPagination from "../../components/MyPagination/index";
import CaseSearch from './CaseSearch';

class Case extends React.Component{
	constructor(){
		super();
		this.state={
			loading:false,
			setTableH:()=>{},
			count:0
		}
	}
	isLoading(value){
		this.setState({loading:value})
	}
	getCount=(num)=>{
		this.setState({
			count:num
		})
	};
	setTableH=(fn)=>{
		this.setState({setTableH:fn});
	};
	getData=(obj)=>{
		let terms={
			pageIndex:1,
			pageSize:10,
			caseName:undefined,
			principal: undefined,
			beginTime: undefined,
			endTime: undefined,
			...obj
		};
		this.isLoading(true);
		this.props.getTableData(terms).then(data=>{
            if(data.result==='9999'){
				this.isLoading(false);
			}else{
				this.isLoading(false);
				Modal.error({
					title:'未能成功获取数据',
					content:data.err
				})
			}
		})
	};
	componentWillReceiveProps(nextProps){
		let {caseName,principal,beginTime, endTime,pageSize,pageIndex}=nextProps;
		this.getData({
			caseName,
			principal,
			pageSize,
			pageIndex,
			beginTime,
			endTime
		})
	}
	render(){
		let {loading,setTableH,count}=this.state;
		let {caseName,principal,beginTime,endTime,setSearchTerm,pageIndex,setPage}=this.props;
		let tableProps={
			setTableH:this.setTableH,
			loading,
			getData:this.getData,
			getCount:this.getCount,
		};
		let searchProps={
			caseName,
			principal,
			beginTime,
			endTime,
			setSearchTerm,
			setTableH
		};
		let pagitionProps={
			count,
			setPage,
			pageIndex,
			isShowSizeChanger:false
		};
		return(
			<Layout>
				<Title tier1='案件管理'/>
				<Layout className="main-body">
					<CaseSearch {...searchProps}/>
					<CaseList {...tableProps}/>
					<MyPagination {...pagitionProps}/>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state=>({...state.caseTermR}),
	action
)(Case)