import React from 'react';
import {connect} from 'react-redux';
import {Modal,Layout,Card,Tag,List} from 'antd';
let Sider=Layout.Sider;
import * as action from '../../../../redux/actions/caseTable';
import MyPagination from "../../../../components/MyPagination/index";
import CaseTableSearch from './CaseTableSearch';
import CaseTableList from './CaseTableList';

class CaseTable extends React.Component{
	constructor(){
		super();
		this.state={
			loading:false,
			count:0,
			flag:false
		}
	}
	handleShow=(value)=>{
		this.setState({
			flag:value
		});
	};

	isLoading(value){
		this.setState({loading:value})
	}
	getCount=(num)=>{
		this.setState({
			count:num
		})
	};
	getData=(obj)=>{
		let terms={
			caseId:undefined,
			pageIndex:1,
			pageSize:10,
			beginTime:undefined,
			endTime:undefined,
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
	componentDidMount(){
		let {getFlag}=this.props;
		getFlag(this.handleShow);
	}
	componentWillReceiveProps(nextProps){
		let {id,beginTime, endTime,pageSize,pageIndex}=nextProps;
		this.getData({
			caseId:id,
			pageSize,
			pageIndex,
			beginTime,
			endTime
		})
	}
	getResetForm=(callback)=>{
		this.resetForm=callback
	};
    render(){
	    let {loading,count,flag}=this.state;
	    let {info,beginTime,endTime,setSearchTerm,pageIndex,setPage}=this.props;
        let {caseName,principal,imgData}=info;
	    let searchProps={
		    getResetForm:this.getResetForm,
		    beginTime,
		    endTime,
		    setSearchTerm
	    };
	    let tableProps={
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
	        <Modal
		        visible={flag}
		        title={`${caseName} / 告警信息`}
		        footer={<MyPagination {...pagitionProps}/>}
		        maskClosable={false}
		        style={{top:30,bottom:30}}
		        bodyStyle={{padding:0}}
		        width={1200}
		        onCancel={()=>{
			        this.resetForm();
			        this.handleShow(false)
		        }}
	        >
		        <Layout>
			        <Sider width={230} style={{backgroundColor:'rgb(240,242,245)',padding:'10px'}}>
				        <Card title="案件信息">
					        <Tag color="blue" >案件名称：{caseName}</Tag>
					        <Tag color="blue" style={{margin:'10px 0'}}>责任人：{principal}</Tag>
					        <Tag color="blue" style={{margin:'10px 0',width:'100%',height:'auto'}}>案发时间：<br/>{info.beginTime}</Tag>
				        </Card>
				        <Card title="嫌疑人信息">
					        <List
						        itemLayout="horizontal"
						        dataSource={imgData}
						        renderItem={item => (
							        <List.Item>
								        <List.Item.Meta
									        avatar={<img src={item} style={{width:'85px',height:'85px',borderRadius:'10px'}}/>}
								        />
							        </List.Item>
						        )}
					        />
				        </Card>
			        </Sider>
			        <Layout style={{backgroundColor:'#ffffff',padding:'0 10px'}}>
				        <CaseTableSearch {...searchProps}/>
				        <CaseTableList {...tableProps}/>
			        </Layout>
		        </Layout>
	        </Modal>
        )
    }
}
export default connect(
	state=>({...state.caseTableTermR}),
	action
)(CaseTable)
