<template>
  <div id="comment">
<!--    <keep-alive>-->
      <router-view></router-view>
<!--    </keep-alive>-->
    <div class="footer">
      <van-tabbar
          v-model="active"
          active-color="red"
          inactive-color="gray"
      >
        <van-tabbar-item icon="wap-home-o" @click="jump('/mall')">商城</van-tabbar-item>
        <van-tabbar-item icon="wap-nav" @click="jump('/classify')">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart" @click="jump('/shoppingCar')">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" @click="jump('/me')">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  components: {},
  props: {},
  data() {
    return {
      active:""
    };
  },
  methods: {
    jump(path){
      this.$router.push(path)
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#comment {
  .footer {
  }
}
</style>
