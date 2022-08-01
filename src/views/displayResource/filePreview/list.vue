<template>
  <div class="list-container">
    <img :src="bgUrl" class="bg" />
    <div class="back-btn" @click="$router.back()">
      <i class="iconfont icon-backward"></i>
    </div>
    <div class="list-cells" v-loading="loading">
      <div
        class="list-cell"
        v-for="item in fileList"
        :key="item.id"
        @click="
          toPage('/displayResource/filePreview', {
            url: item.path,
          })
        "
      >
        <div class="file-container">
          <img :src="item.imgUrl" />
        </div>
        <p class="title">{{ item.fileName }}</p>
      </div>
    </div>
    <div class="page">
      <div>
        <el-button type="primary" @click="handleUpload">上传</el-button>
      </div>
      <div>
        <el-button
          type="primary"
          v-if="currentPage > 1"
          @click="handleCurrentChange(currentPage - 1)"
        >
          上一页
        </el-button>
        <el-button
          type="primary"
          style="margin-left: 15px"
          v-if="currentPage < pageCount"
          @click="handleCurrentChange(currentPage + 1)"
        >
          下一页
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { parserPageList } from '@/utils/common'
  import { typeOpt } from '@/views/managePage/util'
  import wordImg from '@/assets/images/word.png'
  import excelImg from '@/assets/images/excel.png'
  import pptImg from '@/assets/images/ppt.png'
  import DFLZ from '@/assets/images/dflz-bg.png'
  import NKAF from '@/assets/images/nkaf-bg.png'
  import common from '@/mixins/common'
  const imgOpt = {
    docx: wordImg,
    pptx: pptImg,
    xlsx: excelImg,
  }
  export default {
    name: 'filePreviewList',
    mixins: [common],
    data() {
      return {
        type: '',
        dirUrl: '',
        total: 0,
        currentPage: 1,
        fileList: [], // 分页数据
        pageList: [], // 分页总数据
      }
    },
    computed: {
      bgUrl() {
        return this.$route.query.type == 2 ? NKAF : DFLZ
      },
      pageCount() {
        return Math.ceil(this.total / 6)
      },
    },
    methods: {
      handleCurrentChange(pageIndex) {
        this.currentPage = pageIndex
        this.getPageData()
      },
      getList() {
        this.loading = true
        const baseUrl = window.electronApi.getUrl(this.dirUrl)
        window.electronApi.getDir(this.dirUrl).then((files) => {
          this.loading = false
          if (files) {
            console.log('文件', files)
            const pageList = files.map((file, index) => {
              const list = file.split('.')
              const imgUrl = imgOpt[list.splice(list.length - 1)] || ''
              const fileName = list.join('.')
              return {
                id: index,
                imgUrl,
                fileName,
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
      async handleUpload() {
        const result = await window.electronApi.openDialog({
          properties: ['openFile', 'multiSelections'],
          // 后缀为html, js, json, md其中之一
          filters: [
            {
              name: 'Offices',
              extensions: ['xlsx', 'docx', 'pptx'],
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
          callback: async (action) => {
            if (action === 'confirm') {
              const destPath = window.electronApi.getUrl(this.dirUrl)
              let errList = []
              for (let i = 0; i < nameList.length; i++) {
                const name = nameList[i]
                const info = await window.electronApi.copyFile(
                  pathList[i],
                  destPath,
                  name
                )
                if (!info) {
                  errList.push(info)
                }
              }
              if (errList.length != nameList.length) {
                this.$Message.success('上传成功')
                this.currentPage = 1
                this.getList()
              } else {
                this.$Message.error('上传失败, 请使用管理员权限')
              }
            }
          },
        })
      },
    },
    mounted() {
      this.type = this.$route.query.type
      const typeObj = typeOpt[this.type || '1']
      this.dirUrl = './' + typeObj.dirName + '/file'
      this.getList()
    },
  }
</script>
<style scoped lang="scss">
  @import '../style.scss';
</style>
