import axios from "../axios";

const shopCart = {
<<<<<<< HEAD
  addToShopCart({ fid, count }) {
    return axios.post("/shopCart/addToShopCart", {
      fid,
      count,
    });
  },
  getMyShopCartTotalInfo() {
    return axios.get("/shopCart/getMyShopCartTotalInfo");
  },
  getListByPage(pageIndex) {
    return axios.get("/shopCart/getListByPage", {
      params: {
        pageIndex,
      },
    });
  },
=======
	addToShopCart({ fid, count }) {
		return axios.post("/shopCart/addToShopCart", {
			fid,
			count
		});
	}
>>>>>>> 6ee3c0a8570d7d7438e71b510b4b18d7d2c00cc6
};

export default shopCart;
