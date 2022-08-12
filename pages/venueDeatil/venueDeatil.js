/*
 * @Date: 2022-07-04 09:08:33
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-08-04 16:41:03
 * @Description: 场馆详情
 */
var app = getApp();
import { formatDate, formatIntDate } from "/utils/common";
import user from "/utils/User/user";
Page({
	data: {
		baseUrl: app.globalData.fileBaseUrl,
		stars: 5,
		testImg:
			"https://xfcgyy.119.gov.cn/web/manage/img/obs?token=103945fdadafd4e0b08701f148d1e850&url=fb/2021-08-10/04f9c81a-ddd6-4ac5-991f-25fe37b92ebe.jpg",
	},
	onLoad({ fireBrigadeId }) {
		fireBrigadeId = 4724; //测试
		app.login().then(() =>
			app.get("/fireBrigades/getDetails", { fireBrigadeId }).then((venueDetail) =>
				this.setData({
					venueDetail,
					stars: venueDetail.stars || 5,
					imgs:
						[
							this.data.testImg,
							this.data.testImg,
							this.data.testImg,
							this.data.testImg,
						] || venueDetail.imgs.split(";"),
				})
			)
		);
	},
	handleNav() {
		const { longitude, latitude, fireBrigadeName, address } =
			this.data.venueDetail;
		my.openLocation({
			longitude,
			latitude,
			name: fireBrigadeName,
			address,
		});
	},
});
