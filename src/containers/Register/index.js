import React from 'react';
import { connect} from 'react-redux';
import * as action from '@/redux/actions/register'
import { Layout } from 'antd';

import Title from "@/components/Title";
import RegisterSearch from './subpage/RegisterSearch'
import RegisterList from './subpage/RegisterList/index'
import MyPagination from "@/components/MyPagination";

class Register extends React.Component{
    constructor(){
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

    getData = (obj) => {
        let { RegisterTable } = this.props;
        let terms = {
            personName : undefined,
            personNumber : undefined,
            pageIndex : 1,
            pageSize : 10,
            flag : undefined,
            sort : undefined,
            ...obj
        }
        RegisterTable(terms);
    }

    componentDidMount () {
        this.getData();
    }

    componentWillReceiveProps (newProps) {
        let { personName, personNumber, pageIndex, pageSize, flag, sort} = newProps;
        this.getData({
            personName,
            personNumber,
            pageIndex,
            pageSize,
            flag,
            sort
        })
    }

    render(){
        let { name, number, pageIndex, pageSize, setRegisterSearchTerm, setPage ,setRegisterSortTerm} = this.props;
        let { count,loading} = this.state;
        let searchProps = {
            name,
            number,
            pageIndex,
            pageSize,
            setRegisterSearchTerm
        }
        let tableProps = {
            setTableH: this.setTableH,
            loading,
            setRegisterSortTerm,
            getData: this.getData,
            getCount: this.getCount,
        }
        let paginationProps = {
            count,
            pageIndex,
            setPage,
            isShowSizeChanger: false
        }
        return(
            <Layout style={{position: 'relative', top: '0', right: '0'}}>
                <Title tier1='人像注册'/>
                <Layout style={{
                    backgroundColor: '#ffffff',
                    marginTop: '10px',
                    boxShadow: '0 0 10px rgba(0, 21, 41, 0.08)'
                }}>
                    <RegisterSearch {...searchProps}/>
                    <RegisterList {...tableProps}/>
                    <MyPagination {...paginationProps}/>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({...state.RegisterSearchTermR}),
    action
)(Register)