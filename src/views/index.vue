<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <div
      class="sidebar-menu-con"
      :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}"
    >
      <shrinkable-menu
        class="222"
        :shrink="shrink"
        theme="dark"
        :open-names="openedSubmenuArr"
        :menu-list="menuList"
      >
        <div slot="top" class="logo-con">
          <!-- <div v-show="!shrink" class="logo-img"></div> -->
        </div>
      </shrinkable-menu>
    </div>
    <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
      <div class="main-header">
        <div class="navicon-con">
          <Button
            :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
            type="text"
            @click="toggleClick"
          >
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <!-- 头部 -->
        <div class="header-middle-con">
          <div class="main-breadcrumb" style="padding-left:0">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <div class="user-dropdown-menu-con" style="width:auto;max-width:600px">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <button class="set-pwd" @click="setPswModal = true">修改密码</button>
              <!-- <Badge count="3" class="msg-badge">
                <Icon size="23" type="android-notifications" color="#999"></Icon>
              </Badge>-->
              <Dropdown transfer trigger="click">
                <a href="javascript:void(0)">
                  <span
                    class="main-user-name"
                    style="width:auto;max-width:290px;font-size:14px"
                  >{{username}}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="loginout" @click.native="modal2 = true">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <!-- <Avatar :src="head" style="background: #619fe7;margin-left: 10px"></Avatar> -->
            </Row>
          </div>
        </div>
      </div>
      <!-- 标签栏 -->
      <div class="tags-con">
        <route-bar></route-bar>
      </div>
    </div>
    <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
      <div class="single-page">
        <router-view></router-view>
      </div>
    </div>
    <Modal
      v-model="setPswModal"
      title="修改密码"
      @on-cancel="closeSetPswModal"
      :mask-closable="false"
      :closable="closable"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="原密码" prop="oldPwd">
          <Input v-model="formValidate.oldPwd" placeholder="请输入原密码" type="password" />
        </FormItem>
        <FormItem label="新密码" prop="newPwd">
          <Input v-model="formValidate.newPwd" placeholder="请输入新密码" type="password" />
        </FormItem>
        <FormItem label="确认密码" prop="correctPwd">
          <Input v-model="formValidate.correctPwd" placeholder="请输入确认密码" type="password" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="goLogin">换个账号登录</Button>
        <Button @click="closeSetPswModal">取消</Button>
        <Button
          type="primary"
          :loading="isSubmit"
          :disabled="isSubmit"
          @click="handleSubmit('formValidate')"
        >确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" title="退出登录" @on-ok="logout" width="416">
      <p>你确定要退出登录？</p>
    </Modal>
  </div>
</template>
<style>
.logo-img {
  background: url("../assets/img/head.jpg") center center no-repeat;
  background-size: auto 95%;
}
.set-pwd {
  padding: 5px 10px;
  border: none;
  color: #fff;
  border-radius: 3px;
  margin-right: 30px;
  background-color: #999;
}
.msg-badge {
  margin-right: 30px;
}
</style>
<script type="text/ecmascript-6">
import "./../assets/css/mainCus.css"; // 使用 CSS
import axios from "axios";
import breadcrumbNav from "./../components/breadcrumb-nav.vue";
import headImg from "./../assets/img/head.jpg";
import md5 from "js-md5";
export default {
  components: {
    breadcrumbNav
  },
  data() {
    var validateOldpwd = (rule, value, callback) => {
      if (this.formValidate.newPwd && value == this.formValidate.newPwd) {
        callback(new Error("旧密码和新密码不能相同"));
      } else {
        if (this.formValidate.newPwd !== "") {
          this.$refs.formValidate.validateField("newPwd", res => {
            console.log(res, "r");
          });
        }
        callback();
      }
    };
    var checkPaswword = (rule, value, callback) => {
      if (/\s/.test(value)) {
        callback(new Error("密码不能包含空格"));
      } else if (!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
        callback(new Error("密码不能包含中文"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("密码由6-16位数字和字母组成，不允许输入空格"));
      } else if (!this.pswReg.test(value)) {
        callback(new Error("密码由6-16位数字和字母组成，不允许输入空格"));
      } else if (
        this.formValidate.newPwd &&
        value != this.formValidate.newPwd
      ) {
        callback("确认密码和新密码不一致");
      } else {
        if (this.formValidate.newPwd !== "") {
          this.$refs.formValidate.validateField("newPwd", res => {
            console.log(res);
          });
        }
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (/\s/.test(value)) {
        callback(new Error("密码不能包含空格"));
      } else if (this.formValidate.oldPwd == value) {
        callback(new Error("新密码不能和旧密码相同"));
      } else if (!/^[^\u4e00-\u9fa5]{0,}$/.test(value)) {
        callback(new Error("密码不能包含中文"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("密码由6-16位数字和字母组成，不允许输入空格"));
      } else if (!this.pswReg.test(value)) {
        callback(new Error("密码由6-16位数字和字母组成，不允许输入空格"));
      } else if (
        this.formValidate.correctPwd &&
        value != this.formValidate.correctPwd
      ) {
        callback(new Error("新密码和确认密码不一致"));
      } else {
        // if (this.formValidate.correctPwd !== "") {
        //   this.$refs.formValidate.validateField("correctPwd", res => {
        //     console.log(res);
        //   });
        // }

        callback();
      }
    };

    return {
      closable: false,
      isSubmit: false,
      // pswReg: /^.{6,20}$/,
      pswReg: /^([^\\s]*[0-9]+[^\\s]*[a-zA-Z]+[^\\s]*|[^\\s]*[a-zA-Z]+[^\\s]*[0-9]+[^\\s]*)[^\\s0-9a-zA-Z]*$/,
      shrink: false,
      setPswModal: false,
      modal2: false,
      openedSubmenuArr: [],
      isFullScreen: false,
      menuList: [],
      company: "",
      companyPId: "",
      companyList: [],
      currentPath: [
        {
          name: "home_index",
          path: "/",
          title: "首页"
        }
      ],
      head: "",
      username: "",
      loading: true,
      formValidate: {
        oldPwd: "",
        newPwd: "",
        correctPwd: ""
      },
      ruleValidate: {
        oldPwd: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
          { validator: validateOldpwd, trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ],
        correctPwd: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: checkPaswword, trigger: "blur" }
        ]
      }
    };
  },

  created() {
    let userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      let isChangePsw = JSON.parse(userInfo).isChangePassword;
      if (isChangePsw == 0) {
        this.setPswModal = true;
        this.closable = false;
      } else {
        this.closable = true;
      }
    }

    this.head = headImg;
    this.username = localStorage.name;
    let menuArr = [];
    if (localStorage.getItem("menu")) {
      menuArr = JSON.parse(localStorage.getItem("menu"));
    }

    let newArr = [];

    menuArr.forEach(item => {
      if (item.childList && item.childList.length > 0) {
        newArr.push({
          id: item.id,
          url: item.url,
          name: item.name,
          childList: item.childList
        });
      } else {
        //去掉只有一级的childList
        if (item.type != 0) {
          newArr.push({
            id: item.id,
            url: item.url,
            name: item.name
          });
        }
      }
    });


    // this.menuList = newArr;
    this.menuList = [
      { id: 2, name: "产业分布", url: "/chanyeTree" },
      { id: 3, name: "企业列表", url: "/businessManagement" },
      { id: 9, name: "设置", childList:[
         { id: 10, name: "权限设置", url: "/authoRization" }
      ] },
    ];
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    closeSetPswModal() {
      let userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        let isChangePsw = JSON.parse(userInfo).isChangePassword;
        if (isChangePsw == 0) {
          this.$Notice.warning({
            title: "提示",
            desc: "请先修改初始化密码！"
          });
        } else {
          this.cancelModal();
        }
      }
    },
    cancelModal() {
      this.setPswModal = false;
      this.formValidate = {
        oldPwd: "",
        newPwd: "",
        correctPwd: ""
      };
    },
    handleSubmit(name) {
      let that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = new FormData();
          //password    newPassword   resetPassowrd
          let oldPwdMD5 = md5(this.formValidate.oldPwd);
          let newPwdMD5 = md5(this.formValidate.newPwd);
          let correctPwdMD5 = md5(this.formValidate.correctPwd);
          param.append("password", oldPwdMD5);
          param.append("newPassword", newPwdMD5);
          param.append("resetPassowrd", correctPwdMD5);
          this.isSubmit = true;
          this.$request.post(
            "api/user/changePassword",
            param,
            res => {
              //成功
              this.$Notice.success({
                title: "提示",
                desc: "密码修改成功，请使用新密码重新登录。",
                duration: 2
              });
              this.formValidate = {
                oldPwd: "",
                newPwd: "",
                correctPwd: ""
              };
              setTimeout(() => {
                that.isSubmit = false;
                that.$router.push("/login");
              }, 2000);
            },
            fail => {
              this.isSubmit = false;
              this.$Notice.error({
                title: "提示",
                desc: fail.message
              });
              //失败
            },
            error => {
              this.isSubmit = false;
              this.$Notice.error({
                title: "提示",
                desc: error
              });
              //
            }
          );
        } else {
          this.changeLoading();
          this.$Message.error("表单验证失败!");
        }
      });
    },

    toggleClick() {
      this.shrink = !this.shrink;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isManage");
      localStorage.removeItem("account");
      localStorage.removeItem("name");
      localStorage.removeItem("menu");
      this.$Message.success("退出登录成功！");
      this.$router.push("/login");
    }
  }
};
</script>
