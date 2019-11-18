<template>
  <div id="positioning">
    <div class="top">
      <i @click="back"><van-icon name="arrow-left"/></i>
      <div class="text">城市列表</div>
    </div>
    <div class="search">
      <van-search placeholder="请输入城市关键字" v-model="value" />
      <!--      <input type="text" placeholder="请输入城市关键字" v-model="value">-->
    </div>
    <div class="currentCity" v-if="flag">
      <div class="text">当前城市</div>
      <div class="tag" v-if="!chooseCity">
        {{ city }}
      </div>
      <div class="tag" v-else>
        {{ chooseCity }}
      </div>
    </div>
    <div class="hotCity" v-if="flag">
      <div class="text">
        热门城市
      </div>
      <div class="inner">
        <div
          class="tag"
          v-for="(item, index) in hotCities"
          :key="index"
          @click="changeCity(item.name)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="datalist" v-if="flag">
      <van-index-bar>
        <div v-for="(item, index) in cityList" :key="index">
          <van-index-anchor :index="index" />
          <van-cell v-for="it in item" :title="it.name" :key="it.id"  @click="select(it.name)"/>
        </div>
      </van-index-bar>
    </div>
    <div class="someCity" v-if="!flag">
      <div v-for="(item, index) in arr" :key="index" class="item">
        <div class="text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import city from "../../need/city";
export default {
  name: "Positioning",
  components: {},
  props: {},
  data() {
    return {
      city: "",
      // 选中的城市
      chooseCity:"",
      // 输入框输入的值
      value: "",
      // city.js的所有数据
      cities: {},
      cityList: {},
      hotCities: [],
      // 搜索出来的数组
      arr: [],
      // 搜索显示标志
      flag: true
    };
  },
  methods: {
    getCity() {
      this.city = JSON.parse(localStorage.getItem("address")).address;
    },
    changeCity(item) {
      this.chooseCity = item;
      localStorage.setItem("chooseCity",JSON.stringify({chooseCity:this.chooseCity}));
    },
    select(item){
      this.chooseCity = item;
      localStorage.setItem("chooseCity",JSON.stringify({chooseCity:this.chooseCity}));
    },
    back() {
      this.$router.push("/mall");
    }
  },
  mounted() {
    this.getCity();
    this.cities = city;
    this.cityList = this.cities.data.cities;
    this.hotCities = this.cities.data.hotCities;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    value(val) {
      if (val.trim() !== "") {
        this.flag = !this.flag;
        if (val.charCodeAt(0) >= 65 && val.charCodeAt(0) <= 90) {
          val = val.toLowerCase();
        }
        let arr1 = [];
        for (let i in this.cityList) {
          this.cityList[i].map(item => {
            if (item.name.includes(val) || item.spell.includes(val)) {
              arr1.push(item);
            }
          });
        }
        this.arr = arr1;
      } else {
        this.flag = !this.flag;
        this.arr = [];
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
#positioning {
  .top {
    display: flex;
    position: relative;
    height: 50px;
    line-height: 50px;
    i {
      position: absolute;
      left: 10px;
      top: 8px;
    }
    .text {
      margin: 0 auto;
    }
  }
  .search {
    .van-field__control {
      height: 40px;
    }
    .van-icon-search {
      width: 50px;
      height: 50px;
    }
  }
  .currentCity {
    padding: 15px 0;
    .text {
      font-size: 16px;
      margin-left: 20px;
      margin-bottom: 15px;
    }
    .tag {
      width: 70px;
      text-align: center;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 5px 14px;
      margin-left: 20px;
    }
  }
  .hotCity {
    padding: 15px 0;
    .text {
      font-size: 16px;
      margin-left: 20px;
      margin-bottom: 15px;
    }
    .inner {
      display: flex;
      flex-wrap: wrap;
      .tag {
        width: 70px;
        margin: 5px 0 5px 20px;
        padding: 5px 14px;
        text-align: center;
        border: 1px solid gray;
        border-radius: 3px;
      }
    }
  }
  .someCity {
    background-color: white;
    .item {
      color: #5f5f5f;
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #ccc;
      .text {
        margin-left: 20px;
      }
    }
  }
}
</style>
