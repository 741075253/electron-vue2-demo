<template>
  <div class="list-container">
    <img :src="bgUrl" class="bg" />
    <div
      class="back-btn"
      @click="
        toPage('/home', {
          index: 1,
        })
      "
    >
      <i class="iconfont icon-backward"></i>
    </div>
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
          <div class="file-container">
            <img :src="item.imgUrl" />
          </div>
          <p class="title">{{ item.fileName }}</p>
        </div>
      </div>
      <div class="page">
        <el-button
          type="primary"
          v-if="currentPage > 1"
          @click="handleCurrentChange(currentPage - 1)"
        >
          上一页
        </el-button>
        <el-button
          type="primary"
          v-if="currentPage < pageCount"
          @click="handleCurrentChange(currentPage + 1)"
        >
          下一页
        </el-button>
      </div>
    </template>
    <template v-else>
      <el-empty :image-size="200"></el-empty>
    </template>
  </div>
</template>
<script>
  import { parserPageList } from '@/utils/common'
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
  @import '../style.scss';
</style>
