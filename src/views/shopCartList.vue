<template>
  <page-view class="flex-column">
    <title-bar :show-back="true" @back="$router.back()">我的购物车</title-bar>
    <div class="content-box flex-1">
      <div class="wrapper" ref="wrapper">
        <div class="content">
          <swipe-cell v-for="item in shopCartList" :key="item.id">
            <template #content>
              <div class="shop-cart-item flex-row j-s-b">
                <div class="left">
                  <img v-lazy="baseURL + item.foodInfo.food_img" alt="" />
                </div>
                <div class="center flex-1 flex-column j-s-e">
                  <div class="food-name">{{ item.foodInfo.food_name }}</div>
                  <div class="price">￥{{ item.foodInfo.price }}</div>
                </div>
                <div class="right flex-row j-c j-se a-c">
                  <span
                    class="iconfont iconjianqu text-primary"
                    @click="
                      item.count--;
                      subFoodCount(item.fid);
                    "
                    v-if="item.count"
                  ></span>
                  <span>{{ item.count }}</span>
                  <span
                    class="iconfont icontianjia1 text-primary"
                    @click="
                      item.count++;
                      addFoodCount(item.fid);
                    "
                  ></span>
                </div>
              </div>
            </template>
            <button type="button" class="btn-delete" @click="showAS(item.id)">
              我不要了
            </button>
          </swipe-cell>
        </div>
        <loading-box v-if="isLoading"></loading-box>
        <p
          v-if="pageIndex == pageCount && isLoading == false"
          style="color: #ccc; text-align: center; padding: 0.1rem"
        >
          ---我是有底线的---
        </p>
      </div>
    </div>
    <shop-cart-bar ref="shopCartBar"></shop-cart-bar>
  </page-view>
</template>

<script>
import swipeCell from "vue-swipe-cell";
import loadingBox from "../components/loading-box.vue";
import BScroll from "better-scroll";
import shopCartBar from "../components/shop-cart-bar.vue";
import Api from "../utils/Api";
export default {
  name: "shopCartList",
  components: {
    swipeCell,
    loadingBox,
    shopCartBar,
  },
  data() {
    return {
      pageCount: 0,
      pageEnd: 0,
      pageIndex: 1,
      pageStart: 1,
      totalCount: 0,
      shopCartList: [],
      isLoading: false,
      scroll: null,
    };
  },
  created() {
    this.getListByPage();
  },
  updated() {
    this.setBetterScroll();
  },
  methods: {
    showAS(id) {
      this.showActionSheet({
        menuList: ["你确定不要吗"],
        callBack: async (index) => {
          if (index == 0) {
            await Api.shopCart.deleteMyShopCartFoodById(id);
            let i = this.shopCartList.findIndex((item) => item.id == id);
            if (i != -1) {
              this.shopCartList.splice(i, 1);
            }
            //刷新shop-cart-bar的数据
            this.$refs.shopCartBar.getMyShopCartTotalInfo();
          }
        },
      });
    },
    async addFoodCount(fid) {
      await Api.shopCart.addToShopCart({ fid, count: 1 });
      this.$refs.shopCartBar.getMyShopCartTotalInfo();
    },
    async subFoodCount(fid) {
      await Api.shopCart.addToShopCart({ fid, count: -1 });
      this.$refs.shopCartBar.getMyShopCartTotalInfo();
    },
    async getListByPage(pageIndex = 1) {
      this.isLoading = true;
      let resutls = await Api.shopCart.getListByPage(pageIndex);
      this.pageCount = resutls.pageCount;
      this.pageEnd = resutls.pageEnd;
      this.pageIndex = resutls.pageIndex;
      this.pageStart = resutls.pageStart;
      this.totalCount = resutls.totalCount;
      this.shopCartList.push(...resutls.listData);
      this.isLoading = false;
      console.log(resutls);
    },
    setBetterScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          pullUpLoad: true,
          pullDownRefresh: true,
        });
        this.scroll.on("pullingUp", async () => {
          if (this.pageIndex < this.pageCount && this.isLoading == false) {
            let newIndex = +this.pageIndex + 1;
            await this.getListByPage(newIndex);
            this.scroll.finishPullUp();
          }
        });
        this.scroll.on("pullingDown", async () => {
          //下拉刷新可以理解成重新查询第一页的数据，因为最新的数据一般都在最上面
          this.pageIndex = 1;
          this.commentList = [];
          await this.getListByPage(this.pageIndex);
          this.scroll.finishPullDown();
        });
      } else {
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shop-cart-item {
  height: 0.7rem;
  box-sizing: border-box;
  padding: 0.03rem;
  border-bottom: solid 1px #ececec;
  .left {
    width: 1.1rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .center {
    padding-left: 0.15rem;
    font-size: 0.12rem;
    .food-name {
      font-weight: bold;
      font-size: 0.16rem;
    }
  }
  .right {
    width: 0.9rem;
    font-size: 0.14rem;
    .iconfont {
      font-size: 0.2rem;
    }
  }
}
::v-deep .cell-content {
  padding: 0 !important;
}
.wrapper {
  height: 100%;
  overflow: hidden;
  @media only screen and (min-width: 769px) {
    & {
      overflow: auto;
    }
  }
}
</style>
