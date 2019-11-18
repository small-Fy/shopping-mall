<template>
  <div id="category">
    <div class="all">
      <van-grid class="box">
        <div v-for="(item, index) in data.category" :key="index">
          <van-grid-item :icon="item.image" :text="item.mallCategoryName" @click="category(item.bxMallSubDto)"/>
        </div>
      </van-grid>
    </div>

    <div class="advertesPicture" v-if="data.advertesPicture">
      <img :src="data.advertesPicture.PICTURE_ADDRESS" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
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
    category(item){
      this.$router.push({name:"classify",query:{mallSubId:item[0].mallSubId,item:item}})
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#category {
  .all {
    border-radius: 10px;
    background-color: white;
    margin: 10px 5px;
    box-shadow: 3px -3px 5px #999;
    .box {
      justify-content: space-around;
    }
  }
  .advertesPicture {
    width: 100%;
    margin-top: 10px;
    img {
      width: 100%;
    }
  }
}
</style>
