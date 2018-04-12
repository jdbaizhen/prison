import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as action from '@/redux/actions/register'
import {Modal, Row, Col, Timeline  } from 'antd';
import logo from '@/common/images/logo.png'

class RegisterForm extends Component{
    constructor(){
        super()
        this.state = {
            flag : false,
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
            }
        }
    }

    handleSee = (personId) => {
        let { getRegisterById } = this.props;
        getRegisterById({id:personId}).then( result => {
            if(result.result){
                let data = JSON.parse(result.data);
                this.setState({
                    flag : true,
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
            flag : false
        })
    }

    componentDidMount() {
        let {getSeeInfo} = this.props;
        getSeeInfo(this.handleSee)
    }

    render() {
        let {flag, idData} = this.state
        return (
            <Modal
                width='800px'
                visible={flag}
                title='详细信息'
                footer={false}
                onCancel={this.handleCancel}
            >
                <Row gutter={16}>
                    <Col span={2}/>
                    <Col span={8}>
                        <img src={idData.photo} alt="" style={{width:'100%'}}/>
                    </Col>
                    <Col span={4}/>
                    <Col span={8} style={{marginTop:'20px'}}>
                        <Timeline>
                            <Timeline.Item>姓名 : {idData.personName}</Timeline.Item>
                            <Timeline.Item>性别 : {idData.personSex===1?'男':'女'}</Timeline.Item>
                            <Timeline.Item>编号 : {idData.personNumber}</Timeline.Item>
                            <Timeline.Item>监区 : {idData.prisonArea}</Timeline.Item>
                            <Timeline.Item>状态 : {idData.status===1?'已释放':'服刑中'}</Timeline.Item>
                            <Timeline.Item>入监时间 : {idData.inPrisonTime}</Timeline.Item>
                            <Timeline.Item>更新时间 : {idData.updateTime}</Timeline.Item>
                        </Timeline>
                    </Col>
                    <Col span={2}/>
                </Row>
            </Modal>
         )
    }
}

export default connect(
    state => ({...state.RegisterIdDataR}),
    action
)(RegisterForm)