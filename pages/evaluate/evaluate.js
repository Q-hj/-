/*
 * @Date: 2022-07-29 16:18:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-30 11:17:40
 * @Description: 评价
 */
var app = getApp();
Page({
	data: { feedback: "", score: 0, status: 7 },
	onLoad(query) {
		const { id, status } = query;
		this.setData({
			apptId: id,
			status,
		});
	},
	setScore({
		target: {
			dataset: { score },
		},
	}) {
		this.setData({ score });
	},
	onInput({ detail: { value } }) {
		this.setData({ feedback: value });
	},
	onSubmit() {
		const params = {
			...this.data,
		};

		app.post("/feedbackAPPT/visit", params, "评价").then((res) => {
			my.redirectTo({ url: "/pages/history/history" });
		});
	},
});
