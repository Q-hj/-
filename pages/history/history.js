/*
 * @Date: 2022-06-28 16:36:17
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-01 17:20:15
 * @Description: 参观预约历史记录
 */
const app = getApp();
import { formatDate } from "/utils/common";
Page({
	data: {},
	onLoad() {},
	onShow() {
		app
			.get("/fireVisitAPPT/page", {
				page: 1,
				pageSize: 10,
			})
			.then(({ records }) => {
				records = records.map((e) => ({
					...e,
					eventTime: formatDate(e.eventTime),
				}));
				this.setData({ records });
			});
	},
	toDetail({
		currentTarget: {
			dataset: { id },
		},
	}) {
		my.navigateTo({
			url: "/pages/orderDeatil/orderDeatil?id=" + id,
		});
	},
});
