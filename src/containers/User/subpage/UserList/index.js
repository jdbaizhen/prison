import React from 'react';
import {Button,Icon,Layout} from 'antd'
import {connect} from 'react-redux';
import * as action from '../../../../redux/actions/user'

import MyTable from "../../../../components/MyTable/index";
import UserForm from './UserForm/index'

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            handleAdd:()=>{},
            handleEdit:()=>{},
            handleSee:()=>{}
        }
    }

    getAdd = (callback) => {
        this.setState({
            handleAdd:callback
        });
    };
    getEdit = (callback) => {
        this.setState({
            handleEdit:callback
        });
    };
    getSee = (callback) => {
        this.setState({
            handleSee:callback
        });
    };


    handleDelete = (param) => {
        let {delUserList} = this.props;
        return delUserList({id:param});
    }

    render(){
        let {details, loading,setTableH, getCount, count} = this.props;
        let { handleEdit ,handleAdd} = this.state;
        getCount(count);
        let myTableProps = {
            count: details.length,
            allCount: count,
            data: details,
            loading,
            setTableH,
            heightLess:40,
            isRowSelection: true,
            rowSelection:{},
            handleDelete:this.handleDelete,
            columns: [
                {
                    title: "序号", dataIndex: "id", key: 'id', width:'10%', render: (text, record) => (
                    details.indexOf(record)+1
                )
                },
                {
                    title: "账户", dataIndex: "username",  key: 'username', width:'10%',
                },
                {
                    title: "姓名", dataIndex: "name", key: 'name', width:'10%',
                },
                {
                    title: '联系方式', dataIndex: 'telephone', key: 'telephone', width:'20%', textAlign :'center'
                },
                {
                    title: '创建时间', dataIndex: 'createTime',key: 'createTime', width:'20%',
                },
                {
                    title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', width:'20%',
                },
                {
                    title: "修改", dataIndex: "edit", key: 'edit', width:'10%',
                    render: (text, record) => (
                        <Button type="primary" ghost icon="edit"
                                onClick={() => handleEdit(record.id)}/>
                    )
                }
            ]
        };

        let formProps = {
            getAdd: this.getAdd,
            getEdit: this.getEdit,
            getSee: this.getSee
        };

        return(
            <Layout>
                <MyTable {...myTableProps}>
                    <Button icon="file-add"
                            size="small"
                            type="primary"
                            style={{marginLeft: '15px'}}
                            onClick={handleAdd}
                    >
                        新建
                    </Button>
                </MyTable>
                <UserForm {...formProps}/>
            </Layout>

        )
    }
}
export default connect(
    state => ({...state.userListR}),
    action
)(Index)