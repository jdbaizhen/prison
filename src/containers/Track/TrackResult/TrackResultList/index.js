import React from 'react';
import {Layout,Modal} from 'antd';
import {connect} from 'react-redux';
import * as action from '../../../../redux/actions/trackResult';
import ResultTable from './ResultTable';
import {ResultSearch} from './ResultSearch';
import MyPagination from "../../../../components/MyPagination/index";

class TrackResultList extends React.Component{
	constructor(){
		super();
		this.state={
			loading:false,
			setTableH:()=>{},
			count:0,
		}
	}
	isLoading(value){
		this.setState({loading:value})
	};
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
			id:undefined,
			pageIndex:1,
			pageSize:10,
			startTime:undefined,
			endTime:undefined,
			smallDiscernSimilar:undefined,
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
		let {id,beginTime, endTime,pageSize,pageIndex,similarity,type}=nextProps;
		if(id===this.props.id){
			this.getData({
				id,
				type,
				smallDiscernSimilar:similarity,
				pageSize,
				pageIndex,
				startTime:beginTime,
				endTime
			})
		}
	}
    render(){
	    let {loading,setTableH,count}=this.state;
	    let {beginTime,endTime,setSearchTerm,pageIndex,setPage,similarity,id}=this.props;
	    let searchProps={
		    beginTime,
		    endTime,
            similarity,
		    setSearchTerm,
		    setTableH
	    };
	    let tableProps={
	    	id,
		    setTableH:this.setTableH,
		    loading,
		    getData:this.getData,
		    getCount:this.getCount,
	    };
	    let pagitionProps={
		    count,
		    setPage,
		    pageIndex,
		    isShowSizeChanger:false
	    };
        return(
            <Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)',padding:'0 15px'}}>
                <ResultSearch {...searchProps}/>
                <ResultTable {...tableProps}/>
                <MyPagination {...pagitionProps}/>
            </Layout>
        )
    }
}
export default connect(
	state=>({...state.trackResultTermR}),
	action
)(TrackResultList);