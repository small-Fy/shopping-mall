<template>
  <div id="addressEdit">
    <div class="top">
      <van-nav-bar
        title="编辑地址"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
    </div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="info"
      @save="onSave"
      @delete="onDelete"
      @change-default="defaultAddress"
    ></van-address-edit>
  </div>
</template>

<script>
import area from "../../need/area";
export default {
  name: "AddressEdit",
  components: {},
  props: {},
  data() {
    return {
      areaList: {},
      searchResult: [],
      // 接受地址管理页面传来的对象
      info: {},
      address:[],
    };
  },
  methods: {
    async onSave(content) {
      content.id = this.info ? this.info._id : undefined;
      console.log(content,888);
      try {
        let res = await this.$api.postAddress({ ...content });
        if (res.code === 200) {
          this.$router.push("/address");
          this.$toast("保存成功");
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 删除地址
    async onDelete() {
      try {
        let res = await this.$api.deleteAddress(this.info._id);
        if (res.code === 200) {
          this.$router.push("/address");
          this.$toast("删除地址成功");
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 设置默认地址
    async defaultAddress(value){
      console.log(value,999);
      if(value){
        try {
          await this.$api.setDefaultAddress(this.address._id);
        } catch (e) {
          console.log(e);
        }
      }
    },
    onClickLeft() {
      this.$router.push("/address");
    },
    async getAddress() {
      try {
        let res = await this.$api.getAddress();
        if (res.code === 200) {
          this.address=res.address;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.getAddress();
    this.areaList = area;
    this.info = this.$route.query.info;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#addressEdit {
}
</style>
