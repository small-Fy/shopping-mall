<template>
  <div id="classify">
    <div id="top">商品分类</div>
    <div class="inner">
      <div class="aside" v-if="datas.category">
        <div v-for="(item, index) in datas.category" :key="index">
          <div
            class="mallCategoryName"
            @click="chooseColumn(item, index)"
            v-if="item.mallCategoryName"
          >
            {{ item.mallCategoryName }}
          </div>
        </div>
      </div>
      <div class="cross">
        <van-tabs
          v-if="column"
          @click="post"
          :ellipsis="false"
          v-model="active"
        >
          <van-tab
            v-for="(item, index) in column"
            :title="item.mallSubName"
            :name="item.mallSubId"
            :key="index"
          >
          </van-tab>
        </van-tabs>
        <van-tabs v-else @click="post" :ellipsis="false" v-model="active">
          <van-tab
            v-for="(item, index) in datas.category[0].bxMallSubDto"
            :title="item.mallSubName"
            :name="item.mallSubId"
            :key="index"
          >
          </van-tab>
        </van-tabs>
      </div>
      <div>
        <div class="main" ref="wrapper">
          <ul class="wrapper">
            <li v-for="(item, index) in data" :key="index" class="item">
              <div class="img" v-if="item.image">
                <img :src="item.image" alt="" />
              </div>
              <div class="right">
                <div class="title" v-if="item.name">{{ item.name }}</div>
                <div class="price">
                  <div class="big" v-if="item.present_price">
                    ￥{{ item.present_price }}
                  </div>
                  <del class="small" v-if="item.orl_price"
                    >￥{{ item.orl_price }}</del
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Classify",
  components: {},
  props: {},
  data() {
    return {
      numColumn: 0,
      column: [],
      data: [],
      mallSubId: "",
      item: [],
      active: 1
    };
  },
  methods: {
    chooseColumn(item, index) {
      this.numColumn = index;
      this.column = item.bxMallSubDto;
      this.post();
    },
    async post(name) {
      if (this.mallSubId === "" && this.column !== []) {
        if (!name) {
          name = this.column[0].mallSubId;
          this.active = 1;
          console.log(this.active, 666);
        }
        try {
          let res = await this.$api.category(name);
          this.data = res.dataList;
        } catch (e) {
          console.log(e);
        }
      } else if (this.mallSubId !== "") {
        console.log(777);
        try {
          let res = await this.$api.category(this.mallSubId);
          this.data = res.dataList;
          this.column = this.item;
        } catch (e) {
          console.log(e);
        }
        this.mallSubId = "";
      }
      if (!this.column && !this.mallSubId) {
        try {
          let res = await this.$api.category(
            "2c9f6c946016ea9b016016f79c8e0000"
          );
          this.data = res.dataList;
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  mounted() {
    this.mallSubId = this.$route.query.mallSubId;
    this.item = this.$route.query.item;
    if (this.mallSubId !== "" || this.column === []) {
      this.post();
    }
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper);
    });
  },
  created() {},
  filters: {},
  computed: {
    datas() {
      return this.$store.state.datas;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#classify {
  padding: 0 10px;
  #top {
    font-size: 16px;
    text-align: center;
    height: 70px;
    line-height: 70px;
    z-index: 10000;
    background-color: white;
  }
  .inner {
    .aside {
      position: fixed;
      z-index: 10;
      top: 85px;
      width: 22%;
      background-color: white;
      .mallCategoryName {
        color: gray;
        margin-bottom: 50px;
      }
    }
    .cross {
      width: 78%;
      color: gray;
      background-color: white;
      left: 22%;
      display: flex;
      position: fixed;
      z-index: 10;
    }
    .main {
      position: fixed;
      z-index: -1;
      top: 120px;
      right: 0;
      bottom: 70px;
      width: 70%;
      .wrapper {
        flex-direction: column;
        flex: 1;
        top: 120px;
        ul {
        }
      }
      .item {
        display: flex;
        margin-bottom: 15px;
        padding: 10px;
        .img {
          width: 35%;
          img {
            width: 100%;
          }
        }
        .right {
          width: 58%;
          margin-left: 6%;
          .title {
            margin-top: 10px;
            font-size: 14px;
            color: gray;
            height: 50%;
          }
          .price {
            display: flex;
            height: 50%;
            .big {
              color: red;
              font-weight: bold;
            }
            .small {
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
