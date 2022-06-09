<template>
  <div class="sign">
    <el-button class="back-btn" type="primary" @click="toPage('/home')">
      返回
    </el-button>
    <div class="title">电子签名</div>
    <div class="sign-content">
      <vue-esign
        ref="esign"
        :width="500"
        :height="300"
        :isCrop="isCrop"
        :lineWidth="lineWidth"
        :lineColor="lineColor"
        :bgColor.sync="bgColor"
      />
    </div>
    <div class="btn">
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleGenerate">保存</el-button>
    </div>
  </div>
</template>
<script>
  import vueEsign from 'vue-esign'
  import dayjs from 'dayjs'
  export default {
    name: 'signLeader',
    components: { vueEsign },
    data() {
      return {
        lineWidth: 6,
        lineColor: '#000000',
        bgColor: '',
        isCrop: false,
      }
    },
    methods: {
      toPage(path) {
        this.$router.push({
          path,
        })
      },
      handleReset() {
        this.$refs.esign.reset()
      },
      handleGenerate() {
        this.$refs.esign
          .generate()
          .then((res) => {
            console.log(res)
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
  }
</script>
<style scoped lang="scss">
  .sign {
    position: relative;
  }
  .back-btn {
    position: absolute;
    left: 0;
    top: 20px;
    height: 40px;
    width: 100px;
  }
  .title {
    height: 80px;
    font-size: 40px;
    line-height: 80px;
    text-align: center;
  }
  .sign-content {
    margin-top: 20px;
    border: 1px solid #e6e6e6;
  }
  .btn {
    display: flex;
    justify-content: end;
  }
</style>
