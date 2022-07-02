/*
 * @Date: 2022-06-27 10:10:32
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-01 16:58:09
 * @Description: 统一封装请求
 */
let currentRequest;
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
					if (code == 200) return resolve(res.data.data || res.data);
					if (code == 401) return reLogin();
					// console.error(res.data.message);
					reject(res.data.message);
					getApp().showResult(res.data.message);
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
	getApp().login();
	// .then(() => currentRequest());
}
