import develop from './develop';
import production from './production';

let config={};
if(process.env.NODE_ENV==='production'){
	config=production;
}else if(process.env.NODE_ENV==='develop'){
	config=develop;
}else if(process.env.NODE_ENV==='test'){
	config=production;
} else{
	throw new Error('请设置正确的NODE_ENV,为production或者develop');
}
export default config;