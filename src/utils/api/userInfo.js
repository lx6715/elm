<<<<<<< HEAD
import axiosInstance from "../axiosInstance";

const userInfo = {
	checkLogin({ zh, password }) {
		return axiosInstance.post("/userInfo/checkLogin", {
			zh,
			password,
		});
	},
=======
import axios from "../axios";

const userInfo = {
	checkLogin({ zh, password }) {
		return axios.post("/userInfo/checkLogin", {
			zh,
			password
		});
	}
>>>>>>> 6ee3c0a8570d7d7438e71b510b4b18d7d2c00cc6
};

export default userInfo;
