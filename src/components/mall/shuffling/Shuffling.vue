<template>
  <div id="shuffling">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in data.slides" :key="index">
        <div class="img"><img :src="item.image" alt="" /></div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Shuffling",
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#shuffling {
  .img {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>
