<template>
  <div class="loading-box">
    <img src="../assets/img/loading2.gif" alt="">
    <slot>加载中...</slot>
  </div>
</template>

<script>
export default{
  name:"loading-box"
}
</script>

<style lang="scss" scoped>
.loading-box{
  width: 100%;
  height: .5rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: .45rem;
    height: .45rem;
    margin-right: .05rem;
  }
}
</style>