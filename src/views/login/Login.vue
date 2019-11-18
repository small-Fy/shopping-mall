<template>
  <div id="login">
    <div class="main">
      <div class="title">登录/注册</div>
      <van-cell-group>
        <div class="username">
          <van-field v-model="username" placeholder="username"  @click="blur"/>
        </div>
        <div class="password">
          <van-field v-model="password" placeholder="password" type="password"/>
        </div>
        <div class="code">
          <div class="text">
            <van-field v-model="code" clearable label="验证码" />
          </div>
          <div class="img">
            <div v-html="data" @click="recode"></div>
          </div>
        </div>
      </van-cell-group>
      <div class="button">
        <div class="login">
          <van-button type="primary" @click="login">登录</van-button>
        </div>
        <div class="register">
          <van-button type="danger" @click="register">注册</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      // 记录用户名
      username: "",
      // 记录密码
      password: "",
      // 记录验证码
      code: "",
      // 接受到的验证码
      data: "",
      // 接受注册后的用户信息
      userInfo: {}
    };
  },
  methods: {
    getAverify() {
      axios.get(`api/verify?mt=${Math.random()}`).then(res => {
        this.data = res.data;
        console.log(this.code);
      });
    },
    async login() {
      try {
        let res = await this.$api.login(
          this.username,
          this.password,
          this.code
        );
        // 登录成功
        if (res.code === 200) {
          this.$toast.success("登录成功");
          this.userInfo = res.userInfo;
          // 将用户信息传入state
          this.$store.state.userInfo = this.userInfo;
          this.$store.state.days=`${this.userInfo.year}年${this.userInfo.month}月${this.userInfo.day}日`;
          localStorage.setItem("user",JSON.stringify({name:this.username}));
          this.$router.push("/me");
        } else {
          console.log(111);
          this.$toast.fail("登录失败");
        }
      } catch (e) {
        console.log(e);
      }
    },
    async register() {
      try {
        let res = await this.$api.register(
          this.username,
          this.password,
          this.code
        );
        // 注册成功
        if (res.code === 200) {
          this.$toast.success("注册成功");
          this.userInfo = res.userInfo;
          // 将用户信息传入state
          this.$store.state.userInfo = this.userInfo;
          this.$store.state.days=`${this.userInfo.year}年${this.userInfo.month}月${this.userInfo.day}日`;
          localStorage.setItem("user",JSON.stringify({name:this.username}));
          this.$router.push("/me");
        } else {
          console.log(111);
          this.$toast.fail("注册失败");
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 重新获取验证码
    recode() {
      this.getAverify();
    },
    blur(e){
      console.log(e);
      if(e.target.value ===""){
        this.$toast.fail("用户名不能为空");
      }
    }
  },
  mounted() {
    this.getAverify();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
#login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("../../assets/images/timg.jpg") no-repeat;
  background-size: cover;
  .main {
    width: 90%;
    padding: 40px 19px 0 19px;
    opacity: 0.8;
    .title {
      color: #b86368;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
    }
    .password {
      margin: 15px 0;
    }
    .code {
      display: flex;
      .text {
        width: 60%;
      }
      .img {
        width: 40%;
      }
    }
    .button {
      display: flex;
      margin-top: 10px;
      justify-content: center;
      .login {
        margin-right: 20px;
      }
    }
  }
}
</style>
