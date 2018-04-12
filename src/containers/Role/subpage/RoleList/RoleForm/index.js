import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as action from '@/redux/actions/role'
import {Modal, Form, Input,Select } from 'antd';
import MyModalForm from "@/components/MyModalForm";
let FormItem = Form.Item;
const Option = Select.Option;


class RoleFormC extends Component{
    constructor(){
        super();
        this.state={
            flag: false,
            title: '',
            footer: true,
            handleSubmit: () => {
            },
            initData: {
                name: undefined,
                privilegeList: []
            },
            loading: false,
            disable:false,
            privilege : [],
            privilegeId :[]
        }
    }

    addSubmit = () => {
        let {form: {validateFields}, editTableData} = this.props;
        validateFields((err, values) => {
            if (!err) {
                this.isLoading(true);
                let {name} = values;
                let pid = this.state.privilegeId;
                editTableData({
                    name,
                    pid
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
            title: '新建角色',
            footer: true,
            handleSubmit: this.addSubmit,
            initData: {
                name: undefined,
                pid : []
            },
            privilegeId : [],
            loading: false,
            uploadList:[],
            disable:false
        },resetFields)
    };

    editSubmit=(id)=>{
        let {form: {validateFields}, editTableData} = this.props;
        validateFields((err, values) => {
            if (!err) {
                this.isLoading(true);
                let {name} = values;
                let pid = this.state.privilegeId;
                editTableData({
                    id,
                    name,
                    pid
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

    isLoading = (value) => {
        this.setState({
            loading: value
        })
    };

    handleEdit = (id) => {
        let {getSeeData,form: {resetFields}} = this.props;
        getSeeData(id).then(data=>{
            if(data.result){
                let {name,privilegeList}=data.data;
                let privilegeId = [];
                privilegeList.forEach((item,index) => {
                    privilegeId.push(item.id);
                })
                this.setState({
                    flag: true,
                    title: '修改角色',
                    footer: true,
                    handleSubmit: ()=>{this.editSubmit(id)},
                    initData: {
                        name,
                        privilegeList,
                    },
                    privilegeId,
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

    handleChange = (value) => {
        this.setState({privilegeId : value})
    }

    handleCancel = () => {
        this.setState({
            flag : false,
            loading : false,
        })
    }

    componentDidMount() {
        let {getAdd, getEdit, getSee,getAllPrivilege} = this.props;
        getAllPrivilege().then( data => {
            if(data.result){
                this.setState({
                    privilege : data.privilege
                })
            }else{
                Modal.error({
                    title: '获取权限信息失败',
                    content: data.err
                })
            }
        })
        getAdd(this.handleAdd);
        getEdit(this.handleEdit);
        getSee(this.handleSee);
    }

    render() {
        let {flag, title, footer, handleSubmit, initData,disable,privilege} = this.state;
        let {form: {getFieldDecorator}} = this.props;
        let modalFormProps = {
            width: 500,
            flag,
            title,
            footer,
            handleSubmit,
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
                    <FormItem label="角色名" {...formItemLayout}>
                        {getFieldDecorator("name", {
                            initialValue: initData.name,
                            trigger: disable ? null : 'onChange',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入角色名'
                                }
                            ]
                        })(
                            <Input placeholder="如管理员" style={{width: '100%'}}/>
                        )}
                    </FormItem>
                    <FormItem label="权限列表" {...formItemLayout}>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="选择权限"
                            value={this.state.privilegeId}
                            onChange = {this.handleChange}
                        >
                            {
                                privilege.map((item,index) => {
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
const RoleForm = Form.create()(RoleFormC);

export default connect(
    state => ({...state.rolePrivilegeR}),
    action
)(RoleForm)