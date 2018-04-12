import React from 'react';
import {connect} from 'react-redux';
import {Layout,Modal} from 'antd';

import * as action from '../../../redux/actions/video';
import Title from "../../../components/Title/index";
import VideoList from "./VideoList/index";
import VideoSearch from "./VideoSearch/index";
import MyPagination from "../../../components/MyPagination/index";


class VideoMain extends React.Component{
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
			task:undefined,
			beginTime: undefined,
			endTime: undefined,
			...obj
		};
		this.isLoading(true);
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
		let {task,beginTime, endTime,pageSize,pageIndex}=nextProps;
		this.getData({
			task,
			pageSize,
			pageIndex,
			beginTime,
			endTime
		})
	}

    render(){
	    let {loading,setTableH,count}=this.state;
	    let {task,beginTime,endTime,setSearchTerm,pageIndex,setPage}=this.props;
	    let tableProps={
		    setTableH:this.setTableH,
		    loading,
		    getData:this.getData,
		    getCount:this.getCount,
	    };
	    let searchProps={
		    task,
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
	            <Title tier1="视频解析"/>
	            <Layout className="main-body">
		            <VideoSearch {...searchProps}/>
		            <VideoList {...tableProps}/>
		            <MyPagination {...pagitionProps}/>
	            </Layout>
            </Layout>
        )
    }
}
export default connect(
	state=>({...state.videoTermR}),
	action
)(VideoMain)