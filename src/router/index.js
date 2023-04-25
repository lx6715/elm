import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue";
import foodDetail from "../views/foodDetail.vue";
import chooseFood from "../views/chooseFood.vue";
import my from "../views/my.vue";
import order from "../views/order.vue";
import category from "../views/category.vue";
import login from "../views/login.vue";
import shopCartList from "../views/shopCartList.vue";

//最重要的一步，所有的vue全家桶插件都要执行use
Vue.use(VueRouter);

const router = new VueRouter({
	//mode模式，指的是当前路由管理对象使用的是hash模式，也就是#模式，通过#来实现跳转
	mode: "hash",
	routes: [
		{
			path: "/",
			redirect: {
				name: "chooseFood",
			},
		},
		{
			path: "/home",
			name: "home",
			component: home,
			children: [
				{
					path: "chooseFood",
					name: "chooseFood",
					component: chooseFood,
				},
				{
					path: "order",
					name: "order",
					component: order,
				},
				{
					path: "category",
					name: "category",
					component: category,
				},
				{
					path: "my",
					name: "my",
					component: my,
				},
			],
		},
		{
			path: "/foodDetail",
			name: "foodDetail",
			component: foodDetail,
		},
		{
			path: "/login",
			name: "login",
			component: login,
		},
		{
			path: "/shopCartList",
			name: "shopCartList",
			component: shopCartList,
		},
	],
});
export default router;
