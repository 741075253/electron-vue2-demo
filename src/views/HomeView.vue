<template>
  <div class="home">
    <swiper :options="swiperOption" ref="swiper">
      <swiper-slide>
        <div class="company">
          <div class="title">
            <div
              class="logo"
              @touchstart.stop="handlerTouchstart"
              @touchmove="handlerTouchmove"
              @touchend="handlerTouchend"
              @click="manageVisible = true"
            >
              <img class="logo" src="../assets/logo.png" />
            </div>
            <div class="welcome">
              <img src="../assets/logo.png" />
            </div>
          </div>
          <div class="company-content">
            <img src="../assets/logo.png" @click="toPage('/display3D')" />
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="resource">
          <img src="../assets/images/2.jpg" @click="handleResourceClick(1)" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="sign">
          <img src="../assets/images/3.jpg" @click="toPage('/signLeader')" />
        </div>
      </swiper-slide>
    </swiper>
    <el-dialog
      title="提示"
      :visible="manageVisible"
      :modal="false"
      width="50%"
      @close="hideMangeDialog"
    >
      <el-form :model="form">
        <el-form-item label="管理员账号" :label-width="formLabelWidth">
          <el-input v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideMangeDialog">取 消</el-button>
        <el-button type="primary" @click="goManagePage">跳转</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'homeView',
    components: {
      swiper,
      swiperSlide,
    },
    data() {
      return {
        swiperOption: {
          loop: true,
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
        manageVisible: false,
        longTimer: null,
        form: {
          pass: '',
        },
        formLabelWidth: '120px',
        resource: {
          // 党风廉建
          1: {
            type: '',
            list: '',
          },
          // 内控案防
          2: {
            type: '',
            list: '',
          },
        },
      }
    },
    computed: {
      swiper() {
        return this.$refs.swiper.swiper
      },
    },
    methods: {
      toPage(path) {
        console.log(path)
        this.$router.push({
          path,
        })
      },
      clearTimer() {
        if (this.longTimer) {
          clearTimeout(this.longTimer)
          this.longTimer = null
        }
      },
      handlerTouchstart() {
        this.clearTimer()
        this.swiper.autoplay.stop()
        this.longTimer = setTimeout(() => {
          this.manageVisible = true
        }, 1000)
      },
      handlerTouchmove() {
        this.clearTimer()
      },
      handlerTouchend() {
        this.clearTimer()
        if (!this.manageVisible) {
          this.swiper.autoplay.start()
        }
      },
      hideMangeDialog() {
        this.manageVisible = false
        this.swiper.autoplay.start()
      },
      goManagePage() {
        if (!this.form.pass) {
          this.$Message.warning('请输入密码')
          return
        }
        if (this.form.pass !== 'admin123') {
          this.$Message.warning('请输入正确的密码')
          return
        }
        this.toPage('/managePage')
      },
      getResource() {
        window.electronApi.readJson('./api/banner-queue.json').then((res) => {
          console.log(res)
          if (res && res.length) {
            this.resource[1] = {
              type: res[0].type,
              list: res,
            }
          }
        })
      },
      handleResourceClick(name) {
        const { type, list } = this.resource[name]
        this.$store.commit('setResourceList', list)
        let path = ''
        if (type === 'img') {
          path = '/displayResource/imgPreview'
        } else if (type === 'video') {
          path = '/displayResource/videoPreviewList'
          if (list.length === 1) {
            path = '/displayResource/videoPreview'
          }
        } else if (type === 'file') {
          path = '/displayResource/filePreviewList'
          if (list.length === 1) {
            path = '/displayResource/filePreview'
          }
        }
        console.log(path, this.$store.state.resourceList)
        this.toPage(path)
      },
    },
    mounted() {
      this.getResource()
    },
    beforeDestroy() {
      this.swiper.destroy()
      this.clearTimer()
    },
  }
</script>
<style scoped lang="scss">
  .swiper-container::v-deep {
    .swiper-slide {
      width: 100vw;
      height: 100vh;
    }
  }
  .company {
    padding: 30px;
    .title {
      display: flex;
      align-items: center;
      .logo {
        user-select: none;
        width: 80px;
        height: 80px;
        background: white;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .welcome {
        margin-left: 15px;
        width: calc(100vw - 60px - 15px - 80px);
        height: 80px;
        background: white;
        img {
          display: block;
          height: 100%;
        }
      }
    }
    .company-content {
      margin-top: 30px;
      width: calc(100vw - 60px);
      height: calc(100vh - 60px - 80px - 30px);
      background-color: white;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .resource,
  .sign {
    padding: 30px;
    width: calc(100vw - 60px);
    height: calc(100vh - 60px);
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>
