import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as action from '@/redux/actions/role';
import {Button, Layout } from 'antd';
import MyTable from "@/components/MyTable";
import RoleForm from './RoleForm/index'

class RoleList extends Component{
    constructor(){
        super()
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

    handleDelete = (delIds) => {
        let { delRoleTable } = this.props;
        return delRoleTable({id : delIds})
    };

    render() {
        let {details, loading, setTableH, getCount, count} = this.props;
        let {handleAdd, handleEdit, handleSee}=this.state;
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
            columns: [
                {
                    title: "序号", dataIndex: "id", width:'40%' , key: 'id', render: (text, record) => (
                    details.indexOf(record)+1
                )
                },
                {
                    title: "角色名", dataIndex: "name", key: 'name',width: '50%',
                },
                {
                    title: "修改", dataIndex: "edit", key: 'edit', width : '10%',
                    render: (text, record) => (
                        <Button type="primary" ghost icon="edit"  onClick={() => handleEdit(record.id)}/>
                    )
                }
            ]
        };

        let formProps = {
            getAdd: this.getAdd,
            getEdit: this.getEdit,
            getSee: this.getSee
        };

        return (
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
                <RoleForm {...formProps}/>
            </Layout>
         )
    }
}

export default connect(
    state => ({...state.roleTableR}),
    action
)(RoleList)