<template>
	<page-view class="flex-column">
		<title-bar>分类</title-bar>
		<div class="content-box flex-row flex-1">
			<ul class="left">
				<li
					v-for="(item, index) in categoryList"
					:key="item.id"
					@click="currentIndex = index"
					:class="[index == currentIndex ? 'selected' : null]">
					{{ item.category_name }}
				</li>
			</ul>
			<div class="right flex-1">
				<div class="wrapper" ref="wrapper">
					<div class="content">
						<div class="food-list-box" v-for="item in categoryList" :key="item.id">
							<h3 class="text-primary" ref="categoryName">{{ item.category_name }}</h3>
							<foodItem v-for="food in item.foodInfoList" :key="food.id" :item="food"></foodItem>
						</div>
					</div>
				</div>
			</div>
		</div>
	</page-view>
</template>

<script>
import BScroll from "better-scroll";
import API from "../utils/api";
import foodItem from "../components/food-item.vue";
export default {
	name: "category",
	data() {
		return {
			currentIndex: 0,
			categoryList: [],
			scroll: null
		};
	},

	methods: {
		async getCategoryList() {
			let result = await API.categoryInfo.getAllList();
			this.categoryList = result;
			console.log("result: ", result);
			return;
		}
	},

	created() {
		this.getCategoryList();
	},

	mounted() {
		this.$nextTick(() => {
			if (!this.scroll) {
				this.scroll = new BScroll(this.$refs.wrapper, {
					// pullUpLoad: {
					// 	threshold: 10,
					// 	stop: 0
					// },
					// pullDownRefresh: {
					// 	threshold: 10,
					// 	stop: 0
					// },
					// bounceTime: 1000,
					// scrollX: true,
					// scrollY: true,
					// mouseWheel: true
					click: true
				});
				this.scroll.refresh();
			}
		});
	},
	updated() {
		if (this.scroll) {
			this.scroll.refresh();
		}
	},
	watch: {
		currentIndex(newValue) {
			this.scroll.scrollToElement(this.$refs.categoryName[newValue], 450);
		}
	},
	components: {
		foodItem
	}
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/comm.scss";
.content-box {
	.content-box {
		.left {
			width: 1rem;
			background-color: #eee;
			font-size: 0.12rem;
			li {
				height: 0.4rem;
				display: flex;
				justify-content: center;
				align-items: center;
				&.selected {
					font-weight: bold;
					color: $primary;
					background: #fff;
				}
			}
		}
		.right {
			overflow: auto;
			.wrapper {
				height: 100%;
				overflow: hidden;
				@media only screen and (min-width: 769px) {
					& {
						overflow: auto;
					}
				}
			}
		}
	}
}
</style>
