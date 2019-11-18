<template>
  <div id="mall">
    <div class="top">
      <div class="position" v-if="city && !localCity" @click="chooseCity">
        {{ city }}<van-icon name="arrow-down" />
      </div>
      <div class="position" v-if="!localCity && !city" @click="chooseCity">
        <span>定位中</span>
      </div>
      <div class="position" v-else @click="chooseCity">
        <span>{{localCity}}</span>
      </div>
      <div class="search">
        <van-search
          v-model="keywords"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          @focus="focus"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </div>
      <div class="quit" v-if="popFlag" @click="quit">取消</div>
    </div>
    <Shuffling :data="data"></Shuffling>
    <Category :data="data"></Category>
    <Recommend :data="data"></Recommend>
    <Floor :data="data" v-if="data"></Floor>
    <HotGoods :data="data"></HotGoods>
    <van-popup
      v-model="popFlag"
      position="right"
      :overlay="false"
      :style="{ height: '89%', width: '100%' }"
    >
      <div class="goods" v-if="!historyFlag">
        <div class="item" v-for="(item, index) in search" :key="index">
          <div class="img">
            <img :src="item.image_path" alt="" />
          </div>
          <div class="right">
            <div class="name" v-html="item.name"></div>
            <div class="price">
              <div class="present">￥{{ item.present_price }}</div>
              <del class="orl">
                {{ item.orl_price }}
              </del>
            </div>
          </div>
        </div>
      </div>
      <div class="history" v-else>
        <div class="none" v-if="historySearch.length < 1">暂无搜索历史~~~</div>
        <div class="inner" v-else>
          <div class="top">
            <div class="text">搜索历史</div>
            <div class="icon" @click="empty">
              <van-icon name="delete" />
            </div>
          </div>
          <div class="all">
            <div
              class="item"
              v-for="(item, index) in historySearch"
              :key="index"
            >
              <van-tag
                plain
                type="success"
                size="large"
                @click="give(item.keyWord)"
                >{{ item.keyWord }}</van-tag
              >
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Shuffling from "../../components/mall/shuffling/Shuffling";
import Category from "../../components/mall/category/Category";
import Recommend from "../../components/mall/recommend/Recommend";
import Floor from "../../components/mall/floor/Floor";
import HotGoods from "../../components/mall/hotGoods/HotGoods";
export default {
  name: "Mall",
  components: {
    Shuffling,
    Category,
    Recommend,
    Floor,
    HotGoods
  },
  props: {},
  data() {
    return {
      // 最初调用接口获取到的定位信息
      city: "",
      // 存到localstorage里的定位信息
      localCity:"",
      keywords: "",
      data: {},
      search: [],
      // 搜索弹出层显示标志
      popFlag: false,
      // 搜索历史显示标志
      historyFlag: true,
      // 搜索历史
      historySearch: [],
      ifPosition: false
    };
  },
  methods: {
    async recommend() {
      try {
        let res = await this.$api.recommend();
        if (res.data) {
          this.data = res.data;
          this.$store.state.datas = this.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    chooseCity() {
      this.$router.push("/positioning");
    },
    onSearch() {
      if (this.keywords !== "") {
        if (localStorage.getItem("searchWord") == null) {
          this.historySearch.unshift({ keyWord: this.keywords });
          localStorage.setItem(
            "searchWord",
            JSON.stringify(this.historySearch)
          );
        } else {
          if (
            !JSON.parse(localStorage.getItem("searchWord")).find(
              v => v.keyWord === this.keywords
            )
          ) {
            if (this.historySearch.length >= 6) {
              this.historySearch.pop();
            }
            this.historySearch.unshift({ keyWord: this.keywords });
            localStorage.setItem(
              "searchWord",
              JSON.stringify(this.historySearch)
            );
          }
        }
      }
    },
    focus() {
      this.popFlag = true;
    },
    give(item) {
      this.keywords = item;
    },
    // 清空搜索历史
    empty() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除搜索历史？"
        })
        .then(() => {
          localStorage.removeItem("searchWord");
          this.historySearch = [];
        })
        .catch(() => {});
    },
    // 是否显示弹出框
    quit() {
      this.value = "" ;
      this.popFlag = false;
    },
    // 判断是否已经获取过定位
    position() {
      if (localStorage.getItem("address")) {
        this.ifPosition = true;
        this.localCity=JSON.parse(localStorage.getItem("address")).address
      }
    }
  },
  mounted() {
    let _this = this;
    this.position();
    if (!this.ifPosition) {
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          _this.city = data.addressComponent.city;
          localStorage.setItem(
            "address",
            JSON.stringify({
              address: _this.city
            })
          );
        }

        function onError(data) {
          // 定位出错
          console.log(data);
        }
      });
    }
    this.recommend();
    if(localStorage.getItem("chooseCity")){
      this.localCity=JSON.parse(localStorage.getItem("chooseCity")).chooseCity
    }
  },
  created() {
    if (localStorage.getItem("searchWord") !== null) {
      this.historySearch = JSON.parse(localStorage.getItem("searchWord"));
    }
  },
  filters: {},
  computed: {},
  watch: {
    async keywords(value) {
      let words = value.trim();
      if (words !== "") {
        this.historyFlag = false;
        try {
          let res = await this.$api.search(words, 1);
          this.search = res.data.list;
          this.search.map(item => {
            let findText = item.name.split(words);
            item.name = findText.join(
              '<span style="color:red;">' + words + "</span> "
            );
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        this.search = [];
        this.historyFlag = true;
      }
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
#mall {
  .top {
    display: flex;
    .position {
      display: flex;
      width: 20%;
      height: 50px;
      line-height: 50px;
      margin-left: 5%;
      font-size: 12px;
      i {
        margin-top: 18px;
      }
    }
    .search {
    }
    .quit {
      line-height: 54px;
      color: red;
      font-weight: bold;
    }
  }
  .goods {
    margin-top: 20px;
    margin-left: 20px;
    .item {
      display: flex;
      margin-bottom: 10px;
      .img {
        width: 80px;
        height: 80px;
        img {
          width: 100%;
        }
      }
      .right {
        margin-left: 15px;
        width: 250px;
        .name {
          font-size: 14px;
          margin: 10px 0 0 0;
        }
        .price {
          font-size: 14px;
          display: flex;
          line-height: 80px;
          .present {
            color: red;
            font-weight: bold;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .history {
    .none {
      margin-top: 20px;
      text-align: center;
      font-size: 14px;
      color: #333;
    }
    .inner {
      margin-left: 20px;
      margin-top: 20px;
      .top {
        display: flex;
        justify-content: space-between;
        .text {
          font-size: 12px;
          color: #333;
        }
        .icon {
          margin-right: 40px;
        }
      }
      .all {
        display: flex;
        margin-top: 20px;
        .item {
          margin: 5px 8px;
        }
      }
    }
  }
}
</style>
