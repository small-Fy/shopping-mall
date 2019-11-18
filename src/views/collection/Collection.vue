<template>
  <div id="collection">
    <div class="top">
      <van-nav-bar
        title="我的收藏"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <div class="goods">
      <div class="item" v-for="(item, index) in list" :key="index">
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
            <div class="cancel" @click="cancel(item)"><van-icon name="clear" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collection",
  components: {},
  props: {},
  data() {
    return {
      list:[]
    };
  },
  methods: {
    // 跳转回商品详情页面
    onClickLeft() {
      this.$router.push("/goodsDetails");
    },
    async getCollection(){
      try {
        let res = await this.$api.getCollection(1);
        if(res.code===200){
          this.list=res.data.list;
          console.log(res);
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 取消收藏
    async cancel(item){
      console.log(item,888);
      try {
        let res = await this.$api.cancelCollection(item.cid);
        if(res.code===200){
          this.getCollection();
          this.$toast("取消收藏成功");
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getCollection();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {},
  beforeRouteEnter: (to, from, next) => {
    let user = localStorage.getItem("user");
    if (to.path === "/login") {
      next();
    } else {
      user ? next() : next("/login");
    }
  }
};
</script>

<style scoped lang="scss">
#collection {
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
