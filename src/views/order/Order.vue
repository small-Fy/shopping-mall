<template>
  <div id="order">
    <div class="top">
      <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="tags">
      <van-tabs v-model="active">
        <van-tab title="全部">
          <div class="text" v-if="!login">请先登录吧~~~</div>
          <allOrder v-else></allOrder>
        </van-tab>
        <van-tab title="待支付"><div class="text">暂无需要支付的订单哦~~~</div></van-tab>
        <van-tab title="待发货"><div class="text">暂无数据~~~</div></van-tab>
        <van-tab title="待收货"><div class="text">暂无数据~~~</div></van-tab>
        <van-tab title="已完成">
          <div class="text" v-if="!login">请先登录吧~~~</div>
          <Completed v-else></Completed>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import allOrder from "../../components/me/OrderMe";
  import Completed from "../../components/me/Completed";
export default {
  name: "Order",
  components: {
    allOrder,
    Completed
  },
  props: {},
  data() {
    return {
      // 标签显示
      active: 1
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/me");
    }
  },
  mounted() {
    this.active=this.$route.query.num;
  },
  created() {},
  filters: {},
  computed: {
    login() {
      return this.$store.state.userInfo;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#order {
  .tags{
    .van-tabs__wrap--scrollable .van-tab{
      flex: none;
      -webkit-flex: none;
    }
    .text{
      text-align: center;
      margin-top: 50px;
      font-size: 18px;
      color: #999;
    }
  }
}
</style>
