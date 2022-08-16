/*
 * @Date: 2022-06-30 14:09:10
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-08-16 17:29:42
 * @Description: 常用功能函数
 */

import './date';
/**
 * 日期毫秒值转为标准日期
 * @param {Number} value
 * @returns  {String}
 */
export function formatDate(value) {
	if (!value) return '';
	const time = value * 1000 + 8 * 60 * 60 * 1000;
	const date = new Date(time).toJSON();
	return date.slice(0, 10);
}

/**
 * 标准日期格式转为毫秒值
 * @param {String} value
 * @returns {Number}
 */
export function formatIntDate(date) {
	if (!date) return 0;
	// YYYY-MM-DD 转为日期格式会将会推迟八小时（东八区）
	// 详见 https://blog.csdn.net/s_y_w123/article/details/120566605

	// const fommatDate = date.replaceAll("-", "/");//真机环境不支持
	const fommatDate = date.split('-').join('/');
	const result = new Date(fommatDate).getTime();
	return parseInt(result / 1000);
}

/**
 * 将对象属性平铺，拼接成url参数格式
 * @param {Object} object
 * @returns  object所有属性的拼接
 */
export function flatQuery(object) {
	let res = '';
	for (const key in object) {
		res += '&' + key + '=' + object[key];
	}
	return res.slice(1);
}
