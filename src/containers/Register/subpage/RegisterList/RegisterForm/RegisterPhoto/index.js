import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as action from '@/redux/actions/register'
import {Modal, Form, Input, Row, Col, Button, Card, Tabs, Upload, Icon, message, Select} from 'antd';
const { Option, OptGroup } = Select;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

import IPCTree from '../../../../../../containers/IPCTree/index';
import logo from '@/common/images/logo.png'
import MultiImgUpload from '../../../../../../components/MultiImgUpload/index'

class RegisterPhotoC extends Component {
    constructor() {
        super()
        this.state = {
            handleSubmit: () => {
            },
            initData: {
                personName: undefined,
                personNumber: undefined,
            },
            loading: false,
            flag: false,
            card : [1,2,3,4,5,6,7,8,9],
            idData : {
                inPrisonTime: undefined,
                personId: undefined,
                personName: undefined,
                personNumber: undefined,
                personSex: undefined,
                photo: undefined,
                prisonArea: undefined,
                status: undefined,
                updateTime: undefined
            },
            uploadList:[],
            disable:false,
            photo: undefined,
            camera : {
                ip : undefined,
                port : undefined,
                username : undefined,
                password : undefined,
                channel : undefined
            }
        }
    }

    getImgData=(uploadList)=>{
        this.setState({
            uploadList
        })
    };

    handleSee = (personId) => {
        let { getRegisterById } = this.props;
        getRegisterById({id:personId}).then( result => {
            if(result.result){
                let data = JSON.parse(result.data);
                this.setState({
                    flag : true,
                    photo: data.photo,
                    idData : {
                        inPrisonTime: data.inPrisonTime,
                        personId: data.personId,
                        personName: data.personName,
                        personNumber: data.personNumber,
                        personSex: data.personSex,
                        photo: data.photo,
                        prisonArea: data.prisonArea,
                        status: data.status,
                        updateTime: data.updateTime
                    }
                })
            }else{
                Modal.error({
                    title: '获取信息失败',
                    content: data.err
                })
            }
        })
    }

    handleCancel = () => {
        this.setState({
            flag: false,
            camera : {
                ip : undefined,
                port : undefined,
                username : undefined,
                password : undefined,
                channel : undefined
            }
        })
        WebVideoCtrl.I_Stop();          //停止播放
        WebVideoCtrl.I_Logout(this.state.camera.ip);    //摄像头登出
    }

    handleChosePhoto = (e) => {
        let img = e.target;
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        let dataURL = canvas.toDataURL("image/png");
        this.setState({
            photo: dataURL
        })
    }

    handleSetId = (value) => {
        WebVideoCtrl.I_Stop();          //停止播放
        WebVideoCtrl.I_Logout(this.state.camera.ip);    //摄像头登出
        let {getCameraInfo} = this.props;
        getCameraInfo({value : value}).then( data => {
            if(data.result){
                let details = data.details;
                this.setState({
                    camera : {
                        ip : details.ip,
                        port : details.port,
                        username : details.username,
                        password : details.password,
                        channel : details.channel
                    }
                })

                const oPlugin = {
                    iWidth: 710,			// plugin width
                    iHeight: 470			// plugin height
                };
                // 初始化插件参数及插入插件
                WebVideoCtrl.I_InitPlugin(oPlugin.iWidth, oPlugin.iHeight, {
                    bWndFull: true //是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
                });
                WebVideoCtrl.I_InsertOBJECTPlugin('cameraDiv');

                    let oLiveView = {
                        iProtocol: 1,			// protocol 1：http, 2:https
                        szIP: details.ip,	            // protocol ip
                        szPort: details.port,			// protocol port
                        szUsername: details.username,	// device username
                        szPassword: details.password,	// device password
                        iStreamType: 1,			// stream 1：main stream  2：sub-stream  3：third stream  4：transcode stream
                        iChannelID: details.channel,	// channel no
                        bZeroChannel: false		// zero channel
                    };

                    // 登录设备
                    WebVideoCtrl.I_Login(oLiveView.szIP, oLiveView.iProtocol, oLiveView.szPort, oLiveView.szUsername, oLiveView.szPassword, {
                        success: function () {
                            //播放实时视频
                            WebVideoCtrl.I_StartRealPlay(oLiveView.szIP, {
                                iStreamType: oLiveView.iStreamType,
                                iChannelID: oLiveView.iChannelID,
                                bZeroChannel: oLiveView.bZeroChannel
                            });
                        }
                    });
            }
        })
    }

    componentDidMount() {
        let {getSeeCamera} = this.props;
        getSeeCamera(this.handleSee);

    }

    render() {
        const { uploadList, disable ,flag, loading, idData,photo} = this.state;
        let {form: {getFieldDecorator}} = this.props;
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
        let ipcTreeProps={
            showSearch:true,
            dropdownMatchSelectWidth: false,
            placeholder: '请选择摄像头',
            treeCheckable: false,
            allowClear: true,
            onChange:this.handleSetId,
            mySelectable:[3]
        }
        let imgUploadProps={
            getImgData:this.getImgData,
            uploadList,
            disable,
            limit:1,
            maxSize:200
        };

        return (
            <Modal
                width='1200px'
                visible={flag}
                title='头像注册'
                footer={<div>
                    <Button
                        type="primary"
                        icon="check"
                        // onClick={handleSubmit}
                        style={{margin: '0 2px'}}
                        loading={loading}
                    >
                        提交
                    </Button>
                </div>
                }
                maskClosable={false}
                onCancel={this.handleCancel}
            >

                <Row gutter={16}>
                    <Col span={8}>
                        <Row style={{marginBottom:'20px'}}>
                            <Col span={24}>
                                <IPCTree {...ipcTreeProps} style={{width:'100%'}}/>
                            </Col>
                        </Row>
                        <Row style={{marginBottom:'20px'}}>
                            <Col span={8}>
                                <Card bordered={true} >
                                    <img src={photo}
                                         style={{width: '100%'}}
                                    />
                                </Card>
                            </Col>
                            <Col span={16}>
                                <Form  style={{padding:'5% 0 0 10%'}} >
                                    <FormItem label="姓名" {...formItemLayout}>
                                        {getFieldDecorator("personName", {
                                            initialValue: idData.personName,
                                        })(
                                            <Input style={{width: '90%'}} disabled='true'/>
                                        )}
                                    </FormItem>

                                    <FormItem label="编号" {...formItemLayout}>
                                        {getFieldDecorator("personNumber", {
                                            initialValue: idData.personNumber,
                                        })(
                                            <Input style={{width: '90%'}} disabled='true'/>
                                        )}
                                    </FormItem>
                                </Form>
                            </Col>
                        </Row>

                        <Row>
                            {
                                this.state.card.map((item,index)=>{
                                    return <Col span={8}>
                                        <Card bordered={true} style={{padding: '10%'}}>
                                            <img src={logo}
                                                 style={{width: '80%',height: '80%'}}
                                                 onClick={this.handleChosePhoto}
                                            />
                                        </Card>
                                    </Col>
                                })
                            }
                        </Row>
                    </Col>

                    <Col span={1}/>

                    <Col span={15}>
                        <Tabs defaultActiveKey="1" tabPosition="top">
                            <TabPane tab="拍照" key="1" style={{width: '100%'}}>
                                <div id="cameraDiv"></div>
                            </TabPane>

                            <TabPane tab="上传" key="2">
                                <MultiImgUpload {...imgUploadProps}/>
                            </TabPane>
                        </Tabs>
                    </Col>

                </Row>

            </Modal
            >
        )
    }
}

const RegisterPhoto = Form.create()(RegisterPhotoC)

export default connect(
    state => ({...state.RegisterIdDataR}),
    action
)(RegisterPhoto)