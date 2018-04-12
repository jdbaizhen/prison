let express = require('express');
let router=express.Router();
let search=require('../mock/trackResult.json');
let time=require('../mock/trackResultTime.json');
router.post('/getTraceResult',function (req,res) {
	console.log(req.body);
	let data = {
		errCode:9999,
		errMsg: '追查行踪结果列表',
		data:JSON.stringify(search)
	};
	res.send(JSON.stringify(data));
});

router.post('/deleteResult',function (req,res) {
	console.log(req.body);
	let data = {
		errCode:9999,
		errMsg: '追查行踪结果删除'
	};
	res.send(JSON.stringify(data));
});

router.post('/timeAxis',function (req,res) {
	console.log(req.body);
	let data = {
		errCode:9999,
		errMsg: '追查行踪结果时间轴',
		data:JSON.stringify(time)
	};
	res.send(JSON.stringify(data));
});

module.exports=router;