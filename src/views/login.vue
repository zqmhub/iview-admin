<template>
  <div class="app-main">
    <div class="login">
      <div class="login-con">
        <Card :bordered="false">
          <p slot="title">
            <Icon type="log-in"></Icon>欢迎登录
          </p>
          <div class="form-con">
            <Form ref="loginForm" :model="form" :rules="rules">
              <FormItem prop="userName">
                <Input v-model="form.userName" placeholder="请输入用户名">
                  <span slot="prepend">
                    <Icon :size="16" type="person"></Icon>
                  </span>
                </Input>
              </FormItem>
              <FormItem prop="password">
                <Input type="password" v-model="form.password" placeholder="请输入密码">
                  <span slot="prepend">
                    <Icon :size="14" type="locked"></Icon>
                  </span>
                </Input>
              </FormItem>
              <FormItem prop="captcha">
                <div class="clearFlex padding_b">
                  <div class="floatL codeL">
                    <Input v-model="form.captcha" placeholder="输入验证码">
                      <span slot="prepend">
                        <Icon :size="14" type="android-unlock"></Icon>
                      </span>
                    </Input>
                  </div>
                  <div class="floatL codeR">
                    <div style="height:32px" @click="getCodeImg" class="img_wrap">
                      <img style="height:100%" :src="codeImg" alt />
                    </div>
                  </div>
                </div>
              </FormItem>
              <FormItem>
                <Button
                  @click="handleSubmit"
                  type="primary"
                  :disabled="isSubmit"
                  :loading="isSubmit"
                  long
                >登录</Button>
              </FormItem>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.img_wrap {
  cursor: pointer;
}
.codeL {
  width: 40%;
}
.codeR {
  width: 60%;
}
.padding_b {
  padding-bottom: 2px;
}
</style>
<script>
import "../assets/css/login.css"; // 使用 CSS
import axios from "axios";
import md5 from "js-md5";
import host from "@/assets/js/host";

export default {
  data() {
    return {
      codeImg: "",
      form: {
        userName: "",
        password: "",
        captcha: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      isSubmit: false,
      chars: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      keyCode: ""
    };
  },
  mounted() {
    this.addListen();
  },
  created() {
    this.getCodeImg();
  },
  methods: {
    generateMixed(n) {
      var res = "";
      for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += this.chars[id];
      }
      return res;
    },

    getCodeImg() {
      this.keyCode = new Date().getTime() + this.generateMixed(5);
      this.codeImg = host.host + "api/user/captcha?key=" + this.keyCode;
    },
    addListen() {
      document.onkeydown = e => {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e.keyCode == 13) {
          this.handleSubmit();
        }
      };
    },
    handleSubmit() {
      let that = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (!window.localStorage) {
            alert("浏览器不支持localStorage");
          } else {
            that.isSubmit = true;
            var params = new FormData();
            params.append("userName", this.form.userName);
            params.append("captcha", this.form.captcha);
            params.append("key", this.keyCode);
            let passwordMD5 = md5(this.form.password);
            params.append("password", passwordMD5);
            // this.$request.post(
            //   "api/user/login",
            //   params,
            //   res => {
            //     //成功
            //     that.isSubmit = false;
            //     localStorage.setItem("token", res.data.token);
            //     localStorage.setItem("account", res.data.account);
            //     localStorage.setItem("name", res.data.name);
            //     localStorage.setItem("isManager", res.data.isManager);
            //     localStorage.setItem("userInfo", JSON.stringify(res.data));
            //     localStorage.setItem("menu", JSON.stringify(res.data.menu));
            //     that.$router.push("/");
            //     that.$Message.success("登录成功！");
            //   },
            //   fail => {
            //     that.isSubmit = false;
            //     this.getCodeImg();
            //     this.$Notice.error({
            //       title: "提示",
            //       desc: fail.message
            //     });
            //     //失败
            //   },
            //   error => {
            //     that.isSubmit = false;
            //     this.$Notice.error({
            //       title: "提示",
            //       desc: error
            //     });
            //   }
            // );

            if (
              this.form.userName != "" &&
              this.form.password != ""
            ) {
              localStorage.setItem(
                "token",
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjIwMzQ2ODQsInVzZXIiOiJhZG1pbiIsImlhdCI6MTU2MTE3MDY4NH0.O6KBRGIxjZ6sRYYHiQroQPaB4T-ZkuT5_yaaxGpR3PA"
              );
              this.$router.push("/");
              this.$Message.success("登录成功！");
            }
          }
        }
      });
    }
  }
};
</script>
