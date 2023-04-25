import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "animate.css";

Vue.config.productionTip = false;

//导入icon图标
import "./assets/icon/iconfont.css";
import "./assets/scss/comm.scss";

import Message from "vue-m-message";
import "vue-m-message/dist/index.css";
Vue.use(Message, { name: "msg" });
//在Vue的原型中扩展一个showLoading的方法
Vue.prototype.showLoading = text => {
	Vue.prototype.$msg.loading({
		type: "loading",
		title: "软帝点餐",
		message: text,
		isCollapsed: false,
		duration: -1,
		hasMask: true,
		position: "center",
	});
};

//注册全局组件
import pageView from "./components/page-view.vue";
Vue.component("page-view", pageView);

import titleBar from "./components/title-bar.vue";
Vue.component("title-bar", titleBar);

import vuerify from "vuerify";
Vue.use(vuerify);

import swipeCell from "vue-swipe-cell";
Vue.use(swipeCell);

import { mapActions, mapGetters } from "vuex";
Vue.mixin({
	data() {
		return {
			baseURL: baseURL,
		};
	},
	computed: {
		...mapGetters(["actionSheetConfig"]),
	},
	methods: {
		...mapActions(["showActionSheet", "hideActionSheet"]),
	},
});

import VueLazyLoad from "vue-lazyload";
Vue.use(VueLazyLoad, {
	//当图片还没有加载出来的时候，我们适应loading图片来替换显示
	loading: require("./assets/img/loading.gif"),
	//当图片加载失败，使用这张图
	error: require("./assets/img/error.jpg"),
	preload: 1.3,
	//当图片加载失败之后重试3次
	attempt: 3,
});

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
