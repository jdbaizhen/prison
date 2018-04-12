import React from 'react';
import {connect} from 'react-redux';
import {Button, Layout,Tag} from 'antd';
import {Link} from 'react-router-dom';

import * as action from '../../../../redux/actions/video';
import MyTable from "../../../../components/MyTable/index";
import VideoForm from "./VideoForm/index";

class VideoList extends React.Component{
	constructor(){
		super();
		this.state={
			handleAdd:()=>{},
			handleEdit:()=>{}
		}
	}
	componentDidMount() {
		let {details, getData} = this.props;
		if (!details.length) {
			getData();
		}
	}
	getAdd = (callback) => {
		this.setState({
			handleAdd:callback
		});
	};
	getEdit = (callback) => {
		this.setState({
			handleEdit:callback
		});
	};
	handleDelete = (delIds) => {
		return this.props.delTableData(delIds)
	};
    render(){
	    let stateWord=["等待解析","解析完成","解析异常"];
	    let {details, loading, setTableH, getCount, count} = this.props;
	    let {handleAdd, handleEdit}=this.state;
	    getCount(count);
	    let myTableProps = {
		    count: details.length,
		    allCount: count,
		    data: details,
		    loading,
		    setTableH,
		    heightLess: 60,
		    isRowSelection: true,
		    handleDelete: this.handleDelete,
		    rowSelection: {},
		    columns: [
			    {
				    title: "序号", dataIndex: "id", width: 50, key: 'id', render: (text, record) => (
				    details.indexOf(record)+1
			    )
			    },
			    {
				    title: '任务名称', dataIndex: 'taskName',
				    width:100, key: 'taskName'
			    },
			    {
				    title: '相似度', dataIndex: 'similarity',
				    width:100, key: 'similarity'
			    },
			    {
				    title: '创建时间', dataIndex: 'createTime',
				    width:100, key: 'createTime'
			    },
			    {
				    title: '状态更新时间', dataIndex: 'updateTime',
				    width: 100, key: 'updateTime'
			    },
			    {
				    title: '状态', dataIndex: 'status',
				    width: 60, key: 'status',
				    render: (text, record) => (stateWord[text])
			    },
			    {
				    title: "解析结果", dataIndex: "see", width: 50, key: 'see',
				    render: (text, record) => (
					    <Link to={`/video/videoResult/${record.id}`}><Button type="primary" ghost icon="eye-o"/></Link>
				    )
			    },
			    {
				    title: "编辑", dataIndex: "edit", width: 50, key: 'edit',
				    render: (text, record) => (
					    <Button type="primary" ghost icon="edit"
					            onClick={() => handleEdit(record.id,true)}/>
				    )
			    }
		    ]
	    };
	    let formProps = {
		    getAdd: this.getAdd,
		    getEdit: this.getEdit
	    };
        return(
	        <Layout>
		        <MyTable {...myTableProps}>
			        <Button icon="file-add"
			                size="small"
			                type="primary"
			                style={{marginLeft: '15px'}}
			                onClick={handleAdd}
			        >
				        新建
			        </Button>
		        </MyTable>
		        <VideoForm {...formProps}/>
	        </Layout>
        )
    }
}
export default connect(
	state=>({...state.videoTableR}),
	action
)(VideoList)