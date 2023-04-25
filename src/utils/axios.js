import axiosInstance from "axios";
import Vue from "vue";
import store from "../store";
import router from "@/routers";

//创建axios对象进行配置
const axios = axiosInstance.create({
	//请求超时时长
	timeout: 5000,
	//部署请求地址
	baseURL: "http://www.softeem.xin:9544"
});

axios.interceptors.request.use(config => {
	console.log("token: ", store.state.softeem_ele_client_token);
	if (store.state.softeem_ele_client_token) {
		config.headers["softeem_ele_client_token"] = store.state.softeem_ele_client_token;
	}
	return config;
});

//调用拦截器
axios.interceptors.response.use(
	resp => {
		Vue.prototype.$msg.closeAll();
		/**
		 * resp.data = {
				status:"success",
				msg:"接口返回的消息",
				data:[]
			}
			*/
		//判断一下是否真的成功
		if (resp.data.status) {
			return Promise.resolve(resp.data.data);
		} else {
			console.log("服务器进入成功，但是数据调用失败", resp.data, resp.data.msg);
			Vue.prototype.$msg.error(resp.data.msg);
			return Promise.reject(resp.data);
		}
	},
	//请求失败之后执行的事情
	error => {
		if (error.response.status == 403) {
			Vue.prototype.$msg.error("你还没有登录，请登录");
			setTimeout(() => router.push({ name: "login" }), 300);
		} else {
			Vue.prototype.$msg.error("加载失败");
		}
		return Promise.reject(error);
	}
);

export default axios;
