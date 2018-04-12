import React from 'react';
import {Icon} from 'antd';

export default class LoginWindow extends React.Component {
	constructor(){
		super();
		this.state={
			err:''
		}
	}
	handleClick=()=>{
		this.setState({
			err:''
		});
		this.props.login({
			username: this.refs.username.value,
			password: this.refs.password.value
		}).then(data=>{
			if(!data.result){
				this.setState({
					err:data.err
				})
			}
		})
	};
	handleKeyDown=(e)=>{
		if (e.keyCode==13){
			this.handleClick();
		}
	};
	render() {
		let {title} = this.props;
		return (
			<div className="loginWin animated zoomInDown">
				<p>{title}</p>
				<div className="loginForm" onKeyDown={(e)=>this.handleKeyDown(e)}>
					<div className="inputForm firstInput">
						<Icon type='user'/>
						<input type="text" id="username" name="username" placeholder="请输入用户名" ref="username"/>
					</div>
					<div className="inputForm">
						<Icon type='lock'/>
						<input type="password" id="password" name="password" placeholder="请输入密码" ref="password"/>
					</div>
					<div className="loginErr">{this.state.err}</div>
					<div className="loginBtn">
						<button onClick={this.handleClick}>登&nbsp;&nbsp;录</button>
					</div>
				</div>
			</div>
		)
	}
}
import './index.less';