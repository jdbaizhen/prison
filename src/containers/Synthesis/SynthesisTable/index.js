import React from 'react';
import {Layout,Modal} from 'antd';
import {connect} from 'react-redux';
import * as action from '../../../redux/actions/synthesis';
import MyPagination from "../../../components/MyPagination/index";
import SynthesisList from "./SynthesisList/index";
import SynthesisSearch from "./SynthesisSearch/index";

class SynthesisTable extends React.Component{
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
			cameraId:undefined,
			pageIndex:1,
			pageSize:10,
			similar:undefined,
			startTime:undefined,
			endTime:undefined,
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
	componentDidMount(){
		let {flag,id}=this.props;
		if(flag&&id){
			this.getData({
				cameraId:id
			})
		}
	}

	componentWillReceiveProps(nextProps){
		let {id,beginTime, endTime,pageSize,pageIndex,flag,similar}=nextProps;
		if(flag===this.props.flag){
			this.getData({
				cameraId:id,
				pageSize,
				pageIndex,
				startTime:beginTime,
				endTime,
				similar
			})
		}
	}
    render(){
	    let {loading,setTableH,count}=this.state;
	    let {beginTime,endTime,setSearchTerm,pageIndex,setPage,id}=this.props;
	    let tableProps={
		    setTableH:this.setTableH,
		    loading,
		    getCount:this.getCount,
	    };
	    let searchProps={
	    	id,
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
            <Layout className="main-body">
                <div style={{paddingLeft:'200px',backgroundColor:'#fff'}}>
                    <SynthesisSearch {...searchProps}/>
                </div>
                <SynthesisList {...tableProps}/>
                <MyPagination {...pagitionProps}/>
            </Layout>
        )
    }
}

export default connect(
	state=>({...state.synthesisTermR}),
	action
)(SynthesisTable);