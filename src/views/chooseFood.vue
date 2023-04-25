<template>
    <page-view class="flex-column">
        <title-bar>点餐
            <template #right-menu>
                <span class="iconfont iconyonghuming"></span>
            </template>
        </title-bar>
        <div class="content-box flex-1">
            <div class="wrapper" ref="wrapper">
                <div class="content">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in bannerImgList" :key="index"><img :src="item" alt=""></div>
                        </div>
                        <!-- 轮播图分页器 -->
                        <div class="swiper-pagination"></div>
                    </div>
                    <div class="food-list">
                        <food-item v-for="(item) in foodList" :key="item.id" :fitem="item"></food-item>
                        <loading-box v-if="isShowLoading">餐品加载中...</loading-box>
                    </div>
                </div>
            </div>
        </div>
    </page-view>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import foodItem from '../components/food-item.vue'
import Api from '../utils/Api'
import BScroll from 'better-scroll'
import loadingBox from '../components/loading-box.vue'
export default {
    name:"chooseFood",
    data(){
        return {
            pageCount:0,
            pageEnd:0,
            pageIndex:1,
            pageStart:1,
            totalCount:0,
            foodList:[],
            scroll:null,
            //用来显示隐藏loading动画的数据依据
            isShowLoading:false,
            bannerImgList:[]
        }
    },
    created(){
        this.query();
    },
    updated(){
        this.Swiper = new Swiper('.swiper-container',{
            speed:300,
            autoplay:{
                delay:2000,
                disableOnInteraction: false
            },
            loop:true,
            pagination:{el:'.swiper-pagination'}
        });
        if(this.scroll){
            this.scroll.refresh();
        }
    },
    watch:{
        foodList:{
            deep:true,
            handler(newValue){
                //如果有上拉加载，foodList就会随时有变化
                if(!this.scroll){
                    //第一次改变foodList的时候
                    //这里为什么要跨生命周期调用，因为我们在改变数据的时候，可能页面还没有加载好
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.wrapper,{
                            //开启上拉加载
                            pullUpLoad:true,
                            click:true
                        });
                        this.scroll.on("pullingUp",async () => {
                            //上拉加事件触发后，我们就要加载下一页数据
                            if(this.pageIndex < this.pageCount && this.isShowLoading == false){
                                let newPageIndex = +this.pageIndex + 1;
                                await this.query(newPageIndex);
                                //告诉插件，数据已经开始请求了，可以结束这个上拉事件
                                this.scroll.finishPullUp();
                            }else{
                                this.scroll.finishPullUp();
                            }
                        })
                    })
                }else{
                    //后面做上拉加载，再次改变foodList的时候
                    this.scroll.refresh()
                }
            }
        }

    },
    components:{foodItem,loadingBox},
    methods:{
        //创建方法执行菜品数据的请求
        async query(pageIndex=1){
            this.isShowLoading = true;
            setTimeout(async () => {
                let results = await Api.foodInfo.getListByPage({pageIndex:pageIndex});
                console.log(results);
                this.pageCount = results.pageCount;
                this.pageEnd = results.pageEnd;
                this.pageIndex = results.pageIndex;
                this.pageStart = results.pageStart;
                this.totalCount = results.totalCount;
                this.foodList.push(...results.listData);
                //把第一页的前4个数据切出来拼成一个新数据赋值给list
                let list = this.foodList.slice(0,4);
                //判断list是否有值，因为有可能请求失败
                if(list.length > 0){
                    //遍历list拼接上服务器地址，赋值给data中的bannerImgList
                    this.bannerImgList = list.map(item => {
                        return this.baseURL + item.food_img;
                    })
                }
                this.isShowLoading = false;
            },3000)
        }
    }
}
</script>

<style lang="scss" scoped>
    .swiper-slide{
        background-color:#f00;
        height:2rem;
        width:100%;
        overflow: hidden;
        img{
            width:100%;
            height:100%;
            object-fit: cover;
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
