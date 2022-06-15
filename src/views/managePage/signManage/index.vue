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
          @change="handleTimeChange"
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
        border
        tooltip-effect="dark"
        :data="tableData"
        :height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="填写日期">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="缩略图">
          <template slot-scope="scope">
            <el-image style="width: 100px" :src="scope.row.url"></el-image>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
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
        pageSize: 20,
        selectedList: [],
        total: 0,
        allOriginData: [], // 所有原始数据
        tableOriginData: [],
        tableData: [
          // {
          //   date: '1231241234',
          //   url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          // },
        ],
        tableHeight: 0,
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
            this.allOriginData = [...pageList]
            this.tableOriginData = parserPageList(pageList, this.pageSize)
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
      handleTimeChange(value) {
        this.currentPage = 1
        let list = [...this.allOriginData]
        if (value && value.length === 2) {
          list = list.filter((item) => {
            const { date } = item
            return (
              dayjs(value[0]).isBefore(date) && dayjs(value[1]).isAfter(date)
            )
          })
        }
        this.total = list.length
        this.tableOriginData = parserPageList(list, this.pageSize)
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
        if (result && result.length) {
          let errList = []
          for (let i = 0; i < this.selectedList.length; i++) {
            const item = this.selectedList[i]
            const info = await window.electronApi.copyFile(
              item.baseUrl,
              result[0],
              item.file
            )
            if (!info) {
              errList.push(info)
            }
          }
          if (errList.length == this.selectedList.length) {
            this.$Message.error('下载失败，请使用管理员权限')
          } else {
            this.$Message.success('下载成功')
          }
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
          callback: async (action) => {
            if (action === 'confirm') {
              const imgUrlList = this.selectedList.map((item) => {
                return item.url
              })
              const list = []
              imgUrlList.forEach((url) => {
                const err = window.electronApi.removeFile(url)
                if (err) {
                  list.push(err)
                }
              })
              if (list.length === imgUrlList.length) {
                this.$Message.error('删除失败, 请使用管理员权限')
              } else {
                this.$Message.success('删除成功')
                this.getList()
              }
            }
          },
        })
      },
    },
    created() {
      this.getList()
      this.$nextTick(() => {
        this.tableHeight = document.querySelector('.sign').clientHeight - 92
      })
    },
  }
</script>
<style scoped lang="scss">
  .sign {
    height: 100%;
  }
  .search-container {
    display: flex;
    .search-cell {
      margin-right: 20px;
    }
  }
  .table-container {
    margin-top: 20px;
    .el-table::v-deep {
      .el-table__cell {
        padding: 5px 0;
      }
    }
  }
  .page-container {
    text-align: right;
  }
</style>
