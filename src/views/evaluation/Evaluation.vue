<template>
  <div id="evaluation">
    <div class="top">
      <van-nav-bar title="评价中心" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="img">
      <img src="../../assets/images/evaluate.jpg" alt="" />
    </div>
    <div class="inner">
      <div class="top">
        <van-tabs v-model="active">
          <van-tab title="待评价">
            <toEvaluate></toEvaluate>
          </van-tab>
          <van-tab title="已评价"><HaveEvaluation></HaveEvaluation></van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import toEvaluate from "../../components/evaluation/ToEvaluate";
import HaveEvaluation from "../../components/evaluation/HaveEvaluation";
export default {
  name: "Evaluation",
  components: {
    toEvaluate,
    HaveEvaluation
  },
  props: {},
  data() {
    return {
      active: 1
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/me");
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
#evaluation {
  /*position: fixed;*/
  .img {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .inner {
    margin: 0 20px;
  }
}
</style>
