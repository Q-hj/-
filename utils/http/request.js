/*
 * @Date: 2022-06-27 10:10:32
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-06-30 15:23:13
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
					console.log(res.data.message);
					my.showToast({
						type: "exception",
						content: res.data.message,
						duration: 2000,
					});
				},
				fail: (err) => {
					if (err.status == 401) return reLogin();
					my.showToast({
						type: "fail",
						content: "请求失败：" + err.errorMessage,
						duration: 3000,
					});
				},
				complete: (res) => {
					if (word) my.hideLoading();
				},
			});
		currentRequest();
	});
}
function reLogin() {
	my.showToast({
		type: "exception ",
		content: "登录过期",
		duration: 3000,
	});
	getApp().login();
	// .then(() => currentRequest());
}
