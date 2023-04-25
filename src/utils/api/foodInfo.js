import axios from "../axios";
const foodInfo = {
	getListByPage({ pageIndex, food_name, category_name }) {
		return axios.get("/foodInfo/getListByPage", {
			params: {
				pageIndex,
				food_name,
				category_name,
			},
		});
	},
	findById(id) {
		return axios.get("/foodInfo/findById", {
			params: {
				id,
			},
		});
	},
};

export default foodInfo;
