import React from 'react';
import {Link} from 'react-router-dom';

export default class Title extends React.Component{
    render(){
    	let {parentLink,tier1,tier1Link,tier2,tier3,selfStyle}=this.props;
        return(
	        <div className="pageTitle" style={selfStyle}>
		        <span className="tag">当前位置：</span>
		        {tier1&&!tier1Link?<span className={`pageLink ${tier2?"":"pageLinkLast"}`}>{tier1}</span>:null}
		        {tier1&&tier1Link?<Link to={tier1Link} className={`pageLink ${tier2?"":"pageLinkLast"}`}>{tier1}</Link>:null}
		        {tier2?<span className="ic">/</span >:null}
		        {tier2&&parentLink?<Link to={parentLink} className={`pageLink ${tier3?"":"pageLinkLast"}`}>{tier2}</Link>:null}
		        {tier2&&!parentLink?<span className={`pageLink ${tier3?"":"pageLinkLast"}`}>{tier2}</span>:null}
		        {tier3?<span className="ic">/</span>:null}
		        {tier3?(<span className="pageLinkLast">{tier3}</span>):null}
	        </div>
        )
    }
}
import './index.less'