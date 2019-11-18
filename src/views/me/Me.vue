<template>
  <div id="me">
    <div class="title">
      会员中心
    </div>
    <div class="msg-nlogin" v-if="!login">
      <div class="avatar">
        <img src="../../assets/images/avatar.png" alt="" />
        <div class="login" @click="sign">
          登录/注册
        </div>
      </div>
    </div>
    <div class="msg-login" v-if="login">
      <div class="avatar">
        <img src="../../assets/images/avatar.png" alt="" />
        <div class="welcome">欢迎：{{ login.nickname }}</div>
        <div class="quit" @click="quit">退出登录</div>
      </div>
      <div class="set">
        <van-cell is-link @click="showPopup">
          <van-icon name="setting" size="25px" />
        </van-cell>
      </div>
    </div>
    <div class="operation">
      <van-grid :column-num="5">
        <van-grid-item icon="after-sale" text="待付款" @click="jump(1)"/>
        <van-grid-item icon="free-postage" text="待发货"  @click="jump(2)"/>
        <van-grid-item icon="logistics" text="待收货"  @click="jump(3)"/>
        <van-grid-item icon="chat-o" text="评价" to="evaluation" :info="info"/>
        <van-grid-item icon="star-o" text="已完成"  @click="jump(4)"/>
      </van-grid>
    </div>
    <div class="management">
      <div class="order">
        <div class="left">
          <div><van-icon name="orders-o" /></div>
          <div class="text">全部订单</div>
        </div>
        <div class="right" @click="run('/allOrder')">
          >
        </div>
      </div>
      <div class="collection">
        <div class="left">
          <div><van-icon name="star-o" /></div>
          <div class="text">收藏商品</div>
        </div>
        <div class="right" @click="run('/collection')">
          >
        </div>
      </div>
      <div class="address">
        <div class="left">
          <div><van-icon name="location-o" /></div>
          <div class="text">地址管理</div>
        </div>
        <div class="right" @click="run('/address')">
          >
        </div>
      </div>
      <div class="browse">
        <div class="left">
          <div><van-icon name="eye-o" /></div>
          <div class="text">最近浏览</div>
        </div>
        <div class="right" @click="run('/browse')">
          >
        </div>
      </div>
    </div>
    <div class="show">
      <van-popup
        v-model="show"
        position="right"
        :closeable="true"
        close-icon="arrow-left"
        close-icon-position="top-left"
        :style="{ height: '100%', width: '100%' }"
      >
        <div class="data">
          <div class="fw"></div>
          <div class="top">个人资料</div>
          <div class="input">
            <div>
              <van-field v-model="github" type="text" label="github" />
            </div>
            <div class="tx">
              <div class="left">头像</div>
              <div class="right" v-if="userInfo">
                <img :src="userInfo.avatar" alt="" />
                <van-icon name="arrow" size="25px" />
              </div>
            </div>
            <div v-if="userInfo">
              <van-field
                v-model="userInfo.username"
                type="text"
                label="用户名"
              />
            </div>
            <div v-if="userInfo">
              <van-field v-model="userInfo.nickname" type="text" label="昵称" />
            </div>
            <div v-if="userInfo">
              <van-field v-model="userInfo.gender" type="text" label="性别" />
            </div>
            <div>
              <van-field
                type="text"
                label="邮箱"
                placeholder="请输入邮箱地址"
              />
            </div>
            <div>
              <van-field
                v-model="showDay"
                type="text"
                label="出生年月"
                @click="chooseDay"
                disabled
              ></van-field>

              <van-popup
                v-model="dateFlag"
                position="bottom"
                :overlay="false"
                :style="{ height: '46%', width: '100%' }"
              >
                <van-datetime-picker
                  v-model="birthday"
                  type="date"
                  :min-date="minDate"
                  @confirm="confirm"
                ></van-datetime-picker>
              </van-popup>
            </div>
          </div>
          <div class="keep">
            <van-button type="primary" size="large" @click="save"
              >保存</van-button
            >
          </div>
          <div class="cancel">
            <van-button type="danger" size="large" @click="cancel"
              >取消</van-button
            >
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  name: "Me",
  components: {},
  props: {},
  data() {
    return {
      show: false,
      email: [],
      github: "",
      dateFlag: false,
      minDate: new Date(1919, 10, 1),
      userInfo: "",
      birthday: "",
      showDay: null,
      // 装修改后的用户信息
      args: {},
      // 未评价的订单数量
      info:""
    };
  },
  methods: {
    // 退出登录
    async quit() {
      try {
        await this.$api.loginOut();
        this.$store.state.userInfo = "";
        localStorage.clear();
      } catch (e) {
        console.log(e);
      }
    },
    // 获取用户信息
    async user() {
      try {
        let res = await this.$api.user();
        this.userInfo = res.userInfo;
        this.birthday = this.$dayjs()
          .year(this.userInfo.year)
          .month(this.userInfo.month)
          .date(this.userInfo.day);
        this.showDay = this.$dayjs(this.birthday).format("YYYY年MM月DD日");
      } catch (e) {
        console.log(e);
      }
    },
    // 跳转登录
    sign() {
      this.$router.push("/login");
    },
    // 显示用户信息
    showPopup() {
      this.show = true;
    },
    // 是否打开时间选择器
    chooseDay() {
      this.dateFlag = !this.dateFlag;
    },
    // 时间选择器的确认按钮
    confirm(value) {
      this.showDay = this.$dayjs(value).format("YYYY年MM月DD日");
      this.dateFlag = !this.dateFlag;
    },
    // 关闭信息编辑页
    cancel() {
      this.show = !this.show;
    },
    // 保存用户信息
    async save() {
      let year = this.showDay.substring(0, 4);
      let month = this.showDay.substring(5, 7);
      let day = this.showDay.substring(8, 10);
      this.args = {
        gender: this.userInfo.gender,
        year: year,
        month: month,
        day: day,
        id: this.userInfo._id,
        nickname: this.userInfo.nickname
      };
      try {
        let res = await this.$api.saveUser({ ...this.args });
        if (res.code === 200) {
          console.log(res.user,1245);
        }
      } catch (e) {
        console.log(e);
      }
    },
    jump(index){
      this.$router.push({name:"order",query:{num:index}});
    },
    run(path){
      this.$router.push(path);
    },
    async tobeEvaluated() {
      try {
        let res = await this.$api.tobeEvaluated(1);
        this.info = res.data.list.length;
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.user();
    this.tobeEvaluated();
  },
  created() {},
  filters: {},
  computed: {
    login() {
      return this.$store.state.userInfo;
    }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#me {
  .title {
    font-size: 18px;
    text-align: center;
    padding: 15px 0;
  }
  .msg-nlogin {
    margin: 0 2%;
    background-color: #cfe2ff;
    width: 96%;
    height: 200px;
    position: relative;
    .avatar {
      width: 80px;
      height: 80px;
      background-color: white;
      position: absolute;
      top: 40%;
      left: 50%;
      margin-top: -30px;
      margin-left: -40px;
      border-radius: 50%;
      border: 1px solid #999;
      img {
        padding: 5px;
        width: 70px;
        height: 70px;
      }
      .login {
        margin-top: 15px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  .msg-login {
    margin: 0 2%;
    background-color: #cfe2ff;
    width: 96%;
    height: 200px;
    position: relative;
    .avatar {
      width: 80px;
      height: 80px;
      background-color: white;
      position: absolute;
      top: 40%;
      left: 50%;
      margin-top: -30px;
      margin-left: -40px;
      border-radius: 50%;
      border: 1px solid #999;
      img {
        padding: 5px;
        width: 70px;
        height: 70px;
      }
      .welcome {
        margin-top: 15px;
        font-size: 16px;
        font-weight: bold;
      }
      .quit {
        margin-top: 10px;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
      }
    }
    .set {
      position: absolute;
      right: 20px;
      top: 20px;
      .van-cell {
        padding: 0;
        background-color: #cfe2ff;
      }
      .van-cell__right-icon {
        display: none;
      }
    }
  }
  .operation {
  }
  .management {
    padding-top: 30px;
    margin: 0 2%;
    color: #333;
    .order {
      margin-bottom: 30px;
    }
    .collection,
    .address,
    .browse {
      margin-bottom: 30px;
    }
    .order,
    .collection,
    .address,
    .browse {
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        .text {
          margin-left: 5px;
        }
      }
    }
  }
  .show {
    .van-popup__close-icon {
      color: red;
    }
    .data {
      padding: 0 10px;
      .fw {
        height: 20px;
      }
      .top {
        font-size: 16px;
        text-align: center;
      }
      .input {
        margin-top: 15px;
        height: 30px;
        line-height: 30px;
        .tx {
          display: flex;
          justify-content: space-between;
          .left {
            margin-left: 16px;
            font-size: 14px;
            color: #323233;
          }
          .right {
            img {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
      .keep {
        margin-top: 350px;
      }
      .cancel {
        margin-top: 10px;
      }
    }
  }
}
</style>
