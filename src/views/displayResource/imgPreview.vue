<template>
  <div class="img">
    <el-button type="primary" @click="toPage('/home')">返回</el-button>
    <swiper :options="swiperOption" ref="swiper">
      <swiper-slide v-for="(src, index) in sourceList" :key="index">
        <img :src="src" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'imgPreview',
    components: {
      swiper,
      swiperSlide,
    },
    data() {
      const resourceList = this.$store.state.resourceList
      let isLoop = resourceList && resourceList.length
      return {
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
    methods: {
      toPage(path) {
        this.$router.push({
          path,
        })
      },
    },
    beforeDestroy() {
      this.swiper.destroy()
    },
  }
</script>
<style scoped lang="scss">
  .img {
    position: relative;
  }
  .el-button {
    position: absolute;
    left: 30px;
    top: 30px;
  }
</style>
