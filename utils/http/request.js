/*
 * @Date: 2022-06-27 10:10:32
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-28 10:44:18
 * @Description: 统一封装请求
 */
let currentRequest;
export default function request(url, data, word, method) {
	console.log(word);
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
	getApp()
		.login()
		.then(() =>
			my.navigateTo({
				url: "/pages/index/index",
			})
		);
	// .then(() => currentRequest());
}
