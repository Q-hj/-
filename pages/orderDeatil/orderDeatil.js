/*
 * @Date: 2022-06-28 16:46:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-29 13:58:31
 * @Description: 预约详情
 */
// import qs from "query-string";
import { formatDate, flatQuery } from "/utils/common";
const app = getApp();
Page({
	data: {
		scale: 17,
		markers: [],
		visitDetail: {},
		visitListProps: [
			{ title: "参观预约ID", bind: "id" },
			{ title: "参观场所", bind: "fireBrigadeName" },
			{ title: "参观日期", bind: "eventTime" },
			{ title: "参观时间段", bind: "visitTime" },
			{ title: "参观团名称", bind: "groupName" },
			{ title: "参观人数", bind: "number" },
			{ title: "联系人名称", bind: "contactName" },
			{ title: "联系电话", bind: "contactNumber" },
		],
		btnProps: [
			{ url: "cancelFireVisit", text: "取消预约" },
			{ url: "cancelFireVisit", text: "取消预约" },
			{ url: "visit", text: "前往修改" },

			{ url: "evaluate", text: "我要评价" },
			{ url: "cancelFireVisit", text: "取消预约" },
			{ url: "", text: "状态6" },
			{ url: "confirm", text: "修改确认" },
		],
	},
	onLoad({ id }) {
		app.get("/fireVisitAPPT/getFireVisit", { id }).then((visitDetail) => {
			visitDetail.eventTime = formatDate(visitDetail.eventTime);
			this.setData({
				id,
				visitDetail,
				markers: [
					{
						iconPath: "/assets/icon/maker.png",
						id: 1,
						latitude: visitDetail.latitude,
						longitude: visitDetail.longitude,
						width: 40,
						height: 40,
					},
				],
			});
		});
	},
	onTapToHome(e) {
		my.navigateTo({
			url: "/pages/index/index",
		});
	},

	onTapToUpdate(e) {
		const detail = flatQuery(this.data.visitDetail);
		my.navigateTo({
			url: "/pages/visit/visit?" + detail,
		});
	},
	handleOrder({
		currentTarget: {
			dataset: { url, text },
		},
	}) {
		/**
		 * 点击操作有两种处理，
		 * 1.页面跳转，修改页和评价页
		 * 2.修改状态，调用对应接口
		 */
		if (["visit", "evaluate"].indexOf(url) >= 0) {
			//评分页面
			const detail = flatQuery(this.data.visitDetail);
			// object参数需要先转为string
			return my.redirectTo({ url: `/pages/${url}/${url}?` + detail });
		}
		const { id } = this.data.visitDetail;
		app
			.post("/fireVisitAPPT/" + url + "?id=" + id, {}, text)
			.then(() => my.navigateBack());
	},
	onTapMap(e) {
		// console.log(e);
	},
	onMarkerTap(e) {
		const { latitude, longitude, fireBrigadeName } = this.data.visitDetail;
		my.openLocation({
			longitude: longitude,
			latitude: latitude,
			name: fireBrigadeName,
			address: " ",
		});
	},
});
