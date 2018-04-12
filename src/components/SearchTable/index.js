import React from 'react';
import {Button, Icon, Form} from 'antd';
import config from '../../config/index';

let FormItem = Form.Item;

export default class SearchTable extends React.Component {
	constructor() {
		super();
		this.state = {
			isShow: false,
			showChildren: 3,
		}
	}

	isShowMore = () => {
		let {isShow} = this.state;
		let num1 = 3;
		if (!isShow) {
			num1 = this.props.children.length
		}
		this.setState({
			isShow: !isShow,
			showChildren: num1,
		});
		setTimeout(this.props.setTableH, 0)
	};

	render() {
		let {showChildren, isShow} = this.state;
		let {searchFn, exportUrl, handleReset} = this.props;
		return (
			<Form className='my-search-table' layout='inline'>
				{this.props.children.filter ? this.props.children.filter((child, i) => (
					i < showChildren
				)) : this.props.children}
				<FormItem style={{float: 'right'}}>

					<Button type="primary" icon="search" onClick={searchFn} style={{margin: '0 2px'}}/>
					{exportUrl ? <Button type="primary" style={{padding: '0', width: '32px', margin: '0 2px'}}><a
						href={`${config.requestPrefix}${exportUrl}`}
						style={{width: '30px', height: '30px'}}><Icon type="export"/></a></Button> : null}
					<Button onClick={handleReset} style={{margin: '0 2px'}}>重置</Button>
					{this.props.children.length > 3 ? <Button type="primary" icon={isShow ? 'up' : 'down'}
					                                          onClick={this.isShowMore}
					                                          style={{margin: '0 2px'}}/> : null}
				</FormItem>
			</Form>
		)
	}
}
import './index.less';
