export default [
	{
		header: '实时监控',
		router: '/monitor',
		icon: 'environment-o',
	},
	{
		header: '综合查询',
		router: '/synthesis',
		icon: 'table',
	},
	{
		header: '人像注册',
		router: '/register',
		icon: 'usergroup-add',
	},
	{
		header: '追查行踪',
		router: '/track',
		icon: 'global',
	},
	{
		header: '案件管理',
		router: '/case',
		icon: 'folder-open',
	},
	{
		header: '人流统计',
		router: '/chart',
		icon: 'line-chart',
	},
	{
		header: '视频解析',
		router: '/video',
		icon: 'video-camera',
	},
	{
		header: '系统管理',
		router: '/system',
		icon: 'appstore-o',
		link: [
			{
				header: '用户管理',
				router: '/user',
				icon: 'user'
			},
			{
				header: '角色管理',
				router: '/role',
				icon: 'team'
			},
			{
				header: '日志管理',
				router: '/log',
				icon: 'bars'
			},
		]
	}
]