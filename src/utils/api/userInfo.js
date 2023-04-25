import axiosInstance from "../axiosInstance";

const userInfo = {
	checkLogin({ zh, password }) {
		return axiosInstance.post("/userInfo/checkLogin", {
			zh,
			password,
		});
	},
};

export default userInfo;
