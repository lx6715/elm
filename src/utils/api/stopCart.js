import axios from "../axios";

const shopCart = {
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
};

export default shopCart;
