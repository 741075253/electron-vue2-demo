<template>
  <div class="list-container" v-loading="loading">
    <template v-if="pageList.length">
      <div class="list-cells">
        <div class="list-cell" v-for="(item, index) in fileList" :key="item.id">
          <div class="img-container">
            <img :src="item.imgUrl" />
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
  import wordImg from '../../../assets/images/word.png'
  import excelImg from '../../../assets/images/excel.png'
  import pptImg from '../../../assets/images/ppt.png'
  const imgOpt = {
    docx: wordImg,
    pptx: pptImg,
    xlsx: excelImg,
  }
  export default {
    name: 'fileManage',
    data() {
      return {
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
        window.electronApi.readJson('./api/banner-queue.json').then((data) => {
          if (data && data.length && data[0].type === 'file') {
            this.parseBanner(data)
          }
        })
      },
      getList() {
        this.loading = true
        const baseUrl = window.electronApi.getUrl('./file')
        window.electronApi.getDir('./file').then((files) => {
          this.loading = false
          if (files) {
            const pageList = files.map((file, index) => {
              const list = file.split('.')
              const imgUrl = imgOpt[list.splice(list.length - 1)] || ''
              const fileName = list.join('.')
              const isAdd = this.bannerOriginList.some(
                (item) => item.file === file
              )
              return {
                id: index,
                imgUrl,
                fileName,
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
        if (file) {
          delete file.imgUrl
        }
        const url = './api/banner-queue.json'
        let msg = ''
        let status = ''
        let param = this.bannerOriginList
        if (type === 'only') {
          msg = '是否仅设置轮播当前文件？'
          status = '设置'
          param = [
            {
              ...file,
              type: 'file',
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
            type: 'file',
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
