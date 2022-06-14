<template>
  <div class="img-content">
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
    <div class="img-container" v-if="type == 1">
      <img src="../../assets/images/3d/base.jpg" />
      <div class="btn btn-1" @click="handleTypeChange(2, 1)"></div>
      <div class="btn btn-2-1" @click="handleTypeChange(2, 2)"></div>
      <div class="btn btn-2-2" @click="handleTypeChange(2, 2)"></div>
      <div class="btn btn-3" @click="handleTypeChange(2, 3)"></div>
      <div class="btn btn-4" @click="handleTypeChange(2, 4)"></div>
      <div class="btn btn-5" @click="handleTypeChange(2, 5)"></div>
      <div class="btn btn-6" @click="handleTypeChange(2, 6)"></div>
      <div class="btn btn-7" @click="handleTypeChange(2, 7)"></div>
      <div class="btn btn-8" @click="handleTypeChange(2, 8)"></div>
      <div class="btn btn-9" @click="handleTypeChange(2, 9)"></div>
      <div class="btn btn-10" @click="handleTypeChange(2, 10)"></div>
      <div class="btn btn-11" @click="handleTypeChange(2, 11)"></div>
      <div class="btn btn-12" @click="handleTypeChange(2, 12)"></div>
    </div>
    <div class="position-container" v-else>
      <i
        class="iconfont icon-roundclose close-btn"
        @click="handleTypeChange(1)"
      ></i>
      <div class="img-container-w">
        <img :src="images[0]" />
      </div>
    </div>
  </div>
</template>
<script>
  import common from '@/mixins/common'
  import Img1 from '@/assets/images/3d/1.png'
  import Img2 from '@/assets/images/3d/2.png'
  import Img3 from '@/assets/images/3d/3.png'
  import Img4 from '@/assets/images/3d/4.png'
  import Img5 from '@/assets/images/3d/5.png'
  import Img6 from '@/assets/images/3d/6.png'
  import Img7 from '@/assets/images/3d/7.png'
  import Img8 from '@/assets/images/3d/8.png'
  import Img9 from '@/assets/images/3d/9.png'
  import Img10 from '@/assets/images/3d/10.png'
  import Img11 from '@/assets/images/3d/11.png'
  import Img12 from '@/assets/images/3d/12.png'
  const imgOpt = {
    1: Img1,
    2: Img2,
    3: Img3,
    4: Img4,
    5: Img5,
    6: Img6,
    7: Img7,
    8: Img8,
    9: Img9,
    10: Img10,
    11: Img11,
    12: Img12,
  }
  export default {
    name: 'display3D',
    mixins: [common],
    data() {
      return {
        type: 1, // 1图片 2 场景
        position: 'all', // 场景切换
        images: [],
      }
    },
    methods: {
      handleTypeChange(type, index) {
        this.type = type
        this.images = [imgOpt[index] || '']
      },
      handlePositionChange(position) {
        this.position = position
      },
      inited(viewer) {
        this.$viewer = viewer
        this.$viewer.index = this.activeIndex
        // 不要他的按钮
        this.$viewer.options.button = false
        // 不要他的底部缩略图
        this.$viewer.options.navbar = false
        // 不要他的底部标题
        this.$viewer.options.title = false
        // 不要他的底部工具栏
        this.$viewer.options.toolbar = false
        this.show()
      },
      show() {
        this.$viewer.show()
      },
    },
  }
</script>
<style scoped lang="scss">
  .back-btn {
    color: #333;
  }
  .img-content {
    position: relative;
  }
  .img-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      height: 100vh;
    }
  }
  .position-container {
    position: relative;
    z-index: 99;
    .close-btn {
      position: fixed;
      top: 30px;
      right: 30px;
      font-size: 30px;
      z-index: 99;
    }
  }
  .img-container-w {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 100%;
    }
  }
  .btn {
    position: absolute;
  }
  .btn-1 {
    left: 26%;
    top: 11%;
    width: 3%;
    height: 60.5%;
  }
  .btn-2-1 {
    left: 26%;
    top: 73%;
    width: 3%;
    height: 17.5%;
  }
  .btn-2-2 {
    left: 26%;
    top: 85%;
    width: 15%;
    height: 5.5%;
  }
  .btn-3 {
    left: 39.3%;
    top: 23%;
    width: 19.8%;
    height: 5.7%;
  }
  .btn-4 {
    left: 39.3%;
    top: 32.5%;
    width: 14.5%;
    height: 5.5%;
  }

  .btn-5 {
    left: 53.8%;
    top: 32.5%;
    width: 3%;
    height: 27%;
  }
  .btn-6 {
    left: 39.3%;
    top: 54%;
    width: 14.5%;
    height: 5.5%;
  }
  .btn-7 {
    left: 39.3%;
    top: 63.4%;
    width: 19.8%;
    height: 5.5%;
  }
  .btn-8 {
    left: 41.8%;
    top: 85%;
    width: 15.5%;
    height: 5.5%;
  }
  .btn-9 {
    left: 59%;
    top: 28.5%;
    width: 3%;
    height: 35%;
  }
  .btn-10 {
    left: 69.8%;
    top: 10.5%;
    width: 3%;
    height: 59%;
  }
  .btn-11 {
    left: 61%;
    top: 71.2%;
    width: 12%;
    height: 5.4%;
  }
  .btn-12 {
    left: 61%;
    top: 78.5%;
    width: 12%;
    height: 5.4%;
  }
</style>
