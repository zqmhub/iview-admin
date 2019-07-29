<style lang="scss">
.showproveImg {
  padding: 6px 0;
}
.showproveImg:hover {
  color: #3380dc;
}
.submitApproval {
  height: 40px !important;
}
.btnBox {
  float: right;
}
// .honor_upload_list {
//   display: inline-block;
//   width: 58px;
//   height: 58px;
//   text-align: center;
//   line-height: 58px;
//   border: 1px solid transparent;
//   border-radius: 4px;
//   overflow: hidden;
//   background: #fff;
//   position: relative;
//   box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
//   margin-right: 4px;
//   img {
//     width: 100%;
//     height: 100%;
//   }
//   .demo-upload-list-cover {
//     display: none;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     background: rgba(0, 0, 0, 0.6);
//   }
//   .demo-upload-list:hover .demo-upload-list-cover {
//     display: block;
//   }
//   .demo-upload-list-cover i {
//     color: #fff;
//     font-size: 20px;
//     cursor: pointer;
//     margin: 0 2px;
//   }
// }
.honorUploadImgModal {
  .ivu-modal-mask {
    z-index: 99999999;
  }
  .ivu-modal-wrap {
    z-index: 99999999;
  }
}
.showImg {
  width: 1200px;
  height: 500px;
  text-align: center;
  line-height: 500px;
  img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.business-upload {
  width: 200px;
  height: 200px;
  line-height: 200px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

.ivu-card-head p {
  height: 40px;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  line-height: 40px;
}
/*.demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {*/
/*height: 120px;*/
/*margin-top: -16px;*/
/*}*/

.changeBusinessInfo
  .demo-tabs-style1
  > .ivu-tabs-card
  > .ivu-tabs-content
  > .ivu-tabs-tabpane {
  background: #fff;
  padding: 16px;
}
.changeBusinessInfo
  .demo-tabs-style1
  > .ivu-tabs-card
  > .ivu-tabs-content
  > .ivu-tabs-tabpane {
  border: 1px solid #e9eaec;
  border-top: none;
}
.changeBusinessInfo .ivu-tabs-bar {
  margin-bottom: 0;
}
.submitInfo {
  margin-top: 50px;
}
.countNum {
  position: absolute;
  right: 20px;
  bottom: 5px;
}
.changeBusinessInfo .ivu-date-picker {
  width: 100%;
}
.tabtitle {
  text-align: left;
}
.pos {
  position: relative;
}
.tips {
  position: absolute;
  top: 0;
  right: 0;
}
.multiTitle {
  /* display:inline-block; */
  float: left;
}
.multiBtn {
  float: right;
}
.textLbox .ivu-form-item-content {
  text-align: left !important;
}
</style>
<template>
  <div class="changeBusinessInfo">
    <Row>
      <Card>
        <p slot="title" class="submitApproval">
          <span>变更企业信息</span>
          <span class="btnBox">
            <!-- 企业编辑提交审核 ：/api/enterpriseDraft/submitAudit    参数传：enterpriseId -->
            <Button
              :loading="isSubmit_sh"
              :disabled="isSubmit_sh"
              type="primary"
              @click="submitConfirm"
            >提交审核</Button>
            <Button type="default" @click="$router.back(-1)">返回</Button>
          </span>
        </p>
        <div>
          <Row :gutter="16">
            <div class="itemBox">
              <Col span="24" class="demo-tabs-style1">
                <Tabs type="card" :animated="false" @on-click="tabClick">
                  <TabPane label="公司简介">
                    <Form
                      ref="introductionForm"
                      :model="introductionData"
                      :rules="introductionRules"
                      :inline="false"
                    >
                      <FormItem label prop="introduction">
                        <Input
                          type="textarea"
                          :autosize="{minRows: 5,maxRows: 10}"
                          placeholder="请输入公司简介"
                          :maxlength="300"
                          v-model="introductionData.introduction"
                          @input="itdTxtInput"
                        ></Input>
                        <span class="countNum">{{itdTxtVal}}/300</span>
                      </FormItem>
                      <FormItem>
                        <Button
                          :loading="isSubmit"
                          :disabled="isSubmit"
                          type="primary"
                          @click="introductionSubmit('introductionForm')"
                        >保存</Button>
                      </FormItem>
                    </Form>
                  </TabPane>
                  <TabPane label="工商信息">
                    <Row>
                      <h3 class="tabtitle">工商信息</h3>
                    </Row>
                    <Form
                      ref="businessForm"
                      :model="businessFormData"
                      label-position="left"
                      :rules="businessFormRules"
                    >
                      <Row type="flex" justify="space-between">
                        <Col span="6" class="pos">
                          <FormItem label="公司名称" prop="enterpriseName">
                            <Input
                              v-model="businessFormData.enterpriseName"
                              placeholder="请填写公司名称"
                              :maxlength="50"
                            ></Input>
                          </FormItem>
                          <Tooltip content="请填写营业执照上完整的公司名称" placement="top" class="tips">
                            <Button type="text" size="small" icon="ios-information">填写帮助</Button>
                          </Tooltip>
                        </Col>
                        <Col span="6">
                          <FormItem label="产业类型" prop="industryIdArr">
                            <Cascader
                              change-on-select
                              :data="industryIdData"
                              v-model="businessFormData.industryIdArr"
                            ></Cascader>
                          </FormItem>
                        </Col>
                        <Col span="6">
                          <FormItem label="企业法人" prop="legalPerson">
                            <Input
                              v-model="businessFormData.legalPerson"
                              placeholder="请填写姓名"
                              :maxlength="50"
                            ></Input>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row type="flex" justify="space-between">
                        <Col span="6">
                          <FormItem label="成立日期" prop="establishDate" required>
                            <DatePicker
                              type="date"
                              placeholder="选择日期"
                              :editable="false"
                              value="yyyy-MM-dd"
                              v-model="businessFormData.establishDate"
                              @on-change="establishDateChange"
                            ></DatePicker>
                          </FormItem>
                        </Col>
                        <Col span="6">
                          <FormItem label="注册资本(万元)" prop="registeredCapital">
                            <Input
                              v-model="businessFormData.registeredCapital"
                              placeholder="请填写金额"
                              :maxlength="9"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col span="6">
                          <FormItem label="实缴资本（万元）" prop="contributedCapital">
                            <Input
                              v-model="businessFormData.contributedCapital"
                              :maxlength="9"
                              placeholder="请填写金额"
                            ></Input>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row type="flex" justify="space-between">
                        <Col span="6">
                          <FormItem label="统一社会信用代码" prop="creditCode">
                            <Input
                              v-model="businessFormData.creditCode"
                              placeholder="请输入统一社会信用代码"
                              :maxlength="18"
                            ></Input>
                          </FormItem>
                        </Col>
                        <Col span="6">
                          <FormItem label="营业执照" required>
                            <div
                              class="demo-upload-list business-upload"
                              v-for="item in uploadList"
                            >
                              <template v-if="item.status === 'finished'">
                                <img :src="item.url" />
                                <div class="demo-upload-list-cover">
                                  <Icon
                                    type="ios-eye-outline"
                                    @click.native="handleViewBusiness(item.url)"
                                  ></Icon>
                                  <Icon
                                    type="ios-trash-outline"
                                    @click.native="handleRemoveBusiness"
                                  ></Icon>
                                </div>
                              </template>
                              <template v-else>
                                <Progress
                                  v-if="item.showProgress"
                                  :percent="item.percentage"
                                  hide-info
                                ></Progress>
                              </template>
                            </div>
                            <Upload
                              accept=".jpg, .jpeg, .png, .bmp"
                              ref="uploadLicense"
                              :show-upload-list="false"
                              :default-file-list="defaultList"
                              :on-success="handleSuccessBusiness"
                              :format="['jpg','jpeg','png','bmp']"
                              :max-size="10240"
                              :on-format-error="handleFormatErrorBusiness"
                              :on-exceeded-size="handleMaxSizeBusiness"
                              :before-upload="handleBeforeUploadBusiness"
                              :headers="{token:token}"
                              type="drag"
                              :action="host+'/api/attachment/upload'"
                              style="display: inline-block;width:58px;"
                            >
                              <div
                                style="width: 58px;height:58px;line-height: 58px;"
                                v-if="uploadList.length<1"
                              >
                                <Icon type="ios-camera" size="20"></Icon>
                              </div>
                            </Upload>
                            <Modal title="查看图片" v-model="visible">
                              <img :src="showBusinessImg" v-if="visible" style="width: 100%" />
                            </Modal>
                          </FormItem>
                        </Col>
                        <Col span="6"></Col>
                      </Row>

                      <Row>
                        <Col span="20">
                          <FormItem label="经营范围" prop="businessScope">
                            <Input
                              type="textarea"
                              :autosize="{minRows: 5,maxRows: 10}"
                              placeholder="请输入介绍信息"
                              :maxlength="300"
                              v-model="businessFormData.businessScope"
                              @input="itdTxtInput"
                            ></Input>
                            <span class="countNum">{{businessScopeTxtVal}}/300</span>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span="20">
                          <FormItem label="工商异常情况" prop="businessAbnormal">
                            <Input
                              type="textarea"
                              :autosize="{minRows: 5,maxRows: 10}"
                              placeholder="请输入介绍信息"
                              :maxlength="300"
                              v-model="businessFormData.businessAbnormal"
                              @input="itdTxtInput"
                            ></Input>
                            <span class="countNum">{{businessAbnormalTxtVal}}/300</span>
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <FormItem>
                          <Button
                            :loading="isSubmit"
                            :disabled="isSubmit"
                            type="primary"
                            @click="businessSubmit('businessForm')"
                          >保存</Button>
                        </FormItem>
                      </Row>
                    </Form>
                  </TabPane>
                  <TabPane label="股东信息">
                    <Row class="between">
                      <h3 class="multiTitle">股东信息</h3>
                      <Button
                        @click="holdersFormModal=true"
                        type="primary"
                        class="multiBtn"
                        icon="plus"
                      >新增</Button>
                    </Row>
                    <Row>
                      <div class="table-part" style="margin-top:20px">
                        <Table :columns="holdersItem" :data="holdersList" ref="table"></Table>
                      </div>
                      <div style="text-align:right;padding-top:10px">
                        <Page
                          :total="holdertotal"
                          :current="1"
                          @on-change="holderchangePage"
                          @on-page-size-change="holderchangeSize"
                        ></Page>
                      </div>
                    </Row>
                  </TabPane>
                  <TabPane label="分支机构">
                    <Row>
                      <h3 class="multiTitle">分支机构</h3>
                      <Button
                        type="primary"
                        class="multiBtn"
                        @click="branchFormModal=true"
                        icon="plus"
                      >新增</Button>
                    </Row>
                    <Row>
                      <div class="table-part" style="margin-top:20px">
                        <Table stripe border :columns="branchItem" :data="branchList" ref="table"></Table>
                      </div>
                      <div style="text-align:right;padding-top:10px">
                        <Page
                          :total="branchtotal"
                          :current="1"
                          @on-change="branchchangePage"
                          @on-page-size-change="branchchangeSize"
                        ></Page>
                      </div>
                    </Row>
                  </TabPane>
                  <TabPane label="对外投资">
                    <Row>
                      <h3 class="multiTitle">对外投资</h3>
                      <Button
                        type="primary"
                        class="multiBtn"
                        @click="outboundInvestmentModal = true"
                        icon="plus"
                      >新增</Button>
                    </Row>
                    <Row>
                      <div class="table-part" style="margin-top:20px">
                        <Table
                          border
                          :columns="outboundInvestmentItem"
                          :data="outboundInvestmentList"
                          ref="table"
                        ></Table>
                      </div>
                      <div style="text-align:right;padding-top:10px">
                        <Page
                          :total="outtotal"
                          :current="1"
                          @on-change="outchangePage"
                          @on-page-size-change="outchangeSize"
                        ></Page>
                      </div>
                    </Row>
                  </TabPane>
                  <TabPane label="重要人员信息">
                    <Row class="between">
                      <h3 class="multiTitle">重要人员信息</h3>
                      <Button
                        type="primary"
                        class="multiBtn"
                        @click="importantPersonModal=true"
                        icon="plus"
                      >新增</Button>
                    </Row>
                    <Row>
                      <div class="table-part" style="margin-top:20px">
                        <Table
                          stripe
                          border
                          :columns="importantPersonItem"
                          :data="importantPersonList"
                          ref="table"
                        ></Table>
                      </div>
                      <div style="text-align:right;padding-top:10px">
                        <Page
                          :total="importtotal"
                          :current="1"
                          @on-change="importchangePage"
                          @on-page-size-change="importchangeSize"
                        ></Page>
                      </div>
                    </Row>
                  </TabPane>
                  <TabPane label="固定资产投资情况">
                    <Row>
                      <h3 class="multiTitle">固定资产投资情况</h3>
                      <Button
                        type="primary"
                        class="multiBtn"
                        @click="fixedAssetsModal=true"
                        icon="plus"
                      >新增</Button>
                    </Row>
                    <Row>
                      <div class="table-part" style="margin-top:20px">
                        <Table
                          border
                          :columns="fixedAssetsInvestmentItem"
                          :data="fixedAssetsInvestmentList"
                          ref="table"
                        ></Table>
                      </div>
                      <div style="text-align:right;padding-top:10px">
                        <Page
                          :total="fixtotal"
                          :current="1"
                          @on-change="fixchangePage"
                          @on-page-size-change="fixchangeSize"
                        ></Page>
                      </div>
                    </Row>
                  </TabPane>
                  <TabPane label="长期股权投资情况">
                    <Row>
                      <h3 class="multiTitle">长期股权投资情况</h3>
                      <Button
                        type="primary"
                        class="multiBtn"
                        @click="longtermEquityInvestmentModal=true"
                        icon="plus"
                      >新增</Button>
                    </Row>
                    <Row>
                      <div class="table-part" style="margin-top:20px">
                        <Table
                          border
                          :columns="longtermEquityInvestmentItem"
                          :data="longtermEquityInvestmentList"
                          ref="table"
                        ></Table>
                      </div>
                      <div style="text-align:right;padding-top:10px">
                        <Page
                          :total="longtotal"
                          :current="1"
                          @on-change="longchangePage"
                          @on-page-size-change="longchangeSize"
                        ></Page>
                      </div>
                    </Row>
                  </TabPane>
                  <TabPane label="荣誉">
                    <Row>
                      <h3 class="multiTitle">荣誉</h3>
                      <Button
                        type="primary"
                        class="multiBtn"
                        @click="honorModal = true"
                        icon="plus"
                      >新增</Button>
                    </Row>
                    <Row>
                      <div class="table-part" style="margin-top:20px">
                        <Table border :columns="honorItem" :data="honorList"></Table>
                      </div>
                      <div style="text-align:right;padding-top:10px">
                        <Page
                          :total="honortotal"
                          :current="1"
                          @on-change="honorchangePage"
                          @on-page-size-change="honorchangeSize"
                        ></Page>
                      </div>
                    </Row>
                  </TabPane>
                  <TabPane label="企业大事记">
                    <Row>
                      <h3 class="multiTitle">企业大事记</h3>
                      <Button type="primary" class="multiBtn" @click="addInfo" icon="plus">新增</Button>
                    </Row>
                    <Row>
                      <div class="table-part" style="margin-top:20px">
                        <Table border :columns="events" :data="abEvents"></Table>
                      </div>
                      <div style="text-align:right;padding-top:10px">
                        <Page
                          :total="eventtotal"
                          :current="1"
                          @on-change="eventchangePage"
                          @on-page-size-change="eventchangeSize"
                        ></Page>
                      </div>
                    </Row>
                  </TabPane>
                </Tabs>
              </Col>
            </div>
          </Row>
        </div>
      </Card>
    </Row>

    <!-- 股东信息 modal-->
    <Modal v-model="holdersFormModal" title="股东信息" @on-cancel="cancelHoldersForm">
      <Form ref="holdersFormRef" :model="holdersForm" :label-width="140" :rules="holdersFormRules">
        <FormItem label="股东名称" prop="shareholdersName">
          <Input v-model="holdersForm.shareholdersName" placeholder="输入股东名称" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="持股比例(%)" prop="shareholdingRatio">
          <Input v-model="holdersForm.shareholdingRatio" placeholder="请输入持股比例" :maxlength="6"></Input>
        </FormItem>
        <FormItem label="认缴出资(万元)" prop="subscribedCapital">
          <Input v-model="holdersForm.subscribedCapital" placeholder="请输入认缴出资" :maxlength="9"></Input>
        </FormItem>
        <FormItem label="认缴出资日期" prop="subscribedDate">
          <DatePicker
            value="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="holdersForm.subscribedDate"
          ></DatePicker>
        </FormItem>
        <FormItem label="实缴出资(万元)" prop="paidCapital">
          <Input v-model="holdersForm.paidCapital" placeholder="请输入实缴出资" :maxlength="9"></Input>
        </FormItem>
        <FormItem label="实缴出资日期" prop="paidDate">
          <DatePicker
            value="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="holdersForm.paidDate"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelHoldersForm">取消</Button>
        <Button
          :disabled="isSubmit"
          :loading="isSubmit"
          @click="holdersSubmit('holdersFormRef')"
          type="primary"
        >提交</Button>
      </div>
    </Modal>
    <!-- 分支机构 modal-->
    <Modal v-model="branchFormModal" title="分支机构" @on-cancel="cancleBranchForm">
      <Form ref="branchFormRef" :model="branchForm" :label-width="110" :rules="branchFormRules">
        <FormItem label="分支名称" prop="branchName">
          <Input v-model="branchForm.branchName" placeholder="输入分支名称" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="负责人姓名" prop="headName">
          <Input v-model="branchForm.headName" placeholder="请输入负责人姓名" :maxlength="50"></Input>
        </FormItem>

        <FormItem label="成立日期" prop="establishDate">
          <DatePicker
            value="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="branchForm.establishDate"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancleBranchForm">取消</Button>
        <Button
          :disabled="isSubmit"
          :loading="isSubmit"
          @click="branchSubmit('branchFormRef')"
          type="primary"
        >提交</Button>
      </div>
    </Modal>
    <!-- 对外投资 modal-->
    <Modal v-model="outboundInvestmentModal" title="对外投资" @on-cancel="cancleOutboundInvestmentForm">
      <Form
        ref="outboundInvestmentFormRef"
        :model="outboundInvestmentForm"
        :label-width="140"
        :rules="outboundInvestmentFormRules"
      >
        <FormItem label="所投资企业名称" prop="enterpriseName">
          <Input
            v-model="outboundInvestmentForm.enterpriseName"
            placeholder="输入所投资企业名称"
            :maxlength="50"
          ></Input>
        </FormItem>
        <FormItem label="所投资企业链接" prop="enterpriseLink">
          <Input
            v-model="outboundInvestmentForm.enterpriseLink"
            placeholder="请输入所投资企业链接"
            :maxlength="200"
          ></Input>
        </FormItem>
        <FormItem label="注册资本(万元)" prop="registeredCapital">
          <Input
            v-model="outboundInvestmentForm.registeredCapital"
            placeholder="请输入注册资本"
            :maxlength="9"
          ></Input>
        </FormItem>
        <FormItem label="出资比例(%)" prop="contributionRatio">
          <Input
            v-model="outboundInvestmentForm.contributionRatio"
            placeholder="请输入出资比例"
            :maxlength="6"
          ></Input>
        </FormItem>

        <FormItem label="成立日期" prop="establishDate">
          <DatePicker
            value="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="outboundInvestmentForm.establishDate"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancleOutboundInvestmentForm">取消</Button>
        <Button
          :disabled="isSubmit"
          :loading="isSubmit"
          @click="outboundInvestSubmit('outboundInvestmentFormRef')"
          type="primary"
        >提交</Button>
      </div>
    </Modal>

    <!-- 重要人员信息 modal-->
    <Modal
      v-model="importantPersonModal"
      title="重要人员信息"
      @on-cancel="cancleImportantPersonForm"
      width="600"
    >
      <Form
        ref="importantPersonFormRef"
        :model="importantPersonForm"
        :label-width="170"
        :rules="importantPersonFormRules"
      >
        <FormItem label="姓名" prop="name">
          <Input v-model="importantPersonForm.name" placeholder="输入姓名" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="职务" prop="position">
          <Select v-model="importantPersonForm.position">
            <Option
              v-for="item in jobNameArr"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="任期开始日期" prop="termStart">
          <DatePicker
            value="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="importantPersonForm.termStart"
          ></DatePicker>
        </FormItem>
        <FormItem label="任期开始结束" prop="termEnd">
          <DatePicker
            value="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="importantPersonForm.termEnd"
          ></DatePicker>
        </FormItem>
        <FormItem label="上任时间" prop="appointmentTime">
          <DatePicker
            value="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="importantPersonForm.appointmentTime"
          ></DatePicker>
        </FormItem>
        <FormItem label="何时办理工商变更手续">
          <DatePicker
            value="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="importantPersonForm.changeDate"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancleImportantPersonForm">取消</Button>
        <Button
          :disabled="isSubmit"
          :loading="isSubmit"
          @click="importantPersonSubmit('importantPersonFormRef')"
          type="primary"
        >提交</Button>
      </div>
    </Modal>
    <!-- 固定资产投资 modal-->
    <Modal v-model="fixedAssetsModal" title="固定资产投资情况" @on-cancel="cancleFixedAssets">
      <Form
        ref="fixedAssetsFormRef"
        :model="fixedAssetsForm"
        :label-width="150"
        :rules="fixedAssetsFormRules"
      >
        <FormItem label="项目名称" prop="projectName">
          <Input v-model="fixedAssetsForm.projectName" placeholder="输入项目名称" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="项目所属行业" prop="projectIndustry">
          <Input v-model="fixedAssetsForm.projectIndustry" placeholder="请输入项目所属行业" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="项目注册地" prop="projectRegistryArr">
          <Cascader
            change-on-select
            :data="areaData"
            v-model="fixedAssetsForm.projectRegistryArr"
            placeholder="请选择项目注册地"
          ></Cascader>
        </FormItem>

        <FormItem label="项目首期开工时间" prop="startingDate">
          <DatePicker
            format="yyyy-MM-dd"
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="fixedAssetsForm.startingDate"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancleFixedAssets">取消</Button>
        <Button
          :disabled="isSubmit"
          :loading="isSubmit"
          @click="fixedAssetsSubmit('fixedAssetsFormRef')"
          type="primary"
        >提交</Button>
      </div>
    </Modal>
    <!-- 长期投资 modal-->
    <Modal
      v-model="longtermEquityInvestmentModal"
      title="长期股权投资情况"
      @on-cancel="cancleLongtermEquityInvestment"
    >
      <Form
        ref="longtermEquityInvestmentFormRef"
        :model="longtermEquityInvestmentForm"
        :label-width="150"
        :rules="longtermEquityInvestmentFormRules"
      >
        <FormItem label="项目名称" prop="projectName">
          <Input
            v-model="longtermEquityInvestmentForm.projectName"
            placeholder="输入项目名称"
            :maxlength="50"
          ></Input>
        </FormItem>
        <FormItem label="项目所属行业" prop="projectIndustry">
          <Input
            v-model="longtermEquityInvestmentForm.projectIndustry"
            placeholder="请输入项目所属行业"
            :maxlength="50"
          ></Input>
        </FormItem>
        <FormItem label="项目注册地" prop="projectRegistryArr">
          <Cascader
            change-on-select
            :data="areaData"
            v-model="longtermEquityInvestmentForm.projectRegistryArr"
            placeholder="请选择项目注册地"
          ></Cascader>
        </FormItem>
        <FormItem class="textLbox" label="是否控股" required>
          <i-Switch size="large" v-model="kgSwitch" @on-change="kgSwitchChange">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-Switch>
        </FormItem>
        <!-- <FormItem label="项目首期开工时间" prop="startingDate">
          <DatePicker
            value="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            v-model="fixedAssetsForm.startingDate"
          ></DatePicker>
        </FormItem>-->
        <FormItem label="投资类型" prop="investmentType">
          <Select v-model="longtermEquityInvestmentForm.investmentType" @on-change="changelongType">
            <Option
              v-for="item in longtermEquityInvestmentTypeArr"
              :value="item.value"
              :key="item.id"
            >{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="其他投资类型" v-if="longtermEquityInvestmentForm.investmentType==6">
          <Input
            v-model="longtermEquityInvestmentForm.other"
            placeholder="请输入项目注册地"
            :maxlength="50"
          ></Input>
        </FormItem>
        <FormItem label="项目首期注册时间" prop="startingDate">
          <DatePicker
            format="yyyy-MM-dd"
            type="date"
            :editable="false"
            placeholder="选择日期"
            v-model="longtermEquityInvestmentForm.startingDate"
          ></DatePicker>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancleLongtermEquityInvestment">取消</Button>
        <Button
          :disabled="isSubmit"
          :loading="isSubmit"
          @click="longtermEquityInvestmentSubmit('longtermEquityInvestmentFormRef')"
          type="primary"
        >提交</Button>
      </div>
    </Modal>
    <!-- 荣誉 modal-->
    <Modal v-model="honorModal" title="荣誉" @on-cancel="cancleHonorForm">
      <Form ref="honorFormRef" :model="honorForm" :label-width="120" :rules="honorFormRules">
        <FormItem label="获奖时间" required>
          <Row>
            <Col span="11">
              <FormItem prop="awardDate">
                <DatePicker
                  value="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  type="date"
                  :editable="false"
                  placeholder="选择时间"
                  v-model="honorForm.awardDate"
                  @on-change="pickTime"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="级别" prop="level">
          <Input v-model="honorForm.level" placeholder="输入级别" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="荣誉名称" prop="honorName">
          <Input v-model="honorForm.honorName" placeholder="请输入荣誉名称" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="上传图片" required class="textLbox">
          <div class="demo-upload-list honor_upload_list" v-for="item in honorUploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleViewHonor(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemoveHonor(item,item.id)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload
            accept=".jpg, .jpeg, .png, .bmp"
            ref="uploadHonor"
            :show-upload-list="false"
            :default-file-list="honorDefaultList"
            :on-success="handleSuccessHonor"
            :format="['jpg','jpeg','png','bmp']"
            :max-size="10240"
            :on-format-error="handleFormatErrorHonor"
            :on-exceeded-size="handleMaxSizeHonor"
            :before-upload="handleBeforeUploadHonor"
            :headers="{token:token}"
            type="drag"
            :action="host+'/api/attachment/upload'"
            style="display: inline-block;width:58px;"
          >
            <div
              style="width: 58px;height:58px;line-height: 58px;"
              v-if="honorUploadList.length<10"
            >
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal class="honorUploadImgModal" title="查看图片" v-model="honorUploadImgModal">
            <img :src="showHonorUploadImg" v-if="honorUploadImgModal" style="width: 100%" />
            <div slot="footer">
              <Button @click="honorUploadImgModal=false">关闭</Button>
            </div>
          </Modal>
          <div>图片最多上传10张，单张大小不超过10M</div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancleHonorForm">取消</Button>
        <Button
          :disabled="isSubmit"
          :loading="isSubmit"
          @click="honorSubmit('honorFormRef')"
          type="primary"
        >提交</Button>
      </div>
    </Modal>
    <!-- 大事记 modal-->
    <Modal v-model="toAddEvents" title="企业大事记" @on-cancel="cancelForm">
      <Form
        ref="addEventInfoRef"
        :model="addEventInfo"
        :label-width="120"
        :rules="addEventRuleValidate"
      >
        <FormItem label="时间" required>
          <Row>
            <Col span="11">
              <FormItem prop="eventDate">
                <DatePicker
                  format="yyyy-MM-dd"
                  type="date"
                  :editable="false"
                  placeholder="选择时间"
                  v-model="addEventInfo.eventDate"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="事件名称" prop="eventName">
          <Input v-model="addEventInfo.eventName" placeholder="输入事件名称" :maxlength="50"></Input>
        </FormItem>
        <FormItem label="简介" prop="introduction">
          <Input
            v-model="addEventInfo.introduction"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 6}"
            placeholder="描述事件"
            :maxlength="200"
          ></Input>
        </FormItem>
        <FormItem label="上传图片" required class="textLbox">
          <div class="demo-upload-list honor_upload_list" v-for="item in honorUploadList">
            <template v-if="item.status === 'finished'">
              <img :src="item.url" />
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleViewEvent(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemoveHonor(item,item.id)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <!-- <Upload
            accept=".jpg, .jpeg, .gif, .png, .bmp"
            :action="host+'/api/attachment/upload'"
            ref="uploadEvent"
            :show-upload-list="true"
            :default-file-list="eventImgList"
            :on-success="handleSuccessEvent"
            :on-remove="handleRemoveEvent"
            :max-size="10240"
            :on-format-error="handleFormatErrorEvent"
            :on-exceeded-size="handleMaxSizeEvent"
            :before-upload="handleBeforeUploadEvent"
            :headers="{token:token}"
            type="drag"
          >

            <div
              style="width: 58px;height:58px;line-height: 58px;"
              v-if="honorUploadList.length<10"
            >
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>-->

          <Upload
            ref="uploadEvent"
            :show-upload-list="false"
            :on-success="handleSuccessHonor"
            :format="['jpg','jpeg','png']"
            :max-size="10240"
            :on-exceeded-size="handleMaxSizeHonor"
            :before-upload="handleBeforeUploadHonor"
            :headers="{token:token}"
            type="drag"
            :action="host+'/api/attachment/upload'"
            style="display: inline-block;width:58px;"
          >
            <div
              style="width: 58px;height:58px;line-height: 58px;"
              v-if="honorUploadList.length<10"
            >
              <Icon type="ios-camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal class="honorUploadImgModal" title="查看图片" v-model="eventUploadImgModal">
            <img :src="showEventUploadImg" v-if="eventUploadImgModal" style="width: 100%" />
            <div slot="footer">
              <Button @click="eventUploadImgModal=false">关闭</Button>
            </div>
          </Modal>
          <div>图片最多上传10张，单张大小不超过10M；支持预览和下载</div>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancelForm">取消</Button>
        <Button
          :disabled="isSubmit"
          :loading="isSubmit"
          @click="toaddEvent('addEventInfoRef')"
          type="primary"
        >提交</Button>
      </div>
    </Modal>
    <Modal title="查看图片" v-model="imgModal" width="1200">
      <div class="showImg">
        <img :src="viewImg" alt />
      </div>

      <div slot="footer">
        <Button @click="imgModal=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import host from "@/assets/js/host";
import area from "@/assets/js/area.js";

export default {
  data() {
    const validatePrice = (rule, value, callback) => {
      if (Number(value) < 0) {
        callback(new Error("金额必须是正数"));
      } else if (value && !this.priceReg.test(value)) {
        callback(new Error("金额必须是数字（最多保留2位小数）"));
      } else {
        callback();
      }
      callback();
    };
    const isLtEndDate = (rule, value, callback) => {
      let date = "";
      let termEnd = this.importantPersonForm.termEnd;
      let dateType = typeof termEnd;
      date =
        dateType == "object"
          ? this.importantPersonForm.termEnd.getTime()
          : termEnd && dateType != "object"
          ? new Date(this.importantPersonForm.termEnd).getTime()
          : "";
      let t = "";
      if (this.importantPersonForm.termEnd) {
        t = Date.parse(value);
        if (new Date(value).getTime() > date) {
          callback(new Error("开始时间不能大于结束时间"));
        } else {
          callback();
        }
      }
      callback();
    };
    const isPercent = (rule, value, callback) => {
      let reg = /^(100|[1-9]\d|\d)(.\d{1,2})?$/;
      if (!value) {
        callback(new Error("持股比例不能为空"));
      } else if (value > 100) {
        callback(new Error("比例不能超过100%"));
      } else if (!reg.test(value)) {
        callback(new Error("只能输入0-100的数字（最多保留2位小数）"));
      } else {
        callback();
      }
    };
    const isCorretParams = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z]+$/;
      if (!reg.test(value)) {
        callback(new Error("只能填入数字和大小写字母"));
      } else {
        callback();
      }
    };
    return {
      eventtotal: 0,
      eventLimit: 10,
      eventPage: 0,
      honortotal: 0,
      honorLimit: 10,
      honorPage: 0,
      longtotal: 0,
      longLimit: 10,
      longPage: 0,
      fixtotal: 0,
      fixLimit: 10,
      fixPage: 0,
      importtotal: 0,
      importLimit: 10,
      importPage: 0,
      outtotal: 0,
      outLimit: 10,
      outPage: 0,
      branchtotal: 0,
      branchLimit: 10,
      branchPage: 0,
      holdertotal: 0,
      holderLimit: 10,
      holderPage: 0,
      isSubmit_sh: false,
      areaData: [], //城市数据
      imgModal: false,
      viewImg: "",
      //大事记 st
      timeFormat: [],
      attachmentIds: [],
      addEventInfo: {
        enterpriseId: 1,
        eventName: "",
        eventDate: "",
        introduction: "",
        eventImg: "",
        eventId: ""
      },
      addEventRuleValidate: {
        eventName: [
          { required: true, message: "事件名不能为空", trigger: "blur" }
        ],
        eventDate: [
          {
            required: true,
            type: "date",
            message: "时间不能为空",
            trigger: "change"
          }
        ],
        introduction: [
          { required: true, message: "简介不能为空", trigger: "blur" }
        ]
      },
      eventImgList: [],
      toAddEvents: false,
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
            let imgArr = params.row.attachment;
            let arr = [];
            imgArr.forEach(item => {
              arr.push(
                h(
                  "div",
                  {
                    class: "showproveImg",
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      display: "block",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.viewImg = item.path;
                        this.imgModal = true;
                      }
                    }
                  },
                  item.fileName
                )
              );
            });
            return h("div", arr);
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
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.toAddEvents = true;
                      this.getEventInfo(params.row.id);
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
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确认删除吗？",
                        onOk: () => {
                          this.deleteEvent(params.row.id);
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      abEvents: [],
      eventUploadImgModal: false,
      showEventUploadImg: "",
      //大事记 end
      //简介
      introductionData: {
        introduction: ""
      },
      introductionDataBackup: {},
      introductionRules: {
        introduction: [
          { required: true, message: "请输入公司简介", trigger: "blur" }
        ]
      },
      //工商信息
      industryIdData: [],
      showBusinessImg: "",
      visible: false,
      uploadList: [],
      defaultList: [],
      businessFormData: {
        enterpriseName: "",
        legalPerson: "", //法人
        establishDate: "", //成立日期
        creditCode: "", //
        registeredCapital: "", //注册资本
        contributedCapital: "", //实缴资本
        businessScope: "", //经营范围
        industryIdArr: []
      },
      businessFormDataBackup: {},
      uploadListBackup: [],
      businessFormRules: {
        enterpriseName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        legalPerson: [
          { required: true, message: "请输入企业法人", trigger: "blur" }
        ],

        creditCode: [
          {
            required: true,
            message: "请输入统一社会信用代码",
            trigger: "blur"
          },
          { validator: isCorretParams, trigger: "blur" }
        ],
        registeredCapital: [
          { required: true, message: "请输入注册资本", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" }
        ],
        contributedCapital: [
          { required: true, message: "请输入实缴资本" },
          { validator: validatePrice, trigger: "blur" }
        ],
        industryIdArr: [
          {
            type: "array",
            required: true,
            message: "请选择产业类型",
            trigger: "change"
          }
        ],
        businessScope: [
          { required: true, message: "请填写经营范围", trigger: "blur" }
        ],
        businessAbnormal: [
          { required: true, message: "请填写工商异常情况", trigger: "blur" }
        ]
      },
      //股东信息
      holdersFormModal: false,
      holdersFormTitle: "股东信息",
      holdersItem: [
        {
          title: "股东",
          key: "shareholdersName"
        },
        {
          title: "持股比例(%)",
          key: "shareholdingRatio",

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
                      console.log(params.row);
                    }
                  }
                },
                params.row.shareholdingRatio + "%"
              )
            ]);
          }
        },
        {
          title: "认缴出资金额（万元）",
          key: "subscribedCapital"
        },
        {
          title: "认缴出资日期",
          key: "subscribedDate"
        },
        {
          title: "实缴出资金额（万元）",
          key: "paidCapital"
        },
        {
          title: "实缴出资日期",
          key: "paidDate"
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
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.getShareholdersInfo(params.row.id);
                      this.holdersFormModal = true;
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
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确认删除吗？",
                        onOk: () => {
                          // this.$Message.info("Clicked ok");
                          this.deleteShareholder(params.row.id);
                        },
                        onCancel: () => {
                          // this.$Message.info("Clicked cancel");
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      holdersList: [],
      holdersForm: {
        shareholdersName: "",
        shareholdingRatio: "", //持股比例
        subscribedCapital: "", //认缴出资
        subscribedDate: "", //认缴出资日期
        paidCapital: "", //实缴出资
        paidDate: "" //实缴出资日期
      },
      holdersFormRules: {
        shareholdersName: [
          { required: true, message: "股东名称不能为空", trigger: "blur" }
        ],
        shareholdingRatio: [
          //          {
          //            required: true,
          //            message: "持股比例不能为空",
          //            trigger: "blur"
          //          },
          { required: true, message: "持股比例不能为空" },
          { validator: isPercent, trigger: "blur" }
        ],
        subscribedCapital: [
          {
            required: true,
            message: "认缴出资不能为空"
            //            trigger: "blur"
          },
          { validator: validatePrice, trigger: "blur" }
        ],
        subscribedDate: [
          {
            type: "date",
            required: true,
            message: "认缴出资日期不能为空",
            trigger: "change"
          }
        ],
        paidCapital: [
          {
            required: true,
            message: "实缴出资不能为空"
            //            trigger: "blur"
          },
          { validator: validatePrice, trigger: "blur" }
        ],
        paidDate: [
          {
            type: "date",
            required: true,
            message: "实缴出资日期不能为空",
            trigger: "change"
          }
        ]
      },
      //分支机构
      branchList: [],
      branchItem: [
        {
          title: "机构名称",
          key: "branchName",
          width: 400
        },
        {
          title: "负责人姓名",
          key: "headName",
          width: 250
        },
        {
          title: "成立日期",
          key: "establishDate",
          width: 250
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
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.branchFormModal = true;
                      this.getBranchInfo(params.row.id);
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
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确认删除吗？",
                        onOk: () => {
                          // this.$Message.info("Clicked ok");
                          this.deleteBranch(params.row.id);
                        },
                        onCancel: () => {
                          // this.$Message.info("Clicked cancel");
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      branchFormModal: false,
      branchForm: {
        branchName: "",
        headName: "",
        establishDate: ""
      },
      branchFormRules: {
        branchName: [
          { required: true, message: "分支名称不能为空", trigger: "blur" }
        ],
        headName: [
          { required: true, message: "负责人姓名不能为空", trigger: "blur" }
        ],
        establishDate: [
          {
            type: "date",
            required: true,
            message: "成立日期不能为空",
            trigger: "blur"
          }
        ]
      },

      //对外投资

      outboundInvestmentModal: false,
      outboundInvestmentList: [],

      outboundInvestmentItem: [
        {
          title: "所投资企业名称",
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
                      window.open(params.row.enterpriseLink);
                    }
                  }
                },
                params.row.enterpriseName
              )
            ]);
          }
        },
        {
          title: "注册资本(万元)",
          key: "registeredCapital",
          width: 150
        },
        {
          title: "出资比例",
          key: "contributionRatio",
          width: 100,
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
                    click: () => {}
                  }
                },
                params.row.contributionRatio + "%"
              )
            ]);
          }
        },
        {
          title: "成立日期",
          key: "establishDate",
          width: 150
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
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.getOutboundInvestmentInfo(params.row.id);
                      this.outboundInvestmentModal = true;
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
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确认删除吗？",
                        onOk: () => {
                          this.deleteOutboundInvest(params.row.id);
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],

      outboundInvestmentForm: {
        enterpriseName: "",
        enterpriseLink: "",
        registeredCapital: "",
        contributionRatio: "",
        establishDate: ""
      },
      outboundInvestmentFormRules: {
        enterpriseName: [
          { required: true, message: "所投资企业名称不能为空", trigger: "blur" }
        ],
        enterpriseLink: [
          { required: true, message: "所投资企业链接不能为空", trigger: "blur" }
        ],
        registeredCapital: [
          { required: true, message: "注册资本不能为空", trigger: "blur" },
          { validator: validatePrice, trigger: "blur" }
        ],
        contributionRatio: [
          { required: true, message: "出资比例不能为空", trigger: "blur" },
          { validator: isPercent, trigger: "blur" }
        ],
        establishDate: [
          {
            type: "date",
            required: true,
            message: "成立日期不能为空",
            trigger: "blur"
          }
        ]
      },
      //重要人员信息
      importantPersonItem: [
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
          key: "appointmentTime",
          width: 170
        },
        {
          title: "何时办理工商变更手续",
          key: "changeDate"
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
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.importantPersonModal = true;
                      this.getImportantPersonInfo(params.row.id);
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
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确认删除吗？",
                        onOk: () => {
                          // this.$Message.info("Clicked ok");
                          this.deleteImportantPerson(params.row.id);
                        },
                        onCancel: () => {
                          // this.$Message.info("Clicked cancel");
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      importantPersonList: [],
      importantPersonForm: {
        name: "",
        position: "",
        termStart: "",
        termEnd: "",
        appointmentTime: "",
        changeDate: ""
      },
      importantPersonFormRules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        position: [
          { required: true, message: "职务不能为空", trigger: "blur" }
        ],
        termStart: [
          {
            type: "date",
            required: true,
            message: "任期开始日期不能为空",
            trigger: "blur"
          },
          {
            trigger: "change",
            message: "开始时间要小于结束时间",
            validator: isLtEndDate
          }
        ],
        termEnd: [
          {
            type: "date",
            required: true,
            message: "任期结束日期不能为空",
            trigger: "blur"
          }
        ],
        appointmentTime: [
          {
            type: "date",
            required: true,
            message: "上任时间不能为空",
            trigger: "blur"
          }
        ],
        changeDate: [
          {
            type: "date",
            required: true,
            message: "何时办理工商变更手续不能为空",
            trigger: "blur"
          }
        ]
      },
      importantPersonModal: false,

      //企业id  enterpriseId 项目名称 projectName  项目所属行业 projectIndustry 项目注册地 projectRegistry  项目首期开工时间 startingDate
      // 固定资产
      fixedAssetsModal: false,
      fixedAssetsInvestmentList: [],
      fixedAssetsInvestmentItem: [
        {
          title: "项目名称",
          key: "projectName"
        },
        {
          title: "项目所属行业",
          key: "projectIndustry",
          width: 200
        },
        {
          title: "项目注册地",
          key: "projectRegistry"
        },
        {
          title: "项目首期开工时间",
          key: "startingDate",
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
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/fixedAssetsInvestmentEdit/" + params.row.id
                      );
                    }
                  }
                },
                "查看投资情况"
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
                      this.getfixedAssetsInfo(params.row.id);
                      this.fixedAssetsModal = true;
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
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确认删除吗？",
                        onOk: () => {
                          this.deleteFixedAssets(params.row.id);
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      fixedAssetsForm: {
        projectName: "",
        projectIndustry: "",
        projectRegistryArr: [],
        startingDate: ""
      },
      fixedAssetsFormRules: {
        projectName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        projectIndustry: [
          { required: true, message: "所属行业不能为空", trigger: "blur" }
        ],
        projectRegistryArr: [{ required: true, message: "项目注册地不能为空" }],
        startingDate: [
          {
            required: true,
            message: "项目首期开工时间不能为空"
          }
        ]
      },

      //长期投资
      longtermEquityInvestmentTypeArr: [],
      kgSwitch: false,
      longtermEquityInvestmentModal: false,
      longtermEquityInvestmentForm: {
        projectName: "",
        projectIndustry: "",
        projectRegistryArr: [],
        startingDate: "",
        isHolding: 0,
        investmentType: "",
        other: ""
      },
      longtermEquityInvestmentFormRules: {
        projectName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        projectIndustry: [
          { required: true, message: "所属行业不能为空", trigger: "blur" }
        ],
        investmentType: [
          { required: true, message: "投资类型不能为空", trigger: "change" }
        ],
        projectRegistryArr: [{ required: true, message: "注册地不能为空" }],
        startingDate: [
          {
            required: true,
            message: "项目首期注册时间不能为空"
          }
        ]
      },

      longtermEquityInvestmentItem: [
        {
          title: "项目名称",
          key: "projectName"
        },
        {
          title: "项目所属行业",
          key: "projectIndustry",
          width: 200
        },
        {
          title: "项目注册地",
          key: "projectRegistry"
        },
        {
          title: "是否控股",
          key: "isHolding",
          width: 100
        },
        {
          title: "投资类型",
          key: "investmentTypeStr",
          width: 100
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
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/longtermEquityInvestmentEdit/" + params.row.id
                      );
                    }
                  }
                },
                "查看投资情况"
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
                      this.longtermEquityInvestmentModal = true;
                      this.getlongtermEquityInvestmentInfo(params.row.id);
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
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确认删除吗？",
                        onOk: () => {
                          this.deleteLongtermEquityInvestment(params.row.id);
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      longtermEquityInvestmentList: [],
      // 荣誉
      showHonorUploadImg: "",
      honorUploadImgModal: false,
      honorDefaultList: [],
      honorUploadList: [],
      honorModal: false,
      honorItem: [
        {
          title: "获奖时间",
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
            let imgArr = params.row.attachment;
            let arr = [];
            imgArr.forEach(item => {
              arr.push(
                h(
                  "div",
                  {
                    class: "showproveImg",
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      display: "block",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        this.viewImg = item.path;
                        this.imgModal = true;
                      }
                    }
                  },
                  item.fileName
                )
              );
            });
            return h("div", arr);
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
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.getHonorInfo(params.row.id);
                      this.honorModal = true;
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
                      this.$Modal.confirm({
                        title: "提示",
                        content: "确认删除吗？",
                        onOk: () => {
                          this.deleteHonor(params.row.id);
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      jobNameArr: [],
      honorList: [],
      honorForm: {
        awardDate: "",
        level: "",
        honorName: "",
        attachmentIds: ""
      },
      honorFormRules: {
        awardDate: [
          {
            type: "date",
            required: true,
            message: "获奖时间不能为空",
            trigger: "blur"
          }
        ],
        level: [{ required: true, message: "级别不能为空", trigger: "blur" }],
        honorName: [
          { required: true, message: "荣誉名称不能为空", trigger: "blur" }
        ]
        // attachmentIds: [{ required: true, message: "不能为空", trigger: "blur" }],
      },

      desc: "",
      itdTxtVal: 0,
      businessScopeTxtVal: 0,
      businessAbnormalTxtVal: 0,
      companyDesc: "",
      DescruleValidate: {
        desc: [
          { required: true, message: "介绍不能为空", trigger: "blur" },
          {
            type: "string",
            max: 300,
            message: "字数不能超过300",
            trigger: "blur"
          }
        ]
      },
      ruleValidate: {
        name: [
          { required: true, message: "公司名称不能为空", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择产业类型", trigger: "blur" }],
        corporation: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        foundDate: [
          {
            required: true,
            type: "date",
            message: "选择日期",
            trigger: "change"
          }
        ],
        regCapital: [
          {
            required: true,
            type: "number",
            min: 1,
            message: "必须填写数字",
            trigger: "blur"
          },
          { type: "array", max: 2, message: "必须输入数字", trigger: "change" }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      },
      isSubmit: false,
      host: "",
      token: "",
      priceReg: /^[0-9]+(.[0-9]{1,2})?$/
    };
  },
  created() {
    this.getTreeSelectInfo();
    this.host = host.host;
    this.token = localStorage.getItem("token");
    this.getJobList();

    this.getlongtermEquityInvestmentTypeList();
  },
  mounted() {
    this.uploadList = this.$refs.uploadLicense.fileList;
  },
  methods: {
    establishDateChange(val) {
      this.businessFormData.establishDate = val;
      console.log(val);
    },
    holderchangePage(val) {
      this.holderPage = val;
      this.getShareholdersList();
    },
    holderchangeSize(size) {
      this.holderLimit = size;
      this.getShareholdersList();
    },
    branchchangePage(val) {
      this.branchPage = val;
      this.getBranchList();
    },
    branchchangeSize(size) {
      this.branchLimit = size;
      this.getBranchList();
    },
    outchangePage(val) {
      this.outPage = val;
      this.getOutboundInvestList();
    },
    outchangeSize(size) {
      this.outLimit = size;
      this.getOutboundInvestList();
    },
    importchangePage(val) {
      this.importPage = val;
      this.getImportantPersonList();
    },
    importchangeSize(size) {
      this.importLimit = size;
      this.getImportantPersonList();
    },
    fixchangePage(val) {
      this.fixPage = val;
      this.getFixedAssetsInvestmentList();
    },
    fixchangeSize(size) {
      this.fixLimit = size;
      this.getFixedAssetsInvestmentList();
    },
    longchangePage(val) {
      this.longPage = val;
      this.getlongtermEquityInvestmentList();
    },
    longchangeSize(size) {
      this.longLimit = size;
      this.getlongtermEquityInvestmentList();
    },
    honorchangePage(val) {
      this.honorPage = val;
      this.getHonorList();
    },
    honorchangeSize(size) {
      this.honorLimit = size;
      this.getHonorList();
    },
    eventchangePage(val) {
      this.eventPage = val;
      this.getEventList();
    },
    eventchangeSize(size) {
      this.eventLimit = size;
      this.getEventList();
    },
    //提交审核
    doSubmitAudit() {
      let formData = new FormData();
      formData.append("enterpriseId", this.$route.params.id);
      this.isSubmit_sh = true;
      this.$request.post(
        "api/enterpriseDraft/submitAudit",
        formData,
        res => {
          this.isSubmit = false;
          this.$Notice.success({
            title: "提示",
            desc: "提交成功"
          });
          this.$router.replace("/businessManagement");
        },
        fail => {
          this.isSubmit_sh = false;
          this.$Notice.error({
            title: "提示",
            desc: fail.message
          });
        },
        error => {
          this.isSubmit_sh = false;
          this.$Notice.error({
            title: "提示",
            desc: error
          });
        }
      );
    },
    checkIntroduction() {
      if (this.introductionData.introduction) {
        this.$Notice.error({
          title: "提示",
          desc: "请填写公司简介"
        });
      }
    },
    tabClick(index) {
      let establishDate_now = "";
      let establishDate_backUp = "";

      if (this.businessFormData.establishDate) {
        establishDate_now =
          typeof this.businessFormData.establishDate == "object"
            ? this.businessFormData.establishDate.getTime() + 8 * 3600 * 1000
            : new Date(this.businessFormData.establishDate).getTime();
      } else {
        establishDate_now = "";
      }

      if (this.businessFormDataBackup.establishDate) {
        establishDate_backUp =
          typeof this.businessFormDataBackup.establishDate == "object"
            ? this.businessFormDataBackup.establishDate.getTime() +
              8 * 3600 * 1000
            : new Date(this.businessFormDataBackup.establishDate).getTime();
      } else {
        establishDate_backUp = "";
      }
      let uploadListId = "";
      let uploadListBackupId = "";

      if (this.uploadList.length == 0) {
        uploadListId = "";
      } else {
        uploadListId = this.uploadList[0].id;
      }
      if (this.uploadListBackup.length == 0) {
        uploadListBackupId = "";
      } else {
        uploadListBackupId = this.uploadListBackup[0].id;
      }
      if (
        this.introductionData.introduction !=
        this.introductionDataBackup.introduction
      ) {
        this.$Notice.warning({
          title: "提示",
          desc: "您修改了公司简介，还未保存！",
          duration: 2
        });
      } else if (
        this.businessFormData.enterpriseName !=
          this.businessFormDataBackup.enterpriseName ||
        this.businessFormData.legalPerson !=
          this.businessFormDataBackup.legalPerson ||
        establishDate_now != establishDate_backUp ||
        this.businessFormData.creditCode !=
          this.businessFormDataBackup.creditCode ||
        this.businessFormData.registeredCapital !=
          this.businessFormDataBackup.registeredCapital ||
        this.businessFormData.contributedCapital !=
          this.businessFormDataBackup.contributedCapital ||
        this.businessFormData.businessScope !=
          this.businessFormDataBackup.businessScope ||
        this.businessFormData.businessAbnormal !=
          this.businessFormDataBackup.businessAbnormal ||
        // this.uploadList.length == 0 ||
        this.businessFormData.industryIdArr[0] !=
          this.businessFormDataBackup.industryIdArr[0] ||
        this.uploadList.length != this.uploadListBackup.length ||
        uploadListId != uploadListBackupId
      ) {
        this.$Notice.warning({
          title: "提示",
          desc: "您修改了工商信息资料，还未保存！",
          duration: 2
        });
      }
      if (index == 2) {
        //股东信息
        this.getShareholdersList();
      } else if (index == 3) {
        //分支机构
        this.getBranchList();
      } else if (index == 4) {
        //对外投资
        this.getOutboundInvestList();
      } else if (index == 5) {
        //重要人员信息
        this.getImportantPersonList();
      } else if (index == 6) {
        //固定投资
        if (this.areaData.length == 0) {
          this.areaData = area.area.data;
        }

        this.getFixedAssetsInvestmentList();
      } else if (index == 7) {
        //长期股权投资
        if (this.areaData.length == 0) {
          this.areaData = area.area.data;
        }
        this.getlongtermEquityInvestmentList();
      } else if (index == 8) {
        //荣誉
        this.getHonorList();
      } else if (index == 9) {
        //大事记
        this.getEventList();
      }
    },
    //股东信息 st
    //列表
    getShareholdersList() {
      let formData = new FormData();
      formData.append("limit", this.holderLimit);
      formData.append("page", this.holderPage);
      formData.append("enterpriseId", this.$route.params.id);
      this.$request.post("/api/shareholdersInfoDraft/list", formData, res => {
        let list = res.data.list;

        this.holdersList = list.map(item => {
          if (item.subscribedDate) {
            item.subscribedDate = item.subscribedDate.substring(0, 10);
          }
          if (item.paidDate) {
            item.paidDate = item.paidDate.substring(0, 10);
          }
          return item;
        });
        console.log(res);
        this.holdertotal = res.data.total;
      });
    },
    getShareholdersInfo(id) {
      let formData = new FormData();
      // formData.append("enterpriseId", this.$route.params.id);
      this.$request.post("/api/shareholdersInfoDraft/info/" + id, {}, res => {
        let data = res.data;
        this.holdersForm = data;
        // this.holdersList = list.map(item => {
        //   if (item.subscribedDate) {
        //     item.subscribedDate = item.subscribedDate.substring(0, 10);
        //   }
        //   if (item.paidDate) {
        //     item.paidDate = item.paidDate.substring(0, 10);
        //   }
        //   return item;
        // });
      });
    },
    clearHoldersForm() {
      this.holdersForm = {
        shareholdersName: "",
        shareholdingRatio: "", //持股比例
        subscribedCapital: "", //认缴出资
        subscribedDate: "", //认缴出资日期
        paidCapital: "", //实缴出资
        paidDate: "" //实缴出资日期
      };
    },
    deleteShareholder(id) {
      let formData = new FormData();
      formData.append("id", id);
      this.$request.post(
        "/api/shareholdersInfoDraft/delete",
        formData,
        res => {
          this.$Notice.success({
            title: "提示",
            desc: "删除成功"
          });
          this.getShareholdersList();
        },
        fail => {},
        error => {
          this.$Notice.error({
            title: "提示",
            desc: "服务端错误"
          });
        }
      );
    },
    changeDate(dateInfo) {
      let date = new Date();
      if (typeof dateInfo == "object") {
        date = dateInfo;
      } else {
        date = new Date(dateInfo);
      }

      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (parseInt(month) < 10) {
        month = "0" + month;
      } else {
        month = date.getMonth() + 1;
      }
      if (parseInt(day) < 10) {
        day = "0" + day;
      } else {
        day = date.getDate();
      }
      return date.getFullYear() + "-" + month + "-" + day;
    },
    holdersSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let formData = new FormData();

          let subscribedDate = this.changeDate(this.holdersForm.subscribedDate);
          let paidDate = this.changeDate(this.holdersForm.paidDate);
          formData.append("enterpriseId", this.$route.params.id);
          formData.append(
            "shareholdersName",
            this.holdersForm.shareholdersName
          );
          formData.append(
            "shareholdingRatio",
            this.holdersForm.shareholdingRatio
          );
          formData.append(
            "subscribedCapital",
            this.holdersForm.subscribedCapital
          );
          formData.append("subscribedDate", subscribedDate);
          formData.append("paidDate", paidDate);
          formData.append("paidCapital", this.holdersForm.paidCapital);
          let url = "";
          if (this.holdersForm.id) {
            url = "api/shareholdersInfoDraft/update";
            formData.append("id", this.holdersForm.id);
          } else {
            url = "api/shareholdersInfoDraft/save";
          }

          this.isSubmit = true;
          this.$request.post(
            url,
            formData,
            res => {
              this.clearHoldersForm();
              this.isSubmit = false;
              this.$Notice.success({
                title: "提示",
                desc: "提交成功"
              });
              this.holdersFormModal = false;
              this.getShareholdersList();
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
              this.$Notice.error({
                title: "提示",
                desc: "服务端错误"
              });
            }
          );
        } else {
          console.log(" submit error");
        }
      });
    },
    cancelHoldersForm() {
      //清空校验提示
      this.$refs.holdersFormRef.resetFields();
      //清空表单
      this.holdersFormModal = false;
      this.clearHoldersForm();
    },
    //股东信息 end
    //分支机构 st
    cancleBranchForm() {
      this.$refs.branchFormRef.resetFields();
      this.branchFormModal = false;
      this.clearBranchForm();
    },
    clearBranchForm() {
      this.branchForm = {
        branchName: "",
        headName: "",
        establishDate: ""
      };
    },
    getBranchList() {
      let formData = new FormData();
      formData.append("limit", this.branchLimit);
      formData.append("page", this.branchPage);
      formData.append("enterpriseId", this.$route.params.id);
      this.$request.post("api/branchDraft/list", formData, res => {
        let list = res.data.list;

        this.branchList = list.map(item => {
          if (item.establishDate) {
            item.establishDate = item.establishDate.substring(0, 10);
          }

          return item;
        });
        console.log(res);
        this.branchtotal = res.data.total;
      });
    },
    getBranchInfo(id) {
      let formData = new FormData();
      // formData.append("enterpriseId", this.$route.params.id);
      this.$request.post("/api/branchDraft/info/" + id, {}, res => {
        let data = res.data;
        this.branchForm = data;
      });
    },

    branchSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let formData = new FormData();
          let establishDate = this.changeDate(this.branchForm.establishDate);
          formData.append("enterpriseId", this.$route.params.id);
          formData.append("branchName", this.branchForm.branchName);
          formData.append("headName", this.branchForm.headName);
          formData.append("establishDate", establishDate);

          let url = "";
          if (this.branchForm.id) {
            url = "api/branchDraft/update";
            formData.append("id", this.branchForm.id);
          } else {
            url = "api/branchDraft/save";
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
              this.cancleBranchForm();
              this.getBranchList();
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
    deleteBranch(id) {
      let formData = new FormData();
      formData.append("id", id);
      this.$request.post(
        "/api/branchDraft/delete",
        formData,
        res => {
          this.$Notice.success({
            title: "提示",
            desc: "删除成功"
          });
          this.getBranchList();
        },
        fail => {}
      );
    },
    //分支机构 end
    //对外投资 st
    getOutboundInvestmentInfo(id) {
      let formData = new FormData();
      // formData.append("enterpriseId", this.$route.params.id);
      this.$request.post(
        "/api/outboundInvestmentDraft/info/" + id,
        formData,
        res => {
          let data = res.data;

          this.outboundInvestmentForm.id = data.id;
          this.outboundInvestmentForm.enterpriseName = data.enterpriseName;
          this.outboundInvestmentForm.enterpriseLink = data.enterpriseLink;
          this.outboundInvestmentForm.registeredCapital = data.registeredCapital.toString();
          this.outboundInvestmentForm.contributionRatio = data.contributionRatio.toString();
          this.outboundInvestmentForm.establishDate = data.establishDate;
        }
      );
    },
    cancleOutboundInvestmentForm() {
      this.$refs.outboundInvestmentFormRef.resetFields();
      this.outboundInvestmentModal = false;
      this.outboundInvestmentForm = {
        enterpriseName: "",
        enterpriseLink: "",
        registeredCapital: "",
        contributionRatio: "",
        establishDate: ""
      };
    },
    getOutboundInvestList() {
      let formData = new FormData();
      formData.append("limit", this.outLimit);
      formData.append("page", this.outPage);
      formData.append("enterpriseId", this.$route.params.id);
      this.$request.post("api/outboundInvestmentDraft/list", formData, res => {
        let list = res.data.list;
        this.outboundInvestmentList = list.map(item => {
          if (item.establishDate) {
            item.establishDate = item.establishDate.substring(0, 10);
          }

          return item;
        });
        this.outtotal = res.data.total;
      });
    },
    deleteOutboundInvest(id) {
      let formData = new FormData();
      formData.append("id", id);
      this.$request.post(
        "/api/outboundInvestmentDraft/delete",
        formData,
        res => {
          this.$Notice.success({
            title: "提示",
            desc: "删除成功"
          });
          this.getOutboundInvestList();
        },
        fail => {}
      );
    },

    outboundInvestSubmit(name) {
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
          formData.append(
            "enterpriseLink",
            this.outboundInvestmentForm.enterpriseLink
          );
          formData.append(
            "registeredCapital",
            this.outboundInvestmentForm.registeredCapital
          );
          formData.append(
            "contributionRatio",
            this.outboundInvestmentForm.contributionRatio
          );

          formData.append("establishDate", establishDate);

          let url = "";
          if (this.outboundInvestmentForm.id) {
            url = "api/outboundInvestmentDraft/update";
            formData.append("id", this.outboundInvestmentForm.id);
          } else {
            url = "api/outboundInvestmentDraft/save";
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
    //对外投资 end

    //重要人员信息 st
    getImportantPersonInfo(id) {
      this.$request.post("/api/importantPersonDraft/info/" + id, {}, res => {
        let data = res.data;

        this.importantPersonForm = data;
      });
    },
    cancleImportantPersonForm() {
      this.$refs.importantPersonFormRef.resetFields();
      this.importantPersonModal = false;
      this.importantPersonForm = {
        name: "",
        position: "",
        termStart: "",
        termEnd: "",
        appointmentTime: "",
        changeDate: ""
      };
    },
    getImportantPersonList() {
      //重要人员：/api/importantPersonDraft
      let formData = new FormData();
      formData.append("limit", this.importLimit);
      formData.append("page", this.importPage);
      formData.append("enterpriseId", this.$route.params.id);
      this.$request.post("api/importantPersonDraft/list", formData, res => {
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

        this.importantPersonList = list;
        this.importantPersonList.forEach(item => {
          item.date = item.termStart + "~" + item.termEnd;
        });
        this.importtotal = res.data.total;
      });
    },
    deleteImportantPerson(id) {
      let formData = new FormData();
      formData.append("id", id);
      this.$request.post(
        "/api/importantPersonDraft/delete",
        formData,
        res => {
          this.$Notice.success({
            title: "提示",
            desc: "删除成功"
          });
          this.getImportantPersonList();
        },
        fail => {}
      );
    },
    importantPersonSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          /**name: "",
        position: "",
        termStart: "",
        termEnd: "",
        appointmentTime: "",
        changeDate: "" */
          let termStart = this.changeDate(this.importantPersonForm.termStart);
          let termEnd = this.changeDate(this.importantPersonForm.termEnd);
          let appointmentTime = this.changeDate(
            this.importantPersonForm.appointmentTime
          );
          let changeDate = "";
          if (this.importantPersonForm.changeDate) {
            changeDate = this.changeDate(this.importantPersonForm.changeDate);
          }

          let formData = new FormData();
          formData.append("enterpriseId", this.$route.params.id);
          formData.append("name", this.importantPersonForm.name);
          formData.append("position", this.importantPersonForm.position);

          formData.append("termStart", termStart);
          formData.append("termEnd", termEnd);
          formData.append("appointmentTime", appointmentTime);
          formData.append("changeDate", changeDate);

          let url = "";
          if (this.importantPersonForm.id) {
            url = "api/importantPersonDraft/update";
            formData.append("id", this.importantPersonForm.id);
          } else {
            url = "api/importantPersonDraft/save";
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
              this.cancleImportantPersonForm();
              this.getImportantPersonList();
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

    //重要人员信息 end
    //固定投资 st

    fixedAssetsSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let startingDate = this.changeDate(this.fixedAssetsForm.startingDate);
          let formData = new FormData();
          formData.append("enterpriseId", this.$route.params.id);
          formData.append("projectName", this.fixedAssetsForm.projectName);
          formData.append(
            "projectIndustry",
            this.fixedAssetsForm.projectIndustry
          );
          let projectRegistryItem = this.fixedAssetsForm.projectRegistryArr.join(
            "/"
          );

          formData.append("projectRegistry", projectRegistryItem);
          formData.append("startingDate", startingDate);

          let url = "";
          if (this.fixedAssetsForm.id) {
            url = "api/fixedAssetsInvestmentDraft/update";
            formData.append("id", this.fixedAssetsForm.id);
          } else {
            url = "api/fixedAssetsInvestmentDraft/save";
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
              this.cancleFixedAssets();
              this.getFixedAssetsInvestmentList();
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
    cancleFixedAssets() {
      this.$refs.fixedAssetsFormRef.resetFields();
      this.fixedAssetsForm = {
        projectName: "",
        projectIndustry: "",
        projectRegistry: "",
        startingDate: ""
      };
      this.fixedAssetsModal = false;
    },
    getFixedAssetsInvestmentList() {
      let formData = new FormData();
      formData.append("limit", this.fixLimit);
      formData.append("page", this.fixPage);
      //固定投资情况：/api/fixedAssetsInvestmentDraft
      formData.append("enterpriseId", this.$route.params.id);
      this.$request.post(
        "api/fixedAssetsInvestmentDraft/list",
        formData,
        res => {
          let list = res.data.list;

          this.fixedAssetsInvestmentList = list.map(item => {
            if (item.startingDate) {
              item.startingDate = item.startingDate.substring(0, 10);
            }
            return item;
          });
          this.fixtotal = res.data.total;
        }
      );
    },
    deleteFixedAssets(id) {
      let formData = new FormData();
      formData.append("id", id);
      this.$request.post(
        "/api/fixedAssetsInvestmentDraft/delete",
        formData,
        res => {
          this.$Notice.success({
            title: "提示",
            desc: "删除成功"
          });
          this.getFixedAssetsInvestmentList();
        },
        fail => {}
      );
    },

    getfixedAssetsInfo(id) {
      this.$request.post(
        "/api/fixedAssetsInvestmentDraft/info/" + id,
        {},
        res => {
          let data = res.data;
          data.projectRegistryArr = data.projectRegistry.split("/");
          this.fixedAssetsForm = data;
        }
      );
    },

    //固定投资 end
    //长期投资 st

    getlongtermEquityInvestmentTypeList(id) {
      // categoryCode:  investment.type
      let formData = new FormData();
      formData.append("categoryCode", "investment.type");
      this.$request.post("/api/dictionary/list", formData, res => {
        let data = res.data;
        // if (data.isHolding == 1) {
        //   this.kgSwitch = true;
        // } else {
        //   this.kgSwitch = false;
        // }
        this.longtermEquityInvestmentTypeArr = data;
      });
    },
    changelongType(index) {
      //选投资类型
      if (this.longtermEquityInvestmentForm.investmentType != "6") {
        this.longtermEquityInvestmentForm.other = "";
      }
      console.log(index);
    },

    getlongtermEquityInvestmentInfo(id) {
      this.$request.post(
        "/api/longtermEquityInvestmentDraft/info/" + id,
        {},
        res => {
          let data = res.data;
          if (data.isHolding == 1) {
            this.kgSwitch = true;
          } else {
            this.kgSwitch = false;
          }
          data.projectRegistryArr = data.projectRegistry.split("/");

          this.longtermEquityInvestmentForm = data;
        }
      );
    },
    deleteLongtermEquityInvestment(id) {
      let formData = new FormData();
      formData.append("id", id);
      this.$request.post(
        "api/longtermEquityInvestmentDraft/delete",
        formData,
        res => {
          this.$Notice.success({
            title: "提示",
            desc: "删除成功"
          });
          this.getlongtermEquityInvestmentList();
        },
        fail => {
          this.$Notice.error({
            title: "提示",
            desc: "删除失败"
          });
        }
      );
    },
    longtermEquityInvestmentSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let startingDate = this.changeDate(
            this.longtermEquityInvestmentForm.startingDate
          );

          let formData = new FormData();
          formData.append("enterpriseId", this.$route.params.id);
          formData.append(
            "projectName",
            this.longtermEquityInvestmentForm.projectName
          );
          formData.append(
            "projectIndustry",
            this.longtermEquityInvestmentForm.projectIndustry
          );
          let projectRegistryItem = this.longtermEquityInvestmentForm.projectRegistryArr.join(
            "/"
          );
          formData.append("projectRegistry", projectRegistryItem);
          formData.append(
            "isHolding",
            this.longtermEquityInvestmentForm.isHolding
          );
          formData.append(
            "investmentType",
            this.longtermEquityInvestmentForm.investmentType
          );
          if (this.longtermEquityInvestmentForm.investmentType == 6) {
            if (this.longtermEquityInvestmentForm.other === "") {
              this.$Notice.error({
                title: "提示",
                desc: "其他投资类型不能为空"
              });
              return false;
            }
            formData.append("other", this.longtermEquityInvestmentForm.other);
          } else {
            formData.append("other", "");
          }
          formData.append("startingDate", startingDate);
          let url = "";
          if (this.longtermEquityInvestmentForm.id) {
            url = "api/longtermEquityInvestmentDraft/update";
            formData.append("id", this.longtermEquityInvestmentForm.id);
          } else {
            url = "api/longtermEquityInvestmentDraft/save";
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
              this.cancleLongtermEquityInvestment();
              this.getlongtermEquityInvestmentList();
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
    kgSwitchChange(status) {
      if (status) {
        this.longtermEquityInvestmentForm.isHolding = 1;
      } else {
        this.longtermEquityInvestmentForm.isHolding = 0;
      }
    },
    cancleLongtermEquityInvestment() {
      this.$refs.longtermEquityInvestmentFormRef.resetFields();
      this.longtermEquityInvestmentForm = {
        projectName: "",
        projectIndustry: "",
        projectRegistry: "",
        startingDate: "",
        isHolding: 0,
        investmentType: ""
      };
      this.longtermEquityInvestmentModal = false;
    },
    getlongtermEquityInvestmentList() {
      let formData = new FormData();
      formData.append("limit", this.longLimit);
      formData.append("page", this.longPage);
      formData.append("enterpriseId", this.$route.params.id);
      this.$request.post(
        "api/longtermEquityInvestmentDraft/list",
        formData,
        res => {
          let list = res.data.list;
          this.longtermEquityInvestmentList = list.map(item => {
            if (item.startingDate) {
              item.startingDate = item.startingDate.substring(0, 10);
            }
            item.isHolding = item.isHolding == 1 ? "是" : "否";
            return item;
          });
          this.longtotal = res.data.total;
        }
      );
    },
    //长期投资 end
    //荣誉 st

    getHonorList() {
      let formData = new FormData();
      formData.append("enterpriseId", this.$route.params.id);
      formData.append("limit", this.honorLimit);
      formData.append("page", this.honorPage);
      this.$request.post("api/honorDraft/list", formData, res => {
        let list = res.data.list;

        this.honorList = list.map(item => {
          if (item.awardDate) {
            item.awardDate = item.awardDate.substring(0, 10);
          }
          return item;
        });
        this.honortotal = res.data.total;
      });
    },
    getHonorInfo(id) {
      this.$request.post("/api/honorDraft/info/" + id, {}, res => {
        let data = res.data;
        this.honorForm = data;
        let uArr = [];
        if (data.attachment && data.attachment.length > 0) {
          data.attachment.forEach(item => {
            uArr.push({
              id: item.id,
              name: item.fileName,
              url: this.host + item.path,
              status: "finished"
            });
          });
        }

        this.honorUploadList = uArr;
      });
    },

    cancleHonorForm() {
      this.$refs.honorFormRef.resetFields();
      this.honorModal = false;
      this.deleteImgLog();

      this.honorForm = {
        awardDate: "",
        level: "",
        honorName: "",
        attachmentIds: ""
      };
      this.honorUploadList = [];
    },

    cancleHonorFormSubmit() {
      this.honorModal = false;

      this.honorForm = {
        awardDate: "",
        level: "",
        honorName: "",
        attachmentIds: ""
      };
      this.honorUploadList = [];
    },

    deleteHonor(id) {
      let formData = new FormData();
      formData.append("id", id);
      this.$request.post(
        "/api/honorDraft/delete",
        formData,
        res => {
          this.$Notice.success({
            title: "提示",
            desc: "删除成功"
          });
          this.getHonorList();
        },
        fail => {}
      );
    },
    honorSubmit(name) {
      if (this.honorUploadList.length === 0) {
        this.$Notice.error({
          title: "提示",
          desc: "请上传图片"
        });
        return false;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          let awardDate = this.changeDate(this.honorForm.awardDate);
          let formData = new FormData();
          formData.append("enterpriseId", this.$route.params.id);
          formData.append("awardDate", awardDate);
          formData.append("level", this.honorForm.level);
          formData.append("honorName", this.honorForm.honorName);
          let attachmentIds = [];
          this.honorUploadList.forEach(item => {
            attachmentIds.push(item.id);
          });
          formData.append("attachmentIds", attachmentIds);
          let url = "";
          if (this.honorForm.id) {
            url = "api/honorDraft/update";
            formData.append("id", this.honorForm.id);
          } else {
            url = "api/honorDraft/save";
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
              this.cancleHonorFormSubmit();
              this.getHonorList();
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
    handleViewHonor(url) {
      this.showHonorUploadImg = url;

      this.honorUploadImgModal = true;
    },
    handleRemoveHonor(item, id) {
      // const fileList = this.$refs.uploadLicense.fileList;
      // console.log(fileList, "fl");
      // this.$refs.uploadHonor.fileList.splice(fileList.indexOf(file), 1);
      // this.honorUploadList = this.$refs.uploadLicense.fileList
      let index = "";
      if (item.sourceId === null && item.sourceTable === null) {
        let formData = new FormData();
        formData.append("id", id);
        this.$request.post("/api/attachment/delete", formData, res => {
          console.log("附件日志删除成功");
        });
      }
      this.honorUploadList.forEach((item, index) => {
        if (item.id == id) {
          // index = index;
          this.honorUploadList.splice(index, 1);
        }
      });
    },
    handleSuccessHonor(res, file) {
      if (res.code == 200) {
        if (res.data) {
          this.honorUploadList.push({
            id: res.data.id,
            name: res.data.fileName,
            url: this.host + res.data.path,
            status: file.status,
            showProgress: file.showProgress,
            percentage: file.percentage,
            sourceId: res.data.sourceId,
            sourceTable: res.data.sourceTable
          });
        }

        this.$Notice.success({
          title: "提示",
          desc: "图片上传成功",
          duration: 2
        });
      } else {
        this.$Notice.error({
          title: "提示",
          desc: "图片上传失败",
          duration: 2
        });
      }
    },
    handleFormatErrorHonor(file) {
       this.$Notice.warning({
         title: "提示",
         desc: "支持图片格式：.jpg, .jpeg, .png, .bmp"
       });
    },
    handleMaxSizeHonor(file) {
      this.$Notice.warning({
        title: "提示",
        desc: "《" + file.name + "》 太大了，超过10M."
      });
    },
    handleBeforeUploadHonor() {
      const check = this.honorUploadList.length < 10;
      if (!check) {
        this.$Notice.warning({
          title: "最多上传10张"
        });
      }
      return check;
    },
    deleteImgLog() {
      this.honorUploadList.forEach(item => {
        console.log(item.id, "222222");
        if (item.sourceId === null && item.sourceTable === null) {
          let id = item.id;
          let formData = new FormData();
          formData.append("id", id);
          this.$request.post("/api/attachment/delete", formData, res => {
            console.log("附件日志删除成功");
          });
        }
      });
    },
    //荣誉 end

    //企业大事记 st
    handleViewHonor(url) {
      this.showEventUploadImg = url;
      this.eventUploadImgModal = true;
    },

    addInfo() {
      this.toAddEvents = true;
    },

    getEventInfo(id) {
      this.$request.post("/api/businessEventDraft/info/" + id, {}, res => {
        let data = res.data;
        this.addEventInfo = data;
        let uArr = [];
        if (data.attachment && data.attachment.length > 0) {
          // data.attachment.forEach(item => {
          //   uArr.push({
          //     id: item.id,
          //     name: item.fileName,
          //     url: this.host + item.path,
          //     status: "finished"
          //   });
          // });

          data.attachment.forEach(item => {
            uArr.push({
              id: item.id,
              name: item.fileName,
              url: this.host + item.path,
              status: "finished"
            });
          });
        }

        this.honorUploadList = uArr;
      });
    },
    toaddEvent(name) {
      if (this.honorUploadList.length === 0) {
        this.$Notice.error({
          title: "提示",
          desc: "请上传图片"
        });
        return false;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          // if (this.attachmentIds.length == 0) {
          //   this.$Notice.error({
          //     title: "提示",
          //     desc: "附件不能为空"
          //   });
          //   return false;
          // }
          let eventDate = this.changeDate(this.addEventInfo.eventDate);
          let idArr = [];
          this.honorUploadList.forEach(item => {
            idArr.push(item.id);
          });
          let formData = new FormData();
          formData.append("enterpriseId", this.$route.params.id);
          formData.append("eventDate", eventDate);
          formData.append("eventName", this.addEventInfo.eventName);
          formData.append("introduction", this.addEventInfo.introduction);
          formData.append("attachmentIds", idArr);
          let url = "api/businessEventDraft/save";
          if (this.addEventInfo.id) {
            url = "/api/businessEventDraft/update";
            formData.append("id", this.addEventInfo.id);
          } else {
            url = "/api/businessEventDraft/save";
          }
          this.isSubmit = true;

          this.$request.post(
            url,
            formData,
            res => {
              this.isSubmit = false;
              this.toAddEvents = false;
              this.getEventList();
              this.$Notice.success({
                title: "提示",
                desc: "提交成功"
              });
              this.cancelSubmitEventForm();
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
    cancelForm() {
      this.$refs.addEventInfoRef.resetFields();
      this.deleteImgLog();
      this.addEventInfo = {
        enterpriseId: "",
        eventName: "",
        eventDate: "",
        introduction: ""
      };
      this.honorUploadList = [];
      this.toAddEvents = false;
    },
    cancelSubmitEventForm() {
      this.addEventInfo = {
        enterpriseId: "",
        eventName: "",
        eventDate: "",
        introduction: ""
      };
      this.honorUploadList = [];
      this.toAddEvents = false;
    },
    deleteEvent(id) {
      let formData = new FormData();
      formData.append("id", id);
      this.$request.post(
        "/api/businessEventDraft/delete",
        formData,
        res => {
          this.$Notice.success({
            title: "提示",
            desc: "删除成功"
          });
          this.getEventList();
        },
        fail => {}
      );
    },

    handleFormatErrorEvent() {},
    handleRemoveEvent(file, files) {
      let name = file.name;
      this.eventImgList.forEach((item, index) => {
        if (name == item.name) {
          this.eventImgList.splice(index, 1);
        }
      });
    },

    handleBeforeUploadEvent(file) {
      let len = this.eventImgList.length;
      if (len > 10) {
        this.$Notice.warning({
          title: "数量超出",
          desc: "最多只能上传10张图片",
          duration: 5
        });
        return false;
      }
    },
    handleMaxSizeEvent(file) {
      this.$Notice.warning({
        title: "文件太大",
        desc: "图片不超过10M",
        duration: 5
      });
    },
    getEventList() {
      let formData = new FormData();
      formData.append("enterpriseId", this.$route.params.id);
      formData.append("limit", this.eventLimit);
      formData.append("page", this.eventPage);
      this.$request.post("/api/businessEventDraft/list", formData, res => {
        let list = res.data.list;

        this.abEvents = list.map(item => {
          if (item.eventDate) {
            item.eventDate = item.eventDate.substring(0, 10);
          }
          return item;
        });
        this.eventtotal = res.data.total;
      });
    },
    pickTime(time) {
      this.addEventInfo.eventDate = time;
    },
    //企业大事记 end

    //工商信息 st
    handleViewBusiness(url) {
      this.showBusinessImg = url;
      this.visible = true;
    },
    handleRemoveBusiness() {
      this.deleteBusinessImgLog();
      this.uploadList = [];
    },
    handleSuccessBusiness(res, file) {
      this.uploadList = [];
      if (res.code == 200) {
        if (res.data) {
          this.uploadList.push({
            id: res.data.id,
            name: res.data.fileName,
            url: this.host + res.data.path,
            status: file.status,
            sourceId: res.data.sourceId,
            sourceTable: res.data.sourceTable
          });
          this.$Notice.success({
            title: "提示",
            desc: "图片上传成功",
            duration: 2
          });
        }
      } else {
        this.$Notice.error({
          title: "提示",
          desc: "图片上传失败",
          duration: 2
        });
      }
    },
    handleFormatErrorBusiness(file) {
       this.$Notice.warning({
         title: "提示",
         desc: "支持图片格式：.jpg, .jpeg, .png, .bmp"
       });
    },
    handleMaxSizeBusiness(file) {
      this.$Notice.warning({
        title: "提示",
        desc: "《" + file.name + "》 太大了，超过10M."
      });
    },
    handleBeforeUploadBusiness() {
      const check = this.uploadList.length < 1;
      if (!check) {
        this.$Notice.warning({
          title: "只能上传1张"
        });
      }
      return check;
    },
    deleteBusinessImgLog() {
      this.uploadList.forEach(item => {
        if (item.sourceId === null && item.sourceTable === null) {
          let id = item.id;
          let formData = new FormData();
          formData.append("id", id);
          this.$request.post("/api/attachment/delete", formData, res => {
            console.log("附件日志删除成功");
          });
        }
      });
    },
    //工商信息保存
    businessSubmit(name) {
      this.businessFormData.contributedCapital === null
        ? (this.businessFormData.contributedCapital = 0)
        : this.businessFormData.contributedCapital;

      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.businessFormData.establishDate == "") {
            this.$Notice.error({
              title: "提示",
              desc: "成立日期不能为空"
            });
            return false;
          }
          let formData = new FormData();
          let industryId = this.businessFormData.industryIdArr[
            this.businessFormData.industryIdArr.length - 1
          ];
          let establishDate = this.changeDate(
            this.businessFormData.establishDate
          );
          let licenseId = "";
          if (this.uploadList.length > 0) {
            licenseId = this.uploadList[0].id;
          } else {
            this.$Notice.error({
              title: "提示",
              desc: "营业执照不能为空"
            });
            return false;
          }
          // 企业名称：enterpriseName  行业类型：industryId  企业法人：legalPerson  成立日期：establishDate  注册资本:registeredCapital 实缴资本:contributedCapital  统一社会信用代码:businessScope 工商异常情况:businessAbnormal  营业执照附件id：licenseId

          formData.append(
            "enterpriseName",
            this.businessFormData.enterpriseName
          );
          formData.append("legalPerson", this.businessFormData.legalPerson);
          formData.append("creditCode", this.businessFormData.creditCode);
          formData.append(
            "registeredCapital",
            this.businessFormData.registeredCapital
          );
          formData.append(
            "contributedCapital",
            this.businessFormData.contributedCapital
          );
          formData.append("businessScope", this.businessFormData.businessScope);

          formData.append(
            "businessAbnormal",
            this.businessFormData.businessAbnormal
          );

          formData.append("establishDate", establishDate);
          formData.append("licenseId", licenseId);
          formData.append("industryId", industryId);
          formData.append("enterpriseId", this.$route.params.id);
          this.isSubmit = true;
          this.$request.post(
            "api/enterpriseDraft/updateBusiness",
            formData,
            res => {
              this.isSubmit = false;
              this.$Notice.success({
                title: "提示",
                desc: "保存成功"
              });

              this.getInfo(this.$route.params.id);
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
    //工商信息 end

    //保存简介
    introductionSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append("introduction", this.introductionData.introduction);
          formData.append("enterpriseId", this.$route.params.id);
          this.isSubmit = true;
          this.$request.post(
            "/api/enterpriseDraft/updateIntroduction",
            formData,
            res => {
              this.isSubmit = false;
              this.$Notice.success({
                title: "提示",
                desc: "保存成功"
              });
              this.getInfo(this.$route.params.id);
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
    itdTxtInput() {
      this.itdTxtVal = this.introductionData.introduction.length;
      this.businessScopeTxtVal = this.businessFormData.businessScope.length;
      this.businessAbnormalTxtVal = this.businessFormData.businessAbnormal.length;
    },

    getInfo(id) {
      this.isLoading = true;
      this.$request.post(
        "/api/enterpriseDraft/info/" + id,
        {},
        res => {
          this.isLoading = false;
          let data = res.data;
          if (data.establishDate && data.establishDate.length >= 10) {
            data.establishDate = data.establishDate.substring(0, 10);
          } else {
            data.establishDate = "";
          }

          this.introductionData.introduction = data.introduction
            ? data.introduction
            : "";

          this.introductionDataBackup = JSON.parse(
            JSON.stringify(this.introductionData)
          );

          let arr = data.industryIds.split(",");
          // arr.push(data.industryId);
          data.industryIdArr = arr.map(item => {
            return Number(item);
          });
          if (data.registeredCapital && data.registeredCapital != "null") {
            data.registeredCapital = data.registeredCapital.toString();
          } else {
            data.registeredCapital = "";
          }
          data.enterpriseName = data.enterpriseName ? data.enterpriseName : "";
          data.legalPerson = data.legalPerson ? data.legalPerson : "";
          data.establishDate = data.establishDate ? data.establishDate : "";
          data.creditCode = data.creditCode ? data.creditCode : "";
          data.contributedCapital = data.contributedCapital
            ? data.contributedCapital
            : "";
          data.businessScope = data.businessScope ? data.businessScope : "";
          this.businessFormData = data;
          if (data.license) {
            this.uploadList = [];
            this.uploadList.push({
              id: data.license.id,
              name: data.license.fileName,
              url: this.host + data.license.path,
              status: "finished"
            });
          }
          let dataJson = JSON.stringify(data);
          this.businessFormDataBackup = JSON.parse(dataJson);
          this.uploadListBackup = JSON.parse(JSON.stringify(this.uploadList));

          this.itdTxtInput();
        },
        res => {
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
        }
      );
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
          this.getInfo(this.$route.params.id);
        },
        res => {},
        error => {}
      );
    },
    getJobList() {
      let formData = new FormData();
      formData.append("categoryCode", "position.type");
      this.$request.post("/api/dictionary/list", formData, res => {
        let arr = [];
        res.data.forEach(item => {
          arr.push({
            value: item.value,
            label: item.name
          });
        });
        this.jobNameArr = arr;
      });
    },
    timeToUnix(dateA) {
      var dateee = new Date(dateA).toJSON();
      var date = new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return date;
    },
    submitConfirm() {
      let establishDate_now = "";
      let establishDate_backUp = "";

      if (this.businessFormData.establishDate) {
        establishDate_now =
          typeof this.businessFormData.establishDate == "object"
            ? this.businessFormData.establishDate.getTime() + 8 * 3600 * 1000
            : new Date(this.businessFormData.establishDate).getTime();
      } else {
        establishDate_now = "";
      }

      if (this.businessFormDataBackup.establishDate) {
        establishDate_backUp =
          typeof this.businessFormDataBackup.establishDate == "object"
            ? this.businessFormDataBackup.establishDate.getTime() +
              8 * 3600 * 1000
            : new Date(this.businessFormDataBackup.establishDate).getTime();
      } else {
        establishDate_backUp = "";
      }
      let uploadListId = "";
      let uploadListBackupId = "";

      if (this.uploadList.length == 0) {
        uploadListId = "";
      } else {
        uploadListId = this.uploadList[0].id;
      }
      if (this.uploadListBackup.length == 0) {
        uploadListBackupId = "";
      } else {
        uploadListBackupId = this.uploadListBackup[0].id;
      }

      if (
        this.introductionData.introduction !=
        this.introductionDataBackup.introduction
      ) {
        this.$Notice.error({
          title: "提示",
          desc: "您修改了公司简介，还未保存！",
          duration: 2
        });
      } else if (
        this.businessFormData.enterpriseName == "" ||
        this.businessFormData.legalPerson == "" ||
        this.businessFormData.establishDate == "" ||
        this.businessFormData.creditCode == "" ||
        this.businessFormData.registeredCapital == "" ||
        this.businessFormData.contributedCapital == "" ||
        // this.uploadList.length == 0 ||
        this.businessFormData.industryIdArr.length == 0
      ) {
        this.$Notice.error({
          title: "提示",
          desc: "工商信息资料填写不完整！"
        });
        return false;
      } else if (
        this.businessFormData.enterpriseName !=
          this.businessFormDataBackup.enterpriseName ||
        this.businessFormData.legalPerson !=
          this.businessFormDataBackup.legalPerson ||
        establishDate_now != establishDate_backUp ||
        this.businessFormData.creditCode !=
          this.businessFormDataBackup.creditCode ||
        this.businessFormData.registeredCapital !=
          this.businessFormDataBackup.registeredCapital ||
        this.businessFormData.contributedCapital !=
          this.businessFormDataBackup.contributedCapital ||
        this.businessFormData.businessScope !=
          this.businessFormDataBackup.businessScope ||
        this.businessFormData.businessAbnormal !=
          this.businessFormDataBackup.businessAbnormal ||
        // this.uploadList.length == 0 ||
        this.businessFormData.industryIdArr[0] !=
          this.businessFormDataBackup.industryIdArr[0] ||
        this.uploadList.length != this.uploadListBackup.length ||
        this.uploadList[0].id != this.uploadListBackup[0].id
      ) {
        this.$Notice.error({
          title: "提示",
          desc: "您修改的工商信息资料，还未保存，请先保存！"
        });
        return false;
      } else {
        this.$Modal.confirm({
          title: "提示",
          content: "确认提交审核？",
          onOk: () => {
            this.doSubmitAudit();
          },
          onCancel: () => {}
        });
      }
    }
  }
};
</script>


