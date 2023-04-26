<<<<<<< HEAD
<template>
  <div class="comment-item">
      <div class="row flex-row a-c j-s-b">
          <div class="left-user-img">
              <img v-lazy="baseURL+citem.userInfo.user_photo" alt="">
              <span class="nick-name">{{citem.userInfo.nickName}}</span>
          </div>
          <div class="right">
            <div class="right-date">{{citem.create_time | formatData}}</div>
            <div style="text-align: right">
                <span  v-for="(item,index) in starArr" :key="index" :style="{color:item==1?'#ffd666':'#ccc'}" class="iconfont iconStar"></span>
            </div>
          </div>
      </div>
      <div class="comment-text">
          {{citem.comment_text}}
      </div>
  </div>
</template>

<script>
import { formatData } from "../filters/DataFilters.js"
export default {
    name: "comment-item",
    props: ["citem"],
    filters: {
        formatData
    },
    computed: {
        starArr() {
            if (this.citem) {
                let arr = new Array();
                for (let i = 1; i <= 5; i++){
                    if (i <= this.citem.star) {
                        arr.push(1);
                    } else {
                        arr.push(0);
                    }
                }
                return arr;
            } else {
                return [];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.comment-item{
              padding:.05rem;
              .row{
                  font-size:.14rem;
                  padding-bottom:.05rem;
                  .left-user-img{
                      display:flex;
                      align-items: center;
                      img{
                          width:.4rem;
                          height:.4rem;
                          border-radius:50%;
                          margin-right:.1rem;
                      }
                  }
                  .right-date{
                      font-size:.12rem;
                  }
              }
              .comment-text{
                  line-height:1.9;
                  font-size:.14rem;
                  padding:.05rem 0;
                  border-bottom:solid 1px #ececec;
              }
          }
=======
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
>>>>>>> 6ee3c0a8570d7d7438e71b510b4b18d7d2c00cc6
</style>
