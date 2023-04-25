<template>
        <div class="food-item" @click="toFoodDetail">
            <div class="left-img">
                <img v-lazy="baseURL+fitem.food_img" alt="">
            </div>
            <div class="right-box">
                <div class="food-name">{{fitem.food_name}}</div>
                <div class="sale-count text-second">月销：{{fitem.saleCount}}</div>
                <div class="price">价格：{{fitem.price}}</div>
            </div>
            <span class="iconfont iconheart text-second"></span>
        </div>
    
</template>

<script>
export default {
    name:"food-item",
    props:["fitem"],
    methods:{
        toFoodDetail(){
            this.$router.push({
                name:'foodDetail',
                query:{
                    id:this.fitem.id
                }
                //或者params:{id:this.fitem.id},用params需要在路由中设置变量接收path:"/foodDetail/:id"
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .food-item{
        display: flex;
        padding:.03rem;
        box-sizing:border-box;
        border-bottom:solid 1px #ececec;
        position: relative;
        .left-img{
            width:1.1rem;
            height:.8rem;
            img{
                width:100%;
                height:100%;
            }
        }
        .right-box{
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            font-size:.14rem;
            padding-left:.05rem;
            .food-name{
                font-size:.18rem;
                font-weight:bold;
            }
        }
        .iconheart{
            position: absolute;
            right:.1rem;
            top:.1rem;
            display:block;
            padding:.02rem;
            border-radius:50%;
            box-shadow:0 0 10px #aaa;
        }
    }

</style>