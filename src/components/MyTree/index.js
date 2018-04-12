import React from 'react';
import {Tree} from 'antd';

let TreeNode = Tree.TreeNode;

export default class MyTree extends React.Component {
	constructor(){
		super();
		this.state={
			flag:false,
		}
	}
	handleHeight=(expandedKeys, {expanded, node})=>{
		if(node.props.eventKey==='lane'){
			this.setState({
				flag:expanded
			})
		}
	};
	handleSelect = (selectedKeys) => {
		let {callback} = this.props;
		callback(selectedKeys);
	};
	render() {
		let {data, treeNum, myStyle,title,defaultSelectedKeys} = this.props;
		let defaultExpandedKeys=[];
		if(defaultSelectedKeys.length>0){
			defaultExpandedKeys = [defaultSelectedKeys[0].slice(0,1)];
			for (let i = 1; i < treeNum; i++) {
				let defaultActiveKey= defaultSelectedKeys[0].slice(0,i*2+1);
				defaultExpandedKeys.push(defaultActiveKey)
			}
		}
		let {flag}=this.state;
		return (
			<div style={{
				backgroundColor: '#ffffff',
				padding: '0 6px',
				border: '1px solid rgb(24,144,255)',
				boxShadow: '0 0 10px rgba(0, 21, 41, 0.08)',
				...myStyle,
				height:flag?'90%':'auto',
				overflow:flag?'auto':undefined,
			}}>
				<Tree
					showLine
					onSelect={this.handleSelect}
					defaultSelectedKeys={defaultSelectedKeys}
					autoExpandParent={false}
					defaultExpandedKeys={defaultExpandedKeys}
					onExpand={this.handleHeight}
				>
					<TreeNode title={title} selectable={1 > treeNum} key="lane">
						{1 > treeNum ? null :
							data.map((item, index) => (
								<TreeNode title={item.road} key={index} selectable={2 > treeNum}>
									{2 > treeNum ? null :
										item.crossings.map((ite, inde) => (
											<TreeNode title={ite.name} key={`${index}-${inde}`}
											          selectable={3 > treeNum}>
												{3 > treeNum ? null :
													ite.lane.map((it, ind) => (
														<TreeNode title={`第${ind + 1}车道`}
														          key={`${index}-${inde}-${ind}`}
														          />
													))}
											</TreeNode>
										))}
								</TreeNode>
							))}
					</TreeNode>
				</Tree>
			</div>
		)
	}
}