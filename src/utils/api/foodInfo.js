//导入axiosInstance
import axiosInstance from "../axiosInstance";

const foodInfo = {
	//声明一个执行请求的方法，把请求参数作为方法参数传入
	getListByPage({ pageIndex, food_name, category_name }) {
		//axios调用get方法发送get请求，传入两个参数，第一个是请求地址
		//第二个参数作为get请求的参数，但是get请求的参数需要放在params
		return axiosInstance.get("foodInfo/getListByPage", {
			params: {
				pageIndex,
				food_name,
				category_name,
			},
		});
	},
	//菜品详情请求方法
	findById(id) {
		return axiosInstance.get("/foodInfo/findById", {
			params: {
				id,
			},
		});
	},
};

export default foodInfo;
