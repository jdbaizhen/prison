import React from 'react';
import {Layout} from 'antd';
import {connect} from 'react-redux';
import Title from "../../components/Title/index";
import SynthesisTable from './SynthesisTable';
import * as action from '../../redux/actions/synthesis';
import IPCTree from "../IPCTree/index";

class Synthesis extends React.Component{
	componentDidMount(){
		let {location: {pathname}} = this.props;
		let pathWord=pathname.split('/');
		console.log(pathWord[2]);
		if(pathWord.length>2&&pathWord[2]){
			this.handleSetId(pathWord[2]);
		}
	}
	handleSetId=(value)=>{
		this.props.setSearchId(value);
	}
    render(){
        let {id}=this.props;
	    let ipcTreeProps={
		    showSearch:true,
		    value:id,
		    dropdownMatchSelectWidth: false,
		    placeholder: '请选择摄像头',
		    treeCheckable: false,
		    allowClear: false,
		    onChange:this.handleSetId,
		    mySelectable:[3]
	    }
	    return(
		    <Layout>
                <Title tier1='综合查询'/>
                <Layout className="synthesis-box">
	                <Layout className="ipc-tree">
		                <IPCTree {...ipcTreeProps}/>
	                </Layout>
                    <SynthesisTable/>
                </Layout>
		    </Layout>
        )
    }
}
import './index.less';
export default connect(
	state => ({id:state.synthesisTermR.id}),
	action
)(Synthesis)