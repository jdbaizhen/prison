import React from 'react';
import {connect} from 'react-redux';
import {Button, Layout,Tag} from 'antd';
import {Link} from 'react-router-dom';
import * as action from '../../../../redux/actions/track';
import MyTable from "../../../../components/MyTable/index";
import TrackForm from './TrackForm';

class TrackList extends React.Component{
	constructor(){
		super();
		this.state={
			handleAdd:()=>{},
			handleEdit:()=>{},
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
    	let traceStatusWord=["查询中","查询完毕"];
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
		    idWord:'traceId',
		    isRowSelection: true,
		    handleDelete: this.handleDelete,
		    rowSelection: {},
		    columns: [
			    {
				    title: "序号", dataIndex: "id", width: 50, key: 'id', render: (text, record) => (
				    details.indexOf(record) + 1
			    )
			    },
			    {
				    title: "目标图片", dataIndex: "targetImgBase64", width: 120, key: 'targetImgBase64',
				    render: (text, record) => (
					    <img src={text} className="list-img"/>
				    )
			    },
			    {
				    title: "查询条件", dataIndex: "targetSex", width:160, key: 'targetSex',
				    render: (text, record) =>(
					    <div style={{width:'100%'}}>
						    <Tag color="blue" style={{marginBottom: '10px'}}>性别：{record.targetSex?'女':'男'}</Tag>
						    <Tag color="blue" style={{marginBottom: '10px'}}>相似度：{record.targetSimilar}</Tag>
						    <Tag color="blue" style={{marginBottom: '10px'}}>年龄：{record.targetAge}</Tag>
						    <br/>
						    <Tag color="blue" style={{marginBottom: '10px',height: 'auto'}}>起止时间：<br/>从 {record.traceBeginTime}<br/>至 {record.traceEndTime}</Tag>
					    </div>
				    )
			    },
			    {
				    title: '创建时间', dataIndex: 'gtmCreateTime',
				    width:100, key: 'gtmCreateTime'
			    },
			    {
				    title: '当前状态', dataIndex: 'status',
				    width: 60, key: 'status',
				    render: (text, record) => (traceStatusWord[text])
			    },
			    {
				    title: "追查结果", dataIndex: "see", width: 50, key: 'see',
				    render: (text, record) => (
					    <Link to={`/track/trackResult/${record.traceId}/list`}><Button type="primary" ghost icon="eye-o"/></Link>
				    )
			    },
			    {
				    title: "编辑", dataIndex: "edit", width: 50, key: 'edit',
				    render: (text, record) => (
					    <Button type="primary" ghost icon="edit"
					            onClick={() => handleEdit(record.traceId,true)}/>
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
			    <TrackForm {...formProps}/>
		    </Layout>
        )
    }
}

export default connect(
	state => ({...state.trackTableR}),
	action
)(TrackList)