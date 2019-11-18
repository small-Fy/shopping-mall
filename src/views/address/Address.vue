<template>
  <div id="address">
    <div class="top">
      <van-nav-bar
        title="地址列表"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <div class="main">
      <div class="notLogin" v-if="!ifLogin || list.length === 0">
        暂无收货地址~~
      </div>
      <div class="add">
        <van-address-list
          v-model="id"
          :list="list"
          @add="onAdd"
          @edit="onEdit"
          @select="onSelect"
        ></van-address-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Address",
  components: {},
  props: {},
  data() {
    return {
      loginFlag: false,
      chosenAddressId: "",
      list: [],
      id:0
    };
  },
  methods: {
    // 选中单个地址
    onSelect(item) {
      if(localStorage.orderList || localStorage.goods){
        this.$router.push({ name: "ordersettlement", query: { address: item } });
      }else{
        this.$router.push("/me")
      }

    },
    // 判断是否登录
    ifLogin() {
      if (localStorage.getItem("user")) {
        this.loginFlag = true;
        this.getAddress();
      } else {
        this.loginFlag = false;
        this.list = [];
      }
    },
    // 获取所有地址
    async getAddress() {
      try {
        let res = await this.$api.getAddress();
        if (res.code === 200) {
          res.address.map((item,index)=>{
            let addressDetail = `${item.province}${item.city}${item.county}${item.addressDetail}`;
            item.address=addressDetail;
            item.id=index+1;
            if(item.isDefault){
              this.id=item.id
              this.list.push(item);
              res.address.splice(index,1);
            }
          });
          this.list.push(...res.address);
          console.log(this.list,465123);
        }
      } catch (e) {
        console.log(e);
      }
    },
    onClickLeft() {
      this.$router.push("/me");
    },
    // 添加地址
    onAdd() {
      this.$router.push("/addressEdit");
    },
    // 编辑地址
    onEdit(item) {
      this.$router.push({ name: "addressEdit", query: { info: item } });
    }
  },
  mounted() {
    this.ifLogin();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#address {
  .main {
    position: relative;
    .notLogin {
      margin-top: 100px;
      font-size: 14px;
      color: #666;
      text-align: center;
    }
    .add {
    }
  }
}
</style>
