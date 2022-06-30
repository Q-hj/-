/*
 * @Date: 2022-06-29 10:52:21
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-06-30 17:58:55
 * @Description: 场馆预约
 */
var app = getApp();
import user from "/utils/User/user";
import { formatDate } from "/utils/index";
Page({
	data: {
		popupVisible: false,
		longitude: 120.131441,
		latitude: 30.279383,
		scale: 11,
		countdown: false,
		maxNumber: 10,
		fireBrigadeName: "",
		form: {
			contactNumber: "",
			contactName: "",
			groupName: "",
			visitTime: "",
			eventTime: 0,
			sex: "",
			vcode: "",
			number: 1,
			remarks: "",
			geocodedCode: "",
			fireBrigadeId: "",
		},
		vcode: null,
		visitDate: "",
		visitDateList: [],
		vcodeTime: 60,
	},
	onLoad() {
		user.getLocation().then(({ latitude, longitude }) => {
			this.setData({
				latitude,
				longitude,
			});
			const range = 1;
			const params = {
				lat1: Number(latitude - range),
				lat2: Number(latitude + range),
				lon1: Number(longitude - range),
				lon2: Number(longitude + range),
			};
			app
				.post("/fireBrigades/visit/openlng", params, "场馆获取")
				.then((venuesList) => {
					this.setData({ venuesList });
					const markers = venuesList.map((venues) => ({
						id: venues.id,
						latitude: venues.latitude,
						longitude: venues.longitude,
						iconPath: "/assets/images/icon_point_red.png",
						width: 40,
						height: 40,
						customCallout: {
							type: 1,
							descList: [
								{
									desc:
										venues.name +
										"\n ★" +
										venues.stars.toFixed(1) +
										"  开放" +
										venues.count +
										"次" +
										"\n 查看详情",

									descColor: "#000",
								},
							],
							isShow: 1,
						},
					}));
					this.setData({ markers });
				});
		});
	},
	onMarkerTap({ markerId }) {
		const currentvenues = this.data.venuesList.filter(
			(item) => item.id == markerId
		)[0];
		const form = this.data.form;
		if (!currentvenues) return;
		this.setData({
			form: {
				...form,
				fireBrigadeId: markerId,
			},
			fireBrigadeName: currentvenues.name,
		});
		// 获取场馆开放时间
		markerId = 4907; //测试
		app.get("/fireBrigades/visitDateList", { id: markerId }).then((dateList) => {
			if (!dateList.length) {
				my.showToast({
					type: "exception ",
					content: "该场馆暂无开放时间， \n请选择其他场馆",
					duration: 1000,
				});
				this.setData({ visitDateList: [] });
				return;
			}
			const visitDateList = dateList.map((date) => ({
				name: formatDate(date.visitDate),
				subList: date.visitTime.map((time) => ({ name: time })),
			}));
			this.setData({ visitDateList });
		});
	},
	onCalloutTap({ markerId }) {
		console.log(markerId);
		return;
		my.navigateTo({
			// url: "/fireBrigade/v2/fireBrigadeDetailsV2?fireBrigadeId=" + authId.id,
		});
	},
	getCode() {
		const resPhone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
		const phone = this.data.form.contactNumber;

		if (!phone) return my.alert({ title: "提示", content: "请填写手机号！" });
		if (!resPhone.test(phone))
			return my.alert({ title: "提示", content: "手机号码格式不正确！" });
		// 发送验证码
		app.post("/sms/vcode", { phone }).then(() => {
			my.showToast({
				type: "exception",
				content: "验证码已发送",
				duration: 1000,
			});
			this.setData({ countdown: true });
			this.handleCountdown();
		});
	},
	// 倒计时
	handleCountdown() {
		this.setData({ vcodeTime: 60 });
		const vcodeTimer = setInterval(() => {
			const vcodeTime = this.data.vcodeTime - 1;
			if (vcodeTime) this.setData({ vcodeTime });
			else {
				this.setData({ countdown: false });
				clearInterval(vcodeTimer);
			}
		}, 1000);
	},
	onSubmit(form) {
		let word = "";
		if (this.data.form.vcode != form.vcode) word = "验证码不正确";
		if (!this.data.form.vcode) word = "请验证手机号";
		if (!this.data.visitDate) word = "请选择参观时间";
		if (word) {
			my.showToast({
				type: "exception ",
				content: word + "！",
				duration: 1000,
			});
			return;
		}

		console.log(JSON.stringify(form));
	},
	handleSelect() {
		my.multiLevelSelect({
			title: this.data.fireBrigadeName ? "选择参观日期" : "请先选择参观场所",
			list: this.data.visitDateList,
			success: ({ result }) =>
				result &&
				this.setData({ visitDate: result[0].name + "~" + result[1].name }),
		});
	},
	handleValuesChange(value, form) {
		// 输入手机号时 更新form
		// if (value.hasOwnProperty("contactNumber")) this.setData({ form });
		// 输入内容时 更新form
		this.setData({ form });
	},
	handleNoAgree() {
		my.navigateBack();
	},
	handleAgree() {
		this.setData({ popupVisible: false });
	},
});
