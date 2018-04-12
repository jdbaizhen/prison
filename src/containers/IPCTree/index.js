import React from 'react';
import {connect} from 'react-redux';
import {TreeSelect} from 'antd';
let TreeNode = TreeSelect.TreeNode;

class IPCTree extends React.Component{
    render(){
    	let {details,  mySelectable,...rest}=this.props;
	    return(
	        <TreeSelect {...rest}>
		        <TreeNode
			        title={details.regionName}
			        key={"all"}
			        value={details.value}
			        selectable={mySelectable&& mySelectable.indexOf('all')>-1}
		        >
			        {details.all?details.all.map((item, index) => (
				        <TreeNode title={item.regionName}
				                  key={`${index}`}
				                  value={item.value}
				                  selectable={mySelectable&& mySelectable.indexOf(1)>-1}
				        >
					        {item.reginChild?item.reginChild.map((ite, ind) => (
						        <TreeNode
							        title={ite.regionName}
							        key={`${index}-${ind}`}
							        value={ite.value}
							        selectable={mySelectable&& mySelectable.indexOf(2)>-1}
						        >
							        {ite.cameraInfo?ite.cameraInfo.map((i,n)=>(
								        <TreeNode
									        title={i.cameraName}
									        key={`${index}-${ind}-${n}`}
									        value={i.value}
									        selectable={mySelectable&& mySelectable.indexOf(3)>-1}
								        />
							        )):null}
						        </TreeNode>
					        )):null}
				        </TreeNode>
			        )):null}
		        </TreeNode>
	        </TreeSelect>
        )
    }
}
export default connect(
	state => ({...state.monitorTableR})
)(IPCTree)