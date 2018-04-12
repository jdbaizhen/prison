let express=require('express');
let app=express();
let bodyParser=require('body-parser');


let account=require('./routes/account');
let monitor=require('./routes/monitor');
let video=require('./routes/video');
let myCase=require('./routes/case');
let synthesis=require('./routes/synthesis');
let track=require('./routes/track');
let trackResult=require('./routes/trackResult');
let chart=require('./routes/chart');
let name='/prison';

app.listen(4331);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(name+'/user',account);
app.use(name+'/camera',monitor);
app.use(name+'/monitor',synthesis);
app.use(name+'/video',video);
app.use(name+'/case',myCase);
app.use(name+'/trace',track);
app.use(name+'/trace',trackResult);
app.use(name+'/flow',chart);
