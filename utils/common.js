/*
 * @Date: 2022-06-30 14:09:10
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-27 16:41:23
 * @Description: 常用功能函数
 */

export function formatDate(value) {
	if (!value) return "";
	const time = value * 1000 + 8 * 60 * 60 * 1000;
	const date = new Date(time).toJSON();
	return date.slice(0, 10);
}

export function formatIntDate(value) {
	if (!value) return "";
	const date = new Date(value).getTime();
	return parseInt(date / 1000);
}
export function queryToString(object) {
	let res = "";
	for (const key in object) {
		res += "&" + key + "=" + object[key];
	}
	return res.slice(1);
}
