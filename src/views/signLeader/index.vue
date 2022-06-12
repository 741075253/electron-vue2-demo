<template>
  <div class="sign">
    <img src="@/assets/images/sign.png" />
    <el-button
      class="back-btn"
      type="primary"
      @click="
        toPage('/home', {
          index: 1,
        })
      "
    >
      返回
    </el-button>
    <div class="sign-content">
      <vue-esign
        ref="esign"
        :width="signWidth"
        :height="signHeight"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
        :bgColor.sync="bgColor"
      />
    </div>
    <div class="btn btn-1" @click="handleReset">重置</div>
    <div class="btn btn-2" @click="handleGenerate">保存</div>
  </div>
</template>
<script>
  import vueEsign from 'vue-esign'
  import dayjs from 'dayjs'
  import common from '@/mixins/common'
  export default {
    name: 'signLeader',
    components: { vueEsign },
    mixins: [common],
    data() {
      const $body = document.body
      return {
        lineWidth: 6,
        lineColor: '#000000',
        bgColor: '',
        isCrop: false,
        signWidth: $body.clientWidth * 0.8,
        signHeight: $body.clientHeight * 0.5,
      }
    },
    methods: {
      handleReset() {
        this.$refs.esign.reset()
      },
      handleGenerate() {
        this.$refs.esign
          .generate()
          .then((res) => {
            const url = window.electronApi.saveBase64Poster(
              res,
              dayjs().format('YYYYMMDDHHmmss'),
              './signImg'
            )
            if (url) {
              this.$Message.success('保存成功')
            }
          })
          .catch(() => {
            this.$Message.success('请先签名') // 画布没有签字时会执行这里 'Not Signned'
          })
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.signWidth = document.body.clientWidth * 0.8
        this.signHeight = document.body.clientHeight * 0.5
      })
    },
  }
</script>
<style scoped lang="scss">
  .sign {
    position: relative;
    width: 100vw;
    height: 100vh;
    & > img {
      display: block;
      widows: 100%;
      height: 100%;
    }
  }
  .back-btn {
    position: absolute;
    left: 0;
    top: 20px;
    height: 40px;
    width: 100px;
  }
  .sign-content {
    position: absolute;
    left: 10%;
    top: 20%;
    width: 80%;
    height: 50%;
  }
  .btn {
    position: absolute;
    right: 10%;
    bottom: 10%;
    width: 10vw;
    height: 10vw;
    border-radius: 100%;
    background: gray;
  }
  .btn-1 {
    right: 30%;
  }
  .btn-2 {
    right: 10%;
  }
</style>
