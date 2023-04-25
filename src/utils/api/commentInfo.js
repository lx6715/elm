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
};

export default commentInfo;
