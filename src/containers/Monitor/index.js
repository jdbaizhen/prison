import React from 'react';
import {connect} from 'react-redux';
import {Layout, Modal} from 'antd';


import * as action from '../../redux/actions/monitor';
import MonitorMap from './MonitorMap';
import MonitorIPCForm from './MonitorIPCForm';
import Title from "../../components/Title/index";


class Monitor extends React.Component {
	constructor(){
		super();
		this.state={
			handleAdd:()=>{},
			handleEdit:()=>{}
		}
	}
	componentWillReceiveProps() {
		this.props.getTableData().then(data => {
			if (!data.result) {
				Modal.error({
					title: '未能成功获取数据',
					content: data.err
				})
			}
		})
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

	render() {
		let {delTableData}=this.props;
		let formProps = {
			getAdd: this.getAdd,
			getEdit: this.getEdit
		};
		let tableProps={...this.state,handleDelete:delTableData};
		return (
			<Layout>
				<Title tier1='实时监控'/>
				<Layout className="main-body" style={{padding:'0'}}>
					<MonitorMap {...tableProps}/>
					<MonitorIPCForm {...formProps}/>
				</Layout>
			</Layout>
		)
	}
}

export default connect(
	state => ({...state.monitorTermR}),
	action
)(Monitor)