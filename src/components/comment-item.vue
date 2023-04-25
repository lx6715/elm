<template :item="item" :isComment="isComment">
	<div class="comment-item">
		<div class="row flex-row a-c j-s-b">
			<div class="left-user-img">
				<img v-lazy="baseURL + item.userInfo.user_photo" alt="" />
				<span class="nick-name">{{ item.userInfo.nickName }}</span>
			</div>
			<div class="right">
				<div class="right-date">{{ item.create_time | DataFormat }}</div>
				<div class="right-star">
					<span v-for="(star, index) in getStar" :key="index" :class="['iconfont', 'iconStar', [star ? 'star-light' : null]]"> </span>
				</div>
			</div>
		</div>
		<div class="comment-text"> {{ item.comment_text }} </div>
	</div>
</template>

<script>
import { DataFormat } from "../filters/DataFormat";
export default {
	name: "comment-item",
	props: {
		item: {
			type: Object,
			required: true
		},
		isComment: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	computed: {
		getStar() {
			let stars = [];
			for (var i = 0; i < 5; i++) {
				i < this.item.star ? stars.push(1) : stars.push(0);
			}
			return stars;
		}
	},
	filters: {
		DataFormat
	}
};
</script>

<style lang="scss" scoped>
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

		.right-star {
			text-align: right;
			letter-spacing: 5px;
		}

		.star-light {
			color: #f00;
		}
	}
	.comment-text {
		line-height: 1.9;
		font-size: 0.14rem;
		padding: 0.05rem 0;
		border-bottom: solid 1px #ececec;
	}
}
</style>
