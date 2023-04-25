import axios from "../axios";

const userInfo = {
	checkLogin({ zh, password }) {
		return axios.post("/userInfo/checkLogin", {
			zh,
			password
		});
	}
};

export default userInfo;
