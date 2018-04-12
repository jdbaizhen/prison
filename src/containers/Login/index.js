import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../redux/actions/login';
import LoginWindow from "../../components/LoginWindow/index";
import '../../common/images/dl.png';

class Login extends React.Component {
	render() {
		let props = {
			title: <span>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</span>,
			login: this.props.login,
		};
		return (
			<div className="login full-screen">
				<LoginWindow {...props}/>
			</div>
		)
	}
}
import './index.less'
export default connect(
	state=>({}),
	action
)(Login)