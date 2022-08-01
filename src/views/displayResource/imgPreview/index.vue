<template>
  <div class="img">
    <div class="back-btn" @click="$router.back()">
      <i class="iconfont icon-backward"></i>
    </div>
    <swiper :options="swiperOption" ref="swiper">
      <swiper-slide v-for="(src, index) in resourceList" :key="index">
        <img :src="src.path" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import common from '@/mixins/common'
  export default {
    name: 'imgPreview',
    mixins: [common],
    components: {
      swiper,
      swiperSlide,
    },
    data() {
      const resourceList = this.$store.state.resourceList
      let isLoop = resourceList && resourceList.length
      return {
        resourceList,
        swiperOption: {
          resourceList: resourceList,
          loop: isLoop,
          //自动播放
          autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            /* 触摸滑动后是否继续轮播 */
            disableOnInteraction: false,
          },
          //滑动速度
          speed: 500,
          //小手掌抓取滑动
          grabCursor: true,
        },
      }
    },
    computed: {
      swiper() {
        return this.$refs.swiper.swiper
      },
    },
    methods: {},
    beforeDestroy() {
      this.swiper.destroy()
    },
  }
</script>
<style scoped lang="scss">
  .swiper-container::v-deep {
    .swiper-slide {
      position: relative;
      width: 100vw;
      height: 100vh;
      & > img {
        display: block;
        width: 100%;
      }
    }
  }
  .img {
    position: relative;
  }
  .el-button {
    position: absolute;
    left: 30px;
    top: 30px;
    z-index: 9;
  }
</style>
