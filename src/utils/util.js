import moment from 'moment';

export const setSession = (key, value) => {
	if (typeof value === 'object') {
		value = JSON.stringify(value);
	}
	sessionStorage.setItem(key, value);
};

export const getSession = (key) => {
	let value = sessionStorage.getItem(key);
	if (/^(\{|\[)/.test(value)) {
		value = JSON.parse(value);
	}
	return value
};

export const removeSession = (key) => {
	sessionStorage.removeItem(key);
};

export const handleMoment = (str) => {
	if (str) {
		let dateFormat = 'YYYY-MM-DD HH:mm';
		return moment(str.slice(0, -3), dateFormat)
	}
};


export const betweenMoment=(time,beginTime,endTime)=>{
	return moment(time).isBetween(beginTime, endTime,'second');
};