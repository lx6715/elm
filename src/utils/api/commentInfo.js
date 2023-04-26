<<<<<<< HEAD
import axiosInstance from "../axiosInstance.js";
const commentInfo = {
	getCommentInfoListByFid({ pageIndex, fid }) {
		return axiosInstance.get("/commentInfo/getCommentInfoListByFid", {
			params: {
				pageIndex,
				fid,
			},
		});
	},
=======
import axios from "../axios";
const commentInfo = {
	getCommentInfoListByFid(fid, pageIndex) {
		return axios.get("/commentInfo/getCommentInfoListByFid", {
			params: {
				fid,
				pageIndex
			}
		});
	}
>>>>>>> 6ee3c0a8570d7d7438e71b510b4b18d7d2c00cc6
};

export default commentInfo;
