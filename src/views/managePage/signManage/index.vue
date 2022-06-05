<template>
  <div class="sign">
    <div class="search-container">
      <div class="search-cell">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="search-cell">
        <el-button type="primary" @click="handleDownload">下载</el-button>
      </div>
      <div class="search-cell">
        <el-button type="primary" @click="handleDelete">删除</el-button>
      </div>
    </div>
    <div class="table-container">
      <el-table
        ref="table"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="填写日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="缩略图" width="120">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.url"
              :preview-src-list="[scope.row.url]"
            ></el-image>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
  import { getFileName, parserPageList } from '@/utils/common'
  import dayjs from 'dayjs'
  export default {
    name: 'signManage',
    data() {
      return {
        date: '',
        currentPage: 1,
        selectedList: [],
        total: 0,
        tableOriginData: [],
        tableData: [
          {
            date: '1231241234',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          },
        ],
      }
    },
    methods: {
      getList() {
        const baseUrl = window.electronApi.getUrl('./signImg')
        window.electronApi.getDir('./signImg').then((files) => {
          if (files) {
            const pageList = files.map((file) => {
              return {
                date: dayjs(getFileName(file)).format('YYYY-MM-DD HH:mm:ss'),
                url: baseUrl + '\\' + file,
                file,
                baseUrl,
              }
            })
            this.total = files.length
            this.tableOriginData = parserPageList(pageList, 10)
            this.getPageData()
          }
        })
      },
      getPageData() {
        this.selectedList = []
        this.tableData = this.tableOriginData[this.currentPage - 1]
      },
      handleSelectionChange(item) {
        this.selectedList = item
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
        this.getPageData()
      },
      async handleDownload() {
        if (!this.selectedList.length) {
          this.$Message.warning('请选择数据')
          return
        }
        const result = await window.electronApi.openDialog({
          title: '下载目录',
          properties: ['openDirectory'],
        })
        if (result) {
          this.selectedList.forEach((item) => {
            const info = window.electronApi.copyFile(
              item.baseUrl,
              result,
              item.file
            )
            console.log(info)
          })
        }
      },
      handleDelete() {
        if (!this.selectedList.length) {
          this.$Message.warning('请选择数据')
          return
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: (action) => {
            if (action === 'confirm') {
              const imgUrlList = this.selectedList.map((item) => {
                return item.url
              })
              console.log(imgUrlList)
              const list = []
              imgUrlList.forEach((url) => {
                list.push(window.electronApi.removeFile(url))
              })
              this.$Message.success('删除成功')
              console.log(list)
            }
          },
        })
      },
    },
    created() {
      this.getList()
    },
  }
</script>
<style scoped lang="scss">
  .search-container {
    display: flex;
    .search-cell {
      margin-right: 20px;
    }
  }
  .table-container {
    border: 1px solid #e6e6e6;
    .el-table {
      width: 100%;
    }
  }
</style>
