<template>
    <page-view class="flex-column" v-if="!isLoading">
        <title-bar :show-back="true" @back="$router.back()">菜品详情</title-bar>
        <div class="content-box flex-1">
            <div class="wrapper" ref="wrapper">
                <div class="content">
                    <div class="img-box">
                        <img v-lazy="baseURL + foodDetail.food_img" alt="">
                        <div class="right-icon-box" @click="addToShopCart">
                            <span class="iconfont icontianjia1"></span>
                            购物车
                        </div>
                    </div>
                    <!-- 菜品信息 -->
                    <div class="food-info">
                        <div class="food-info-item">
                            <p><span>菜品名称</span>{{foodDetail.food_name}}</p>
                        </div>
                        <div class="food-info-item">
                            <p><span>菜品价格</span>{{foodDetail.price}}</p>
                        </div>
                        <div class="food-info-item">
                            <p><span>菜品分类</span>{{foodDetail.categoryInfo.category_name}}</p>
                        </div>
                        <div class="food-info-item food-desc">
                            {{foodDetail.food_desc}}
                        </div>
                    </div>
                    <div class="comment-list">
                        <h3 class="text-primary">最新评论</h3>
                        <loading-box v-if="isLoadComment">正在加载评论中...</loading-box>
                        <comment-item v-for="(item) in commentList" :key="item.id" :citem="item"></comment-item>
                        <p v-if="commentList.length == 0" class="flex-row j-c text-second">暂无评论</p>
                    </div>
                    <p v-if="pageIndex == pageCount && isLoadComment == false" style="color:#ccc;text-align:center;padding:.1rem;">---我是有底线的---</p>
                </div>
            </div>
        </div>
        <shop-cart-bar ref="shopCartBar" @click="toShopCartList"></shop-cart-bar>
    </page-view>
</template>

<script>
import commentItem from "../components/comment-item.vue";
import Api from "../utils/Api";
import loadingBox from '../components/loading-box.vue';
import shopCartBar from '../components/shop-cart-bar.vue'
import BScroll from "better-scroll";
export default {
    //这里设置你的组件名，可以不写，如果部写，你的文件名就是你的组件名
    name:"foodDetail",
    data(){
        return {
            foodDetail:{
                id:null
            },
            //用于v-if显示隐藏页面使用
            isLoading:true,
            isLoadComment:true,
            pageIndex:1,
            pageCount:1,
            totalCount:0,
            pageStart:1,
            pageEnd:1,
            commentList:[],
            scroll:null
        }
    },
    components:{
        commentItem,
        loadingBox,
        shopCartBar
    },
    created(){
        this.foodDetail.id = this.$route.query.id;
        this.getFoodDetailById(this.foodDetail.id);
        this.getCommentList(this.foodDetail.id,this.pageIndex)
    },
    methods: {
        toShopCartList() {
            this.$router.push({name:"shopCartList"})
        },
        async addToShopCart() {
            let results = await Api.shopCart.addToShopCart({
                fid: this.foodDetail.id,
                count:1
            })
            this.$msg.success("添加购物车成功");
            this.$refs.shopCartBar.getMyShopCartTotalInfo();
            console.log(results);
        },
        async getFoodDetailById(id){
            this.isLoading = true;
            this.showLoading("正在加载菜品数据...")
            let results = await Api.foodInfo.findById(id);
            this.foodDetail = results;
            console.log(results)
            this.isLoading = false;
        },
        async getCommentList(fid,pageIndex=1){
            this.isLoadComment = true;
            let results = await Api.commentInfo.getCommentInfoListByFid({fid,pageIndex});
            this.pageIndex = results.pageIndex;
            this.pageCount = results.pageCount;
            this.totalCount = results.totalCount;
            this.pageStart = this.pageStart;
            this.pageEnd = this.pageEnd;
            this.commentList.push(...results.listData);
            this.isLoadComment = false;
        },
        setBetterScroll(){
            if(!this.scroll){
                this.scroll = new BScroll(this.$refs.wrapper,{
                    click:true,
                    pullUpLoad:true,
                    pullDownRefresh:true
                });
                this.scroll.on("pullingUp",async ()=>{
                    if(this.pageIndex < this.pageCount && this.isLoadComment == false){
                        let newIndex = +this.pageIndex + 1;
                        await this.getCommentList(this.foodDetail.id,newIndex);
                        this.scroll.finishPullUp();
                    }
                });
                this.scroll.on("pullingDown",async ()=>{
                    //下拉刷新可以理解成重新查询第一页的数据，因为最新的数据一般都在最上面
                    this.pageIndex = 1;
                    this.commentList = [];
                    await this.getCommentList(this.foodDetail.id,this.pageIndex);
                    this.scroll.finishPullDown();
                })
            }else{
                this.$nextTick(()=>{
                    this.scroll.refresh();
                })
            }
        }
    },
    updated(){
        this.setBetterScroll();
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/comm.scss';
    .content-box{
        .img-box{
            height:2.2rem;
            position: relative;
            img{
                width:100%;
                height:100%;
                object-fit: cover;
            }
            .right-icon-box{
                position: absolute;
                top:.1rem;
                right:.1rem;
                font-size:.12rem;
                color:$primaryColor;
                padding:.05rem;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius:.1rem;
                height:.1rem;
                background-color:rgba($color:#fff,$alpha:0.8);
                font-weight:bold;
            }
        }
        .food-info{
            box-sizing: border-box;
            padding:.05rem;
            border-bottom:solid 1px #ececec;
            .food-info-item{
                font-size:.14rem;
                line-height:1.9;
                span{
                    font-weight:bold;
                }
            }
            .food-desc{
                text-indent:2em;
            }
        }
        .comment-list{
            h3{
                margin:.05rem 0;
            }

        }
    }
    .wrapper{
        height:100%;
        overflow: hidden;
        @media only screen and (min-width:769px){
            &{
                overflow:auto;
            }
        }
    }
</style>
