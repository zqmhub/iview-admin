<template>
  <div class="roleSetting">
    <Row :gutter="10">
      <Col span="24">
        <Card class="search-card">
          <p slot="title">
            {{$route.meta.title}}
            <collapse-icon foldPart="search-body"></collapse-icon>
          </p>
          <Card bordered style="marginTop:20px">
            <Row>
              <!-- <div class="table-header" style="float:left">
                <h4 style="text-align:left;display:inline-block">数据列表</h4>
              </div>-->
              <div class="table-part" style="margin-top:20px">
                <Table
                  :loading="isLoading"
                  stripe
                  border
                  :columns="authoRizationList"
                  :data="authoRizationItems"
                  ref="table"
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
                  <!-- <div class="control-table" style="float:left">
                    <Button @click="handleSelectAll(true)">全选</Button>
                    <Button @click="handleSelectAll(false)">反选</Button>
                    <Select v-model="model1" style="width:200px">
                      <Option
                        v-for="item in operationList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </div>-->
                </div>
              </div>
            </Row>
          </Card>
        </Card>
      </Col>
    </Row>
    <Modal v-model="scanRole" title="职务人员">
      <Table :columns="officialsItem" :data="officialsList"></Table>
      <div slot="footer" align="center">
        <Page :total="total" :current="1" @on-change="changeOfficialListPage"></Page>
      </div>
      <div slot="footer">
        <Button type="primary" @click="okBtn">确定</Button>
      </div>
    </Modal>
    <Modal v-model="powerModal" title="设置权限" @on-cancel="powerCancel">
      <Tree
        :data="menuList"
        show-checkbox
        multiple
        @on-check-change="changeTreeChecked"
        :check-strictly="true"
      ></Tree>
      <div slot="footer">
        <Button :loading="isSubmit" :disabled="isSubmit" type="primary" @click="savePower">确定</Button>
      </div>
    </Modal>
    <!-- 新增管理人员 -->
    <Modal v-model="addPersonModalAdmin" title="添加人员" @on-cancel="personCancel">
      <div>
        <div class="clearFlex">
          <div class="floatL addPersonbox">
            <div class="top_bar">选择员工</div>
            <div class="padding5 resultBox">
              <div class="searchPerson">
                <Input v-model="searchVal" placeholder="公司、姓名" clearable :maxlength="50">
                  <span class="cursorPointer" slot="append" @click="doSearchPerson">搜索</span>
                </Input>
              </div>
              <div class="treeBox" v-if="!personloading">
                <Tree
                  :data="personData"
                  show-checkbox
                  multiple
                  @on-check-change="personTreeChecked"
                  :check-strictly="true"
                ></Tree>
              </div>
              <div v-else>
                <Spin></Spin>
              </div>
            </div>
          </div>
          <div class="floatR addPersonbox">
            <div class="top_bar">
              <!-- <span>已选{{personSelectedNum}}（还能选{{personSelectedSurplus}}）</span> -->
              <span class="clearPerson" @click="personCancel">清空</span>
            </div>
            <div class="padding5 resultBox">
              <ul>
                <!-- <li v-for="(item,index) in personSelectedArr" :key="index">{{item.name}}</li> -->
                <li class="personLi" v-for="(item,index) in personSelectedArr" :key="index">
                  <span>{{item.name}}</span>
                  <span class="delPerson" @click="delPerson(item.account,index)">
                    <Icon type="ios-trash-outline"></Icon>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button :loading="isSubmit" :disabled="isSubmit" type="primary" @click="addPersonSave">确定</Button>
      </div>
    </Modal>
    <!-- 新增查看者角色人员 -->
    <Modal v-model="addPersonModalViewer" title="添加人员" @on-cancel="personCancel" width="900">
      <div class="clearFlex">
        <div class="add_wrap mgr20">
          <div class="floatL addPersonbox">
            <div class="top_bar">选择企业</div>
            <div class="padding5 resultBox">
              <!-- <div class="searchPerson">
                <Input v-model="searchCompanyVal" placeholder="企业名称">
                  <span class="cursorPointer" slot="append">搜索</span>
                </Input>
              </div>-->
              <div class="treeBox">
                <!-- <Tree :data="companyList" show-checkbox multiple @on-check-change="selectCompany"></Tree> -->
                <Tree :data="companyList" multiple @on-select-change="selectCompany"></Tree>
              </div>
            </div>
          </div>
          <div class="floatR addPersonbox">
            <div class="top_bar">
              <!-- <span>已选{{personSelectedNum}}（还能选{{personSelectedSurplus}}）</span> -->
              <span class="clearPerson" @click="cancelSelectedCompany">清空</span>
            </div>
            <div class="padding5 resultBox">
              <ul>
                <li v-for="(item,index) in companySelectedArr" :key="index">{{item.title}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="add_wrap">
          <div class="floatL addPersonbox">
            <div class="top_bar">选择员工</div>
            <div class="padding5 resultBox">
              <div class="searchPerson">
                <Input v-model="searchVal" placeholder="公司、姓名" clearable>
                  <span class="cursorPointer" slot="append" @click="doSearchPerson">搜索</span>
                </Input>
              </div>
              <div class="treeBox" v-if="!personloading">
                <Tree
                  :data="personData"
                  show-checkbox
                  multiple
                  @on-check-change="personTreeChecked"
                  :check-strictly="true"
                ></Tree>
              </div>
              <div v-else>
                <Spin></Spin>
              </div>
            </div>
          </div>
          <div class="floatR addPersonbox">
            <div class="top_bar">
              <!-- <span>已选{{personSelectedNum}}（还能选{{personSelectedSurplus}}）</span> -->
              <span class="clearPerson" @click="personCancel">清空</span>
            </div>
            <div class="padding5 resultBox">
              <ul>
                <!-- <li v-for="(item,index) in personSelectedArr" :key="index">{{item.name}}</li> -->
                <li class="personLi" v-for="(item,index) in personSelectedArr" :key="index">
                  <span>{{item.name}}</span>
                  <span class="delPerson" @click="delPerson(item.account,index)">
                    <Icon type="ios-trash-outline"></Icon>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="addPersonSave" :loading="isSubmit" :disabled="isSubmit">确定</Button>
      </div>
    </Modal>
    <!-- 新增编辑者和审核者角色人员 -->
    <Modal v-model="addPersonModalAuditorEditor" title="添加人员" @on-cancel="personCancel" width="900">
      <div class="clearFlex">
        <div class="add_wrap mgr20">
          <div class="floatL addPersonbox">
            <div class="top_bar">选择企业</div>
            <div class="padding5 resultBox">
              <!-- <div class="searchPerson">
                <Input v-model="searchCompanyVal" placeholder="企业名称">
                  <span class="cursorPointer" slot="append">搜索</span>
                </Input>
              </div>-->
              <div class="treeBox">
                <!-- <Tree :data="companyList" show-checkbox multiple @on-check-change="selectCompany"></Tree> -->
                <Tree :data="companyList" multiple @on-select-change="selectCompany"></Tree>
              </div>
            </div>
          </div>
          <div class="floatR addPersonbox">
            <div class="top_bar">
              <!-- <span>已选{{personSelectedNum}}（还能选{{personSelectedSurplus}}）</span> -->
              <span class="clearPerson" @click="cancelSelectedCompany">清空</span>
            </div>
            <div class="padding5 resultBox">
              <ul>
                <li v-for="(item,index) in companySelectedArr" :key="index">{{item.title}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="add_wrap">
          <div class="floatL addPersonbox">
            <div class="top_bar">选择员工</div>
            <div class="padding5 resultBox">
              <div class="searchPerson">
                <Input v-model="searchVal" placeholder="公司、姓名" clearable>
                  <span class="cursorPointer" slot="append" @click="doSearchPerson">搜索</span>
                </Input>
              </div>
              <div class="treeBox" v-if="!personloading">
                <Tree :data="personData" @on-select-change="auditorEditorSelect"></Tree>
              </div>
              <div v-else>
                <Spin></Spin>
              </div>
            </div>
          </div>
          <div class="floatR addPersonbox">
            <div class="top_bar">
              <!-- <span>已选{{personSelectedNum}}（还能选{{personSelectedSurplus}}）</span> -->
              <span class="clearPerson" @click="personCancel">清空</span>
            </div>
            <div class="padding5 resultBox">
              <ul>
                <li class="personLi" v-for="(item,index) in personSelectedArr" :key="index">
                  <span>{{item.name}}</span>
                  <span class="delPerson" @click="delPerson(item.account,index)">
                    <Icon type="ios-trash-outline"></Icon>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="addPersonSave" :loading="isSubmit" :disabled="isSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addPersonModalAdmin: false, //管理员 不选企业
      addPersonModalViewer: false,
      addPersonModalAuditorEditor: false,
      isSubmit: false,
      searchVal: "",
      searchCompanyVal: "",

      personSelectedNum: 0,
      personSelectedSurplus: 0,
      personSelectedArr: [],

      // personData: [],
      personData: [
        {
          title: "总公司",
          expand: true,
          users: [
            {
              title: "宋江",
              name: "宋江",
              account: "songjiang",
              phone: "18559660000",
              email: "xx@qq.com",
              selected: false
            },
            {
              title: "李逵",
              name: "李逵",
              account: "likui",
              phone: "18559660000",
              email: "xx@qq.com",
              selected: false
            },
            {
              title: "武松",
              name: "武松",
              account: "wusong",
              phone: "18559660000",
              email: "xx@qq.com",
              selected: false
            },
            {
              title: "吴用",
              name: "吴用",
              account: "wuyong",
              phone: "18559660000",
              email: "xx@qq.com",
              selected: false
            },
            {
              title: "林冲",
              name: "林冲",
              account: "linchong",
              phone: "18559660000",
              email: "xx@qq.com",
              selected: false
            },
            {
              title: "西门庆",
              name: "西门庆",
              account: "ximenqing",
              phone: "18559660000",
              email: "xx@qq.com",
              selected: false
            }
          ],
          children: [
            {
              title: "研发一部",
              expand: true,
              children: [
                {
                  title: "第一组",
                  expand: true,
                  children: [],
                  users: [
                    {
                      title: "曹操",
                      name: "曹操",
                      account: "caocao",
                      phone: "18559660000",
                      email: "xx@qq.com",
                      selected: false
                    },
                    {
                      title: "孔明",
                      name: "孔明",
                      account: "kongming",
                      phone: "18559660000",
                      email: "xx@qq.com",
                      selected: false
                    },
                    {
                      title: "阿斗",
                      name: "阿斗",
                      account: "adou",
                      phone: "18559660000",
                      email: "xx@qq.com",
                      selected: false
                    },
                    {
                      title: "阿斗2",
                      name: "阿斗2",
                      account: "adou2",
                      phone: "18559660000",
                      email: "xx@qq.com",
                      selected: false
                    },
                    {
                      title: "阿斗3",
                      name: "阿斗3",
                      account: "adou3",
                      phone: "18559660000",
                      email: "xx@qq.com",
                      selected: false
                    },
                    {
                      title: "阿斗4",
                      name: "阿斗4",
                      account: "adou4",
                      phone: "18559660000",
                      email: "xx@qq.com",
                      selected: false
                    }
                  ]
                }
              ],
              users: [
                {
                  title: "张秀",
                  name: "张秀",
                  account: "zhangxiu",
                  phone: "18559660000",
                  email: "xx@qq.com",
                  selected: false
                }
              ]
            },
            {
              title: "总经办",
              expand: true,
              children: [],
              users: [
                {
                  title: "李世石",
                  name: "李世石",
                  account: "lishisih",
                  phone: "18559660000",
                  email: "xx@qq.com",
                  selected: false
                },
                {
                  title: "李太白",
                  name: "李太白",
                  account: "litaibai",
                  phone: "18559660000",
                  email: "xx@qq.com",
                  selected: false
                }
              ]
            }
          ]
        }
      ],

      companySelectedArr: [],
      companyList: [],
      menuList: [],
      powerModal: false,
      authoRizationList: [
        {
          title: "角色名称",
          key: "roleName",
          width: 90
        },
        {
          title: "职务人员",
          key: "countPerson",
          width: 90,
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
                      if (this.isManager == 1) {
                        this.scanRole = true;
                        let roleId = params.row.roleId;
                        this.getOfficialList(roleId);
                      }
                    }
                  }
                },
                params.row.countPerson
              )
            ]);
          }
        },
        {
          title: "相关描述",
          key: "description"
        },
        {
          title: "更新时间",
          key: "gmtModified",
          width: 160
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
                    display: this.isManager == 1 ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      // 查看者  ：viewer   编辑者 ：editor   审核者：auditor   管理员：admin
                      this.powerType = params.row.code;
                      if (params.row.code == "admin") {
                        //管理员
                        this.addPersonModalAdmin = true;
                      } else if (params.row.code == "viewer") {
                        this.addPersonModalViewer = true;
                      } else if (
                        params.row.code == "editor" ||
                        params.row.code == "auditor"
                      ) {
                        this.addPersonModalAuditorEditor = true;
                      }else{
                        this.addPersonModalAuditorEditor = true;
                      }
                      this.roleId = params.row.roleId;
                    }
                  }
                },
                "添加人员"
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
              
                      this.powerModal = true;
                      // this.getroleMenuList(params.row.roleId);
                      this.roleId = params.row.roleId;
                    }
                  }
                },
                params.row.roleId === 4 ? " " : "设置权限"
              )
            ]);
          }
        }
      ],
      powerType: "",
      isManager: 0,
      authoRizationItems: [],
      officialsItem: [
        {
          title: "姓名",
          key: "officialsName"
        },
        {
          title: "手机号码",
          key: "officialsPhone"
        },
        {
          title: "公司名称",
          key: "officialsCompany"
        }
      ],
      officialsList: [],
      limit: 10,
      page: 1,
      total: 0,
      scanRole: false,
      powerCheckedArr: [],
      roleId: "",
      personDataBackup: [],
      personloading: false,
      isLoading: false,
      isSearch: false,
      personSelectedArrBackup: [],
      companyListBackup: [],
      companySelectedArrBackup: []
    };
  },
  mounted() {
    this.addListen();
  },
  methods: {
    //回车搜索
    addListen() {
      document.onkeydown = e => {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e.keyCode == 13) {
          this.doSearchCompany();
        }
      };
    },
    // 搜索公司
    doSearchCompany() {
      this.companySelectedArrBackup = JSON.parse(
        JSON.stringify(this.companySelectedArr)
      );
      if (this.searchVal) {
        this.isSearch = true;
        var reg = new RegExp(this.searchVal);
        let backupArr = JSON.stringify(this.personDataBackup);
        this.personData = JSON.parse(backupArr);
        this.selectedBackShow(this.personData, this.personSelectedArr);
        let arr = this.deal(this.personData, node => reg.test(node.title));

        let arrStr = JSON.stringify(arr);
        this.personData = JSON.parse(arrStr);
      } else {
        this.isSearch = false;
        let backupArr = JSON.stringify(this.personDataBackup);
        this.personData = JSON.parse(backupArr);
        this.selectedBackShow(this.personData, this.personSelectedArr);
      }
    },
    //搜索人
    doSearchPerson() {
      this.personSelectedArrBackup = JSON.parse(
        JSON.stringify(this.personSelectedArr)
      );
      if (this.searchVal) {
        this.isSearch = true;
        var reg = new RegExp(this.searchVal);
        let backupArr = JSON.stringify(this.personDataBackup);
        this.personData = JSON.parse(backupArr);
        this.selectedBackShow(this.personData, this.personSelectedArr);
        let arr = this.deal(this.personData, node => reg.test(node.title));
        // console.log(arr, "arr");
        let arrStr = JSON.stringify(arr);
        this.personData = JSON.parse(arrStr);
      } else {
        this.isSearch = false;
        let backupArr = JSON.stringify(this.personDataBackup);
        this.personData = JSON.parse(backupArr);
        this.selectedBackShow(this.personData, this.personSelectedArr);
      }
    },
    //筛选人

    /**
     * 递归过滤节点，生成新的树结构
     * @param {Node[]} nodes 要过滤的节点
     * @param {node => boolean} predicate 过滤条件，符合条件的节点保留
     * @return 过滤后的节点
     */
    deal(nodes, predicate) {
      // 如果已经没有节点了，结束递归
      if (!(nodes && nodes.length)) {
        return [];
      }
      const newChildren = [];
      for (const node of nodes) {
        if (predicate(node)) {
          // 如果节点符合条件，直接加入新的节点集
          newChildren.push(node);
          // node.children = this.deal(node.children, predicate);
        } else {
          // 如果当前节点不符合条件，递归过滤子节点，
          // 把符合条件的子节点提升上来，并入新节点集
          newChildren.push(...this.deal(node.children, predicate));
        }
      }
      return newChildren;
    },
    //回显选中
    selectedBackShow(arr, sarr) {
      let that = this;
      arr.forEach(item => {
        sarr.forEach(sitem => {
          if (item.account && item.account == sitem.account) {
            if (that.powerType == "admin" || that.powerType == "viewer") {
              item.checked = true;
            } else {
              item.selected = true;
            }
          }
        });
        if (item.children && item.children.length > 0) {
          this.selectedBackShow(item.children, sarr);
        }
      });
    },
    //删除单个人员
    delPerson(account, index) {
      this.personSelectedArr.splice(index, 1);
      let da = JSON.stringify(this.personDataBackup);
      this.personData = JSON.parse(da);
      this.selectedBackShow(this.personData, this.personSelectedArr);
    },
    //获取人员
    getPersonList() {
      this.personloading = true;
      this.$request.post(
        "api/user/oaGroupUserTrees",
        {},
        res => {
          let list = res.data;
          if (list.length > 0) {
            this.personTreeInit(list);
          }
          let personDataBackup = JSON.stringify(list);
          this.personDataBackup = JSON.parse(personDataBackup);
          this.personData = list;
          this.personloading = false;
        },
        fail => {
          this.personloading = false;
        },
        error => {
          this.personloading = false;
        }
      );
    },
    //清空选中企业
    cancelSelectedCompany() {
      this.companySelectedArr = [];
      this.getCompanyList();
    },
    //点击企业树 checkbox
    selectCompany(data) {
      this.companySelectedArr = [];
      data.forEach(item => {
        if (item.id) {
          this.companySelectedArr.push(item);
        }
      });
    },
    //初始化  人员树
    personTreeInit(arr) {
      arr.forEach((item, index) => {
        if (item) {
          // item.expand = false;

          if (item.users && item.users.length > 0) {
            item.children = item.children.concat(item.users);
          }
          if (item.children) {
            this.personTreeInit(item.children);
          }
        }
      });
    },
    //新增人员
    addPersonSave() {
      // roleId ;  List<String> users ; List<Integer> enterpriseIds
      // 查看者  ：viewer   编辑者 ：editor   审核者：auditor   管理员：admin

      let formData = new FormData();
      if (this.powerType == "editor" || this.powerType == "auditor") {
        if (this.personSelectedArr.length > 1) {
          this.$Notice.error({
            title: "提示",
            desc: "只能选一个人"
          });
          return false;
        }
      }
      let usersStr = JSON.stringify(this.personSelectedArr);
      formData.append("users", usersStr);

      if (this.powerType != "admin") {
        let cIds = [];
        if (this.companySelectedArr.length > 0) {
          this.companySelectedArr.forEach(item => {
            cIds.push(item.id);
          });
        }
        formData.append("enterpriseIds", cIds);
      }

      formData.append("roleId", this.roleId);
      this.isSubmit = true;
      this.$request.post(
        "api/userEnterpriseRole/save",
        formData,
        res => {
          this.isSubmit = false;
          this.$Notice.success({
            title: "提示",
            desc: "操作成功"
          });
          this.getRoleList();
          this.addPersonModalAdmin = false;
          this.addPersonModalViewer = false;
          this.addPersonModalAuditorEditor = false;
        },
        fail => {
          this.isSubmit = false;
          this.$Notice.error({
            title: "提示",
            desc: fail.message
          });
        },
        error => {
          this.isSubmit = false;
          this.$Notice.error({
            title: "提示",
            desc: error.message
          });
        }
      );
    },
    //获取企业
    getCompanyList() {
      this.$request.post("api/enterpriseArchitecture/treeSelect", {}, res => {
        let list = res.data;
        if (list.length > 0) {
          this.treeInit(list, "company");
        }
        this.companyListBackup = JSON.parse(JSON.stringify(list));
        this.companyList = list;
      });
    },
    //清空选中人员
    personCancel() {
      this.searchVal = "";
      this.isSearch = false;
      this.personSelectedArr = [];
      let bData = JSON.stringify(this.personDataBackup);
      this.personData = JSON.parse(bData);
    },
    //点击人员树 checkbox
    personTreeChecked(item) {
      console.log(item, "item");

      if (this.isSearch) {
        this.personSelectedArr = [];
        let barr = JSON.parse(JSON.stringify(this.personSelectedArrBackup));
        let itemArr = item;
        this.checkedMethod(itemArr, barr);
        this.personSelectedArr = barr.concat(itemArr);
      } else {
        this.personSelectedArr = [];
        this.recursionTreeDate(
          this.personData,
          this.personSelectedArr,
          "person"
        );
      }
    },

    checkedMethod(arr, sarr) {
      arr.forEach((item, index) => {
        sarr.forEach(sitem => {
          if (item.account == sitem.account) {
            arr.splice(index, 1);
          }
          if (item.children && item.children.length) {
            this.checkedMethod(item.children, sarr);
          }
        });
      });
    },

    auditorEditorSelect(data) {
      console.log(data, "d");
      this.personSelectedArr = [];
      if (!data[0].children || data[0].children.length == 0) {
        this.personSelectedArr = data;
      }
    },
    //点击 菜单 树checkbox
    changeTreeChecked(item) {
      this.powerCheckedArr = [];
      this.recursionTreeDate(this.menuList, this.powerCheckedArr, "power");
    },
    //递归-树数据 (公共方法)
    recursionTreeDate(arr, checkedArr, type) {
      arr.forEach(item => {
        if (type == "person") {
          if (item.checked && !item.indeterminate && !item.children) {
            checkedArr.push(item);
          }
        } else if (type == "company") {
          if (item.checked && !item.indeterminate) {
            checkedArr.push({ id: item.id, title: item.title });
          }
        } else {
          if (item.checked || item.indeterminate) {
            checkedArr.push(item.id);
          }
        }
        if (item.children && item.children.length > 0) {
          this.recursionTreeDate(item.children, checkedArr, type);
        }
      });
    },
    //取消权限
    powerCancel() {
      this.treeInit(this.menuList, "menu");
      this.roleId = "";
    },
    //初始化树
    treeInit(arr, type) {
      arr.forEach((item, index) => {
        item.expand = false;
        item.checked = false;
        if (type == "menu") {
          item.title = item.name;
        } else if (type == "company") {
          // if (item.id == 0) {
          //   item.disabled = true;
          // }
        }
        if (item.children) {
          this.treeInit(item.children, type);
        }
      });
    },
    //回显权限
    setPower(arr, powerArr) {
      arr.forEach((item, index) => {
        powerArr.forEach(itemP => {
          if (item.id == itemP) {
            if (item.children.length == 0) {
              item.checked = true;
            }
          }
        });
        if (item.children) {
          this.setPower(item.children, powerArr);
        }
      });
    },
    //获取菜单列表
    getMenuList() {
      this.$request.post("api/menu/treeSelect", {}, res => {
        this.menuList = [];
        let list = res.data;
        if (list.length > 0) {
          this.treeInit(list, "menu");
        }
        this.menuList = list;
      });
    },
    //获取角色权限
    getroleMenuList(id) {
      let formData = new FormData();
      formData.append("roleId", id);
      this.$request.post("/api/roleMenu/list", formData, res => {
        let list = res.data;

        this.powerCheckedArr = [];
        list.forEach(item => {
          this.powerCheckedArr.push(item.menuId);
        });
        this.setPower(this.menuList, this.powerCheckedArr);
      });
    },
    savePower() {
      let formData = new FormData();
      formData.append(" menuIds", this.powerCheckedArr);
      formData.append(" roleId", this.roleId);
      this.isSubmit = true;
      this.$request.post(
        "/api/roleMenu/save",
        formData,
        res => {
          this.isSubmit = false;
          this.$Notice.success({
            title: "提示",
            desc: "操作成功"
          });
          this.powerModal = false;
        },
        fail => {
          this.isSubmit = false;
          this.$Notice.error({
            title: "提示",
            desc: fail.message
          });
        },
        error => {
          this.isSubmit = false;
          this.$Notice.error({
            title: "提示",
            desc: error
          });
        }
      );
    },
    reSetSearch() {
      this.formItem.job = "";
    },
    changePage(val) {
      this.page = val;
      this.getRoleList();
    },
    changeSize(val) {
      this.limit = val;
      this.getRoleList();
    },
    changeOfficialListPage(val) {
      this.page = val;
      this.getOfficialList();
    },
    getRoleList() {
      let formData = new FormData();
      formData.append("limit", this.limit);
      formData.append("page", this.page);
      this.isLoading = true;
      this.$request.post("/api/role/list", formData, res => {
        this.isLoading = false;
        let arr = [];
        res.data.list.forEach(item => {
          arr.push({
            roleName: item.name,
            countPerson: item.countPerson,
            description: item.description,
            gmtModified: item.gmtModified,
            roleId: item.id,
            code: item.code
          });
        });
        this.authoRizationItems = arr;
        this.total = res.data.total;
      });
    },
    getOfficialList(roleId) {
      let formData = new FormData();
      formData.append("roleId", roleId);
      formData.append("limit", this.limit);
      formData.append("page", this.page);
      this.$request.post("api/user/list", formData, res => {
        let arr = [];
        res.data.list.forEach(item => {
          arr.push({
            officialsName: item.name,
            officialsPhone: item.phone,
            officialsCompany: item.enterpriseName
          });
        });
        this.officialsList = arr;
        this.total = res.data.total;
        console.log(this.officialsList);
      });
    },
    okBtn() {
      this.scanRole = false;
    }
  },
  created() {
    this.personSelectedNum = this.personSelectedArr.length;
    this.personSelectedSurplus =
      this.personData.length - this.personSelectedNum;
    // this.getRoleList();
    // this.getMenuList();
    this.isManager = localStorage.getItem("isManager");
    // this.getCompanyList();
    // this.getPersonList();

    //测试使用
    this.personTreeInit(this.personData);
    let data = JSON.stringify(this.personData);
    this.personDataBackup = JSON.parse(data);

    this.authoRizationItems = [{}]
  }
};
</script>
<style lang="scss">
.mgr20 {
  margin-right: 26px;
}
.add_wrap {
  width: 420px;
  float: left;
}
.addPersonbox {
  border: 1px solid #e8e8e8;
  width: 48%;
  height: 395px;
  .ivu-input-icon {
    right: 40px;
  }
  .personLi {
    font-size: 14px;
    padding-bottom: 5px;
  }
  .delPerson {
    cursor: pointer;
    font-size: 15px;
    color: rgb(158, 152, 152);
  }
  .delPerson:hover {
    color: red;
  }
  .treeBox {
    height: 300px;
    overflow-y: auto;
  }
  .searchPerson {
    padding-bottom: 10px;
  }

  .top_bar {
    padding: 8px;
    background-color: #eee;
    margin-bottom: 5px;
  }
  .padding5 {
    padding: 5px;
  }
  .clearPerson {
    color: #57a3f3;
    cursor: pointer;
  }
  .clearPerson:hover {
    color: #187de9;
  }
  .resultBox {
    max-height: 350px;
    overflow-y: auto;
  }
}
</style>
