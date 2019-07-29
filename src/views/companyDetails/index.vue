<template>
  <div class="companyDetails">
    <Row :gutter="10">
      <Col span="24">
        <Card class="search-card">
          <p slot="title">
            {{$route.meta.title}}
            <collapse-icon foldPart="search-body"></collapse-icon>
          </p>
          <div id="detail-body">
            <Form :model="formItem" :label-width="100">
              <Row>
                <Col span="24">
                  <Col span="4">
                    <h2 style="text-align:left;padding-left:20px">{{infoData.enterpriseName}}</h2>
                  </Col>
                  <Col span="8" offset="12">
                    <Button
                      type="primary"
                      @click="changeBusinessInfo"
                      v-if="infoData.status==1&&infoData.canEdit==1"
                    >变更企业信息</Button>
                    <Button @click="toExportWord=true" type="primary">导出公司简历</Button>
                    <Button type="primary" @click="viewlicense">查看营业执照</Button>
                    <Modal v-model="isShowlicense" fullscreen title="营业执照">
                      <div>
                        <img :src="licenseImg" alt />
                      </div>
                    </Modal>
                  </Col>
                </Col>
              </Row>
              <Row style="margin-top:20px">
                <Col span="24">
                  <Col span="6">
                    <p style="text-align:left;padding-left:20px">公司简介：{{infoData.introduction}}</p>
                  </Col>
                  <Col span="2" offset="13">
                    <!-- 0:变更审核中,1:正常 -->
                    <h3
                      style="color:red"
                    >{{infoData.status == 1 ? '正常' : infoData.status == 0 ? '变更审核中' : ''}}</h3>
                  </Col>
                </Col>
              </Row>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>

    <Row :gutter="10">
      <Col span="24">
        <Card class="search-card">
          <div id="bsdetail-body">
            <Form :model="formItem" :label-width="100">
              <Row>
                <Tabs type="card" class="demo-tabs-style1" :animated="false" @on-click="changeTabs">
                  <TabPane label="基本信息">
                    <Card>
                      <Row>
                        <Col span="24" style="text-align:left">
                          <h3>工商信息</h3>
                          <Row style="margin-top:30px">
                            <Col span="4">企业名称：{{infoData.enterpriseName}}</Col>
                            <Col span="4" offset="4">法定代表人：{{infoData.legalPerson}}</Col>
                          </Row>
                          <Row style="margin-top:30px">
                            <Col span="4">所属产业：{{infoData.industryName}}</Col>
                            <Col span="4" offset="4">统一社会信用代码：{{infoData.creditCode}}</Col>
                          </Row>
                          <Row style="margin-top:30px">
                            <Col span="4">
                              注册资本：
                              <span
                                v-if="infoData.registeredCapital"
                              >{{infoData.registeredCapital}}万人民币</span>
                            </Col>
                            <Col span="4" offset="4">
                              实缴资本：
                              <span
                                v-if="infoData.contributedCapital"
                              >{{infoData.contributedCapital}}万人民币</span>
                            </Col>
                          </Row>
                          <Row style="margin-top:30px">
                            <Col span="4">成立日期：{{infoData.buildDate}}</Col>
                          </Row>
                          <Row style="margin-top:30px">
                            <Col span="16">经营范围：{{infoData.businessScope}}</Col>
                          </Row>
                          <Row style="margin-top:30px">
                            <Col span="16">
                              工商异常：
                              <span style="color:red">{{infoData.businessAbnormal}}</span>
                            </Col>
                          </Row>
                          <div class="aboutHolder">
                            <Row style="margin-top:50px">
                              <Col>
                                <h3>股东信息</h3>
                              </Col>
                            </Row>
                            <Row style="margin-top:20px">
                              <Col>
                                <Table :columns="holderInfoItem" :data="holderInfoList" border></Table>
                                <div style="margin: 10px;overflow: hidden">
                                  <div style="float: right;">
                                    <Page
                                      :total="hoderLisTotal"
                                      :current="1"
                                      @on-change="changePageHoderList"
                                    ></Page>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div class="importPeople">
                            <Row style="margin-top:30px">
                              <Col>
                                <h3>重要人员信息</h3>
                              </Col>
                            </Row>
                            <Row style="margin-top:20px">
                              <Col>
                                <Table border :columns="imItmes" :data="impeople"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                  <div style="float: right;">
                                    <Page
                                      :total="imPersonTotal"
                                      :current="1"
                                      @on-change="changePageImPersonList"
                                    ></Page>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div class="branch">
                            <Row style="margin-top:30px">
                              <Col>
                                <h3>分支机构</h3>
                              </Col>
                            </Row>
                            <Row style="margin-top:20px">
                              <Col>
                                <Table border :columns="branchItem" :data="branchList"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                  <div style="float: right;">
                                    <Page
                                      :total="branchTotal"
                                      :current="1"
                                      @on-change="changePageBranchList"
                                    ></Page>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                          <div class="invest">
                            <Row style="margin-top:30px">
                              <Col>
                                <h3>对外投资</h3>
                              </Col>
                            </Row>
                            <Row style="margin-top:20px">
                              <Col>
                                <Table border :columns="invest" :data="abInvest"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                  <div style="float: right;">
                                    <Page
                                      :total="investTotal"
                                      :current="1"
                                      @on-change="changePageInvestList"
                                    ></Page>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </TabPane>
                  <TabPane label="固定资产投资情况">
                    <Card>
                      <Row>
                        <Col span="24" style="text-align:left">
                          <h3>固定资产投资情况</h3>
                          <div class="importPeople">
                            <Row style="margin-top:20px">
                              <Col>
                                <Table border :columns="fixedAssets" :data="assetsItems"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                  <div style="float: right;">
                                    <Page
                                      :total="gdzcTotal"
                                      :current="1"
                                      @on-change="pagechangeGDZC"
                                    ></Page>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </TabPane>
                  <TabPane label="长期股权投资情况">
                    <Card>
                      <Row>
                        <Col span="24" style="text-align:left">
                          <h3>长期资产投资情况</h3>
                          <div class="importPeople">
                            <Row style="margin-top:20px">
                              <Col>
                                <Table border :columns="longTermAssets" :data="longAssetsItmes"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                  <div style="float: right;">
                                    <Page
                                      :total="cqgqtzTotal"
                                      :current="1"
                                      @on-change="pagechangeCQGQTZ"
                                    ></Page>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </TabPane>
                  <TabPane label="企业大事记">
                    <Card>
                      <Row>
                        <Col span="24" style="text-align:left">
                          <h3>企业大事记</h3>
                          <div class="events">
                            <Row style="margin-top:20px">
                              <Col>
                                <Table border :columns="events" :data="abEvents"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                  <div style="float: right;">
                                    <Page :total="dsjTotal" :current="1" @on-change="pagechangeDsj"></Page>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </TabPane>
                  <TabPane label="荣誉">
                    <Card>
                      <Row>
                        <Col span="24" style="text-align:left">
                          <h3>荣誉</h3>
                          <div class="events">
                            <Row style="margin-top:20px">
                              <Col>
                                <Table border :columns="honour" :data="honourInfo"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                  <div style="float: right;">
                                    <Page
                                      :total="honorTotal"
                                      :current="1"
                                      @on-change="pagechangeHonor"
                                    ></Page>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </TabPane>
                  <TabPane label="变更记录">
                    <Card>
                      <Row>
                        <Col span="24" style="text-align:left">
                          <h3>变更记录</h3>
                          <div class="importPeople">
                            <Row style="margin-top:20px">
                              <Col>
                                <Table border :columns="changeLog" :data="aboutChange"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                  <div style="float: right;">
                                    <Page
                                      :total="changeHistoryTotal"
                                      :current="1"
                                      @on-change="pagechangeHistory"
                                    ></Page>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </TabPane>
                </Tabs>
              </Row>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>

    <Modal
      v-model="isShowHistoryInfo"
      draggable
      scrollable
      title="查看变更详情"
      :footer-hide="true"
      width="1300px"
    >
      <Table :columns="historyModelItem" :data="historyModelArr" border></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="getHistoryModelTotal"
            :current="1"
            @on-change="pagechangeHistoryModel"
            :page-size="getHistoryModelLimit"
          ></Page>
        </div>
      </div>
    </Modal>
    <Modal
      v-model="toExportWord"
      title="导出公司简历"
      @on-cancel="cancelExport"
    >
      <Table
        border
        ref="exportWords"
        :columns="exportItem"
        :data="exportInfo"
        @on-select="onSelectSinger"
        @on-select-all="onSelectAll"
        @on-selection-change="onSelectionChange"
      ></Table>
      <div slot="footer">
        <Button @click="cancelExport">取消</Button>
        <Button
          @click="toExport"
          type="primary"
          :disabled="isExport"
        >确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import host from "@/assets/js/host";
export default {
  data() {
    return {
      isExport: false,
      isSelected:false,
      module: "",
      selectArr: [],
      toExportWord: false,
      licenseImg: "",
      equityInvestmentId: "",
      assetsInvestmentId: "",
      historyModelArr: [],
      exportItem: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '类目',
          key: 'type',
        }
      ],
      exportInfo: [
        {
          type: '基本信息',
          value: 1
        },
        {
          type: '固定资产投资情况',
          value:2
        },
        {
          type: '长期股权投资情况',
          value:3
        },
        {
          type: '企业大事记',
          value:4
        },
        {
          type: '荣誉',
          value:5
        }
      ],
      historyModelItem: [
        {
          title: "变更记录",
          key: "changeItem"
        },
        {
          title: "变更前",
          key: "beforeChange",
          render: (h, params) => {
            return h("div", [
              h("span", {
                props: {
                  type: "person"
                },
                domProps: {
                  innerHTML: params.row.beforeChange
                }
              })
            ]);
          }
        },
        {
          title: "变更后",
          key: "afterChange",
          render: (h, params) => {
            return h("div", [
              h("span", {
                props: {
                  type: "person"
                },
                domProps: {
                  innerHTML: params.row.afterChange
                }
              })
            ]);
          }
        }
      ],
      isShowHistoryInfo: false,
      isShowlicense: false,
      tabLimit: 10,
      tabPage: 1,
      gdzcTotal: 0, //固定资产总数
      cqgqtzTotal: 0, //长期股权投资总数
      dsjTotal: 0, //企业大事记总数
      honorTotal: 0, //荣誉总数
      changeHistoryTotal: 0, //变更记录总数
      hoderLisTotal: 0,
      holderInfoItem: [
        {
          title: "股东",
          key: "shareholdersName"
        },
        {
          title: "持股比例",
          key: "shareholdingRatio",
          render: (h, params) => {
            return h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                on: {
                  click: () => {}
                }
              },
              params.row.shareholdingRatio + "%"
            );
          }
        },
        {
          title: "认缴出资额（万元）",
          key: "subscribedCapital"
        },
        {
          title: "认缴出资日期",
          key: "subscribedDate"
        },
        {
          title: "实缴出资额（万元）",
          key: "paidCapital"
        },
        {
          title: "实缴出资日期",
          key: "paidDate"
        }
      ],
      holderLimit: 10,
      holderPage: 1,
      imPersonLimit: 10,
      imPersonPage: 1,
      imPersonTotal: 0,
      branchLimit: 1,
      branchPage: 1,
      branchTotal: 1,
      investLimit: 1,
      investPage: 1,
      investTotal: 1,
      imPersonTotal: 0,
      holderInfoList: [],

      imItmes: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "职务",
          key: "positionStr"
        },
        {
          title: "任期",
          key: "date"
        },
        {
          title: "上任时间", // 何时办理工商变更手续
          key: "appointmentTime"
        },
        {
          title: "何时办理工商变更手续",
          key: "changeDate"
        }
      ],
      impeople: [],
      branchItem: [
        {
          title: "机构名称",
          key: "branchName"
        },
        {
          title: "负责人姓名",
          key: "headName"
        },
        {
          title: "成立日期",
          key: "establishDate"
        }
      ],
      branchList: [],
      invest: [
        {
          title: "企业名称",
          key: "enterpriseName",
          render: (h, params) => {
            return h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                style: {
                  color: "#2d8cf0",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    window.open(params.row.enterpriseLink);
                  }
                }
              },
              params.row.enterpriseName
            );
          }
        },
        {
          title: "注册资本（万元）",
          key: "registeredCapital"
        },
        {
          title: "出资比例",
          key: "contributionRatio",
          render: (h, params) => {
            return h(
              "span",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                on: {
                  click: () => {}
                }
              },
              params.row.contributionRatio + "%"
            );
          }
        },
        {
          title: "成立日期",
          key: "establishDate"
        }
      ],
      abInvest: [],
      // 固定资产list配置
      fixedAssets: [
        {
          title: "项目名称",
          key: "projectName",
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
                      console.log(params);
                    }
                  }
                },
                params.row.projectName
              )
            ]);
          }
        },
        {
          title: "项目所属行业",
          key: "projectIndustry"
        },
        {
          title: "项目注册地",
          key: "projectRegistry"
        },
        {
          title: "项目首期开工时间", // 何时办理工商变更手续
          key: "startingDate"
        },
        {
          title: "操作",
          key: "operation",
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
                      this.assetsInvestmentId = params.row.id;
                      this.$router.push(
                        "/assetsInvestmentDetails/" + this.assetsInvestmentId
                      );
                    }
                  }
                },
                "查看投资情况"
              )
            ]);
          }
        }
      ],
      // 固定资产list
      assetsItems: [
        // {
        //   project: "蓝业投资",
        //   projectType: "It行业",
        //   projectPlace: "福建厦门湖里区",
        //   become: "2016-11-03",
        //   operation: "查看投资情况"
        // }
      ],
      //长期股权投资item配置
      longTermAssets: [
        {
          title: "项目名称",
          key: "projectName",
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
                      console.log(params);
                    }
                  }
                },
                params.row.projectName
              )
            ]);
          }
        },
        {
          title: "项目所属行业",
          key: "projectIndustry"
        },
        {
          title: "项目注册地",
          key: "projectRegistry"
        },
        {
          title: "项目首期注册时间", // 何时办理工商变更手续
          key: "startingDate"
        },
        {
          title: "是否控股",
          key: "isHolding"
        },
        {
          title: "投资类型",
          key: "investmentTypeStr"
        },
        {
          title: "操作",
          key: "operation",
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
                      this.equityInvestmentId = params.row.id;
                      console.log(params.row);
                      this.$router.push(
                        "/equityInvestmentDetails/" + this.equityInvestmentId
                      );
                    }
                  }
                },
                "查看投资情况"
              )
            ]);
          }
        }
      ],
      //长期股权投资
      longAssetsItmes: [],
      imgArr: [],
      events: [
        {
          title: "时间",
          key: "eventDate"
        },
        {
          title: "事件名称",
          key: "eventName"
        },
        {
          title: "简介",
          key: "introduction"
        },
        {
          title: "证明图片",
          key: "provePic",
          render: (h, params) => {
            let imgs = params.row.attachment;
            let imgItems = [];
            imgs.forEach(item => {
              imgItems.push({
                imgName: item.fileName,
                imgUrl: item.path
              });
            });
            return h(
              "ul",
              imgItems.map(function(item, index) {
                return h(
                  "li",
                  {
                    style: {
                      listStyle: "none"
                    }
                  },
                  [
                    h(
                      "a",
                      {
                        domProps: {
                          href: item.imgUrl,
                          target: "_black"
                        },
                        style: {
                          marginRight: "5px"
                        },
                        on: {
                          click: () => {
                            console.log(item.imgUrl);
                          }
                        }
                      },
                      item.imgName
                    )
                  ]
                );
              })
            );
          }
        }
      ],
      abEvents: [],
      honour: [
        {
          title: "时间",
          key: "awardDate"
        },
        {
          title: "级别",
          key: "level"
        },
        {
          title: "名称",
          key: "honorName"
        },
        {
          title: "证明图片",
          key: "provePic",
          render: (h, params) => {
            let imgs = params.row.attachment;
            let imgItems = [];
            imgs.forEach(item => {
              imgItems.push({
                imgName: item.fileName,
                imgUrl: item.path
              });
            });
            return h(
              "ul",
              imgItems.map(function(item, index) {
                return h(
                  "li",
                  {
                    style: {
                      listStyle: "none"
                    }
                  },
                  [
                    h(
                      "a",
                      {
                        domProps: {
                          href: item.imgUrl,
                          target: "_black"
                        },
                        style: {
                          marginRight: "5px"
                        },
                        on: {
                          click: () => {

                          }
                        }
                      },
                      item.imgName
                    )
                  ]
                );
              })
            );
          }
        }
      ],
      honourInfo: [],
      changeLog: [
        {
          title: "序号",
          key: "index",
          width: 80
        },
        {
          title: "变更时间",
          key: "changeDate",
          width: 240,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
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
                      console.log(params);
                    }
                  }
                },
                params.row.changeDate
              ),
              h(
                "h4",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px",
                    color: "red"
                  },
                  on: {
                    click: () => {}
                  }
                },
                params.row.status
              )
            ]);
          }
        },
        {
          title: "编辑人",
          key: "editorName",
          width: 150
        },
        {
          title: "联系方式",
          key: "editorPhone",
          width: 200
        },
        {
          title: "操作",
          key: "changeDate",
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
                      this.isShowHistoryInfo = true;
                      this.getHistoryModelArr(params.row.id);
                      this.enterpriseChangeId = params.row.id;
                    }
                  }
                },
                "查看变更详情"
              )
            ]);
          }
        }
      ],
      aboutChange: [],
      problemList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      formValidate: {
        name: "",
        leadingcadre: "",
        city: "",
        approver: "",
        interest: [],
        date: "",
        industrytype: "",
        desc: ""
      },
      formItem: {
        assignCycle: "",
        assignCycleUnit: "hour",
        assignNoticeRole: "",
        maintainCycle: 1,
        maintainCycleType: "day",
        maintainNoticeRole: ""
      },
      businessItem: [
        {
          title: " ",
          type: "selection",
          key: "check",
          width: 50
        },
        {
          title: "负责企业",
          key: "componey",
          width: 250
        },
        {
          title: "问题名称",
          key: "problemname",
          width: 250
        },
        {
          title: "状态",
          key: "problemstatus",
          width: 150
        },
        {
          title: "提交时间",
          key: "date",
          width: 200
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
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "查看情况"
              ),
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
                      this.remove(params.index);
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
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      businessData: [
        {
          componey: "投资公司",
          problemname: "翔安项目问题",
          problemstatus: "已解决",
          year: "2018",
          date: "2016-10-03",
          status: "变更中"
        },
        {
          componey: "园林公司",
          problemname: "翔安项目问题",
          problemstatus: "未解决",
          year: "2018",
          date: "2016-10-01",
          status: "正常"
        }
      ],
      infoData: {},
      tabIndex: 0,
      getHistoryModelLimit: 6,
      getHistoryModelPage: 1,
      getHistoryModelTotal: 0,
      enterpriseChangeId: ""
    };
  },
  created() {
    // this.getInfo(this.$route.params.id);
  },
  methods: {
    exportWord() {
      this.isExport = true
      window.open(
        host.host +
          "api/enterprise/exportWord?token=" +
          localStorage.getItem("token") +
          "&enterpriseId=" +
          this.$route.params.id + "&module=" +
        this.module
      );
      this.isExport = false
    },
    toExport () {
      this.toExportWord = true
      this.exportModuleArr()
      if (this.module === "") {
        this.$Notice.error({
          title: "提示",
          desc: "请选择导出模块"
        });
      } else {
        this.exportWord()
        this.toExportWord = false
      }
    },
    cancelExport () {
      this.handleSelectAll(false);
      this.toExportWord =false
    },
    onSelectAll(obj) {
      this.selectArr = obj;
    },
    onSelectSinger(obj) {
      this.selectArr = obj;
    },
    onSelectionChange(obj) {
      this.selectArr = obj;
    },
    exportModuleArr () {
      let ids = ""
      this.selectArr.forEach(item => {
        ids = ids+item.value + ","
      })
      this.module = ids
    },
    viewlicense() {
      if (this.infoData.license) {
        this.isShowlicense = true;
        this.licenseImg = host.host + this.infoData.license.path;
      } else {
        this.$Notice.error({
          title: "提示",
          desc: "还未上传营业执照"
        });
      }
    },
    //查看变更记录详情 分页
    pagechangeHistoryModel(val) {
      this.getHistoryModelPage = val;
      this.getHistoryModelArr(this.enterpriseChangeId);
    },
    //固定资产分页
    pagechangeGDZC() {
      this.getTabList({
        type: this.tabIndex
      });
    },
    //长期投资分页
    pagechangeCQGQTZ() {
      this.getTabList({
        type: this.tabIndex
      });
    },
    //大事记分页
    pagechangeDsj() {
      this.getTabList({
        type: this.tabIndex
      });
    },
    //荣誉分页
    pagechangeHonor() {
      this.getTabList({
        type: this.tabIndex
      });
    },
    //变更记录分页
    pagechangeHistory() {
      this.getTabList({
        type: this.tabIndex
      });
    },
    changeTabs(name) {
      this.tabIndex = name;
      // if (name == 1) {
      //   // 固定资产投资情况
      // } else if (name == 2) {
      //   //长期股权投资情况
      // } else if (name == 3) {
      //   //企业大事记
      // } else if (name == 4) {
      //   //荣誉
      // } else if (name == 5) {
      //   //变更记录
      // }
      if (name != 0) {
        this.getTabList({
          type: name
        });
      }
    },
    getTabList(obj) {
      let url = "";
      if (obj.type == 1) {
        // 固定资产投资情况
        url = "api/fixedAssetsInvestment/list";
      } else if (obj.type == 2) {
        //长期股权投资情况
        url = "api/longtermEquityInvestment/list";
      } else if (obj.type == 3) {
        //企业大事记
        url = "api/businessEvent/list";
      } else if (obj.type == 4) {
        //荣誉
        url = "api/honor/list";
      } else if (obj.type == 5) {
        //变更记录
        url = "api/enterpriseChange/list ";
      }
      let formData = new FormData();
      formData.append("enterpriseId", this.$route.params.id);
      formData.append("limit", this.tabLimit);
      formData.append("page", this.tabPage);
      this.isLoading = true;
      this.$request.post(
        url,
        formData,
        res => {
          this.isLoading = false;
          let list = res.data.list;
          if (obj.type == 1) {
            // 固定资产投资情况
            this.gdzcTotal = res.data.total;
            this.assetsItems = list.map(item => {
              if (item.startingDate) {
                item.startingDate = item.startingDate.substring(0, 10);
              }
              return item;
            });
          } else if (obj.type == 2) {
            //长期股权投资情况
            this.cqgqtzTotal = res.data.total;
            this.longAssetsItmes = list.map(item => {
              if (item.startingDate) {
                item.startingDate = item.startingDate.substring(0, 10);
              }
              item.isHolding = item.isHolding == 0 ? "否" : "是";
              return item;
            });
          } else if (obj.type == 3) {
            //企业大事记
            this.dsjTotal = res.data.total;
            this.abEvents = list.map(item => {
              if (item.eventDate) {
                item.eventDate = item.eventDate.substring(0, 10);
              }
              // item.imgArr = [
              //   h(
              //     "a",
              //     {
              //       props: {
              //         type: "error",
              //         size: "small"
              //       },
              //       style: {
              //         marginRight: "10px"
              //       },
              //       on: {
              //         click: () => {
              //           // console.log(params);
              //         }
              //       }
              //     },
              //     1+".图片1.jpg"
              //   ),
              //   h(
              //     "a",
              //     {
              //       props: {
              //         type: "error",
              //         size: "small"
              //       },
              //       style: {
              //         marginRight: "10px"
              //       },
              //       on: {
              //         click: () => {
              //           // console.log(params);
              //         }
              //       }
              //     },
              //     "2.33.png"
              //   )
              // ];

              return item;
            });
          } else if (obj.type == 4) {
            //荣誉
            this.honourInfo = list.map(item => {
              if (item.awardDate) {
                item.awardDate = item.awardDate.substring(0, 10);
              }

              return item;
            });
            this.honorTotal = res.data.total;
          } else if (obj.type == 5) {
            //变更记录
            this.aboutChange = list.map(item => {
              if (item.changeDate) {
                item.changeDate = item.changeDate.substring(0, 10);
              }
              //审批状态(0:审批中,1:审批通过,2:审批驳回)
              item.status =
                item.status == 0
                  ? "审批中"
                  : item.status == 1
                  ? "审批通过"
                  : item.status == 2
                  ? "审批驳回"
                  : "";

              return item;
            });

            this.aboutChange.forEach((item, index) => {
              item.index = index + 1;
            });
            this.changeHistoryTotal = res.data.total;
          }
          this.abInvest = list.map(item => {
            if (item.establishDate) {
              item.establishDate = item.establishDate.substring(0, 10);
            }
            return item;
          });
          this.investTotal = res.data.total;
        },
        res => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    },
    //股东分页
    changePageHoderList(val) {
      this.holderPage = val;
      this.getHodlerInfo(this.infoData.enterpriseId);
    },
    //重要人员分页
    changePageImPersonList(val) {
      this.imPersonPage = val;
      this.getImportantPersonInfo(this.infoData.enterpriseId);
    },

    //分支机构分页
    changePageBranchList(val) {
      this.branchPage = val;
      this.getBranchInfo(this.infoData.enterpriseId);
    }, //
    //对外投资分页
    changePageInvestList(val) {
      this.investPage = val;
      this.getInvestInfo(this.infoData.enterpriseId);
    },

    handleSelectAll(status) {
      this.$refs.exportWords.selectAll(status);
    },
    changeBusinessInfo() {
      this.$router.push("/changeBusinessInfo/" + this.$route.params.id);
    },
    getInfo(id) {
      this.isLoading = true;
      this.$request.post(
        "api/enterprise/info/" + id,
        {},
        res => {
          this.isLoading = false;
          let data = res.data;

          if (data.establishDate && data.establishDate.length > 10) {
            data.buildDate = data.establishDate.substring(0, 10);
          } else {
            data.buildDate = "";
          }
          this.infoData = data;
          this.getHodlerInfo(data.enterpriseId);
          this.getImportantPersonInfo(data.enterpriseId);
          this.getBranchInfo(data.enterpriseId);
          this.getInvestInfo(data.enterpriseId);
        },
        res => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    },
    //股东
    getHodlerInfo(id) {
      let formData = new FormData();
      formData.append("enterpriseId", id);
      formData.append("limit", this.holderLimit);
      formData.append("page", this.holderPage);
      this.isLoading = true;
      this.$request.post(
        "api/shareholdersInfo/list",
        formData,
        res => {
          this.isLoading = false;
          let list = res.data.list;
          this.holderInfoList = list.map(item => {
            if (item.subscribedDate) {
              item.subscribedDate = item.subscribedDate.substring(0, 10);
            }
            if (item.paidDate) {
              item.paidDate = item.paidDate.substring(0, 10);
            }
            return item;
          });
          this.hoderLisTotal = res.data.total;
        },
        res => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    },
    //重要人员
    getImportantPersonInfo(id) {
      let formData = new FormData();
      formData.append("enterpriseId", id);
      formData.append("limit", this.imPersonLimit);
      formData.append("page", this.imPersonPage);
      this.isLoading = true;
      this.$request.post(
        "api/importantPerson/list",
        formData,
        res => {
          this.isLoading = false;
          let list = res.data.list;

          list = list.map(item => {
            if (item.termStart) {
              item.termStart = item.termStart.substring(0, 10);
            }
            if (item.termEnd) {
              item.termEnd = item.termEnd.substring(0, 10);
            }

            if (item.appointmentTime) {
              item.appointmentTime = item.appointmentTime.substring(0, 10);
            }
            if (item.changeDate) {
              item.changeDate = item.changeDate.substring(0, 10);
            }

            return item;
          });

          this.impeople = list;
          this.impeople.forEach(item => {
            item.date = item.termStart + "~" + item.termEnd;
          });

          this.imPersonTotal = res.data.total;
        },
        res => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    },
    //分支机构
    getBranchInfo(id) {
      let formData = new FormData();
      formData.append("enterpriseId", id);
      formData.append("limit", this.holderLimit);
      formData.append("page", this.holderPage);
      this.isLoading = true;
      this.$request.post(
        "api/branch/list",
        formData,
        res => {
          this.isLoading = false;
          let list = res.data.list;
          this.branchList = list.map(item => {
            if (item.establishDate) {
              item.establishDate = item.establishDate.substring(0, 10);
            }
            return item;
          });
          this.hoderLisTotal = res.data.total;
        },
        res => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    },
    //对外投资
    getInvestInfo(id) {
      let formData = new FormData();
      formData.append("enterpriseId", id);
      formData.append("limit", this.holderLimit);
      formData.append("page", this.holderPage);
      this.isLoading = true;
      this.$request.post(
        "api/outboundInvestment/list",
        formData,
        res => {
          this.isLoading = false;
          let list = res.data.list;
          this.abInvest = list.map(item => {
            if (item.establishDate) {
              item.establishDate = item.establishDate.substring(0, 10);
            }
            return item;
          });
          this.investTotal = res.data.total;
        },
        res => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
    },
    //查看变更记录
    getHistoryModelArr(id) {
      let formData = new FormData();
      formData.append("enterpriseChangeId", id);
      formData.append("limit", this.getHistoryModelLimit);
      formData.append("page", this.getHistoryModelPage);
      this.isLoading = true;
      this.$request.post(
        "api/enterpriseChangeRecord/list ",
        formData,
        res => {
          this.isLoading = false;
          let list = res.data.list;
          // this.historyModelArr = list.map(item => {
          //   if (item.establishDate) {
          //     item.establishDate = item.establishDate.substring(0, 10);
          //   }
          //   return item;
          // });
          this.historyModelArr = list;
          this.getHistoryModelTotal = res.data.total;
          console.log(this.getHistoryModelTotal);
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
<style>
.companyDetails .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.companyDetails
  .demo-tabs-style1
  > .ivu-tabs-card
  > .ivu-tabs-content
  > .ivu-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.companyDetails
  .demo-tabs-style1
  > .ivu-tabs.ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab {
  border-color: transparent;
}

.companyDetails
  .demo-tabs-style1
  > .ivu-tabs-card
  > .ivu-tabs-bar
  .ivu-tabs-tab-active {
  border-color: #fff;
}
</style>
