/*
 * @Date: 2022-06-28 16:46:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-06-29 11:34:49
 * @Description: 预约详情
 */
Page({
	data: {
		scale: 17,
		markers: [
			{
				iconPath: "/assets/icon/maker.png",
				id: 10,
				latitude: 30.279383,
				longitude: 120.131441,
				width: 40,
				height: 40,
			},
		],
		visitDetail: {
			id: 2313,
			phone: "15232313231",
		},
		visitListProps: [
			{ title: "参观预约ID", bind: "id" },
			{ title: "参观场所", bind: "id" },
			{ title: "参观日期", bind: "id" },
			{ title: "参观时间段", bind: "id" },
			{ title: "参观团名称", bind: "id" },
			{ title: "参观人数", bind: "id" },
			{ title: "联系人名称", bind: "id" },
			{ title: "联系电话", bind: "phone" },
		],
	},
	onLoad() {
		return;
		const eventChannel = this.getOpenerEventChannel();

		// 监听 openerToOpened 事件，获取上一页面通过 eventChannel 传送到当前页面的数据
		eventChannel.on("toDetail", (data) => {
			console.log(data);
		});
	},
	onTaptoHome(e) {
		my.navigateTo({
			url: "/pages/index/index",
		});
	},
	onTapHandleOrder(e) {},
	onTapMap(e) {
		console.log(e);
	},
	onMarkerTap(e) {
		console.log(e);
	},
});
