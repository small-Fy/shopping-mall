<template>
  <div id="ordersettlement">
    <div class="top">
      <van-nav-bar
        title="订单结算"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <div class="address">
      <!--        当默认地址为空-->
      <div class="text" @click="chooseAddress" v-if="!isDefault && !address">
        点击添加收货地址
      </div>
      <!--        当有默认地址-->
      <div class="selectedAddress" v-if="isDefault && !address">
        <div class="top">
          <div class="left">
            <van-icon name="location" />
          </div>
          <div class="center">
            <div class="top" v-if="defaultAdd">
              <div class="name">收货人：{{ defaultAdd.name }}</div>
              <div class="tel" v-if="defaultAdd">
                {{ defaultAdd.tel }}
              </div>
            </div>
            <div class="bottom" v-if="defaultAdd">收货地址：{{ defaultAdd.address }}</div>
            <div class="tips">(收货不便时，可选择免费待收货服务)</div>
          </div>
          <div class="right" @click="chooseAddress">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <!--        当获取到用户选用的地址时-->
      <div class="selectedAddress" v-else>
        <div class="top">
          <div class="left">
            <van-icon name="location" />
          </div>
          <div class="center">
            <div class="top" v-if="address">
              <div class="name" v-if="address">收货人：{{ address.name }}</div>
              <div class="tel" v-if="address">
                {{ address.tel }}
              </div>
            </div>
            <div class="bottom" v-if="address">收货地址：{{ address.address }}</div>
            <div class="tips">(收货不便时，可选择免费待收货服务)</div>
          </div>
          <div class="right" @click="chooseAddress">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <div class="img">
        <img src="../../assets/images/caitiao.jpg" alt="" />
      </div>
    </div>
    <!--    从购物车商品信息-->
    <div class="goods" v-if="!idDirect">
      <div class="item" v-for="(item, index) in orderList" :key="index">
        <div class="shopImg" v-if="item.image_path">
          <img :src="item.image_path" alt="商品图片" />
        </div>
        <div class="info" v-if="item.name">
          <div class="name">{{ item.name }}</div>
          <!--              价格与数量-->
          <div class="priceNum">
            <div class="present_price" v-if="item">
              ￥{{ item.present_price.toFixed(2) }}
            </div>
            <div class="present_num" v-if="item">*{{ item.count }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--    立即购买的商品信息-->
    <div class="goods" v-else>
      <div class="item">
        <div class="shopImg" v-if="goods">
          <img :src="goods.image_path" alt="商品图片" />
        </div>
        <div class="info" v-if="goods.name">
          <div class="name">{{ goods.name }}</div>
          <!--              价格与数量-->
          <div class="priceNum">
            <div class="present_price" v-if="goods">
              ￥{{ goods.present_price.toFixed(2) }}
            </div>
            <div class="present_num" v-if="goods">*{{ goods.count }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--    提交订单-->
    <div class="bottem">
      <van-submit-bar
        :price="sum"
        button-text="提交订单"
        @submit="onSubmit"
      ></van-submit-bar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Ordersettlement",
  components: {},
  props: {},
  data() {
    return {
      shopList: [],
      orderList: [],
      // 用户默认地址
      defaultAdd: {},
      // 用户所有地址
      allAddress: [],
      // 立即购买传过来的商品信息
      goods: {},
      isDefault: false,
      // 选中的用户地址
      address: {},
      // 用来判断是购物车结算还是直接购买,false为购物车购买
      idDirect: false,
      // 提交订单的信息
      args: {},
      // 订单中所有的_id
      id: [],
      // 总价
      sum: 0,
    };
  },
  methods: {
    onClickLeft() {
      localStorage.removeItem("orderList");
      localStorage.removeItem("goods");
      this.$router.go(-1);
    },
    // 获取购物车数据
    async getCard() {
      try {
        let res = await this.$api.getCard();
        this.shopList = res.shopList;
      } catch (e) {
        console.log(e);
      }
    },
    // 添加地址
    chooseAddress() {
      this.$router.push("/address");
    },
    // 提交订单
    async onSubmit() {
      // 通过购物车购买
      if (!this.idDirect) {
        // 用默认地址提交订单
        if (this.isDefault) {
          this.args.address = this.defaultAdd.address;
          this.args.tel = this.defaultAdd.tel;
          this.args.count = this.orderList.length;
          this.orderList.map(item => {
            this.id.push(item.cid);
          });
          this.args.orderId = this.id;
          this.args.totalPrice = this.sum / 100;
          this.args.idDirect = this.idDirect;
          try {
            let res = await this.$api.placeOrder({ ...this.args });
            if (res.code === 200) {
              this.$toast(res.msg);
              console.log(444);
              localStorage.removeItem("orderList");
              localStorage.removeItem("goods");
            }
          } catch (e) {
            console.log(e);
          }
        }
        // 用选中的地址提交订单
        else {
          this.args.address = this.address.address;
          this.args.tel = this.address.tel;
          this.args.count = this.orderList.length;
          this.orderList.map(item => {
            this.id.push(item.cid);
          });
          this.args.orderId = this.id;
          this.args.totalPrice = this.sum / 100;
          this.args.idDirect = this.idDirect;
          try {
            let res = await this.$api.placeOrder({ ...this.args });
            if (res.code === 200) {
              this.$toast(res.msg);
              console.log(333);
              localStorage.removeItem("orderList");
              localStorage.removeItem("goods");
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        // 用默认地址提交订单
        if (this.isDefault) {
          this.args.address = this.defaultAdd.address;
          this.args.tel = this.defaultAdd.tel;
          this.args.count = this.goods.count;
          this.id.push(this.goods.id);
          this.args.orderId = this.id;
          this.args.totalPrice = this.sum / 100;
          this.args.idDirect = true;
          try {
            let res = await this.$api.placeOrder({ ...this.args });
            if (res.code === 200) {
              this.$toast(res.msg);
              console.log(111);
              localStorage.removeItem("orderList");
              localStorage.removeItem("goods");
            }
          } catch (e) {
            console.log(e);
          }
        }
        // 用选中的地址提交订单
        else {
          this.args.address = this.address.address;
          this.args.tel = this.address.tel;
          this.args.count = this.goods.count;
          this.id.push(this.goods.id);
          this.args.orderId = this.id;
          this.args.totalPrice = this.sum / 100;
          this.args.idDirect = true;
          try {
            let res = await this.$api.placeOrder({ ...this.args });
            if (res.code === 200) {
              this.$toast(res.msg);
              console.log(222);
              localStorage.removeItem("orderList");
              localStorage.removeItem("goods");
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    },
    // 得到用户的所有地址
    async getAddress() {
      try {
        let res = await this.$api.getAddress();
        this.allAddress = res.address;
        this.allAddress.map(item => {
          item.address = `${item.province}${item.city}${item.county}${item.addressDetail}`;
          if (item.isDefault) {
            this.defaultAdd = item;
            this.isDefault = true;
          }
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 求总价
    getsum() {
      if (!this.idDirect) {
        this.orderList.map(item => {
          if (item.check) {
            this.sum += item.present_price * item.count;
          }
        });
        this.sum = this.sum * 100;
      } else {
        this.sum = this.goods.present_price * 100;
      }
    },
    getChooseAddress() {
      this.address = this.$route.query.address;
      console.log(this.address,888);
      this.isDefault = false;
    },
    getOrderList(){
      if(localStorage.orderList){
        this.orderList = JSON.parse(localStorage.getItem("orderList"));
      }
    },
    getGoods(){
      if(localStorage.goods){
        this.orderList = [];
        this.goods = JSON.parse(localStorage.getItem("goods"));
        this.idDirect=true;
      }
    }
  },
  mounted() {
    this.getChooseAddress();
    this.getOrderList();
    this.getGoods();
    console.log(this.goods,654564);
    this.getCard();
    this.getAddress();
    this.getsum();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#ordersettlement {
  .address {
    margin-top: 20px;
    .text {
      text-align: center;
      height: 80px;
      line-height: 80px;
      font-size: 14px;
    }
    .selectedAddress{
      .top {
        display: flex;
        .left {
          width: 12%;
          text-align: center;
          margin-top: 23px;
        }
        .center {
          width: 88%;
          color: #333;
          .top {
            display: flex;
            justify-content: space-between;
            .tel {
              margin-right: 20px;
            }
          }
          .bottom {
            margin-top: 10px;
            font-size: 14px;
          }
          .tips {
            font-size: 12px;
            color: #ffcb6d;
            margin-top: 10px;
          }
        }
        .right {
          margin-top: 23px;
          margin-right: 10px;
        }
      }
    }
    .img {
      width: 100%;
      height: 2px;
      img {
        width: 100%;
        height: 3px;
      }
    }
  }
  .goods {
    margin-top: 50px;
    .item {
      display: flex;
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
          font-size: 12px;
        }
        .priceNum {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          .present_price {
            color: red;
          }
          .count {
            display: flex;
            img {
              width: 20px;
            }
            .text {
              position: relative;
              top: 2px;
            }
            .jian {
              margin-right: 10px;
            }
            .plus {
              margin-left: 10px;
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
