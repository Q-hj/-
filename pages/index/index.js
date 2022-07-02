/*
 * @Date: 2022-06-27 10:10:32
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-06-30 10:15:30
 * @Description: 首页
 */
var app = getApp();
Page({
	data: {
		list: [],
	},
	async onLoad(query) {
		await app.login();
		setTimeout(() => {
			app.get("/notifications").then((res) => {
				console.log(res);
				this.setData({});
			});
		}, 1000);
	},

	onReady() {
		// 页面加载完成
	},
	onShow() {
		// 页面显示
	},
	toTrackDetail() {
		my.navigateTo({
			url: "/pages/orderDeatil/orderDeatil",
			events: {
				// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
				openedToOpener(data) {
					console.log(data); // { "message": "Hello Opener Page!" }
				},
			},
			success(res) {
				// 通过 eventChannel 向被打开页面传送数据
				res.eventChannel.emit("toDetail", {
					message: "来自首页",
				});
			},
		});
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
