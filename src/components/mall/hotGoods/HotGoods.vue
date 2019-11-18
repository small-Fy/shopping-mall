<template>
  <div id="hotGoods">
    <div class="title">热销商品</div>
    <div class="box">
      <div class="inner" v-for="(item,index) in data.hotGoods" :key="index">
        <div class="img">
          <img :src="item.image" alt="">
        </div>
        <div class="title">
          {{item.name}}
        </div>
        <div class="price">
          <div class="big">￥{{item.mallPrice}}</div>
          <del class="small">￥{{item.price}}</del>
        </div>
      </div>
    </div>

  </div>
  
</template>

<script>
  export default {
    name: "HotGoods",
    components: {},
    props: {
      data: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {

    },
    created() {

    },
    filters: {},
    computed: {},
    watch: {},
    directives: {}
  }
</script>

<style scoped lang="scss">
#hotGoods{
  .title{
    text-align: center;
    color: red;
    padding: 15px 0;
  }
  .box{
    display: flex;
    flex-wrap: wrap;
    .inner{
      width: 50%;
      .img{
        width: 100%;
        padding: 0 10px;
        img{
          width: 100%;
        }
      }
      .title{
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .price{
        color: red;
        display: flex;
        justify-content: center;
        .small{
          font-size: 8px;
          color: gray;
        }
      }
    }
  }

}
</style>