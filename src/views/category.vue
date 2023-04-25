<template>
    <page-view class="flex-column">
        <title-bar>分类</title-bar>
        <div class="content-box flex-row flex-1">
            <ul class="left">
                <li v-for="(item,index) in allCategoryInfoList" :key="item.id" :class="[index==selectedIndex?'selected':'null']" @click="selectedIndex=index">
                    {{ item.category_name }}
                </li>
            </ul>
            <div class="right flex-1">
                <div class="wrapper" ref="wrapper">
                    <div class="content">
                        <div class="food-list-box" v-for="(item) in allCategoryInfoList" :key="item.id">
                            <h3 class="text-primary" ref="categoryName">{{ item.category_name }}</h3>
                            <food-item v-for="(subItem) in item.foodInfoList" :key="subItem.id" :fitem="subItem"></food-item>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </page-view>
</template>

<script>
import Api from "../utils/Api"
import foodItem from "../components/food-item.vue"
import BScroll from "better-scroll"
export default {
    name:"category",
    data(){
        return {
            allCategoryInfoList:[],
            selectedIndex:-1,
            scroll:null
        }
    },
    created(){
        this.getCategoryInfoList();
    },
    methods:{
        async getCategoryInfoList(){
            this.showLoading("分类信息加载中...")
            setTimeout(async () => {
                let results = await Api.categoryInfo.getAllList();
                this.allCategoryInfoList = results;
            },3000)
        }
    },
    mounted(){
        this.$nextTick(() => {
            if(!this.scroll){
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true
                });
                this.scroll.refresh();
            }
        })
    },
    updated(){
        if(this.scroll){
            this.scroll.refresh();
        }
    },
    watch:{
        selectedIndex(newValue){
            console.log(this.$refs.categoryName[newValue]);
            this.scroll.scrollToElement(this.$refs.categoryName[newValue],500)
        }
    },
    components:{
        foodItem
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/comm.scss';
    .content-box{
        .left{
            width:1rem;
            background-color:#eee;
            font-size:.12rem;
            li{
                height:.4rem;
                display: flex;
                justify-content: center;
                align-items: center;
                &.selected{
                    font-weight:bold;
                    color:$primaryColor;
                    background:#fff;
                }
            }
        }
        .right{
            overflow:auto;
            .wrapper{
                height:100%;
                overflow: hidden;
                @media only screen and (min-width:769px){
                    &{
                        overflow: auto;
                    }
                }
            }
        }
    }
</style>
