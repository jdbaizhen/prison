import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as action from '@/redux/actions/register';
import {Button, Layout} from 'antd';
import MyTable from "@/components/MyTable";
import RegisterPhoto from './RegisterForm/RegisterPhoto/index'
import RegisterForm from './RegisterForm/index'

class RegisterList extends Component{
    constructor(){
        super()
        this.state={
            handleSeeInfo:()=>{},
            handleSeeCamera:()=>{},
        }
    }

    getSeeInfo = (callback) => {
        this.setState({
            handleSeeInfo:callback
        });
    };
    getSeeCamera = (callback) => {
        this.setState({
            handleSeeCamera:callback
        });
    };

    tableChange = (pagination, filters, sorter) => {
        let {setRegisterSortTerm} = this.props;
        console.log('Various parameters', pagination, filters, sorter);
        if(sorter.order==='ascend'){
            sorter.field==='personName'? setRegisterSortTerm({flag:"person_name",sort:'asc'}):setRegisterSortTerm({flag:"update_time",sort:'asc'});
        }else if(sorter.order==='descend'){
            sorter.field==='personName'? setRegisterSortTerm({flag:"person_name",sort:'desc'}):setRegisterSortTerm({flag:"update_time",sort:'desc'});
        }
    }

    render() {
        let {loading, setTableH, getCount, count,details} = this.props;
        let {handleSeeInfo, handleSeeCamera}=this.state;
        getCount(count);
        let myTableProps = {
            count: details.length,
            allCount: count,
            data: details,
            loading,
            setTableH,
            heightLess: 60,
            isRowSelection: true,
            handleDelete: this.handleDelete,
            rowSelection: {},
            tableChange: this.tableChange,
            columns: [
                {
                    title: "序号", width:'5%' , key: 'personId',render : (text,record) => (
                    details.indexOf(record)+1
                    )
                },
                {
                    title: "姓名", dataIndex: "personName", key: 'personName',width: '8%',
                    sorter : 'true'
                },
                {
                    title: "性别", dataIndex: "personSex", key: 'personSex',width: '8%',
                    render: (text, record) => (
                       text===0?'女':'男'
                    )
                },{
                    title: "照片", dataIndex: "photo",width: '10%',key: 'photo',
                    render: (text, record) => (
                        <img src={text} style={{width: '100px', borderRadius: '5px'}}/>
                    )
                },{
                    title: "编号", dataIndex: "personNumber", key: 'personNumber',width: '8%',
                },
                {
                    title: "监区", dataIndex: "prisonArea", key: 'prisonArea',width: '8%',
                },{
                    title: "入监时间", dataIndex: "inPrisonTime", key: 'inPrisonTime',width: '13%',
                },{
                    title: "状态", dataIndex: "status", key: 'status',width: '8%',
                    render: (text, record) => (
                        text===0?'服刑中':'已释放'
                    )
                },{
                    title: "更新时间", dataIndex: "updateTime", key: 'updateTime',width: '13%',sorter:'true'
                },{
                    title: "查看详情", dataIndex: "edit", key: 'edit', width : '8%',
                    render: (text, record) => (
                        <Button type="primary" ghost icon="eye-o" onClick={() => handleSeeInfo(record.personId)}/>
                    )
                },{
                    title: "人像采集", dataIndex: "updateInfo", key: 'updateInfo', width : '8%',
                    render: (text, record) => (
                        <Button type="primary" ghost icon="edit" onClick={() => handleSeeCamera(record.personId)}/>
                    )
                }
            ]
        };

        let cameraProps = {
            getSeeCamera: this.getSeeCamera
        };

        let fromProps = {
            getSeeInfo: this.getSeeInfo,
        }

        return (
            <Layout>
                <MyTable {...myTableProps}/>
                <RegisterPhoto {...cameraProps}/>
                <RegisterForm {...fromProps}/>
            </Layout>
        )
    }
}

export default connect(
    state => ({...state.RegisterTableR}),
    action
)(RegisterList)