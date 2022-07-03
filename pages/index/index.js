/*
 * @Date: 2022-06-27 10:10:32
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-07-01 17:38:57
 * @Description: 首页
 */
var app = getApp();
import { formatDate } from "/utils/common";
Page({
  data: {
    list: [],
  },
  onLoad(query) {},

  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
    this.getList();
  },
  getList() {
    setTimeout(() => {
      if (!app.globalData.token) return this.getList();
      app.get("/notifications").then((list) => {
        list = list.map((e) => ({
          ...e,
          eventTime: formatDate(e.eventTime),
          updated: formatDate(e.updated),
        }));
        this.setData({ list });
      });
    }, 500);
  },
  formatDate(value) {
    if (!value) return "";
    const date = new Date(value * 1000).toJSON();
    console.log(date);
    return date.slice(0, 10);
  },
  toTrackDetail({
    currentTarget: {
      dataset: { id },
    },
  }) {
    my.navigateTo({
      url: "/pages/orderDeatil/orderDeatil?id=" + id,
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
