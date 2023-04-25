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
</style>
