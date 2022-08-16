/*
 * @Date: 2022-06-28 16:36:17
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-08-16 15:16:50
 * @Description: 参观预约历史记录
 */
const app = getApp();
import { formatDate } from '/utils/common';
Page({
	data: {
		page: 0,
		records: [],
	},
	onLoad() {},
	onShow() {
		this.setData({ page: 0, records: [] });
		this.getList();
	},
	// 页面上拉触底事件的处理函数
	onReachBottom() {
		const { total, page } = this.data;
		// 有存量时进行加载
		if (total > page * 10) this.getList();
	},
	getList() {
		this.setData({ page: ++this.data.page });
		app
			.get('/fireVisitAPPT/page', {
				page: this.data.page,
				pageSize: 10,
			})
			.then(({ records, total }) => {
				records = records.map((e) => ({
					...e,
					eventTime: formatDate(e.eventTime),
				}));
				this.setData({ total, records: this.data.records.concat(records) });
			});
	},
	toDetail({
		currentTarget: {
			dataset: { id },
		},
	}) {
		my.navigateTo({
			url: '/pages/orderDeatil/orderDeatil?id=' + id,
		});
	},
});
