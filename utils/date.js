/*
 * @Date: 2022-07-26 11:02:16
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-29 15:55:50
 * @Description: date方法
 */

const hour = 1000 * 60 * 60;

/**
 * @param {Number} hours
 * @return {String} date
 */
Date.prototype.fommat = function (hours = 0) {
	// let index = 10;

	// toJSON()会把时间往前减8小时...
	// toJSON()会进行时区处理，默认为0时区，而北京时间为东八区，所以0时区比我们慢了8小时！

	const realDate = this.getTime() + hour * 8;

	const time = realDate + hours * hour;

	const dateStr = new Date(time).toJSON().replace("T", " ");

	return dateStr.slice(0, 19);
};

/**
 * 标准日期格式转为毫秒值
 * @param {String} value
 * @returns {Number}
 */
Date.prototype.toInt = function (hours = 0) {
	let result = new Date(fommatDate).getTime();
	//   yyyy-mm-dd 时间格式下 new Date()会采用东八区制
	if (this.length <= 10) result + hour * 8;
	return parseInt(result / 1000);
};
