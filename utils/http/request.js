/*
 * @Date: 2022-06-27 10:10:32
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-08-03 16:29:01
 * @Description: 统一封装请求
 */
let currentRequest;
/**
 *
 * @param {string} url 请求地址（不包含根路径）
 * @param {object} data 请求参数
 * @param {string} word 请求描述，用于结果反馈
 * @param {string} method 请求方式（GET,POST）
 * @returns {Promise}
 */
export default function request(url, data, word, method) {
	return new Promise((resolve, reject) => {
		if (word)
			my.showLoading({
				content: `${word}中...`,
				delay: 5000,
			});

		const appData = getApp().globalData;
		currentRequest = () =>
			my.request({
				url: appData.baseUrl + url,
				method,
				data,
				headers: {
					"Content-Type": "application/json",
					Authorization: appData.token ? appData.token : "",
				},
				dataType: "json",
				success: (res) => {
					const code = res.data.code;
					if (code == 200) {
						if (word) getApp().showResult(word + "成功");
						resolve(res.data.data || res.data);
						return;
					}
					if (code == 401) return reLogin();
					// console.error(res.data.message);
					reject(res.data.message);
					getApp().showResult(res.data.message, 1);
				},
				fail: (err) => {
					if (err.status == 401) return reLogin();
					getApp().showResult("请求失败：" + err.errorMessage, 1);
					reject(err);
				},
				complete: (res) => {
					if (word) my.hideLoading();
				},
			});
		currentRequest();
	});
}
function reLogin() {
	getApp().lightTip("登录过期,正在重新登录", 1);
	getApp()
		.login()
		.then(() =>
			my.navigateTo({
				url: "/pages/index/index",
			})
		);
	// .then(() => currentRequest());
}
