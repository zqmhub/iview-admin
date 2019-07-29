<template>
  <!-- 企业列表 -->
  <div>
    <Row :gutter="10">
      <Col span="24">
        <Card class="search-card" bordered>
          <p slot="title">
            {{$route.meta.title}}
            <collapse-icon foldPart="search-body"></collapse-icon>
          </p>
          <div id="search-body">
            <Form :label-width="100">
              <Row type="flex" style="margin-top:20px;" justify="start">
                <Col span="4">
                  <FormItem label="公司名称:">
                    <Input v-model="searchCom" placeholder="输入公司名称"></Input>
                  </FormItem>
                </Col>
                <Col span="4" offset="2">
                  <FormItem label="产业类型:">
                    <Cascader change-on-select :data="industryIdData" v-model="searchIndustry"></Cascader>
                  </FormItem>
                </Col>
                <Col span="4" offset="2">
                  <FormItem label="状态:">
                    <Select v-model="searchStatus">
                      <Option value>全部</Option>
                      <Option value="0">变更中</Option>
                      <Option value="1">正常</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col style="float:right;" span="4">
                  <Button type="primary" icon="ios-search" @click="getList">查询</Button>
                  <Button type="ghost" icon="close-round" @click="resstSearch">重置</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Card>
        <div class="b-part" style="margin-top:10px">
          <Card>
            <div style="text-align:center">
              <div class="table-header" style="display:flex;justify-content: space-between">
                <h4 style="text-align:left;display:inline-block">数据列表</h4>
                <div class="data-control">
                  <Button @click="exportBusinessData" icon="ios-download-outline">导出</Button>
                  <Button type="primary" @click="addCompany" v-if="isManager==1" icon="plus">添加</Button>
                  <Modal v-model="toadd" :title="modalTitel" width="800" @on-cancel="cancelForm">
                    <Form
                      ref="formValidate"
                      :model="formValidate"
                      :rules="ruleValidate"
                      :label-width="100"
                    >
                      <FormItem label="上级企业" prop="parentEnterpriseId">
                        <Cascader
                          :data="parentComList"
                          change-on-select
                          v-model="formValidate.parentEnterpriseId"
                        ></Cascader>
                      </FormItem>
                      <FormItem label="企业名称" prop="enterpriseName">
                        <Input
                          v-model="formValidate.enterpriseName"
                          placeholder="输入企业名称"
                          :maxlength="50"
                        ></Input>
                      </FormItem>
                      <FormItem label="产业类型">
                        <Cascader
                          change-on-select
                          :data="industryIdData"
                          v-model="formValidate.IndustryArr"
                        ></Cascader>
                      </FormItem>
                      <FormItem label="与集团关系" prop="groupRelations">
                        <Select v-model="formValidate.groupRelations" placeholder="选择报告名称">
                          <Option
                            v-for="item in groupRelationsArr"
                            :value="item.value"
                            :key="item.value"
                          >{{ item.label }}</Option>
                        </Select>
                      </FormItem>
                      <FormItem label="编辑人">
                        <Input
                          v-model="showEditor"
                          placeholder="选择编辑人"
                          @on-focus="selectEditor"
                          readonly
                        ></Input>
                      </FormItem>
                      <Modal
                        class="editorModal"
                        v-model="editorModal"
                        title="选择编辑人"
                        :styles="{top: '50px'}"
                        @on-cancel="cancelEditorSelected"
                      >
                        <div v-if="isLoadingPerson">
                          <Spin></Spin>
                        </div>
                        <div v-else>
                          <Tree
                            ref="editorTree"
                            :data="editorData"
                            @on-select-change="clickEditor"
                            empty-text="暂无数据"
                          ></Tree>
                        </div>
                      </Modal>
                      <FormItem label="审批人">
                        <Input
                          v-model="showAuditor"
                          placeholder="选择审核人"
                          @on-focus="selectAuditor"
                          readonly
                        ></Input>
                      </FormItem>
                      <Modal
                        class="editorModal"
                        v-model="auditorModal"
                        title="选择审批人"
                        :styles="{top: '50px'}"
                        @on-cancel="cancelAuditSelected"
                      >
                        <div v-if="isLoadingPerson">
                          <Spin></Spin>
                        </div>
                        <div v-else>
                          <Tree
                            :data="auditorData"
                            @on-select-change="clickAuditor"
                            empty-text="暂无数据"
                          ></Tree>
                        </div>
                      </Modal>
                    </Form>

                    <div slot="footer">
                      <Button @click="cancelForm">取消</Button>
                      <Button
                        :disabled="isSubmit"
                        :loading="isSubmit"
                        @click="submit('formValidate')"
                        type="primary"
                      >提交</Button>
                    </div>
                  </Modal>
                </div>
              </div>
              <div class="table-part" style="margin-top:20px">
                <Table
                  stripe
                  border
                  :columns="businessItem"
                  :data="businessData"
                  ref="companyTable"
                  @on-select-all="onSelectAll"
                  @on-select="onSelectSinger"
                  @on-selection-change="onSelectionChange"
                ></Table>
                <div class="pageComponent" style="overflow: hidden">
                  <div style="float: right;">
                    <Page
                      :total="total"
                      :current="1"
                      @on-change="changePage"
                      @on-page-size-change="changeSize"
                      show-sizer
                    ></Page>
                  </div>
                  <div class="control-table" style="float:left">
                    <Button @click="handleSelectAll(true)">全选</Button>
                    <Button @click="handleSelectAll(false)">取消全选</Button>

                    <Dropdown @on-click="doAllSet">
                      <Button type="primary">
                        选择操作
                        <Icon type="arrow-down-b"></Icon>
                      </Button>
                      <DropdownMenu slot="list">
                        <DropdownItem name="1">批量启用</DropdownItem>
                        <DropdownItem name="2">批量禁用</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import host from "@/assets/js/host";
export default {
  name: "businessMana",
  data() {
    return {
      searchCom: "",
      searchIndustry: [],
      searchStatus: "",

      auditorData: [],
      editorData: [],
      showAuditor: "",
      auditorModal: false,

      showEditor: "",

      editorModal: false,
      modalTitel: "新增企业",
      isSubmit: false,
      page: 1,
      limit: 10,
      operationList: [],
      ruleValidate: {
        parentEnterpriseId: [
          {
            type: "array",
            required: true,
            message: "上级企业不能为空",
            trigger: "change"
          }
        ],
        enterpriseName: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        groupRelations: [
          { required: true, message: "请选择与集团关系", trigger: "blur" }
        ]
      },
      toadd: false,
      statusTypes: [],
      model2: "",
      productList: [],
      model1: "",
      searchEnterpriseId: "",
      formValidate: {
        parentEnterpriseId: [],
        enterpriseName: "",
        industryId: "",
        editor: "",
        auditor: "",
        IndustryArr: [],
        groupRelations: ""
      },
      groupRelationsArr: [],
      companyArr: [],
      businessItem: [
        {
          type: "selection",
          key: "check",
          width: 70
        },
        {
          title: "公司名称",
          key: "enterpriseName",

          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/companyDetails/" + params.row.enterpriseId
                      );
                    }
                  }
                },
                params.row.enterpriseName
              )
            ]);
          }
        },
        {
          title: "所属产业",
          key: "industryName"
        },
        {
          title: "与集团关系",
          key: "groupRelationsStr",
          width: 150
        },
        {
          title: "上级企业",
          key: "parentEnterpriseName"
        },
        {
          title: "法人",
          key: "legalPerson",
          width: 150
        },
        {
          title: "成立日期",
          key: "establishDate",
          width: 120
        },
        {
          title: "状态",
          key: "status",
          width: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "middle",
                    key: "status"
                  },
                  style: {
                    marginRight: "5px",
                    color: params.row.status == 0 ? "#f00" : "#333"
                  }
                },
                params.row.status == 0 ? "变更中" : "正常"
              )
            ]);
          }
        },
        {
          title: "是否启用",
          key: "ifon",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "i-switch",
                {
                  props: {
                    type: "primary",
                    size: "large",
                    value: params.row.isOpen == 1 ? true : false,
                    loading: params.row.isSubmit,
                    disabled: this.isManager == 0 ? true : params.row.isSubmit
                  },
                  scopedSlots: {
                    open: () => h("span", "开"),
                    close: () => h("span", "关")
                  },
                  style: {
                    marginRight: "5px",
                    align: "center"
                  },
                  on: {
                    "on-change": value => {
                      this.setIsOpen(params.row);
                    }
                  }
                },
                "Switch"
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "address",
          render: (h, params) => {
            return h("div", [
              h(
                "a",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px",
                    display:
                      params.row.canEdit == 1 && params.row.status == 1
                        ? "inline-block"
                        : "none"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/changeBusinessInfo/" + params.row.enterpriseId
                      );
                    }
                  }
                },
                "编辑"
              ),
              h(
                "a",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px",
                    display:
                      this.isManager == 1 && params.row.status == 1
                        ? "inline-block"
                        : "none"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确定更新提醒吗？",
                        onOk: () => {
                          // this.$Message.info("Clicked ok");
                          this.updateReminder(params.row.enterpriseId);
                        },
                        onCancel: () => {
                          // this.$Message.info("Clicked cancel");
                        }
                      });
                    }
                  }
                },
                "更新提醒"
              ),
              h(
                "a",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px",
                    display: this.isManager == 1 ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      // this.getParentComList();
                      this.modalTitel = "基础信息修改";
                      this.toadd = true;
                      // this.getInfo(params.row.enterpriseId);
                    }
                  }
                },
                "基础信息修改"
              )
            ]);
          }
        }
      ],
      businessData: [],
      total: 0,
      parentComList: [],
      industryIdData: [],
      isManager: false,
      isLoading: false,
      selectAllArr: [],
      selectSingerArr: [],
      personDataBackup: [],
      isLoadingPerson: false
    };
  },

  created() {
    // this.getCompanyList();
    // this.getList();
    let businessData = [
      {
        enterpriseName: "厦门经济特区房地产开发集团有限公司",
        parentEnterpriseName: "上级企业",
        groupRelationsStr:'与集团关系',
        industryName:'所属产业',
        status:1,
        isOpen:1
      }
    ];

    this.businessData  = businessData
    // this.getParentComList();
    // this.getTreeSelectInfo();
    // this.getGroupRelationsList();
    this.isManager = localStorage.getItem("isManager");
    // this.personTreeInit(this.auditorData);
    // this.personTreeInit(this.editorData);

    // this.getPersonList();
  },
  methods: {
    //获取人员
    getPersonList() {
      this.isLoadingPerson = true;
      this.$request.post(
        "api/user/oaGroupUserTrees",
        {},
        res => {
          let list = res.data;

          if (list.length > 0) {
            this.personTreeInit(list);
          }
          let listStr = JSON.stringify(list);
          this.personDataBackup = JSON.parse(listStr);
          this.editorData = JSON.parse(listStr);
          this.auditorData = JSON.parse(listStr);
          this.isLoadingPerson = false;
        },
        fail => {
          this.isLoadingPerson = false;
        },
        error => {
          this.isLoadingPerson = false;
        }
      );
    },
    getGroupRelationsList() {
      let formData = new FormData();
      formData.append("categoryCode", "group.relations");
      this.isLoading = true;
      this.$request.post(
        "api/dictionary/list",
        formData,
        res => {
          this.isLoading = false;

          let arr = [];
          res.data.forEach(item => {
            arr.push({
              value: item.value,
              label: item.name
            });
          });
          this.groupRelationsArr = arr;
        },
        res => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    },
    //初始化  人员树
    personTreeInit(arr) {
      arr.forEach((item, index) => {
        item.expand = false;
        // item.selected = false;
        if (item.users && item.users.length > 0) {
          item.children = item.children.concat(item.users);
          if (item.children.length > 0) {
            // item.disabled = true;
          }
        }
        if (item.children) {
          this.personTreeInit(item.children);
        }
      });
    },
    updateReminder(id) {
      //更新接口 ：/api/enterprise/updateReminder
      this.isLoading = true;
      let formData = new FormData();
      formData.append("enterpriseId", id);
      this.$request.post(
        "api/enterprise/updateReminder",
        formData,
        res => {
          this.$Notice.success({
            title: "提示",
            desc: "更新提醒成功"
          });
          this.getList();
        },
        fail => {
          this.$Notice.error({
            title: "提示",
            desc: fail.message
          });
        },
        error => {
          this.$Notice.error({
            title: "提示",
            desc: "服务端错误"
          });
        }
      );
    },
    resstSearch() {
      this.searchCom = "";
      this.searchStatus = "";
      this.searchIndustry = [];
      this.getList();
    },
    //递归重置数据
    forEachData(arr) {
      arr.forEach(item => {
        item.selected = false;
        if (item.children) {
          this.forEachData(item.children);
        }
        console.log(item.selected);
      });
    },
    cancelEditorSelected() {
      // 重置editorData
      this.forEachData(this.editorData);
    },
    cancelAuditSelected() {
      // 重置auditorData
      this.forEachData(this.auditorData);
    },
    onSelectAll(obj) {
      this.selectAllArr = obj;
    },
    onSelectSinger(obj) {
      this.selectAllArr = obj;
    },
    onSelectionChange(obj) {
      this.selectAllArr = obj;
    },
    doAllSet(value) {
      if (this.selectAllArr.length == 0) {
        this.$Notice.error({
          title: "提示",
          desc: "请选择需要批量操作的数据"
        });
      } else {
        if (value == 1) {
          //批量启用
          this.$Modal.confirm({
            title: "提示",
            content: "确定批量启用吗？",
            onOk: () => {
              this.setAllIsOpen(1);
            },
            onCancel: () => {}
          });
        } else if (value == 2) {
          //批量禁用

          this.$Modal.confirm({
            title: "提示",
            content: "确定批量禁用吗？",
            onOk: () => {
              this.setAllIsOpen(0);
            },
            onCancel: () => {}
          });
        }
      }
    },
    setAllIsOpen(isOpen) {
      let ids = [];
      this.selectAllArr.forEach(item => {
        ids.push(item.enterpriseId);
      });
      let formData = new FormData();
      formData.append("enterpriseIds", ids);
      formData.append("isOpen", isOpen);

      this.$request.post(
        "api/enterprise/updateBatch",
        formData,
        res => {
          this.$Notice.success({
            title: "提示",
            desc: "批量设置成功"
          });
          this.getList();
        },
        res => {},
        error => {}
      );
    },
    handleSelectAll(status) {
      this.$refs.companyTable.selectAll(status);
    },
    cancelForm() {
      this.$refs.formValidate.resetFields();
      this.toadd = false;
      this.formValidate = {
        parentEnterpriseId: [],
        enterpriseName: "",
        industryId: "",
        editor: "",
        auditor: "",
        IndustryArr: []
      };
      this.showAuditor = "";
      this.showEditor = "";
    },
    selectAuditor() {
      this.auditorModal = true;

      if (this.formValidate.id) {
        let account = "";
        if (this.formValidate.auditor && this.formValidate.auditor != "null") {
          account = JSON.parse(this.formValidate.auditor).account;
        }

        this.backshowTree(this.auditorData, account);
      }
    },
    clickAuditor(item) {
      console.log(item, "i");

      if (item.length > 0) {
        if (!item[0].children || item[0].children.length == 0) {
          let auditorData = item[0];
          auditorData.name = auditorData.title;
          this.showAuditor = auditorData.title;
          this.formValidate.auditor = JSON.stringify(auditorData);
        } else {
          this.showAuditor = "";
          this.formValidate.auditor = "";
        }
      } else {
        this.showAuditor = "";
        this.formValidate.auditor = "";
      }
    },
    clickEditor(item) {
      console.log(item, "item");
      if (item.length > 0) {
        if (!item[0].children || item[0].children.length == 0) {
          let editorData = item[0];
          editorData.name = editorData.title;
          this.showEditor = editorData.title;
          this.formValidate.editor = JSON.stringify(editorData);
        } else {
          this.showEditor = "";
          this.formValidate.editor = "";
        }
      } else {
        this.showEditor = "";
        this.formValidate.editor = "";
      }
    },

    backshowTree(arr, account) {
      arr.forEach(item => {
        if (item.account == account) {
          item.selected = true;
        }
        if (item.children && item.children.length > 0) {
          this.backshowTree(item.children, account);
        }
      });
    },

    selectEditor() {
      this.editorModal = true;
      if (this.formValidate.id) {
        let account = "";
        if (this.formValidate.editor && this.formValidate.editor != "null") {
          account = JSON.parse(this.formValidate.editor).account;
        }
        this.getPersonList();

        this.backshowTree(this.editorData, account);
      }
    },
    addCompany() {
      this.getParentComList();
      this.toadd = true;
      this.modalTitel = "新增企业";
    },
    //获取企业类型
    getTreeSelectInfo() {
      this.isLoading = true;
      this.$request.post(
        "api/enterpriseIndustry/treeSelect",
        {},
        res => {
          let data = res.data;
          this.industryIdData = data;
        },
        res => {},
        error => {}
      );
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formValidate.auditor && this.formValidate.editor) {
            let auditorAccount = JSON.parse(this.formValidate.auditor).account;
            let editorAccount = JSON.parse(this.formValidate.editor).account;
            if (auditorAccount == editorAccount) {
              this.$Notice.error({
                title: "提示",
                desc: "编辑人和审核人不能相同"
              });
              return false;
            }
          }

          let formData = new FormData();
          let len = this.formValidate.parentEnterpriseId.length;
          let parentEnterpriseId = "";
          if (len > 0) {
            parentEnterpriseId = this.formValidate.parentEnterpriseId[len - 1];
          }

          let iLen = this.formValidate.IndustryArr.length;
          let industryId = "";

          if (iLen > 0) {
            industryId = this.formValidate.IndustryArr[iLen - 1];
          }

          formData.append("parentEnterpriseId", parentEnterpriseId);
          formData.append("enterpriseName", this.formValidate.enterpriseName);
          formData.append("industryId", industryId);
          formData.append("groupRelations", this.formValidate.groupRelations);

          if (this.formValidate.editor) {
            formData.append("editor", this.formValidate.editor);
          }
          if (this.formValidate.auditor) {
            formData.append("auditor", this.formValidate.auditor);
          }

          let url = "";
          if (this.formValidate.id) {
            url = "api/enterprise/updateBase";
            formData.append("enterpriseId", this.formValidate.enterpriseId);
          } else {
            url = "api/enterprise/saveBase";
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
              this.cancelForm();
              this.getList();
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
    setIsOpen(item) {
      let ids = [];
      ids.push(item.enterpriseId);
      let formData = new FormData();
      formData.append("enterpriseIds", ids);
      if (item.isOpen == 1) {
        formData.append("isOpen", 0);
      } else {
        formData.append("isOpen", 1);
      }
      item.isSubmit = true;
      this.$request.post(
        "api/enterprise/updateBatch",
        formData,
        res => {
          item.isSubmit = false;
          this.$Notice.success({
            title: "提示",
            desc: "设置成功"
          });

          this.getList();
        },
        res => {
          item.isSubmit = false;
        },
        error => {
          item.isSubmit = false;
        }
      );
    },
    getInfo(id) {
      this.isLoading = true;
      this.$request.post(
        "api/enterprise/info/" + id,
        {},
        res => {
          let data = res.data;

          let ifMore = data.enterpriseIds.indexOf(",");
          let ifInduMore = -1;
          if (data.industryIds && data.industryIds != "null") {
            ifInduMore = data.industryIds.indexOf(",");
          }

          if (ifMore > -1) {
            let list = data.enterpriseIds.split(",").map(item => {
              return Number(item);
            });
            data.parentEnterpriseId = list;
          } else {
            data.parentEnterpriseId = [];
            data.parentEnterpriseId.push(Number(data.enterpriseIds));
          }

          if (ifInduMore > -1) {
            data.IndustryArr = data.industryIds.split(",").map(item => {
              return Number(item);
            });
          } else {
            if (data.industryIds && data.industryIds != "null") {
              data.IndustryArr = [];
              data.IndustryArr.push(Number(data.industryIds));
            }
          }

          this.formValidate = data;

          this.showEditor = this.formValidate.editor
            ? JSON.parse(this.formValidate.editor).name
            : "";
          this.showAuditor = this.formValidate.auditor
            ? JSON.parse(this.formValidate.auditor).name
            : "";
        },
        res => {},
        error => {}
      );
    },
    changeSize(size) {
      this.limit = size;
      this.getList();
    },
    changePage(val) {
      this.page = val;
      this.getList();
    },
    getCompanyList() {
      this.isLoading = true;
      this.$request.post(
        "api/enterprise/list-select",
        {},
        res => {
          this.isLoading = false;

          let arr = [];
          res.data.forEach(item => {
            arr.push({
              value: item.enterpriseId,
              label: item.enterpriseName
            });
          });
          this.companyArr = arr;
        },
        res => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    },
    getList() {
      this.selectAllArr = [];
      let siLen = this.searchIndustry.length;
      let searchIndustry = this.searchIndustry[siLen - 1]
        ? this.searchIndustry[siLen - 1]
        : "";
      let formData = new FormData();
      formData.append("industryId", searchIndustry);
      formData.append("enterpriseName", this.searchCom);
      if (this.searchStatus) {
        formData.append("status", this.searchStatus);
      }

      formData.append("limit", this.limit);
      formData.append("page", this.page);
      this.$request.post("api/enterpriseDraft/list", formData, res => {
        let list = res.data.list;
        this.businessData = list.map(item => {
          if (item.establishDate) {
            item.establishDate = item.establishDate.substring(0, 10);
          }
          item.isSubmit = false;
          return item;
        });
        this.total = res.data.total;
      });
    },
    exportBusinessData() {
      let siLen = this.searchIndustry.length;
      let token = localStorage.getItem("token");
      let searchIndustry = this.searchIndustry[siLen - 1]
        ? this.searchIndustry[siLen - 1]
        : "";
      //      formData.append("industryId", searchIndustry);
      //      formData.append("enterpriseName", this.searchCom);
      //      formData.append("token", token)
      //      if (this.searchStatus) {
      //        formData.append("status", this.searchStatus);
      //      }
      window.open(
        host.host +
          "/api/enterpriseDraft/download?industryId=" +
          searchIndustry +
          "&enterpriseName=" +
          this.searchCom +
          "&token=" +
          token +
          "&status=" +
          this.searchStatus
      );
    },
    getParentComList() {
      this.$request.post("api/enterpriseArchitecture/treeSelect", {}, res => {
        let list = res.data;
        this.parentComList = list;
      });
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    }
  }
};
</script>
<style lang="scss">
.editorModal {
  .ivu-modal-body {
    height: 600px;
    overflow-y: auto;
  }
  @media screen and (max-width: 1400px) {
    .ivu-modal-body {
      height: 380px;
      overflow-y: auto;
    }
  }
  .ivu-modal-mask {
    z-index: 1001;
  }
  .ivu-modal-wrap {
    z-index: 1001;
  }
}
</style>

