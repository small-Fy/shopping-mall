<template>
  <div id="toEvaluate">
    <div class="goods">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="shopImg">
          <img :src="item.image_path" alt="商品图片" />
        </div>
        <div class="info" v-if="item.name">
          <div class="name">{{ item.name }}</div>

          <div class="collection">
            <div class="icon"><van-icon name="chat" /></div>
            <div class="text" @click="discuss(item)">
              评论晒单
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToEvaluate",
  components: {},
  props: {},
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async tobeEvaluated() {
      try {
        let res = await this.$api.tobeEvaluated(1);
        this.list = res.data.list;
      } catch (e) {
        console.log(e);
      }
    },
    // 评论晒单
    discuss(item){
      this.$router.push({name:"discuss",query:{goods:item}})
    },
  },
  mounted() {
    this.tobeEvaluated();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#toEvaluate {
  .goods {
    margin-top: 50px;
    .item {
      display: flex;
      margin: 20px 0;
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
        position: relative;
        .name {
          margin-top: 10px;
          font-size: 14px;
        }
        .collection {
          display: flex;
          width: 100px;
          padding: 4px 2px;
          border: 1px solid red;
          border-radius: 10px;
          position: absolute;
          right: -20px;
          top: 70px;
          .icon{
            margin: 0 7px;
            color: red;
          }
          .text{
            color: red;
          }
        }
      }
    }
  }
}
</style>
