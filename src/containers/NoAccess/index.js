import React from 'react';
import {Button} from 'antd';
import noAccess from '../../common/images/noAccess.png'

export default class NoAccess extends React.Component{
    goBack=()=>{
        this.props.history.goBack();
    };
    render(){
	    return(
            <div className="full-screen no-access-box">
                <img src={noAccess} alt=""/>
                <h1>您没有权限访问!!!</h1>
                <Button type="danger" onClick={this.goBack}>返回上一层</Button>
            </div>
        )
    }
}
import './index.less';