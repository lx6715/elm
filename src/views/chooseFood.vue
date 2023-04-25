<template>
	<page-view class="flex-column">
		<title-bar
			>点餐
			<template #right-menu>
				<span class="iconfont iconyonghuming"></span>
			</template>
		</title-bar>
		<div class="content-box flex-1">
			<div class="wrapper" ref="wrapper">
				<div class="content">
					<div class="swiper-container">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(src, index) in slideshow" :key="index + 'src'">
								<img :src="baseURL + src" alt="" />
							</div>
						</div>
						<!-- 轮播图分页器 -->
						<div class="swiper-pagination"></div>
					</div>
					<div class="food-list">
						<food-item v-for="food in listData" :key="food.id" :item="food"></food-item>
						<loading v-if="isLoading">餐品正在加载中....</loading>
					</div>
				</div>
			</div>
		</div>
	</page-view>
</template>

<script>
import Swiper from "swiper";
import BScroll from "better-scroll";
import "swiper/css/swiper.css";
import foodItem from "../components/food-item.vue";
import loading from "../components/loading-box.vue";
import API from "@/utils/api";
export default {
	name: "chooseFood",
	data() {
		return {
			pageCount: 0,
			totalCount: 0,
			pageStart: 0,
			pageEnd: 0,
			pageIndex: 1,
			listData: [],
			scroll: null,
			isLoading: false,
			slideshow: []
		};
	},
	methods: {
		/**
		 * 获取菜品数据
		 */
		async query(pageIndex = 1) {
			this.isLoading = true;
			let result = await API.foodInfo.getListByPage({ pageIndex });
			this.pageCount = result.pageCount;
			this.totalCount = result.totalCount;
			this.pageStart = result.pageStart;
			this.pageEnd = result.pageEnd;
			this.pageIndex = result.pageIndex;
			this.listData.push(...result.listData);
			if (result.listData.length > 0) {
				this.slideshow = result.listData.slice(0, 4).map(item => item.food_img);
			}
			this.isLoading = false;
			return "加载完成";
		}
	},

	created() {
		this.query();
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

	watch: {
		listData: {
			deep: true,
			handler() {
				if (!this.scroll) {
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.wrapper, {
							pullUpLoad: true,
							click: true
						});
						this.scroll.on("pullingUp", async () => {
							//上拉加事件触发后，我们就要加载下一页数据
							if (this.pageIndex <= this.pageCount) {
								let newPageIndex = +this.pageIndex + 1;
								await this.query(newPageIndex);
								//告诉插件，数据已经开始请求了，可以结束这个上拉事件
								this.scroll.finishPullUp();
							} else {
								this.scroll.finishPullUp();
							}
						});
					});
				} else {
					this.scroll.refresh();
				}
			}
		}
	},

	components: {
		foodItem,
		loading
	}
};
</script>

<style lang="scss" scoped>
.swiper-slide {
	background-color: #f00;
	height: 2rem;
	width: 100%;
	overflow: hidden;
	img {
		width: 100%;
	}
}

.wrapper {
	height: 100%;
	overflow: hidden;
}
</style>
