<template>
  <div id="recommend">
    <div class="title">商品推荐</div>
    <div class="rampageScroll" ref="rampage">
      <ul class="rampage-wrapper">
        <li
          class="rampage-list"
          v-for="(item, index) in data.recommend"
          :key="index"
        >
          <div class="item">
            <img :src="item.image" alt="" />
            <div class="text">{{ item.goodsName }}</div>
            <div class="price">
              <div class="big">￥{{ item.mallPrice }}</div>
              <del class="small">￥{{ item.price }}</del>
            </div>
            <div class="button">
              <div class="left"><van-icon name="shopping-cart" /></div>
              <div class="right" @click="details(item)">查看详情</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Recommend",
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.rampage, {
          startX: 0,
          click: true,
          scrollX: true,
          // 忽略竖直方向的滚动
          scrollY: false,
          eventPassthrough: "vertical"
        });
      } else {
        this.scroll.refresh();
      }
    },
    details(item){
      this.$router.push({name:"goodsDetails",query:{goodsId:item.goodsId}})
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 初始化
      this._initScroll();
      // 计算宽度
    });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#recommend {
  background-color: white;
  margin-top: 30px;
  font-size: 15px;
  .title {
    margin: 0 0 10px 10px;
  }
  .rampageScroll {
    display: flex;
    overflow: hidden;
  }
  .rampage-wrapper {
    flex: 1;
    background: #fff;
    display: flex;
    white-space: nowrap;
  }
  .rampage-list {
    list-style: none;
    display: inline-block;
    padding-bottom: 15px;
    text-align: center;
  }
  .rampage-list img {
    width: 120px;
    height: 120px;
  }

  .item {
    margin-left: 5px;
    .text {
      width: 120px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 5px 0;
    }
    .price {
      margin-top: 5px;
      display: flex;
      .small {
        font-size: 10px;
        color: gray;
        line-height: 15px;
      }
    }
    .button {
      margin-top: 10px;
      display: flex;
      .left {
        width: 40px;
        background-color: #ffa838;
        padding: 6px 0;
        border-radius: 5px 0 0 5px;
        color: white;
      }
      .right {
        font-size: 14px;
        width: 75px;
        background-color: #ff3308;
        color: white;
        padding: 6px 0;
        border-radius: 0 5px 5px 0;
      }
    }
  }
}
</style>
