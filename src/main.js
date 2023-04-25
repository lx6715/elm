/*
 * @Date: 2023-04-24 11:18:21
 * @LastEditors: 查冰 lx740565847@163.com
 * @LastEditTime: 2023-04-25 08:53:02
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
import store from "./store";

import lazyLoad from "vue-lazyload";
import message from "vue-m-message";
import Vuerify from "vuerify";

Vue.config.productionTip = false;

//导入icon图标
import "./assets/icon/iconfont.css";
import "./assets/scss/comm.scss";

//注册全局组件
import pageView from "./components/page-view.vue";
import titleBar from "./components/title-bar.vue";
Vue.component("page-view", pageView);
Vue.component("title-bar", titleBar);

Vue.use(Vuerify);

Vue.mixin({
	data() {
		return {
			baseURL: "http://www.softeem.xin:9544"
		};
	}
});

Vue.use(lazyLoad, {
	loading: require("./assets/img/loading.gif"),
	error: require("./assets/img/error.jpg"),
	proload: 1.3,
	attempt: 3
});

Vue.use(message, { name: "msg" });
//在Vue的原型中扩展一个showLoading的方法
Vue.prototype.showLoading = text => {
	Vue.prototype.$msg.loading({
		type: "loading",
		title: "软帝点餐",
		message: text,
		isCollapsed: false,
		duration: -1,
		hasMask: true,
		position: "center"
	});
};

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
