//导入axiosInstance
import axiosInstance from "../axiosInstance";
const categoryInfo = {
	getAllList() {
		return axiosInstance.get("/categoryInfo/getAllList");
	},
};
export default categoryInfo;
