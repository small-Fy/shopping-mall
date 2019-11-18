<template>
  <div id="Browse">
    <div class="top">
      <van-nav-bar
        title="最近浏览"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <div class="goods">
      <div class="item" v-for="(item, index) in allGoods" :key="index">
        <div class="shopImg">
          <img :src="item.image_path" alt="商品图片" />
        </div>
        <div class="info" v-if="item.name">
          <div class="name">{{ item.name }}</div>
          <!--              价格与数量-->
          <div class="priceNum">
            <div class="present_price">
              ￥{{ item.present_price.toFixed(2) }}
            </div>
            <del class="orl_price"> ￥{{ item.orl_price.toFixed(2) }} </del>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Browse",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.push("/me");
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {
    allGoods() {
      return this.$store.state.allGoods;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.goods {
  margin-top: 50px;
  .item {
    display: flex;
    margin-top: 20px;
    .shopImg {
      width: 100px;
      border: 1px solid #f2f2f2;
      margin: 0 10px;
      img {
        width: 100%;
      }
    }
    .info {
      width: 60%;
      .name {
        margin-top: 10px;
        font-size: 14px;
      }
      .priceNum {
        margin-top: 40px;
        display: flex;
        font-size: 12px;
        .present_price {
          color: red;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
