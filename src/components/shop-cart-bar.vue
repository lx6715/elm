<template>
<<<<<<< HEAD
    <div class="shop-cart-bar-box flex-row">
        <div class="left">
            <div class="icon-box bg-primary">
                <span class="iconfont icongouwucheman"></span>
                <span class="totalCount" v-if="userInfo">{{totalCount}}</span>
            </div>
        </div>
        <div class="center flex-1 flex-row j-c a-c" v-if="userInfo">
            共计：<span>{{totalPrice}}元</span>
        </div>
        <div class="center flex-1 flex-row j-c a-c" v-else>
            暂未登录
        </div>
        <div class="right flex-row a-c j-c" @click="$emit('click',$event)">去结算</div>
    </div>
</template>

<script>
import Api from '../utils/Api'
import {mapGetters} from 'vuex'
=======
  <div class="shop-cart-bar-box flex-row">
    <div class="left">
      <div class="icon-box bg-primary">
        <span class="iconfont icongouwucheman"></span>
        <span class="totalCount" v-if="userInfo">{{ totalCount }}</span>
      </div>
    </div>
    <div class="center flex-1 flex-row j-c a-c" v-if="userInfo">
      共计：<span>{{ totalPrice }}元</span>
    </div>
    <div class="center flex-1 flex-row j-c a-c" v-else>
      暂未登录
    </div>
    <div class="right flex-row a-c j-c">去结算</div>
  </div>
</template>

<script>
import API from '../utils/api';
import { mapGetters } from 'vuex';
>>>>>>> 6ee3c0a8570d7d7438e71b510b4b18d7d2c00cc6
export default {
  name: "shop-cart-bar",
  data() {
    return {
      totalCount: 0,
<<<<<<< HEAD
      totalPrice:0
      }
=======
      totalPrice: 0
    };
>>>>>>> 6ee3c0a8570d7d7438e71b510b4b18d7d2c00cc6
  },
  created() {
    this.getMyShopCartTotalInfo();
  },
  methods: {
    async getMyShopCartTotalInfo() {
      if (this.userInfo) {
<<<<<<< HEAD
        let results = await Api.shopCart.getMyShopCartTotalInfo();
        this.totalCount = results.totalCount || 0;
        this.totalPrice = results.totalPrice || 0;
      }
=======
        let results = await API.shopCart.getMyShopCartTotalInfo();
        this.totalCount = results.totalCount || 0;
        this.totalPrice = results.totalPrice || 0;
      }

>>>>>>> 6ee3c0a8570d7d7438e71b510b4b18d7d2c00cc6
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
<<<<<<< HEAD
}
</script>

<style lang="scss" scoped>
    .shop-cart-bar-box{
        background-color:#404042;
        height:.5rem;
        .left{
            width:.9rem;
            display:flex;
            justify-content: center;
            position: relative;
            .icon-box{
                position: absolute;
                bottom:0px;
                height:.6rem;
                width:.6rem;
                border-radius:50%;
                display:flex;
                justify-content: center;
                align-items: center;
                border:solid .06rem #404042;
                box-sizing: border-box;
                .iconfont{
                    color:#fff;
                    font-size:.36rem;
                }
                .totalCount{
                    position: absolute;
                    background-color:red;
                    color:#fff;
                    padding:.03rem;
                    border-radius:50%;
                    top:-.05rem;
                    right:-.05rem;
                }
            }
        }
        .center{
            color:#fff;
            font-size:.12rem;
            span{
                font-size:.18rem;
            }
        }
        .right{
            width:1.1rem;
            background-color:#535353;
            color:#ececec;
            font-size:.14rem;
        }
    }
</style>
=======
};
</script>

<style lang="scss" scoped>
.shop-cart-bar-box {
  background-color: #404042;
  height: .5rem;

  .left {
    width: .9rem;
    display: flex;
    justify-content: center;
    position: relative;

    .icon-box {
      position: absolute;
      bottom: 0px;
      height: .6rem;
      width: .6rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: solid .06rem #404042;
      box-sizing: border-box;

      .iconfont {
        color: #fff;
        font-size: .36rem;
      }

      .totalCount {
        position: absolute;
        background-color: red;
        color: #fff;
        padding: .03rem;
        border-radius: 50%;
        top: -.05rem;
        right: -.05rem;
      }
    }
  }

  .center {
    color: #fff;
    font-size: .12rem;

    span {
      font-size: .18rem;
    }
  }

  .right {
    width: 1.1rem;
    background-color: #535353;
    color: #ececec;
    font-size: .14rem;
  }
}
</style>
>>>>>>> 6ee3c0a8570d7d7438e71b510b4b18d7d2c00cc6
