<template>
  <div class="video">
    <el-button
      type="primary"
      @click="toPage('/displayResource/videoPreviewList')"
    >
      返回
    </el-button>
    <div id="mse"></div>
  </div>
</template>

<script>
  import Player from 'xgplayer'
  export default {
    name: 'videoPreview',
    data() {
      return {
        player: null,
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      toPage(path) {
        this.$router.push({ path })
      },
      init() {
        this.player = new Player({
          id: 'mse',
          url: this.$route.query.url,
          poster: this.$route.query.poster, //封面图
          cssFullscreen: true,
          lang: 'zh-cn',
          autoplay: false,
          volume: 0.3, // 音量
          playbackRate: [0.5, 0.75, 1, 1.5, 2],
          height: window.innerHeight,
          width: window.innerWidth,
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .video {
    position: relative;
    .el-button {
      position: absolute;
      left: 30px;
      top: 30px;
      z-index: 99;
    }
  }
</style>
