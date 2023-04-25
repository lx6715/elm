<template>
	<page-view class="flex-column" v-show="!isLoading">
		<title-bar :show-back="true" @back="$router.back()">菜品详情</title-bar>
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<div class="content-box flex-1">
					<div class="img-box">
						<img v-lazy="baseURL + food.food_img" alt="" />
						<div class="right-icon-box" @click="addToShopCart">
							<span class="iconfont icontianjia1"></span>
							购物车
						</div>
					</div>
					<!-- 菜品信息 -->
					<div class="food-info">
						<div class="food-info-item">
							<p><span>菜品名称</span>{{ food.food_name }}</p>
						</div>
						<div class="food-info-item">
							<p><span>菜品价格</span>{{ food.price }}</p>
						</div>
						<div class="food-info-item">
							<p><span>菜品分类</span>{{ food.categoryInfo.category_name }}</p>
						</div>
						<div class="food-info-item food-desc"> {{ food.food_desc }} </div>
					</div>
					<div class="comment-list">
						<h3 class="text-primary">最新评论</h3>
						<loading-box v-if="isComment"></loading-box>
						<comment-item v-for="item in listData" :key="item.uid + (Math.random() % 10)" :item="item"></comment-item>
						<p v-if="listData.length == 0" style="color: #f00; text-align: center">暂无评论</p>
					</div>
				</div>
			</div>
		</div>
		<shop-cart-bar></shop-cart-bar>
	</page-view>
</template>

<script>
import "swiper/css/swiper.css";
import Swiper from "swiper";
import API from "@/utils/api";
import BScroll from "better-scroll";
import commentItem from "../components/comment-item.vue";
import loadingBox from "../components/loading-box.vue";
import shopCartBar from '../components/shop-cart-bar.vue';
export default {
	//这里设置你的组件名，可以不写，如果部写，你的文件名就是你的组件名
	name: "foodDetail",
	data() {
		return {
			isLoading: false,
			isComment: false,
			fid: null,
			food: {
				food_name: "",
				price: "",
				food_desc: "",
				food_img: "",
				categoryInfo: {
					category_name: ""
				}
			},

			pageIndex: "1",
			totalCount: 0,
			pageCount: 0,
			listData: [],
			pageStart: 0,
			pageEnd: 0,
			scroll: null
		};
	},

	created() {
		this.fid = this.$route.query.id;
		this.findById(this.fid);
		this.getCommentInfoListByFid(+this.fid, +this.pageIndex);
	},

	updated() {
		this.Swiper = new Swiper(".swiper-container", {
			speed: 300,
			autoplay: {
				delay: 1000,
				disableOnInteraction: false
			},
			loop: true,
			pagination: { el: ".swiper-pagination" }
		});
	},

	methods: {
		async addToShopCart() {
			await API.shopCart.addToShopCart({
				fid: this.fid,
				count: 1
			});
		},

		async findById(id) {
			this.isLoading = true;
			this.showLoading("商品信息正在加载中...");
			let result = await API.foodInfo.findById(id);
			this.food = result;
			this.isLoading = false;
			return;
		},

		async getCommentInfoListByFid(fid, pageIndex) {
			this.isComment = true;
			let result = await API.commentInfo.getCommentInfoListByFid(fid, pageIndex);
			this.pageCount = result.pageCount;
			this.totalCount = result.totalCount;
			this.pageStart = result.pageStart;
			this.pageEnd = result.pageEnd;
			this.pageIndex = result.pageIndex;
			this.listData.push(...result.listData);
			this.isComment = false;
			return;
		}
	},
	watch: {
		listData: {
			deep: true,
			handler() {
				if (!this.scroll) {
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.wrapper, {
							pullUpLoad: {
								threshold: 10,
								stop: 0
							},
							pullDownRefresh: {
								threshold: 10,
								stop: 0
							},
							bounceTime: 1000,
							scrollX: true,
							scrollY: true,
							mouseWheel: true,
							click: true
						});
						this.scroll.on("pullingUp", async () => {
							//上拉加事件触发后，我们就要加载下一页数据
							if (+this.pageIndex + 1 <= this.pageCount && this.isComment == false) {
								let newPageIndex = +this.pageIndex + 1;
								await this.getCommentInfoListByFid(this.fid, newPageIndex);
								//告诉插件，数据已经开始请求了，可以结束这个上拉事件
								this.scroll.finishPullUp();
							} else {
								this.scroll.finishPullUp();
							}
						});
						this.scroll.on("pullingDown", async () => {
							location.reload();
							/* this.listData = [];
							this.findById(this.fid);
							this.getCommentInfoListByFid(+this.fid, 1);
							this.scroll.finishPullDown(); */
						});
					});
				} else {
					this.scroll.refresh();
				}
			}
		}
	},
	components: {
		commentItem,
		loadingBox,
		shopCartBar
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/comm.scss";

.content-box {
	.img-box {
		height: 2.2rem;
		position: relative;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.right-icon-box {
			position: absolute;
			top: 0.1rem;
			right: 0.1rem;
			font-size: 0.12rem;
			color: $primary;
			padding: 0.05rem;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 0.1rem;
			height: 0.1rem;
			background-color: rgba($color: #fff, $alpha: 0.8);
			font-weight: bold;
		}
	}

	.food-info {
		box-sizing: border-box;
		padding: 0.05rem;
		border-bottom: solid 1px #ececec;

		.food-info-item {
			font-size: 0.14rem;
			line-height: 1.9;

			span {
				font-weight: bold;
			}
		}

		.food-desc {
			text-indent: 2em;
		}
	}

	.comment-list {
		h3 {
			margin: 0.05rem 0;
		}

		.comment-item {
			padding: 0.05rem;

			.row {
				font-size: 0.14rem;
				padding-bottom: 0.05rem;

				.left-user-img {
					display: flex;
					align-items: center;

					img {
						width: 0.4rem;
						height: 0.4rem;
						border-radius: 50%;
						margin-right: 0.1rem;
					}
				}

				.right-date {
					font-size: 0.12rem;
				}
			}

			.comment-text {
				line-height: 1.9;
				font-size: 0.14rem;
				padding: 0.05rem 0;
				border-bottom: solid 1px #ececec;
			}
		}
	}
}

.wrapper {
	height: 100%;
	overflow: hidden;
}
</style>
