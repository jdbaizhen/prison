import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon, Modal} from 'antd';
import {connect} from 'react-redux';
import {getSession} from '../../../utils/util';
import * as action from '../../../redux/actions/monitor';
import navItems from './navProps';

let SubMenu = Menu.SubMenu;

class NavDark extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedKeys: undefined,
			openKeys: undefined,
			navItems: []
		}
	}

	handleKey = (pathname) => {
		let key = pathname.split('/')[1];
		let openKeys = '';
		if (key === 'user' || key === 'role' || key === 'log') {
			openKeys = '/system';
		}
		this.setState({
			selectedKeys: '/' + key,
			openKeys
		});
		let {details, getTableData,clearTableData} = this.props;
		if (getSession('username')) {
			if (this.state.navItems.length === 0) {
				let ary = navItems.filter(item => {
					if (item.link) {
						item.link = item.link.filter(ite => getSession(ite.router.slice(1)));
						if (item.link.length > 0) {
							return true
						} else {
							return false
						}
					} else {
						return getSession(item.router.slice(1))
					}
				})
				this.setState({
					navItems: ary
				})
			}
			if (!details.length) {
				getTableData().then(data => {
						if (!data.result) {
							Modal.error({
								title: '未能成功获取摄像头数据',
								content: data.err
							})
						}
					}
				)
			}
		} else {
			if (this.state.navItems.length !== 0) {
				this.setState({
					navItems: []
				})
			}
			if(details.length){
				clearTableData();
			}
		}
	};

	componentDidMount() {
		let {pathname, details, getTableData} = this.props;
		this.handleKey(pathname);
		if (!details.length) {
			getTableData().then(data => {
					if (!data.result) {
						Modal.error({
							title: '未能成功获取摄像头数据',
							content: data.err
						})
					}
				}
			)
		}
	}

componentWillReceiveProps(newprops)
{
	let {pathname} = newprops;
	if (pathname !== this.props.pathname) {
		this.handleKey(pathname);
	}
}
render()
{
	let {openKeys, selectedKeys, navItems} = this.state;
	let {inlineCollapsed} = this.props;
	return (
		<Menu
			defaultOpenKeys={[openKeys, selectedKeys]}
			defaultSelectedKeys={[navItems[0] ? navItems[0].router : null]}
			selectedKeys={[selectedKeys]}
			mode='inline'
			theme='dark'
			inlineCollapsed={inlineCollapsed}
			style={{Height: '100%'}}
		>
			{navItems.map((item) => {
				if (item.link) {
					return (
						<SubMenu key={item.router}
						         title={<span><Icon type={item.icon}/><span>{item.header}</span></span>}>
							{item.link.map((ite, ind) => (
								<Menu.Item key={ite.router}>
									<Link to={ite.router}>
										<Icon type={ite.icon}/>
										<span>{ite.header}</span>
									</Link>
								</Menu.Item>
							))}
						</SubMenu>
					)
				} else {
					return (
						<Menu.Item key={item.router}>
							<Link to={item.router}>
								<Icon type={item.icon}/>
								<span>{item.header}</span>
							</Link>
						</Menu.Item>
					)
				}
			})}
		</Menu>
	)
}
}
export default connect(
	state => ({pathname: state.router.location.pathname, ...state.monitorTableR}),
	action
)(NavDark)