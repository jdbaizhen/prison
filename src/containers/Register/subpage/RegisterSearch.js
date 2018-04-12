import React,{Component} from 'react';
import {Form, Icon, Input} from 'antd';

import SearchTable from '@/components/SearchTable/index'

class RegisterSearchC extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name : undefined,
            number : undefined
        }
    }

    handleSearch = () => {
        let {form: {validateFields},setRegisterSearchTerm} = this.props;
        validateFields((err,value) => {
            let { name ,number} = value;
            setRegisterSearchTerm({
                name,
                number
            })
        })
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.setState({ name : undefined ,number : undefined})
    }

    render() {
        let formItemLayout = {
            colon:false,
            style: {padding: '0 5px', marginBottom: 0}
        };
        let myProps = {
            searchFn: this.handleSearch,
            handleReset: this.handleReset
        };
        let {form: {getFieldDecorator}} = this.props;
        return (
           <SearchTable {...myProps}>
               <Form.Item label="姓名" {...formItemLayout}>
                   {getFieldDecorator('name')(
                       <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="姓名"/>
                   )}
               </Form.Item>
               <Form.Item label="编号" {...formItemLayout}>
                   {getFieldDecorator('number')(
                       <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="编号"/>
                   )}
               </Form.Item>
           </SearchTable>
         )
    }
}

const RegisterSearch = Form.create()(RegisterSearchC);

export default RegisterSearch