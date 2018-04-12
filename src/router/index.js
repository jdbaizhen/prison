import Login from "../containers/Login";
import Monitor from '../containers/Monitor';
import Synthesis from "../containers/Synthesis";
import Register from "../containers/Register";
import Track from "../containers/Track";
import TrackMain from '../containers/Track/TrackMain';
import TrackResult from '../containers/Track/TrackResult';
import TrackResultList from '../containers/Track/TrackResult/TrackResultList';
import TrackResultTime from '../containers/Track/TrackResult/TrackResultTime';
import Case from "../containers/Case";
import Chart from "../containers/chart";
import Video from "../containers/Video/index";
import User from "../containers/User/index";
import Role from "../containers/Role/index";
import Log from "../containers/Log/index";
import NoAccess from "../containers/NoAccess/index";
import VideoMain from "../containers/Video/VideoMain/index";
import VideoResult from "../containers/Video/VideoResult/index";

// "pList":[
// 	"monitorSearch",// 实时监控
// 	"synthesisSearch",// 综合查询
// 	"registerSearch",// 人像注册
// 	"trackSearch",// 追查行踪
// 	"caseSearch",// 案件管理
// 	"chartSearch",// 人流统计
// 	"videoSearch",// 视频解析
// 	"userSearch",// 用户管理
// 	"roleSearch",// 角色管理
// 	"logSearch"// 日志管理
// ]


export default [
	{
		path:'/login',
		component:Login
	},
	{
		path:'/',
	},
	{
		path:'/monitor',
		component:Monitor
	},
	{
		path:'/synthesis',
		component:Synthesis
	},
	{
		path:'/register',
		component:Register
	},
	{
		path:'/track',
		component:Track,
		routes:[
			{
				path:'/track/trackMain',
				component:TrackMain
			},
			{
				path:'/track/trackResult/:id',
				component:TrackResult,
				routes:[
					{
						path:'/track/trackResult/:id/list',
						component:TrackResultList
					},
					{
						path:'/track/trackResult/:id/time',
						component:TrackResultTime
					}
				]
			}
		]
	},
	{
		path:'/case',
		component:Case
	},
	{
		path:'/chart',
		component:Chart
	},
	{
		path:'/video',
		component:Video,
		routes:[
			{
				path:'/video/videoMain',
				component:VideoMain
			},
			{
				path:'/video/videoResult/:id',
				component:VideoResult
			}
		]
	},
	{
		path:'/user',
		component:User
	},
	{
		path:'/role',
		component:Role
	},
	{
		path:'/log',
		component:Log
	},
	{
		path:'/noAccess',
		component:NoAccess
	}

]