<template>
  <div id="allOrder">
    <div class="goods">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="title">
          <div class="id">订单编号：{{ item.order_id }}</div>
          <div class="text">交易完成</div>
        </div>
        <div class="order" v-for="(el, num) in item.order_list" :key="num">
          <div class="shopImg">
            <img :src="el.image_path" alt="商品图片" />
          </div>
          <div class="info" v-if="el.name">
            <div class="name">{{ el.name }}</div>
            <!--              价格与数量-->
            <div class="priceNum">
              <div class="present_price">
                ￥{{ el.present_price.toFixed(2) }}
              </div>
              <div class="count">*{{ el.count }}</div>
            </div>
          </div>
        </div>
        <div class="tips">
          <div class="creatTime">
            {{ item.add_time }}
          </div>
          <div class="address">
            {{ item.address }}
          </div>
          <div class="price">
            <div class="count">共{{ item.order_list.length }}件商品</div>
            <div class="mallPrice">合计：{{ item.mallPrice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "allOrder",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      order_list: [],
      sum: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/me");
    },
    // 获取订单信息
    async getMyOrder() {
      try {
        let res = await this.$api.getMyOrder();
        if (res.code === 200) {
          this.list = res.list;
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getMyOrder();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.goods {
  .item {
    padding: 0 14px;
    .title {
      display: flex;
      margin-top: 20px;
      justify-content: space-between;
      font-size: 15px;
      .id {
      }
      .text {
        color: #ff761a;
      }
    }
    .order {
      display: flex;
      margin-top: 30px;
      .shopImg {
        width: 100px;
        border: 1px solid #f2f2f2;
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
          justify-content: space-between;
          .present_price {
            color: red;
          }
          .count {
            font-size: 8px;
            color: #a8a7ab;
          }
        }
      }
    }
    .tips {
      text-align: right;
      margin: 20px;
      font-size: 14px;
      color: #333;
      .address {
        margin: 10px 0;
      }
      .price {
        display: flex;
        justify-content: flex-end;
        .mallPrice {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
