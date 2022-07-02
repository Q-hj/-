/*
 * @Date: 2022-06-27 08:59:27
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-06-27 09:59:47
 * @Description: 封装 User 类
 */
import store from "/utils/Storage/storage";

class User {
	constructor() {
		this.name = "user";
	}
	getAuthCode() {
		return new Promise((resolve, reject) => {
			my.showLoading({
				content: "获取授权中...",
				delay: 1000,
			});
			my.getAuthCode({
				success: (res) => resolve(res.authCode),
				fail: (err) => reject(err),
				complete,
			});
		});
	}
	getInfo() {
		return new Promise((resolve, reject) => {
			my.getOpenUserInfo({
				success: (res) => resolve(JSON.parse(res.response).response),
				fail: (err) => reject(err),
			});
		});
	}
	getPhone() {
		return new Promise((resolve, reject) => {
			my.getPhoneNumber({
				success: ({ response: res }) => {
					resolve(JSON.parse(res));
					// 需要解密
				},
				fail: (err) => console.log(err.subMsg),
			});
		});
	}
	getLocation() {
		return new Promise((resolve, reject) => {
			my.showLoading({
				content: "定位中...",
				delay: 1000,
			});
			console.log("getLocation");
			my.getLocation({
				type: 1,
				success: (res) => resolve(res),
				fail: (err) => console.log("定位失败：" + err.errorMessage),
				complete,
			});
		});
	}
}

function complete() {
	my.hideLoading();
}

export default new User();
