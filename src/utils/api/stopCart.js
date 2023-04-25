import axios from "../axios";

const shopCart = {
	addToShopCart({ fid, count }) {
		return axios.post("/shopCart/addToShopCart", {
			fid,
			count
		});
	}
};

export default shopCart;
