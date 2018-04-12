let express = require('express');
let router = express.Router();
let account=require('../mock/account.json');

router.post('/login', function (req, res) {
	let data = null;
	let {username, password} = req.body;
	if (username === 'admin' && password === 'admin') {
		data = {
			result: true,
			message: '登录成功',
			data: JSON.stringify(account)
		}
	} else {
		data = {result: false, message: '用户名或密码错误'}
	}
	res.send(JSON.stringify(data))
});

router.get('/exit', function (req, res) {
	let data = {
		result: true,
		message: '退出成功'
	};

	res.send(JSON.stringify(data));
});

module.exports = router;