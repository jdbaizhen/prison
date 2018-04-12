let express = require('express');
let router = express.Router();
let chart=require('../mock/chart.json');

router.post('/chart',function (req,res) {
	console.log(req.body);
	let data = {
		result: true,
		message: '摄像头编辑',
		data:JSON.stringify(chart)
	};
	res.send(JSON.stringify(data));
});
module.exports = router;