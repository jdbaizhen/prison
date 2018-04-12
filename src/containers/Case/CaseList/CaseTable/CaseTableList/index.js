import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../../../../redux/actions/caseTable';
import MyTable from "../../../../../components/MyTable/index";

class CaseTableList extends React.Component {
	render() {
		let {details, loading, getCount, count} = this.props;
        getCount(count);
        let myTableProps = {
			count: details.listData.length,
			allCount: count,
			data: details.listData,
			loading,
			heightLess: 40,
			isRowSelection: false,
			rowSelection: null,
			columns: [
				{
					title: "序号", dataIndex: "id", width: 30, key: 'id', render: (text, record) => (
					details.listData.indexOf(record)+1
				)
				},
				{
					title: "目标人物", dataIndex: "targetImg", width: 115, key: 'target',
					render: (text, record) => {
						return (
							<img src={text} className="list-img"/>
						)
					}
				},
				{
					title: "视频头像", dataIndex: "videoImg", width: 115, key: 'img',
					render: (text, record) => (
						<img src={text} className="list-img"/>
					)
				},
				{
					title: '相似度', dataIndex: 'similar',
					width: 60, key: 'similarity'
				},
				{
					title: '名称', dataIndex: 'site',
					width: 100, key: 'site'
				},
				/*{
					title: '摄像头编号', dataIndex: '',
					width: 100, key: ''
				},*/
				{
					title: '发生时间', dataIndex: 'caseDiscernTime',
					width: 100, key: 'caseDiscernTime'
				}

			]
		};
		return (
			<MyTable {...myTableProps}/>
		)
	}
}

export default connect(
	state => ({...state.caseTableTableR}),
	action
)(CaseTableList)