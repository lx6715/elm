<template>
    <page-view class="flex-column my-page">
        <title-bar>我的</title-bar>
        <div class="content-box flex-1">
            <div class="flex-row menu-item">
                <div class="flex-row left  j-c a-c">
                    <span class="iconfont iconcrown-fill" style="color:#ffd804"></span>
                </div>
                <div class="center flex-1 flex-row a-c">
                    {{userInfo?`欢迎登录：${userInfo.nickName}`:'暂未登录'}}
                </div>
                <div class="right" @click="$router.push({name:'login'})" v-if="!userInfo">去登录</div>
            </div>
            <div class="flex-row menu-item" style="margin-top:.1rem">
                <div class="flex-row left  j-c a-c">
                    <span class="iconfont icongouwucheman" style="color:#008de1"></span>
                </div>
                <div class="center flex-1 flex-row a-c" @click="$router.push({name:'shopCartList'})">
                    购物车
                </div>
                <div class="right">
                    <span class="iconfont iconyoujiantou1"></span>
                </div>
            </div>
            <div class="flex-row menu-item">
                <div class="flex-row left  j-c a-c">
                    <span class="iconfont icondropbox" style="color:#5acc86"></span>
                </div>
                <div class="center flex-1 flex-row a-c">
                    历史订单
                </div>
                <div class="right">
                    <span class="iconfont iconyoujiantou1"></span>
                </div>
            </div>
            <div class="flex-row menu-item">
                <div class="flex-row left  j-c a-c">
                    <span class="iconfont iconlayout-fill" style="color:#6c76eb"></span>
                </div>
                <div class="center flex-1 flex-row a-c" @click="confirmLogOut">
                    退出登录
                </div>
                <div class="right">
                    <span class="iconfont iconyoujiantou1"></span>
                </div>
            </div>
        </div>
    </page-view>
</template>
<script>
import {mapGetters,mapActions} from "vuex";
export default {
    name:"my",
    computed:{
        //将vuex的数据导出
        ...mapGetters(["userInfo"])
    },
    methods: {
        ...mapActions(["logOut"]),
        confirmLogOut() {
            if (confirm("你确定退出吗？")) {
                this.logOut()
            }
        }
    }
}
</script>



<style lang="scss" scoped>
.my-page{
    background-color:#f7f7f7;
    .menu-item{
        background-color:#fff;
        height:.5rem;
        div{
            height:100%;
            font-size:.14rem;
        }
        .left{
            width:.4rem;
            .iconfont{
                font-size:.22rem;
            }
        }
        .center{
            border-bottom:1px solid #ececec;
        }
        .right{
            display:flex;
            align-items: center;
            justify-content: flex-end;
            width:.7rem;
            padding-right:.1rem;
            border-bottom:1px solid #ececec;
        }
    }
}

</style>
