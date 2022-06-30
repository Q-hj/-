/*
 * @Date: 2022-06-30 14:09:10
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-06-30 14:58:32
 * @Description: 常用功能函数
 */

export function formatDate(value) {
	if (!value) return "";
	const date = new Date(value * 1000).toJSON();
	return date.slice(0, 10);
}
