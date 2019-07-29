<template>
  <div class="chanyeTree">
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="page-header">
          <!-- <h3>基于Vue的组织架构树组件</h3> -->
        </div>

        <div class="top">
          <h1 class="floatL">特房集团有限公司</h1>
          <div class="floatL pageName">企业产业</div>
          <div class="floatR" v-if="isManager==1">
            <Button type="primary" @click="addFirst">新增一级产业</Button>
          </div>
        </div>
        <p>
          <br />
        </p>
        <div class="treeWrap">
          <div class="loading_box" v-if="isLoading">
            <Spin fix></Spin>
          </div>
          <div class="text-center" v-else>
            <vue2-org-tree
              name="test"
              :data="data"
              :horizontal="horizontal"
              :collapsable="collapsable"
              :label-class-name="labelClassName"
              :render-content="renderContent"
              @on-expand="onExpand"
              @on-node-click="onNodeClick"
            />
          </div>
        </div>
      </div>
    </div>

    <Modal title="产业信息" v-model="isShowModel" class-name="vertical-center-modal">
      <p>产业名称：{{infoData.label}}</p>
      <div slot="footer">
        <div v-if="isManager==1">
          <Button
            v-if="infoData.children&&infoData.children.length==0&&infoData.id>0"
            @click="deleteIndustry"
            :loading="isSubmit"
            :disabled="isSubmit"
          >删除该产业</Button>
          <Button type="primary" @click="editIndustry" v-if="infoData.id>0">编辑产业</Button>
          <!-- <Button type="primary" @click="addChildren" v-if="infoData.id==0">新增子产业</Button> -->
          <!-- <Button
            type="primary"
            @click="addBrother"
            v-if="infoData.parentIndustryId||infoData.parentIndustryId==0&&infoData.id>0"
          >新增同级产业</Button>-->
        </div>
      </div>
    </Modal>
    <Modal
      :title="addTitle"
      v-model="addModel"
      class-name="vertical-center-modal"
      @on-cancel="cancelHanele"
    >
      <Form ref="industryForm" :model="industryForm" :label-width="110" :rules="industryFormRules">
        <FormItem label="产业名称：" prop="industryName">
          <Input v-model="industryForm.industryName" placeholder="输入产业名称" :maxlength="50"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          @click="industryFormSubmit('industryForm')"
          :loading="isSubmit"
          :disabled="isSubmit"
        >提交</Button>
      </div>
    </Modal>
    <Modal
      title="公司信息"
      v-model="isShowModelCompany"
      class-name="vertical-center-modal"
      @on-cancel="cancelHaneleCompany"
    >
      <p class="cname mgb10">{{infoData.label}}</p>
      <p class="font16 mgb10">法人代表：{{cinfoData.legalPerson}}</p>
      <p class="font16 mgb10">
        注册资本：
        <span v-if="cinfoData.registeredCapital">{{cinfoData.registeredCapital}}万元</span>
      </p>
      <p class="font16 mgb10">成立日期：{{cinfoData.buildDate}}</p>
      <div slot="footer">
        <Button @click="cancelHaneleCompany">关闭</Button>
        <!-- 1是2否 -->
        <Button v-if="infoData.canView=='1'" type="primary" @click="goCompanyDetails">查看详情</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Vue2OrgTree from "@/components/org-tree";
export default {
  components: {
    Vue2OrgTree
  },
  data() {
    return {
      isShowModelCompany: false,
      addChildrenModel: false,
      addBrotherModel: false,
      isShowModel: false,
      treeData: {},
      data:{
        label:'厦门经济特区房地产开发集团有限公司',
        children:[{
          label:'测试1'
        },{
          label:'测试2'
        }]
      },
      cinfoData: {},
      horizontal: false,
      collapsable: true,
      expandAll: true,
      labelClassName: "bg-white",
      industryId: "",
      parentId: "",
      infoData: {},
      industryForm: {
        industryName: ""
      },
      industryFormRules: {
        industryName: [
          {
            required: true,
            message: "请输入产业名称",
            trigger: "blur"
          }
        ]
      },
      addType: 1, //1子产业2同级
      submitId: "",
      isSubmit: false,
      addTitle: "",
      addModel: false,
      isManager: false,
      companyId: "",
      isLoading: false
    };
  },
  created() {
    // this.getInfo(false);
    this.isManager = localStorage.getItem("isManager");
  },
  mounted() {
    let treeH = document.querySelector(".single-page-con").offsetHeight - 114;

    document.querySelector(".treeWrap").style.height = treeH + "px";
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      if (document.querySelector(".single-page-con")) {
        let treeH =
          document.querySelector(".single-page-con").offsetHeight - 114;
        document.querySelector(".treeWrap").style.height = treeH + "px";
      }
    };
  },
  methods: {
    addFirst() {
      this.addModel = true;
      this.addTitle = "新增一级产业";
      this.addType = 1;
    },
    goCompanyDetails() {
      this.$router.push("/companyDetails/" + this.companyId);
      this.isShowModelCompany = false;
    },
    cancelHaneleCompany() {
      this.companyId = "";
      this.cinfoData = {};
      this.isShowModelCompany = false;
      this.infoData = {};
    },
    editIndustry() {
      this.addModel = true;
      this.addType = 3;
      this.addTitle = "编辑产业";
      this.industryForm.industryName = this.infoData.label;
    },
    addChildren() {
      this.addModel = true;
      this.addType = 1;
      this.addTitle = "新增子产业";
    },
    addBrother() {
      this.addModel = true;
      this.addType = 2;
      this.addTitle = "新增同级产业";
    },

    cancelHanele() {
      this.$refs.industryForm.resetFields();
      this.industryForm = {
        industryName: ""
      };
      this.addModel = false;
    },
    deleteIndustry() {
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除吗？",
        onOk: () => {
          this.deleteFn();
        },
        onCancel: () => {}
      });
    },
    deleteFn() {
      let formData = new FormData();
      formData.append("id", this.infoData.id);
      this.isSubmit = true;
      this.$request.post(
        "api/enterpriseIndustry/delete",
        formData,
        res => {
          this.isSubmit = false;
          this.$Notice.success({
            title: "提示",
            desc: "删除成功"
          });
          this.isShowModel = false;
          this.getInfo(true);
        },
        res => {
          this.isSubmit = false;
          this.$Notice.error({
            title: "提示",
            desc: res.message
          });
        },
        error => {
          this.isSubmit = false;
        }
      );
    },
    industryFormSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let formData = new FormData();
          let url = "";
          if (this.addType == 1) {
            //子产业
            url = "api/enterpriseIndustry/save";
            formData.append("parentIndustryId", 0);
          } else if (this.addType == 2) {
            //同级
            url = "api/enterpriseIndustry/save";
            formData.append("parentIndustryId", this.infoData.parentIndustryId);
          } else if (this.addType == 3) {
            //编辑
            url = "api/enterpriseIndustry/update";
            formData.append("parentIndustryId", 0);
            formData.append("id", this.infoData.id);
          }
          formData.append("industryName", this.industryForm.industryName);
          this.isSubmit = true;
          this.$request.post(
            url,
            formData,
            res => {
              this.isSubmit = false;
              this.$Notice.success({
                title: "提示",
                desc: "提交成功"
              });
              this.isShowModel = false;
              this.addModel = false;

              this.getInfo(true);
            },
            res => {
              this.isSubmit = false;
              this.$Notice.error({
                title: "提示",
                desc: res.message
              });
            },
            error => {
              this.isSubmit = false;
            }
          );
        } else {
          console.log(" submit error");
        }
      });
    },
    brotherSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let establishDate = this.changeDate(
            this.outboundInvestmentForm.establishDate
          );
          let formData = new FormData();
          formData.append("enterpriseId", this.$route.params.id);
          formData.append(
            "enterpriseName",
            this.outboundInvestmentForm.enterpriseName
          );

          let url = "";
          if (this.outboundInvestmentForm.id) {
            url = "api/enterpriseIndustry/update";
            formData.append("id", this.outboundInvestmentForm.id);
          } else {
            url = "api/enterpriseIndustry/save";
          }

          this.isSubmit = true;
          this.$request.post(
            url,
            formData,
            res => {
              this.isSubmit = false;
              this.$Notice.success({
                title: "提示",
                desc: "提交成功"
              });
              this.cancleOutboundInvestmentForm();
              this.getOutboundInvestList();
            },
            res => {
              this.isSubmit = false;
              this.$Notice.error({
                title: "提示",
                desc: res.message
              });
            },
            error => {
              this.isSubmit = false;
            }
          );
        } else {
          console.log(" submit error");
        }
      });
    },

    renderContent(h, data) {
      return data.label;
    },
    onExpand(data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    onNodeClick(e, data) {
      this.infoData = data;
      if (this.infoData.canView != "1" && this.infoData.canView != "2") {
        this.isShowModel = true;
        this.industryId = data.id;
      } else {
        this.companyId = data.id;
        this.isShowModelCompany = true;
        this.getCompanyDetails(data.id);
      }
    },
    getCompanyDetails(id) {
      this.$request.post(
        "/api/enterprise/tree/info/" + id,
        {},
        res => {
          let data = res.data;

          if (data) {
            if (data.establishDate && data.establishDate.length > 10) {
              data.buildDate = data.establishDate.substring(0, 10);
            } else {
              data.buildDate = "";
            }
            this.cinfoData = data;
          } else {
            this.cinfoData = {};
          }
        },
        res => {},
        error => {}
      );
    },
    collapse(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    expandChange() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    },
    getInfo(val) {
      this.isLoading = true;
      this.$request.post(
        "api/enterpriseIndustry/tree",
        {},
        res => {
          let data1 = res.data;
          this.treeData = data1;
          this.toggleExpand(this.treeData, val);
          this.isLoading = false;
        },
        res => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    }
  }
};
</script>
<style lang="scss"  >
/* .org-tree-node-label {
  white-space: nowrap;
}

.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
} */
/* 字纵向排列 */
/* .org-tree-node-children .org-tree-node-label {
  width: 34px;
  white-space: normal;
}
.org-tree-node-children .org-tree-node-label-inner {
  word-break: break-all;
  height: auto;
  text-align: center;
  padding: 10px !important;
} */

.cname {
  color: #3399ff;
  font-size: 16px;
}
.mgb10 {
  margin-bottom: 10px;
}
.font16 {
  font-size: 16px;
}

.chanyeTree {
  background: #fff;
  // min-height: 800px;
  .treeWrap {
    width: 99.9%;
    overflow-x: auto;
  }
  .org-tree-node-children {
    min-width: 100%;
  }
  /* 字纵向排列 */
  .org-tree-node-children .org-tree-node-label {
    width: 34px;
    white-space: normal;
  }
  .org-tree-node-children .org-tree-node-label-inner {
    word-break: break-all;
    height: auto;
    text-align: center;
    padding: 10px !important;
    word-wrap: break-word;
  }

  .top {
    clear: both;
    overflow: hidden;
    padding: 20px;
  }
  .pageName {
    font-size: 2em;
    margin-left: 5px;
    line-height: 36px;
    color: #3399ff;
  }
}
</style>
