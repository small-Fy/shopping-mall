<template>
  <div id="goodsDetails">
    <div class="top">
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" @click="Preview_img(images, index)" />
        </van-swipe-item>
        <span class="custom-indicator" slot="indicator"
          >{{ current + 1 }}/2</span
        >
      </van-swipe>
      <div class="back" @click="back">
        <van-icon name="arrow-left" size="30px" />
      </div>
    </div>
    <div class="detailTop">
      <div class="name">{{ goods.name }}</div>
      <div class="price">￥{{ goods.present_price }}</div>
      <div class="item">
        <div class="freight">运费：{{ goods.__v }}</div>
        <div class="amount">剩余：{{ goods.amount }}</div>
        <div class="collection">
          <span>取消收藏:</span>
          <span @click="collection" :class="{ color: flag }">❤</span>
        </div>
      </div>
    </div>
    <div class="store">
      <div class="left">
        <div><van-icon name="shop-o" size="25px" /></div>
        <div class="text">有赞的店</div>
        <div class="tag">
          <van-tag type="danger" size="large">官方</van-tag>
        </div>
      </div>
      <div class="right">
        进入店铺
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="detailsComments">
      <van-tabs v-model="active" title-active-color="red">
        <van-tab title="商品详情">
          <div v-html="goods.detail"></div>
        </van-tab>
        <van-tab title="商品评论">
          <div class="none" v-if="comment.length < 0">该商品暂无评论...</div>
          <div class="evaluation" v-else>
            <div class="user" v-for="(item, index) in comment" :key="index">
              <div class="msg">
                <div class="img">
                  <img src="../../assets/images/avatar.png" alt="" />
                </div>
              </div>
              <div class="right">
                <div class="name">{{ item.comment_nickname }}</div>
                <div class="star">
                  <van-rate v-model="item.rate" color="red" />
                </div>
                <div class="content">
                  {{ item.content }}
                </div>
              </div>
              <div class="time">
                {{ item.comment_time }}
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom">
      <van-goods-action>
        <van-goods-action-icon icon="wap-home-o" text="首页" to="mall" />
        <van-goods-action-icon
          icon="cart-o"
          text="购物车"
          :info="carNum === 0 ? '' : carNum"
          @click="goShopping"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="addShop"
        />
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="showPopup"
        >
        </van-goods-action-button>
      </van-goods-action>
    </div>
    <van-popup
      v-model="ifPopup"
      position="bottom"
      :style="{ height: '40%', width: '100%' }"
    >
      <div class="pop">
        <div class="top">
          <div class="name">{{ goods.name }}</div>
          <div class="price">￥{{ goods.present_price }}</div>
        </div>
        <div class="img">
          <img :src="goods.image_path" alt="" />
        </div>
        <div class="buy">
          <div class="left">
            <div class="text">
              购买数量：
            </div>
            <div class="textDown">
              <div class="remaining">
                剩余10000件
              </div>
              <div class="purchasing">
                每人限购50件
              </div>
            </div>
          </div>
          <div class="right">
            <van-stepper v-model="value" />
          </div>
        </div>
        <div class="btn">
          <van-button type="warning" size="large" @click="purchase"
            >立即购买</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  name: "GoodsDetails",
  components: {},
  props: {},
  data() {
    return {
      // 接受发来的商品id
      goodsId: "",
      // 接受商品数据
      goods: {},
      // 接受商品评论
      comment: [],
      // 预览图片
      images: [],
      // 是否收藏标志
      flag: false,
      // 图片轮播的页码
      current: 1,
      // 商品详情与评论的切换，默认展示商品详情
      active: 0,
      // 加入到购物车的数量
      carNum: 0,
      // 是否显示弹出层
      ifPopup: false,
      // 购买数量
      value: 1,
      // 浏览历史的数据
      allGoods:[]
    };
  },
  methods: {
    async goodOne() {
      try {
        let res = await this.$api.goodOne(this.goodsId, 1);
        this.goods = res.goods.goodsOne;
        let aaa="";
        this.$store.state.allGoods.map(item=>{
          aaa+=JSON.stringify(item)
        });
        let bbb=JSON.stringify(this.goods);
        if(aaa.indexOf(bbb)<0){
          this.$store.state.allGoods.unshift(this.goods);
        }
        this.comment = res.goods.comment;
        this.images.push(this.goods.image);
        this.images.push(this.goods.image);
      } catch (e) {
        console.log(e);
      }
    },
    Preview_img(images, index) {
      ImagePreview({
        images: images,
        showIndicators: true,
        showIndex: true,
        loop: false,
        startPosition: index
      });
    },
    // 收藏
    async collection() {
      this.flag = !this.flag;
      if (this.flag) {
        try {
          let res = await this.$api.collection(this.goods);
          if (res.code === 200) {
            this.$toast("收藏成功");
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          let res = await this.$api.cancelCollection(this.goods.id);
          if (res.code === 200) {
            this.$toast("取消收藏成功");
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    // 查询商品是否已收藏
    async isCollection() {
      try {
        let res = await this.$api.isCollection(this.goods.id);
        if (res.code === 200) {
          this.flag = true;
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 加入购物车
    async addShop() {
      try {
        let res = await this.$api.addShop(this.goods.id);
        if (res.code === 200) {
          this.carNum++;
          this.$toast("加入购物车成功");
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 跳转到购物车页面
    goShopping() {
      this.$router.push("/shoppingCar");
    },
    onChange(index) {
      this.current = index;
    },
    back() {
      this.$router.push("/mall");
    },
    showPopup() {
      this.ifPopup = true;
    },
    // 立即购买
    purchase() {
      this.goods.count = this.value;
      localStorage.setItem("goods",JSON.stringify(this.goods));
      this.$router.push({
        name: "ordersettlement",
        query: { goods: this.goods }
      });
    }
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;
    this.goodOne();
    this.isCollection();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#goodsDetails {
  .top {
    position: relative;
    img {
      width: 100%;
      height: 300px;
    }
    .custom-indicator {
      position: absolute;
      right: 0;
      bottom: 0;
      font-size: 3px;
      padding: 2px 3px;
      border-radius: 3px;
      color: white;
      background-color: #666;
    }
    .back {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #7d7e80;
      .van-icon-arrow-left {
        margin: 4px 0 0 4px;
        color: white;
      }
    }
  }
  .detailTop {
    padding: 25px 10px 0 10px;
    font-size: 15px;
    .name {
      color: #333;
    }
    .price {
      margin-top: 15px;
      color: #f44444;
      font-weight: bold;
    }
    .item {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      color: #999;
      .color {
        color: red;
      }
    }
  }
  .store {
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      .text {
        margin-left: 10px;
        line-height: 27px;
      }
      .tag {
        margin-left: 10px;
      }
    }
  }
  .detailsComments {
    margin-top: 40px;
    /deep/img{
      display: block;
    }
    .none {
      margin-top: 50px;
      height: 100px;
      text-align: center;
      font-size: 14px;
      color: #999;
    }
    .evaluation {
      margin-bottom: 100px;
      .user {
        display: flex;
        justify-content: space-between;
        margin: 20px 0 30px 20px;
        color: #333;
        .msg {
          width: 50px;
          height: 50px;
          img {
            width: 100%;
            margin-top: 16px;
          }
        }
        .right {
          .name {
          }
          .star {
            margin-top: 14px;
          }
          .content {
            margin-top: 14px;
          }
        }
        .time {
          margin-right: 20px;
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
  .bottom {
    .van-goods-action-button--first {
      border-radius: 0;
    }
    .van-goods-action-button--last {
      border-radius: 0;
    }
  }
  .pop {
    .top {
      margin-left: 120px;
      .name {
        font-size: 14px;
        color: #333;
        margin-top: 20px;
      }
      .price {
        color: red;
        font-size: 14px;
        margin-top: 15px;
      }
    }
    .img {
      width: 80px;
      height: 80px;
      position: fixed;
      top: 390px;
      left: 20px;
      img {
        width: 100%;
      }
    }
    .buy {
      margin: 40px 0 0 20px;
      display: flex;
      justify-content: space-between;
      .left {
        .text {
          font-size: 14px;
          margin-bottom: 15px;
        }
        .textDown {
          display: flex;
          font-size: 8px;
          .remaining {
            color: #999;
          }
          .purchasing {
            color: red;
            margin-left: 10px;
          }
        }
      }
      .right {
      }
    }
    .btn {
      margin-top: 50px;
    }
  }
}
</style>
