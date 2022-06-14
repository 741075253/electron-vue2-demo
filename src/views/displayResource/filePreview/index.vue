<template>
  <div :class="{ hidden }">
    <div class="container">
      <div class="back-btn" @click="back">
        <i class="iconfont icon-roundclose"></i>
      </div>
      <div v-show="loading" class="well loading">正在加载中，请耐心等待...</div>
      <div v-show="!loading" class="well" ref="output"></div>
    </div>
  </div>
</template>

<script>
  import common from '@/mixins/common'
  import { getExtend, readBuffer, render } from '@/components/util'
  import { parse } from 'qs'

  /**
   * 支持嵌入式显示，基于postMessage支持跨域
   * 示例代码：
   *
   */
  export default {
    name: 'filePreview',
    props: {
      msg: String,
    },
    mixins: [common],
    data() {
      return {
        // 加载状态跟踪
        loading: false,
        // 上个渲染实例
        last: null,
        // 隐藏头部，当基于消息机制渲染，将隐藏
        hidden: false,
        // 网址
        url: this.$route.query.url,
      }
    },
    created() {
      // 允许使用预留的消息机制发送二进制数据，必须在url后添加?name=xxx.xxx&from=xxx
      const { from, name } = parse(location.search.substring(1))
      if (from) {
        window.addEventListener('message', (event) => {
          const { origin, data: blob } = event
          if (origin === from && blob instanceof Blob) {
            // 构造响应，自动渲染
            const file = new File([blob], name, {})
            this.hidden = true
            this.handleChange({ target: { files: [file] } })
          }
        })
      }
      this.loadFromUrl()
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      // 从url加载
      loadFromUrl() {
        this.loading = true
        // 要预览的文件地址
        const { url } = this
        const filename = url.substr(url.lastIndexOf('/') + 1)
        // 拼接iframe请求url
        window.electronApi
          .readFile(url, true)
          .then((data) => {
            this.loading = false
            if (!data) {
              this.$Message.error('文件读取失败！')
              return
            }
            const file = new File([data], filename, {})
            this.handleChange({ target: { files: [file] } })
          })
          .finally(() => {
            this.loading = false
          })
      },
      async handleChange(e) {
        this.loading = true
        try {
          const [file] = e.target.files
          this.filename = (file.name && decodeURIComponent(file.name)) || ''
          const arrayBuffer = await readBuffer(file)
          this.loading = false
          this.last = await this.displayResult(arrayBuffer, file)
        } catch (e) {
          console.error(e)
        } finally {
          this.loading = false
        }
      },
      displayResult(buffer, file) {
        // 取得文件名
        const { name } = file
        // 取得扩展名
        const extend = getExtend(name)
        // 输出目的地
        const { output } = this.$refs
        // 生成新的dom
        const node = document.createElement('div')
        // 添加子节点，防止vue实例替换dom元素
        if (this.last) {
          output.removeChild(this.last.$el)
          this.last.$destroy()
        }
        const child = output.appendChild(node)
        // 调用渲染方法进行渲染
        return new Promise((resolve, reject) =>
          render(buffer, extend, child).then(resolve).catch(reject)
        )
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .back-btn {
    left: auto;
    right: 15px;
    top: 15px;
    color: #333;
    z-index: 999999;
  }

  .hidden .well {
    height: 100vh;
  }
  .well {
    display: block;
    background-color: #f2f2f2;
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }

  .loading {
    text-align: center;
    padding-top: 50px;
  }

  .upload-cover {
    z-index: 1;
    pointer-events: none;
    color: black;
  }

  .messages .warning {
    color: #cc6600;
  }
</style>

<style>
  .pptx-wrapper {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
