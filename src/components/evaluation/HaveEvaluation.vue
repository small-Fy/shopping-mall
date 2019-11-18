<template>
  <div id="haveEvaluation">
    <div class="goods" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="item" v-for="(el, num) in item.goods" :key="num">
          <div class="shopImg">
            <img :src="el.image_path" alt="商品图片" />
          </div>
          <div class="info" v-if="el.name">
            <div class="name">{{ el.name }}</div>
            <div class="collection">
              <div class="icon"><van-icon name="search" /></div>
              <div class="text" @click="view(item)">
                查看评价
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HaveEvaluation",
  components: {},
  props: {},
  data() {
    return {
      list: [],
      busy: false,
      count: 0,
      page:1
    };
  },
  methods: {
    async alreadyEvaluated() {
      try {
        let res = await this.$api.alreadyEvaluated(this.page);
        this.list = res.data.list;
      } catch (e) {
        console.log(e);
      }
    },
    view(item) {
      this.$router.push({name:"evaluationDetails",query:{goodsOne:item}})
    },
    loadMore(){
      this.busy = true;
      this.page++;
      this.alreadyEvaluated();
      console.log(this.page,646321);
      this.busy = false;
      // setTimeout(() => {
      //   for (let i = 0, j = 10; i < j; i++) {
      //     this.list.push({name: this.count++ })
      //   }
      //   this.page++;
      //   this.alreadyEvaluated();
      //   console.log(this.page,646321);
      //   this.busy = false;
      // }, 1000);
    }
  },
  mounted() {
    this.alreadyEvaluated();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#haveEvaluation {
  .goods {
    margin-top: 50px;
    .item {
      display: flex;
      margin: 20px 0;
      .shopImg {
        width: 90px;
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
        .collection {
          display: flex;
          width: 100px;
          padding: 4px 2px;
          border: 1px solid #333;
          border-radius: 10px;
          margin-left: 100px;
          margin-top: 40px;
          .icon {
            margin: 0 7px;
          }
          .text {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
