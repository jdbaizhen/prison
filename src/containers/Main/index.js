import React from 'react';
import {Layout, Icon} from 'antd';

let {Header, Footer, Sider} = Layout;
import NavDark from "./NavDark/index";
import Logout from './Logout';
import logo from '../../common/images/logo.png';

export default class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			collapsed: false,
		}
	}

	onCollapse = (collapsed) => {
		this.setState({collapsed});
	};

	render() {
		let {collapsed} = this.state;
		return (
			<Layout style={{height: '100vh'}}>
				<Sider
					id="main-nav"
					collapsed={collapsed}
					collapsible={true}
					onCollapse={this.onCollapse}
					width={180}
					breakpoint="md"
				>

					<Header className="logoHeader">
						<img src={logo} alt="" className="logo"/>
						<div style={{display: collapsed ? 'none' : 'inline-block'}}>江苏省<br/>无锡监狱</div>
					</Header>
					<NavDark inlineCollapsed={collapsed}/>
				</Sider>
				<Layout id="main">
					<Header id="titleHeader">
	视  频  图  像  智  能  解  析  系  统
						<Logout/>
					</Header>
					{this.props.children}
					<Footer id="titleFooter">Copyright
						<Icon type="copyright"/> 丰华联合科技有限公司 Inc. 2017
					</Footer>
				</Layout>
			</Layout>
		)
	}
}
import './index.less'

