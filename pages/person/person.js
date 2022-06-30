/*
 * @Date: 2022-06-27 08:59:27
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-06-27 10:04:50
 * @Description:
 */
var app = getApp();
import store from "/utils/Storage/storage";
import user from "/utils/User/user";
import menuList from "./menuList";
Page({
	data: {
		imgPath: "",
		userInfo: store.get("userInfo"),
	},
	// 页面加载
	onLoad(query) {
		if (!this.userInfo) {
			user.getInfo().then((res) => {
				const { code, msg, ...userInfo } = res;
				this.setData({ userInfo });
				store.set("userInfo", userInfo);
				console.log(this.userInfo);
			});
		}
		user.getPhone().then((phone) => {
			console.log(phone);
			console.log("https://opendocs.alipay.com/common/02mse3");
		});
		user.getLocation().then((res) => {
			console.log(res);
		});
		// this.setData(menuList);
	},
	onReady() {
		// 页面加载完成
	},
	onShow() {
		// 页面显示
		this.setData({});
	},
	onUnload() {
		// 页面被关闭
	},
	onTitleClick() {
		// 标题被点击
	},
	onPullDownRefresh() {
		// 页面被下拉
	},
	onReachBottom() {
		// 页面被拉到底部
	},
	onShareAppMessage() {
		// 返回自定义分享信息
		return {
			title: "My App",
			desc: "My App description",
			path: "pages/index/index",
		};
	},
});
