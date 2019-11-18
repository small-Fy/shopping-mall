<template>
  <div id="discuss">
    <div class="top">
      <van-nav-bar
        title="评价中心"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <div class="goods">
      <div class="img">
        <img :src="goods.image_path" alt="" />
      </div>
      <div class="right">
        <div class="text">商品评分</div>
        <div class="star">
          <van-rate v-model="value" color="red" />
        </div>
      </div>
    </div>
    <div class="discuss">
      <van-field
        v-model="discuss"
        placeholder="说说你的购买感受吧~~~"
        type="textarea"
      />
    </div>
    <div class="uploader">
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="choose">
      <div class="icon" @click="click" v-if="!flag">
        <img src="../../assets/images/未勾选.png" alt="" />
      </div>
      <div class="icon" @click="click" v-if="flag">
        <img src="../../assets/images/已勾选.png" alt="" />
      </div>
      <div class="text">匿名评价</div>
    </div>
    <div class="btn">
      <van-button type="primary" size="large" @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Discuss",
  components: {},
  props: {},
  data() {
    return {
      // 商品信息
      goods: {},
      // 评分默认5颗星
      value: 5,
      // 评价内容
      discuss: "",
      // 用于提交的整个评价信息
      args: {},
      image: [],
      flag: true
    };
  },
  methods: {
    // 点击返回评价中心
    onClickLeft() {
      this.$router.push("/evaluation");
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    click() {
      this.flag = !this.flag;
    },
    // 提交评价
    async submit() {
      this.args.id = this.goods.cid;
      this.args.rate = this.value;
      this.args.content = this.discuss;
      this.args.anonymous = this.flag;
      this.args._id = this.goods._id;
      this.args.order_id = this.goods.order_id;
      this.args.image = this.image;
      try {
        let res = await this.$api.comment({ ...this.args });
        if (res.code === 200) {
          this.$toast(res.msg);
          this.$router.push("evaluation");
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.goods = this.$route.query.goods;
    console.log(this.goods);
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
  .goods {
    display: flex;
    .img {
      width: 80px;
      height: 80px;
      margin-left: 20px;
      img {
        width: 100%;
      }
    }
    .right {
      margin-left: 20px;
      .text {
        margin-top: 10px;
        color: #333;
      }
      .star {
        margin-top: 20px;
      }
    }
  }
  .choose {
    display: flex;
    margin-left: 20px;
    .icon {
      width: 20px;
      height: 20px;
      img {
        width: 100%;
      }
    }
    .text {
      line-height: 20px;
      margin-left: 10px;
    }
  }
  .btn {
    margin-top: 50px;
  }
}
</style>
