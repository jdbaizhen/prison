import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Modal, Form, Input, Select} from 'antd';
let Option = Select.Option;
import * as action from '@/redux/actions/user'

let FormItem = Form.Item;

import MyModalForm from "../../../../../components/MyModalForm/index";
import {updateUserInfoA} from "@/api/user";

class UserFormC extends Component {
    constructor(props) {
        super()
        this.state = {
            flag: false,
            title: '',
            footer: true,
            handleSubmit: () => {
            },
            initData: {
                name: undefined,
                username: undefined,
                telephone: undefined,
                password: undefined,
                roleList: []
            },
            loading: false,
            uploadList: [],
            disable: false,
            allGroups : [],
            roleListId : []
        }
    }

    isLoading = (value) => {
        this.setState({
            loading: value
        })
    };

    addSubmit = () => {
        let {form: {validateFields}, updateUserInfo} = this.props;
        validateFields((err, values) => {
            if (!err) {
                this.isLoading(true);
                let {name,username,password,telephone} = values;
                let rid = this.state.roleListId;
                updateUserInfo({
                    name,
                    username,
                    password,
                    telephone,
                    rid
                }).then(data => {
                    if (data.result) {
                        this.isLoading(false);
                        Modal.success({
                            title: '提交成功'
                        });
                        this.handleCancel();
                    } else {
                        this.isLoading(false);
                        Modal.error({
                            title: '提交失败',
                            content: data.err
                        })
                    }
                });
            }
        })
    };

    handleAdd = () => {
        let {form: {resetFields}} = this.props;
        this.setState({
            flag: true,
            title: '新建用户',
            footer: true,
            handleSubmit: this.addSubmit,
            initData: {
                name: undefined,
                username : undefined,
                password : undefined,
                telephone : undefined,
                rid : []
            },
            roleListId : [],
            loading: false,
            disable:false
        },resetFields)
    };

    handleEdit = (id) => {
        let {getSeeData,form: {resetFields}} = this.props;
        getSeeData({id:id}).then(data=>{
            if(data.result){
                let {name,username,telephone,password,roleList}=data.data;
                let roleListId = [];
                roleList.forEach((item,index) => {
                    roleListId.push(item.id);
                })
                this.setState({
                    flag: true,
                    title: '修改用户',
                    footer: true,
                    handleSubmit: ()=>{this.editSubmit(id)},
                    initData: {
                        name,
                        username,
                        telephone,
                        password,
                        roleList
                    },
                    roleListId,
                    loading: false,
                    disable:false
                },resetFields)
            }else{
                Modal.error({
                    title: '获取信息失败',
                    content: data.err
                })
            }
        })
    };

    editSubmit=(id)=>{
        let {form: {validateFields}, updateUserInfo} = this.props;
        validateFields((err, values) => {
            if (!err) {
                this.isLoading(true);
                let {name,username,password,telephone} = values;
                let rid = this.state.roleListId;
                let obj = {};
                obj.id = id;
                obj.name = name;
                obj.username = username;
                obj.password = password;
                obj.telephone = telephone;
                obj.rid = rid;
                updateUserInfo(obj).then(data => {
                    if (data.result) {
                        this.isLoading(false);
                        Modal.success({
                            title: '提交成功'
                        });
                        this.handleCancel();
                    } else {
                        this.isLoading(false);
                        Modal.error({
                            title: '提交失败',
                            content: data.err
                        })
                    }
                });
            }
        })
    };

    handleChange = (value) => {
        this.setState({roleListId : value})
    }

    handleCancel = () => {
        this.setState({
            flag : false,
            loading : false,
        })
    }

    componentDidMount() {
        let { getAdd, getEdit, getSee,getAllGroup } = this.props;
        getAllGroup().then( data => {
            if(data.result){
                this.setState({
                    allGroups : data.groups
                })
            }else{
                Modal.error({
                    title: '获取角色信息失败',
                    content: data.err
                })
            }
        })
        getAdd(this.handleAdd);
        getEdit(this.handleEdit);
        getSee(this.handleSee);
    }

    render() {
        let {title, footer, handleSubmit, initData, uploadList, disable, flag , allGroups} = this.state;
        let {form: {getFieldDecorator}} = this.props;
        let groups = JSON.parse('[' + allGroups.slice(1, allGroups.length - 1) + ']');
        let modalFormProps = {
            width: 500,
            flag,
            title,
            footer,
            handleSubmit: handleSubmit,
            handleCancel: this.handleCancel,
            handleReset: this.handleReset
        };
        let formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 15},
            },
            colon: false
        };
        return (
            <MyModalForm {...modalFormProps}>
                <FormItem label="用户名" {...formItemLayout}>
                    {getFieldDecorator("username", {
                        initialValue: initData.username,
                        trigger: disable ? null : 'onChange',
                        rules: [
                            {
                                required: true,
                                message: '请输入用户名称'
                            }
                        ]
                    })(
                        <Input placeholder="用户名称" style={{width: '100%'}}/>
                    )}
                </FormItem>
                <FormItem label="密码" colon={formItemLayout.colon} {...formItemLayout}>
                    {getFieldDecorator("password", {
                        initialValue: initData.password,
                        trigger: disable ? null : 'onChange',
                    })(
                        <Input placeholder="请输入密码" style={{width: '100%'}}/>
                    )}
                </FormItem>
                <FormItem label="姓名" {...formItemLayout}>
                    {getFieldDecorator("name", {
                        initialValue: initData.name,
                        trigger: disable ? null : 'onChange',
                        rules: [
                            {
                                required: true,
                                message: '请输入姓名'
                            }
                        ]
                    })(
                        <Input placeholder="如张三" style={{width: '100%'}}/>
                    )}
                </FormItem>
                <FormItem label="手机号" {...formItemLayout}>
                    {getFieldDecorator("telephone", {
                        initialValue: initData.telephone,
                        trigger: disable ? null : 'onChange',
                        rules: [
                            {
                                required: true,
                                message: '请输入手机号'
                            }
                        ]
                    })(
                        <Input placeholder="请输入手机号" style={{width: '100%'}}/>
                    )}
                </FormItem>
                <FormItem
                    label="角色"
                    {...formItemLayout}
                >
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="选择角色"
                        value={this.state.roleListId}
                        onChange = {this.handleChange}
                    >
                        {
                            groups.map((item,index) => {
                                return (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </FormItem>
            </MyModalForm>
        )
    }
}

const UserForm = Form.create()(UserFormC);

export default connect(
    state => ({...state.userFormR}),
    action
)(UserForm)