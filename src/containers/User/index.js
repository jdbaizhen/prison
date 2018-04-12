import React from 'react';
import {connect} from 'react-redux';
import {Layout, Modal} from 'antd';

let {Header, Content} = Layout;

import * as action from '../../redux/actions/user'

import Title from '../../components/Title/index'
import UserSearch from './subpage/UserSearch'
import UserList from './subpage/UserList/index'
import MyPagination from '../../components/MyPagination/index'

class User extends React.Component {
    constructor() {
        super();
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

    getData = (obj) => {
        let terms = {
            pageIndex: 1,
            pageSize: 10,
            name: undefined,
            username: undefined,
            beginTime: undefined,
            endTime: undefined,
            ...obj
        };
        this.isLoading(true);
        this.props.getUserList(terms).then(data => {
            if (data.result) {
                this.isLoading(false);
            } else {
                this.isLoading(false);
                Modal.error({
                    title: '未能成功获取数据',
                    content: data.err
                })
            }
        })
    }

    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps(newProps) {
        let {username, name, beginTime, endTime, pageSize, pageIndex} = newProps;
        this.getData({
            username,
            name,
            pageSize,
            pageIndex,
            beginTime,
            endTime
        })
    }

    render() {
        let {loading, count} = this.state;
        let {username, name, beginTime, endTime, setSearchTerm, pageIndex, setPage} = this.props;
        let searchProps = {
            username,
            name,
            beginTime,
            endTime,
            setSearchTerm
        };
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
                <Title tier1='用户管理'/>
                <Layout style={{
                    backgroundColor: '#ffffff',
                    marginTop: '10px',
                    boxShadow: '0 0 10px rgba(0, 21, 41, 0.08)'
                }}>
                    <UserSearch {...searchProps}/>
                    <UserList {...tableProps}/>
                    <MyPagination {...pagitionProps}/>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({...state.userTermR}),
    action
)(User)