/*
 * @Date: 2022-06-30 14:09:10
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-28 10:36:57
 * @Description: 常用功能函数
 */

/**
 * 日期毫秒值转为标准日期
 * @param {Number} value
 * @returns  {String}
 */
export function formatDate(value) {
	if (!value) return "";
	const time = value * 1000 + 8 * 60 * 60 * 1000;
	const date = new Date(time).toJSON();
	return date.slice(0, 10);
}

/**
 * 标准日期格式转为毫秒值
 * @param {String} value
 * @returns {Number}
 */
export function formatIntDate(value) {
	if (!value) return "";
	const date = new Date(value).getTime();
	return parseInt(date / 1000);
}

/**
 * 将对象属性平铺，拼接成url参数格式
 * @param {Object} object
 * @returns  object所有属性的拼接
 */
export function flatQuery(object) {
	let res = "";
	for (const key in object) {
		res += "&" + key + "=" + object[key];
	}
	return res.slice(1);
}
