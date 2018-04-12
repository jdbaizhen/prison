import React from 'react';
import {Layout,Button,Modal} from 'antd';
import {connect} from 'react-redux';
import {getPlayA} from '../../../../../api/trackResult';
import * as action from '../../../../../redux/actions/trackResult';
import MyTable from "../../../../../components/MyTable/index";
import MyPlayBack from "../../../../../components/MyPlayBack/index";

class ResultTable extends React.Component {
	handleDelete = (delIds) => {
		let {id, delTableData} = this.props;
		return delTableData(id, delIds)
	};
	getPlayBackFlag=(fn)=>{
		this.getPlay=fn;
	};
	myPlayBack=(id)=>{
		console.log(id);
		getPlayA({id}).then(data=>{
			data.result=data.errCode==9999;
			data.message=data.errMsg;
			if (data.result) {
				let tableData= JSON.parse(data.data);
				console.log(tableData);
				this.getPlay(tableData)
			} else {
				Modal.error({
					title: '未能成功获取数据',
					content: data.err
				})
			}
		})
	};
	render() {
		let {details, loading, setTableH, getCount, count} = this.props;
		getCount(count);
		let myTableProps = {
			count: details.length,
			allCount: count,
			data: details,
			loading,
			setTableH,
			heightLess: 40,
			isRowSelection: true,
			handleDelete: this.handleDelete,
			idWord:"traceDiscernId",
			rowSelection: {},
			columns: [
				{
					title: "序号",
					dataIndex: "traceDiscernId",
					width: 30,
					key: 'traceDiscernId',
					render: (text, record) => (
						details.indexOf(record) + 1
					)
				},
				{
					title: "匹配头像", dataIndex: "traceDiscernImg", width: 120, key: 'traceDiscernImg',
					render: (text, record) => (
						<img src={text} className="list-img"/>
					)
				},
				{
					title: '相似度', dataIndex: 'discernSimilar',
					width: 100, key: 'discernSimilar'
				},
				{
					title: '地点', dataIndex: 'site',
					width: 100, key: 'site'
				},
				{
					title: '时间', dataIndex: 'caseDiscernTime',
					width: 100, key: 'caseDiscernTime'
				},
				{
					title: "视频回放", dataIndex: "", width: 60, key: '',
					render: (text, record) => (
						<Button type="primary" ghost icon="video-camera"
						        onClick={() => this.myPlayBack(record.traceDiscernId)}/>
					)
				}

			]
		};
		return (
			<Layout>
			<MyTable {...myTableProps}/>
				<MyPlayBack id="trackResultPlayBack" getPlayBackFlag={this.getPlayBackFlag}/>
			</Layout>
		)
	}
}

export default connect(
	state => ({...state.trackResultTableR}),
	action
)(ResultTable)