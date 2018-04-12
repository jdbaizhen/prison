import React from 'react';
import {Layout,Modal} from 'antd';
import Title from "../../../components/Title/index";
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/track';
import TrackSearch from './TrackSearch';
import TrackList from './TrackList';
import MyPagination from "../../../components/MyPagination/index";

class TrackMain extends React.Component{
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
			traceStatus:2,
			beginTime: undefined,
			endTime: undefined,
			...obj
		};
		this.isLoading(true);
		if(terms.traceStatus===2){
			terms.traceStatus=undefined
		}
		this.props.getTableData(terms).then(data=>{
			if(data.result){
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
		let {traceStatus,beginTime, endTime,pageSize,pageIndex}=nextProps;
		this.getData({
			traceStatus,
			pageSize,
			pageIndex,
			beginTime,
			endTime
		})
	}
	render(){
		let {loading,setTableH,count}=this.state;
		let {traceStatus,beginTime,endTime,setSearchTerm,pageIndex,setPage}=this.props;
		let tableProps={
			setTableH:this.setTableH,
			loading,
			getData:this.getData,
			getCount:this.getCount,
		};
		let searchProps={
			traceStatus,
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
				<Title tier1="追查行踪"/>
				<Layout className="main-body">
					<TrackSearch {...searchProps}/>
					<TrackList {...tableProps}/>
					<MyPagination {...pagitionProps}/>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state=>({...state.trackTermR}),
	action
)(TrackMain)