/*
 * @Date: 2022-06-27 08:59:27
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-30 13:52:45
 * @Description: 全局应用实例
 */
import "./utils/date";
import request from "./utils/http/request";
import user from "/utils/User/user";
import store from "/utils/Storage/storage";
App({
	globalData: {
		fileBaseUrl: "https://xfcgyy.119.gov.cn/zfb/publicApi/img/obs?url=",
		// fileBaseUrl: "http://124.222.90.238:9121/zfb/publicApi/img/obs?url=",
		// baseUrl: "https://xfcgyy.119.gov.cn/zfb/publicApi",
		baseUrl: "http://124.222.90.238:9121/zfb/publicApi",
		baseUrl: "http://192.168.0.123:9121/zfb/publicApi",
		clientId: "SPuggfCQVFTlLohuRF4NPQr6QkafyfvP",
		userInfo: null,
		token: null,
	},
	onLaunch(options) {
		// 第一次打开
		this.login();
	},
	onShow(options) {
		// 从后台被 scheme 重新打开
	},
	async login() {
		const code = await user.getAuthCode();
		const params = {
			clientId: this.globalData.clientId,
			code,
		};

		await this.post("/aliApi/oauth/mina/token", params, "登录").then((res) => {
			console.log(res.expires_in);
			const token = res.token_type + res.access_token;
			this.globalData.token = token;
			store.set("token", token);
		});
	},
	get(url, data, word) {
		return request(url, data, word, "GET");
	},
	post(url, data, word) {
		return request(url, data, word, "POST");
	},
	showLoading(word, duration = 5) {
		my.showLoading({
			type: "none",
			content: word + "...",
			duration: duration * 1000,
		});
	},
	lightTip(word, duration = 2) {
		my.showToast({
			type: "none",
			content: word + "！",
			duration: duration * 1000,
		});
	},
	showResult(message, type = 0, duration = 2) {
		const states = ["success", "fail"];
		my.showToast({
			type: states[type],
			content: message,
			duration: duration * 1000,
		});
	},
	getNewDate() {},
});
