<template>
  <div class="manage">
    <el-container>
      <el-header>
        <div class="back-btn" @click="toPage('/home')">
          <i class="iconfont icon-backward"></i>
        </div>
        <div class="title">资源中心</div>
      </el-header>
      <el-container class="manage-container">
        <el-aside width="200px">
          <div class="menu">
            <div class="menu-cell">党建资源管理</div>
            <div class="menu">
              <div
                class="menu-cell"
                :class="{ active: code === 1 }"
                @click="changePage('VideoManage', 1, '1')"
              >
                视频管理
              </div>
              <div
                class="menu-cell"
                :class="{ active: code === 2 }"
                @click="changePage('ImgManage', 2, '1')"
              >
                图片管理
              </div>
              <div
                class="menu-cell"
                :class="{ active: code === 3 }"
                @click="changePage('FileManage', 3, '1')"
              >
                文件管理
              </div>
            </div>
          </div>
          <div class="menu">
            <div class="menu-cell">内控资源管理</div>
            <div class="menu">
              <div
                class="menu-cell"
                :class="{ active: code === 4 }"
                @click="changePage('VideoManage', 4, '2')"
              >
                视频管理
              </div>
              <div
                class="menu-cell"
                :class="{ active: code === 5 }"
                @click="changePage('ImgManage', 5, '2')"
              >
                图片管理
              </div>
              <div
                class="menu-cell"
                :class="{ active: code === 6 }"
                @click="changePage('FileManage', 6, '2')"
              >
                文件管理
              </div>
            </div>
          </div>
          <div class="menu">
            <div class="menu-cell">电子签名</div>
            <div class="menu">
              <div
                class="menu-cell"
                :class="{ active: code === 7 }"
                level="2"
                @click="changePage('SignManage', 7)"
              >
                签名管理
              </div>
            </div>
          </div>
        </el-aside>
        <el-main>
          <component v-bind:is="pageName" :type="type"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import common from '@/mixins/common'
  export default {
    name: 'managePage',
    mixins: [common],
    components: {
      VideoManage: () =>
        import(/* webpackChunkName: "manage" */ './videoManage'),
      ImgManage: () => import(/* webpackChunkName: "manage" */ './imgManage'),
      FileManage: () => import(/* webpackChunkName: "manage" */ './fileManage'),
      SignManage: () => import(/* webpackChunkName: "manage" */ './signManage'),
    },
    data() {
      return {
        pageName: 'VideoManage',
        code: 1,
        type: '1', // 资源管理类型 1党建 2内控
      }
    },
    methods: {
      changePage(name, code, type) {
        this.pageName = name
        this.type = type || ''
        this.code = code
      },
    },
  }
</script>
<style scoped lang="scss">
  .manage {
    text-align: center;
    background: url('@/assets/images/manage-bg.png') no-repeat 100%;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .el-header {
    position: relative;
    padding: 0;
    height: 80px !important;
    line-height: 80px;

    .title {
      font-size: 40px;
      font-weight: bolder;
      margin-bottom: 10px;
      color: white;
    }
  }
  .el-aside {
    overflow-y: auto;
    height: 100vh;
  }
  .menu {
    padding-left: 30px;
    .menu-cell {
      padding: 0 10px;
      width: 100px;
      height: 40px;
      line-height: 40px;
      border-radius: 2px;
      background: white;
      color: #333;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      &.active {
        background: #b3d8ff;
      }
      & + .menu-cell {
        margin-top: 15px;
      }
    }
    & + .menu {
      margin-top: 20px;
    }
    & > .menu {
      margin-top: 15px;
    }
  }
  .el-main {
    margin-right: 30px;
    width: calc(100vw - 230px);
    height: calc(100vh - 120px);
    background-color: white;
    border-radius: 5px;
  }
</style>
