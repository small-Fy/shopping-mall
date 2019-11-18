<template>
  <div id="discuss">
    <div class="top">
      <van-nav-bar
        title="评价中心"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <div class="user">
      <div class="msg">
        <div class="img" v-for="(item,index) in evaluateOne.user" :key="index">
          <img :src="item.avatar" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="name" v-for="(item,index) in evaluateOne.user" :key="index">{{ item.nickname }}</div>
        <div class="star"><van-rate v-model="evaluateOne.rate" color="red" /></div>
      </div>
      <div class="time">
        {{ evaluateOne.comment_time }}
      </div>
    </div>
    <div class="discuss">评论内容：{{ evaluateOne.content }}</div>
    <div class="goods">
      <div class="item" v-for="(item, index) in evaluateOne.goods" :key="index">
        <div class="shopImg">
          <img :src="item.image_path" alt="商品图片" />
        </div>
        <div class="info" v-if="item.name">
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="priceNum">
          <div class="cancel" @click="addShop(item)">
            <van-icon name="shopping-cart" size="20px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EvaluationDetails",
  components: {},
  props: {},
  data() {
    return {
      // 接收商品信息
      goodsOne: {},
      // 商品评价
      evaluateOne:{}
    };
  },
  methods: {
    // 点击返回评价中心
    onClickLeft() {
      this.$router.push("/evaluation");
    },
    // 加入购物车
    async addShop(item) {
      try {
        let res = await this.$api.addShop(item.id);
        if (res.code === 200) {
          this.$toast("加入购物车成功");
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 查看单条评价
    async evaluate() {
      try {
        let res = await this.$api.evaluateOne(this.goodsOne._id);
        this.evaluateOne=res.evaluateOne;
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.goodsOne = this.$route.query.goodsOne;
    this.evaluate();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#discuss {
  .user {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 0 20px;
    .msg {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
      }
    }
    .right {
      .name {
      }
      .star {
        margin-top: 14px;
      }
    }
    .time {
      line-height: 50px;
      margin-right: 20px;
      font-size: 14px;
      color: #666;
    }
  }
  .discuss {
    margin: 20px 0 20px 20px;
    color: #333;
  }
  .goods {
    .item {
      display: flex;
      color: #333;
      .shopImg {
        width: 70px;
        border: 1px solid #f2f2f2;
        margin: 0 10px;
        img {
          width: 100%;
        }
      }
      .info {
        width: 60%;
        .name {
          line-height: 40px;
          font-size: 16px;
        }
      }
      .priceNum {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: #ffe6a2;
        margin-top: 40px;
        color: #e0322b;
        .cancel {
          padding: 7px;
        }
      }
    }
  }
}
</style>
