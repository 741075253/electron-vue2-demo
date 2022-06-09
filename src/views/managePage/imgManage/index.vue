<template>
  <div class="list-container" v-loading="loading">
    <template v-if="pageList.length">
      <div class="list-cells">
        <div class="list-cell" v-for="(item, index) in fileList" :key="item.id">
          <div class="img-container">
            <img :src="item.path" />
          </div>
          <p class="title">{{ item.fileName }}</p>
          <div class="btn-group">
            <el-button type="text" @click="addBanner(item, 'only')">
              播放当前
            </el-button>
            <el-button
              v-if="!item.isAdd"
              type="text"
              @click="addBanner(item, 'add', index)"
            >
              加入轮播
            </el-button>
            <el-button
              v-else
              type="text"
              @click="addBanner(item, 'delete', index)"
            >
              移除轮播
            </el-button>
          </div>
        </div>
      </div>
      <div class="page">
        <el-button type="primary">开始轮播</el-button>
        <el-button type="primary" @click="handleUpload">上传</el-button>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="6"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
      <div class="banner-list" v-if="bannerList && bannerList.length">
        轮播队列：
        <span v-for="(item, index) in bannerList" :key="item.id">
          {{ item.fileName }}{{ index < bannerList.length - 1 ? '、' : '' }}
        </span>
      </div>
    </template>
    <template v-else>
      <el-empty :image-size="200"></el-empty>
    </template>
  </div>
</template>
<script>
  import { getFileName, parserPageList } from '@/utils/common'
  import { typeOpt } from '../util'
  export default {
    name: 'imgManage',
    props: {
      type: {
        type: String,
        default: '1',
      },
    },
    data() {
      const typeObj = typeOpt[this.type || '1']
      const apiUrl = './api/' + typeObj.api
      const dirUrl = './' + typeObj.dirName + '/img'
      return {
        apiUrl, // 轮播相对路径
        dirUrl, // 文件相对路径
        loading: false,
        total: 0,
        currentPage: 1,
        fileList: [], // 分页数据
        pageList: [], // 分页总数据
        bannerList: [],
        bannerOriginList: [],
      }
    },
    methods: {
      handleCurrentChange(pageIndex) {
        this.currentPage = pageIndex
        this.getPageData()
      },
      parseBanner(data) {
        this.bannerOriginList = data
        this.bannerList = data.map(({ file }, index) => {
          return {
            id: index,
            fileName: getFileName(file),
          }
        })
        console.log('banner', data)
      },
      getBannerQueueList() {
        window.electronApi.readJson(this.apiUrl).then((data) => {
          if (data && data.length && data[0].type === 'img') {
            this.parseBanner(data)
          }
        })
      },
      getList() {
        this.loading = true
        const baseUrl = window.electronApi.getUrl(this.dirUrl)
        window.electronApi.getDir(this.dirUrl).then((files) => {
          this.loading = false
          if (files) {
            const pageList = files.map((file, index) => {
              const isAdd = this.bannerOriginList.some(
                (item) => item.file === file
              )
              return {
                id: index,
                fileName: getFileName(file),
                isAdd,
                file,
                path: baseUrl + '/' + file,
              }
            })
            this.total = files.length
            this.pageList = parserPageList(pageList)
            this.getPageData()
          }
        })
      },
      getPageData() {
        this.fileList = this.pageList[this.currentPage - 1]
      },
      addBanner(file, type = 'add', index) {
        const url = this.apiUrl
        let msg = ''
        let status = ''
        let param = this.bannerOriginList
        if (type === 'only') {
          msg = '是否仅设置轮播当前文件？'
          status = '设置'
          param = [
            {
              ...file,
              type: 'img',
            },
          ]
        }
        if (type === 'delete') {
          msg = '是否确定移除轮播'
          status = '移除'
          for (let i = 0; i < param.length; i++) {
            if (param[i].file == file.file) {
              param.splice(i, 1)
              break
            }
          }
        }
        if (type === 'add') {
          status = '加入'
          msg = '是否确定加入轮播'
          param.push({
            ...file,
            type: 'img',
          })
        }
        this.$msgbox({
          title: '消息',
          message: msg,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: (action) => {
            if (action === 'confirm') {
              window.electronApi.writeJson(url, param).then((error) => {
                if (error) {
                  this.$Message.error(status + '失败，请重试!')
                } else {
                  this.parseBanner(param)
                  this.getPageData()
                  if (type == 'add') {
                    this.fileList[index].isAdd = true
                    this.pageList[this.currentPage - 1][index].isAdd = true
                  } else if (type === 'delete') {
                    this.fileList[index].isAdd = false
                    this.pageList[this.currentPage - 1][index].isAdd = false
                  }
                  this.$Message.success(status + '成功')
                }
              })
            }
          },
        })
      },
      async handleUpload() {
        const result = await window.electronApi.openDialog({
          properties: ['openFile', 'multiSelections'],
          filters: [
            {
              name: 'Images',
              extensions: ['jpg', 'png', 'jpeg', 'gif'],
            },
          ],
        })
        if (!result || !result.length) {
          return
        }
        const nameList = [] // 文件名
        const pathList = [] // 文件路径
        result.forEach((item) => {
          const lastLine = item.lastIndexOf('\\')
          nameList.push(item.substring(lastLine + 1))
          pathList.push(item.substring(0, lastLine))
        })
        this.$msgbox({
          title: '消息',
          message: '是否确定上传：' + nameList.join('、'),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          callback: (action) => {
            if (action === 'confirm') {
              const destPath = window.electronApi.getUrl(this.dirUrl)
              nameList.forEach((name, index) => {
                window.electronApi.copyFile(pathList[index], destPath, name)
              })
              this.$Message.success('上传成功')
              this.currentPage = 1
              this.getList()
            }
          },
        })
      },
    },
    async created() {
      await this.getBannerQueueList()
      this.getList()
    },
  }
</script>
<style scoped lang="scss">
  @import '@/style/list.scss';
</style>
