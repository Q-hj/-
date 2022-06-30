/*
 * @Date: 2022-06-28 16:36:17
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-06-28 17:47:40
 * @Description: 参观预约历史记录
 */
Page({
	data: {
		orderList: new Array(14).fill({
			name: "测试",
		}),
	},
	onLoad() {},
	toDetail(item) {
		my.navigateTo({
			url: "/pages/orderDeatil/orderDeatil",
			success(res) {
				// 通过 eventChannel 向被打开页面传送数据
				res.eventChannel.emit("toDetail", {
					message: "来自历史页",
				});
			},
		});
	},
});
