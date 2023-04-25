<template :item="item">
	<div class="food-item" @click="toFoodDetail(item)">
		<div class="left-img">
			<img v-lazy="baseURL + item.food_img" alt="" />
		</div>
		<div class="right-box">
			<div class="food-name">{{ item.food_name }}</div>
			<div class="sale-count text-second">月销：{{ item.saleCount }}</div>
			<div class="price">价格:{{ item.price }}</div>
		</div>
		<span class="iconfont iconheart text-second"></span>
	</div>
</template>

<script>
export default {
	name: "food-item",
	props: {
		item: {
			type: Object,
			required: true
		}
	},

	methods: {
		toFoodDetail(item) {
			this.$router.push({ name: "foodDetail", query: { id: item.id } });
		}
	}
};
</script>

<style lang="scss" scoped>
.food-item {
	display: flex;
	padding: 0.03rem;
	box-sizing: border-box;
	border-bottom: solid 1px #ececec;
	position: relative;

	.left-img {
		width: 1.1rem;
		height: 0.8rem;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.right-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 0.14rem;
		padding-left: 0.05rem;

		.food-name {
			font-size: 0.18rem;
			font-weight: bold;
		}
	}

	.iconheart {
		position: absolute;
		right: 0.1rem;
		top: 0.1rem;
		display: block;
		padding: 0.02rem;
		border-radius: 50%;
		box-shadow: 0 0 10px #aaa;
	}
}
</style>
