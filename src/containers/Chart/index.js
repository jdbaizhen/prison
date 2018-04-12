import React from 'react';
import {Layout, Modal} from 'antd';
import {connect} from 'react-redux';
import Title from "../../components/Title/index";
import ChartTable from "./ChartTable/index";
import {ChartSearch} from './ChartSearch';
import * as action from "../../redux/actions/chart";


class Chart extends React.Component {
	getData = (obj) => {
		let {getTableData} = this.props;
		let terms = {
			treeNodes: [],
			date: undefined,
			type : '1',
			...obj
		};
		getTableData(terms).then(data => {
			if (!data.result) {
				Modal.error({
					title: '未能成功获取数据',
					content: data.err
				})
			}
		})
	};

	componentWillReceiveProps(nextProps) {
		let {treeNodes, date, type} = nextProps;
		this.getData({
			treeNodes,
			type
		});
	}

	render() {
		let {treeNodes, date, setSearchTerm, type} = this.props;
		let tableProps = {
			type: type,
			road: treeNodes,
			date: date,
			getData: this.getData,
		};
		let searchProps = {
            type: type,
			road: treeNodes,
			date: date,
			setSearchTerm,
		};
		return (
			<Layout>
				<Title tier1="数据统计"/>
				<Layout style={{backgroundColor:'#ffffff',marginTop:'10px',boxShadow:'0 0 10px rgba(0, 21, 41, 0.08)'}}>
					<ChartSearch {...searchProps}/>
					<ChartTable {...tableProps}/>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state => ({ ...state.chartTermR}),
	action
)(Chart)