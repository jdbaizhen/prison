import React, {Component} from 'react';
import {Form, Icon, Input, DatePicker} from 'antd';
const {RangePicker} = DatePicker;

import SearchTable from '../../../components/SearchTable/index'
import {handleMoment} from '../../../utils/util';

class UserSearchC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username : undefined,
            name : undefined,
            time : []
        }
    }

/*    componentDidMount() {
        let {username,name,beginTime, endTime} = this.props;
        let initBeginTime = handleMoment(beginTime);
        let initEndTime = handleMoment(endTime);
        this.setState({
            username,
            name,
            time: [initBeginTime, initEndTime]
        })
    }*/

    handleSearch = () => {
        let {setSearchTerm, form: {validateFields}} = this.props;
        validateFields((err, values) => {
            let {username,name,time} = values;
            let beginTime = time[0]?time[0].format('YYYY-MM-DD HH:mm') + ':00':undefined;
            let endTime = time[1]?time[1].format('YYYY-MM-DD HH:mm') + ':00':undefined;
            setSearchTerm({
                username,
                name,
                beginTime,
                endTime
            })
        })
    };
    handleReset = () => {
        this.props.form.resetFields();
        this.setState({
            username:undefined,
            name:undefined,
            time: []
        })
    };

    render() {
        let formItemLayout = {
            colon:false,
            style: {padding: '0 5px', marginBottom: 0}
        };
        let {form: {getFieldDecorator}} = this.props;
        let {username,name,time} = this.state;
        let myProps = {
            searchFn: this.handleSearch,
            handleReset: this.handleReset
        };
        return (
            <SearchTable {...myProps}>
                <Form.Item label="账户" {...formItemLayout}>
                    {getFieldDecorator('username', {
                        initialValue: username
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="账户"/>
                    )}
                </Form.Item>
                <Form.Item label="姓名" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: name
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="姓名"/>
                    )}
                </Form.Item>
                <Form.Item label="时间" {...formItemLayout}>
                    {getFieldDecorator("time", {
                        initialValue: time
                    })(
                        <RangePicker
                            showTime={{format: 'HH:mm'}}
                            format="YYYY-MM-DD HH:mm"
                            placeholder={['Start Time', 'End Time']}
                        />
                    )}
                </Form.Item>
            </SearchTable>

        )
    }
}
const UserSearch = Form.create()(UserSearchC);

export default UserSearch;

