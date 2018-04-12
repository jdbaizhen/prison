import React from 'react';
import {Pagination} from 'antd';

export default class MyPagination extends React.Component{
    render(){
    	let{pageIndex,count,setPage,isShowSizeChanger}=this.props;
        return(
	        <Pagination size="small"
	                    defaultCurrent={pageIndex}
	                    total={count}
	                    showSizeChanger={isShowSizeChanger}
	                    onShowSizeChange={(a,b)=>{
		                    setPage(a,b)
	                    }}
	                    onChange={(c,d)=>{
		                    setPage(c,d)
	                    }}
	                    style={{backgroundColor:'#ffffff',padding:'10px',textAlign:'right'}}
	        />
        )
    }
}