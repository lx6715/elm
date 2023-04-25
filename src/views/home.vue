<template>
    <page-view class="flex-column">
        <div class="content-box flex-1">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <ul class="tab-bar flex-row j-s-a">
            <router-link :to="{name:'chooseFood'}" custom #default="{navigate,isActive}">
                <li :class="{'text-primary':isActive}" @click="navigate">
                    <span class="iconfont iconcanju"></span>点餐
                </li>
            </router-link>
            <router-link :to="{name:'order'}" custom #default="{navigate,isActive}">
                <li :class="{'text-primary':isActive}" @click="navigate">
                    <span class="iconfont icondingdan"></span>订餐
                </li>
            </router-link>
            <router-link :to="{name:'category'}" custom #default="{navigate,isActive}">
                <li :class="{'text-primary':isActive}" @click="navigate">
                    <span class="iconfont iconfenlei"></span>分类
                </li>
            </router-link>
            <router-link :to="{name:'my'}" custom #default="{navigate,isActive}">
                <li :class="{'text-primary':isActive}" @click="navigate">
                    <span class="iconfont iconyonghuming"></span>我的
                </li>
            </router-link>
        </ul>
    </page-view>
</template>

<script>
export default {
    //这里设置你的组件名，可以不写，如果不写，你的文件名就是你的组件名
    name:"home"
}
</script>

<style lang="scss" scoped>
    .tab-bar{
        height:.55rem;
        border-top:solid 1px lightgray;
        background-color:#ececec;
        li{
            font-size:.14rem;
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            .iconfont{
                font-size:.22rem;
            }
        }
    }
</style>