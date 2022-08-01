<template>
  <div class="video">
    <div class="back-btn" @click="$router.back()">
      <i class="iconfont icon-backward"></i>
    </div>
    <div id="mse"></div>
  </div>
</template>

<script>
  import Player from 'xgplayer'
  import common from '@/mixins/common'
  export default {
    name: 'videoPreview',
    mixins: [common],
    data() {
      return {
        player: null,
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.$nextTick(() => {
          this.player = new Player({
            id: 'mse',
            url: this.$route.query.url,
            poster: window.electronApi.translatePath(this.$route.query.poster), //封面图
            cssFullscreen: true,
            lang: 'zh-cn',
            autoplay: false,
            volume: 0.3, // 音量
            playbackRate: [0.5, 0.75, 1, 1.5, 2],
            height: window.innerHeight,
            width: window.innerWidth,
            fullscreen: true,
          })
        })
      },
    },
    beforeDestroy() {
      this.player.destroy(true)
    },
  }
</script>

<style scoped lang="scss">
  .video {
    position: relative;
    background: #e6e6e6;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .back-btn {
    z-index: 99999;
  }
</style>
