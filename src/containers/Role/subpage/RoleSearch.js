import React,{Component} from 'react';
import {Form, Icon, Input} from 'antd';

import SearchTable from "@/components/SearchTable";

class RoleSearchC extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name : undefined
        }
    }

    handleSearch = () => {
        let {form: {validateFields},setRoleSearchTerm} = this.props;
        validateFields((err,value) => {
            let { name } = value;
            setRoleSearchTerm({name});
        })
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.setState({ name : undefined })
    }

    render() {
        let formItemLayout = {
            colon:false,
            style: {padding: '0 5px', marginBottom: 0}
        };
        let {form: {getFieldDecorator}} = this.props;
        let myProps = {
            searchFn: this.handleSearch,
            handleReset: this.handleReset
        };
        return (
            <SearchTable {...myProps}>
                <Form.Item label="角色名" {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: name
                    })(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="角色名"/>
                    )}
                </Form.Item>
            </SearchTable>
         )
    }
}

const RoleSearch = Form.create()(RoleSearchC);

export default RoleSearch