import React from 'react';
import {connect} from 'react-redux';
import * as action from '@/redux/actions/role'
import {Layout, Modal} from 'antd';

let {Header, Content} = Layout;

import Title from "@/components/Title";
import RoleSearch from './subpage/RoleSearch'
import RoleList from "@/containers/Role/subpage/RoleList";
import MyPagination from "@/components/MyPagination";


class Role extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            setTableH: () => {
            },
            count: 0
        }
    }

    isLoading(value) {
        this.setState({loading: value})
    }

    getCount = (num) => {
        this.setState({
            count: num
        })
    };

    setTableH = (fn) => {
        this.setState({setTableH: fn});
    };

    getTable = (obj) => {
        let {getGroupTable} = this.props;
        let terms = {
            name: undefined,
            pageIndex: 1,
            pageSize: 10,
            ...obj
        }
        getGroupTable(terms)
    }

    componentDidMount() {
        this.getTable();
    }

    componentWillReceiveProps(newProps) {
        let {name, pageIndex, pageSize} = newProps;
        this.getTable({
            name,
            pageIndex,
            pageSize
        })
    }

    render() {
        let {name, pageIndex, pageSize, setRoleSearchTerm, setPage} = this.props;
        let {loading, count} = this.state;
        let searchProps = {
            name,
            pageIndex,
            pageSize,
            setRoleSearchTerm
        }
        let tableProps = {
            setTableH: this.setTableH,
            loading,
            getData: this.getData,
            getCount: this.getCount,
        };
        let pagitionProps = {
            count,
            setPage,
            pageIndex,
            isShowSizeChanger: false
        };
        return (
            <Layout style={{position: 'relative', top: '0', right: '0'}}>
                <Title tier1='角色管理'/>
                <Layout style={{
                    backgroundColor: '#ffffff',
                    marginTop: '10px',
                    boxShadow: '0 0 10px rgba(0, 21, 41, 0.08)'
                }}>
                    <RoleSearch {...searchProps}/>
                    <RoleList {...tableProps}/>
                    <MyPagination {...pagitionProps}/>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({...state.roleSearchTermR}),
    action
)(Role)