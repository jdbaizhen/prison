import React from 'react';
import * as action from '../../../redux/actions/login';
import {connect} from 'react-redux';
import {Modal,Icon,Tooltip,Popconfirm} from 'antd';
class Logout extends React.Component{
	handleLogout=()=>{
		this.props.logout().then(data=>{
			if(!data.result){
				Modal.error({
					title:'退出失败',
					content:data.err
				})
			}
		})
	};
	componentDidMount(){
		// let {getCrossingData,roadData} = this.props;
		// if(!roadData.length){
		// 	getCrossingData().then(data => {
		// 			if (!data.result) {
		// 				Modal.error({
		// 					title: '未能成功获取摄像头数据',
		// 					content: data.err
		// 				})
		// 			}
		// 		}
		// 	)
		// }
	}
    render(){
        return(
	        <Tooltip placement="left" title="退出">
		        <Popconfirm placement="left" title="是否退出" okText="退出" onConfirm={this.handleLogout}>
	        <Icon type="logout" id="logout"/>
		        </Popconfirm>
	        </Tooltip>
        )
    }
}
import './index.less'
export default connect(
	state=>({}),
	{...action}
)(Logout)
