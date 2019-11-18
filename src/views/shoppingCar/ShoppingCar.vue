<template>
  <div class="shoppingcart">
    <!--    标题-->
    <div class="title">
      <van-nav-bar title="购物车" />
    </div>
    <div>
      <!--    用户已登录时且购物车有数据时-->
      <div v-if="loginFlag && shopList.length !== 0" class="user">
        <!--        全选与合计-->
        <div class="totalAll">
          <!--          全选框-->
          <div class="img" @click="checkall">
            <img
              src="../../assets/images/已勾选.png"
              alt="选中方框"
              v-if="checkAll"
            />
            <img src="../../assets/images/未勾选.png" alt="方框" v-else />全选
          </div>
          <div class="total">
            合计:<Span>￥{{ sum }}</Span>
          </div>
        </div>
        <!--            结算与删除-->
        <div class="delset" v-if="check">
          <van-button color="#7232dd" size="small" @click="sendDel">
            删除
          </van-button>
          <van-button
            color="linear-gradient(to right, #4bb0ff, #6149f6)"
            size="small"
            @click="settlement"
          >
            去结算
          </van-button>
        </div>
        <!--        商品列表-->
        <div class="list">
          <div class="item" v-for="(item, index) in shopList" :key="index">
            <!--            商品详情-->
            <div class="shopDetal">
              <!--          选择框-->
              <div class="img" @click="checkone(item, item.cid)">
                <img
                  src="../../assets/images/已勾选.png"
                  alt="选中方框"
                  v-if="item.check"
                />
                <img src="../../assets/images/未勾选.png" alt="方框" v-else />
              </div>
              <!--          商品图片-->
              <div class="shopImg">
                <img :src="item.image_path" alt="商品图片" />
              </div>
              <!--            商品信息-->
              <div class="info">
                <div class="name">{{ item.name }}</div>
                <!--              价格与数量-->
                <div class="priceNum">
                  <div class="present_price">
                    ￥{{ item.present_price.toFixed(2) }}
                  </div>
                  <div class="count">
                    <div class="jian" @click="reduce(item)">
                      <img src="../../assets/images/减.png" alt="减" />
                    </div>
                    <div class="text">{{ item.count }}</div>
                    <div class="plus" @click="plus(item)">
                      <img src="../../assets/images/加.png" alt="加" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--      用户登录但是购物车没有数据时-->
      <div v-else-if="loginFlag && shopList.length === 0" class="userNo">
        <!--    图片-->
        <div class="img">
          <van-icon name="shopping-cart-o" size="100px" />
        </div>
        <!--    文字-->
        <div class="text">
          去购物吧~~
        </div>
        <!--    登录-->
        <div class="button">
          <van-button round type="default" color="black" plain to="mall"
            >去购物</van-button
          >
        </div>
      </div>
      <!--    用户未登录时-->
      <div v-else-if="!loginFlag" class="userNo">
        <!--    图片-->
        <div class="img">
          <van-icon name="shopping-cart-o" size="100px" />
        </div>
        <!--    文字-->
        <div class="text">
          请先登录哦~~
        </div>
        <!--    登录-->
        <div class="button">
          <van-button round type="default" color="black" plain to="login"
            >去登录</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shoppingcart",
  components: {},
  props: {},
  data() {
    return {
      loginFlag: false,
      checkAll: false,
      shopList: [],
      // 需要结算的订单
      orderList:[],
      cid: [],
      check: false
    };
  },
  methods: {
    //加
    async plus(item) {
      item.count += 1;
      try {
        let res = await this.$api.editCart(
          item.count,
          item._id,
          item.present_price
        );
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //减
    async reduce(item) {
      item.count -= 1;
      if (item.count <= 0) {
        item.count = 0;
      }
      try {
        let res = await this.$api.editCart(
          item.count,
          item._id,
          item.present_price
        );
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    },
    //全选
    checkall() {
      this.checkAll = !this.checkAll;
      //取消全选时，商品cid数组应该清空，删除与结算应该隐藏
      if (!this.checkAll) {
        this.cid = [];
        this.check = false;
      } else {
        this.check = true;
      }
      // 根据当前自己的状态设置 其他人的状态 实现全选和反选
      this.shopList.map(item => {
        item.check = this.checkAll;
        //全选时，将每个商品的cid传入数组
        if (item.check) {
          this.cid.push(item.cid);
        }
      });
    },
    //单选
    checkone(item, id) {
      item.check = !item.check;
      //如果选中
      if (item.check) {
        this.check = true;
        this.cid.push(item.cid);
      } else {
        this.cid = this.cid.filter(item => {
          return item !== id;
        });
      }
      //根据下面点击的结果控制上面全选的结果
      this.checkAll = this.shopList.every(item => {
        return item.check === true;
      });
      this.check = !this.shopList.every(item => {
        return item.check === false;
      });
    },
    //请求购物车数据
    async sendCar() {
      try {
        let res = await this.$api.getCard();
        this.shopList = res.shopList;
      } catch (e) {
        console.log(e);
      }
    },
    //删除购物车商品
    async sendDel() {
      try {
        let res = await this.$api.deleteShop(this.cid);
        this.sendCar();
        this.cid = [];
        console.log(res);
      } catch (e) {
        console.log(e);
      }
      this.check = this.shopList.every(item => {
        return item.check === false;
      });
      this.checkAll = false;
    },
    // 判断是否登录
    ifLogin() {
      if (localStorage.getItem("user")) {
        this.loginFlag = true;
      } else {
        this.loginFlag = false;
      }
    },
    // 结算
    settlement() {
      this.shopList.map(item => {
        if (item.check) {
          this.orderList.push(item);
        }
      });
      localStorage.setItem("orderList",JSON.stringify(this.orderList));
      this.$router.push({name:"ordersettlement",query:{orderList:this.orderList}})
    }
  },
  mounted() {
    this.sendCar();
    this.ifLogin();
  },
  created() {},
  filters: {},
  computed: {
    user() {
      return this.$store.state.username;
    },
    sum() {
      let sum = 0;
      this.shopList.map(item => {
        if (item.check) {
          sum += item.present_price * item.count;
        }
      });
      return sum.toFixed(2);
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.shoppingcart {
  background: white;
  height: 100vh;
  /*用户存在时*/
  .user {
    /*全选与合计*/
    .totalAll {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      border-bottom: 1px solid #f2f2f2;
      height: 60px;
      line-height: 60px;
      .img {
        img {
          width: 20px;
          position: relative;
          top: 5px;
          margin-right: 3px;
        }
      }
      .total {
        margin-right: 80px;
        span {
          color: red;
          margin-left: 10px;
        }
      }
    }
    /*删除与结算*/
    .delset {
      padding: 0 10px;
      height: 60px;
      line-height: 60px;
      text-align: right;
      .van-button {
        margin-left: 10px;
      }
    }
    /*  商品列表*/
    .list {
      .item {
        padding: 10px 10px;
        border-bottom: 1px solid #f2f2f2;
        /*商品详情*/
        .shopDetal {
          display: flex;
          /*选择方框*/
          .img {
            img {
              width: 20px;
              position: relative;
              top: 50%;
              margin-top: -10px;
            }
          }
          /*商品图片*/
          .shopImg {
            width: 100px;
            border: 1px solid #f2f2f2;
            margin: 0 10px;
            img {
              width: 100%;
            }
          }
          /*  商品信息*/
          .info {
            width: 60%;
            .name {
              color: red;
            }
            .priceNum {
              margin-top: 60px;
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
  }
  /*用户不存在时*/
  .userNo {
    /*图片*/
    .img {
      text-align: center;
      background: #f9cc9d;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      position: relative;
      left: 50%;
      margin-left: -75px;
      margin-top: 30px;
      img {
        width: 100px;
        position: relative;
        top: 25px;
      }
    }
    /*  文字*/
    .text {
      text-align: center;
      color: lightslategray;
      margin-top: 20px;
    }
    /*  按钮*/
    .button {
      text-align: center;
      margin-top: 30px;
      .van-button {
        width: 160px;
      }
    }
  }
}
</style>
