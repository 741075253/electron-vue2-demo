<template>
  <div class="list-container">
    <el-button type="primary" @click="toPage('/home')">返回</el-button>
    <template v-if="pageList.length">
      <div class="list-cells">
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
          <div class="img-container">
            <img :src="item.imgUrl" />
          </div>
          <p class="title">{{ item.fileName }}</p>
          <div class="btn-group">
            <el-button type="text">查看</el-button>
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
    </template>
    <template v-else>
      <el-empty :image-size="200"></el-empty>
    </template>
  </div>
</template>
<script>
  import { parserPageList } from '@/utils/common'
  import wordImg from '../../../assets/images/word.png'
  import excelImg from '../../../assets/images/excel.png'
  import pptImg from '../../../assets/images/ppt.png'
  const imgOpt = {
    docx: wordImg,
    pptx: pptImg,
    xlsx: excelImg,
  }
  export default {
    name: 'filePreviewList',
    data() {
      const resourceList = this.$store.state.resourceList.map((item) => {
        const list = item.file.split('.')
        item.imgUrl = imgOpt[list.splice(list.length - 1)] || ''
        return item
      })
      return {
        total: resourceList.length,
        currentPage: 1,
        fileList: [], // 分页数据
        pageList: parserPageList(resourceList), // 分页总数据
      }
    },
    methods: {
      toPage(path, query) {
        this.$router.push({
          path,
          query,
        })
      },
      handleCurrentChange(pageIndex) {
        this.currentPage = pageIndex
        this.getPageData()
      },
      getPageData() {
        this.fileList = this.pageList[this.currentPage - 1]
      },
    },
    mounted() {
      this.getPageData()
    },
  }
</script>
<style scoped lang="scss">
  @import '@/style/list.scss';
  .list-container {
    background: white;
  }
</style>
