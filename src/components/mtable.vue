<template>
  <div style="height: 100%">
    <!-- :loading="loading" -->
    <Table border stripe  :columns="config.columns" :data="tableData" @on-selection-change="select"></Table>
    <div class="page-tool">
      <Page :total="total" :current="currentPage" :page-size="limit" show-total @on-change="pageChange"></Page>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  props: ['config', 'searchParams', 'isFirst'],
  created () {
    this.init()
  },
  data () {
    return {
      tableData: [
        // 测试用数据
        // {
        //                 status: 'John Brown',
        //                 currentNodeName: 18,
        //                 currentName: 'New York No. 1 Lake Park',
        //                 fileType: '2016-10-03',
        //                 gongdanhao: 'John Brown',
        //                 shoujihao: 18,
        //                 xingming: 'New York No. 1 Lake Park',
        //                 updatedAt: '2016-10-03'
        //             },
        //             {
        //                 status: 'Jim Green',
        //                 currentNodeName: 24,
        //                 currentName: 'London No. 1 Lake Park',
        //                 fileType: '2016-10-01',
        //                 gongdanhao: 'John Brown',
        //                 shoujihao: 18,
        //                 xingming: 'New York No. 1 Lake Park',
        //                 updatedAt: '2016-10-03'
        //             },
        //             {
        //                 status: 'Jim Green',
        //                 currentNodeName: 24,
        //                 currentName: 'London No. 1 Lake Park',
        //                 fileType: '2016-10-01',
        //                 gongdanhao: 'John Brown',
        //                 shoujihao: 18,
        //                 xingming: 'New York No. 1 Lake Park',
        //                 updatedAt: '2016-10-03'
        //             },
      ],
      selection: [],
      total: 0,
      currentPage: 1,
      limit: 10,
      allChecked: false,
      loading: true,
    }
  },
  computed: {
    selected_count () {
      let count = 0
      this.tableData.forEach(function (item) {//调用数组的每个元素，并将元素传递给回调函数
        if (item._checked) {
          count++
        }
      })
      return count
    }
  },
  methods: {
    init () {
      console.log(this.currentPage)
      let params = this.searchParams ? this.searchParams : {}
      let arr = {}
      for (var key of Object.keys(params)) {
        if (params[key] === '') {
          params[key] = null
        }
        arr[key] = params[key]
      }
      params = arr
      //params.currPage = this.isFirst === true ? 1 : this.currentPage
      if(!this.config.unParam){
        params.page = this.isFirst === true ? 1 : this.currentPage
        params.limit = this.config.limit != undefined?this.config.limit :this.limit
        this.limit = params.limit;
      }
      
      // params.projectId = sessionStorage.getItem("curProjectId")
      // params.orgId = sessionStorage.getItem("orgId")
      // params.t = Math.random()
      this.$request.post(this.config.url, qs.stringify(params), data => {
        // 失败的回调
        this.loading = false
        let list=[]
        if(data.responseResult.list){
          list = data.responseResult.list
        }else{
          list = data.responseResult
        }
        
        list.map((item) => {
          item._checked = this.allChecked
        })
        list.map((item, index) => {
          list[index].series = index + 1 + (this.currentPage - 1) * (this.limit)
        })
        this.tableData = list
        console.log(this.tableData)

        this.total = data.responseResult.total || data.responseResult.length
        this.currentPage = data.responseResult.pageNum === 0 ? 1 : data.responseResult.pageNum
      },data=>{
        // 成功的回调
        let list=[]
        if(data.responseResult.list){
          list = data.responseResult.list
        }else{
          list = data.responseResult
        }
        
        list.map((item) => {
          item._checked = this.allChecked
        })
        list.map((item, index) => {
          list[index].series = index + 1 + (this.currentPage - 1) * (this.limit)
        })
        this.tableData = list
        this.total = data.responseResult.total
        this.currentPage = data.responseResult.pageNum === 0 ? 1 : data.responseResult.pageNum
      },data=>{

        // 成功的回调
        let list = data.responseResult.list
        console.log(list)
        list.forEach((item) => {
          item._checked = this.allChecked
        })
        list.map((item, index) => {
          list[index].series = index + 1 + (this.currentPage - 1) * (this.limit)
        })
        this.tableData = list
        this.total = data.responseResult.total
        console.log(this.tableData)
        this.total = data.responseResult.total || data.responseResult.length
        this.currentPage = data.responseResult.pageNum === 0 ? 1 : data.responseResult.pageNum
      })
    },
    select (selection) {
      this.tableData.forEach((item, index) => {
        this.tableData[index]._checked = false
        selection.forEach((sitem) => {
          if (item.id === sitem.id) {
            this.tableData[index]._checked = true
          }
        })
      })
      this.selection = selection
    },
    pageChange (page) {
      this.currentPage = page
      this.init()
    }
  }
}
</script>
<style scoped>
.page-tool{
  height: 30px;
  margin-top: 20px;
  text-align: right;
}
</style>
