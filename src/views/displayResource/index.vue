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
    <div class="img-btn">
      <div class="img" @click="handleClick('img')">
        <img src="@/assets/images/img-icon.png" />
        <p>图片</p>
      </div>
      <div class="img" @click="handleClick('video')">
        <img src="@/assets/images/video-icon.png" />
        <p>视频</p>
      </div>
      <div class="img" @click="handleClick('file')">
        <img src="@/assets/images/file-icon.png" />
        <p>文档</p>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '@/mixins/common'
  import DFLZ from '@/assets/images/dflz-bg.png'
  import NKAF from '@/assets/images/nkaf-bg.png'
  export default {
    name: 'videoPreviewList',
    mixins: [common],
    data() {
      return {}
    },
    computed: {
      bgUrl() {
        return this.$route.query.type == 2 ? NKAF : DFLZ
      },
    },
    methods: {
      handleClick(type) {
        let path = ''
        if (type == 'img') {
          path = '/displayResource/imgPreviewList'
        } else if (type === 'file') {
          path = '/displayResource/filePreviewList'
        } else {
          path = '/displayResource/videoPreviewList'
        }
        this.toPage(path, {
          type: this.$route.query.type,
        })
      },
    },
  }
</script>
<style scoped lang="scss">
  @import url('./style.scss');
  .img-btn {
    position: relative;
    top: 35%;
    display: flex;
    justify-content: center;
    .img {
      position: relative;
      width: 200px;
      height: 200px;
      & + .img {
        margin-left: 5%;
      }
      img {
        width: 100%;
        cursor: pointer;
      }
      p {
        margin-top: 20px;
        font-size: 24px;
        font-weight: 600;
        color: red;
        text-align: center;
        line-height: 20px;
      }
    }
  }
</style>
