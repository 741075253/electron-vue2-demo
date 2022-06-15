<template>
  <div class="sign">
    <img src="@/assets/images/sign.png" />
    <div class="sign-content">
      <vue-esign
        v-if="signWidth"
        ref="esign"
        :width="signWidth"
        :height="signHeight"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
        :bgColor.sync="bgColor"
      />
    </div>
    <div class="btn btn-1" @click="handleReset"></div>
    <div class="btn btn-2" @click="handleGenerate"></div>
    <div
      class="btn btn-3"
      @click="
        toPage('/home', {
          index: 1,
        })
      "
    ></div>
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
      return {
        lineWidth: 6,
        lineColor: '#000000',
        bgColor: '',
        isCrop: false,
        signWidth: 0,
        signHeight: 0,
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
        const signContent = document.querySelector('.sign-content')
        this.signWidth = signContent.clientWidth
        this.signHeight = signContent.clientHeight
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
      width: 100%;
      height: 100%;
    }
  }

  .sign-content {
    position: absolute;
    left: 7%;
    top: 29%;
    width: 86%;
    height: 57%;
  }
  .btn {
    position: absolute;
    right: 10%;
    bottom: 5%;
    width: 10vw;
    height: 10vw;
    border-radius: 100%;
    background: transparent;
  }
  .btn-1 {
    right: 15%;
  }
  .btn-2 {
    right: 2%;
  }
  .btn-3 {
    right: 28.5%;
  }
</style>
