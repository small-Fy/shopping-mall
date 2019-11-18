<template>
  <div id="floor">
      <div class="all">
        <div class="floor1">
          <div class="title">
            <div class="word">1F</div>
            <div class="floorName" v-if="data.floorName">{{data.floorName.floor1}}</div>
          </div>
          <div class="inner">
            <div class="zero" v-if="data.floor1">
              <img :src="data.floor1[0].image" alt="">
            </div>
            <div class="one" v-if="data.floor1">
              <div v-for="(item,index) in data.floor1.slice(1,3)" :key="index" class="img">
                <img :src="item.image" alt="">
              </div>
            </div>
          </div>
          <div class="bottom" v-if="data.floor1">
            <div v-for="(item,index) in data.floor1.slice(3,5)" :key="index" class="img">
              <img :src="item.image" alt="">
            </div>
          </div>
        </div>
        <div class="floor2">
          <div class="title">
            <div class="word">2F</div>
            <div class="floorName" v-if="data.floorName">{{data.floorName.floor2}}</div>
          </div>
          <div class="inner">
            <div
                v-for="(item, index) in data.floor2"
                :key="index"
                class="item"
                :class="{ wz: index === 2 }"
            >
              <div class="img">
                <img :src="item.image" alt="" :class="{ width: index === 0 }" />
              </div>
            </div>
          </div>
        </div>
        <div class="floor3">
          <div class="title">
            <div class="word">3F</div>
            <div class="floorName" v-if="data.floorName">{{data.floorName.floor3}}</div>
          </div>
          <div class="inner" v-if="data.floor3">
            <div
                v-for="(item, index) in data.floor3"
                :key="index"
                class="item"
                :class="{ wz: index === 2 }"
            >
              <div class="img">
                <img :src="item.image" alt="" :class="{ width: index === 0 }" />
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
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
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#floor {
.all{
  .floor1{
    .title{
      width: 100px;
      margin: 0 auto;
      display: flex;
      color: red;
      .word{
        padding-top: 3px;
        font-size: 14px;
        text-align: center;
        margin-right: 3px;
        width: 20px;
        height: 17px;
        border-radius: 50%;
        background-color: red;
        color: white;
      }
    }
    .inner{
      display: flex;
      .zero {
        width:50%;
        img {
          width: 100%;
        }
      }
      .one {
        width: 50%;
        .img {
          img {
            width:100%;
          }
        }
      }

    }
    .bottom{
      display: flex;
      .img{
        width: 50%;
        img{
          width: 100%;
        }
      }
    }
  }
  .floor2,.floor3{
    .title{
      width: 100px;
      margin: 20px auto;
      display: flex;
      color: red;
      .word{
        padding-top: 3px;
        font-size: 14px;
        text-align: center;
        margin-right: 3px;
        width: 20px;
        height: 17px;
        border-radius: 50%;
        background-color: red;
        color: white;
      }
    }
    .inner {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      .wz {
        position: absolute;
        top: 33%;
        left: 50%;
      }
      .item {
        width: 50%;
        .img {
          width: 100%;
          img {
            width: 100%;
            height: 50%;
          }
          .width {
            width: 100%;
          }
        }
      }
    }
  }
 }
}
</style>
