import React from 'react';
import {connect} from 'react-redux';
import {Layout,Button,Modal} from 'antd';
import * as action from '../../../../redux/actions/synthesis';
import {getPlayA} from '../../../../api/synthesis';
import MyTable from "../../../../components/MyTable/index";
import MyPlayBack from "../../../../components/MyPlayBack/index";

class SynthesisList extends React.Component{
	getPlayBackFlag=(fn)=>{
		this.getPlay=fn;
	};
	myPlayBack=(id)=>{
		console.log(id);
		getPlayA({id}).then(data=>{
			data.result=data.errCode==9999;
			data.message=data.errMsg;
			if (data.result) {
				let tableData= JSON.parse(data.data);
				console.log(tableData);
				this.getPlay(tableData)
			} else {
				Modal.error({
					title: '未能成功获取数据',
					content: data.err
				})
			}
		})
	};
    render(){
	    let {details, loading, setTableH, getCount, count} = this.props;
	    getCount(count);
	    let myTableProps = {
		    count: details.length,
		    allCount: count,
		    data: details,
		    loading,
		    setTableH,
		    heightLess: 60,
		    isRowSelection: false,
		    columns: [
			    {
				    title: "序号", dataIndex: "id", width: 30, key: 'id', render: (text, record) => (
				    details.indexOf(record)+1
			    )
			    },
			    {
				    title: "视频人脸", dataIndex: "generalDiscernImg", key: 'generalDiscernImg',width: 120,
				    render: (text, record) => (
                        <img src={text} className="list-img"/>
				    )
			    },
			    {
				    title: "匹配图片", dataIndex: "matchImg",key: 'matchImg',width: 120,
				    render: (text, record) => (
                        <img src={text} className="list-img"/>
				    )
			    },
			    {
				    title: '相似度', dataIndex: 'similar',
				    width: 40, key: 'similar'
			    },
			    {
				    title: '时间', dataIndex: 'generalDiscernTime',
				    width: 100, key: 'generalDiscernTime'
			    },
			    {
				    title: '地点', dataIndex: 'discernSite',
				    width: 100, key: 'discernSite'
			    },
			    {
				    title: "视频回放", dataIndex: "", width: 60, key: '',
				    render: (text, record) => (
                        <Button type="primary" ghost icon="video-camera"
                                onClick={() => this.myPlayBack(record.generalDiscernId)}/>
				    )
			    }

		    ]
	    };
        return(
            <Layout>
                <MyTable {...myTableProps}/>
	            <MyPlayBack id="synthesisPlayBack" getPlayBackFlag={this.getPlayBackFlag}/>
            </Layout>
        )
    }
}
export default connect(
	state => ({...state.synthesisTableR,id:state.synthesisTermR.id}),
	action
)(SynthesisList)