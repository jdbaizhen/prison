import React, {Component} from 'react';
import {Modal, Button} from 'antd';

class MyPlayBack extends Component {
	constructor() {
		super();
		this.state = {
			visible: false,
			ip: undefined,
			port: undefined,
			channel: undefined,
			startTime: undefined,
			endTime: undefined,
			username: undefined,
			password: undefined

		}
	}

	componentDidMount() {
		let {getPlayBackFlag} = this.props;
		getPlayBackFlag(this.showModal)
	}

	showModal = ({ip, port, channel, startTime, endTime, username, password}) => {
		this.setState({
			visible: true,
			ip, port, channel, startTime, endTime, username, password
		}, this.autoPlay);
	};
	autoPlay = () => {
		let {ip, port, channel, startTime, endTime, username, password} = this.state;
		let {id}=this.props;
		window.setTimeout(function () {
			const oPlugin = {
				iWidth: 600,			// plugin width
				iHeight: 400			// plugin height
			};
			// 初始化插件参数及插入插件
			WebVideoCtrl.I_InitPlugin(oPlugin.iWidth, oPlugin.iHeight, {
				bWndFull: true //是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
			});
			WebVideoCtrl.I_InsertOBJECTPlugin(id);

			let oLiveView = {
				iProtocol: 1,			// protocol 1：http, 2:https
				szIP: ip,	            // protocol ip
				szPort: port,			// protocol port
				szUsername: username,	// device username
				szPassword: password,	// device password
				iStreamType: 1,			// stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
				iChannelID: channel,	// channel no
				bZeroChannel: false		// zero channel
			};

			// 登录设备
			WebVideoCtrl.I_Login(oLiveView.szIP, oLiveView.iProtocol, oLiveView.szPort, oLiveView.szUsername, oLiveView.szPassword, {
				success: function () {
					//回放视频
					WebVideoCtrl.I_StartPlayback(oLiveView.szIP, {
						iChannelID: oLiveView.iChannelID,
						szStartTime: startTime,
						szEndTime: endTime
					});
				}
			});
		}, 300)
	};
	handleCancel = () => {
		this.setState({
			visible: false,
			ip: undefined,
			port: undefined,
			channel: undefined,
			startTime: undefined,
			endTime: undefined,
			username: undefined,
			password: undefined
		});
		WebVideoCtrl.I_Stop();          //停止播放
		WebVideoCtrl.I_Logout(this.state.ip);    //摄像头登出
	};
	//视频操作
	pause = () => {
		WebVideoCtrl.I_Pause();
	};
	resume = () => {
		WebVideoCtrl.I_Resume();
	};
	playFast = () => {
		WebVideoCtrl.I_PlayFast();
	};
	playSlow = () => {
		WebVideoCtrl.I_PlaySlow();
	};

	render() {
		let {id} = this.props;
		return (
			<Modal
				title="视频回放"
				width='650px'
				visible={this.state.visible}
				onCancel={this.handleCancel}
				footer={[
					<Button key="pause" type="default" onClick={this.pause}>暂停</Button>,
					<Button key="resume" type="default" onClick={this.resume}>恢复</Button>,
					<Button key="playfast" type="default" onClick={this.playFast}>快放</Button>,
					<Button key="playslow" type="default" onClick={this.playSlow}>慢放</Button>,
				]}
			>
				<div id={id}/>
			</Modal>

		)
	}
}

export default MyPlayBack