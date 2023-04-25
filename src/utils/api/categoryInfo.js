//导入axiosInstance
import axios from "../axios";
const categoryInfo = {
	getAllList() {
		return axios.get("/categoryInfo/getAllList");
	},
};
export default categoryInfo;
