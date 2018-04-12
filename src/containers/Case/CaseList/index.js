import React from 'react';
import {connect} from 'react-redux';
import {Button, Layout} from 'antd';
import * as action from '../../../redux/actions/case';
import MyTable from "../../../components/MyTable/index";
import CaseForm from './CaseForm';
import CaseTable from './CaseTable'

class CaseList extends React.Component {
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

	getFlag = (callback) => {
		this.isShow = callback;
	};
	setId = (info) => {
        let {setSearchId} = this.props;
		this.isShow(true);
		if (typeof info.caseId !=='undefined') {
			setSearchId({id: info.caseId, info});
		}
	};
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

	render() {
		let {details, loading, setTableH, getCount, count} = this.props;
        let {handleAdd, handleEdit}=this.state;
		getCount(count);
		let myTableProps = {
			count: details.length,
			allCount: count,
			data: details,
			idWord: 'caseId',
			loading,
			setTableH,
			heightLess: 60,
			isRowSelection: true,
			handleDelete: this.handleDelete,
			rowSelection: {},
			columns: [
				{
					title: "序号", dataIndex: "id", width: 30, key: 'caseId', render: (text, record) => (
					details.indexOf(record)+1
				)
				},
				{
					title: "案件名称", dataIndex: "caseName", width: 70, key: 'caseName'
				},
				{
					title: "责任人", dataIndex: "principal", width: 50, key: 'principal'
				},
				{
					title: '相似度', dataIndex: 'similarity',
					width: 40, key: 'similarity'
				},
				{
					title: '生效时间', dataIndex: 'beginTime',
					width: 100, key: 'beginTime'
				},
				{
					title: '失效时间', dataIndex: 'endTime',
					width: 100, key: 'endTime'
				},
				{
					title: "告警信息", dataIndex: "warning", width: 60, key: 'warning',
					render: (text, record) => (
						<Button type="primary" ghost icon="warning"
						        onClick={() => this.setId(record)}/>
					)
				},
				{
					title: "详情", dataIndex: "see", width: 60, key: 'see',
					render: (text, record) => (
						<Button type="primary" ghost icon="eye-o"
						        onClick={() => handleEdit(record.caseId,false)}/>
					)
				},
				{
					title: "编辑", dataIndex: "edit", width: 60, key: 'edit',
					render: (text, record) => (
						<Button type="primary" ghost icon="edit"
						        onClick={() => handleEdit(record.caseId,true)}/>
					)
				},
				{
					title: "视频回放", dataIndex: "", width: 60, key: '',
					render: (text, record) => (
						<Button type="primary" ghost icon="video-camera"
						        onClick={() => {}}/>
					)
				}

			]
		};
		let formProps = {
			getAdd: this.getAdd,
			getEdit: this.getEdit
		};
		return (
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
				<CaseForm {...formProps}/>
				<CaseTable getFlag={this.getFlag}/>
			</Layout>
		)
	}
}

export default connect(
	state => ({...state.caseTableR}),
	action
)(CaseList)